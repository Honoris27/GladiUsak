const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const path = require("path");

const JWT_SECRET_KEY = "your-secret-key";

// LowDB setup
const dbFile = path.join(__dirname, "db.json");
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, { licenses: [] }); // varsayılan veri ekleniyor

app.use(cors());
app.use(express.json());

// Başlangıçta veriyi yükle
async function initDB() {
  await db.read();
  db.data ||= { licenses: [] };
  await db.write();
}
initDB();

// Token oluşturma
function generateToken(playerId, licenseKey, expirationDate) {
  const payload = {
    licenseKey,
    playerId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(new Date(expirationDate).getTime() / 1000),
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
}

// Refresh token oluşturma
function generateRefreshToken() {
  return uuid.v4();
}

// Lisans oluştur
app.post("/create-license", async (req, res) => {
  const { playerId, licenseKey, expirationDate } = req.body;
  await db.read();

  const token = generateToken(playerId, licenseKey, expirationDate);
  const refreshToken = generateRefreshToken();

  const license = { licenseKey, playerId, token, refreshToken, expirationDate };
  db.data.licenses.push(license);
  await db.write();

  res.json({ message: "License created", token, refreshToken, expirationDate });
});

// Lisans doğrula
app.post("/validate-license", async (req, res) => {
  const { licenseKey, playerId } = req.body;
  await db.read();

  const license = db.data.licenses.find(
    (l) => l.licenseKey === licenseKey && l.playerId === playerId
  );

  if (license) {
    res.json({
      valid: true,
      token: license.token,
      refreshToken: license.refreshToken,
      expirationDate: license.expirationDate,
    });
  } else {
    res.json({ valid: false, message: "Invalid license or playerId" });
  }
});

// Token doğrula
app.post("/validate-token", async (req, res) => {
  const { token, refreshToken, playerId } = req.body;
  await db.read();

  jwt.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      const license = db.data.licenses.find(
        (l) => l.refreshToken === refreshToken && l.playerId === playerId
      );

      if (license) {
        const newToken = generateToken(
          license.playerId,
          license.licenseKey,
          license.expirationDate
        );

        license.token = newToken;
        await db.write();

        res.json({
          valid: true,
          expired: true,
          newToken,
          playerId,
          supportDevs: "your-support-string",
          announcement: "3.4.3 is on! Let us know if there is any bug on Discord.",
        });
      } else {
        res.json({ valid: false, message: "Invalid refresh token" });
      }
    } else {
      res.json({
        valid: true,
        expired: false,
        newToken: null,
        playerId,
        supportDevs: "your-support-string",
        announcement: "3.4.3 is on! Let us know if there is any bug on Discord.",
      });
    }
  });
});

// Refresh token
app.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;
  await db.read();

  const license = db.data.licenses.find((l) => l.refreshToken === refreshToken);

  if (license) {
    const newToken = generateToken(
      license.playerId,
      license.licenseKey,
      license.expirationDate
    );

    license.token = newToken;
    await db.write();

    res.json({ valid: true, token: newToken });
  } else {
    res.json({ valid: false, message: "Invalid refresh token" });
  }
});

// Tüm lisansları getir
app.get("/list-licenses", async (req, res) => {
  await db.read();
  res.json({ count: db.data.licenses.length, licenses: db.data.licenses });
});

// Lisans güncelle
app.post("/update-license", async (req, res) => {
  const { playerId, licenseKey, newLicenseKey, newExpirationDate } = req.body;
  await db.read();

  const license = db.data.licenses.find(
    (l) => l.licenseKey === licenseKey && l.playerId === playerId
  );

  if (license) {
    license.licenseKey = newLicenseKey || license.licenseKey;
    license.expirationDate = newExpirationDate || license.expirationDate;

    const newToken = generateToken(playerId, license.licenseKey, license.expirationDate);
    const newRefreshToken = generateRefreshToken();

    license.token = newToken;
    license.refreshToken = newRefreshToken;

    await db.write();

    res.json({
      message: "License updated",
      newToken,
      newRefreshToken,
      newExpirationDate: license.expirationDate,
    });
  } else {
    res.json({ valid: false, message: "License not found" });
  }
});

// Trial lisans oluştur
app.post("/get-trial", async (req, res) => {
  const { playerId } = req.body;
  if (!playerId) return res.status(400).json({ success: false, message: "Missing playerId" });

  await db.read();

  const alreadyUsed = db.data.licenses.find(
    (l) => l.playerId === playerId && l.licenseKey.startsWith("TRIAL-")
  );
  if (alreadyUsed) return res.json({ success: false, message: "Trial already used" });

  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 10);

  const licenseKey = "TRIAL-" + uuid.v4();
  const token = generateToken(playerId, licenseKey, expirationDate);
  const refreshToken = generateRefreshToken();

  db.data.licenses.push({
    licenseKey,
    playerId,
    token,
    refreshToken,
    expirationDate,
  });

  await db.write();

  res.json({
    success: true,
    trialKey: licenseKey,
    token,
    expirationDate,
  });
});

app.listen(3000, () => {
  console.log("License server running on http://localhost:3000");
});
