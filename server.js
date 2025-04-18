const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const fs = require("fs");

const LICENSE_FILE = "./licenses.json";
const JWT_SECRET_KEY = "your-secret-key";

app.use(cors());
app.use(express.json());

// Lisans verilerini dosyadan yükle
let licenses = [];

if (fs.existsSync(LICENSE_FILE)) {
  try {
    const data = fs.readFileSync(LICENSE_FILE);
    licenses = JSON.parse(data);
  } catch (err) {
    console.error("Lisans dosyası okunamadı veya bozuk:", err);
  }
}

// Lisans verilerini dosyaya kaydet
function saveLicensesToFile() {
  fs.writeFileSync(LICENSE_FILE, JSON.stringify(licenses, null, 2));
}

// Token oluşturma fonksiyonu
function generateToken(playerId, licenseKey, expirationDate) {
  const payload = {
    licenseKey,
    playerId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(new Date(expirationDate).getTime() / 1000),
  };

  return jwt.sign(payload, JWT_SECRET_KEY);
}

// Refresh token oluşturma fonksiyonu
function generateRefreshToken() {
  return uuid.v4();
}

// Lisans oluşturma
app.post("/create-license", (req, res) => {
  const { playerId, licenseKey, expirationDate } = req.body;

  const token = generateToken(playerId, licenseKey, expirationDate);
  const refreshToken = generateRefreshToken();

  const license = {
    licenseKey,
    playerId,
    token,
    refreshToken,
    expirationDate,
  };

  licenses.push(license);
  saveLicensesToFile();

  res.json({
    message: "License created successfully",
    token,
    refreshToken,
    expirationDate,
  });
});

// Lisans doğrulama
app.post("/validate-license", (req, res) => {
  const { licenseKey, playerId } = req.body;

  const license = licenses.find(
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
    res.json({
      valid: false,
      message: "Invalid license key or playerId",
    });
  }
});

// Token doğrulama
app.post("/validate-token", (req, res) => {
  const { token, refreshToken, playerId } = req.body;

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      const license = licenses.find(
        (l) => l.refreshToken === refreshToken && l.playerId === playerId
      );

      if (license) {
        const newToken = generateToken(
          license.playerId,
          license.licenseKey,
          license.expirationDate
        );

        license.token = newToken;
        saveLicensesToFile();

        res.json({
          valid: true,
          expired: true,
          newToken,
          playerId,
          supportDevs:
            "3ff938e00689d2beb7274f3e5552adc2:961374bc74d60fa3822bdd387ca4e51251d2519d10f46777faf80239e260430fe0f3e5d669d6a10b42556cc543e9bab8d861c8ef9b2a8751ecf54e8e87f063a4",
          announcement:
            "3.4.3 is on! Let us know if there is any bug on Discord. Problem varsa lutfen Discorddan yazin.",
        });
      } else {
        res.json({
          valid: false,
          message: "Invalid refresh token",
        });
      }
    } else {
      res.json({
        valid: true,
        expired: false,
        newToken: null,
        playerId,
        supportDevs:
          "3ff938e00689d2beb7274f3e5552adc2:961374bc74d60fa3822bdd387ca4e51251d2519d10f46777faf80239e260430fe0f3e5d669d6a10b42556cc543e9bab8d861c8ef9b2a8751ecf54e8e87f063a4",
        announcement:
          "3.4.3 is on! Let us know if there is any bug on Discord. Problem varsa lutfen Discorddan yazin.",
      });
    }
  });
});

// Refresh token yenileme
app.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  const license = licenses.find((l) => l.refreshToken === refreshToken);

  if (license) {
    const newToken = generateToken(
      license.playerId,
      license.licenseKey,
      license.expirationDate
    );

    license.token = newToken;
    saveLicensesToFile();

    res.json({
      valid: true,
      token: newToken,
    });
  } else {
    res.json({
      valid: false,
      message: "Invalid refresh token",
    });
  }
});

// Tüm lisansları listeleme
app.get("/list-licenses", (req, res) => {
  res.json({
    count: licenses.length,
    licenses,
  });
});

// Lisans güncelleme
app.post("/update-license", (req, res) => {
  const { playerId, licenseKey, newLicenseKey, newExpirationDate } = req.body;

  const licenseIndex = licenses.findIndex(
    (l) => l.licenseKey === licenseKey && l.playerId === playerId
  );

  if (licenseIndex !== -1) {
    const license = licenses[licenseIndex];

    license.licenseKey = newLicenseKey || license.licenseKey;
    license.expirationDate = newExpirationDate || license.expirationDate;

    const newToken = generateToken(
      playerId,
      license.licenseKey,
      license.expirationDate
    );
    const newRefreshToken = generateRefreshToken();

    license.token = newToken;
    license.refreshToken = newRefreshToken;

    saveLicensesToFile();

    res.json({
      message: "License updated successfully",
      newToken,
      newRefreshToken,
      newExpirationDate: license.expirationDate,
    });
  } else {
    res.json({
      valid: false,
      message: "License not found",
    });
  }
});

app.listen(3000, () => {
  console.log("License server running on http://localhost:3000");
});
