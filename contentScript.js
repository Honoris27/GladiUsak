var aa = "",
	fa = "",
	ha = "",
	ra = {},
	ua = {
		enable: !1,
		Bp: 10,
		Op: 1,
		repairArena: !0,
		repairTurma: !0,
		itemList1: [],
		itemList2: []
	},
	va = {
		type: [],
		quality: [],
		nq: !1,
		useCloths: !1
	},
	ya = {
		enable: !1,
		jn: !1,
		Fn: [1],
		Eo: 3,
		co: 3,
		Bo: 3,
		Do: 3,
		Rn: 3,
		To: 3
	};

function G(F) {
	let M = `${window.location.origin}/game/index.php?`;
	Object.entries(F).forEach((N, T) => {
		M += (0 == T ? "" : "&") + N[0] + "=" + N[1]
	});
	return M
}

function U(F) {
	let M = `${window.location.origin}/game/ajax.php?`;
	Object.entries(F).forEach((N, T) => {
		M += (0 == T ? "" : "&") + N[0] + "=" + N[1]
	});
	return M
}
async function Ba(F, M) {
	M = await Ia(F, M);
	if (!M) return !1;
	M.slot && Ja(M.slot, F.dataset.itemId || F.parentNode.dataset.containerNumber);
	Ma(F, M.x, M.y);
	return !0
}
async function Sa(F, M) {
	var N = document.getElementById("inv");
	if (N && M) {
		var T = M.x;
		M = M.y;
		(N = jQuery(N).offset()) ? (T = Math.ceil(N.left + 32 * T + 16), M = Math.ceil(N.top + 32 * M + 16), console.log(`Dragging item to: x=${T}, y=${M}`), Ma(F, T, M)) : console.error("Grid offset could not be determined.")
	} else console.error("Invalid target grid or slot coordinates.")
}
async function Ma(F, M, N) {
	var T = jQuery(F).offset();
	T = {
		x: T.left,
		y: T.top
	};
	fb(F, "mousedown", {
		clientX: T.x - window.scrollX,
		clientY: T.y - window.scrollY
	});
	fb(document, "mousemove", {
		clientX: M - window.scrollX,
		clientY: N - window.scrollY
	});
	fb(document, "mouseup", {
		clientX: M - window.scrollX,
		clientY: N - window.scrollY
	});
	setTimeout(() => {
		window.scroll(scroll.x, scroll.y)
	}, 0)
}

function nb(F) {
	F = F.getAttribute("data-quality");
	return null != F ? F : "0"
}

function wb(F) {
	return xb(F).split("-")[0]
}

function yb(F) {
	return parseInt(F.getAttribute("data-amount"), 10)
}

function Gb(F) {
	return F.getAttribute("data-content-type")
}

function Hb(F) {
	return F.getAttribute("data-level")
}

function xb(F) {
	return F.getAttribute("data-basis")
}

function Ib(F, M) {
	var N = [248, 284, 275, 269, 283, 282, 272, 194, 259, 261, 241, 166, 266, 246, 258, 277, 247, 270, 202, 243, 242, 279, 254, 274, 256, 245, 250, 268, 244, 281, 257, 263, 278, 276, 289, 262, 280, 286, 267, 271, 252, 255, 288, 260, 264, 265];
	F = parseInt(F.split("-")[0], 10);
	if (![1, 2, 3, 4, 5, 6, 8, 9, 20].includes(F)) return !1;
	M = M.split("-");
	F = parseInt(M[6], 36);
	return -1 < [173, 156, 158, 182, 175, 168, 180, 178, 177, 162, 179, 174, 172, 155, 171, 183, 167, 159, 166, 176, 164, 157, 181, 169, 161, 163, 165].indexOf(parseInt(M[5], 36)) || -1 < N.indexOf(F)
}

function Yb(F) {
	return parseInt(F.getAttribute("data-measurement-x"), 10) * parseInt(F.getAttribute("data-measurement-y"), 10)
}

function Zb(F) {
	F = F.getAttribute("data-tooltip");
	F = F.substring(4, F.indexOf(",")).replace('"', "");
	return unescape(JSON.parse('"' + F + '"'))
}

function $b(F) {
	F = F.getAttribute("data-tooltip");
	return parseInt(F.replace(/\./g, "").match(/(\d+) (<img|<div class=\\"icon_gold\\")/i)[1], 10)
}

function ac(F) {
	F = parseInt(F.getAttribute("data-basis").split("-")[0], 10);
	return -1 < [1, 2, 3, 4, 5, 6, 8, 9].indexOf(F)
}

function bc(F) {
	for (var M = 0, N = 0; N < F.length; N++) {
		var T = F[N];
		M += T.ml * T.w
	}
	return M
}

function cc(F) {
	if ("string" !== typeof F) return "";
	F = F.split(" ");
	return F[F.length - 1]
}
async function dc(F, M, N) {
	return new Promise(T => {
		async function V(za) {
			za === E.length && V(za + 1);
			await jQuery.post(E[za], ta => {
				ta = jQuery("<div>").append(ta)[0];
				ta = mc(ta);
				ta = Hc(na[0], na[1], ta);
				(ta = Ic(M, F, ta)) ? (T({
					spot: ta,
					bag: za + 512
				}), N && "function" === typeof N && N(ta, za + 512)) : V(za + 1)
			})
		}
		let E = [];
		for (var ja of [512, 513, 514, 515]) E.push(U({
			mod: "inventory",
			submod: "loadBag",
			shopType: 0,
			bag: ja,
			sh: X("sh")
		}));
		let na = [5, 8];
		V(0)
	})
}
var Jc = [],
	Kc = {};

function Ja(F, M) {
	if ("inv" == F.target || "shop" == F.target) {
		var N = Lc(F.target),
			T = [];
		for (let V = 0; V < F.w; V++)
			for (let E = 0; E < F.ml; E++) T.push(N + "<" + (F.x + V) + "," + (F.y + E) + ">");
		T.forEach(V => {
			Jc.includes(V) || Jc.push(V)
		});
		M && (nf(M), Kc[M] = T)
	}
}

function nf(F) {
	F && Kc.hasOwnProperty(F) && (Kc[F].forEach(M => {
		M = Jc.indexOf(M); - 1 < M && Jc.splice(M, 1)
	}), delete Kc[F])
}

function Lc(F) {
	let M = document.getElementById(F);
	return M ? "inv" == F ? M.parentNode.getElementsByClassName("awesome-tabs current")[0].dataset.op : "inv" == F ? M.dataset.containerNumber : F : F
}

function of(F, M) {
	var N = F.querySelectorAll('.ui-draggable:not([style*="display: none"])');
	F = Array(5).fill(null).map(() => Array(8).fill(!1));
	const T = parseInt(M.getAttribute("data-measurement-x"), 10);
	M = parseInt(M.getAttribute("data-measurement-y"), 10);
	for (var V of N) {
		N = parseInt(V.getAttribute("data-position-x"), 10) - 1;
		var E = parseInt(V.getAttribute("data-position-y"), 10) - 1,
			ja = parseInt(V.getAttribute("data-measurement-x"), 10),
			na = parseInt(V.getAttribute("data-measurement-y"), 10);
		for (let za = 0; za < ja; za++)
			for (let ta =
					0; ta < na; ta++) 0 <= N + za && 8 > N + za && 0 <= E + ta && 5 > E + ta && (F[E + ta][N + za] = !0)
	}
	for (V = 0; 5 > V; V++)
		for (N = 0; 8 > N; N++) {
			E = !0;
			for (ja = 0; ja < T; ja++) {
				for (na = 0; na < M; na++)
					if (8 <= N + ja || 5 <= V + na || F[V + na][N + ja]) {
						E = !1;
						break
					} if (!E) break
			}
			if (E) return {
				x: N,
				y: V
			}
		}
	return null
}
async function Ia(F, M) {
	if ("shop" == M) {
		var N = document.getElementById("shop");
		var T = [Math.round(N.clientHeight / 32), 6]
	} else if ("inv-guild" == M) Array.from(document.querySelectorAll('#inventory_nav a.awesome-tabs[data-available="true"]'));
	else if ("inv" == M) N = document.getElementById("inv"), T = [5, 8];
	else {
		if ("market" == M) {
			N = document.getElementById("market_sell");
			var V = jQuery(N).offset();
			return {
				x: Math.ceil(V.left + 32 + 8),
				y: Math.ceil(V.top + 32 + 8),
				parent: N
			}
		}
		if ("avatar" == M) return N = document.getElementById("avatar"),
			V = jQuery(N).offset(), {
				x: Math.ceil(V.left + 84),
				y: Math.ceil(V.top + 97),
				parent: N
			};
		if ("char" == M)
			for (var E = document.getElementById("char").children, ja = Number(F.dataset.contentType || "0"), na = 0; na < E.length; na++) {
				var za = E[na];
				if (Number(za.getAttribute("data-content-type-accept") || "0") == ja && 0 == E[na].children.length) return V = jQuery(za).offset(), {
					x: V.left + 5,
					y: V.top + 5
				}
			} else return !1
	}
	E = mc(N);
	ja = parseInt(F.dataset.measurementX, 10);
	na = parseInt(F.dataset.measurementY, 10);
	try {
		var ta = "shop" != M && pf(F, E) || Ic(na, ja, Hc(T[0],
			T[1], E));
		if (!ta) return !1;
		V = jQuery(N).offset();
		V = {
			x: V.left,
			y: V.top
		};
		return ta = {
			x: Math.ceil(V.x + 32 * ta.x + 8),
			y: Math.ceil(V.y + 32 * ta.y + 8),
			parent: N,
			slot: {
				target: M,
				x: ta.x,
				y: ta.y,
				ml: na,
				w: ja
			}
		}
	} catch {
		return !1
	}
}

function mc(F) {
	if (!F) return [];
	var M = [];
	F = F.getElementsByClassName("ui-draggable");
	for (var N = 0; N < F.length; N++) M.push({
		y: parseInt(F[N].style.top, 10) / 32,
		x: parseInt(F[N].style.left, 10) / 32,
		ml: parseInt(F[N].dataset.measurementY, 10),
		w: parseInt(F[N].dataset.measurementX, 10),
		basis: F[N].dataset.basis,
		hash: F[N].dataset.hash,
		amount: parseInt(F[N].dataset.amount, 10)
	});
	return M
}

function Hc(F, M, N) {
	var T, V, E = [];
	for (T = 0; T < F; T++)
		for (E.push([]), V = 0; V < M; V++) E[T].push(!1);
	for (F = N.length - 1; 0 <= F; F--)
		for (T = 0; T < N[F].ml; T++)
			for (V = 0; V < N[F].w; V++) E[N[F].y + T][N[F].x + V] = !0;
	return E
}

function pf(F, M) {
	let N = F.dataset.amount ? parseInt(F.dataset.amount, 10) : 1;
	for (var T = 0; T < M.length; T++)
		if (M[T].hash == F.dataset.hash && 100 >= M[T].amount + N) return {
			y: M[T].y,
			x: M[T].x
		};
	return !1
}

function Ic(F, M, N) {
	var T, V, E, ja, na = !1;
	for (T = 0; T <= N[0].length - M; T++) {
		for (V = 0; V <= N.length - F; V++) {
			if (na = !0, 1 == F) 0 == N[V][T] ? na = !0 : 0 == N[V][T + 1] ? T++ : na = !1;
			else
				for (E = 0; E < M; E++) {
					for (ja = 0; ja < F; ja++)
						if (1 == N[V + ja][T + E]) {
							na = !1;
							break
						} if (!na) break
				}
			if (na) {
				for (E = 0; E < M; E++)
					for (ja = 0; ja < F; ja++) N[V + ja][T + E] = !0;
				na = {
					y: V,
					x: T
				};
				break
			}
		}
		if (na) break;
		1 == F && T++
	}
	return na
}

function fb(F, M, N) {
	var T = "mousemove" !== M,
		V = window;
	var E = N.clientX;
	N = N.clientY;
	var ja = document.createEvent("MouseEvents");
	ja.initMouseEvent(M, !0, T, V, 0, 0, 0, E, N, !1, !1, !1, !1, 0, document.body.parentNode);
	F.dispatchEvent(ja)
}

function qf() {
	new Promise(F => {
		let M = 2,
			N = () => {
				--M;
				0 === M && F()
			};
		if (rf.includes("mod=auction") && rf.includes("ttype=3")) {
			var T = sf();
			(T < localStorage.getItem("auctionMStatus") && tf("AuctionMEmpty") || 4 === T && tf("AuctionMEmpty")) && localStorage.setItem("auctionM.timeOut", 0);
			localStorage.setItem("auctionMStatus", T);
			N()
		} else rf.includes("mod=auction") ? (T = sf(), (T < localStorage.getItem("auctionStatus") && tf("AuctionEmpty") || 4 === T && tf("AuctionEmpty")) && localStorage.setItem("auction.timeOut", 0), localStorage.setItem("auctionStatus",
			T), N()) : (jQuery.get(G({
			mod: "auction",
			ttype: 3,
			itemLevel: 999,
			itemQuality: 2,
			sh: X("sh")
		}), V => {
			V = sf(jQuery(V));
			(V < localStorage.getItem("auctionMStatus") && tf("AuctionMEmpty") || 4 === V && tf("AuctionMEmpty")) && localStorage.setItem("auctionM.timeOut", 0);
			localStorage.setItem("auctionMStatus", V);
			N()
		}), jQuery.get(G({
			mod: "auction",
			itemLevel: 999,
			itemQuality: 2,
			sh: X("sh")
		}), V => {
			V = sf(jQuery(V));
			(V < localStorage.getItem("auctionStatus") && tf("AuctionEmpty") || 4 === V && tf("AuctionEmpty")) && localStorage.setItem("auction.timeOut",
				0);
			localStorage.setItem("auctionStatus", V);
			N()
		}))
	})
}

function uf(F) {
	if (document.querySelector("#inv div.spinner-img")) return setTimeout(() => {
		uf(F)
	}, 500), !1;
	F && F();
	return !0
}
var vf = new URLSearchParams(window.location.search);

function X(F) {
	return vf.get(F)
}
var rf = window.location.search.match(/mod=.*&sh/) ? window.location.search.match(/mod=.*&sh/)[0].slice(0, -3) : null,
	Hf = window.location.hostname.split(/\./) ? window.location.hostname.split(/\./)[0] : null,
	If = {
		Yp: {
			l: "muito longo",
			h: "longo",
			i: "m\u00e9dio",
			j: "curto",
			m: "muito curto"
		},
		Zp: {
			l: "foarte lung",
			h: "lung",
			i: "mijlociu",
			j: "scurt",
			m: "foarte scurt"
		},
		cq: {
			l: "ve\u013emi dlho",
			h: "dlho",
			i: "stredne",
			j: "kr\u00e1tko",
			m: "ve\u013emi kr\u00e1tko"
		},
		pq: {
			l: "jako dugo",
			h: "dugo",
			i: "srednje",
			j: "kratko",
			m: "jako kratko"
		},
		Cp: {
			l: "hyvin pitk\u00e4",
			h: "pitk\u00e4",
			i: "keskim\u00e4\u00e4r\u00e4inen",
			j: "lyhyt",
			m: "hyvin lyhyt"
		},
		aq: {
			l: "mycket l\u00e5ng",
			h: "l\u00e5ng",
			i: "medel",
			j: "kort",
			m: "mycket kort"
		},
		iq: {
			l: "\u00e7ok uzun",
			h: "uzun",
			i: "orta",
			j: "k\u0131sa",
			m: "\u00e7ok k\u0131sa"
		},
		kp: {
			l: "\u0637\u0648\u064a\u0644 \u062c\u062f\u0627\u064b",
			h: "\u0637\u0648\u064a\u0644",
			i: "\u0645\u0646\u062a\u0635\u0641",
			j: "\u0642\u0635\u064a\u0631",
			m: "\u0642\u0635\u064a\u0631\u0629 \u062c\u062f\u0627\u064b"
		},
		Jp: {
			l: "\u05d0\u05e8\u05d5\u05da \u05de\u05d0\u05d5\u05d3",
			h: "\u05d0\u05e8\u05d5\u05da",
			i: "\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9",
			j: "\u05e7\u05e6\u05e8",
			m: "\u05e7\u05e6\u05e8 \u05de\u05d0\u05d5\u05d3"
		},
		gr: {
			l: "\u03c0\u03bf\u03bb\u03cd \u03bc\u03b5\u03b3\u03ac\u03bb\u03b7",
			h: "\u03bc\u03b5\u03b3\u03ac\u03bb\u03b7",
			i: "m\u03ad\u03c3\u03b7",
			j: "\u03bc\u03b9\u03ba\u03c1\u03ae",
			m: "\u03c0\u03bf\u03bb\u03cd \u03bc\u03b9\u03ba\u03c1\u03ae"
		},
		pp: {
			l: "\u043c\u043d\u043e\u0433\u043e \u0434\u044a\u043b\u044a\u0433",
			h: "\u0434\u044a\u043b\u044a\u0433",
			i: "\u0441\u0440\u0435\u0434\u0435\u043d",
			j: "\u043a\u044a\u0441",
			m: "\u043c\u043d\u043e\u0433\u043e \u043a\u044a\u0441"
		},
		$p: {
			l: "\u043e\u0447\u0435\u043d\u044c \u043c\u043d\u043e\u0433\u043e",
			h: "\u043c\u043d\u043e\u0433\u043e",
			i: "\u0441\u0440\u0435\u0434\u043d\u0435",
			j: "\u043c\u0430\u043b\u043e",
			m: "\u043e\u0447\u0435\u043d\u044c \u043c\u0430\u043b\u043e"
		},
		qp: {
			l: "muito tempo",
			h: "longo",
			i: "m\u00e9dio",
			j: "curto",
			m: "bastante curto"
		},
		up: {
			l: "velmi dlouh\u00e1",
			h: "dlouh\u00e1",
			i: "st\u0159edn\u00ed",
			j: "kr\u00e1tk\u00e1",
			m: "velmi kr\u00e1tk\u00e1"
		},
		wp: {
			l: "meget lang tid",
			h: "lang tid",
			i: "halv tid",
			j: "kort tid",
			m: "meget kort tid"
		},
		vp: {
			l: "sehr lange",
			h: "lange",
			i: "mittel",
			j: "kurz",
			m: "sehr kurz"
		},
		xp: {
			l: "v\u00e4ga pikk",
			h: "pikk",
			i: "keskmine",
			j: "l\u00fchike",
			m: "v\u00e4ga l\u00fchike"
		},
		yp: {
			l: "very long",
			h: "long",
			i: "middle",
			j: "short",
			m: "very short"
		},
		mq: {
			l: "very long",
			h: "long",
			i: "middle",
			j: "short",
			m: "very short"
		},
		lp: {
			l: "muy largo",
			h: "largo",
			i: "medio",
			j: "corto",
			m: "muy corto"
		},
		Ap: {
			l: "muy largo",
			h: "largo",
			i: "medio",
			j: "corto",
			m: "muy corto"
		},
		Qp: {
			l: "muy largo",
			h: "largo",
			i: "medio",
			j: "corto",
			m: "muy corto"
		},
		Dp: {
			l: "tr\u00e8s longtemps",
			h: "longtemps",
			i: "moyen",
			j: "court",
			m: "tr\u00e8s court"
		},
		Lp: {
			l: "lunghissima",
			h: "lunga",
			i: "media",
			j: "breve",
			m: "brevissima"
		},
		Np: {
			l: "\u013coti gar\u0161",
			h: "gar\u0161",
			i: "vid\u0113js",
			j: "\u012bss",
			m: "\u013coti \u012bss"
		},
		Mp: {
			l: "labai ilgai",
			h: "ilgai",
			i: "vidutini\u0161kai",
			j: "trumpai",
			m: "labai trumpai"
		},
		Ip: {
			l: "nagyon hossz\u00fa",
			h: "hossz\u00fa",
			i: "k\u00f6zepes",
			j: "r\u00f6vid",
			m: "nagyon r\u00f6vid"
		},
		Rp: {
			l: "heel lang",
			h: "lang",
			i: "gemiddeld",
			j: "kort",
			m: "zeer kort"
		},
		qj: {
			l: "veldig lenge",
			h: "lenge",
			i: "medium",
			j: "kortvarig",
			m: "veldig kort"
		},
		Xp: {
			l: "bardzo d\u0142ugi",
			h: "d\u0142ugi",
			i: "\u015bredni",
			j: "kr\u00f3tki",
			m: "bardzo kr\u00f3tki"
		},
		kq: {
			l: "\u8d85\u9577",
			h: "\u8f03\u9577",
			i: "\u5e38\u898f\u6642\u9593",
			j: "\u8f03\u77ed",
			m: "\u8d85\u77ed"
		}
	},
	sf = (F = document) => {
		F = jQuery(".description_span_right", F).text().trim().toLowerCase();
		for (const M in If) {
			const N = If[M],
				T = Object.values(N);
			for (const V in N)
				if (N[V].toLowerCase() === F) return T.indexOf(N[V])
		}
		return -1
	};
async function Jf(F = "-1", M = "") {
	const N = G({
		mod: "packages",
		submod: "sort",
		page: "1",
		sh: X("sh")
	});
	jQuery.post(N, {
		packageSorting: "in_desc"
	});
	return Promise.all(Array.from({
		length: 2
	}, (T, V) => V + 1).map(async T => await Kf(F, M, T))).then(T => T.reduce((V, E) => V.concat(E), []))
}
async function Kf(F = "-1", M = "", N) {
	F = await jQuery.get(G({
		mod: "packages",
		f: "0",
		fq: F || -1,
		qry: M || "",
		page: N,
		sh: X("sh")
	}), () => {});
	return Array.from(jQuery(F).find(".packageItem"))
}

function Lf(F) {
	setTimeout(() => {
		window.location.reload(!1)
	}, F)
}

function Mf(F) {
	window.location.href = `${window.location.origin}/game/index.php?${F}&sh=${X("sh")}`
}

function Fh(F) {
	F && (F.classList.contains("disabled") ? window.location.reload() : F.click())
}

function Gh() {
	return {
		o: parseInt($("#header_values_hp_percent")[0].innerText, 10),
		gold: Number($("#sstat_gold_val")[0].innerHTML.replace(/\./g, "")),
		jo: document.querySelectorAll("#cooldown_bar_expedition .cooldown_bar_fill_ready")[0],
		ho: document.querySelectorAll("#cooldown_bar_dungeon .cooldown_bar_fill_ready")[0],
		jq: document.querySelectorAll("#cooldown_bar_ct .cooldown_bar_fill_ready")[0],
		Fa: document.getElementById("expeditionpoints_value_point").innerText,
		fo: document.getElementById("dungeonpoints_value_point").innerText,
		mp: document.querySelectorAll("#cooldown_bar_arena .cooldown_bar_fill_ready")[0],
		An: parseInt(document.getElementById("sstat_ruby_val").innerText, 10),
		level: parseInt(document.getElementById("header_values_level").innerText, 10)
	}
}

function tf(F) {
	let M = (new Date).getTime(),
		N = localStorage.getItem(F + ".timeOut");
	null === N ? (localStorage.setItem(F + ".timeOut", 0), N = 0) : N = parseInt(N, 10);
	return N <= M ? !0 : !1
}

function Hh() {
	let F = 0;
	JSON.parse(localStorage.getItem("packagesPurchased") || "[]").forEach(M => {
		F += Math.round(.04 * M.price)
	});
	return Gh().gold >= F ? !0 : !1
}

function Ih(F, M) {
	M -= F;
	let N = .04 * F;
	JSON.parse(localStorage.getItem("packagesPurchased") || "[]").forEach(T => {
		N += Math.round(.04 * T.price)
	});
	return M >= N
}

function Z(F, M) {
	localStorage.setItem(F + ".timeOut", (new Date).getTime() + Math.floor(6E4 * (M ? M : 5)))
};
(async function() {
	function F() {
		const b = document.getElementById("mainnav");
		return b ? !!b.querySelector('a[href*="mod=dungeon"], a[href*="submod=showDungeons"]') : !1
	}

	function M() {
		var b = document.getElementById("mainnav");
		return b ? b.querySelector('a[href*="submod=showExpeditions"]') || (b = b.querySelector('a[href*="mod=location&loc="]')) && (b = b.getAttribute("href").match(/loc=([^&]+)/)) && !isNaN(parseInt(b[1], 10)) ? !0 : !1 : !1
	}

	function N() {
		var b = document.getElementById("mainnav");
		if (!b) return !1;
		b = b.querySelector('a[href*="mod=location&loc="]');
		return b ? (b = b.getAttribute("href").match(/loc=([^&]+)/)) ? isNaN(parseInt(b[1], 10)) : !1 : !1
	}

	function T() {
		wf = setInterval(function() {
			xf++;
			5 >= xf ? location.reload() : clearInterval(wf)
		}, 12E4)
	}

	function V() {
		var b = "Pantheon;Panteon;Gudarnas tempel;\u0628\u0627\u0646\u062a\u064a\u0648\u0646;\u041f\u0430\u043d\u0442\u0435\u043e\u043d;Panth\u00e9on;\u795e\u8aed;\u05e4\u05e0\u05ea\u05d9\u05d0\u05d5\u05df".split(";"),
			c = null;
		for (var e of b)
			if (c = document.querySelector(`a[title="${e}"]`)) break;
		return c && (b = c.innerHTML,
			(e = b.match(/<font color="green">(\d+)<\/font>/)) && 0 < e[1] || b.includes('color="green"') || b.includes("Nowe") || b.includes("Yeni") || b.includes("New") || b.includes('color="yellow"') || b.includes("Yeni") || b.includes("Nowe") || b.includes("New") || (c = c.innerText.match(/Pantheon \((\d+)\)/)) && 0 < c[1]) ? (localStorage.setItem("nextQuestTime", 0), localStorage.setItem("nextQuestTime.timeOut", 0), !0) : !1
	}

	function E(b) {
		function c(g) {
			let l = localStorage.getItem(g);
			l && (l = JSON.parse(l), localStorage.setItem(g, JSON.stringify(l.slice(-20))))
		}
		var e = document.querySelector("#logEntriesContainer");
		if (e) {
			var h = new Date,
				k = `${h.getHours().toString().padStart(2,"0")}:${h.getMinutes().toString().padStart(2,"0")}`;
			h = document.createElement("p");
			h.style.margin = "0";
			h.style.padding = "0";
			h.style.fontSize = "12px";
			b = `[${k}] ${b}`;
			h.textContent = b;
			e.prepend(h);
			(e = localStorage.getItem("savedLogs")) ? e = JSON.parse(e): e = [];
			e.unshift(b);
			30 < e.length && e.pop();
			localStorage.setItem("savedLogs", JSON.stringify(e));
			c("bidList");
			c("smeltedItems");
			c("MarketboughtItems")
		}
	}

	function ja(b, c) {
		switch (b) {
			case "itemRepaired":
				ma.Jm++;
				break;
			case "itemReset":
				ma.Km++;
				break;
			case "goldCycled":
				ma.Hm++;
				break;
			case "arenaAttacks":
				ma.wm++;
				break;
			case "circusAttacks":
				ma.zm++;
				break;
			case "dungeonAttacks":
				ma.Cm++;
				break;
			case "expeditionAttacks":
				ma.Em++;
				break;
			case "itemSmelted":
				ma.Lm++;
				break;
			case "underworldAttacks":
				ma.Sm++;
				break;
			case "arenaMoney":
				ma.gm += c;
				break;
			case "circusMoney":
				ma.hm += c
		}
		localStorage.setItem("userStats", JSON.stringify(ma))
	}

	function na() {
		gb || (gb = document.createElement("div"),
			gb.className = "confirmation-popup", gb.innerHTML = '\n                <p>Are you sure you want to reset the bot?</p>\n                <button id="confirmReset">Yes</button>\n                <button id="cancelReset">No</button>\n            ', document.body.appendChild(gb), document.getElementById("confirmReset").addEventListener("click", function() {
				const b = ["tkz_lcr", "Username", "tkn", "nana_lcn"];
				let c = [];
				for (let e = 0; e < localStorage.length; e++) {
					const h = localStorage.key(e);
					!h || b.includes(h) || h.startsWith("gladiatusCrazyAddonData_") ||
						c.push(h)
				}
				for (const e of c) localStorage.removeItem(e);
				window.location.reload();
				gb.style.display = "none"
			}), document.getElementById("cancelReset").addEventListener("click", function() {
				gb.style.display = "none"
			}));
		gb.style.display = "block"
	}

	function za(b, c) {
		return null == b ? "" : b.split("").map(e => String.fromCharCode(e.charCodeAt(0) + c)).join("")
	}
	async function ta(b, c, e, h) {
		h = za(h, 3);
		const k = {
			action: "vx",
			data: {
				token: b,
				refreshToken: c,
				playerId: e,
				zp: h
			}
		};
		try {
			const g = await Promise.race([new Promise((l, q) => {
				chrome.runtime.sendMessage(k,
					n => {
						chrome.runtime.zo || !n ? q(chrome.runtime.zo || "No response") : l(n)
					})
			}), new Promise(l => setTimeout(() => l("timeout"), 6E4))]);
			if ("timeout" === g) await new Promise(l => setTimeout(l, 1E3)), window.location.reload();
			else if (g.success || g.s) {
				const l = g.data || g.d;
				if (l.valid && !l.expired) return aa = l.playerId, ha = l.supportDevs, "true" !== localStorage.getItem("nana_lcn") && localStorage.setItem("nana_lcn", "true"), l.announcement && 0 <= l.announcement.length && localStorage.getItem("latestAnnouncement") !== l.announcement && localStorage.setItem("latestAnnouncement",
					l.announcement), await Qh(l.supportDevs).then(q => {
					fa = q
				}), !0;
				if (l.expired && (sessionStorage.setItem("autoGoActive", "false"), l.newToken)) return l.newToken && (localStorage.setItem("token", l.newToken + 1), localStorage.setItem("nana_lcn", "false"), aa = ec() + "l", hb()), !1
			} else new Promise(l => setTimeout(() => l("timeout"), 3E4))
		} catch (g) {
			return window.location.reload(), !1
		}
	}

	function Rh(b) {
		return ((localStorage.getItem("playerId") | 0) + 5 | 0) % 100 === b
	}
	async function Qh(b) {
		function c(l) {
			const q = [];
			for (let n = 0; n < l.length; n +=
				2) q.push(parseInt(l.substr(n, 2), 16));
			return new Uint8Array(q)
		}
		const [e, h] = b.split(":");
		b = c(e);
		const k = c(h),
			g = await window.crypto.subtle.importKey("raw", c("46d9ef519c1474cf8699ba24ab2a726a"), {
				name: "AES-CBC"
			}, !1, ["decrypt"]);
		b = await window.crypto.subtle.decrypt({
			name: "AES-CBC",
			iv: b
		}, g, k);
		b = (new TextDecoder).decode(new Uint8Array(b));
		b = new Date(b);
		b.setHours(0, 0, 0, 0);
		return b
	}

	function Sh(b) {
		(b.target.classList.contains("licotok-close") || "licotok" === b.target.id) && document.getElementById("licotok").remove()
	}
	async function Th() {
		ec();
		const b = document.getElementById("licotok-input").value.trim(),
			c = localStorage.getItem("playerId"),
			e = document.getElementById("status_message");
		let h = null;
		try {
			h = await (await fetch("https://fociisoftware.com/validate-license", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					licenseKey: b,
					playerId: c
				})
			})).json()
		} catch (k) {
			try {
				h = await (await fetch("https://glad.fociisoftware.com/validate-license", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						licenseKey: b,
						playerId: c
					})
				})).json()
			} catch (g) {}
		}
		h ? h.valid ? (localStorage.setItem("nana_lcn", "true"), localStorage.setItem("tkz_lcr", h.token), localStorage.setItem("license_remaining", h.expirationDate), localStorage.setItem("tkn", h.refreshToken), localStorage.setItem("pid", c), aa = c, window.location.reload()) : h.message ? e.textContent = h.message : (e.textContent = "Invalid license key or token! Just purchased? Wait 10 minutes before activating the key.", e.style.display = "block") : (e.textContent =
			"Error communicating with the server. Please try again later!", e.style.display = "block")
	}

	function Ya(b) {
		var c = document.createElement("div");
		c.setAttribute("id", "licotok");
		c.innerHTML = `
        <style>
            .licotok-popup {
            background: #ddd5b4; /* Beige background */
            box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            color: #333; /* Darker text color for better contrast */
            padding: 20px;
            border: 1px solid #c4ac70; /* Golden border */
            font-family: Arial, sans-serif; /* Optional: Change the font */
            }
        
            .licotok-popup h2 {
            color: #333;
            text-shadow: none; /* Removing text shadow for better readability */
            background: linear-gradient(to right, #c4ac70, #ddd5b4); /* Gradient title background */
            padding: 10px;
            margin: -20px; /* To offset the padding of the parent */
            margin-bottom: 15px;
            border-radius: 10px 10px 0 0; /* Rounded corners on the top */
            }
        
            .licotok-popup a {
            text-decoration: none;
            color: #fff; /* White text for buttons */
            background-color: #c4ac70; /* Golden background */
            border-radius: 5px;
            padding: 5px 10px;
            margin-right: 10px;
            transition: background-color 0.3s ease;
            }
        
            .licotok-popup a:hover {
            background-color: #b3a369; /* Darker shade on hover */
            }
        
            .licotok-popup input {
            width: calc(100% - 10px); /* Full width minus padding */
            padding: 5px;
            margin-bottom: 10px;
            border: 1px solid #c4ac70; /* Border color similar to the theme */
            border-radius: 5px;
            }
        

            
            .licotok-popup #status_message {
            margin-top: 10px;
            }
        </style>
        <div class="licotok-popup">
        <h2>Warning</h2>
        <span style="color: black" class="span-new">${b}</span>
        <p>
        <button id="licotok-close" class="awesome-button">Close</button>
        <div id="status_message"></div>
    </div>
        
        `;
		document.getElementById("header_game").insertBefore(c, document.getElementById("header_game").children[0]);
		c.querySelector("#licotok-close").addEventListener("click", function() {
			c.remove()
		})
	}

	function Uh() {
		var b = document.createElement("div");
		b.setAttribute("id", "licotok");
		b.innerHTML = '\n        <style>\n            .licotok-popup {\n            background: #ddd5b4; /* Beige background */\n            box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.3);\n            border-radius: 10px;\n            color: #333; /* Darker text color for better contrast */\n            padding: 20px;\n            border: 1px solid #c4ac70; /* Golden border */\n            font-family: Arial, sans-serif; /* Optional: Change the font */\n            }\n        \n            .licotok-popup h2 {\n            color: #333;\n            text-shadow: none; /* Removing text shadow for better readability */\n            background: linear-gradient(to right, #c4ac70, #ddd5b4); /* Gradient title background */\n            padding: 10px;\n            margin: -20px; /* To offset the padding of the parent */\n            margin-bottom: 15px;\n            border-radius: 10px 10px 0 0; /* Rounded corners on the top */\n            }\n        \n            .licotok-popup a {\n            text-decoration: none;\n            color: #fff; /* White text for buttons */\n            background-color: #c4ac70; /* Golden background */\n            border-radius: 5px;\n            padding: 5px 10px;\n            margin-right: 10px;\n            transition: background-color 0.3s ease;\n            }\n        \n            .licotok-popup a:hover {\n            background-color: #b3a369; /* Darker shade on hover */\n            }\n        \n            .licotok-popup input {\n            width: calc(100% - 10px); /* Full width minus padding */\n            padding: 5px;\n            margin-bottom: 10px;\n            border: 1px solid #c4ac70; /* Border color similar to the theme */\n            border-radius: 5px;\n            }\n        \n\n            \n            .licotok-popup #status_message {\n            margin-top: 10px;\n            }\n        </style>\n        <div class="licotok-popup">\n            <h2>Enter Your License Key</h2>\n            <input id="licotok-input" type="text" placeholder="License Key">\n            &nbsp&nbsp&nbsp<a href="https://fociisoftware.com/#gladbot" target="_blank">Gladbot Management Site</a>\n            <p>\n            <a href="https://gladbotius.gumroad.com/l/vntkyw" target="_blank">Buy with Gumroad</a>\n            <a href="https://fociisoftware.com/#gladbot" target="_blank">Buy with PayPal</a>\n            <p>\n            <a href="#" id="get-trial-key-a">Get a Trial Key</a>\n            <a href="https://discord.gg/dKCTFFnkjZ" target="_blank">Discord</a>\n            <a href="https://www.paypal.com/donate/?hosted_button_id=7TVLC3GZ9GLD8" target="_blank" rel="noopener noreferrer">Donate</a>\n\n            <div id="alertMessage" class="alert-message" style="display: none; font-weight: bold;"></div>\n\n            <li>\n            <span style="color: class="span-new">[ENGLISH] For better experience, install crazy-addon and open another tab for manual tasks. If you clear your caches or reinstall the browser. You have to enter your key again to enable the bot.</span>\n            </li>\n            <hr>\n            <li>\n            <span style="color: class="span-new">[TURKISH] Daha iyi kullanim icin, crazy-addon kurabilir ve manuel islerinizi yeni sekmeden yapabilirsiniz. Eger tarayici temizligi veya tekrar yukleme islemi yapmissaniz, lisansi tekrar girmeniz gerekebilir. Deneme surumu icin \'Get a trial key\' e basip, kirmizi cikan lisans kodunu kopyalayip submitleyebilirsiniz.</span>\n            </li>\n            <p>\n\n            <button class="awesome-button licotok-submit">Submit</button>\n            <button class="awesome-button licotok-close">Close</button>\n            <div id="status_message"></div>\n        </div>\n        ';
		document.getElementById("header_game").insertBefore(b, document.getElementById("header_game").children[0]);
		b.addEventListener("click", Sh);
		b.querySelector(".licotok-submit").addEventListener("click", Th);
		let c = localStorage.getItem("playerId");
		if (null == c) try {
			ec(), c = localStorage.getItem("playerId")
		} catch {}
		b.querySelector("#get-trial-key-a").addEventListener("click", function() {
			async function e(h) {
				return fetch(h, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						playerId: c
					})
				}).then(k =>
					k.json()).then(k => {
					var g = document.getElementById("alertMessage");
					k.success ? (g.textContent = "Your 3 day trial key : " + k.trialKey, g.style.display = "block", localStorage.setItem("nana_lcn", "true"), localStorage.setItem("trlky_lcr", k.trialKey), localStorage.setItem("tkz_lcr", k.token), localStorage.setItem("pid", c)) : (g.textContent = "You have already used a trial key", g.style.display = "block")
				})
			}
			e("https://www.fociisoftware.com/get-trial").catch(() => e("https://glad.fociisoftware.com/get-trial")).catch(() => {})
		})
	}

	function ec() {
		let b;
		if (!b) {
			const c = /var playerId\s*=\s*(\d+);/;
			Array.from(document.getElementsByTagName("script")).some(e => (e = c.exec(e.textContent || e.innerText)) && e[1] ? (b = e[1], !0) : !1)
		}
		if (!b) {
			const c = document.getElementById("content");
			c && c.querySelectorAll('section[style="display: block;"]').forEach(e => {
				Array.from(e.getElementsByTagName("p")).forEach(h => {
					Array.from(h.getElementsByTagName("b")).forEach(k => {
						k = k.textContent.trim();
						k.includes("gladiatus.gameforge.com/game/index.php?mod=player&") && (b = (new URLSearchParams((new URL(k)).search)).get("p"))
					})
				})
			})
		}
		b ||
			(document.cookie.split("; ").forEach(c => {
				c.trim().startsWith("gladiatus") && !b && (c = decodeURIComponent(c.split("=")[1]).match(/^\d+/)) && (b = c[0])
			}), document.cookie.split("; ").forEach(c => {
				c.trim().startsWith("GB_") && !b && (c = c.split("=")[1].split("_"), b = 0 < c.length && !isNaN(c[0]) ? c[0] : null)
			}));
		return b ? (localStorage.setItem("playerId", b), localStorage.setItem("pid", b), b) : null
	}

	function Vh() {
		let b = document.querySelector(".playername") || document.querySelector(".playername_achievement");
		b && (b = b.textContent.trim(),
			localStorage.setItem("Username", b))
	}
	async function yf() {
		try {
			const b = await jQuery.get(G({
				mod: "premium",
				submod: "centurio",
				sh: X("sh")
			}));
			return (new DOMParser).parseFromString(b, "text/html").querySelector("#premium_duration") ? !1 : !0
		} catch (b) {}
	}

	function ob(b, c, e) {
		var h = "";
		e && (h = new Date, h.setTime(h.getTime() + 864E5 * e), h = "; expires=" + h.toUTCString());
		document.cookie = b + "=" + (c || "") + h + "; path=/; domain=.gameforge.com"
	}

	function pb(b) {
		b += "=";
		for (var c = document.cookie.split(";"), e = 0; e < c.length; e++) {
			for (var h = c[e];
				" " ===
				h.charAt(0);) h = h.substring(1, h.length);
			if (0 === h.indexOf(b)) return h.substring(b.length, h.length)
		}
		return null
	}

	function zf(b) {
		document.cookie = `glautologin=${b?"true":"false"}; path=/; domain=.gameforge.com; samesite=strict`
	}

	function Mc() {
		return "true" === localStorage.getItem("nana_lcn") && fc && fa >= new Date && wa === Nc && aa === wa
	}

	function Oc(b, c) {
		b.style.border = "1px solid #c4ac70";
		b.style.backgroundColor = c;
		b.style.color = "black";
		b.style.padding = "5px 10px";
		b.style.cursor = "pointer";
		b.style.borderRadius = "5px";
		b.style.flexGrow =
			"1";
		b.style.marginRight = "5px";
		b.style.fontFamily = "Arial, sans-serif";
		b.style.transition = "background-color 0.2s"
	}

	function Af() {
		localStorage.setItem("logMenuHeight", qa.style.height)
	}

	function Wh() {
		var b = document.querySelector(".playername.ellipsis");
		const c = wa;
		b && (b = `${b.textContent.trim()}-${c}`, localStorage.setItem("Username", b), document.cookie = `gllastusername=${b}; path=/; domain=.gameforge.com; samesite=strict`)
	}
	async function Xh() {
		var b = {
			async Qm() {
				var c = `mod=guildMarket&fl=0&fq=-1&f=0&qry=&seller=&s=${localStorage.getItem("filterGM")}&p=1`;
				if (rf !== c) Mf(c);
				else try {
					const q = localStorage.getItem("guildPackHour");
					let n = JSON.parse(localStorage.getItem("packagesPurchased") || "[]");
					if (n.length) {
						var e = n[0],
							h = await Jf(e.quality, e.itemName);
						h = h.filter(m => {
							m = m.querySelector(".ui-draggable");
							return e.itemLevel === Hb(m) && e.itemName === Zb(m) && e.basis === xb(m) && e.quality === nb(m) && e.amount === yb(m)
						});
						if (h.length && h[0].querySelector(".ui-draggable")) {
							const m = h[0].querySelector(".ui-draggable");
							Hb(m);
							Zb(m);
							xb(m);
							nb(m);
							yb(m);
							var k = parseInt(m.getAttribute("data-measurement-x"),
									10),
								g = parseInt(m.getAttribute("data-measurement-y"), 10),
								l = h[0].querySelector("input").value;
							let {
								spot: r,
								bag: x
							} = await dc(k, g);
							const u = await jQuery.post(U({
									mod: "inventory",
									submod: "move",
									from: "-" + l,
									fromX: 1,
									fromY: 1,
									to: x,
									toX: r.x + 1,
									toY: r.y + 1,
									amount: e.amount
								}), {
									a: (new Date).getTime(),
									sh: X("sh")
								}),
								w = JSON.parse(u).to.data.itemId;
							c = 0;
							if (2 > c || u.includes("containerNumber"))
								if ((await jQuery.post(G({
										mod: "guildMarket",
										sh: X("sh")
									}), {
										sellid: w,
										preis: e.price,
										dauer: q || 3,
										sell_mode: 0,
										anbieten: "Offer"
									})).includes("<!DOCTYPE HTML>")) E("Item " +
									e.itemName + " sold for " + e.price + " gold"), ja("goldCycled", 0), n.shift(), localStorage.setItem("packagesPurchased", JSON.stringify(n)), window.location.reload();
								else if (c++, 2 > c) await this.Qm();
							else {
								const A = JSON.parse(localStorage.getItem("Timers"));
								Z("gold", A.GuildMarket || 2);
								window.location.reload()
							}
						} else n.shift(), localStorage.setItem("packagesPurchased", JSON.stringify(n)), window.location.reload()
					}
				} catch (q) {
					E("Empty first slots of the first inventory at least 2x3."), window.location.reload()
				}
			},
			async Vn(c,
				e) {
				let h = c.shift();
				var k = !1;
				const g = {
					GUILD_TOOLS: ["2097152", "1048576", "8388608", "4194304"],
					GUILD_FORGE_RESOURCES: ["32768"],
					GUILD_WEAPONS: ["2"],
					GUILD_SHIELD: ["4"],
					GUILD_CHEST: ["8"],
					GUILD_HELMET: ["1"],
					GUILD_GLOVES: ["256"],
					GUILD_SHOES: ["512"],
					GUILD_RINGS: ["48"],
					GUILD_AMULETS: ["1024"],
					GUILD_USABLES: ["4096"],
					GUILD_FOOD: ["64"],
					GUILD_UPGRADES: ["4096"],
					GUILD_RECIPES: ["8192"],
					GUILD_MERCENARY: ["16384"],
					GUILD_SCROLLS: ["64"],
					GUILD_REINFORCEMENTS: ["4096"]
				};
				let l = JSON.parse(localStorage.getItem("itemsToResetGuild") ||
					"[]");
				for (l = l.map(q => !q.startsWith("GUILD_") && g["GUILD_" + q] ? "GUILD_" + q : q); h;) {
					const q = h.type;
					(0 === l.length || l.some(n => g[n]?.includes(q))) && Ih(h.price, e) && e >= h.price && (e -= h.price, await jQuery.post(G({
						mod: "guildMarket",
						sh: X("sh")
					}), {
						buyid: h.id,
						f: 0,
						fl: 0,
						fq: -1,
						p: 1,
						buy: "Comprar"
					}), k = JSON.parse(localStorage.getItem("packagesPurchased") || "[]"), k.push(h), localStorage.setItem("packagesPurchased", JSON.stringify(k)), E("Item Bought: " + h.itemName + " for " + h.price), k = !0);
					h = c.shift()
				}
				return k
			},
			async buy() {
				const c =
					localStorage.getItem("filterGM"),
					e = JSON.parse(localStorage.getItem("Timers"));
				let h = Number(localStorage.getItem("currentPage") || 1);
				var k = `mod=guildMarket&fl=0&fq=-1&f=0&qry=&seller=&s=${c}&p=${h}`;
				if (rf !== k) Mf(k);
				else if (!(da.gold <= Number(localStorage.getItem("KasaHoldGold")))) {
					var g = document.querySelectorAll("#market_item_table tr"),
						l = document.querySelectorAll("#market_item_table input[name=buyid]");
					k = [];
					for (let q = 1; q < g.length; q++) {
						let n = g[q].querySelectorAll("td"),
							m = n[0].querySelector("div"),
							r =
							Number(n[2].innerText.replace(/\./g, "")),
							x = n[5].querySelector("input");
						"cancel" === x.name || x.classList.contains("disabled") || r < Number(localStorage.getItem("minimumGoldAmount")) || r > Gh().gold - Number(localStorage.getItem("KasaHoldGold")) || k.push({
							id: l[q - 1].value,
							itemLevel: Hb(m),
							itemName: Zb(m),
							basis: xb(m),
							type: Gb(m),
							quality: nb(m),
							amount: yb(m),
							sellerName: n[1].querySelector("span").innerText,
							price: r
						})
					}
					g = Gh().gold - Number(localStorage.getItem("KasaHoldGold") || 0);
					if (k.length && Hh()) await this.Vn(k, g) || Z("gold",
						e.GuildMarket || 2), window.location.reload();
					else try {
						const q = document.querySelector(".standalone").textContent.match(/(\d+)\s*\/\s*(\d+)/);
						h < (q ? parseInt(q[2], 10) : 1) ? (localStorage.setItem("currentPage", h + 1), Mf(`mod=guildMarket&fl=0&fq=-1&f=0&qry=&seller=&s=${c}&p=${h+1}`)) : (localStorage.setItem("currentPage", 1), Z("gold", e.GuildMarket || 2), window.location.reload())
					} catch (q) {
						E("No items to buy in guild market today. :/"), localStorage.setItem("currentPage", 1), Z("gold", e.GuildMarket || 2), window.location.reload()
					}
				}
			}
		};
		0 < JSON.parse(localStorage.getItem("packagesPurchased") || "[]").length ? await b.Qm() : da.gold > Number(localStorage.getItem("minimumGoldAmount")) + Number(localStorage.getItem("KasaHoldGold") || 0) ? await b.buy() : (b = JSON.parse(localStorage.getItem("Timers")), Z("gold", b.GuildMarket || 2), window.location.reload())
	}

	function Yh() {
		var b = document.getElementById("submenuhead1"),
			c = document.getElementById("submenu1"),
			e = document.getElementById("submenuhead2"),
			h = document.getElementById("submenu2"),
			k = document.getElementById("main");
		k && (k.style.height = "950px", k.style.minHeight = "950px");
		b && (b.style.display = "block");
		c && (c.style.display = "block");
		e && (e.style.display = "none");
		h && (h.style.display = "none")
	}

	function Pc() {
		var b = localStorage.getItem("premiumDicesLeft");
		b = parseInt(b, 10);
		return isNaN(b) ? 0 : b
	}

	function Zh() {
		var b = document.querySelector(".contentboard_footer_long .contentboard_inner");
		if (b) {
			b.style.position = "relative";
			b.style.overflowX = "visible";
			b.style.overflowY = "visible";
			b.style.height = "auto";
			b.style.minHeight = "450px !important";
			var c = document.createElement("div");
			c.id = "customContainer";
			c.style.cssText = "border: 2px solid #BA9700; padding: 10px; margin-top: 20px;  border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); text-align: center; width: 100%; box-sizing: border-box; min-height: 400px;";
			b.appendChild(c);
			b = document.createElement("button");
			b.textContent = "Start";
			b.className = "button1";
			b.style.marginTop = "10px";
			c.appendChild(b);
			var e = document.createElement("button");
			e.textContent = "Stop";
			e.className = "button1";
			e.style.marginTop =
				"10px";
			c.appendChild(e);
			var h = document.createElement("div");
			h.id = "dicesLeft";
			var k = Pc();
			h.textContent = `Dices left: ${k}`;
			h.style.fontWeight = "bold";
			h.style.marginTop = "10px";
			c.appendChild(h);
			h = document.createElement("div");
			h.textContent = 'GladBot: Use the dices to refresh the mystery box and find valuable items before opening them (Etc. Costumes). Click "Start" open chests.';
			h.style.marginTop = "5px";
			c.appendChild(h);
			h = document.createElement("div");
			h.id = "results";
			h.style.cssText = "display: flex; flex-wrap: wrap; justify-content: center; gap: 5px; margin-top: 10px; overflow-x: hidden; overflow-y: auto; max-height: 400px;";
			c.appendChild(h);
			var g = document.createElement("div");
			g.id = "progressIndicator";
			g.textContent = "Ready to start.";
			g.style.marginTop = "10px";
			c.appendChild(g);
			b.addEventListener("click", async function() {
				g.textContent = "Processing...";
				await $h()
			});
			e.addEventListener("click", function() {
				g.textContent = "Process stopped by user. Completed!";
				window.location.reload()
			});
			ai()
		}
	}

	function ai() {
		let b;
		var c = document.querySelector(".mysterybox_count");
		c = c ? parseInt(c.textContent, 10) : 0;
		localStorage.setItem("chestsLeft", c);
		var e = document.getElementById("mysterybox_luck");
		if (e)
			for (var h of e.childNodes)
				if (h.nodeType !== Node.TEXT_NODE && h.nodeType === Node.ELEMENT_NODE)
					if ("IMG" === h.tagName && h.currentSrc.includes("4197f09a37be7d221c34f3e0d957e7.png")) break;
					else "INPUT" === h.tagName && "button" === h.type && (e = h.getAttribute("onclick").match(/tokenAmount=(\d+)/)) && e[1] && (b = parseInt(e[1], 10));
		h = document.getElementById("dicesLeft");
		e = Pc();
		h.textContent = 0 > b ? "Dices left: Cannot determine. Please refresh the page." : `Dices left: ${e}`;
		localStorage.setItem("chestsLeft", c);
		localStorage.setItem("premiumDicesLeft", b)
	}
	async function $h() {
		0 >= parseInt(localStorage.getItem("premiumDicesLeft"), 10) ? alert("No dices left!") : await Qc()
	}
	async function Qc() {
		let b = parseInt(localStorage.getItem("premiumDicesLeft"), 10),
			c = parseInt(localStorage.getItem("chestsLeft"), 10);
		const e = document.getElementById("progressIndicator");
		if (!b || 0 >= b && 0 >= c) e.textContent = "All actions completed: No dices or chests left.";
		else if (!b || 0 >= b) e.textContent = "No dices left. Trying to open remaining chests...",
			await gc();
		else if (!c || 0 >= c) e.textContent = "No chests left!";
		else {
			e.textContent = "Refreshing mystery box...";
			var h = (new URL(window.location.href)).searchParams.get("sh") || "",
				k = document.querySelectorAll(".mysterybox_reward_item_pool"),
				g = "Vulcano;Junos;Bergzorns;Weitsicht;Eole;Junon;Armure;Masque;Vulcain;Neptuno;Eolo;Armatura;Sguardo;Olhos;Alento;Nettuno;Respiro;Soffio;mortal de;Aliento;Armadura;Vista;Zbroja;Orli;Neptuna;Feronii;Wulkana;Wrath;Eagle;Pluto;Neptune;Vulcanus;Junosa;Plutosa;Ajolos;Vulcano;Feronia;Feronias;Plutos;Neptun;Aeolus;Pluton;Juno;Ejderha;Kartal;nefesi".split(";"),
				l = !1;
			for (let q of k) {
				const n = q.getAttribute("data-tooltip");
				if (g.some(m => n.includes(m))) {
					l = !0;
					break
				}
			}
			if (l) await gc();
			else try {
				const q = await jQuery.get(G({
					mod: "mysterybox",
					submod: "refresh",
					hq: b,
					sh: h
				}));
				b--;
				localStorage.setItem("premiumDicesLeft", b);
				const n = document.getElementById("dicesLeft"),
					m = Pc();
				n.textContent = `Dices left: ${m}`;
				const r = (new DOMParser).parseFromString(q, "text/html").querySelectorAll(".mysterybox_reward_item_pool");
				h = "Vulcano Feronia Neptun Aeolus Pluton Juno Ejderha Kartal nefesi".split(" ");
				k = !1;
				for (let x of r) {
					const u = x.getAttribute("data-tooltip");
					if (u && h.some(w => u.includes(w))) {
						k = !0;
						break
					}
				}
				k ? await gc() : 0 < b ? setTimeout(Qc, 1E3) : 0 < c ? await gc() : (e.textContent = "Completed all possible actions.", E("No more actions possible: No premium dices or chests left."))
			} catch (q) {
				E("Error refreshing mystery box. Please try again.")
			}
		}
	}
	async function gc() {
		let b = parseInt(localStorage.getItem("premiumDicesLeft"), 10),
			c = parseInt(localStorage.getItem("chestsLeft"), 10);
		const e = document.getElementById("progressIndicator");
		if (!c || 0 >= c) e.textContent = "No chests left to open!";
		else {
			e.textContent = "Opening chest...";
			var h = (new URL(window.location.href)).searchParams.get("sh") || "",
				k = (new Date).getTime();
			try {
				const g = await jQuery.get(U({
					mod: "mysterybox",
					submod: "pick",
					sh: h,
					a: k
				}));
				b--;
				c--;
				localStorage.setItem("premiumDicesLeft", b);
				localStorage.setItem("chestsLeft", c);
				(new DOMParser).parseFromString(g, "text/html");
				const l = document.querySelector(`.mysterybox_reward_item_pool img[alt="${g}"]`);
				if (l) {
					const q = document.createElement("div");
					q.className = "result-item";
					q.style.border = "1px solid #ccc";
					q.style.borderRadius = "5px";
					q.style.padding = "2px";
					q.style.margin = "1px";
					q.style.textAlign = "center";
					q.style.backgroundColor = "#fff";
					q.style.boxSizing = "border-box";
					q.style.flex = "1 0 20%";
					const n = document.createElement("img");
					n.src = l.src;
					n.alt = "Item Image";
					n.className = "result-image";
					n.style.maxWidth = "50px";
					n.style.display = "block";
					n.style.margin = "0 auto";
					const m = document.createElement("span"),
						r = l.closest(".mysterybox_reward_item_pool").getAttribute("data-tooltip").match(/"([^"]+)"/);
					m.textContent = r ? r[1] : "Unknown Item";
					m.style.display = "block";
					m.style.marginTop = "5px";
					m.style.fontSize = "12px";
					q.appendChild(n);
					q.appendChild(m);
					document.querySelector("#results").appendChild(q)
				}
				0 < b || 0 < c ? (e.textContent = "Chest opened. Checking for more actions...", setTimeout(Qc, 1E3)) : e.textContent = "All dices and chests used up."
			} catch (g) {
				E("Error opening chest. Please try again.")
			}
		}
	}

	function Wa() {
		Rc.length = 0;
		document.querySelectorAll(".rule-row").forEach(b => {
			const c = b.querySelector(".rule-condition-select").value;
			var e = b.querySelector(".rule-prefix-input"),
				h = b.querySelector(".rule-suffix-input");
			e = e ? e.value : "";
			h = h ? h.value : "";
			const k = b.querySelector(".rule-level").value,
				g = Array.from(b.querySelectorAll(".item-icon.selected")).map(n => n.dataset.type),
				l = Array.from(b.querySelectorAll(".color-circle.selected")).map(n => n.dataset.color),
				q = b.querySelector(".rule-hammer-selection img.selected");
			b = b.querySelector(".rule-checkbox");
			Rc.push({
				condition: c,
				prefix: e,
				suffix: h,
				colors: l,
				itemTypes: g,
				hammerState: q ? q.dataset.hammer : "none",
				level: k,
				isEnabled: b ? b.checked : !0
			})
		});
		localStorage.setItem("smeltingSettings", JSON.stringify(Rc))
	}

	function bi() {
		document.querySelectorAll(".item-icon").forEach(b => {
			b.addEventListener("click", function() {
				this.classList.toggle("selected");
				Wa()
			})
		})
	}

	function ci() {
		document.querySelectorAll(".color-circle").forEach(b => {
			b.addEventListener("click", function() {
				this.classList.toggle("selected");
				Wa()
			})
		})
	}

	function di() {
		document.querySelectorAll(".rule-row .rule-hammer-selection img").forEach(b => {
			b.addEventListener("click",
				function() {
					const c = this.closest(".rule-hammer-selection").querySelectorAll("img");
					this.classList.contains("selected") ? this.classList.remove("selected") : (c.forEach(e => e.classList.remove("selected")), this.classList.add("selected"));
					Wa()
				})
		})
	}

	function ei() {
		document.querySelectorAll(".rule-condition-select").forEach(b => {
			b.addEventListener("change", function() {
				const c = this.closest(".rule-row").querySelector(".rule-prefix-input"),
					e = this.closest(".rule-row").querySelector(".rule-suffix-input");
				"nameContains" ===
				this.value ? (c.style.display = "block", e.style.display = "block") : (c.style.display = "none", e.style.display = "none");
				Wa()
			})
		})
	}

	function fi() {
		document.querySelectorAll(".rule-prefix-input, .rule-level").forEach(b => {
			b.addEventListener("input", Wa)
		});
		document.querySelectorAll(".rule-suffix-input, .rule-level").forEach(b => {
			b.addEventListener("input", Wa)
		})
	}

	function gi() {
		document.querySelectorAll(".rule-row .remove-rule-btn").forEach(b => {
			b.addEventListener("click", function() {
				b.closest(".rule-row").remove();
				Wa()
			})
		})
	}

	function Bf() {
		const b = document.querySelector(".rule-row-template").cloneNode(!0);
		b.classList.remove("rule-row-template");
		b.classList.add("rule-row");
		b.style.display = "block";
		b.querySelector(".rule-prefix-input").value = "";
		b.querySelector(".rule-suffix-input").value = "";
		b.querySelector(".rule-level").value = "";
		b.querySelector(".rule-checkbox").checked = !0;
		b.querySelectorAll(".selected").forEach(h => h.classList.remove("selected"));
		const c = b.querySelector(".rule-prefix-input"),
			e = b.querySelector(".rule-suffix-input");
		"nameContains" === b.querySelector(".rule-condition-select").value ? (c.style.display = "block", e.style.display = "block") : (c.style.display = "none", e.style.display = "none");
		document.querySelector(".rule-container").insertBefore(b, document.querySelector(".add-rule-btn"));
		Cf();
		Wa()
	}

	function hi() {
		document.querySelectorAll(".rule-checkbox").forEach(b => {
			b.addEventListener("change", Wa)
		});
		document.querySelectorAll(".rule-checkbox-wrapper").forEach(b => {
			b.addEventListener("click", function() {
				const c = this.querySelector(".rule-checkbox");
				c.checked = !c.checked;
				Wa()
			})
		})
	}

	function Cf() {
		ei();
		bi();
		ci();
		di();
		gi();
		fi();
		hi()
	}

	function ii(b) {
		const c = "white green blue purple orange red".split(" ");
		return b.sort((e, h) => c.indexOf(e) - c.indexOf(h))
	}

	function ji() {
		const b = document.querySelector(".rule-row-template");
		var c = JSON.parse(localStorage.getItem("smeltingSettings")) || [];
		document.querySelectorAll(".rule-row").forEach(e => {
			e.remove()
		});
		if (0 === c.length) {
			c = b.cloneNode(!0);
			c.classList.remove("rule-row-template");
			c.classList.add("rule-row");
			c.style.display =
				"block";
			const e = c.querySelector(".rule-suffix-input");
			c.querySelector(".rule-prefix-input").style.display = "block";
			e.style.display = "block";
			document.querySelector(".rule-container").insertBefore(c, document.querySelector(".add-rule-btn"))
		} else c.forEach(e => {
			const h = b.cloneNode(!0);
			h.classList.remove("rule-row-template");
			h.classList.add("rule-row");
			h.style.display = "block";
			h.querySelector(".rule-condition-select").value = e.condition;
			var k = h.querySelector(".rule-prefix-input");
			const g = h.querySelector(".rule-suffix-input");
			"nameContains" === e.condition ? (k.style.display = "block", k.value = e.prefix, g.style.display = "block", g.value = "undefined" === typeof e.suffix ? null : e.suffix) : (k.style.display = "none", g.style.display = "none");
			h.querySelector(".rule-level").value = e.level;
			e.itemTypes.forEach(l => {
				(l = h.querySelector(`.item-icon[data-type="${l}"]`)) && l.classList.add("selected")
			});
			e.colors.forEach(l => {
				(l = h.querySelector(`.color-circle[data-color="${l}"]`)) && l.classList.add("selected")
			});
			"none" !== e.hammerState && (k = h.querySelector(`.rule-hammer-selection img[data-hammer="${e.hammerState}"]`)) &&
				k.classList.add("selected");
			h.querySelector(".rule-checkbox").checked = !1 !== e.isEnabled;
			document.querySelector(".rule-container").insertBefore(h, document.querySelector(".add-rule-btn"))
		});
		Cf()
	}

	function Sc() {
		Fa.colors = ii(Fa.colors);
		localStorage.setItem("smeltRandomlySettings", JSON.stringify(Fa))
	}

	function ki() {
		document.querySelectorAll(".item-icon2").forEach(b => {
			b.addEventListener("click", function() {
				const c = this.dataset.type;
				this.classList.contains("selected") ? (this.classList.remove("selected"), Fa.itemTypes =
					Fa.itemTypes.filter(e => e !== c)) : (this.classList.add("selected"), Fa.itemTypes.push(c));
				Sc()
			})
		});
		document.querySelectorAll(".rule-color-selection2 .color-circle2").forEach(b => {
			b.addEventListener("click", function() {
				const c = this.dataset.color;
				this.classList.contains("selected") ? (this.classList.remove("selected"), Fa.colors = Fa.colors.filter(e => e !== c)) : (this.classList.add("selected"), Fa.colors.push(c));
				Sc()
			})
		});
		document.querySelectorAll(".rule-color-resetColors .color-circle3").forEach(b => {
			b.addEventListener("click",
				function() {
					const c = this.dataset.color;
					this.classList.contains("selected") ? (this.classList.remove("selected"), hc.colors = hc.colors.filter(e => e !== c)) : (this.classList.add("selected"), hc.colors.push(c));
					localStorage.setItem("resetColors", JSON.stringify(hc))
				})
		});
		document.querySelectorAll(".rule-hammer-selection2 img").forEach(b => {
			b.addEventListener("click", function() {
				this.classList.contains("selected") ? (this.classList.remove("selected"), Fa.hammerState = "none") : (document.querySelectorAll(".rule-hammer-selection2 img").forEach(c =>
					c.classList.remove("selected")), this.classList.add("selected"), Fa.hammerState = this.dataset.hammer);
				Sc()
			})
		})
	}

	function li() {
		const b = JSON.parse(localStorage.getItem("resetColors")) || {};
		b.colors && b.colors.forEach(c => {
			(c = document.querySelector(`.rule-color-resetColors .color-circle3[data-color="${c}"]`)) && c.classList.add("selected")
		})
	}

	function mi() {
		var b = JSON.parse(localStorage.getItem("smeltRandomlySettings")) || {};
		b.itemTypes && b.itemTypes.forEach(c => {
			(c = document.querySelector(`.item-icon2[data-type="${c}"]`)) &&
			c.classList.add("selected")
		});
		b.colors && b.colors.forEach(c => {
			(c = document.querySelector(`.rule-color-selection2 .color-circle2[data-color="${c}"]`)) && c.classList.add("selected")
		});
		b.hammerState && "none" !== b.hammerState && (b = document.querySelector(`.rule-hammer-selection2 img[data-hammer="${b.hammerState}"]`)) && b.classList.add("selected")
	}
	async function Tc(b) {
		function c(v) {
			let z = v.target.name;
			v = Number(v.target.value);
			let C = JSON.parse(localStorage.getItem("gods"));
			C ||= {
				Eo: 3,
				co: 3,
				Bo: 3,
				Do: 3,
				Rn: 3,
				To: 3
			};
			C[z] =
				v;
			localStorage.setItem("gods", JSON.stringify(C))
		}

		function e() {
			document.getElementById("items-repaired").textContent = ma.Jm;
			document.getElementById("items-reset").textContent = ma.Km;
			document.getElementById("gold-cycled").textContent = ma.Hm;
			document.getElementById("arena-attacks").textContent = ma.wm;
			document.getElementById("circus-attacks").textContent = ma.zm;
			document.getElementById("dungeons-attacked").textContent = ma.Cm;
			document.getElementById("expeditions-attacked").textContent = ma.Em;
			document.getElementById("items-smelted").textContent =
				ma.Lm;
			document.getElementById("underworld-attacks").textContent = ma.Sm;
			document.getElementById("arena-money").textContent = Math.floor(1E3 * ma.gm).toLocaleString();
			document.getElementById("circus-money").textContent = Math.floor(1E3 * ma.hm).toLocaleString()
		}

		function h() {
			var v = JSON.parse(localStorage.getItem("IgnoredPrefixes")) || [],
				z = JSON.parse(localStorage.getItem("IgnoredSuffixes")) || [];
			g("IgnoredprefixList", v, "IgnoredPrefixes");
			g("IgnoredsuffixList", z, "IgnoredSuffixes");
			v = JSON.parse(localStorage.getItem("auctionPrefixes")) || [];
			z = JSON.parse(localStorage.getItem("auctionSuffixes")) || [];
			g("AuctionprefixList", v, "auctionPrefixes");
			g("AuctionsuffixList", z, "auctionSuffixes");
			var C = JSON.parse(localStorage.getItem("smeltedItems")) || [];
			z = document.getElementById("smeltedList");
			let I = JSON.parse(localStorage.getItem("bidList")) || [];
			for (v = document.getElementById("bidList"); z.firstChild;) z.firstChild.remove();
			for (var H of C) C = document.createElement("li"), C.textContent = H, z.appendChild(C);
			for (; v.firstChild;) v.firstChild.remove();
			for (let K of I) H =
				document.createElement("li"), H.textContent = K, v.appendChild(H)
		}

		function k(v, z, C) {
			"" !== z.trim() && (v = JSON.parse(localStorage.getItem(C)) || [], v.push(z), localStorage.setItem(C, JSON.stringify(v)), h())
		}

		function g(v, z, C) {
			let I = document.getElementById(v);
			I.innerHTML = "";
			z.forEach((H, K) => {
				let L = document.createElement("li");
				L.textContent = H;
				L.draggable = !0;
				L.setAttribute("data-index", K);
				K = document.createElement("button");
				K.textContent = "X";
				K.style.marginLeft = "10px";
				K.addEventListener("click", function() {
					let O = z.indexOf(H); -
					1 < O && (z.splice(O, 1), localStorage.setItem(C, JSON.stringify(z)), g(v, z, C))
				});
				L.appendChild(K);
				I.appendChild(L)
			});
			l(I, z, C)
		}

		function l(v, z, C) {
			let I = -1;
			v.addEventListener("dragstart", H => {
				I = parseInt(H.target.getAttribute("data-index"), 10)
			});
			v.addEventListener("dragover", H => {
				H.preventDefault()
			});
			v.addEventListener("drop", H => {
				H.preventDefault();
				H = parseInt(H.target.closest("li").getAttribute("data-index"), 10);
				0 <= H && 0 <= I && ([z[I], z[H]] = [z[H], z[I]], localStorage.setItem(C, JSON.stringify(z)), g(v.id, z, C));
				h()
			})
		}

		function q() {
			setInterval(() => {
				if (tf("randomPause")) {
					const v = localStorage.getItem("selectedPauseDuration");
					n(v)
				}
			}, 6E4)
		}

		function n(v) {
			let z, C;
			switch (v) {
				case "1":
					C = 8;
					z = {
						mod: "work",
						submod: "start",
						sh: X("sh"),
						im: 1,
						sm: C,
						mm: 2
					};
					break;
				case "2":
					C = 6;
					z = {
						mod: "work",
						submod: "start",
						sh: X("sh"),
						im: 1,
						sm: C,
						mm: 3
					};
					break;
				case "3":
					C = 3;
					z = {
						mod: "work",
						submod: "start",
						sh: X("sh"),
						im: 1,
						sm: C,
						mm: 4
					};
					break;
				case "4":
					C = 10;
					z = {
						mod: "work",
						submod: "start",
						sh: X("sh"),
						im: 1,
						sm: C,
						mm: 5
					};
					break;
				case "5":
					C = 4, z = {
						mod: "work",
						submod: "start",
						sh: X("sh"),
						im: 1,
						sm: C,
						mm: 6
					}
			}
			$.post(U({}), z).done(() => {
				setTimeout(() => {
					location.reload()
				}, 6E4 * (C + 1));
				Z("randomPause", Math.floor(1440 * Math.random()) + 600)
			}).fail(() => {})
		}
		const m = b.dataset.target;
		document.querySelectorAll(".popup-tab").forEach(v => {
			v.classList.remove("active")
		});
		b.classList.add("active");
		document.querySelectorAll(".popup-box").forEach(v => {
			v.classList.remove("active")
		});
		document.getElementById(m).classList.add("active");
		document.querySelectorAll("input[type=radio]").forEach(v => {
			v.addEventListener("change",
				c);
			let z = JSON.parse(localStorage.getItem("gods"));
			z && void 0 !== z[v.name] && (v.checked = v.value == z[v.name])
		});
		document.getElementById("reset-stats-button").addEventListener("click", () => {
			ma.Jm = 0;
			ma.Km = 0;
			ma.Hm = 0;
			ma.wm = 0;
			ma.zm = 0;
			ma.Cm = 0;
			ma.Em = 0;
			ma.Lm = 0;
			ma.Sm = 0;
			ma.gm = 0;
			ma.hm = 0;
			localStorage.setItem("userStats", JSON.stringify(ma));
			e()
		});
		e();
		b = document.querySelector(".add-rule-btn");
		b.removeEventListener("click", Bf);
		b.addEventListener("click", Bf);
		ji();
		li();
		mi();
		document.getElementById("smeltLootbox").checked =
			"true" === localStorage.getItem("smeltLootbox");
		document.getElementById("smeltLootbox").addEventListener("change", function() {
			localStorage.setItem("smeltLootbox", this.checked)
		});
		document.getElementById("smelteverything3").checked = "true" === localStorage.getItem("smelteverything3");
		document.getElementById("smelteverything3").addEventListener("change", function() {
			localStorage.setItem("smelteverything3", this.checked)
		});
		document.getElementById("smelthighercolors").checked = "true" === localStorage.getItem("smelthighercolors");
		document.getElementById("smelthighercolors").addEventListener("change", function() {
			localStorage.setItem("smelthighercolors", this.checked)
		});
		document.getElementById("smeltAnything").checked = "true" === localStorage.getItem("smeltAnything");
		document.getElementById("smeltAnything").addEventListener("change", function() {
			localStorage.setItem("smeltAnything", this.checked)
		});
		document.getElementById("RepairBeforeSmelt").checked = "true" === localStorage.getItem("RepairBeforeSmelt");
		document.getElementById("RepairBeforeSmelt").addEventListener("change",
			function() {
				localStorage.setItem("RepairBeforeSmelt", this.checked)
			});
		const r = document.getElementById("expeditionSearchTypeX");
		if (b = localStorage.getItem("nestSearchType")) r.value = b;
		r.addEventListener("change", () => {
			localStorage.setItem("nestSearchType", r.value)
		});
		const x = document.getElementById("NestDelay");
		x.addEventListener("change", function() {
			localStorage.setItem("NestDelay", x.value)
		});
		const u = document.getElementById("runNestUnderworld");
		u.addEventListener("change", function() {
			localStorage.setItem("runNestUnderworld",
				u.checked)
		});
		const w = document.getElementById("runNestEvent");
		w.addEventListener("change", function() {
			localStorage.setItem("runNestEvent", w.checked)
		});
		const A = document.getElementById("runNestDungeon");
		A.addEventListener("change", function() {
			localStorage.setItem("runNestDungeon", A.checked)
		});
		const D = document.getElementById("runNestExpedition");
		D.addEventListener("change", function() {
			localStorage.setItem("runNestExpedition", D.checked)
		});
		document.getElementById("IgnoredaddPrefixButton").onclick = function() {
			let v =
				document.getElementById("newIgnoredPrefixInput").value;
			k("IgnoredprefixList", v, "IgnoredPrefixes")
		};
		document.getElementById("IgnoredaddSuffixButton").onclick = function() {
			let v = document.getElementById("newIgnoredSuffixInput").value;
			k("IgnoredsuffixList", v, "IgnoredSuffixes")
		};
		document.getElementById("clearSmeltedItemsHistory").addEventListener("click", function() {
			localStorage.setItem("smeltedItems", JSON.stringify([]));
			h()
		});
		h();
		document.getElementById("clearBidItemsHistory").addEventListener("click", function() {
			localStorage.setItem("bidList",
				JSON.stringify([]));
			h()
		});
		document.getElementById("AuctionaddPrefixButton").onclick = function() {
			let v = document.getElementById("AuctionnewPrefixInput").value;
			k("AuctionprefixList", v, "auctionPrefixes")
		};
		document.getElementById("AuctionaddSuffixButton").onclick = function() {
			let v = document.getElementById("AuctionnewSuffixInput").value;
			k("AuctionsuffixList", v, "auctionSuffixes")
		};
		document.getElementById("pauseDuration").addEventListener("change", v => {
			v = v.target.value;
			localStorage.setItem("selectedPauseDuration",
				v);
			localStorage.setItem("randomPause.timeOut", 0);
			"0" !== v && (Z("randomPause", Math.floor(1440 * Math.random())), q())
		});
		document.getElementById("exportBtn").addEventListener("click", function(v) {
			v.preventDefault();
			if (!v.target.getAttribute("data-clicked")) {
				v.target.setAttribute("data-clicked", "true");
				v = {};
				var z = "bidList license_remaining nana_lcn playerCountry pid itemsToSearch smeltedItems rtksn MarketboughtItems tkz_lcr trlky_lcr token tkn playerId underworld savedUnderworldStates playerTimeouts tempOpponentDetails smelt.timer".split(" ");
				for (var C in localStorage) z.includes(C) || (v[C] = localStorage.getItem(C));
				C = JSON.stringify(v);
				C = URL.createObjectURL(new Blob([C], {
					type: "application/json"
				}));
				v = document.createElement("a");
				v.href = C;
				v.download = "GladBotSettings.json";
				v.click()
			}
		}, {
			once: !0
		});
		b = document.getElementById("importFileBtn");
		const B = document.getElementById("importBtn"),
			t = document.getElementById("importStatus");
		b && B && t && (b.addEventListener("click", function() {
			B.click()
		}), B.addEventListener("change", function(v) {
			if (v = v.target.files[0]) {
				var z =
					new FileReader;
				z.onload = function(C) {
					try {
						const I = JSON.parse(C.target.result);
						C = "bidList license_remaining nana_lcn playerCountry pid itemsToSearch smeltedItems rtksn MarketboughtItems tkz_lcr trlky_lcr token tkn playerId underworld savedUnderworldStates playerTimeouts tempOpponentDetails smelt.timer".split(" ");
						for (let H in I) C.includes(H) || localStorage.setItem(H, I[H]);
						t.textContent = "Import successful! Please refresh the page."
					} catch (I) {
						t.textContent = "Import failed. Please check the input file and try again."
					}
				};
				z.readAsText(v)
			}
		}));
		b = document.createElement("div");
		b.id = "loadingSpinner";
		b.innerHTML = '\n                <div class="spinner"></div>\n                <div class="loading-text">0</div>\n              ';
		document.querySelector("#selectAllButton").addEventListener("click", () => {
			document.querySelectorAll(".playerCheckbox").forEach(v => {
				v.checked = !0;
				v.dispatchEvent(new Event("change"))
			})
		});
		document.querySelector("#unselectAllButton").addEventListener("click", () => {
			document.querySelectorAll(".playerCheckbox").forEach(v => {
				v.checked = !1;
				v.dispatchEvent(new Event("change"))
			})
		})
	}

	function ni() {
		const b = document.getElementById("expeditionLocation"),
			c = document.getElementById("dungeonLocation");
		var e = document.querySelectorAll("#submenu2 a");
		const h = [];
		for (let k = 1; k < e.length; k++) e[k].classList.contains("glow") || h.push(e[k]);
		h.forEach(k => {
			const g = document.createElement("option");
			g.innerText = k.innerText;
			g.value = (new URLSearchParams(k.href)).get("loc");
			b.appendChild(g);
			c.appendChild(g.cloneNode(!0))
		});
		if (e = localStorage.getItem("expeditionLocation")) b.value =
			e;
		if (e = localStorage.getItem("dungeonLocation")) c.value = e
	}

	function qb(b, c, e) {
		const h = document.createElement("li"),
			k = "object" === typeof b ? b.playerName : b;
		h.textContent = k;
		b = document.createElement("button");
		b.textContent = "X";
		b.style.marginLeft = "10px";
		b.addEventListener("click", () => {
			h.remove();
			var g = JSON.parse(localStorage.getItem(e)) || [];
			g = e.includes("ServerList") ? g.filter(l => "object" === typeof l && l.playerName !== k) : g.filter(l => l !== k);
			localStorage.setItem(e, JSON.stringify(g))
		});
		h.appendChild(b);
		(c = document.getElementById(c)) &&
		c.appendChild(h)
	}

	function ic(b, c, e) {
		qb(b, c, e);
		c = JSON.parse(localStorage.getItem(e)) || [];
		e.includes("ServerList") ? c.push({
			playerName: b
		}) : c.push(b);
		localStorage.setItem(e, JSON.stringify(c))
	}

	function oi() {
		const b = JSON.parse(localStorage.getItem("autoAttackList")) || [],
			c = JSON.parse(localStorage.getItem("autoAttackServerList")) || [],
			e = JSON.parse(localStorage.getItem("avoidAttackList")) || [],
			h = JSON.parse(localStorage.getItem("avoidAttackCircusList")) || [],
			k = JSON.parse(localStorage.getItem("autoAttackCircusList")) || [],
			g = JSON.parse(localStorage.getItem("autoAttackCircusServerList")) || [];
		b.forEach(l => qb(l, "autoAttackList", "autoAttackList"));
		c.forEach(l => qb(l, "autoAttackServerList", "autoAttackServerList"));
		e.forEach(l => qb(l, "avoidAttackList", "avoidAttackList"));
		h.forEach(l => qb(l, "avoidAttackCircusList", "avoidAttackCircusList"));
		k.forEach(l => qb(l, "autoAttackCircusList", "autoAttackCircusList"));
		g.forEach(l => qb(l, "autoAttackCircusServerList", "autoAttackCircusServerList"))
	}

	function Df() {
		sessionStorage.setItem("autoGoActive",
			"true");
		document.getElementById("autoGoButton").innerHTML = '<span style="position: relative; top: -9px;">&#9724;</span>';
		document.getElementById("autoGoButton").removeEventListener("click", Df);
		document.getElementById("autoGoButton").addEventListener("click", Ef);
		location.reload()
	}

	function Ef() {
		sessionStorage.setItem("autoGoActive", "false");
		window.location.reload()
	}

	function jc() {
		const b = document.getElementById("popup-header"),
			c = document.getElementById("overlayBack");
		b && (localStorage.setItem("AucTab",
			!0), b.remove());
		c && c.remove()
	}

	function kc() {
		function b(t, v, z, C) {
			$(`${t}_true`).click(() => v(z));
			$(`${t}_false`).click(() => v(C))
		}

		function c(t) {
			Ca = t;
			localStorage.setItem("doExpedition", t)
		}

		function e(t) {
			Ga = t;
			localStorage.setItem("doDungeon", t)
		}

		function h(t) {
			Ha = t;
			localStorage.setItem("doArena", t)
		}

		function k(t) {
			Da = t;
			localStorage.setItem("doCircus", t)
		}

		function g(t) {
			Na = t;
			localStorage.setItem("doQuests", t)
		}

		function l(t) {
			Ea = t;
			localStorage.setItem("doEventExpedition", t)
		}

		function q(t) {
			ib = t;
			localStorage.setItem("AutoAuction",
				t)
		}

		function n(t) {
			rb = t;
			localStorage.setItem("doKasa", t)
		}

		function m(t) {
			$(".monster-button").removeClass("active");
			$(`#set_dungeon_difficulty_${t}`).addClass("active")
		}

		function r(t) {
			lc = t;
			localStorage.setItem("eventMonsterId", t);
			jc();
			kc()
		}

		function x() {
			var t = localStorage.getItem("doExpedition");
			null !== t && (Ca = JSON.parse(t));
			1 == Ca ? $("#doExpedition").prop("checked", !0) : $("#doExpedition").prop("checked", !1);
			t = localStorage.getItem("doDungeon");
			null !== t && (Ga = JSON.parse(t));
			1 == Ga ? $("#doDungeon").prop("checked",
				!0) : $("#doDungeon").prop("checked", !1);
			t = localStorage.getItem("doArena");
			null !== t && (Ha = JSON.parse(t));
			1 == Ha ? $("#doArena").prop("checked", !0) : $("#doArena").prop("checked", !1);
			t = localStorage.getItem("doCircus");
			null !== t && (Da = JSON.parse(t));
			1 == Da ? $("#doCircus").prop("checked", !0) : $("#doCircus").prop("checked", !1);
			t = localStorage.getItem("doQuests");
			null !== t && (Na = JSON.parse(t));
			1 == Na ? $("#doQuests").prop("checked", !0) : $("#doQuests").prop("checked", !1);
			t = localStorage.getItem("AutoAuction");
			null !== t && (ib =
				JSON.parse(t));
			1 == ib ? $("#activateAutoBid").prop("checked", !0) : $("#activateAutoBid").prop("checked", !1);
			t = localStorage.getItem("doKasa");
			null !== t && (rb = JSON.parse(t));
			1 == rb ? $("#doKasa").prop("checked", !0) : $("#doKasa").prop("checked", !1);
			t = localStorage.getItem("doEventExpedition");
			null !== t && (Ea = JSON.parse(t));
			1 == Ea ? $("#doEventExpedition").prop("checked", !0) : $("#doEventExpedition").prop("checked", !1);
			$("#expedition_settings").addClass(Ca ? "active" : "inactive");
			$(`#do_expedition_${Ca}`).addClass("active");
			$(`#set_monster_id_${Uc}`).addClass("active");
			$("#dungeon_settings").addClass(Ga ? "active" : "inactive");
			$(`#do_dungeon_${Ga}`).addClass("active");
			$(`#set_dungeon_difficulty_${Jb}`).addClass("active");
			$("#arena_settings").addClass(Ha ? "active" : "inactive");
			$(`#do_arena_${Ha}`).addClass("active");
			$(`#set_arena_opponent_level_${Ff}`).addClass("active");
			$("#circus_settings").addClass(Da ? "active" : "inactive");
			$(`#do_circus_${Da}`).addClass("active");
			$(`#set_circus_opponent_level_${Gf}`).addClass("active");
			$("#quests_settings").addClass(Na ? "active" : "inactive");
			$(`#do_quests_${Na}`).addClass("active");
			for (const v in Oa) Oa[v] && $(`#do_${v}_quests`).addClass("active");
			$("#auto_auction_settings").addClass(ib ? "active" : "inactive");
			$("#event_expedition_settings").addClass(Ea ? "active" : "inactive");
			$(`#do_event_expedition_${Ea}`).addClass("active");
			$(`#set_event_monster_id_${lc}`).addClass("active")
		}
		var u = document.getElementById("popup-header"),
			w = document.getElementById("overlayBack");
		u && u.remove();
		w && w.remove();
		u = document.createElement("div");
		u.setAttribute("id", "popup-header");
		w = localStorage.getItem("latestAnnouncement") || "";
		u.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

            <div id="popupSmelt" class="popup">
                <div class="smelt-instructions" style="text-align: left; padding-left: 5px;">
                    <ul style="list-style-position: inside;">
                        <li>1. ${d.Qj}</li>
                        <li>2. ${d.Rj}</li>
                        <li>3. ${d.Sj}</li>
                        <li>4. ${d.Tj}</li>

                        <br>${d.Uj}</br>
                        <br>${d.Vj}</br>
                    </ul>
                </div>
                <img src="https://raw.githubusercontent.com/fociisoftware/glbt/refs/heads/main/Smelt2.gif" alt="Smelt Info" style="width: 350px; height: auto;">
            </div>

            <div id="announcement" class="announcement">
                ${w}
            </div>

            <div class="popup-menu">
                <div class="popup-header" style="display: flex; justify-content: space-between; align-items: center;">
                <span style="display: inline-block;"><a style="color: white" href="https://www.paypal.com/donate/?hosted_button_id=7TVLC3GZ9GLD8" target="_blank">Version 3.3.3</a></span>
                <span style="display: inline-block;"><a style="color: white" href="https://discord.gg/dKCTFFnkjZ" target="_blank">Discord</a></span>
                <span style="display: inline-block;"><a style="color: white" href="https://gladbotius.gumroad.com/l/vntkyw" target="_blank">News</a></span>
                <div style="display: flex; justify-content: space-between; align-items: right;">    
                <div class="menu-type logo" style="width: 48px; height: 48px; margin-right: 250px;"></div>
            
              </div>

              <span id="settingsLanguage" style="margin-left: 300px; right: 17px; top: 32px;">          
                <img class="menu-type GB" id="languageGB"> 
                <img class="menu-type PL" id="languagePL"> 
                <img class="menu-type ES" id="languageES"> 
                <img class="menu-type TR" id="languageTR">
                <img class="menu-type FR" id="languageFR">
                <img class="menu-type HG" id="languageHG">
                <img class="menu-type BR" id="languageBR">
                <br>
                <a style="color: white" href="https://www.paypal.com/donate/?hosted_button_id=7TVLC3GZ9GLD8">Donate</a>
                 - 
                 <a style="color: white" href="https://fociisoftware.com/gladbot-documentation" target="_blank"> Documentation</a>
                 -
                <span style="color: white;">Made with <span style="color: red;">&#10084;</span></span>
                 </span>
              
              </div><span id="settingsLanguage"></span>

              <div class="popup-content">
                <ul class="popup-tabs">
                
                <li class="popup-tab" data-target="expedition_settings">
                    <div class="headericon_big" id="icon_expeditionpoints" style="margin-left: 4px;"></div>

                    ${d.expedition}
                    <div class="toggle-switch">
                    <input type="checkbox" id="doExpedition">
                    <label class="switch" for="doExpedition"></label>
                    </div>
                </li>

                  <li class="popup-tab" data-target="dungeon_settings">
                  <div class="headericon_big" id="icon_dungeonpoints" style="margin-left: 4px;"></div>
                  ${d.dungeon}
                    <div class="toggle-switch">
                      <input type="checkbox" id="doDungeon">
                      <label class="switch" for="doDungeon"></label>
                    </div>
                  </li>

                  <li class="popup-tab" data-target="arena_settings">
                  <div class="headericon_big" id="icon_arena" style="margin-left: 4px;"></div>
                  ${d.arena}
                    <div class="toggle-switch">
                      <input type="checkbox" id="doArena">
                      <label class="switch" for="doArena"></label>
                    </div>
                  </li>

                  <li class="popup-tab" data-target="circus_settings">
                  <div class="headericon_big" id="icon_grouparena" style="margin-left: 4px;"></div>
                  ${d.circusTurma}
                    <div class="toggle-switch">
                      <input type="checkbox" id="doCircus">
                      <label class="switch" for="doCircus"></label>
                    </div>
                  </li>

                  <li class="popup-tab" data-target="underworld_settings">
                  <div class="quest-type underworld" style="margin-left: 4px;"></div>
                  ${d.ui}
                    <div class="toggle-switch">
                      <input type="checkbox" id="autoEnterHell">
                      <label class="switch" for="autoEnterHell"></label>
                    </div>
                  </li>

                  <li class="popup-tab" data-target="quests_settings">
                  <div class="quest-type menu"></div>
                  ${d.Dj}
                    <div class="toggle-switch">
                      <input type="checkbox" id="doQuests">
                      <label class="switch" for="doQuests"></label>
                    </div>
                  </li>

                  <li class="popup-tab" data-target="heal_settings">
                  <div class="quest-type potion"></div>
                  ${d.fj}
                    <div class="toggle-switch">
                      <input type="checkbox" id="doHeal">
                      <label class="switch" for="doHeal"></label>
                    </div>
                  </li>

                  <li class="popup-tab" data-target="event_expedition_settings">
                  <div class="quest-type event"></div>${d.eventExpedition}
                    <div class="toggle-switch">
                      <input type="checkbox" id="doEventExpedition">
                      <label class="switch" for="doEventExpedition"></label>
                    </div>
                  </li>

                  <li class="popup-tab" data-target="auto_auction_settings">
                  <div class="quest-type search"></div>
                  ${d.A}
                  
                    <div class="toggle-switch">
                      <input type="checkbox" id="activateAutoBid">
                      <label class="switch" for="activateAutoBid">
                      <div class="toggle-bg"></div>
                    </div>
                  </li>
                  
                  <li class="popup-tab" data-target="auto_auction2_settings">
                    <div class="quest-type auction"></div>
                    ${d.Ld}
                    <div class="toggle-switch ">
                      <input type="checkbox" id="activateAuction2">
                      <label class="switch" for="activateAuction2">
                      <div class="toggle-bg"></div>
                    </div>
                  </li>
                  
                  <li class="popup-tab" data-target="auto_smelt_settings">
                  <div class="quest-type smelt"></div>${d.Ch}
                    <div class="toggle-switch">
                      <input type="checkbox" id="activateSmelt">
                      <label class="switch" for="activateSmelt">
                      <div class="toggle-bg"></div>
                    </div>
                  </li>

                  <li class="popup-tab" data-target="auto_repair_settings">
                  <div class="quest-type repair"></div>
                  ${d.Mb}
                  <div class="toggle-switch">
                    <input type="checkbox" id="activateRepair">
                    <label class="switch" for="activateRepair">
                    <div class="toggle-bg"></div>
                    </div>
                  </li>

                  <li class="popup-tab" data-target="Market">
                  <div class="quest-type market"></div>
                  ${d.eg}
                  <div class="toggle-switch">
                  <div class="toggle-bg"></div>
                  </div>
                  </li>

                  <li class="popup-tab" data-target="guild_settings">
                    <div class="quest-type guild"></div>
                    ${d.bj}
                    <div class="toggle-bg"></div>
                  </li>
                  
                 
                  <li class="popup-tab" data-target="Timers">
                    <div class="quest-type timer"></div>
                    ${d.Xb} 
                    <div class="toggle-switch">
                    <div class="toggle-bg"></div>
                    </div>
                  </li>

                  <li class="popup-tab" data-target="other_settings2">
                  <div class="quest-type reset">
                  </div>${d.ih}
                  </li>
                  

                  <li class="popup-tab" data-target="other_settings">
                  <div class="quest-type settings"></div>
                  ${d.Hg}
                  <div class="toggle-bg"></div>
                  </li>

                  


                  <li class="popup-tab" data-target="Extra">
                  <div class="quest-type extra">
                  </div>${d.ob}
                  <div class="toggle-bg"></div>
                  <div class="toggle-bg"></div>
                  <div class="toggle-bg"></div> </li>

                </ul>

            <div class="popup-box" id="expedition_settings">

                <div class="settings-tab">
                    <div class="settings_tab_title">${d.Xi}</div>
                    <div class="setting-row">
                        <label for="expeditionLocation">${d.Pe}</label>
                        <select id="expeditionLocation"></select>
                    </div>

                    <div class="setting-row">
                        <label for="autoCollectBonuses">${d.Pd}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="autoCollectBonuses">
                            <span class="switch"></span>
                        </label>
                    </div>

                    <div id="enemySelection" class="setting-row">
                        <label for="enemySelect">${d.Gj}:</label>
                        <select id="enemySelect">
                            <option value="0">1</option>
                            <option value="1">2</option>
                            <option value="2">3</option>
                            <option value="3">Boss</option>
                        </select>
                    </div>

                    <div id="expeditionSearchType" class="setting-row">
                        <label for="expeditionSearchTypeX">${d.nj}:</label>
                        <select id="expeditionSearchTypeX">
                            <option value="" selected disabled>Select an option</option>
                            <option value="nothing">${d.lj}</option>
                            <option value="quick">${d.mj}</option>
                            <option value="thorough">${d.oj}</option>
                        </select>
                        <hr>

                        <div>
                            <label for="NestDelay">Delay to click nest (ms):</label>
                            <input type="number" id="NestDelay" value="200" min="0" style="width: 80px;" />
                        </div>

                        <div>
                            <label><input type="checkbox" id="runNestUnderworld" />Underworld</label>
                            <label><input type="checkbox" id="runNestEvent" />Event</label>
                            <label><input type="checkbox" id="runNestDungeon" />Dungeon</label>
                            <label><input type="checkbox" id="runNestExpedition" />Expedition</label>
                        </div>

                        <hr>

                        <!-- Existing tutorial span -->
                        <span class="span-new">${d.pj}</span>

                    </div>

                </div>
  
            </div>
            
                <div class="popup-box" id="dungeon_settings">
                  <div class="settings_tab_title">${d.Ti}</div>
                  <div class="settings-tab">
                    <div class="setting-row">      
                      <label for="dungeonLocation">${d.ne}</label>
                      <select id="dungeonLocation"></select>
                    </div>

                    <div class="setting-row">
                      <span class="span-new">${d.Si}</span>
                        <div id="set_dungeon_difficulty_normal" class="monster-button">
                          ${d.rj}
                        </div>
                        <div id="set_dungeon_difficulty_advanced" class="monster-button">
                          ${d.advanced}
                        </div>
                    </div>

                    <div class="setting-row">
                      <label for="skipBossToggle">${d.Bh}</label>
                      <label class="toggle-switch">
                        <input type="checkbox" id="skipBossToggle">
                        <span class="switch"></span>
                      </label>
                    </div>

                    <div class="setting-row">
                      <label for="resetIfLoseToggle">${d.jh}</label>
                      <label class="toggle-switch">
                        <input type="checkbox" id="resetIfLoseToggle">
                        <span class="switch"></span>
                      </label>
                    </div>

                    <div class="setting-row">
                      <label for="dungeonAB">${d.Hd}</label>  
                      <label class="toggle-switch">
                        <input type="checkbox" id="dungeonAB">
                        <span class="switch"></span>
                      </label>
                    </div>

                    <div class="setting-row">
                      <label for="dungeonFocusQuest">${d.Xe}</label>  
                      <label class="toggle-switch">
                        <input type="checkbox" id="dungeonFocusQuest">
                        <span class="switch"></span>
                      </label>
                    </div>
                    <span class="span-new">${d.Xg}</span>  

                  
                    </div>
                      <div class="tutorial-container">
                        <span class="span-new">${d.Ui}</span>  
                      </div>
                    </div>

                  <!-- ARENA -->
  
                  <div class="popup-box" id="arena_settings">
                  <div class="settings_tab_title">Arena</div>
                  <span class="span-new">${d.Wa}</span>

                  
                  <div class="settings_tab_title2">
                    <button id="tabA" class="tab-button active">Arena Local Server</button>
                    <button id="tabB" class="tab-button">Arena Other Servers</button>
                  </div>

                  <!-- Tab A Content -->
                  <div id="contentA" class="setting-row">
                    <div class="avoid-attack">
                      <div class="top-section">
                      <h3>${d.ia}</h3>
                        <div class="switch-field2">
                          <input type="text" id="autoAttackInput" placeholder="${d.ha}">
                          <button id="addAutoAttack" class="awesome-button">${d.ga}</button>
                          <button id="ClearAttackList" class="awesome-button">Clear List</button>
                        </div>
                      </div>
                      <ul id="autoAttackList" class="scrollable-list"></ul>
                    </div>
                  </div>

                  <!-- Tab B Content -->
                  <div id="contentB" class="setting-row" style="display: none;">
                    <div class="avoid-attack">
                      <div class="top-section">
                        <h3>${d.ia}</h3>
                        </div>
                        <button id="ClearOtherAttackList" class="awesome-button">Clear List</button>
                        <ul id="autoAttackServerList" class="scrollable-list"></ul>
                      </div>
                  </div>

                  <div class="setting-row">
                    <div class="avoid-attack">
                        <div class="top-section">
                            <h3>${d.cc}</h3>
                            <div class="switch-field2">
                                <input type="text" id="avoidAttackInput" placeholder="${d.ha}">
                                <button id="addAvoidAttack" class="awesome-button">${d.ga}</button>
                                <button id="ClearAvoidList" class="awesome-button">Clear List</button>
                            </div>
                        </div>
                        <ul id="avoidAttackList" class="scrollable-list"></ul>
                        ${d.dc}
                    </div>
                  </div>

                  <div class="setting-row" data-tooltip="${d.Cj}">
                    <label for="enableArenaSimulator">Enable Simulator Attack [Premium]</label>
                    <label class="toggle-switch">
                        <input type="checkbox" id="enableArenaSimulator">
                        <span class="switch"></span>
                    </label>    
                  </div>


                 <div class="setting-row">
                      <label for="ArenaSimulatorAmount">Simulator Win Chance Amount [Premium]</label>
                      <div class="switch-field3">
                        <input type="number" id="ArenaSimulatorAmount" min="1" max="100" value="${localStorage.getItem("ArenaSimulatorAmount")||60}">
                      </div>
                </div>

                  <div class="setting-row">
                    <label for="arenaAttackGM">${d.Sa}</label>
                    <label class="toggle-switch">
                      <input type="checkbox" id="arenaAttackGM">
                      <span class="switch"></span>
                    </label>    
                  </div>

                    <div class="setting-row" data-tooltip="${d.bc}">
                        <label for="onlyArena">${d.Og}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="onlyArena">
                            <span class="switch"></span>
                        </label>    
                    </div>

                    <div class="setting-row" data-tooltip="${d.ac}">
                        <label for="onlyPlayerListArena">${d.$b}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="onlyPlayerListArena">
                            <span class="switch"></span>
                        </label>    
                    </div>

                <div class="setting-row">
                    <label for="attackRandomly">${d.Hi}</label>
                    
                    <label class="toggle-switch">
                    <input type="checkbox" id="attackRandomly">
                    <span class="switch"></span>
                    </label>    
                    <h3>${d.Ii}</h3>
                </div>

                  <div class="setting-row">
                    <div class="switch-field3">
                    <input type="number" id="autoAddArenaAmount" placeholder="Amount" min="0" value="${localStorage.getItem("autoAddArenaAmount")||0}">
                    </div>
                      <label for="autoAddArena">${d.Qa}</label>
                      <label class="toggle-switch">
                        <input type="checkbox" id="autoAddArena">
                        <span class="switch"></span>
                      </label>
                  </div>
  
                  <div class="setting-row">
                    <label for="autoAvoidArena">${d.Ra}</label>
                    <label class="toggle-switch">
                      <input type="checkbox" id="autoAvoidArena">
                      <span class="switch"></span>
                    </label>
                  </div>

                  <div class="scoreboard-attack">
                    <div class="settings_tab_title">${d.Qb}</div>
                    <div class="setting-row">
                    <label for="scoreboardattackenable">${d.nb}</label>
                    <label class="toggle-switch">
                      <input type="checkbox" id="scoreboardattackenable">
                      <span class="switch"></span>
                    </label>
                  </div>

                  <div class="setting-row">
                    <label for="scoreRange">${d.Ob}</label>
                    <select id="scoreRange" class="input">
                      <option value="1">1-50</option>
                      <option value="2">51-100</option>
                      <option value="3">101-150</option>
                      <option value="4">151-200</option>
                      <option value="5">201-250</option>
                      <option value="6">251-300</option>
                      <option value="7">301-350</option>
                      <option value="8">351-400</option>
                      <option value="9">401-450</option>
                      <option value="10">451-500</option>
                      <option value="11">501-550</option>
                      <option value="12">551-600</option>
                      <option value="13">601-650</option>
                      <option value="14">651-700</option>
                      <option value="15">701-750</option>
                      <option value="16">751-800</option>
                      <option value="17">801-850</option>
                      <option value="18">851-900</option>
                      <option value="19">901-950</option>
                      <option value="20">951-1000</option>
                      <!-- Add more options as needed -->
                    </select>
                  </div>
                  </div>
                  <span class="span-new">${d.Pb}</span>
                  
                  <div class="settings_tab_title">${d.pb}</div>

                  <div class="setting-row">
                  <label for="leagueattackenable">${d.mb}</label>
                    <label class="toggle-switch">
                      <input type="checkbox" id="leagueattackenable">
                      <span class="switch"></span>
                    </label>
                  </div>

                  <div class="setting-row">
                  <label for="leaguerandom">${d.Kb}</label>
                    <label class="toggle-switch">
                      <input type="checkbox" id="leaguerandom">
                      <span class="switch"></span>
                    </label>
                  </div>

                  <div class="setting-row">
                  <label for="leaguelowtohigh">${d.Lb}</label>
                    <label class="toggle-switch">
                      <input type="checkbox" id="leaguelowtohigh">
                      <span class="switch"></span>
                    </label>
                  </div>

                  <span class="span-new">${d.qb}</span>

                </div>

  
                  <!-- Circus -->

                  <div class="popup-box" id="circus_settings">
                    <div class="settings_tab_title">Circus</div>
                    <span class="span-new">${d.Wa}</span>

                    <div class="settings_tab_title2">
                        <button id="tabACircus" class="tab-button active">Circus Local Server</button>
                        <button id="tabBCircus" class="tab-button">Circus Other Servers</button>
                    </div>

                    <!-- Tab A Content -->
                    <div id="contentACircus" class="setting-row">
                        <div class="avoid-attack">
                        <div class="top-section">
                        <h3>${d.ia}</h3>
                            <div class="switch-field2">
                            <input type="text" id="autoAttackCircusInput" placeholder="${d.ha}">
                            <button id="addAutoCircusAttack" class="awesome-button">${d.ga}</button>
                            <button id="ClearCircusAttackList" class="awesome-button">Clear List</button>
                            </div>
                        </div>
                        <ul id="autoAttackCircusList" class="scrollable-list"></ul>
                        </div>
                    </div>

                    <!-- Tab B Content -->
                    <div id="contentBCircus" class="setting-row" style="display: none;">
                        <div class="avoid-attack">
                        <div class="top-section">
                            <h3>${d.ia}</h3>
                            </div>
                            <button id="ClearOtherCircusAttackList" class="awesome-button">Clear List</button>
                            <ul id="autoAttackCircusServerList" class="scrollable-list"></ul>
                        </div>
                    </div>

                        <div class="setting-row">
                        <div class="avoid-attack">
                        <div class="top-section">
                        <h3>${d.cc}</h3>
                        <div class="switch-field2">
                            <input type="text" id="avoidAttackCircusInput" placeholder="${d.ha}">
                            <button class="awesome-button" id="addAvoidCircusAttack">${d.ga}</button>
                            <button class="awesome-button" id="ClearCircusAvoidList">Clear List</button>
                        </div>
                        </div>
                            <ul id="avoidAttackCircusList" class="scrollable-list"></ul>
                            ${d.dc}
                        </div>
                        </div>

                        <div class="setting-row">
                            <label for="enableCircusWithoutHeal">${d.Ni}</label>
                            <label class="toggle-switch">
                                <input type="checkbox" id="enableCircusWithoutHeal">
                                <span class="switch"></span>
                            </label>    
                        </div>

                        <div class="setting-row">
                            <label for="enableCircusSimulator">Enable Simulator Attack [Premium]</label>
                            <label class="toggle-switch">
                                <input type="checkbox" id="enableCircusSimulator">
                                <span class="switch"></span>
                            </label>    
                        </div>

                    <div class="setting-row">
                    <label for="CircusSimulatorAmount">Simulator Win Chance Amount [Premium]</label>
                    <div class="switch-field3">
                        <input type="number" id="CircusSimulatorAmount" min="1" max="100" value="${localStorage.getItem("CircusSimulatorAmount")||60}">
                    </div>
                </div>

                    <div class="setting-row">
                        <label for="circusAttackGM">${d.Sa}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="circusAttackGM">
                            <span class="switch"></span>
                        </label>    
                    </div>

                    <div class="setting-row" data-tooltip="${d.bc}">
                            <label for="onlyCircus">${d.Pg}</label>
                            <label class="toggle-switch">
                            <input type="checkbox" id="onlyCircus">
                            <span class="switch"></span>
                        </label>    
                    </div>

                    <div class="setting-row" data-tooltip="${d.ac}">
                        <label for="onlyPlayerListCircus">${d.$b}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="onlyPlayerListCircus">
                            <span class="switch"></span>
                        </label>    
                    </div>

                    <div class="setting-row">
                    <label for="attackRandomlyCircus">Attack Randomly in Provinciarum?</label>
                    <label class="toggle-switch">
                        <input type="checkbox" id="attackRandomlyCircus">
                        <span class="switch"></span>
                    </label>    
                    <h3>Also disable "Sort players in arena by level" setting in crazy-addon.</h3>
                    </div>

                        <div class="setting-row">
                        <div class="switch-field3">
                        <input type="number" id="autoAddCircusAmount" placeholder="Amount" min="0" value="${localStorage.getItem("autoAddCircusAmount")||0}">
                        </div>
                            <label for="autoAddCircus">${d.Qa}</label>
                            <label class="toggle-switch">
                            <input type="checkbox" id="autoAddCircus">
                            <span class="switch"></span>
                            </label>
                        </div>

                        <div class="setting-row">
                        <label for="autoAvoidCircus">${d.Ra}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="autoAvoidCircus">
                            <span class="switch"></span>
                        </label>
                        </div>

                        <div class="scoreboard-attack">
                        <div class="settings_tab_title">${d.Qb}</div>
                        <div class="setting-row">
                        <label for="scoreboardcircusenable">${d.nb}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="scoreboardcircusenable">
                            <span class="switch"></span>
                        </label>
                        </div>

                        <div class="setting-row">
                        <label for="scoreRangeCircus">${d.Ob}</label>
                            <select id="scoreRangeCircus" class="input">
                            <option value="1">1-50</option>
                            <option value="2">51-100</option>
                            <option value="3">101-150</option>
                            <option value="4">151-200</option>
                            <option value="5">201-250</option>
                            <option value="6">251-300</option>
                            <option value="7">301-350</option>
                            <option value="8">351-400</option>
                            <option value="9">401-450</option>
                            <option value="10">451-500</option>
                            <option value="11">501-550</option>
                            <option value="12">551-600</option>
                            <option value="13">601-650</option>
                            <option value="14">651-700</option>
                            <option value="15">701-750</option>
                            <option value="16">751-800</option>
                            <option value="17">801-850</option>
                            <option value="18">851-900</option>
                            <option value="19">901-950</option>
                            <option value="20">951-1000</option>
                            <!-- Add more options as needed -->
                            </select>
                        </div>
                        </div>
                        <span class="span-new"> ${d.Pb} </span>
                        
                        <div class="settings_tab_title">${d.pb}</div>

                        <div class="setting-row">
                        <label for="leaguecircusattackenable">${d.mb}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="leaguecircusattackenable">
                            <span class="switch"></span>
                        </label>
                        </div>

                        <div class="setting-row">
                        <label for="leaguecircusrandom">${d.Kb}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="leaguecircusrandom">
                            <span class="switch"></span>
                        </label>
                        </div>
    
                        <div class="setting-row">
                        <label for="leaguecircuslowtohigh">${d.Lb}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="leaguecircuslowtohigh">
                            <span class="switch"></span>
                        </label>
                        </div>
                        <span class="span-new">${d.qb}</span>

                  </div>

                  <div class="popup-box" id="underworld_settings">

                    <div class="settings_tab_title">${d.cf}</div>
                        <span class="span-new"> ${d.df}</span>
                        <div class="setting-row">
                            <label for="hellDifficulty">${d.af}</label>
                            <select id="hellDifficulty">
                                <option value="0">${d.Ri}</option>
                                <option value="1">${d.Qi}</option>
                                <option value="2">${d.Pi}</option>
                            </select>
                        </div>

                    <div class="setting-row">
                        <label for="hellEnterHP">${d.te}</label>
                        <div class="switch-field3">
                            <input type="number" id="hellEnterHP" min="1" max="100" value="${localStorage.getItem("hellEnterHP")||75}">
                        </div>
                    </div>

                    <div class="setting-row">
                        <label for="HellHealHP">${d.Hk}</label>
                        <div class="switch-field3">
                            <input type="number" id="HellHealHP" min="1" max="100" value="${localStorage.getItem("HellHealHP")||10}">
                        </div>
                    </div>
                    
                    <div class="setting-row" data-tooltip="${d.ij}">
                        <label for="autoEnterHell">${d.Sd} Info</label>
                    </div>

                    <div class="setting-row" data-tooltip="${d.je}">
                        <label for="dontEnterUnderworld">${d.ke}</label>
                        <label class="toggle-switch">
                        
                            <input type="checkbox" id="dontEnterUnderworld">
                            <span class="switch"></span>
                        </label>
                    </div>

                    <div class="setting-row">
                        <label for="EnableArenaHell">${d.oe}</label>
                        <label class="toggle-switch">
                    
                        <input type="checkbox" id="EnableArenaHell">
                        <span class="switch"></span>
                        </label>
                    </div>

                    <div class="setting-row">
                        <label for="UnderworldUseMobi">${d.Ai}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="UnderworldUseMobi">
                            <span class="switch"></span>
                        </label>
                    </div>

                    <div class="setting-row">
                        <label for="UnderWorldUseRuby">${d.Ei}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="UnderWorldUseRuby">
                            <span class="switch"></span>
                        </label>
                    </div>

                    <div class="setting-row">
                        <label for="useSacrifice">${d.Ci}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="useSacrifice">
                            <span class="switch"></span>
                        </label>
                    </div>

                    <div class="setting-row">
                        <label for="usePray">${d.rk}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="usePray">
                            <span class="switch"></span>
                        </label>
                    </div>

                    <!--
                    <div class="setting-row">
                        <label for="useClothToEnterUnderworld">${d.mk}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="useClothToEnterUnderworld">
                            <span class="switch"></span>
                        </label>
                    </div>
                    -->

                    <div class="setting-row">
                        <label for="exitUnderworld">${d.ve}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="exitUnderworld">
                            <span class="switch"></span>
                        </label>
                    </div>

                    <div class="settings_tab_title">${d.li}</div>

                    <div class="setting-row">
                        <label for="useGodPowers">${d.ni}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="useGodPowers">
                            <span class="switch"></span>
                        </label>
                    </div>

                    <!-- Multi-Selection for Gods -->
                    <div class="setting-row" id="godPowersSection" style="display: none;">
                        <label>${d.oi}</label>
                        <div class="god-selection">
                            <label>
                                <input type="checkbox" class="god-power-checkbox" value="Minerva" id="godMinerva">
                                <img src="//gf3.geo.gfsrv.net/cdn8a/72919cc6b457bf475fb81cc7de8863.png" title="Minerva">
                            </label>
                            <label>
                                <input type="checkbox" class="god-power-checkbox" value="Diana" id="godDiana">
                                <img src="//gf2.geo.gfsrv.net/cdn70/026bb622a42b4d00abc74c67f28d63.png" title="Diana">
                            </label>
                            <label>
                                <input type="checkbox" class="god-power-checkbox" value="Vulcan" id="godVulcan">
                                <img src="//gf3.geo.gfsrv.net/cdn5c/6fbd05e43d699e65fc40cc92a17c51.png" title="Vulcan">
                            </label>
                            <label>
                                <input type="checkbox" class="god-power-checkbox" value="Mars" id="godMars">
                                <img src="//gf2.geo.gfsrv.net/cdn76/5fd915f85b3e5e71b64632af0c6543.png" title="Mars">
                            </label>
                            <label>
                                <input type="checkbox" class="god-power-checkbox" value="Apollo" id="godApollo">
                                <img src="//gf3.geo.gfsrv.net/cdn8f/bb75bf0df76de3ec421bbfb0eac3c5.png" title="Apollo">
                            </label>
                            <label>
                                <input type="checkbox" class="god-power-checkbox" value="Mercury" id="godMercury">
                                <img src="//gf3.geo.gfsrv.net/cdnbe/5e272e2aade20b4a266e48663421ce.png" title="Mercury">
                            </label>
                        </div>
                    </div>

                    <div class="setting-row">
                        <label for="weaponBuff">${d.pi}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="weaponBuff">
                            <span class="switch"></span>
                        </label>
                    </div>

                    <!-- Armor Buff Section -->
                    <div class="setting-row">
                        <label>${d.ri}</label>
                        <div class="armor-selection">
                            <label>
                                <input type="checkbox" class="armor-checkbox" value="Armor" id="armorBuffArmor"> ${d.M}
                            </label>
                            <label>
                                <input type="checkbox" class="armor-checkbox" value="Helmet" id="armorBuffHelmet"> ${d.P}
                            </label>
                            <label>
                                <input type="checkbox" class="armor-checkbox" value="Gloves" id="armorBuffGloves"> ${d.O}
                            </label>
                            <label>
                                <input type="checkbox" class="armor-checkbox" value="Boots" id="armorBuffBoots"> ${d.N}
                            </label>
                            <label>
                                <input type="checkbox" class="armor-checkbox" value="Shield" id="armorBuffShield"> ${d.S}
                            </label>
                        </div>
                    </div>

                    <!-- Farm Section (As Is) -->
                    <div class="settings_tab_title">${d.Ue}</div>
                    <span class="span-new">${d.Ve}: </span>
                    <div class="setting-row">
                        <label for="farmEnable">${d.v}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="farmEnable">
                            <span class="switch"></span>
                        </label>
                    </div>

                    <div class="setting-row">
                        <label for="farmLocation">${d.Te}</label>
                        <select id="farmLocation">
                            <option value="0">Entrance</option>
                            <option value="1">Court of the Dead</option>
                            <option value="2">Tartarus</option>
                            <option value="3">Erebus</option>
                        </select>
                    </div>

                    <div class="setting-row">
                        <label for="farmEnemy">${d.Se}:</label>
                        <select id="farmEnemy">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">Boss</option>
                        </select>
                    </div>

                    <div class="setting-row" data-tooltip="${d.hj}">
                          <label for="useVillaMedici">${d.pe}</label>
                          <label class="toggle-switch">
                              <input type="checkbox" id="EnableHellLimit">
                              <span class="switch"></span>
                          </label>
                    </div>

                    <div class="setting-row">
                        <label for="hellLimit">${d.gj}</label>
                        <div class="switch-field3">
                            <input type="number" id="hellLimit" min="1" max="200" value="${localStorage.getItem("hellLimit")||5}">
                        </div>
                    </div>

                    <div class="settings_tab_title">${d.bf}</div>
                    <div class="setting-row">
                          <label for="useVillaMedici">${d.Di}</label>
                          <label class="toggle-switch">
                              <input type="checkbox" id="useVillaMedici">
                              <span class="switch"></span>
                          </label>
                    </div>
                    
                    <div class="setting-row">
                        <label for="useHealingPotion">${d.Bi}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="useHealingPotion">
                            <span class="switch"></span>
                        </label>
                    </div>

                    <span class="span-new"> ${d.mi}</span>
                    <span class="span-new">${d.vi}</span>

                    <div class="settings_tab_title">${d.Qd}</div>
                    <span class="span-new">Cooldown is 30 minutes. If you dont have a costume on you, bot will reset cooldown to 0.</span>
                    <div class="setting-row">
                          <label for="useCostume">${d.zi}</label>
                          <label class="toggle-switch">
                              <input type="checkbox" id="useCostume">
                              <span class="switch"></span>
                          </label>
                    </div>

                    <div class="setting-row">
                        <label for="wearUnderworld">${d.Fi}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="wearUnderworld">
                            <span class="switch"></span>
                        </label>
                    </div>
                    
                    <div id="costumeUnderworldWrapper" style="display:none;">
                      <div class="setting-row">
                          <label for="costumeUnderworld">${d.ce}</label>
                          <select id="costumeUnderworld">
                              <option value="9">Dis Pater Normal</option>
                              <option value="10">Dis Pater Medium</option>
                              <option value="11">Dis Pater Hard</option>
                          </select>
                      </div>
                    </div>                

                    <div class="setting-row">
                      <label for="costumeBasic">${d.Vd}</label>
                      <select id="costumeBasic">
                          <option value="1">${d.Ya}</option>
                          <option value="2">${d.bb}</option>
                          <option value="3">${d.cb}</option>
                          <option value="4">${d.eb}</option>
                          <option value="5">${d.fb}</option>
                          <option value="6">${d.gb}</option>
                          <option value="7">${d.hb}</option>
                          <option value="8">${d.ib}</option>
                          <option value="12">${d.jb}</option>
                          <option value="13">${d.Za}</option>
                          <option value="14">${d.$a}</option>
                          <option value="15">${d.ab}</option>
                      </select>
                    </div>

                    <div class="setting-row">
                      <label for="costumeDungeon">${d.me}</label>
                      <select id="costumeDungeon">
                          <option value="1">${d.Ya}</option>
                          <option value="2">${d.bb}</option>
                          <option value="3">${d.cb}</option>
                          <option value="4">${d.eb}</option>
                          <option value="5">${d.fb}</option>
                          <option value="6">${d.gb}</option>
                          <option value="7">${d.hb}</option>
                          <option value="8">${d.ib}</option>
                          <option value="12">${d.jb}</option>
                          <option value="13">${d.Za}</option>
                          <option value="14">${d.$a}</option>
                          <option value="15">${d.ab}</option>
                      </select>
                    </div>
                    <span class="span-new">${d.Rd}</span>

                </div>
                  
                  <div class="popup-box" id="quests_settings">

                    <div class="settings_tab_title">Quests</div>

                    <div class="setting-row">
                      <div class="monster-buttons">
                        <span class="span-new">${d.type}</span>
                        <div class="quest-container">
                          <div id="do_combat_quests" class="settingsButton quest-type combat"></div>
                          <div id="do_arena_quests" class="settingsButton quest-type arena"></div>
                          <div id="do_circus_quests" class="settingsButton quest-type circus"></div>
                          <div id="do_expedition_quests" class="settingsButton quest-type expedition"></div>
                          <div id="do_dungeon_quests" class="settingsButton quest-type dungeon"></div>
                          <div id="do_items_quests" class="settingsButton quest-type items"></div>
                        </div>
                      </div>
                    </div>

                    <div class="settings_tab_title">Quest Settings</div>

                    <div class="setting-row">
                      <label for="skipTimeQuests">Arena ${d.Ca}</label>
                      <label class="toggle-switch">
                        <input type="checkbox" id="skipTimeQuests">
                        <span class="switch"></span>
                      </label>
                    </div>

                    <div class="setting-row">
                    <label for="skipTimeCircusQuests">Circus ${d.Ca}</label>
                    <label class="toggle-switch">
                      <input type="checkbox" id="skipTimeCircusQuests">
                      <span class="switch"></span>
                    </label>
                    </div>

                    <div class="setting-row">
                    <label for="skipTimeOtherQuests">Other ${d.Ca}</label>
                    <label class="toggle-switch">
                      <input type="checkbox" id="skipTimeOtherQuests">
                      <span class="switch"></span>
                    </label>
                    </div>

                    <div class="setting-row">
                      <label for="UnderworldQuests">${d.ti}</label>
                      <label class="toggle-switch">
                        <input type="checkbox" id="UnderworldQuests">
                        <span class="switch"></span>
                      </label>
                    </div>

                    <div class="setting-row" id="underworldKeywordSection" style="display: none;">
                    ${d.si}
                    <div class="input-container">
                        <input type="text" id="underworldKeywordInput" placeholder="${d.V}">
                        <button class="awesome-button" id="addUnderworldKeywordBtn">${d.I}</button>
                    </div>
                    <div id="underworldKeywordList"></div>
                </div>

                    <div class="setting-row">
                    <label for="acceptnotfilter">${d.Rg}</label>
                    <label class="toggle-switch">
                      <input type="checkbox" id="acceptnotfilter">
                      <span class="switch"></span>
                    </label>
                    </div>

                    <div class="settings_tab_title">${d.Yg}</div>
                      <div class="setting-row">
                        ${d.Qg}
                        <select id="questSpeed">
                        <option value="0">5x</option>
                        <option value="1">4x</option>
                        <option value="2">3x</option>
                        <option value="3">2x</option>
                        <option value="4">1x</option>
                      </select>
                    </div>
                    <div class="settings_tab_title">${d.Vg}</div>

                    <div class="setting-row">
                      ${d.Ug}
                      <div class="input-container">
                      <input type="text" id="keywordInput" placeholder="${d.V}">
                      <button class="awesome-button" id="addKeywordBtn">${d.I}</button>
                      </div>
                      <div id="keywordList"></div>
                    </div>
                    
                    <div class="settings_tab_title">${d.Sg}</div>

                    <div class="setting-row">
                        ${d.Tg}
                        <div class="input-container">
                            <input type="text" id="keywordAcceptInput" placeholder="${d.V}">
                            <button class="awesome-button" id="addKeywordAcceptBtn">${d.I}</button>
                        </div>
                        <div id="keywordAcceptList"></div>
                    </div>      

                    <div class="setting-row">
                        <label for="questrewardvalue">${d.kh}</label>
                        <div class="switch-field3">
                            <input type="number" id="questrewardvalue" min="1" max="99999" value="${localStorage.getItem("questrewardvalue")||2E3}">
                        </div>
                    </div>

                    <div class="setting-row">
                        <label>${d.Wg}</label>
                        <div class="input-container">
                            <label><input type="checkbox" id="questTypeMercury"> Mercury</label>
                            <label><input type="checkbox" id="questTypeApollo"> Apollo</label>
                            <label><input type="checkbox" id="questTypeDiana"> Diana</label>
                            <label><input type="checkbox" id="questTypeMinerva"> Minerva</label>
                            <label><input type="checkbox" id="questTypeVulcan"> Vulcan</label>
                            <label><input type="checkbox" id="questTypeMars"> Mars</label>
                        </div>
                    </div>

                    
                    </div>


                <div class="popup-box" id="heal_settings">
                  <div class="monster-buttons">
                  </div>
                  <div class="settings_tab_title">${d.ej}</div>

                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; margin-right: 50px;">
                  </div>

                  <div class="setting-row">
                  <label for="healPercentage">${d.dj}</label>
                  <div class="switch-field3">
                    <input type="number" id="healPercentage" min="1" max="99" value="${localStorage.getItem("healPercentage")||75}">
                  </div>
                </div>

                  <div class="setting-row">
                  <img style="margin-top: -10px" src="https://gf3.geo.gfsrv.net/cdneb/91e0372cccc24f52758be611a10a3b.png">
                  <label for="HealClothToggle">${d.nh}</label>
                  
                    <label class="toggle-switch">
                      <input type="checkbox" id="HealClothToggle">
                      <span class="switch"></span>
                    </label>
                  </div>

                  <div class="setting-row">
                  <label for="HealRubyToggle">${d.Yl}</label>
                    <label class="toggle-switch">
                      <input type="checkbox" id="HealRubyToggle">
                      <span class="switch"></span>
                    </label>
                  </div>

                  <div class="setting-row">
                  <label for="healShopToggle">${d.pk}</label>
                    <label class="toggle-switch">
                      <input type="checkbox" id="healShopToggle">
                      <span class="switch"></span>
                    </label>
                  </div>

                  <div class="setting-row">
                  <label for="healfrompackage">${d.qk}</label>
                    <label class="toggle-switch">
                      <input type="checkbox" id="healfrompackage">
                      <span class="switch"></span>
                    </label>
                  </div>

                  <div class="setting-row">
                    <label for="HealPickBag">${d.$e}</label>
                     <select id="HealPickBag" class="input">
                     <option value="1">
                        1
                      </option>
                      <option value="2">
                        2
                      </option>
                      <option value="3">
                        3
                      </option>
                      <option value="4">
                        4
                      </option>
                      <option value="5">
                        5
                      </option>
                      <option value="6">
                        6
                      </option>
                      <option value="7">
                        7
                      </option>
                      <option value="8">
                      8
                    </option>
                    </select>
                  </div>
                  
                  <div class="setting-row">
                  <label for="FoodAmount">${d.cj}</label>
                   <select id="FoodAmount" class="input">
                   <option value="1">
                      1
                    </option>
                    <option value="2">
                      2
                    </option>
                    <option value="3">
                      3
                    </option>
                    <option value="4">
                      4
                    </option>
                    <option value="5">
                      5
                    </option>
                    <option value="6">
                      6
                    </option>
                    <option value="7">
                      7
                    </option>
                    <option value="8">
                    8
                  </option>
                  </select>
                </div>   
                  
                <div class="setting-row" data-tooltip="${d.Mi}">
                <label for="healcervisia">${d.lk}</label>
                <label class="toggle-switch">
                    <input type="checkbox" id="healcervisia">
                    <span class="switch"></span>
                </label>
                </div>

                  <div class="setting-row">
                  <label for="HealEggs">${d.nk}</label>
                    <label class="toggle-switch">
                      <input type="checkbox" id="HealEggs">
                      <span class="switch"></span>
                    </label>
                  </div>

                  <div class="settings_tab_title">${d.ef}</div>
                  <span class="span-new">${d.Eg}</span>
                  <div class="setting-row" data-tooltip="${d.sj}>
                  <label for="OilEnable">${d.se}</label>
                    <label class="toggle-switch">
                      <input type="checkbox" id="OilEnable">
                      <span class="switch"></span>
                    </label>
                  </div>

                  <div class="setting-row">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-right: 50px;">
                    <table style="width: 100%">
                        <tbody>
                        <tr>
                            <td style="font-weight: bold; text-align: left; width: 30%">Minerva:</td>
                            <td style="text-align: right;">
                                <div class="radio-group">
                                <input type="radio" name="minerva" value="0"><span class="span-new">I</span>
                                <input type="radio" name="minerva" value="1"><span class="span-new">II</span>
                                <input type="radio" name="minerva" value="2"><span class="span-new">III</span>
                                <input type="radio" name="minerva" value="3" checked="true"><span class="span-new">Off</span>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold; text-align: left; width: 30%">Diana:</td>
                                <td>
                                    <div class="radio-group">
                                        <input type="radio" name="diana" value="0"><span class="span-new">I</span>
                                        <input type="radio" name="diana" value="1"><span class="span-new">II</span>
                                        <input type="radio" name="diana" value="2"><span class="span-new">III</span>
                                        <input type="radio" name="diana" value="3" checked="true"><span class="span-new">Off</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold; text-align: left; width: 30%">Mars:</td>
                                <td>
                                    <div class="radio-group">
                                        <input type="radio" name="mars" value="0"><span class="span-new">I</span>
                                        <input type="radio" name="mars" value="1"><span class="span-new">II</span>
                                        <input type="radio" name="mars" value="2"><span class="span-new">III</span>
                                        <input type="radio" name="mars" value="3" checked="true"><span class="span-new">Off</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold; text-align: left; width: 30%">Merkur:</td>
                                <td>
                                    <div class="radio-group">
                                        <input type="radio" name="merkur" value="0"><span class="span-new">I</span>
                                        <input type="radio" name="merkur" value="1"><span class="span-new">II</span>
                                        <input type="radio" name="merkur" value="2"><span class="span-new">III</span>
                                        <input type="radio" name="merkur" value="3" checked="true"><span class="span-new">Off</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold; text-align: left; width: 30%">Apollo:</td>
                                <td>
                                    <div class="radio-group">
                                        <input type="radio" name="apollo" value="0"><span class="span-new">I</span>
                                        <input type="radio" name="apollo" value="1"><span class="span-new">II</span>
                                        <input type="radio" name="apollo" value="2"><span class="span-new">III</span>
                                        <input type="radio" name="apollo" value="3" checked="true"><span class="span-new">Off</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold; text-align: left; width: 30%">Vulcanus:</td>
                                <td>
                                    <div class="radio-group">
                                        <input type="radio" name="vulcanus" value="0"><span class="span-new">I</span>
                                        <input type="radio" name="vulcanus" value="1"><span class="span-new">II</span>
                                        <input type="radio" name="vulcanus" value="2"><span class="span-new">III</span>
                                        <input type="radio" name="vulcanus" value="3" checked="true"><span class="span-new">Off</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                            </table>
                        </div>


                    </div>
<div class="settings_tab_title">${d.Va}</div>
<span class="span-new">Bot will use buffs when available.</span>

<div class="setting-row" data-tooltip="${d.Ki}>
    <label for="BuffsEnable">Enable ${d.Va}</label>
    <label class="toggle-switch">
        <input type="checkbox" id="BuffsEnable">
        <span class="switch"></span>
    </label>
</div>

<div class="setting-row">
    <label for="BuffUnderworldOnly">${d.$d}</label>
    <label class="toggle-switch">
        <input type="checkbox" id="BuffUnderworldOnly">
        <span class="switch"></span>
    </label>
</div>


<div class="setting-row">
    <div class="buff-group">
        <label>Health:</label>
        <input type="checkbox" id="HealthBuff1"> Gingko
        <input type="checkbox" id="HealthBuff2"> Taigaroot
        <input type="checkbox" id="HealthBuff3"> Hawthorn
    </div>

    <div class="buff-group">
        <label>Strength:</label>
        <input type="checkbox" id="StrengthBuff1"> Flask
        <input type="checkbox" id="StrengthBuff2"> Ampulla
        <input type="checkbox" id="StrengthBuff3"> Flacon
        <input type="checkbox" id="StrengthBuff4"> Bottle
    </div>

    <div class="buff-group">
        <label>Dexterity:</label>
        <input type="checkbox" id="DexterityBuff1"> Flask
        <input type="checkbox" id="DexterityBuff2"> Ampulla
        <input type="checkbox" id="DexterityBuff3"> Flacon
        <input type="checkbox" id="DexterityBuff4"> Bottle
    </div>

    <div class="buff-group">
        <label>Agility:</label>
        <input type="checkbox" id="AgilityBuff1"> Flask
        <input type="checkbox" id="AgilityBuff2"> Ampulla
        <input type="checkbox" id="AgilityBuff3"> Flacon
        <input type="checkbox" id="AgilityBuff4"> Bottle
    </div>

    <div class="buff-group">
        <label>Constitution:</label>
        <input type="checkbox" id="ConstitutionBuff1"> Flask
        <input type="checkbox" id="ConstitutionBuff2"> Ampulla
        <input type="checkbox" id="ConstitutionBuff3"> Flacon
        <input type="checkbox" id="ConstitutionBuff4"> Bottle
    </div>

    <div class="buff-group">
        <label>Charisma:</label>
        <input type="checkbox" id="CharismaBuff1"> Flask
        <input type="checkbox" id="CharismaBuff2"> Ampulla
        <input type="checkbox" id="CharismaBuff3"> Flacon
        <input type="checkbox" id="CharismaBuff4"> Bottle
    </div>

    <div class="buff-group">
        <label>Intelligence:</label>
        <input type="checkbox" id="IntelligenceBuff1"> Flask
        <input type="checkbox" id="IntelligenceBuff2"> Ampulla
        <input type="checkbox" id="IntelligenceBuff3"> Flacon
        <input type="checkbox" id="IntelligenceBuff4"> Bottle
    </div>
</div>
                  </div>

                  <div class="popup-box" id="event_expedition_settings">
                    <div class="settings_tab_title">${d.eventExpedition}</div>

                    <div class="setting-row">
                        <div id="set_event_monster_id_0" class="monster-button">1</div>
                        <div id="set_event_monster_id_1" class="monster-button">2</div>
                        <div id="set_event_monster_id_2" class="monster-button">3</div>
                        <div id="set_event_monster_id_3" class="monster-button">Boss</div>
                    </div>
                    <div id="clear_next_event_expedition_time" class="awesome-button">${d.$g}</div> <!-- New Button -->

                      <div class="setting-row">
                      <label for="renewEvent">${d.dh}</label>
                        <label class="toggle-switch">
                        <input type="checkbox" id="renewEvent">
                        <span class="switch"></span>
                      </label>
                      </div>
                      <div class="setting-row">
                      <label for="throwDice">${d.Jh}</label>
                        <label class="toggle-switch">
                        <input type="checkbox" id="throwDice">
                        <span class="switch"></span>
                      </label>
                      </div>
                      <div class="setting-row">
                      <span class="span-new">${d.Kh}<span class="span-new">
                      
                                          </div>
                      <div class="setting-row">
                    <span class="span-new">${d.ue}<span class="span-new">
                    
                                        </div>
                    </div>

                  <div class="popup-box" id="auto_auction_settings">
                

                    <div class="settings_tab_title">${d.Nd}</div>
                    <span class="span-new">To open search panels including Unique shop items, enable this option.<span class="span-new">
                    <div class="setting-row">
                    <label for="AuctionItemLevel2">${d.wg}</label>
                      <div class="switch-field2">
                        <input type="text" id="search_input" placeholder="${d.Bd}">
                      </div>
                    </div>

                    <div class="setting-row">
                      <label for="AuctionItemLevel2">${d.Z}</label>
                      <div class="switch-field3">
                        <input type="number" id="AuctionItemLevel2" min="1" max="1000" value="5">
                      </div>
                    </div>   

                    <div class="setting-row">
                      <label for="SearchQuality">${d.Aa}</label>
                      <select id="SearchQuality" class="input">
                          <option value="-1">
                          ${d.Ea}
                          </option>
                            <option value="0">
                            ${d.C}
                            </option>
                            <option value="1">
                            ${d.B}
                            </option>
                            <option value="2">
                            ${d.D}
                            </option>
                          </option>
                      </select>
                    </div> 

                    <div class="setting-row">
                      <label>${d.ma}</label>
                      <div class="equipment-search-selection">
                          <label><input type="checkbox" class="equipment-search-option" value="2"> ${d.fa}</label>
                          <label><input type="checkbox" class="equipment-search-option" value="4"> ${d.ca}</label>
                          <label><input type="checkbox" class="equipment-search-option" value="8"> ${d.U}</label>
                          <label><input type="checkbox" class="equipment-search-option" value="1"> ${d.X}</label>
                          <label><input type="checkbox" class="equipment-search-option" value="256"> ${d.W}</label>
                          <label><input type="checkbox" class="equipment-search-option" value="512"> ${d.da}</label>
                          <label><input type="checkbox" class="equipment-search-option" value="48"> ${d.aa}</label>
                          <label><input type="checkbox" class="equipment-search-option" value="1024"> ${d.T}</label>
                          <label><input type="checkbox" class="equipment-search-option" value="9999"> ${d.Ha}</label>
                      </div>
                    </div>

                    <button class="awesome-button" id="search_button" type="button">${d.Bd}</button>
                    <button class="awesome-button" id="search_reset" type="button">${d.Gd}</button>
       
                    <div class="setting-row">
                    <ul id="search_list"></ul>
                    <span class="span-new">${d.Id}</span>
                    </div>

                    <div class="settings_tab_title">${d.qh}</div>
                    <div class="setting-row">

                      <!-- Title & Instructions -->
                      <div style="margin-bottom: 20px;">
                          <h2>${d.th}</h2>
                          <p>${d.rh}</p>
                      </div>
                    </div>
                    <!-- Item Input Section -->

                        <div class="setting-row">
                          <label for="clothCount">${d.uh}</label>
                          <div class="switch-field2">
                              <input type="number" id="clothCount" placeholder="${d.vh}">
                          </div>
                        </div>

                        <hr class="section-separator">

                        <div class="setting-row">
                              <label for="newItem">${d.ea}:</label>
                          <div class="switch-field2">                              
                              <input type="text" id="newItem" placeholder="${d.ea}">
                          </div>
                        </div>

                        <div class="setting-row">
                          <label for="newItemLevel">Min ${d.Tb}:</label>
                          <div class="switch-field2">                              
                              <input type="text" id="newItemLevel" placeholder="Min ${d.Tb}">
                          </div>
                        </div>
                
                        <div class="setting-row">
                          <label for="itemQuality">Min ${d.xh}:</label>
                          <select id="itemQuality">
                              <option value="0">${d.C}</option>
                              <option value="1">${d.B}</option>
                              <option value="2">${d.D}</option>
                              <option value="3">${d.H}</option>
                              <option value="4">${d.R}</option>
                          </select>
                        </div>

                        <!-- New Stat Selection with Combo Box -->
                        <div class="setting-row">
                        <label for="shopitemstat">Stat:</label>
                        <select id="shopitemstat">
                            <option value="none">NONE</option>
                            <option value="str">Strength</option>
                            <option value="dex">Dexterity</option>
                            <option value="agi">Agility</option>
                            <option value="cot">Constitution</option>
                            <option value="chr">Charisma</option>
                            <option value="int">Intelligence</option>
                        </select>
                        </div>

                        <div class="setting-row" id="statValueRow" style="display: none;">
                        <label for="statValue">Value:</label>
                        <div class="switch-field2">
                            <input type="number" id="statValue" placeholder="0">
                        </div>
                        </div>
                        

                        <div style="text-align: right;">
                        <button class="awesome-button" id="addItemButton">${d.I}</button>
                      </div>

                      <div class="setting-row">
                        <div id="itemsList" style="margin-bottom: 10px;">
                        <!-- Example item -->
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="flex: 1;">${d.wh}</span>
                            <button onclick="removeItem('uniqueItemID')">X</button>
                        </div>
                        <!-- Add more items similarly -->
                        </div>
                      </div>  
                  
                      <!-- Search Buttons -->
                      <div style="display: flex; justify-content: space-between; gap: 10px; margin-bottom: 20px;">
                        <button class="awesome-button" id="startSearchButton">${d.yh}</button>
                        <button class="awesome-button" id="skipSearchButton" style="display: none;">${d.zh}</button>
                        <button class="awesome-button" id="stopSearchButton">${d.Ah}</button>
                      </div>
                      <div class="setting-row">
                      <!-- Progress Bar -->
                      <div style="margin-bottom: 20px;">
                          <label>${d.ph}:</label>
                          <div id="progressBarOuter" style="width: 100%; height: 20px; background-color: grey; border-radius: 10px;">
                              <div id="progressBarInner" style="height: 100%; width: 0%; background-color: green; border-radius: 10px;"></div>
                          </div>
                      </div>
                  
                      <!-- Found Items Container -->
                      <div id="foundItemsContainer"></div>
                    </div>
                </div>

                <div class="popup-box" id="auto_auction2_settings">

                <div class="settings_tab_title">${d.Ih}</div>
           
                <div class="setting-row" data-tooltip="${d.Md}">
                <label for="storeGoldinAuction">${d.v}</label>
                  <label class="toggle-switch">
                  <input type="checkbox" id="storeGoldinAuction">
                  <span class="switch"></span>
                  </label>
                  </div>

                <div class="setting-row">
                  <label for="itemsToReset2">${d.ba}</label>
                  <div id="itemsToReset2" class="items-reset-list">
                      <div class="item-reset"><input type="checkbox" id="WEAPONS2" value="WEAPONS2"><label for="WEAPONS">${d.oa}</label></div>
                      <div class="item-reset"><input type="checkbox" id="SHIELD2" value="SHIELD2"><label for="SHIELD">${d.S}</label></div>
                      <div class="item-reset"><input type="checkbox" id="CHEST2" value="CHEST2"><label for="CHEST">${d.M}</label></div>
                      <div class="item-reset"><input type="checkbox" id="HELMET2" value="HELMET2"><label for="HELMET">${d.P}</label></div>
                      <div class="item-reset"><input type="checkbox" id="GLOVES2" value="GLOVES2"><label for="GLOVES">${d.O}</label></div>
                      <div class="item-reset"><input type="checkbox" id="SHOES2" value="SHOES2"><label for="SHOES">${d.N}</label></div>
                      <div class="item-reset"><input type="checkbox" id="RINGS2" value="RINGS2"><label for="RINGS">${d.na}</label></div>
                      <div class="item-reset"><input type="checkbox" id="AMULETS2" value="AMULETS2"><label for="AMULETS">${d.ka}</label></div>
                  </div>
                </div>

                <div class="setting-row">
                    <label for="storeInShopQuality">${d.Aa}</label>
                    <select id="storeInShopQuality" class="input">
                    <option value="0">
                    ${d.C}
                    </option><!-- Add more options as needed -->
                        <option value="1">
                        ${d.B}
                        </option>
                        <option value="2">
                        ${d.D}
                        </option>
                  </select>
                

                </div>

                <div class="setting-row">
                <label for="storeGoldinAuctionmaxGold">${d.lg}</label>
                  <div class="switch-field3">
                    <input type="number" id="storeGoldinAuctionmaxGold" placeholder="Amount" value="${localStorage.getItem("storeGoldinAuctionmaxGold")||0}">       
                  </div>
              </div>

              <div class="setting-row">
                <label for="storeGoldinAuctionholdGold">${d.Y}</label>
                  <div class="switch-field3">
                    <input type="number" id="storeGoldinAuctionholdGold" placeholder="Amount" value="${localStorage.getItem("storeGoldinAuctionholdGold")||0}">       
                  </div>
              </div>

              <div class="setting-row">
              <label for="AuctionGoldCover">${d.kb}</label>
                <label class="toggle-switch">
                <input type="checkbox" id="AuctionGoldCover">
                <span class="switch"></span>
              </label>
            </div>

                <span class="span-new">${d.lh}</span>
                  
                    <div class="settings_tab_title">${d.Bg}</div>
                    <span class="span-new">${d.Od}</span>
                    
                    <div class="setting-row">
                      <div class="table-container">
                          <table class="styled-table">
                            <thead>
                              <tr>
                                <th>Prefix</th>
                                <th>Suffix</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <ul class="styled-list" id="AuctionprefixList"></ul>
                                </td>
                                <td>
                                  <ul class="styled-list" id="AuctionsuffixList"></ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div class="list-options">
                                 
                                    <input type="text" class="styled-input" id="AuctionnewPrefixInput">
                                    <input type="button" id="AuctionaddPrefixButton" value="${d.Oa}">
                                  </div>
                                </td>
                                <td>
                                  <div class="list-options">
                                    <input type="text" class="styled-input" id="AuctionnewSuffixInput">
                                    <input type="button" id="AuctionaddSuffixButton" value="${d.Pa}">
                                  </div>
                                </td>

                              </tr>
                            </tbody>
                          </table>
                          
                      </div>
                      
                    </div>
                  
                    <div class="setting-row">
                        <label>${d.ma}</label>
                        <div class="equipment-selection">
                            <label><input type="checkbox" class="equipment-option" value="2"> ${d.fa}</label>
                            <label><input type="checkbox" class="equipment-option" value="4"> ${d.ca}</label>
                            <label><input type="checkbox" class="equipment-option" value="8"> ${d.U}</label>
                            <label><input type="checkbox" class="equipment-option" value="1"> ${d.X}</label>
                            <label><input type="checkbox" class="equipment-option" value="256"> ${d.W}</label>
                            <label><input type="checkbox" class="equipment-option" value="512"> ${d.da}</label>
                            <label><input type="checkbox" class="equipment-option" value="48"> ${d.aa}</label>
                            <label><input type="checkbox" class="equipment-option" value="1024"> ${d.T}</label>
                            <label><input type="checkbox" class="equipment-option" value="9999"> ${d.Ha}</label>
                        </div>
                    </div>

                      <div class="setting-row" data-tooltip="${d.kk}">
                        <label for="auctionTURBO">Turbo Mode Speed >> </label>
                          <label class="toggle-switch">
                          <input type="checkbox" id="auctionTURBO">
                          <span class="switch"></span>
                        </label>
                      </div>

                      <div class="setting-row">
                        <label for="auctiongladiatorenable">${d.mh}</label>
                          <label class="toggle-switch">
                          <input type="checkbox" id="auctiongladiatorenable">
                          <span class="switch"></span>
                        </label>
                      </div>

                      <div class="setting-row">
                        <label for="auctionmercenaryenable">${d.oh}</label>
                          <label class="toggle-switch">
                          <input type="checkbox" id="auctionmercenaryenable">
                          <span class="switch"></span>
                         </label>
                      </div>

                      <div class="setting-row" data-tooltip="${d.Kd}>
                        <label for="ignorePS">${d.hf}</label>
                            <label class="toggle-switch">
                            <input type="checkbox" id="ignorePS">
                            <span class="switch"></span>
                        </label>
                      </div>

                      <div class="setting-row" data-tooltip="${d.Ta}>
                        <label for="bidFood">${d.Wd}</label>
                          <label class="toggle-switch">
                          <input type="checkbox" id="bidFood">
                          <span class="switch"></span>
                        </label>
                      </div>

                      <div class="setting-row" data-tooltip="${d.Jd}>
                      <label for="AuctionCover">${d.kb}</label>
                        <label class="toggle-switch">
                        <input type="checkbox" id="AuctionCover">
                        <span class="switch"></span>
                      </label>
                    </div>

                      <div class="setting-row" data-tooltip="${d.Ta}>
                        <label for="bidfood">${d.mg}</label>
                        <div class="switch-field3">
                          <input type="number" id="maximumBid" min="1" max="1000000" value="25">
                        </div>
                      </div>

                      <div class="setting-row">
                        <label for="aunctionMinQuality">${d.Aa}</label>
                         <select id="auctionMinQuality" class="input">
                          <option value="2">
                          ${d.D}
                          </option>
                          <option value="1">
                          ${d.B}
                          </option>
                          <option value="0">
                          ${d.C}
                          </option><!-- Add more options as needed -->
                        </select>
                      </div>

                    <div class="setting-row">
                      <label for="auctionminlevel">${d.Z}</label>
                      <div class="switch-field3">
                        <input type="number" id="auctionminlevel" min="1" max="1000" value="0">
                      </div>
                    </div>

                      <div class="setting-row">
                        <label for="bidStatus">${d.Xd}</label>
                         <select id="bidStatus" class="input">
                          <option value="4">
                          ${d.Zb}
                          </option>
                          <option value="3">
                          ${d.Vb}
                          </option>
                          <option value="2">
                          ${d.Ib}
                          </option>
                          <option value="1">
                          ${d.Ab}
                          </option>
                          <option value="0">
                          ${d.Yb}
                          </option><!-- Add more options as needed -->
                        </select>
                      </div>

                      <div class="setting-row">
                        <label for="enableMercenarySearch">${d.Wi}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="enableMercenarySearch">
                            <span class="switch"></span>
                        </label>
                    </div>

                    <div id="mercenarySearchOptions" style="display:none">
                        <div class="setting-row">
                        
                            <label for="minDexterity">Min: ${d.Dexterity}</label>
                            <div class="switch-field3">
                                <input type="number" id="minDexterity" min="1" max="10000" value="0">
                            </div>
                        </div>
                        <div class="setting-row">
                            <label for="minAgility">Min: ${d.Agility}</label>
                            <div class="switch-field3">
                                <input type="number" id="minAgility" min="1" max="10000" value="0">
                            </div>
                        </div>
                        <div class="setting-row">
                            <label for="minIntelligence">Min: ${d.Intelligence}</label>
                            <div class="switch-field3">
                                <input type="number" id="minIntelligence" min="1" max="10000" value="0">
                            </div>
                        </div>
                        <span class="span-new">Enter 0 to ignore stats.</span>
                    </div>
                      
                      <div class="setting-row">
                        <h4>${d.Yd}</h4>
                        <div class="table-container">
                          <table class="styled-table">
                            <tbody>
                              <tr>
                                <td>
                                  <ul class="styled-list" id="bidList"></ul>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div class="list-options">
                                    <input type="button" class="awesome-button" id="clearBidItemsHistory" value="${d.Xa}">
                                  </div>
                                  
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                  </div>

                <div class="popup-box" id="auto_smelt_settings">
                    <div class="settings_tab_title" style="position: relative;">
                        Auto Smelt
                        <i class="fas fa-info-circle" id="autoSmeltInfo" style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); cursor: pointer; font-size: 22px; color: black;"></i>

                    
                    </div>


                    <div class="rule-container">
                    <!-- Rule Row Template -->
                    <div class="rule-row-template" style="display: none;">
                        <!-- Top row (Condition, Prefix, Scroll, Level) -->
                        <div class="rule-top-row">
     
                            <label class="rule-checkbox-wrapper">
        
                                <input type="checkbox" class="rule-checkbox">
                                <span class="checkbox-icon"></span>
                                
                            </label>

                            &nbsp

                            <!-- Condition Combo Box -->
                            <select class="rule-condition-select">
                                <option value="nameContains">${d.Ag}</option>
                                <option value="isUnderworldItem">${d.isUnderworldItem}</option>
                            </select>

                            <!-- Text input appears only for 'Name contains' -->
                            <input type="text" class="rule-prefix-input" placeholder="${d.Jb}" />
                            <input type="text" class="rule-suffix-input" placeholder="${d.Wb}" />

                            <!-- Scroll Combo Box 
                            <select class="rule-scroll-select">
                                <option value="noScroll">No scroll</option>
                                <option value="anyScroll">Has any scroll</option>
                            </select>
                            -->

                            <input type="number" class="rule-level" placeholder="lvl>">
                        </div>

                        <!-- Second row (Item Types, Colors, Hammer) -->
                        <div class="rule-bottom-row">
                            <div class="item-types">
                                <img class="item-icon" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/sword.png" alt="Weapons" data-type="2">
                                <img class="item-icon" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/shield.png" alt="Shields" data-type="4">
                                <img class="item-icon" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/chest.png" alt="Chest Armour" data-type="8">
                                <img class="item-icon" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/helmet.png" alt="Helmets" data-type="1">
                                <img class="item-icon" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/gloves.png" alt="Gloves" data-type="256">
                                <img class="item-icon" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/shoes.png" alt="Shoes" data-type="512">
                                <img class="item-icon" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/ring1.png" alt="Rings1" data-type="48">

                                <img class="item-icon" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/necklace.png" alt="Amulets" data-type="1024">
                            </div>
                            <!-- Colors -->
                            <div class="rule-color-selection">
                                <span class="color-circle white" data-color="white"></span>
                                <span class="color-circle green" data-color="green"></span>
                                <span class="color-circle blue" data-color="blue"></span>
                                <span class="color-circle purple" data-color="purple"></span>
                                 <span class="color-circle orange" data-color="orange"></span>
                                <span class="color-circle red" data-color="red"></span>
                            </div>

                            <!-- Hammer Toggle with 3 states (bronze, silver, gold) -->
                            <div class="rule-hammer-selection">
                                <img class="item-i-19-10" data-hammer="bronze"  />
                                <img class="item-i-19-11" data-hammer="silver"  />
                                <img class="item-i-19-12" data-hammer="gold"  />
                            </div>

                            <button class="remove-rule-btn">X</button>
                        </div>
                    </div>

                    <!-- Add Rule Button -->
                    <button class="add-rule-btn">${d.Cg}</button>
                    <hr style="border: 1px solid #c4ac70; margin: 10px 0;">
                </div>



                    <!-- Condition Selection  
                    <div class="setting-row">
                        <label for="smeltCondition">Condition:</label>
                        <select id="smeltCondition" class="styled-select" style="width:200px">
                            <option value="name_contains">Name contains</option>
                            <option value="name_word">Name contains word</option>
                            <option value="color">Item color is</option>
                            <option value="underworld_prefix_suffix">Item has underworld prefix/suffix</option>
                        </select>
                    </div>
                    
                    <div class="setting-row" id="filterNameRow">
                        <label for="filterNameInput">Filter Profile Name:</label>
                        <input type="text" id="filterNameInput" class="styled-input3" placeholder="Enter profile name" />
                    </div>

                    <div class="setting-row" id="itemNameRow" style="display: none;">
                        <label for="itemNameInput">Item Name:</label>
                        <input type="text" id="itemNameInput" class="styled-input" placeholder="Enter item name" />
                    </div>
                    
                    <div class="setting-row" id="colorRow" style="display: none;">
                        <label>Select Color(s):</label>
                        <div class="color-selector">
                            <label class="color-circle" style="background-color: white;" data-value="white"></label>
                            <label class="color-circle" style="background-color: green;" data-value="green"></label>
                            <label class="color-circle" style="background-color: blue;" data-value="blue"></label>
                            <label class="color-circle" style="background-color: purple;" data-value="purple"></label>
                            <label class="color-circle" style="background-color: orange;" data-value="orange"></label>
                            <label class="color-circle" style="background-color: red;" data-value="red"></label>
                        </div>
                    </div>
                

                    <div class="setting-row">
                        <h4>Added Filters</h4>
                        <div id="filtersList" class="filter-list"></div>
                    </div>


                    <div class="setting-row">
                        <h4>Saved Items</h4>
                        <div id="savedItemsList" class="filter-list"></div>
                    </div>

                    

                    <div class="setting-row">
                        <label>${d.ma}</label>
                        <div class="equipment-selection-smelt">
                            <label><input type="checkbox" class="equipment-option-smelt" value="2"> ${d.fa}</label>
                            <label><input type="checkbox" class="equipment-option-smelt" value="4"> ${d.ca}</label>
                            <label><input type="checkbox" class="equipment-option-smelt" value="8"> ${d.U}</label>
                            <label><input type="checkbox" class="equipment-option-smelt" value="1"> ${d.X}</label>
                            <label><input type="checkbox" class="equipment-option-smelt" value="256"> ${d.W}</label>
                            <label><input type="checkbox" class="equipment-option-smelt" value="512"> ${d.da}</label>
                            <label><input type="checkbox" class="equipment-option-smelt" value="48"> ${d.aa}</label>
                            <label><input type="checkbox" class="equipment-option-smelt" value="1024"> ${d.T}</label>
                            <label><input type="checkbox" class="equipment-option-smelt" value="9999"> ${d.Ha}</label>
                        </div>
                    </div>
                  

                    <div class="setting-row" id="colorRowOriginal">
                        <label>Select Color(s):</label>
                        <div class="color-selector">
                            <label class="color-circle" style="background-color: white;" data-value="white"></label>
                            <label class="color-circle" style="background-color: green;" data-value="green"></label>
                            <label class="color-circle" style="background-color: blue;" data-value="blue"></label>
                            <label class="color-circle" style="background-color: purple;" data-value="purple"></label>
                            <label class="color-circle" style="background-color: orange;" data-value="orange"></label>
                            <label class="color-circle" style="background-color: red;" data-value="red"></label>
                        </div>
                    </div>
                    

                    <div class="setting-row">
                        <label for="smeltUnderworld">Smelt only Underworld/Hell items?</label>
                        <label class="toggle-switch">
                        <input type="checkbox" id="smeltUnderworld">
                        <span class="switch"></span>
                        </label>
                    </div>
                    -->

                    <div class="setting-row">
                        <label for="smeltLootbox">${d.Nj}</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="smeltLootbox">
                            <span class="switch"></span>
                        </label>
                    </div>

                    <!--
                    <div class="setting-row">
                      <label for="smeltIgnorePS">${d.Mj}</label>
                      <label class="toggle-switch">
                        <input type="checkbox" id="smeltIgnorePS">
                        <span class="switch"></span>
                      </label>
                    </div>
                    -->

                    <div class="setting-row">
                      <label for="smeltAnything">${d.Eh}</label>
                      
                      <label class="toggle-switch" data-tooltip="${d.Oj}">
                        <input type="checkbox" id="smeltAnything">
                        <span class="switch"></span>
                      </label>
                        <div class="rule-bottom-row">
                            <div class="item-types">
                                <img class="item-icon2" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/sword.png" alt="Weapons" data-type="2">
                                <img class="item-icon2" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/shield.png" alt="Shields" data-type="4">
                                <img class="item-icon2" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/chest.png" alt="Chest Armour" data-type="8">
                                <img class="item-icon2" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/helmet.png" alt="Helmets" data-type="1">
                                <img class="item-icon2" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/gloves.png" alt="Gloves" data-type="256">
                                <img class="item-icon2" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/shoes.png" alt="Shoes" data-type="512">
                                <img class="item-icon2" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/ring1.png" alt="Rings1" data-type="48">

                                <img class="item-icon2" src="https://raw.githubusercontent.com/fociisoftware/glbt/main/necklace.png" alt="Amulets" data-type="1024">
                            </div>
                            <!-- Colors -->
                            <div class="rule-color-selection2">
                                <span class="color-circle2 white" data-color="white"></span>
                                <span class="color-circle2 green" data-color="green"></span>
                                <span class="color-circle2 blue" data-color="blue"></span>
                                <span class="color-circle2 purple" data-color="purple"></span>
                                 <span class="color-circle2 orange" data-color="orange"></span>
                                <span class="color-circle2 red" data-color="red"></span>
                            </div>

                            <!-- Hammer Toggle with 3 states (bronze, silver, gold) -->
                            <div class="rule-hammer-selection2">
                                <img class="item-i-19-10" data-hammer="bronze"  />
                                <img class="item-i-19-11" data-hammer="silver"  />
                                <img class="item-i-19-12" data-hammer="gold"  />
                            </div>

        
                        </div>
                    </div>

                    <div class="setting-row" data-tooltip="${d.Pj}">
                      <label for="smelteverything3">${d.Xj}</label>
                      <label class="toggle-switch">
                        <input type="checkbox" id="smelteverything3">
                        <span class="switch"></span>
                      </label>
                    </div>

                    <div class="setting-row">
                      <label for="smelthighercolors">${d.Yj}</label>
                      <label class="toggle-switch">
                        <input type="checkbox" id="smelthighercolors">
                        <span class="switch"></span>
                      </label>
                    </div>

                    <div class="setting-row">
                      <label for="RepairBeforeSmelt">${d.Fj}</label>
                      <label class="toggle-switch">
                        <input type="checkbox" id="RepairBeforeSmelt">
                        <span class="switch"></span>
                      </label>
                        <div class="setting-row">
                        <label for="repairBeforeSmeltMaxQuality">${d.Pc}</label>
                            <select id="repairBeforeSmeltMaxQuality" class="input">
                                    <option value="3">
                                    ${d.H}
                                    </option>
                                    <option value="2">
                                    ${d.D}
                                    </option>
                                    <option value="1">
                                    ${d.B}
                                    </option>
                                    <option value="0">
                                    ${d.C}
                                    </option>
                                    <option value="-1">
                                    ${d.Ea}
                                    </option>
                            </select>
                        </div>
                        <div class="setting-row">
                        <label for="PartialOrFull">${d.Ig}</label>
                            <select id="PartialOrFull" class="input">
                                    <option value="0">
                                    ${d.Jg}
                                    </option>
                                    <option value="1">
                                    ${d.Ye}
                                    </option>
                            </select>
                        </div>
                    </div>

                    
                    <div class="setting-row">
                        <label for="smeltTab">${d.Fh}</label>
                        <select id="smeltTab" class="input">
                        <option value="6">
                            8
                        </option>
                            <option value="5">
                                7
                            </option>
                            <option value="4">
                                6
                            </option>
                            <option value="3">
                                5
                            </option>
                            <option value="2">
                                4
                            </option>
                            <option value="1">
                                3
                            </option>
                            <option value="0">
                                2
                            </option>
                        </select>
                    </div>


                    <div class="settings_tab_title">${d.Dh}</div>
                        <div class="setting-row">
                            <div class="table-container">
                                <table class="styled-table">
                                <thead>
                                    <tr>
                                    <th>${d.Jb}</th>
                                    <th>${d.Wb}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>
                                        <ul class="styled-list" id="IgnoredprefixList"></ul>
                                    </td>
                                    <td>
                                        <ul class="styled-list" id="IgnoredsuffixList"></ul>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <div class="list-options">
                                        <input type="text" class="styled-input" id="newIgnoredPrefixInput">
                                        <input type="button" class="awesome-button" id="IgnoredaddPrefixButton" value="${d.Oa}">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="list-options">
                                        <input type="text" class="styled-input" id="newIgnoredSuffixInput">
                                        <input type="button" class="awesome-button" id="IgnoredaddSuffixButton" value="${d.Pa}">
                                        </div>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>          
                        </div>
                    </div>
                    
                    <!-- Smelted Items List -->
                  
                    <div class="settings_tab_title">${d.Wj}</div>
                        <div class="setting-row">
                            <div class="table-container">
                                <table class="styled-table">
                                    <tbody>
                                    <tr>
                                        <td>
                                        <ul class="styled-list" id="smeltedList"></ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <div class="list-options">
                                            <input type="button" class="awesome-button" id="clearSmeltedItemsHistory" value="${d.Xa}">
                                            
                                        </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>    
                        </div>
                    </div>
                </div>

                
                <div class="popup-box" id="auto_repair_settings">
                <div class="settings_tab_title">${d.Mb}</div>
                <div class="setting-row">

                    <div class="inventory gladiator-inventory">
                        <h3>Gladiator</h3>
                        <!-- Inventory Rows for Gladiator -->
                        <div class="inventory-row">
                            <div class="inventory-item" id="weapon">
                                <div class="sword-image" id="sword-image"></div>
                            </div>
                            <div class="inventory-item" id="helmet">
                                <div class="helmet-image" id="helmet-image"></div>
                            </div>
                            <div class="inventory-item" id="armor">
                                <div class="chest-image" id="chest-image" ></div>
                            </div>
                            <div class="inventory-item" id="shield">
                                <div class="shield-image" id="shield-image"></div>
                            </div>
                             <div class="inventory-item" id="gloves">
                                <div class="gloves-image" id="gloves-image"></div>
                            </div>
                        </div>
                        <div class="inventory-row">
                            <div class="inventory-item" id="shoes">
                                <div class="shoes-image" id="shoes-image"></div>
                            </div>
                            <div class="inventory-item" id="rings1">
                                <div class="ring1-image" id="ring1-image"></div>
                            </div>
                            <div class="inventory-item" id="rings2">
                                <div class="ring2-image" id="ring2-image"></div>
                            </div>
                            <div class="inventory-item" id="necklace">
                                <div class="necklace-image" id="necklace-image"></div>
                            </div>

                        </div>
                    </div>

                    <div class="inventory mercenary-inventory">
                        <h3>Mercenary</h3>
                        <!-- Inventory Rows for Mercenary -->
                        <div class="inventory-row">
                            <div class="inventory-item" id="weaponM">
                                <div class="sword-image" id="sword-image"></div>
                            </div>
                            <div class="inventory-item" id="helmetM">
                                <div class="helmet-image" id="helmet-image"></div>
                            </div>
                            <div class="inventory-item" id="armorM">
                                <div class="chest-image" id="chest-image" ></div>
                            </div>
                            <div class="inventory-item" id="shieldM">
                                <div class="shield-image" id="shield-image"></div>
                            </div>
                             <div class="inventory-item" id="glovesM">
                                <div class="gloves-image" id="gloves-image"></div>
                            </div>
                        </div>
                        <div class="inventory-row">
                            <div class="inventory-item" id="shoesM">
                                <div class="shoes-image" id="shoes-image"></div>
                            </div>
                            <div class="inventory-item" id="rings1M">
                                <div class="ring1-image" id="ring1-image"></div>
                            </div>
                            <div class="inventory-item" id="rings2M">
                                <div class="ring2-image" id="ring2-image"></div>
                            </div>
                            <div class="inventory-item" id="necklaceM">
                                <div class="necklace-image" id="necklace-image"></div>
                            </div>
                        </div>
                    </div>

                    <div class="instructions" style="clear: both;">
                            <span class="span-new">${d.ec}</span><br>
                            <span class="span-new">${d.eh}</span>
                        </div>
                    </div>

                    <div class="setting-row">
                        <label for="repairGladiator">${d.Da} Gladiator?</label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="repairGladiator">
                            <span class="switch"></span>
                        </label>
                    </div>
                  
                    <div class="setting-row">
                        <label for="repairMercenary">${d.Da} Mercenary?</label>
                        <label class="toggle-switch">
                        <input type="checkbox" id="repairMercenary">
                        <span class="switch"></span>
                        </label>
                    </div>

                    <div class="setting-row">
                        <label for="repairPercentage">${d.xg}</label>
                        <select id="repairPercentage" class="input">
                        <option value="3">%10</option>
                        <option value="2">%20</option>
                        <option value="1">%30</option>
                        <option value="0">%40</option>
                        <option value="-1">%50</option>
                        </select>
                    </div>

                    <div class="setting-row">
                        <label for="repairMaxQuality">${d.Pc}</label>
                        <select id="repairMaxQuality" class="input">
                                <option value="3">
                                ${d.H}
                                </option>
                                <option value="2">
                                ${d.D}
                                </option>
                                <option value="1">
                                ${d.B}
                                </option>
                                <option value="0">
                                ${d.C}
                                </option>
                                <option value="-1">
                                ${d.Ea}
                                </option>
                        </select>
                    </div>

                    <div class="setting-row">
                        <label for="currentWorkbenchItem">${d.ee}</label>
                        <span id="currentWorkbenchItem"></span> <!-- Item name will be displayed here -->
                    </div>

                    <div class="setting-row">
                        <div id="clear_repair" style="display:flex;" class="awesome-button">${d.sk}</div>
                    </div>

                    <div class="setting-row" id="ignoreMaterialsSection" style="margin-top: 10px; border-top: 1px solid #b3a77a; padding-top: 10px; background: linear-gradient(to right, #e8e1c8, #dacfa1); border-radius: 8px;">
                        <h3 style="color: #5a5a5a; font-family: 'Arial', sans-serif; text-align: center; text-transform: uppercase; letter-spacing: 2px;">${d.gf}</h3>
                        
                        <!-- Scrollable list of materials -->
                        <div id="ignoreMaterialsList" style="border-radius: 4px; padding: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); height: 300px; max-height: 300px; overflow-y: auto; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                            <!-- Base Materials category -->
                            <div>
                                <h4 style="font-family: 'Arial', sans-serif; margin-bottom: 5px;">Base Materials</h4>
                                <label><input type="checkbox" value="1"> ${d.Nc}</label><br>
                                <label><input type="checkbox" value="2"> ${d.Dc}</label><br>
                                <label><input type="checkbox" value="3"> ${d.Hc}</label><br>
                                <label><input type="checkbox" value="4"> ${d.Jc}</label><br>
                            </div>

                            <!-- Materials category -->
                            <div>
                                <h4 style="font-family: 'Arial', sans-serif; margin-bottom: 5px;">Materials</h4>
                                <label><input type="checkbox" value="13"> ${d.Oc}</label><br>
                                <label><input type="checkbox" value="14 Wool"> ${d.Ec}</label><br>
                                <label><input type="checkbox" value="15"> ${d.Gc}</label><br>
                                <label><input type="checkbox" value="16"> ${d.Fc}</label><br>
                                <label><input type="checkbox" value="17"> ${d.Kc}</label><br>
                                <label><input type="checkbox" value="18"> ${d.Ic}</label><br>
                                <label><input type="checkbox" value="19"> ${d.Mc}</label><br>
                                <label><input type="checkbox" value="20"> ${d.Lc}</label><br>
                            </div>

                            <!-- Monster Parts category -->
                            <div>
                                <h4 style="font-family: 'Arial', sans-serif; margin-bottom: 5px;">Monster Parts</h4>
                                <label><input type="checkbox" value="5"> ${d.Wc}</label><br>
                                <label><input type="checkbox" value="6"> ${d.Qc}</label><br>
                                <label><input type="checkbox" value="7"> ${d.Zc}</label><br>
                                <label><input type="checkbox" value="8"> ${d.Tc}</label><br>
                                <label><input type="checkbox" value="9"> ${d.Vc}</label><br>
                                <label><input type="checkbox" value="10> ${d.Uc}</label><br>
                                <label><input type="checkbox" value="11"> ${d.Rc}</label><br>
                                <label><input type="checkbox" value="12"> ${d.Yc}</label><br>
                                <label><input type="checkbox" value="55"> ${d.Sc}</label><br>
                                <label><input type="checkbox" value="58"> ${d.Xc}</label><br>
                                <label><input type="checkbox" value="62"> ${d.$c}</label><br>
                                <label><input type="checkbox" value="64"> ${d.ad}</label><br>
                            </div>

                            <!-- Gemstones category -->
                            <div>
                                <h4 style="font-family: 'Arial', sans-serif; margin-bottom: 5px;">Gemstones</h4>
                                <label><input type="checkbox" value="21"> ${d.zc}</label><br>
                                <label><input type="checkbox" value="22"> ${d.tc}</label><br>
                                <label><input type="checkbox" value="23"> ${d.sc}</label><br>
                                <label><input type="checkbox" value="24"> ${d.uc}</label><br>
                                <label><input type="checkbox" value="25"> ${d.Ac}</label><br>
                                <label><input type="checkbox" value="26"> ${d.xc}</label><br>
                                <label><input type="checkbox" value="27"> ${d.wc}</label><br>
                                <label><input type="checkbox" value="28"> ${d.vc}</label><br>
                                <label><input type="checkbox" value="59"> ${d.yc}</label><br>
                                <label><input type="checkbox" value="63"> ${d.Bc}</label><br>
                            </div>

                            <!-- Flasks category -->
                            <div>
                                <h4 style="font-family: 'Arial', sans-serif; margin-bottom: 5px;">Flasks</h4>
                                <label><input type="checkbox" value="37"> ${d.nc}</label><br>
                                <label><input type="checkbox" value="38"> ${d.qc}</label><br>
                                <label><input type="checkbox" value="39"> ${d.jc}</label><br>
                                <label><input type="checkbox" value="40"> ${d.ic}</label><br>
                                <label><input type="checkbox" value="41"> ${d.pc}</label><br>
                                <label><input type="checkbox" value="42"> ${d.mc}</label><br>
                                <label><input type="checkbox" value="43"> ${d.kc}</label><br>
                                <label><input type="checkbox" value="44"> ${d.lc}</label><br>
                                <label><input type="checkbox" value="53"> ${d.rc}</label><br>
                                <label><input type="checkbox" value="61"> ${d.oc}</label><br>
                            </div>

                            <!-- Runes category -->
                            <div>
                                <h4 style="font-family: 'Arial', sans-serif; margin-bottom: 5px;">Runes</h4>
                                <label><input type="checkbox" value="29"> ${d.Ad}</label><br>
                                <label><input type="checkbox" value="30"> ${d.ud}</label><br>
                                <label><input type="checkbox" value="31"> ${d.sd}</label><br>
                                <label><input type="checkbox" value="32"> ${d.zd}</label><br>
                                <label><input type="checkbox" value="33"> ${d.yd}</label><br>
                                <label><input type="checkbox" value="34"> ${d.wd}</label><br>
                                <label><input type="checkbox" value="35"> ${d.td}</label><br>
                                <label><input type="checkbox" value="36"> ${d.xd}</label><br>
                                <label><input type="checkbox" value="60"> ${d.vd}</label><br>
                            </div>

                            <!-- Ores category -->
                            <div>
                                <h4 style="font-family: 'Arial', sans-serif; margin-bottom: 5px;">Ores</h4>
                                <label><input type="checkbox" value="45"> ${d.fd}</label><br>
                                <label><input type="checkbox" value="46"> ${d.ed}</label><br>
                                <label><input type="checkbox" value="47"> ${d.kd}</label><br>
                                <label><input type="checkbox" value="48"> ${d.nd}</label><br>
                                <label><input type="checkbox" value="49"> ${d.od}</label><br>
                                <label><input type="checkbox" value="50"> ${d.hd}</label><br>
                                <label><input type="checkbox" value="51"> ${d.md}</label><br>
                                <label><input type="checkbox" value="52"> ${d.ld}</label><br>
                                <label><input type="checkbox" value="54"> ${d.dd}</label><br>
                                <label><input type="checkbox" value="56"> ${d.gd}</label><br>
                                <label><input type="checkbox" value="57"> ${d.jd}</label><br>
                            </div>
                        </div>

                    </div>

                </div>


                <div class="popup-box" id="guild_settings">

                    <!-- Guld stuff comes here -->

                    <div class="settings_tab_title">${d.Hh}</div>

                        <span class="span-new">${d.Vi}:</span>
                        <span class="span-new">${d.sf}</span>
                  
                        <div class="setting-row">
                            <label for="doKasa">${d.v}</label>
                            <label class="toggle-switch">
                            <input type="checkbox" id="doKasa">
                            <span class="switch"></span>
                            </label>
                        </div>

                        <div class="setting-row">
                        <label for="AuctionItemLevel2">${d.yg}</label>
                            <div class="switch-field2">
                            <input type="number" id="minimumGoldAmount" placeholder="Amount" value="${localStorage.getItem("minimumGoldAmount")||0}">         
                            </div>
                        </div>

                        <div class="setting-row">
                            <label for="filterGM">${d.We}</label>
                            <select id="filterGM">
                            <option value="" disabled>${d.ba}</option>
                            <option value="pd">${d.zg}</option>
                            <option value="p">${d.be}</option>
        
                            </select>
                        </div>

                        <div class="setting-row">
                            <label for="guildPackHour">${d.Rb}</label>
                            <select id="guildPackHour">
                            <option value="" disabled>${d.Rb}</option>
                            <option value="1">2 hr</option>
                            <option value="2">8 hr</option>
                            <option value="3">24 hr</option>
                            </select>
                        </div>

                        <div class="setting-row">
                        <label for="KasaHoldGold">${d.Y}</label>
                            <div class="switch-field3">
                            <input type="number" id="KasaHoldGold" placeholder="Amount" value="${localStorage.getItem("KasaHoldGold")||0}">       
                                </div>
                        </div>

                        <div class="setting-row">
                            <label for="itemsToResetGuild">${d.ba}</label>
                            <div id="itemsToResetGuild" class="items-reset-list">
                                <div class="item-reset"><input type="checkbox" id="GUILD_WEAPONS" value="GUILD_WEAPONS"><label for="GUILD_WEAPONS">${d.oa}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_SHIELD" value="GUILD_SHIELD"><label for="GUILD_SHIELD">${d.S}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_CHEST" value="GUILD_CHEST"><label for="GUILD_CHEST">${d.M}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_HELMET" value="GUILD_HELMET"><label for="GUILD_HELMET">${d.P}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_GLOVES" value="GUILD_GLOVES"><label for="GUILD_GLOVES">${d.O}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_SHOES" value="GUILD_SHOES"><label for="GUILD_SHOES">${d.N}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_RINGS" value="GUILD_RINGS"><label for="GUILD_RINGS">${d.na}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_AMULETS" value="GUILD_AMULETS"><label for="GUILD_AMULETS">${d.ka}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_FOOD" value="GUILD_FOOD"><label for="GUILD_FOOD">${d.Ia}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_USABLES" value="GUILD_USABLES"><label for="GUILD_USABLES">${d.pd}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_UPGRADES" value="GUILD_UPGRADES"><label for="GUILD_UPGRADES">${d.Na}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_RECIPES" value="GUILD_RECIPES"><label for="GUILD_RECIPES">${d.Ka}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_MERCENARY" value="GUILD_MERCENARY"><label for="GUILD_MERCENARY">${d.Ja}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_SCROLLS" value="GUILD_SCROLLS"><label for="GUILD_SCROLLS">${d.La}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_REINFORCEMENTS" value="GUILD_REINFORCEMENTS"><label for="GUILD_REINFORCEMENTS">${d.rd}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_TOOLS" value="GUILD_TOOLS"><label for="GUILD_TOOLS">${d.Ma}</label></div>
                                <div class="item-reset"><input type="checkbox" id="GUILD_FORGE_RESOURCES" value="GUILD_FORGE_RESOURCES"><label for="GUILD_FORGE_RESOURCES">${d.qd}</label></div>
                            </div>
                        </div>

                    <div class="settings_tab_title">${d.$i}</div>

                            
                            <div class="setting-row">
                                <label for="guildBattleEnable">${d.v}</label>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="guildBattleEnable">
                                    <span class="switch"></span>
                                </label>          
                            </div>

                            <div class="setting-row">
                             <label for="guildBattleRandom">${d.Zi}</label>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="guildBattleRandom">
                                    <span class="switch"></span>
                                </label>
                            </div>

                            <div class="setting-row">
                                ${d.aj}
                                <div class="input-container">
                                <input type="text" id="keywordGuildInput" placeholder="${d.V}">
                                <button class="awesome-button" id="addGuildKeywordBtn">${d.I}</button>
                                </div>
                                <div id="keywordGuildList"></div>
                            </div>

                    <div class="settings_tab_title">${d.lb}</div>

                        <div class="setting-row">
                            <label for="GuildEnable">${d.v}</label>
                            <label class="toggle-switch">
                                <input type="checkbox" id="GuildEnable">
                                <span class="switch"></span>
                            </label>
                        </div>

                        <div class="setting-row">
                        
                            <label for="GuildDonateAmount">${d.ff}</label>
                            <div class="switch-field3">
                                <input type="number" id="GuildDonateAmount" min="0" value="${localStorage.getItem("GuildDonateAmount")||0}">      
                            </div> 

                        </div>

                        <div class="setting-row">
                            <label for="GuildDonateMore">${d.ie}</label>
                                <div class="switch-field3">
                                    <input type="number" id="GuildDonateMore" min="0" value="${localStorage.getItem("GuildDonateMore")||0}">                         
                                </div>

                        </div>

                        <div class="setting-row">
                            <label for="GuildDonateLess">${d.tf}</label>
                            <div class="switch-field3">
                            <input type="number" id="GuildDonateLess" min="0" value="${localStorage.getItem("GuildDonateLess")||0}">       
                            </div>                  
                        </div>

                        <span class="span-new">${d.he}</span>
                        
                    </div>

                <div class="popup-box" id="other_settings2">

                    <div class="settings_tab_title">${d.fh}</div>


                    <div class="setting-row">
                    <span class="span-new">${d.gh}</span>
                    <div class="instructionsReset">
                    
                    <span class="span-new">${d.Nb}</span>
                    </div>
                 
                    </div>
                    
                    <div class="setting-row">
                      <label for="resetExpiredItems">${d.v}</label>
                      <label class="toggle-switch">
                          <input type="checkbox" id="resetExpiredItems">
                          <span class="switch"></span>
                      </label>
                    </div>
                    <div class="setting-row">
                    <label for="resetColors">Select Colors</label>
                            <div class="rule-color-resetColors">
                                <span class="color-circle3 white" data-color="-1"></span>
                                <span class="color-circle3 green" data-color="0"></span>
                                <span class="color-circle3 blue" data-color="1"></span>
                                <span class="color-circle3 purple" data-color="2"></span>
                                <span class="color-circle3 orange" data-color="3"></span>
                                <span class="color-circle3 red" data-color="4"></span>
                            </div>
                    </div>


                    <div class="setting-row">
 
                        <label for="resetDays">${d.hh}</label>
                        <select id="resetDays" style="margin-left: 5px;">
                            <option value="1">1 day</option>
                            <option value="2">2 days</option>
                            <option value="3">3 days</option>
                            <option value="4">4 days</option>
                        </select>
                    </div>
                    
                    <div class="setting-row">
                        <label for="itemsToReset">${d.Sk}</label>
                        <button id="selectAllItems" title="Select All">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                                <polyline points="20 6 9 17 4 12"></polyline> 
                            </svg>
                        </button>
                        <div id="itemsToReset" class="items-reset-list">
                        
                            <div class="item-reset"><input type="checkbox" id="WEAPONS" value="WEAPONS"><label for="WEAPONS">${d.oa}</label></div>
                            <div class="item-reset"><input type="checkbox" id="SHIELD" value="SHIELD"><label for="SHIELD">${d.S}</label></div>
                            <div class="item-reset"><input type="checkbox" id="CHEST" value="CHEST"><label for="CHEST">${d.M}</label></div>
                            <div class="item-reset"><input type="checkbox" id="HELMET" value="HELMET"><label for="HELMET">${d.P}</label></div>
                            <div class="item-reset"><input type="checkbox" id="GLOVES" value="GLOVES"><label for="GLOVES">${d.O}</label></div>
                            <div class="item-reset"><input type="checkbox" id="SHOES" value="SHOES"><label for="SHOES">${d.N}</label></div>
                            <div class="item-reset"><input type="checkbox" id="RINGS" value="RINGS"><label for="RINGS">${d.na}</label></div>
                            <div class="item-reset"><input type="checkbox" id="AMULETS" value="AMULETS"><label for="AMULETS">${d.ka}</label></div>
                            <div class="item-reset"><input type="checkbox" id="FOOD" value="FOOD"><label for="FOOD">${d.Ia}</label></div>
                            <div class="item-reset"><input type="checkbox" id="USABLES" value="USABLES"><label for="USABLES">${d.pd}</label></div>
                            <div class="item-reset"><input type="checkbox" id="UPGRADES" value="UPGRADES"><label for="UPGRADES">${d.Na}</label></div>
                            <div class="item-reset"><input type="checkbox" id="RECIPES" value="RECIPES"><label for="RECIPES">${d.Ka}</label></div>
                            <div class="item-reset"><input type="checkbox" id="MERCENARY" value="MERCENARY"><label for="MERCENARY">${d.Ja}</label></div>
                            <div class="item-reset"><input type="checkbox" id="SCROLLS" value="SCROLLS"><label for="SCROLLS">${d.La}</label></div>
                            <div class="item-reset"><input type="checkbox" id="REINFORCEMENTS" value="REINFORCEMENTS"><label for="REINFORCEMENTS">${d.rd}</label></div>
                            <div class="item-reset"><input type="checkbox" id="TOOLS" value="TOOLS"><label for="TOOLS">${d.Ma}</label></div>
                            
                        </div>

                        <div class="setting-row">
                            <label for="resetUnderworld">${d.Tk}</label>
                            <label class="toggle-switch">
                                <input type="checkbox" id="resetUnderworld">
                                <span class="switch"></span>
                            </label>
                        </div>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid black; margin: 10px 0px;">

                    <div class="setting-row">
                        <label for="pauseDuration">${d.Mg} </label>
                        <select id="pauseDuration">
                        <option value="0">No pause</option>
                        <option value="1">Stable Boy</option>
                        <option value="2">Farmer</option>
                        <option value="3">Butcher</option>
                        <option value="4">Fisherman</option>
                        <option value="5">Baker</option>
                        </select>
                    </div>
                     
              </div>

                <div class="popup-box" id="Timers">
                <div class="settings_tab_title">${d.Xb}</div>
                <span class="span-new">${d.Timers}</span>

                <div class="setting-row">
                    <div class="timer-list" style="display: grid; grid-template-columns: repeat(2, 5fr); gap: 10px;">

                    <div class="timer-item">
                        <label for="smelting-timer" style="font-weight: bold;">${d.di}</label>
                        <p class="description">${d.bi}</p>
                        <input type="number" id="smelting-timer" class="timer-input" style="width: 60px;" min="3" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).Smelting||10}">
                    </div>

                    <div class="timer-item">
                        <label for="smelting-timer-nogold" style="font-weight: bold;">${d.ci}</label>
                        <p class="description">${d.Zh}</p>
                        <input type="number" id="smelting-timer-nogold" class="timer-input" style="width: 60px;" min="3" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).SmeltingNoGold||5}">
                    </div>

                    <div class="timer-item">
                        <label for="smelting-timer-noitem" style="font-weight: bold;">${d.$h}</label>
                        <p class="description">${d.ai}</p>
                        <input type="number" id="smelting-timer-noitem" class="timer-input" style="width: 60px;" min="3" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).SmeltingNoItem||15}">
                    </div>

                    <div class="timer-item">
                        <label for="repair-timer" style="font-weight: bold;">${d.Da}</label>
                        <p class="description">${d.Uh}</p>
                        <input type="number" id="repair-timer" class="timer-input" style="width: 60px;" min="3" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).Repair||10}">
                    </div>

                    <div class="timer-item">
                        <label for="guild-market-timer" style="font-weight: bold;">${d.Sh}</label>
                        <p class="description">${d.Th}</p>
                        <input type="number" id="guild-market-timer" class="timer-input" style="width: 60px;" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).GuildMarket||2}">
                    </div>

                    <div class="timer-item">
                        <label for="auction-hold-timer" style="font-weight: bold;">${d.Oh}</label>
                        <p class="description">${d.Ph}</p>
                        <input type="number" id="auction-hold-timer" class="timer-input" style="width: 60px;" min="3" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).AuctionHoldGold||5}">
                    </div>

                    <div class="timer-item">
                        <label for="arena-timer" style="font-weight: bold;">Arena:</label>
                        <p class="description">${d.Lh}</p>
                        <input type="number" id="arena-timer" class="timer-input" style="width: 60px;" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).Arena||10}">
                    </div>

                    <div class="timer-item">
                        <label for="circus-turma-timer" style="font-weight: bold;">Circus Turma:</label>
                        <p class="description">${d.Qh}</p>
                        <input type="number" id="circus-turma-timer" class="timer-input" style="width: 60px;" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).CircusTurma||10}">
                    </div>

                    <div class="timer-item">
                        <label for="training-timer" style="font-weight: bold;">${d.gi}</label>
                        <p class="description">${d.hi}</p>
                        <input type="number" id="training-timer" class="timer-input" style="width: 60px;" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).Training||2}">
                    </div>

                    <div class="timer-item">
                        <label for="reset-expired-timer" style="font-weight: bold;">${d.Vh}</label>
                        <p class="description">${d.Wh}</p>
                        <input type="number" id="reset-expired-timer" class="timer-input" style="width: 60px;" min="3" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).ResetExpired||10}">
                    </div>

                    <div class="timer-item">
                        <label for="store-forge-timer" style="font-weight: bold;">${d.ei}</label>
                        <p class="description">${d.fi}</p>
                        <input type="number" id="store-forge-timer" class="timer-input" style="width: 60px;" min="5" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).StoreForge||10}">
                    </div>

                    <div class="timer-item">
                        <label for="reset-auction-timer" style="font-weight: bold;">${d.Mh}</label>
                        <p class="description">${d.Nh}</p>
                        <input type="number" id="reset-auction-timer" class="timer-input" style="width: 60px;" min="1" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).AuctionCheck||10}">
                    </div>

                    <div class="timer-item">
                        <label for="reset-search-timer" style="font-weight: bold;">${d.Xh}</label>
                        <p class="description">${d.Yh}</p>
                        <input type="number" id="reset-search-timer" class="timer-input" style="width: 60px;" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).SearchTimer||5}">
                    </div>

                    <div class="timer-item">
                        <label for="reset-guilddonate-timer" style="font-weight: bold;">${d.lb}</label>
                        <p class="description">${d.Rh}</p>
                        <input type="number" id="reset-guilddonate-timer" class="timer-input" style="width: 60px;" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).GuildDonate||5}">
                    </div>

                    <div class="timer-item">
                        <label for="reset-guildattack-timer" style="font-weight: bold;">Guild Attack</label>
                        <p class="description">Sets timer for guild attack</p>
                        <input type="number" id="reset-guildattack-timer" class="timer-input" style="width: 60px;" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).guildBattleEnable||120}">
                    </div>

                    <div class="timer-item">
                        <label for="reset-buff-timer" style="font-weight: bold;">Buffs</label>
                        <p class="description">Buff timer</p>
                        <input type="number" id="reset-buff-timer" class="timer-input" style="width: 60px;" placeholder="Min" value="${JSON.parse(localStorage.getItem("Timers")).Buffs||60}">
                    </div>

                    </div>
                </div>
                </div>


                  <div class="popup-box" id="other_settings">

                <div class="settings_tab_title">${d.Ed}</div>

                <div class="setting-row">
                ${d.Fd}
                    <select id="delaySelect">
                    <option value="0">0 seconds</option>
                    <option value="1">1 second</option>
                    <option value="5">1 to 5 seconds</option>
                    <option value="10">5 to 10 seconds</option>
                    <option value="15">10 to 15 seconds</option>
                    <option value="30">15 to 30 seconds</option>
                    <option value="60">30 to 60 seconds</option>
                    <option value="160">1 to 60 seconds</option>
                    <option value="120">1 to 2 minutes</option>
                    </select>
                </div>
                <div class="setting-row">
                    <label for="timeConditions">Bot Auto Start/Stop Schedule:</label>
                    <div id="timeConditions"></div>
                    <br>
                    <button id="addCondition" class="awesome-button btn">Add Condition</button>
                    <br><br>
                    <button id="pauseButton" class="pause-button">Pause?</button>
                </div>
                  
                <div class="settings_tab_title">${d.ik}</div>

                <div class="setting-row">
                  <label for="storeResource">${d.v}</label>
                    <label class="toggle-switch">
                    <input type="checkbox" id="storeResource">
                    <span class="switch"></span>
                    </label>
                </div>

                <div class="settings_tab_title">${d.qe}</div>

                <div class="setting-row">
                  <label for="HighlightUnderworldItems">${d.v}</label>
                    <label class="toggle-switch">
                    <input type="checkbox" id="HighlightUnderworldItems">
                    <span class="switch"></span>
                    </label>
                </div>
                    
                <div class="settings_tab_title">${d.ii}</div>
                <div class="setting-row">

                      <div class="setting-row">
                        <label for="trainEnable">${d.v}</label>
                          <label class="toggle-switch">
                          <input type="checkbox" id="trainEnable">
                          <span class="switch"></span>
                          </label>
                      </div>

                      <div class="setting-row">
                        <label for="trainPickGold">${d.jk}</label>
                          <label class="toggle-switch">
                          <input type="checkbox" id="trainPickGold">
                          <span class="switch"></span>
                          </label>
                      </div>

                          ${d.ki}
                      <div class="stat-container">




                        <table id="statTable">
                        <thead>
                            <tr>
                                <th>${d.v}</th>
                                <th>${d.Gh}</th>
                                <th>${d.Ng}</th>
                                <th>${d.Ba}</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                                                                                                        

                        <div class="setting-row">
                            
                            <label for="TrainingHoldGold">${d.Y}</label>

                            <div class="switch-field3">
                            <input type="number" id="TrainingHoldGold" min="0" value="${localStorage.getItem("TrainingHoldGold")||0}">                         
                            </div>  
                  
                        </div>

                                  <span class="span-new">${d.ji}</span>        

                      </div>  
                    </div>
        
                </div>

            <div class="popup-box" id="Extra">
            <div class="settings_tab_title">${d.ob}</div>

              <div class="setting-row">
                
                    <span class="span-new">3 Day Trial Key : </span>
                    <span id="kydt"></span>
                    <br>
                    <span class="span-new">${d.Qe} : </span>
                    <span id="kydtexp"></span>
                    
                    <ul>
                    <p>
                    <b>3.3.3 Update</b>
                    <div class="scrollable-list">
                        <ul>
                        <li>Please check discord for patch notes</li>
                        </ul>
                    </div>

                </div>

                <div class="settings_tab_title">Stats</div>
                    <div class="setting-row">
                        <div id="stats">
                            <p>${d.gk} <span id="items-repaired">0</span></p>
                            <p>${d.Cd} <span id="items-reset">0</span></p>
                            <p>${d.fk} <span id="gold-cycled">0</span></p>
                            <p>${d.$j} <span id="arena-attacks">0</span></p>
                            <p>${d.bk} <span id="circus-attacks">0</span></p>
                            <p>${d.dk} <span id="dungeons-attacked">0</span></p>
                            <p>${d.ek} <span id="expeditions-attacked">0</span></p>
                            <p>${d.Cd} <span id="items-smelted">0</span></p>
                            <p>${d.hk} <span id="underworld-attacks">0</span></p>
                            <p>${d.ak} <span id="arena-money">0</span></p>
                            <p>${d.ck} <span id="circus-money">0</span></p>
                        </div>
                        <button class="awesome-button" id="reset-stats-button">${d.Li}</button>
                    </div>
           

            <div class="settings_tab_title">${d.jf}</div>
            
            <div class="setting-row">
              <button class="awesome-button" id="exportBtn">${d.Re}</button>
              <input type="file" id="importBtn" style="display: none;">
              <button class="awesome-button" id="importFileBtn">${d.kf}</button>
              <p id="importStatus"></p>
              <p>
            </div>

            <div class="settings_tab_title">${d.Td}</div>

            <div class="setting-row">
            <span class="span-new">${d.Ud}</span>
              <br></br>
              <label for="autologinenable">${d.v}</label>
                <label class="toggle-switch">
                <input type="checkbox" id="autologinenable">
                <span class="switch"></span>
              </label>
            </div>

            <div class="settings_tab_title">${d.Kg}</div>
                <div class="setting-row">
                <label for="pauseBotEnable">${d.v}</label>
                <label class="toggle-switch">
                <input type="checkbox" id="pauseBotEnable">
                <span class="switch"></span>
                </label>
            </div>
            
            <div class="setting-row">
                <label for="pauseBot">${d.Lg}</label>
                <div class="switch-field3"> 
                <input type="number" id="pauseBot" placeholder="Minutes" value="${Math.round((localStorage.getItem("pauseBot.timeOut")-Date.now())/6E4)||0}">
                </div>
                </label>
            </div>

            <div class="settings_tab_title">UI Settings</div>

                <div class="setting-row">
                    <label for="disableBG">${d.Kj}</label>
                    <label class="toggle-switch">
                        <input type="checkbox" id="disableBG">
                        <span class="switch"></span>
                    </label>
                </div>

                <div class="setting-row">
                    <label for="disableLogMenu">${d.ge}</label>
                    <label class="toggle-switch">
                        <input type="checkbox" id="disableLogMenu">
                        <span class="switch"></span>
                    </label>
                </div>

                <div class="setting-row">
                    <label for="MoveButtons">${d.Lj}</label>
                    <label class="toggle-switch">
                        <input type="checkbox" id="MoveButtons">
                        <span class="switch"></span>
                    </label>
                </div>
                
            
    
            <div class="settings_tab_title">${d.pg}</div>
                <div class="setting-row">
                    <span class="span-new">${d.qg}</span>
                    <textarea id="messageInput" rows="4" cols="50" placeholder="${d.rg}" style="width: 350px; height: 50px;"></textarea>
                    <button class="awesome-button" id="messageButton">${d.tg}</button>
                    <button class="awesome-button"id="showPlayersButton">${d.ug}</button>
                    <button class="awesome-button" id="selectAllButton">${d.sg}</button>
                    <button class="awesome-button" id="unselectAllButton">${d.vg}</button>
                    <div id="messageStatus"></div>
                    <div id="playerList" style="display: none;"></div>
                    <div id="loadingContainer"></div>
                    <br>
                    ${d.fe}
                </div>        
            </div>

                  <div class="popup-box" id="Market">
                  <div class="settings_tab_title">Market Buy</div>
        
                    <span class="span-new">${d.$f}</span>

                    <div class="setting-row">
                      <label for="enableMarketSearch">${d.re}
                        <label class="toggle-switch">
                        <input type="checkbox" id="enableMarketSearch">
                        <span class="switch"></span>
                      </label>
                      </label>
                    </div>

                    <div class="setting-row">
                    <label>${d.ag}</label>
                    <span style="font-weight: normal">${d.bg}</span>
                    <input type="text" id="MarketSearchInterval" placeholder="Market Search Interval - Minutes" value="${localStorage.getItem("MarketSearchInterval")||""}">

                    </div>



                    <div class="setting-row">
                    <div class="setting-row">
                        <label for="marketOnlyFood">${d.Fg}
                        <label class="toggle-switch">
                        <input type="checkbox" id="marketOnlyFood">
                        <span class="switch"></span>
                        </label>
                        </label>
                    </div>
                      <span class="span-new">${d.Gg}</span>
                      
                      <label for="MaxTotalGold">${d.Hb} : </label><input type="number" id="MarketMaxFoodPrice" placeholder="${d.Hb}" value="${localStorage.getItem("MarketMaxFoodPrice")||""}">
                    
                      <label for="MaxPerFood">${d.Gb} : </label><input type="number" id="MarketMaxPerFoodPrice" placeholder="${d.Gb}" value="${localStorage.getItem("MarketMaxPerFoodPrice")||""}">

                      <label for="MinItemLevel">${d.Z} : </label><input type="number" id="MarketMinItemLevel" placeholder="${d.Z}" value="${localStorage.getItem("MarketMinItemLevel")||""}">
                    

                    </div>

                    <div class="setting-row">
                    <label>${d.nf}</label>
                      <input type="text" id="itemToBuy" placeholder="${d.lf}">
                    </div>

                    <div class="setting-row">
                      <input type="number" id="maxPrice" placeholder="${d.G}">
                    </div>

                    <div class="setting-row">
                    
                      <label>${d.pf}</label>
                      <select id="marketItemType">
                        <option value="WEAPON">${d.oa}</option>
                        <option value="SHIELD">${d.S}</option>
                        <option value="CHEST">${d.M}</option>
                        <option value="HELMET">${d.P}</option>
                        <option value="GLOVES">${d.O}</option>
                        <option value="SHOES">${d.N}</option>
                        <option value="RINGS">${d.na}</option>
                        <option value="AMULETS">${d.ka}</option>
                        <option value="USABLES">${d.Ia}</option></option>
                        <option value="BOOSTS">${d.tj}</option></option>
                        <option value="UPGRADES">${d.Na}</option></option>
                        <option value="RECIPES">${d.Ka}</option></option>
                        <option value="MERCENARY">${d.Ja}</option></option>
                        <option value="FORGINGGOODS">${d.qd}</option></option>
                        <option value="btools">${d.Ma}</option></option>
                        <option value="SCROLLS">${d.La}</option></option>
                      </select>

                      <label>${d.mf}</label>
                      <select id="rarity">
                        <option value="White">${d.pa}</option>
                        <option value="Green">${d.C}</option>
                        <option value="Blue">${d.B}</option>
                        <option value="Purple">${d.D}</option>
                        <option value="Orange">${d.H}</option>
                        <option value="Red">${d.R}</option>
                      </select>

                      <label>${d.ae}</label>
                      <select id="itemsoulbound">
                        <option value="BuySoulbound">${d.Gi}</option>
                        <option value="DontBuySoulbound">${d.Dg}</option>
                      </select>
                    </div>

                    <div class="setting-row">
                      <button class="awesome-button" id="addItemBtn">${d.I}</button>
                    </div>

                    <div class="setting-row">
                      <label for="itemList">${d.rf}</label>
                      <select id="itemList" size="10"></select>
                      <button class="awesome-button" id="removeItemBtn">${d.bh}</button>
                    </div>

                    <div class="setting-row">
                      <label for="usePacks">${d.qf}
                      <label class="toggle-switch">
                        <input type="checkbox" id="usePacks">
                        <span class="switch"></span>
                        </label>
                      </label>
                    </div>

                    <div class="setting-row">
                      <label for="MarketboughtItems">${d.Zd}</label>
                      <select id="MarketboughtItems" size="5"></select>
                      <button class="awesome-button" id="MarketremoveItemBtn">${d.de}</button>
                    </div>

                    <div class="setting-row">
                    <label for="MarketHoldGold">${d.Y}</label>
                    <input type="number" id="MarketHoldGold" min="0" value="${localStorage.getItem("MarketHoldGold")||0}">
                    </div>
                  
                    </div>   
                  </div>
                </div>
              </div>
            </div>

              `;
		document.getElementById("header_game").insertBefore(u, document.getElementById("header_game").children[0]);
		u = document.createElement("div");
		w = document.getElementById("wrapper_game").clientHeight;
		u.setAttribute("id", "overlayBack");
		u.setAttribute("style", `height: ${w}px; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 198;`);
		u.addEventListener("click", jc);
		document.getElementsByTagName("body")[0].appendChild(u);
		(function() {
			var t = localStorage.getItem("lastActiveTab");
			t ? (t =
				document.querySelector(`.popup-tab[data-target="${t}"]`)) && Tc(t) : (t = document.querySelector(".popup-tab")) && Tc(t)
		})();
		u = localStorage.getItem("license_remaining");
		null !== u && (u = (new Date(u)).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric"
		}), document.getElementById("kydtexp").textContent = u, u = localStorage.getItem("trlky_lcr"), null !== u && (document.getElementById("kydt").textContent = u));
		ni();
		(function() {
			document.querySelectorAll(".setting-row").forEach(function(t) {
				t.addEventListener("mouseenter",
					function() {
						var v = this.getAttribute("data-tooltip");
						if (v && "" !== v.trim()) {
							const z = document.createElement("div");
							z.className = "custom-tooltip";
							z.innerHTML = v;
							document.body.appendChild(z);
							v = this.getBoundingClientRect();
							z.style.left = v.left + v.width / 2 - z.offsetWidth / 2 + "px";
							z.style.top = v.top - z.offsetHeight + "px";
							this.um = z
						}
					});
				t.addEventListener("mouseleave", function() {
					this.um && (document.body.removeChild(this.um), this.um = null)
				})
			})
		})();
		document.querySelectorAll(".popup-tab").forEach(t => {
			t.addEventListener("click",
				() => {
					Tc(t);
					localStorage.setItem("lastActiveTab", t.dataset.target)
				})
		});
		const A = document.querySelectorAll(".popup-tab"),
			D = document.querySelectorAll(".popup-box"),
			B = document.querySelector(`#${document.querySelector(".popup-tab.active").dataset.target}`);
		B.classList.add("active");
		D.forEach(t => {
			t !== B && (t.style.display = "none")
		});
		A.forEach(t => {
			t.addEventListener("click", () => {
				A.forEach(v => v.classList.remove("active"));
				t.classList.add("active");
				D.forEach(v => {
					v.style.display = "none"
				});
				document.querySelector(`#${t.dataset.target}`).style.display =
					"block"
			})
		});
		"GB PL ES TR FR HG BR".split(" ").forEach(t => {
			$(`#language${t}`).click(() => {
				localStorage.setItem("settings.language", t);
				switch (t) {
					case "EN":
						d = {
							...Jh
						};
						break;
					case "PL":
						d = {
							...Kh
						};
						break;
					case "ES":
						d = {
							...Lh
						};
						break;
					case "TR":
						d = {
							...Mh
						};
						break;
					case "FR":
						d = {
							...Nh
						};
						break;
					case "HG":
						d = {
							...Oh
						};
						break;
					case "BR":
						d = {
							...Ph
						};
						break;
					default:
						d = {
							...Jh
						}
				}
				jc();
				kc()
			})
		});
		b("#do_expedition", c, !0, !1);
		b("#do_dungeon", e, !0, !1);
		b("#do_arena", h, !0, !1);
		b("#do_circus", k, !0, !1);
		b("#do_quests", g, !0, !1);
		b("#do_event_expedition",
			l, !0, !1);
		[0, 1, 2, 3].forEach(t => {
			$(`#set_monster_id_${t}`).click(() => {
				var v = `${t}`;
				Uc = v;
				localStorage.setItem("monsterId", v)
			})
		});
		["normal", "advanced"].forEach(t => {
			$(`#set_dungeon_difficulty_${t}`).click(() => {
				Jb = t;
				localStorage.setItem("dungeonDifficulty", t);
				m(t)
			})
		});
		(u = localStorage.getItem("dungeonDifficulty")) && m(u);
		"combat arena circus expedition dungeon items".split(" ").forEach(t => {
			$(`#do_${t}_quests`).click(() => {
				Oa[t] = !Oa[t];
				localStorage.setItem("questTypes", JSON.stringify(Oa));
				jc();
				kc()
			})
		});
		b("#do_auto_auction",
			q, !0, !1);
		b("#do_kasa", n, !0, !1);
		$(document).ready(function() {
			function t(y) {
				var J = y.split(". "),
					P = "<ol>";
				J.forEach(function(Q, S) {
					"" !== Q.trim() && (S !== J.length - 1 || Q.endsWith(".") || (Q += "."), P += "<li>" + Q + "</li>")
				});
				return P += "</ol>"
			}

			function v(y) {
				const J = {
					"guild-market-timer": "GuildMarket",
					"smelting-timer": "Smelting",
					"smelting-timer-nogold": "SmeltingNoGold",
					"smelting-timer-noitem": "SmeltingNoItem",
					"repair-timer": "Repair",
					"auction-hold-timer": "AuctionHoldGold",
					"arena-timer": "Arena",
					"circus-turma-timer": "CircusTurma",
					"training-timer": "Training",
					"reset-expired-timer": "ResetExpired",
					"store-forge-timer": "StoreForge",
					"reset-auction-timer": "AuctionCheck",
					"reset-search-timer": "SearchTimer",
					"reset-guilddonate-timer": "GuildDonate",
					"reset-guildattack-timer": "guildBattleEnable",
					"reset-buff-timer": "BuffTimer"
				};
				return J[y] ? J[y] : y.replace(/-([a-z])/g, function(P) {
					return P[1].toUpperCase()
				}).replace("-timer", "")
			}

			function z() {
				Za.forEach(y => {
					const J = document.getElementById(`${y}Priority`);
					(y = Xa[y]) ? (J.textContent = `${d.Ba}: ${y}`,
						J.dataset.priority = y) : (J.textContent = `${d.Sb}`, J.dataset.priority = "None")
				})
			}

			function C() {
				sb = Za.map(y => {
					const J = document.getElementById(`${y}Count`),
						P = document.getElementById(`${y}Enable`);
					return {
						stat: y,
						count: J ? parseInt(J.value) : 0,
						priority: null !== Xa[y] ? Xa[y] : "None",
						$m: P ? P.checked : !1
					}
				});
				localStorage.setItem("statSettings", JSON.stringify(sb))
			}

			function I() {
				Za.forEach(y => {
					document.getElementById(`${y}Priority`).addEventListener("click", () => {
						let J = Xa[y],
							P = J ? J + 1 : 1;
						P > Za.length && (P = 1);
						let Q = null;
						for (let S of Za)
							if (S !==
								y && Xa[S] === P) {
								Q = S;
								break
							} Q && (Xa[Q] = J || null);
						Xa[y] = P;
						z();
						C()
					})
				});
				document.querySelectorAll(".stat-count").forEach(y => {
					y.addEventListener("change", C)
				});
				Za.forEach(y => {
					document.getElementById(`${y}Enable`).addEventListener("change", C)
				})
			}

			function H(y, J) {
				JSON.parse(localStorage.getItem(J) || "[]").forEach(P => K(P, y, J))
			}

			function K(y, J, P) {
				const Q = document.createElement("div");
				Q.className = "keyword-item";
				var S = document.createElement("span");
				S.textContent = y;
				Q.appendChild(S);
				S = document.createElement("span");
				S.className =
					"remove-keyword";
				S.textContent = "X";
				S.addEventListener("click", function() {
					Q.remove();
					let ka = JSON.parse(localStorage.getItem(P) || "[]");
					const W = ka.indexOf(y); - 1 < W && (ka.splice(W, 1), localStorage.setItem(P, JSON.stringify(ka)))
				});
				Q.appendChild(S);
				J.appendChild(Q)
			}

			function L(y, J) {
				const P = JSON.parse(localStorage.getItem(J) || "[]");
				P.push(y);
				localStorage.setItem(J, JSON.stringify(P))
			}

			function O(y, J, P) {
				const Q = document.createElement("li");
				Q.textContent = y;
				Q.style.padding = "10px";
				Q.style.border = "1px solid #ccc";
				Q.style.borderColor = "#cea429";
				Q.style.borderRadius = "5px";
				Q.style.marginBottom = "5px";
				Q.style.display = "flex";
				Q.style.justifyContent = "space-between";
				const S = document.createElement("button");
				S.textContent = "X";
				S.style.textAlign = "center";
				S.addEventListener("click", () => {
					Q.remove();
					const ka = (JSON.parse(localStorage.getItem(P)) || []).filter(W => !(W[0] === y[0] && W[1] === y[1]));
					localStorage.setItem(P, JSON.stringify(ka))
				});
				Q.appendChild(S);
				document.getElementById(J).appendChild(Q)
			}

			function Y() {
				jb = jb.map(y => {
					y.Gm = !1;
					y.Bm = null;
					return y
				})
			}

			function ea() {
				document.getElementById("startSearchButton").innerText = "Start Search";
				nc = !1
			}

			function ca() {
				const y = document.getElementById("clothCount");
				var J = parseInt(y.value, 10);
				isNaN(J) && (J = 0);
				--J;
				0 >= J && (J = 0);
				return y.value = J
			}

			function la() {
				const y = document.getElementById("itemsList");
				y.innerHTML = "";
				jb.forEach((J, P) => {
					const Q = document.createElement("div");
					Q.style.display = "flex";
					Q.style.flexDirection = "column";
					Q.style.border = "1px solid #d2b97f";
					Q.style.padding = "10px";
					Q.style.marginBottom =
						"10px";
					Q.style.borderRadius = "5px";
					Q.style.backgroundColor = "#faf2dd";
					var S = document.createElement("div");
					S.style.display = "flex";
					S.style.justifyContent = "space-between";
					S.style.alignItems = "center";
					const ka = document.createElement("span");
					ka.innerHTML = `<strong>${J.name}</strong> (${J.qualityName}) - Level: [${J.qn}]`;
					ka.style.color = "#5d432c";
					const W = document.createElement("button");
					W.innerText = "Remove";
					W.style.backgroundColor = "#af552e";
					W.style.color = "white";
					W.style.border = "none";
					W.style.padding = "5px 10px";
					W.style.cursor = "pointer";
					W.style.borderRadius = "3px";
					W.onclick = () => {
						jb.splice(P, 1);
						la();
						oa()
					};
					S.appendChild(ka);
					S.appendChild(W);
					Q.appendChild(S);
					J.em && J.rm && (S = document.createElement("div"), S.style.marginTop = "5px", S.style.fontStyle = "italic", S.style.color = "#7d5b3e", S.innerText = `Stat: ${J.em.toUpperCase()} - Value: ${J.rm}`, Q.appendChild(S));
					y.appendChild(Q)
				})
			}

			function oa() {
				localStorage.setItem("itemsToSearch", JSON.stringify(jb))
			}

			function ba(y, J) {
				const P = document.getElementById("foundItemsContainer");
				P.style.display = "flex";
				P.style.flexWrap = "wrap";
				P.style.justifyContent = "center";
				P.style.alignItems = "center";
				P.style.Ep = "10px";
				const Q = document.createElement("div");
				Q.className = "notification-item";
				Q.style.border = "1px solid #d2b97f";
				Q.style.borderRadius = "4px";
				Q.style.padding = "10px";
				Q.style.margin = "5px";
				Q.style.textAlign = "center";
				Q.style.backgroundColor = "#faf2dd";
				Q.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
				Q.style.boxSizing = "border-box";
				Q.style.flex = "0 1 calc(20% - 10px)";
				Q.style.display = "flex";
				Q.style.flexDirection = "column";
				Q.style.alignItems = "center";
				Q.style.transition = "all 0.3s ease-in-out";
				const S = document.createElement("span"),
					ka = document.createElement("span");
				switch (Number(y.Bm.getAttribute("data-quality"))) {
					case 0:
						ka.style.color = "green";
						break;
					case 1:
						ka.style.color = "blue";
						break;
					case 2:
						ka.style.color = "purple";
						break;
					case 3:
						ka.style.color = "orange";
						break;
					case 4:
						ka.style.color = "red";
						break;
					default:
						ka.style.color = "#333"
				}
				ka.innerText = y.name;
				ka.style.fontWeight = "bold";
				ka.style.fontSize = "12px";
				ka.style.marginBottom = "5px";
				S.appendChild(ka);
				const W = document.createElement("div");
				W.style.marginTop = "5px";
				W.style.padding = "10px";
				W.style.borderRadius = "5px";
				W.style.display = "flex";
				W.style.justifyContent = "center";
				W.style.alignItems = "center";
				W.style.transition = "transform 0.3s ease-in-out";
				W.onmouseover = () => {
					W.style.transform = "scale(1.1)"
				};
				W.onmouseout = () => {
					W.style.transform = "scale(1)"
				};
				y = y.Bm.cloneNode(!0);
				y.style.position = "static";
				y.style.transform = "none";
				y.style.margin = "0";
				W.appendChild(y);
				y = document.createElement("a");
				y.href = J;
				y.style.textDecoration = "none";
				y.style.cursor = "pointer";
				y.onmouseover = () => {
					ka.style.textDecoration = "underline"
				};
				y.onmouseout = () => {
					ka.style.textDecoration = "none"
				};
				y.appendChild(S);
				y.appendChild(W);
				Q.appendChild(y);
				P.appendChild(Q);
				oc.style.display = "block"
			}
			async function pa() {
				var y = !1;
				if (!nc) return !1;
				const J = await Nf();
				var P = jb.filter(W => !W.Gm);
				for (let W of P)
					for (const Vc of J) {
						P = Vc.querySelectorAll("#shop .ui-draggable");
						for (const Ta of P) {
							var Q = JSON.parse(Ta.getAttribute("data-tooltip").replace(/&quot;/g,
									'"')),
								S = parseInt(xb(Ta).split("-")[0], 10);
							P = 15 == S ? parseInt(Ta.getAttribute("data-tooltip").split(",")[5].match(/\d+/)[0], 10) : 0;
							let pi = 15 == S ? parseInt(Ta.getAttribute("data-tooltip").split(",")[7].match(/\d+/)[0], 10) : 0,
								qi = 15 == S ? parseInt(Ta.getAttribute("data-tooltip").split(",")[9].match(/\d+/)[0], 10) : 0,
								ri = 15 == S ? parseInt(Ta.getAttribute("data-tooltip").split(",")[11].match(/\d+/)[0], 10) : 0,
								si = 15 == S ? parseInt(Ta.getAttribute("data-tooltip").split(",")[13].match(/\d+/)[0], 10) : 0;
							S = 15 == S ? parseInt(Ta.getAttribute("data-tooltip").split(",")[15].match(/\d+/)[0],
								10) : 0;
							var ka = Ta.getAttribute("data-quality");
							Q = Q[0][0][0];
							const ti = Ta.getAttribute("data-level");
							if (Number(ti) >= Number(W.qn) && Q.toLowerCase().includes(W.name.toLowerCase()) && (ka >= W.quality || !ka && "0" == W.quality)) {
								if (W.em && W.rm && "none" !== W.em && (ka = !1, (P = {
										str: P,
										dex: pi,
										agi: qi,
										cot: ri,
										chr: si,
										"int": S
									} [W.em]) && P >= W.rm && (ka = !0), !ka)) continue;
								W.Bm = Ta.cloneNode(!0);
								ba(W, Vc.Nm || Vc.querySelector("a.shopLink").href);
								y = W.Gm = !0
							}
						}
					}
				P = jb.filter(W => !W.Gm);
				if (0 === P.length || y) return ea(), !0;
				y = ca();
				Pa();
				if (0 >= y) return ea(),
					!1;
				await xa();
				return pa()
			}
			async function xa() {
				var y = new URL(window.location.href);
				const J = y.origin;
				y = y.searchParams.get("sh") || "";
				await fetch(`${J}/game/index.php?mod=inventory&sub=2&subsub=0&sh=${y}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: new URLSearchParams({
						bestechen: "New goods"
					})
				})
			}

			function Pa() {
				var y = parseInt(document.getElementById("clothCount").getAttribute("data-total"), 10);
				const J = parseInt(document.getElementById("clothCount").value, 10);
				y = (y - J) / y *
					100;
				document.getElementById("progressBarInner").style.width = `${isNaN(y)?100:y}%`
			}

			function zb() {
				const y = [...Wc].filter(J => J.checked).map(J => J.value);
				localStorage.setItem("equipmentSelectionSmelt", JSON.stringify(y))
			}

			function Kb() {
				const y = [...Xc].filter(J => J.checked).map(J => J.value);
				localStorage.setItem("equipmentSelection", JSON.stringify(y))
			}

			function Ab() {
				localStorage.setItem("timeConditions", JSON.stringify(Lb))
			}

			function Of(y = {}) {
				const J = document.createElement("div");
				J.classList.add("condition-row");
				J.innerHTML = `
                    <input type="time" class="awesome-button start-time" value="${y.start||""}" required> to
                    <input type="time" class="awesome-button end-time" value="${y.end||""}" required>
                    <br>
                    <select class="bot-action">
                        <option value="start" ${"start"===y.action?"selected":""}>Start Bot</option>
                        <option value="stop" ${"stop"===y.action?"selected":""}>Stop Bot</option>
                    </select>
                    <button class="awesome-button remove-condition">Remove</button>
                `;
				Ab();
				J.querySelector(".remove-condition").addEventListener("click", () => {
					Pf.removeChild(J);
					Lb = Lb.filter(P => P !== y);
					Ab()
				});
				J.querySelector(".start-time").addEventListener("change", P => {
					y.start = P.target.value;
					Ab()
				});
				J.querySelector(".end-time").addEventListener("change", P => {
					y.end = P.target.value;
					Ab()
				});
				J.querySelector(".bot-action").addEventListener("change", P => {
					y.action = P.target.value;
					Ab()
				});
				Pf.appendChild(J)
			}

			function Qf() {
				document.getElementById("mercenarySearchOptions").style.display =
					pc.checked ? "block" : "none"
			}

			function ui(y) {
				document.querySelectorAll('#itemsToReset input[type="checkbox"]').forEach(J => {
					J.checked = y
				});
				Ka()
			}

			function Yc() {
				localStorage.setItem("marketItems", JSON.stringify(kb));
				Zc.innerHTML = "";
				Rf.innerHTML = "";
				for (var y of Mb) {
					var J = document.createElement("option");
					J.textContent = y;
					Rf.appendChild(J)
				}
				for (y = 0; y < kb.length; y++) J = document.createElement("option"), J.value = y, J.text = kb[y].mn + " (Rarity: " + kb[y].om + ", Max price: " + kb[y].maxPrice + " " + kb[y].Soulbound + ")", Zc.appendChild(J)
			}

			function Sf(y, J, P) {
				J[y.id] && y.classList.add("active");
				y.addEventListener("click", function(Q) {
					Q.preventDefault();
					this.classList.contains("active") ? (this.classList.remove("active"), J[this.id] = !1) : (this.classList.add("active"), J[this.id] = !0);
					localStorage.setItem(P, JSON.stringify(J))
				})
			}

			function Tf(y, J, P, Q) {
				P.forEach(S => {
					S in J || (J[S] = !1)
				});
				localStorage.setItem(Q, JSON.stringify(J))
			}

			function Uf() {
				const y = qc.checked;
				vi.style.display = y ? "block" : "none";
				wi.style.display = y ? "block" : "none"
			}
			const xi = document.getElementById("doExpedition"),
				yi = document.getElementById("doDungeon"),
				zi = document.getElementById("doArena"),
				Ai = document.getElementById("doCircus"),
				Bi = document.getElementById("doQuests"),
				Ci = document.getElementById("doEventExpedition"),
				Di = document.getElementById("activateAutoBid"),
				Ei = document.getElementById("doKasa"),
				rc = document.querySelector("#healPercentage"),
				$c = document.querySelector("#HealClothToggle"),
				Vf = document.querySelector("#hellEnterHP"),
				Wf = document.querySelector("#HellHealHP"),
				ad = document.querySelector("#HealRubyToggle"),
				bd = document.querySelector("#storeResource"),
				cd = document.querySelector("#HighlightUnderworldItems");
			rc.value = localStorage.getItem("healPercentage") || 25;
			$c.checked = "true" === localStorage.getItem("HealClothToggle") || !1;
			ad.checked = "true" === localStorage.getItem("HealRubyToggle") || !1;
			bd.checked = "true" === localStorage.getItem("storeResource") || !1;
			cd.checked = "true" === localStorage.getItem("HighlightUnderworldItems") || !1;
			const Xf = document.getElementById("minimumGoldAmount");
			Xf.addEventListener("change", () => {
				localStorage.setItem("minimumGoldAmount",
					Xf.value)
			});
			const Yf = "true" === localStorage.getItem("useGodPowers");
			document.getElementById("useGodPowers").checked = Yf;
			document.getElementById("godPowersSection").style.display = Yf ? "block" : "none";
			const Fi = JSON.parse(localStorage.getItem("GodPowersHell")) || [];
			document.querySelectorAll(".god-power-checkbox").forEach(y => {
				y.checked = Fi.includes(y.value)
			});
			const Gi = "true" === localStorage.getItem("useWeaponBuff");
			document.getElementById("weaponBuff").checked = Gi;
			const Hi = JSON.parse(localStorage.getItem("ArmorBuffsHell")) || [];
			document.querySelectorAll(".armor-checkbox").forEach(y => {
				y.checked = Hi.includes(y.value)
			});
			document.getElementById("useGodPowers").addEventListener("change", function() {
				const y = this.checked;
				localStorage.setItem("useGodPowers", y);
				document.getElementById("godPowersSection").style.display = y ? "block" : "none"
			});
			document.querySelectorAll(".god-power-checkbox").forEach(y => {
				y.addEventListener("change", function() {
					const J = Array.from(document.querySelectorAll(".god-power-checkbox:checked")).map(P => P.value);
					localStorage.setItem("GodPowersHell",
						JSON.stringify(J))
				})
			});
			document.getElementById("weaponBuff").addEventListener("change", function() {
				localStorage.setItem("useWeaponBuff", this.checked)
			});
			document.querySelectorAll(".armor-checkbox").forEach(y => {
				y.addEventListener("change", function() {
					const J = Array.from(document.querySelectorAll(".armor-checkbox:checked")).map(P => P.value);
					localStorage.setItem("ArmorBuffsHell", JSON.stringify(J))
				})
			});
			const Zf = document.getElementById("autoSmeltInfo"),
				Bb = document.getElementById("popupSmelt");
			Zf.addEventListener("mouseenter",
				function() {
					Bb.style.display = "block";
					const y = document.querySelector(".popup-menu").getBoundingClientRect();
					Bb.style.position = "fixed";
					Bb.style.width = "350px";
					Bb.style.left = `${y.right+10}px`;
					Bb.style.top = `${y.top}px`
				});
			Zf.addEventListener("mouseleave", function() {
				Bb.style.display = "none"
			});
			var dd = document.getElementById("tabA"),
				ed = document.getElementById("tabB"),
				$f = document.getElementById("contentA"),
				ag = document.getElementById("contentB"),
				fd = document.getElementById("tabACircus"),
				gd = document.getElementById("tabBCircus"),
				bg = document.getElementById("contentACircus"),
				cg = document.getElementById("contentBCircus");
			dd.addEventListener("click", function() {
				$f.style.display = "block";
				ag.style.display = "none";
				dd.classList.add("active");
				ed.classList.remove("active")
			});
			ed.addEventListener("click", function() {
				ag.style.display = "block";
				$f.style.display = "none";
				ed.classList.add("active");
				dd.classList.remove("active")
			});
			fd.addEventListener("click", function() {
				bg.style.display = "block";
				cg.style.display = "none";
				fd.classList.add("active");
				gd.classList.remove("active")
			});
			gd.addEventListener("click", function() {
				cg.style.display = "block";
				bg.style.display = "none";
				gd.classList.add("active");
				fd.classList.remove("active")
			});
			const Ii = t(d.ec),
				Ji = t(d.Nb);
			document.querySelector(".instructions .span-new").innerHTML = Ii;
			document.querySelector(".instructionsReset .span-new").innerHTML = Ji;
			const hd = document.getElementById("announcement"),
				jd = localStorage.getItem("latestAnnouncement");
			jd && "" !== jd ? (hd.style.display = "block", hd.innerHTML = jd) : hd.style.display = "none";
			const Ki = [{
				id: "Health",
				buffs: ["Gingko", "Taigaroot", "Hawthorn"]
			}, {
				id: "Strength",
				buffs: ["Flask", "Ampulla", "Flacon", "Bottle"]
			}, {
				id: "Dexterity",
				buffs: ["Flask", "Ampulla", "Flacon", "Bottle"]
			}, {
				id: "Agility",
				buffs: ["Flask", "Ampulla", "Flacon", "Bottle"]
			}, {
				id: "Constitution",
				buffs: ["Flask", "Ampulla", "Flacon", "Bottle"]
			}, {
				id: "Charisma",
				buffs: ["Flask", "Ampulla", "Flacon", "Bottle"]
			}, {
				id: "Intelligence",
				buffs: ["Flask", "Ampulla", "Flacon", "Bottle"]
			}];
			(function() {
				const y = JSON.parse(localStorage.getItem("buffSelections")) || {};
				Ki.forEach(J => {
					y[J.id] =
						y[J.id] || [];
					J.buffs.forEach((P, Q) => {
						const S = document.getElementById(`${J.id}Buff${Q+1}`);
						S.checked = y[J.id].includes(P);
						S.addEventListener("change", () => {
							S.checked ? y[J.id].push(P) : y[J.id] = y[J.id].filter(ka => ka !== P);
							localStorage.setItem("buffSelections", JSON.stringify(y))
						})
					})
				})
			})();
			let kd = document.getElementById("BuffsEnable");
			kd.checked = "true" === localStorage.getItem("BuffsEnable");
			kd.addEventListener("change", () => {
				localStorage.setItem("BuffsEnable", kd.checked)
			});
			let ld = document.getElementById("BuffUnderworldOnly");
			ld.checked = "true" === localStorage.getItem("BuffUnderworldOnly");
			ld.addEventListener("change", () => {
				localStorage.setItem("BuffUnderworldOnly", ld.checked)
			});
			document.querySelectorAll(".timer-input").forEach(y => {
				y.addEventListener("change", function() {
					var J = parseInt(this.min, 10);
					let P = parseInt(this.value, 10);
					P < J && (this.value = P = J);
					J = JSON.parse(localStorage.getItem("Timers")) || {};
					const Q = v(this.id);
					J[Q] = P;
					localStorage.setItem("Timers", JSON.stringify(J))
				})
			});
			const Za = "Strength Dexterity Agility Constitution Charisma Intelligence".split(" ");
			let Xa = {},
				sb = JSON.parse(localStorage.getItem("statSettings")) || [];
			Za.forEach(y => {
				const J = sb.find(P => P.stat === y);
				Xa[y] = J ? "None" !== J.priority ? parseInt(J.priority) : null : null
			});
			(function() {
				const y = document.querySelector("#statTable tbody");
				y.innerHTML = "";
				Za.forEach(J => {
					const P = document.createElement("tr");
					var Q = document.createElement("td"),
						S = document.createElement("input");
					S.type = "checkbox";
					S.id = `${J}Enable`;
					S.checked = sb.find(W => W.stat === J)?.$m || !1;
					Q.appendChild(S);
					P.appendChild(Q);
					Q = document.createElement("td");
					S = document.createElement("label");
					S.htmlFor = `${J}$`;
					S.textContent = d[J];
					Q.appendChild(S);
					P.appendChild(Q);
					Q = document.createElement("td");
					S = document.createElement("input");
					S.type = "number";
					S.min = "0";
					S.id = `${J}Count`;
					S.value = sb.find(W => W.stat === J)?.count || 0;
					S.classList.add("stat-count");
					Q.appendChild(S);
					P.appendChild(Q);
					Q = document.createElement("td");
					S = document.createElement("button");
					S.type = "button";
					S.id = `${J}Priority`;
					S.classList.add("priority-btn");
					S.dataset.stat = J;
					const ka = Xa[J];
					S.textContent = ka ?
						`${d.Ba}: ${ka}` : `${d.Sb}`;
					S.dataset.priority = ka || "None";
					Q.appendChild(S);
					P.appendChild(Q);
					y.appendChild(P)
				});
				I()
			})();
			(function() {
				sb = JSON.parse(localStorage.getItem("statSettings")) || [];
				Za.forEach(y => {
					const J = sb.find(P => P.stat === y);
					Xa[y] = J ? "None" !== J.priority ? parseInt(J.priority) : null : null
				});
				z()
			})();
			Array.from(document.getElementsByClassName("stat-count")).forEach(y => {
				y.addEventListener("change", () => {
					C()
				})
			});
			document.getElementById("clear_next_event_expedition_time").addEventListener("click", function() {
				localStorage.setItem("eventPoints_",
					16);
				alert("Done!")
			});
			let $a = localStorage.getItem("workbenchItem");
			$a = $a ? JSON.parse($a) : {};
			$a.selectedItem && $a.selectedItem.item ? document.getElementById("currentWorkbenchItem").textContent = $a.selectedItem.item.name : document.getElementById("currentWorkbenchItem").textContent = "No item";
			document.getElementById("clear_repair").addEventListener("click", function() {
				$a.selectedItem && ($a.selectedItem = {}, Object.assign($a.selectedItem, {
						selectedItem: !1
					}), localStorage.removeItem("workbenchItem"), localStorage.removeItem("activeItems"),
					localStorage.removeItem("activeItemsGladiator"), localStorage.removeItem("activeItemsMercenary"), document.getElementById("currentWorkbenchItem").textContent = "No item")
			});
			document.getElementById("ClearAttackList").addEventListener("click", function() {
				localStorage.setItem("autoAttackList", JSON.stringify([]));
				localStorage.setItem("playerTimeouts", JSON.stringify([]));
				window.location.reload()
			});
			document.getElementById("ClearOtherAttackList").addEventListener("click", function() {
				localStorage.setItem("autoAttackServerList",
					JSON.stringify([]));
				localStorage.setItem("playerTimeouts", JSON.stringify([]));
				window.location.reload()
			});
			document.getElementById("ClearAvoidList").addEventListener("click", function() {
				localStorage.setItem("avoidAttackList", JSON.stringify([]));
				window.location.reload()
			});
			document.getElementById("ClearCircusAttackList").addEventListener("click", function() {
				localStorage.setItem("autoAttackCircusList", JSON.stringify([]));
				localStorage.setItem("circusPlayerTimeouts", JSON.stringify([]));
				window.location.reload()
			});
			document.getElementById("ClearOtherCircusAttackList").addEventListener("click", function() {
				localStorage.setItem("autoAttackCircusServerList", JSON.stringify([]));
				localStorage.setItem("circusPlayerTimeouts", JSON.stringify([]));
				window.location.reload()
			});
			document.getElementById("ClearCircusAvoidList").addEventListener("click", function() {
				localStorage.setItem("avoidAttackCircusList", JSON.stringify([]));
				window.location.reload()
			});
			const dg = document.getElementById("keywordAcceptInput"),
				Li = document.getElementById("addKeywordAcceptBtn"),
				eg = document.getElementById("keywordAcceptList"),
				sc = document.getElementById("underworldKeywordSection"),
				fg = document.getElementById("underworldKeywordInput"),
				Mi = document.getElementById("addUnderworldKeywordBtn"),
				gg = document.getElementById("underworldKeywordList");
			let md = document.getElementById("skipTimeQuests");
			md.checked = "true" === localStorage.getItem("skipTimeQuests");
			md.addEventListener("change", () => {
				localStorage.setItem("skipTimeQuests", md.checked)
			});
			let nd = document.getElementById("skipTimeCircusQuests");
			nd.checked = "true" === localStorage.getItem("skipTimeCircusQuests");
			nd.addEventListener("change", () => {
				localStorage.setItem("skipTimeCircusQuests", nd.checked)
			});
			let od = document.getElementById("skipTimeOtherQuests");
			od.checked = "true" === localStorage.getItem("skipTimeOtherQuests");
			od.addEventListener("change", () => {
				localStorage.setItem("skipTimeOtherQuests", od.checked)
			});
			"Mercury Apollo Diana Minerva Vulcan Mars".split(" ").forEach(y => {
				let J = document.getElementById(`questType${y}`);
				J.checked = "true" === localStorage.getItem(`questType${y}`);
				J.addEventListener("change", () => {
					localStorage.setItem(`questType${y}`, J.checked)
				})
			});
			let Nb = document.getElementById("UnderworldQuests");
			Nb.checked = "true" === localStorage.getItem("UnderworldQuests");
			Nb.addEventListener("change", () => {
				localStorage.setItem("UnderworldQuests", Nb.checked);
				Nb.checked || "true" === localStorage.getItem("UnderworldQuests") ? sc.style.display = "block" : sc.style.display = "none"
			});
			Nb.checked || "true" === localStorage.getItem("UnderworldQuests") ? sc.style.display = "block" : sc.style.display = "none";
			let pd = document.getElementById("acceptnotfilter");
			pd.checked = "true" === localStorage.getItem("acceptnotfilter");
			pd.addEventListener("change", () => {
				localStorage.setItem("acceptnotfilter", pd.checked)
			});
			const qd = document.getElementById("keywordInput"),
				Ni = document.getElementById("addKeywordBtn"),
				hg = document.getElementById("keywordList"),
				Oi = document.getElementById("keywordGuildInput"),
				Pi = document.getElementById("addGuildKeywordBtn"),
				ig = document.getElementById("keywordGuildList");
			H(ig, "guildKeywords");
			Pi.addEventListener("click",
				function() {
					const y = Oi.value.trim();
					"" !== y && (K(y, ig, "guildKeywords"), L(y, "guildKeywords"), qd.value = "")
				});
			H(hg, "questKeywords");
			H(gg, "underworldQuestKeywords");
			Ni.addEventListener("click", function() {
				const y = qd.value.trim();
				"" !== y && (K(y, hg, "questKeywords"), L(y, "questKeywords"), qd.value = "")
			});
			H(eg, "acceptQuestKeywords");
			Li.addEventListener("click", function() {
				const y = dg.value.trim();
				"" !== y && (K(y, eg, "acceptQuestKeywords"), L(y, "acceptQuestKeywords"), dg.value = "")
			});
			Mi.addEventListener("click", function() {
				const y =
					fg.value.trim();
				"" !== y && (K(y, gg, "underworldQuestKeywords"), L(y, "underworldQuestKeywords"), fg.value = "")
			});
			let rd = document.getElementById("renewEvent");
			rd.checked = "true" === localStorage.getItem("renewEvent");
			rd.addEventListener("change", () => {
				localStorage.setItem("renewEvent", rd.checked)
			});
			let sd = document.getElementById("throwDice");
			sd.checked = "true" === localStorage.getItem("throwDice");
			sd.addEventListener("change", () => {
				localStorage.setItem("throwDice", sd.checked)
			});
			let td = document.getElementById("useCostume");
			td.checked = "true" === localStorage.getItem("useCostume");
			td.addEventListener("change", () => {
				localStorage.setItem("useCostume", td.checked)
			});
			let Ob = document.getElementById("wearUnderworld"),
				jg = document.getElementById("costumeUnderworldWrapper");
			Ob.checked = "true" === localStorage.getItem("wearUnderworld");
			jg.style.display = Ob.checked ? "block" : "none";
			Ob.addEventListener("change", () => {
				localStorage.setItem("wearUnderworld", Ob.checked);
				jg.style.display = Ob.checked ? "block" : "none"
			});
			document.getElementById("costumeUnderworld").addEventListener("change",
				function() {
					localStorage.setItem("costumeUnderworld", this.value)
				});
			const Qi = document.getElementById("costumeUnderworld"),
				kg = localStorage.getItem("costumeUnderworld");
			null !== kg && (Qi.value = kg);
			const Ri = document.getElementById("costumeBasic"),
				lg = localStorage.getItem("costumeBasic");
			document.getElementById("costumeBasic").addEventListener("change", function() {
				localStorage.setItem("costumeBasic", this.value)
			});
			null !== lg && (Ri.value = lg);
			document.getElementById("costumeDungeon").addEventListener("change", function() {
				localStorage.setItem("costumeDungeon",
					this.value)
			});
			const Si = document.getElementById("costumeDungeon"),
				mg = localStorage.getItem("costumeDungeon");
			null !== mg && (Si.value = mg);
			const Ti = document.getElementById("search_input"),
				Ui = document.getElementById("search_reset"),
				Vi = document.getElementById("search_button");
			let tc = JSON.parse(localStorage.getItem("searchTerms") || "[]");
			tc.forEach(y => {
				O(y, "search_list", "searchTerms")
			});
			Vi.addEventListener("click", function() {
				const y = Ti.value.trim();
				"" === y || tc.includes(y) || (tc.push(y), localStorage.setItem("searchTerms",
					JSON.stringify(tc)), O(y, "search_list", "searchTerms"))
			});
			const ud = document.querySelector(".equipment-search-selection");
			ud.addEventListener("change", () => {
				const y = Array.from(ud.querySelectorAll(".equipment-search-option:checked")).map(J => J.value);
				localStorage.setItem("SearchTypes", JSON.stringify(y))
			});
			JSON.parse(localStorage.getItem("SearchTypes") || "[]").forEach(y => {
				if (y = ud.querySelector(`.equipment-search-option[value="${y}"]`)) y.checked = !0
			});
			let jb = JSON.parse(localStorage.getItem("itemsToSearch")) || [];
			document.getElementById("addItemButton").addEventListener("click", function() {
				const y = document.getElementById("newItem").value,
					J = document.getElementById("itemQuality").value,
					P = document.getElementById("newItemLevel").value,
					Q = document.getElementById("shopitemstat").value,
					S = document.getElementById("statValue").value;
				jb.push({
					name: y,
					quality: J,
					qn: P,
					qualityName: Wi[J],
					em: "none" !== Q ? Q : null,
					rm: "none" !== Q ? S : null
				});
				la();
				oa()
			});
			document.getElementById("startSearchButton").addEventListener("click", async function() {
				nc = !0;
				oc.style.display = "none";
				document.getElementById("clothCount").setAttribute("data-total", document.getElementById("clothCount").value);
				document.getElementById("startSearchButton").innerText = "Searching...";
				await pa()
			});
			document.getElementById("stopSearchButton").addEventListener("click", ea);
			document.getElementById("shopitemstat").addEventListener("change", function() {
				document.getElementById("statValueRow").style.display = "none" === this.value ? "none" : "block"
			});
			const oc = document.getElementById("skipSearchButton");
			oc.addEventListener("click", async function() {
				const y = document.getElementById("foundItemsContainer");
				for (; y.firstChild;) y.removeChild(y.firstChild);
				Y();
				nc = !0;
				oc.style.display = "none";
				ca();
				Pa();
				await xa();
				await pa()
			});
			let nc = !0;
			const Wi = {
				0: "Green",
				1: "Blue",
				2: "Purple",
				3: "Orange",
				4: "Red"
			};
			la();
			ki();
			const Wc = document.querySelectorAll(".equipment-option-smelt");
			Wc.forEach(y => {
				y.addEventListener("change", zb)
			});
			(JSON.parse(localStorage.getItem("equipmentSelectionSmelt")) || []).forEach(y => {
				const J = [...Wc].find(P =>
					P.value === y);
				J && (J.checked = !0)
			});
			const Xc = document.querySelectorAll(".equipment-option");
			Xc.forEach(y => {
				y.addEventListener("change", Kb)
			});
			(JSON.parse(localStorage.getItem("equipmentSelection")) || []).forEach(y => {
				const J = [...Xc].find(P => P.value === y);
				J && (J.checked = !0)
			});
			Ui.addEventListener("click", function() {
				localStorage.setItem("AuctionSearch.timeOut", 0);
				localStorage.setItem("ShopSearch.timeOut", 0);
				location.reload()
			});
			let vd = document.getElementById("trainPickGold");
			vd.checked = "true" === localStorage.getItem("trainPickGold");
			vd.addEventListener("change", () => {
				localStorage.setItem("trainPickGold", vd.checked)
			});
			let wd = document.getElementById("trainEnable");
			wd.checked = "true" === localStorage.getItem("trainEnable");
			wd.addEventListener("change", () => {
				localStorage.setItem("trainEnable", wd.checked)
			});
			let xd = document.getElementById("EnableArenaHell");
			xd.checked = "true" === localStorage.getItem("EnableArenaHell");
			xd.addEventListener("change", () => {
				localStorage.setItem("EnableArenaHell", xd.checked)
			});
			let yd = document.getElementById("dungeonAB");
			yd.checked = "true" === localStorage.getItem("dungeonAB");
			yd.addEventListener("change", () => {
				localStorage.setItem("dungeonAB", yd.checked)
			});
			let zd = document.getElementById("dungeonFocusQuest");
			zd.checked = "true" === localStorage.getItem("dungeonFocusQuest");
			zd.addEventListener("change", () => {
				localStorage.setItem("dungeonFocusQuest", zd.checked)
			});
			(function() {
				const y = document.getElementById("autologinenable"),
					J = "true" === localStorage.getItem("AutoLogin");
				y.checked = J;
				zf(J);
				y.addEventListener("change", function() {
					const P =
						this.checked;
					localStorage.setItem("AutoLogin", P);
					zf(P)
				})
			})();
			const Pf = document.getElementById("timeConditions"),
				Xi = document.getElementById("addCondition");
			let Lb = JSON.parse(localStorage.getItem("timeConditions")) || [];
			Lb.forEach(Of);
			Xi.addEventListener("click", () => {
				const y = {
					start: "",
					end: "",
					action: "stop"
				};
				Lb.push(y);
				Of(y);
				Ab()
			});
			const Ad = document.getElementById("pauseButton");
			let Pb = "true" === localStorage.getItem("botPaused");
			Ad.textContent = Pb ? "Paused" : "Pause?";
			Ad.addEventListener("click", function() {
				Pb = !Pb;
				Ad.textContent = Pb ? "Paused" : "Pause?";
				localStorage.setItem("botPaused", Pb.toString())
			});
			let Bd = document.getElementById("enableArenaSimulator");
			Bd.checked = "true" === localStorage.getItem("enableArenaSimulator");
			Bd.addEventListener("change", () => {
				localStorage.setItem("enableArenaSimulator", Bd.checked)
			});
			let Cd = document.getElementById("enableCircusSimulator");
			Cd.checked = "true" === localStorage.getItem("enableCircusSimulator");
			Cd.addEventListener("change", () => {
				localStorage.setItem("enableCircusSimulator",
					Cd.checked)
			});
			let Dd = document.getElementById("enableCircusWithoutHeal");
			Dd.checked = "true" === localStorage.getItem("enableCircusWithoutHeal");
			Dd.addEventListener("change", () => {
				localStorage.setItem("enableCircusWithoutHeal", Dd.checked)
			});
			let Ed = document.getElementById("arenaAttackGM");
			Ed.checked = "true" === localStorage.getItem("arenaAttackGM");
			Ed.addEventListener("change", () => {
				localStorage.setItem("arenaAttackGM", Ed.checked)
			});
			let Fd = document.getElementById("onlyArena");
			Fd.checked = "true" === localStorage.getItem("onlyArena");
			Fd.addEventListener("change", () => {
				localStorage.setItem("onlyArena", Fd.checked)
			});
			let Gd = document.getElementById("onlyPlayerListArena");
			Gd.checked = "true" === localStorage.getItem("onlyPlayerListArena");
			Gd.addEventListener("change", () => {
				localStorage.setItem("onlyPlayerListArena", Gd.checked)
			});
			let Hd = document.getElementById("onlyPlayerListCircus");
			Hd.checked = "true" === localStorage.getItem("onlyPlayerListCircus");
			Hd.addEventListener("change", () => {
				localStorage.setItem("onlyPlayerListCircus", Hd.checked)
			});
			let Id = document.getElementById("onlyCircus");
			Id.checked = "true" === localStorage.getItem("onlyCircus");
			Id.addEventListener("change", () => {
				localStorage.setItem("onlyCircus", Id.checked)
			});
			let Jd = document.getElementById("attackRandomly");
			Jd.checked = "true" === localStorage.getItem("attackRandomly");
			Jd.addEventListener("change", () => {
				localStorage.setItem("attackRandomly", Jd.checked)
			});
			let Kd = document.getElementById("attackRandomlyCircus");
			Kd.checked = "true" === localStorage.getItem("attackRandomlyCircus");
			Kd.addEventListener("change",
				() => {
					localStorage.setItem("attackRandomlyCircus", Kd.checked)
				});
			let Ld = document.getElementById("circusAttackGM");
			Ld.checked = "true" === localStorage.getItem("circusAttackGM");
			Ld.addEventListener("change", () => {
				localStorage.setItem("circusAttackGM", Ld.checked)
			});
			let Md = document.getElementById("auctionmercenaryenable");
			Md.checked = "true" === localStorage.getItem("auctionmercenaryenable");
			Md.addEventListener("change", () => {
				localStorage.setItem("auctionmercenaryenable", Md.checked)
			});
			let Nd = document.getElementById("auctionTURBO");
			Nd.checked = "true" === localStorage.getItem("auctionTURBO");
			Nd.addEventListener("change", () => {
				localStorage.setItem("auctionTURBO", Nd.checked)
			});
			let Od = document.getElementById("auctiongladiatorenable");
			Od.checked = "true" === localStorage.getItem("auctiongladiatorenable");
			Od.addEventListener("change", () => {
				localStorage.setItem("auctiongladiatorenable", Od.checked)
			});
			let Pd = document.getElementById("bidFood");
			Pd.checked = "true" === localStorage.getItem("bidFood");
			Pd.addEventListener("change", () => {
				localStorage.setItem("bidFood",
					Pd.checked)
			});
			let Qd = document.getElementById("ignorePS");
			Qd.checked = "true" === localStorage.getItem("ignorePS");
			Qd.addEventListener("change", () => {
				localStorage.setItem("ignorePS", Qd.checked)
			});
			let Rd = document.getElementById("auctionminlevel");
			Rd.value = localStorage.getItem("auctionminlevel") || "";
			Rd.addEventListener("input", () => {
				localStorage.setItem("auctionminlevel", Rd.value)
			});
			let Sd = document.getElementById("AuctionCover");
			Sd.checked = "true" === localStorage.getItem("AuctionCover");
			Sd.addEventListener("change",
				() => {
					localStorage.setItem("AuctionCover", Sd.checked)
				});
			let Td = document.getElementById("AuctionGoldCover");
			Td.checked = "true" === localStorage.getItem("AuctionGoldCover");
			Td.addEventListener("change", () => {
				localStorage.setItem("AuctionGoldCover", Td.checked)
			});
			let Ud = document.getElementById("maximumBid");
			Ud.value = localStorage.getItem("maximumBid") || "";
			Ud.addEventListener("input", () => {
				localStorage.setItem("maximumBid", Ud.value)
			});
			let Vd = document.getElementById("activateAuction2");
			Vd.checked = "true" === localStorage.getItem("activateAuction2");
			Vd.addEventListener("change", () => {
				localStorage.setItem("activateAuction2", Vd.checked)
			});
			let Wd = document.getElementById("AuctionItemLevel2");
			Wd.value = localStorage.getItem("AuctionItemLevel2") || "";
			Wd.addEventListener("input", () => {
				localStorage.setItem("AuctionItemLevel2", Wd.value)
			});
			let pc = document.getElementById("enableMercenarySearch"),
				Xd = document.getElementById("minDexterity"),
				Yd = document.getElementById("minAgility"),
				Zd = document.getElementById("minIntelligence");
			pc.checked = "true" === localStorage.getItem("enableMercenarySearch");
			Xd.value = localStorage.getItem("minDexterity") || 0;
			Yd.value = localStorage.getItem("minAgility") || 0;
			Zd.value = localStorage.getItem("minIntelligence") || 0;
			Qf();
			pc.addEventListener("change", () => {
				localStorage.setItem("enableMercenarySearch", pc.checked);
				Qf()
			});
			Xd.addEventListener("input", () => {
				localStorage.setItem("minDexterity", Xd.value)
			});
			Yd.addEventListener("input", () => {
				localStorage.setItem("minAgility", Yd.value)
			});
			Zd.addEventListener("input", () => {
				localStorage.setItem("minIntelligence", Zd.value)
			});
			const $d =
				document.getElementById("SearchQuality"),
				ng = localStorage.getItem("SearchQuality");
			ng && ($d.value = ng);
			$d.addEventListener("change", () => {
				localStorage.setItem("SearchQuality", $d.value)
			});
			const ae = document.getElementById("HealPickBag"),
				og = localStorage.getItem("HealPickBag");
			og && (ae.value = og);
			ae.addEventListener("change", () => {
				localStorage.setItem("HealPickBag", ae.value)
			});
			const be = document.getElementById("FoodAmount"),
				pg = localStorage.getItem("FoodAmount");
			pg && (be.value = pg);
			be.addEventListener("change",
				() => {
					localStorage.setItem("FoodAmount", be.value)
				});
			const qg = document.getElementById("questrewardvalue");
			qg.addEventListener("change", () => {
				localStorage.setItem("questrewardvalue", qg.value)
			});
			const ce = document.getElementById("smeltTab"),
				rg = localStorage.getItem("smeltTab");
			rg && (ce.value = rg);
			ce.addEventListener("change", () => {
				localStorage.setItem("smeltTab", ce.value)
			});
			const de = document.getElementById("repairMaxQuality"),
				ee = document.getElementById("repairBeforeSmeltMaxQuality"),
				fe = document.getElementById("PartialOrFull");
			let uc = localStorage.getItem("repairMaxQuality"),
				vc = localStorage.getItem("repairBeforeSmeltMaxQuality"),
				wc = localStorage.getItem("PartialOrFull");
			uc || (uc = "1", localStorage.setItem("repairMaxQuality", uc));
			vc || (vc = "1", localStorage.setItem("RSMaxQuality", vc));
			wc || (wc = "0", localStorage.setItem("PartialOrFull", wc));
			de.value = uc;
			ee.value = vc;
			de.addEventListener("change", () => {
				localStorage.setItem("repairMaxQuality", de.value)
			});
			ee.addEventListener("change", () => {
				localStorage.setItem("repairBeforeSmeltMaxQuality",
					ee.value)
			});
			fe.addEventListener("change", () => {
				localStorage.setItem("PartialOrFull", fe.value)
			});
			fe.value = wc;
			var xc = document.getElementById("repairPercentage");
			(function() {
				var y = localStorage.getItem("repairPercentage");
				if (null !== y)
					for (var J = 0; J < xc.options.length; J++)
						if (xc.options[J].text.replace("%", "") === y) {
							xc.selectedIndex = J;
							break
						}
			})();
			xc.addEventListener("change", function() {
				var y = this.options[this.selectedIndex].text.replace("%", "");
				localStorage.setItem("repairPercentage", y)
			});
			const ge = document.getElementById("bidStatus"),
				sg = localStorage.getItem("bidStatus");
			sg && (ge.value = sg);
			ge.addEventListener("change", () => {
				localStorage.setItem("bidStatus", ge.value)
			});
			const he = document.getElementById("auctionMinQuality"),
				tg = localStorage.getItem("auctionMinQuality");
			tg && (he.value = tg);
			he.addEventListener("change", () => {
				localStorage.setItem("auctionMinQuality", he.value)
			});
			const ie = document.getElementById("storeInShopQuality"),
				ug = localStorage.getItem("storeInShopQuality");
			ug && (ie.value = ug);
			ie.addEventListener("change", () => {
				localStorage.setItem("storeInShopQuality",
					ie.value)
			});
			const Ka = function(y, J) {
				let P;
				return function() {
					const Q = this,
						S = arguments;
					clearTimeout(P);
					P = setTimeout(() => y.apply(Q, S), J)
				}
			}(function() {
				const y = document.getElementById("resetExpiredItems").checked,
					J = document.getElementById("resetUnderworld").checked,
					P = document.getElementById("resetDays").value,
					Q = Array.from(document.querySelectorAll('#itemsToReset input[type="checkbox"]:checked')).map(W => W.value),
					S = Array.from(document.querySelectorAll('#itemsToReset2 input[type="checkbox"]:checked')).map(W =>
						W.value),
					ka = Array.from(document.querySelectorAll('#itemsToResetGuild input[type="checkbox"]:checked')).map(W => W.value);
				localStorage.setItem("resetExpiredItems", y);
				localStorage.setItem("resetUnderworld", J);
				localStorage.setItem("resetDays", P);
				localStorage.setItem("itemsToReset", JSON.stringify(Q));
				localStorage.setItem("itemsToReset2", JSON.stringify(S));
				localStorage.setItem("itemsToResetGuild", JSON.stringify(ka))
			}, 250);
			document.getElementById("resetExpiredItems").addEventListener("change", Ka);
			document.getElementById("resetUnderworld").addEventListener("change",
				Ka);
			document.getElementById("resetDays").addEventListener("change", Ka);
			document.getElementById("itemsToReset").addEventListener("change", Ka);
			document.getElementById("itemsToReset2").addEventListener("change", Ka);
			document.getElementById("itemsToResetGuild").addEventListener("change", Ka);
			document.getElementById("resetExpiredItems").addEventListener("touchend", Ka);
			document.getElementById("resetUnderworld").addEventListener("touchend", Ka);
			document.getElementById("resetDays").addEventListener("touchend",
				Ka);
			document.getElementById("itemsToReset").addEventListener("touchend", Ka);
			document.getElementById("itemsToReset2").addEventListener("touchend", Ka);
			document.getElementById("itemsToResetGuild").addEventListener("touchend", Ka);
			document.getElementById("selectAllItems").addEventListener("click", function() {
				let y = "true" !== this.dataset.checked;
				this.innerHTML = (this.dataset.checked = y) ? '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">\n                        <polyline points="20 6 9 17 4 12"></polyline>\n                    </svg>' :
					'<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">\n                        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line> \n                    </svg>';
				ui(y)
			});
			(function() {
				const y = "true" === localStorage.getItem("resetExpiredItems"),
					J = "true" === localStorage.getItem("resetUnderworld"),
					P = localStorage.getItem("resetDays"),
					Q = JSON.parse(localStorage.getItem("itemsToReset") ||
						"[]"),
					S = JSON.parse(localStorage.getItem("itemsToReset2") || "[]"),
					ka = JSON.parse(localStorage.getItem("itemsToResetGuild") || "[]");
				document.getElementById("resetExpiredItems").checked = y;
				document.getElementById("resetUnderworld").checked = J;
				document.getElementById("resetDays").value = P;
				Q.forEach(W => {
					if (W = document.getElementById(W)) W.checked = !0
				});
				S.forEach(W => {
					if (W = document.getElementById(W)) W.checked = !0
				});
				ka.forEach(W => {
					if (W = document.getElementById(W)) W.checked = !0
				})
			})();
			const je = document.getElementById("guildPackHour"),
				vg = localStorage.getItem("guildPackHour");
			vg && (je.value = vg);
			je.addEventListener("change", () => {
				localStorage.setItem("guildPackHour", je.value)
			});
			const ke = document.getElementById("filterGM"),
				wg = localStorage.getItem("filterGM");
			wg && (ke.value = wg);
			ke.addEventListener("change", () => {
				localStorage.setItem("filterGM", ke.value)
			});
			const tb = document.getElementById("delaySelect"),
				xg = localStorage.getItem("DELAY");
			if (xg)
				for (let y = 0; y < tb.options.length; y++)
					if (tb.options[y].text === xg) {
						tb.value = tb.options[y].value;
						break
					} tb.addEventListener("change",
				() => {
					localStorage.setItem("DELAY", tb.options[tb.selectedIndex].text)
				});
			const le = document.getElementById("questSpeed"),
				yg = localStorage.getItem("questSpeed");
			yg && (le.value = yg);
			le.addEventListener("change", () => {
				localStorage.setItem("questSpeed", le.value)
			});
			let zg = document.getElementById("itemToBuy"),
				Ag = document.getElementById("rarity"),
				Bg = document.getElementById("marketItemType"),
				Cg = document.getElementById("itemsoulbound"),
				Dg = document.getElementById("maxPrice"),
				Yi = document.getElementById("addItemBtn"),
				Zi = document.getElementById("removeItemBtn"),
				$i = document.getElementById("MarketremoveItemBtn"),
				Zc = document.getElementById("itemList"),
				Rf = document.getElementById("MarketboughtItems"),
				Mb = localStorage.getItem("MarketboughtItems");
			Mb ? Mb = JSON.parse(Mb) : Mb = [];
			const Eg = document.getElementById("MarketSearchInterval");
			Eg.addEventListener("change", () => {
				localStorage.setItem("MarketSearchInterval", Eg.value)
			});
			document.getElementById("MarketSearchInterval").addEventListener("input", function() {
				3 > parseInt(this.value,
					10) && (this.value = 3)
			});
			const Fg = document.getElementById("MarketMaxPerFoodPrice");
			Fg.addEventListener("change", () => {
				localStorage.setItem("MarketMaxPerFoodPrice", Fg.value)
			});
			const Gg = document.getElementById("MarketMaxFoodPrice");
			Gg.addEventListener("change", () => {
				localStorage.setItem("MarketMaxFoodPrice", Gg.value)
			});
			const Hg = document.getElementById("MarketMinItemLevel");
			Hg.addEventListener("change", () => {
				localStorage.setItem("MarketMinItemLevel", Hg.value)
			});
			let me = document.getElementById("marketOnlyFood");
			me.checked = "true" === localStorage.getItem("marketOnlyFood");
			me.addEventListener("change", () => {
				localStorage.setItem("marketOnlyFood", me.checked)
			});
			let kb = JSON.parse(localStorage.getItem("marketItems")) || [];
			Yi.onclick = function() {
				kb.push({
					mn: zg.value || 1,
					om: Ag.value || 4,
					maxPrice: Dg.value || 4,
					itemType: Bg.value || 4,
					Soulbound: Cg.value || 2
				});
				zg.value = "";
				Ag.value = "White";
				Dg.value = "";
				Bg.value = "WEAPONS";
				Cg.value = "DontBuySoulbound";
				Yc()
			};
			Zi.onclick = function() {
				kb.splice(Zc.value, 1);
				Yc()
			};
			$i.onclick = function() {
				document.getElementById("MarketboughtItems").innerHTML =
					"";
				localStorage.setItem("MarketboughtItems", JSON.stringify([]))
			};
			Yc();
			let ne = document.getElementById("enableMarketSearch");
			ne.checked = "true" === localStorage.getItem("enableMarketSearch");
			ne.addEventListener("change", () => {
				localStorage.setItem("enableMarketSearch", ne.checked)
			});
			let oe = document.getElementById("usePacks");
			oe.checked = "true" === localStorage.getItem("usePacks");
			oe.addEventListener("change", () => {
				localStorage.setItem("usePacks", oe.checked)
			});
			const pe = document.getElementById("scoreRange"),
				Ig =
				localStorage.getItem("scoreRange");
			Ig && (pe.value = Ig);
			pe.addEventListener("change", () => {
				localStorage.setItem("scoreRange", pe.value)
			});
			const qe = document.getElementById("scoreRangeCircus"),
				Jg = localStorage.getItem("scoreRangeCircus");
			Jg && (qe.value = Jg);
			qe.addEventListener("change", () => {
				localStorage.setItem("scoreRangeCircus", qe.value)
			});
			let re = document.getElementById("scoreboardattackenable");
			re.checked = "true" === localStorage.getItem("scoreboardattackenable");
			re.addEventListener("change", () => {
				localStorage.setItem("scoreboardattackenable",
					re.checked)
			});
			let se = document.getElementById("scoreboardcircusenable");
			se.checked = "true" === localStorage.getItem("scoreboardcircusenable");
			se.addEventListener("change", () => {
				localStorage.setItem("scoreboardcircusenable", se.checked)
			});
			let te = document.getElementById("leagueattackenable");
			te.checked = "true" === localStorage.getItem("leagueattackenable");
			te.addEventListener("change", () => {
				localStorage.setItem("leagueattackenable", te.checked)
			});
			let Qb = document.getElementById("leaguerandom");
			Qb.checked = "true" ===
				localStorage.getItem("leaguerandom");
			Qb.addEventListener("change", () => {
				localStorage.setItem("leaguerandom", Qb.checked);
				Qb.checked && (Rb.checked = !1, localStorage.setItem("leaguelowtohigh", !1))
			});
			let Rb = document.getElementById("leaguelowtohigh");
			Rb.checked = "true" === localStorage.getItem("leaguelowtohigh");
			Rb.addEventListener("change", () => {
				localStorage.setItem("leaguelowtohigh", Rb.checked);
				Rb.checked && (Qb.checked = !1, localStorage.setItem("leaguerandom", !1))
			});
			let ue = document.getElementById("leaguecircusattackenable");
			ue.checked = "true" === localStorage.getItem("leaguecircusattackenable");
			ue.addEventListener("change", () => {
				localStorage.setItem("leaguecircusattackenable", ue.checked)
			});
			let Sb = document.getElementById("leaguecircusrandom");
			Sb.checked = "true" === localStorage.getItem("leaguecircusrandom");
			Sb.addEventListener("change", () => {
				localStorage.setItem("leaguecircusrandom", Sb.checked);
				Sb.checked && (Tb.checked = !1, localStorage.setItem("leaguecircuslowtohigh", !1))
			});
			let Tb = document.getElementById("leaguecircuslowtohigh");
			Tb.checked = "true" === localStorage.getItem("leaguecircuslowtohigh");
			Tb.addEventListener("change", () => {
				localStorage.setItem("leaguecircuslowtohigh", Tb.checked);
				Tb.checked && (Sb.checked = !1, localStorage.setItem("leaguecircusrandom", !1))
			});
			let ve = document.getElementById("autoAddArena");
			ve.checked = "true" === localStorage.getItem("autoAddArena");
			ve.addEventListener("change", () => {
				localStorage.setItem("autoAddArena", ve.checked)
			});
			let we = document.getElementById("autoAvoidArena");
			we.checked = "true" === localStorage.getItem("autoAvoidArena");
			we.addEventListener("change", () => {
				localStorage.setItem("autoAvoidArena", we.checked)
			});
			const Kg = document.getElementById("autoAddArenaAmount");
			Kg.addEventListener("change", () => {
				localStorage.setItem("autoAddArenaAmount", Kg.value)
			});
			const Lg = document.getElementById("ArenaSimulatorAmount");
			Lg.addEventListener("change", () => {
				localStorage.setItem("ArenaSimulatorAmount", Lg.value)
			});
			const Mg = document.getElementById("CircusSimulatorAmount");
			Mg.addEventListener("change", () => {
				localStorage.setItem("CircusSimulatorAmount",
					Mg.value)
			});
			let xe = document.getElementById("autoAddCircus");
			xe.checked = "true" === localStorage.getItem("autoAddCircus");
			xe.addEventListener("change", () => {
				localStorage.setItem("autoAddCircus", xe.checked)
			});
			let ye = document.getElementById("autoAvoidCircus");
			ye.checked = "true" === localStorage.getItem("autoAvoidCircus");
			ye.addEventListener("change", () => {
				localStorage.setItem("autoAvoidCircus", ye.checked)
			});
			const Ng = document.getElementById("autoAddCircusAmount");
			Ng.addEventListener("change", () => {
				localStorage.setItem("autoAddCircusAmount",
					Ng.value)
			});
			let ze = document.getElementById("UnderWorldUseRuby");
			ze.checked = "true" === localStorage.getItem("UnderWorldUseRuby");
			ze.addEventListener("change", () => {
				localStorage.setItem("UnderWorldUseRuby", ze.checked)
			});
			let Ae = document.getElementById("useSacrifice");
			Ae.checked = "true" === localStorage.getItem("useSacrifice");
			Ae.addEventListener("change", () => {
				localStorage.setItem("useSacrifice", Ae.checked)
			});
			let Be = document.getElementById("usePray");
			Be.checked = "true" === localStorage.getItem("usePray");
			Be.addEventListener("change",
				() => {
					localStorage.setItem("usePray", Be.checked)
				});
			let Ce = document.getElementById("UnderworldUseMobi");
			Ce.checked = "true" === localStorage.getItem("UnderworldUseMobi");
			Ce.addEventListener("change", () => {
				localStorage.setItem("UnderworldUseMobi", Ce.checked)
			});
			let De = document.getElementById("exitUnderworld");
			De.checked = "true" === localStorage.getItem("exitUnderworld");
			De.addEventListener("change", () => {
				localStorage.setItem("exitUnderworld", De.checked)
			});
			let Ee = document.getElementById("autoEnterHell");
			Ee.checked =
				"true" === localStorage.getItem("autoEnterHell");
			Ee.addEventListener("change", () => {
				localStorage.setItem("autoEnterHell", Ee.checked)
			});
			let Fe = document.getElementById("dontEnterUnderworld");
			Fe.checked = "true" === localStorage.getItem("dontEnterUnderworld");
			Fe.addEventListener("change", () => {
				localStorage.setItem("dontEnterUnderworld", Fe.checked)
			});
			let Ge = document.getElementById("disableLogMenu");
			Ge.checked = "true" === localStorage.getItem("disableLogMenu");
			Ge.addEventListener("change", () => {
				localStorage.setItem("disableLogMenu",
					Ge.checked)
			});
			let He = document.getElementById("disableBG");
			He.checked = "true" === localStorage.getItem("disableBG");
			He.addEventListener("change", () => {
				localStorage.setItem("disableBG", He.checked)
			});
			let Ie = document.getElementById("MoveButtons");
			Ie.checked = "true" === localStorage.getItem("MoveButtons");
			Ie.addEventListener("change", () => {
				localStorage.setItem("MoveButtons", Ie.checked)
			});
			let Je = document.getElementById("pauseBotEnable");
			Je.checked = "true" === localStorage.getItem("pauseBotEnable");
			Je.addEventListener("change",
				() => {
					localStorage.setItem("pauseBotEnable", Je.checked)
				});
			const Og = document.getElementById("pauseBot");
			Og.addEventListener("change", () => {
				Z("pauseBot", Og.value)
			});
			let Ke = document.getElementById("storeGoldinAuction");
			Ke.checked = "true" === localStorage.getItem("storeGoldinAuction");
			Ke.addEventListener("change", () => {
				localStorage.setItem("storeGoldinAuction", Ke.checked)
			});
			const Pg = document.getElementById("storeGoldinAuctionmaxGold");
			Pg.addEventListener("change", () => {
				localStorage.setItem("storeGoldinAuctionmaxGold",
					Pg.value)
			});
			const Qg = document.getElementById("storeGoldinAuctionholdGold");
			Qg.addEventListener("change", () => {
				localStorage.setItem("storeGoldinAuctionholdGold", Qg.value)
			});
			const Rg = document.getElementById("TrainingHoldGold");
			Rg.addEventListener("change", () => {
				localStorage.setItem("TrainingHoldGold", Rg.value)
			});
			const Sg = document.getElementById("MarketHoldGold");
			Sg.addEventListener("change", () => {
				localStorage.setItem("MarketHoldGold", Sg.value)
			});
			const Tg = document.getElementById("KasaHoldGold");
			Tg.addEventListener("change",
				() => {
					localStorage.setItem("KasaHoldGold", Tg.value)
				});
			let Le = document.getElementById("guildBattleEnable");
			Le.checked = "true" === localStorage.getItem("guildBattleEnable");
			Le.addEventListener("change", () => {
				localStorage.setItem("guildBattleEnable", Le.checked)
			});
			let Me = document.getElementById("guildBattleRandom");
			Me.checked = "true" === localStorage.getItem("guildBattleRandom");
			Me.addEventListener("change", () => {
				localStorage.setItem("guildBattleRandom", Me.checked)
			});
			let Ne = document.getElementById("GuildEnable");
			Ne.checked = "true" === localStorage.getItem("GuildEnable");
			Ne.addEventListener("change", () => {
				localStorage.setItem("GuildEnable", Ne.checked)
			});
			const Ug = document.getElementById("GuildDonateAmount");
			Ug.addEventListener("change", () => {
				localStorage.setItem("GuildDonateAmount", Ug.value)
			});
			const Vg = document.getElementById("GuildDonateMore");
			Vg.addEventListener("change", () => {
				localStorage.setItem("GuildDonateMore", Vg.value)
			});
			const Wg = document.getElementById("GuildDonateLess");
			Wg.addEventListener("change", () => {
				localStorage.setItem("GuildDonateLess", Wg.value)
			});
			document.getElementById("hellDifficulty").addEventListener("change", function() {
				localStorage.setItem("hellDifficulty", this.value)
			});
			const aj = document.getElementById("hellDifficulty"),
				Xg = localStorage.getItem("hellDifficulty");
			null !== Xg && (aj.value = Xg);
			let Oe = document.getElementById("useVillaMedici");
			Oe.checked = "true" === localStorage.getItem("useVillaMedici");
			Oe.addEventListener("change", () => {
				localStorage.setItem("useVillaMedici", Oe.checked)
			});
			let Pe =
				document.getElementById("useHealingPotion");
			Pe.checked = "true" === localStorage.getItem("useHealingPotion");
			Pe.addEventListener("change", () => {
				localStorage.setItem("useHealingPotion", Pe.checked)
			});
			const Qe = document.getElementById("repairMercenary");
			Qe.checked = "true" === localStorage.getItem("repairMercenary");
			Qe.addEventListener("change", () => {
				localStorage.setItem("repairMercenary", Qe.checked)
			});
			const Re = document.getElementById("repairGladiator");
			Re.checked = "true" === localStorage.getItem("repairGladiator");
			Re.addEventListener("change", () => {
				localStorage.setItem("repairGladiator", Re.checked)
			});
			let Se = document.getElementById("activateRepair");
			Se.checked = "true" === localStorage.getItem("activateRepair");
			Se.addEventListener("change", () => {
				localStorage.setItem("activateRepair", Se.checked)
			});
			const bj = JSON.parse(localStorage.getItem("ignoredMaterials")) || [];
			document.querySelectorAll('#ignoreMaterialsList input[type="checkbox"]').forEach(y => {
				y.checked = bj.includes(y.value)
			});
			document.querySelectorAll('#ignoreMaterialsList input[type="checkbox"]').forEach(y => {
				y.addEventListener("change", () => {
					const J = [];
					document.querySelectorAll('#ignoreMaterialsList input[type="checkbox"]').forEach(P => {
						P.checked && J.push(P.value)
					});
					localStorage.setItem("ignoredMaterials", JSON.stringify(J))
				})
			});
			const Yg = document.querySelectorAll(".gladiator-inventory .inventory-item"),
				Zg = document.querySelectorAll(".mercenary-inventory .inventory-item"),
				$g = JSON.parse(localStorage.getItem("activeItemsGladiator")) || {},
				ah = JSON.parse(localStorage.getItem("activeItemsMercenary")) || {};
			Yg.forEach(y => {
				Sf(y, $g, "activeItemsGladiator")
			});
			Zg.forEach(y => {
				Sf(y, ah, "activeItemsMercenary")
			});
			Tf(Yg, $g, "helmet necklace weapon armor shield gloves shoes rings1 rings2".split(" "), "activeItemsGladiator");
			Tf(Zg, ah, "helmetM necklaceM weaponM armorM shieldM glovesM shoesM rings1M rings2M".split(" "), "activeItemsMercenary");
			const bh = document.getElementById("expeditionLocation");
			bh.addEventListener("change", () => {
				localStorage.setItem("expeditionLocation", bh.value)
			});
			const ch = document.getElementById("dungeonLocation");
			ch.addEventListener("change", () => {
				localStorage.setItem("dungeonLocation", ch.value)
			});
			const yc = document.getElementById("autoCollectBonuses");
			yc.checked = "true" === localStorage.getItem("autoCollectBonuses");
			document.getElementById("enemySelection").style.display = yc.checked ? "none" : "block";
			yc.addEventListener("change", () => {
				localStorage.setItem("autoCollectBonuses", yc.checked)
			});
			const Te = document.getElementById("skipBossToggle");
			Te.checked = "true" === localStorage.getItem("skipBoss");
			Te.addEventListener("change",
				() => {
					localStorage.setItem("skipBoss", Te.checked)
				});
			const Ue = document.getElementById("resetIfLoseToggle");
			Ue.checked = "true" === localStorage.getItem("resetIfLose");
			Ue.addEventListener("change", () => {
				localStorage.setItem("resetIfLose", Ue.checked)
			});
			const Ve = document.getElementById("activateSmelt");
			Ve.checked = "true" === localStorage.getItem("EnableSmelt");
			Ve.addEventListener("change", () => {
				localStorage.setItem("EnableSmelt", Ve.checked)
			});
			const We = document.getElementById("EnableHellLimit"),
				dh = document.getElementById("hellLimit").closest(".setting-row"),
				eh = "true" === localStorage.getItem("EnableHellLimit"),
				fh = localStorage.getItem("hellLimit") || 5;
			We.checked = eh;
			document.getElementById("hellLimit").value = fh;
			dh.style.display = eh ? "block" : "none";
			We.addEventListener("change", function() {
				const y = We.checked;
				localStorage.setItem("EnableHellLimit", y);
				dh.style.display = y ? "block" : "none"
			});
			document.getElementById("hellLimit").addEventListener("input", function() {
				const y = document.getElementById("hellLimit").value;
				1 <= y && 200 >= y ? localStorage.setItem("hellLimit", y) : document.getElementById("hellLimit").value =
					fh
			});
			const qc = document.getElementById("farmEnable"),
				vi = document.getElementById("farmLocation").closest(".setting-row"),
				wi = document.getElementById("farmEnemy").closest(".setting-row"),
				cj = "true" === localStorage.getItem("farmEnable"),
				gh = localStorage.getItem("farmLocation"),
				hh = localStorage.getItem("farmEnemy");
			qc.checked = cj;
			gh && (document.getElementById("farmLocation").value = gh);
			hh && (document.getElementById("farmEnemy").value = hh);
			Uf();
			qc.addEventListener("change", function() {
				localStorage.setItem("farmEnable",
					qc.checked);
				Uf()
			});
			document.getElementById("farmLocation").addEventListener("change", function() {
				localStorage.setItem("farmLocation", this.value)
			});
			document.getElementById("farmEnemy").addEventListener("change", function() {
				localStorage.setItem("farmEnemy", this.value)
			});
			const Xe = document.getElementById("doHeal");
			Xe.checked = "true" === localStorage.getItem("HealEnabled");
			Xe.addEventListener("change", () => {
				localStorage.setItem("HealEnabled", Xe.checked)
			});
			const Ye = document.getElementById("healShopToggle");
			Ye.checked =
				"true" === localStorage.getItem("HealShop");
			Ye.addEventListener("change", () => {
				localStorage.setItem("HealShop", Ye.checked)
			});
			const Ze = document.getElementById("healfrompackage");
			Ze.checked = "true" === localStorage.getItem("HealPackage");
			Ze.addEventListener("change", () => {
				localStorage.setItem("HealPackage", Ze.checked)
			});
			const $e = document.getElementById("healcervisia");
			$e.checked = "true" === localStorage.getItem("HealCervisia");
			$e.addEventListener("change", () => {
				localStorage.setItem("HealCervisia", $e.checked)
			});
			const af = document.getElementById("HealEggs");
			af.checked = "true" === localStorage.getItem("HealEggs");
			af.addEventListener("change", () => {
				localStorage.setItem("HealEggs", af.checked)
			});
			const bf = document.getElementById("OilEnable");
			bf.checked = "true" === localStorage.getItem("OilEnable");
			bf.addEventListener("change", () => {
				localStorage.setItem("OilEnable", bf.checked)
			});
			document.getElementById("enemySelect").addEventListener("change", function() {
				localStorage.setItem("selectedEnemy", this.value)
			});
			const dj = document.getElementById("enemySelect"),
				ih = localStorage.getItem("selectedEnemy");
			null !== ih && (dj.value = ih);
			document.getElementById("autoCollectBonuses").addEventListener("change", function() {
				document.getElementById("enemySelection").style.display = this.checked ? "none" : "block"
			});
			xi.addEventListener("change", function() {
				this.checked ? (c(!0), Ca = !0) : (c(!1), Ca = !1);
				localStorage.setItem("doExpedition", Ca);
				x()
			});
			yi.addEventListener("change", function() {
				this.checked ? (e(!0), Ga = !0) : (e(!1), Ga = !1);
				localStorage.setItem("doDungeon", Ga);
				x()
			});
			zi.addEventListener("change",
				function() {
					this.checked ? (h(!0), Ha = !0) : (h(!1), Ha = !1);
					localStorage.setItem("doArena", Ha);
					x()
				});
			document.getElementById("addAutoAttack").addEventListener("click", () => {
				const y = document.getElementById("autoAttackInput").value.trim();
				y && ic(y, "autoAttackList", "autoAttackList")
			});
			document.getElementById("addAvoidAttack").addEventListener("click", () => {
				const y = document.getElementById("avoidAttackInput").value.trim();
				y && ic(y, "avoidAttackList", "avoidAttackList")
			});
			document.getElementById("addAutoCircusAttack").addEventListener("click",
				() => {
					const y = document.getElementById("autoAttackCircusInput").value.trim();
					y && ic(y, "autoAttackCircusList", "autoAttackCircusList")
				});
			document.getElementById("addAvoidCircusAttack").addEventListener("click", () => {
				const y = document.getElementById("avoidAttackCircusInput").value.trim();
				y && ic(y, "avoidAttackCircusList", "avoidAttackCircusList")
			});
			oi();
			Ai.addEventListener("change", function() {
				this.checked ? (k(!0), Da = !0) : (k(!1), Da = !1);
				localStorage.setItem("doCircus", Da);
				x()
			});
			Bi.addEventListener("change", function() {
				this.checked ?
					(g(!0), Na = !0) : (g(!1), Na = !1);
				localStorage.setItem("doQuests", Na);
				x()
			});
			Ei.addEventListener("change", function() {
				this.checked ? (n(!0), rb = !0) : (n(!1), rb = !1);
				localStorage.setItem("doKasa", rb);
				x()
			});
			Di.addEventListener("change", function() {
				this.checked ? (q(!0), ib = !0) : (q(!1), ib = !1);
				localStorage.setItem("AutoAuction", ib);
				x()
			});
			Ci.addEventListener("change", function() {
				this.checked ? (l(!0), Ea = !0) : (l(!1), Ea = !1);
				localStorage.setItem("doEventExpedition", Ea);
				x()
			});
			rc.addEventListener("input", () => {
				let y = parseInt(rc.value,
					10);
				1 > y ? y = 1 : 99 < y && (y = 99);
				rc.value = y;
				localStorage.setItem("healPercentage", y)
			});
			Vf.addEventListener("input", () => {
				localStorage.setItem("hellEnterHP", Vf.value)
			});
			Wf.addEventListener("input", () => {
				localStorage.setItem("HellHealHP", Wf.value)
			});
			$c.addEventListener("change", () => {
				localStorage.setItem("HealClothToggle", $c.checked)
			});
			ad.addEventListener("change", () => {
				localStorage.setItem("HealRubyToggle", ad.checked)
			});
			bd.addEventListener("change", () => {
				localStorage.setItem("storeResource", bd.checked)
			});
			cd.addEventListener("change",
				() => {
					localStorage.setItem("HighlightUnderworldItems", cd.checked)
				});
			const cf = document.querySelectorAll(".stat-checkbox"),
				ej = localStorage.getItem("selectedStat");
			for (const y of cf) y.checked = y.id === ej;
			for (const y of cf) y.addEventListener("change", () => {
				if (y.checked) {
					for (const J of cf) J !== y && (J.checked = !1);
					localStorage.setItem("selectedStat", y.id);
					localStorage.setItem("statID", y.getAttribute("data-skill"))
				} else localStorage.removeItem("selectedStat")
			})
		});
		$("#set_event_monster_id_0").click(function() {
			r("0")
		});
		$("#set_event_monster_id_1").click(function() {
			r("1")
		});
		$("#set_event_monster_id_2").click(function() {
			r("2")
		});
		$("#set_event_monster_id_3").click(function() {
			r("3")
		});
		x()
	}
	async function fj() {
		if ("true" === localStorage.getItem("storeResource")) {
			var b = new URL(window.location.href),
				c = b.origin;
			b = b.searchParams.get("sh") || "";
			const e = Date.now();
			c = `${c}/game/ajax.php?mod=forge&submod=storageIn`;
			const h = new FormData;
			h.append("inventory", "1");
			h.append("packages", "1");
			h.append("sell", "1");
			h.append("a", e);
			h.append("sh",
				b);
			b = JSON.parse(localStorage.getItem("Timers"));
			Z("storeForgeResources", b.StoreForge || 60);
			try {
				(await fetch(c, {
					method: "POST",
					body: h
				})).ok ? E(`${d.Df}`) : window.location.reload()
			} catch (k) {
				window.location.reload()
			}
		}
	}
	async function gj() {
		var b = new URL(window.location.href),
			c = b.origin;
		const e = b.searchParams.get("sh") || "";
		b = JSON.parse(localStorage.getItem("statSettings")) || [];
		const h = JSON.parse(localStorage.getItem("Timers")) || {},
			k = "true" === localStorage.getItem("trainPickGold"),
			g = {
				Strength: 1,
				Dexterity: 2,
				Agility: 3,
				Constitution: 4,
				Charisma: 5,
				Intelligence: 6
			};
		b.forEach(n => {
			n.qm = g[n.stat]
		});
		b.sort((n, m) => "None" === n.priority ? 1 : "None" === m.priority ? -1 : parseInt(n.priority, 10) - parseInt(m.priority, 10));
		c = await (await fetch(`${c}/game/index.php?mod=training&sh=${e}`)).text();
		const l = [];
		(new DOMParser).parseFromString(c, "text/html").querySelectorAll("#training_box .training_inner").forEach((n, m) => {
			m += 1;
			var r = n.nextElementSibling?.querySelector(".training_link .training_button");
			r = r ? r.getAttribute("href") : null;
			(n = (n = (n =
				n.nextElementSibling?.querySelector(".training_costs")) ? n.textContent.trim() : null) ? parseInt(n.replace(/[^\d]/g, ""), 10) : null) && r ? l.push({
				qm: m,
				gn: n,
				Gn: r
			}) : l.push({
				qm: m,
				gn: n,
				Gn: r
			})
		});
		for (const n of b) {
			c = n.stat;
			const m = n.qm;
			var q = n.priority;
			if (1 > Number(n.count) || "None" === q) continue;
			q = l.find(u => u.qm === m);
			if (!q) {
				E(`No training available for ${c}`);
				continue
			}
			const r = q.gn;
			q = q.Gn;
			const x = parseInt(localStorage.getItem("TrainingHoldGold"), 10) || 0;
			if (da.gold >= r + x) {
				await fetch(q);
				--n.count;
				n.count = Math.max(0, n.count);
				localStorage.setItem("statSettings", JSON.stringify(b));
				E(`Trained ${c} for ${r} gold`);
				Z("Training", h.Training || 2);
				return
			}
			if (k) {
				q = await jQuery.get(G({
					mod: "packages",
					f: 14,
					fq: -1,
					qry: "",
					page: 1,
					sh: e
				}));
				let u = 0,
					w = null;
				jQuery(q).find(".packageItem").each(function(A, D) {
					A = parseInt(jQuery(D).find(".ui-draggable").attr("data-price-gold"), 10);
					if (A >= r + x) return u = A, w = jQuery(D), !1
				});
				if (0 < u && w) try {
					await dc(1, 1, async (A, D) => {
						const B = w.find('input[name="packages[]"]').val(),
							t = w.find(".ui-draggable").attr("data-position-x"),
							v = w.find(".ui-draggable").attr("data-position-y");
						await jQuery.post(U({
							mod: "inventory",
							submod: "move",
							from: "-" + B,
							fromX: t,
							fromY: v,
							to: D,
							toX: A.x + 1,
							toY: A.y + 1,
							amount: 1,
							doll: 1,
							a: (new Date).getTime(),
							sh: e
						}));
						E(`Moved ${u} gold to inventory for training`);
						da.gold += u;
						localStorage.setItem("Training", 0);
						window.location.reload()
					})
				} catch (A) {
					E(`Error moving gold: ${A.message}`)
				} else E(`${d.Dd}: ${c}`)
			} else E(`${d.Dd}`)
		}
		Z("Training", h.Training || 2)
	}

	function hj() {
		const b = JSON.parse(localStorage.getItem("statSettings"));
		for (let c = 0; c < b.length; c++)
			if ("0" !== b[c].count || b[c].$m) return !0;
		return !1
	}

	function ij() {
		var b = new URL(window.location.href),
			c = localStorage.getItem("scoreboardattackenable"),
			e = localStorage.getItem("scoreboardcircusenable");
		if (document.querySelector(".reportWin")) {
			var h = document.querySelector(".report_reward");
			h && (h = h.querySelector('img[src*="71e68d38f81ee6f96a618f33c672e0.gif"]')) && (h = h.previousSibling) && h.nodeType === Node.TEXT_NODE && (h = h.textContent.trim().match(/(\d+(?:\.\d+)?)/)) && (h = parseFloat(h[1]),
				b.href.includes("&t=2") ? ja("arenaMoney", h) : b.href.includes("&t=3") && ja("circusMoney", h))
		}
		if (b.href.includes("submod=showCombatReport") && b.href.includes("&t=1"))(c = document.getElementById("reportHeader")) && (c.classList.contains("reportWin") || "true" !== sessionStorage.getItem("autoGoActive") ? localStorage.setItem("loose", "false") : localStorage.setItem("loose", "true"));
		else if (b.href.includes("submod=showCombatReport")) {
			let l = document.querySelector("p > a + img");
			var k = document.querySelector("#defenderAvatar11 .playername_achievement");
			null === k && (k = document.querySelector("#defenderAvatar11 .playername.ellipsis "));
			(h = document.getElementById("reportHeader")) && !h.classList.contains("reportWin") && (localStorage.setItem("nextQuestTime.timeOut", 0), localStorage.setItem("nextQuestTime", 0));
			h = 0;
			if (k && (k = k.innerText.trim(), !k.includes("#"))) {
				try {
					var g = l.previousSibling.nodeValue.trim();
					g = g.split(" ").pop();
					g = g.replace(".", "");
					g = g.replace(",", ".");
					h = parseFloat(g)
				} catch (q) {}
				b.href.includes("&t=2") ? (e = document.getElementById("reportHeader").classList.contains("reportWin"),
						b = JSON.parse(localStorage.getItem("tempOpponentDetails")), g = Hf.split("-")[0].slice(1), "true" !== localStorage.getItem("autoAvoidArena") || e || lb("avoidAttackList", k), "true" === localStorage.getItem("autoAddArena") && Number(h) >= Number(localStorage.getItem("autoAddArenaAmount")) && b && b.serverId && (g === b.serverId ? (lb("autoAttackList", b.playerName), localStorage.removeItem("tempOpponentDetails")) : "true" === c && k != b.playerName ? lb("autoAttackList", k) : g !== b.serverId && lb("autoAttackServerList", b))) : b.href.includes("&t=3") &&
					(c = document.getElementById("reportHeader").classList.contains("reportWin"), b = JSON.parse(localStorage.getItem("tempOpponentDetails")), g = Hf.split("-")[0].slice(1), "true" !== localStorage.getItem("autoAvoidCircus") || c || lb("avoidAttackCircusList", k), "true" === localStorage.getItem("autoAddCircus") && h >= Number(localStorage.getItem("autoAddCircusAmount")) && b && b.serverId && (g === b.serverId ? (lb("autoAttackCircusList", b.playerName), localStorage.removeItem("tempOpponentDetails")) : "true" === e && k != b.playerName ? lb("autoAttackCircusList",
						k) : g !== b.serverId && lb("autoAttackCircusServerList", b)))
			}
		}
	}

	function lb(b, c) {
		let e = JSON.parse(localStorage.getItem(b)) || [];
		if ("object" === typeof c && null !== c) {
			let h = c.playerName;
			e.some(k => k.playerName === h && k.serverId === c.serverId) || e.push(c)
		} else "string" === typeof c && (e.includes(c) || e.push(c));
		localStorage.setItem(b, JSON.stringify(e))
	}
	async function jh(b) {
		var c = new URL(window.location.href),
			e = c.origin,
			h = c.searchParams;
		c = localStorage.getItem("AuctionItemLevel2") || "";
		const k = h.get("itemType") || "",
			g = localStorage.getItem("SearchQuality") ||
			"";
		h = h.get("sh") || "";
		e = new URL(`${e}/game/index.php?mod=auction&qry=&itemLevel=${c}&itemType=${k}&itemQuality=${g}&sh=${h}`);
		e.searchParams.set("mod", "auction");
		e.searchParams.set("itemLevel", c);
		e.searchParams.set("itemType", k);
		e.searchParams.set("itemQuality", g);
		e.searchParams.set("sh", h);
		b && e.searchParams.set("ttype", b);
		b = await (await fetch(e.href)).text();
		return (new DOMParser).parseFromString(b, "text/html")
	}
	async function Nf() {
		var b = new URL(window.location.href);
		const c = b.origin,
			e = b.searchParams.get("sh") ||
			"";
		b = Array.from({
			length: 5
		}, (k, g) => [new URL(`${c}/game/index.php?mod=inventory&sub=${g+1}&subsub=0&sh=${e}`), new URL(`${c}/game/index.php?mod=inventory&sub=${g+1}&subsub=1&sh=${e}`)]).flat();
		const h = async k => {
			var g = await (await fetch(k.href)).text();
			g = (new DOMParser).parseFromString(g, "text/html");
			g.Nm = k.href;
			return g
		};
		return await Promise.all(b.map(k => h(k)))
	}

	function df(b) {
		return JSON.parse(b.replace(/&quot;/g, '"'))[0][0][0]
	}
	async function jj(b) {
		b = (new TextEncoder).encode(b.toString());
		b = await crypto.subtle.digest("SHA-256",
			b);
		return Array.from(new Uint8Array(b)).map(c => c.toString(16).padStart(2, "0")).join("")
	}

	function hb() {
		(function(b) {
			const c = setInterval(() => {
				const e = document.getElementById("mainmenu");
				e && (clearInterval(c), b(e))
			}, 500)
		})(b => {
			if (!document.querySelector(".customButtonm")) {
				var c = document.createElement("button");
				c.className = "customButtonm";
				c.innerHTML = '\n            <style>\n            .customButtonm {\n                vertical-align: middle;\n                width: 179px;\n                height: 50px;\n                background-image: linear-gradient(135deg, #f29b20 0%, #b18026 100%);\n                border: 2px solid #000;\n                color: white;\n                text-align: center;\n                text-decoration: none;\n                border-radius: 5px;\n                display: inline-block;\n                font-size: 16px;\n                margin: 4px auto;\n                cursor: pointer;\n                box-shadow: 5px 2px 5px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.4), inset 0 -1px 1px rgba(0, 0, 0, 0.3);\n                padding: 18px 34px;\n                transition-duration: 0.4s;\n            }\n        \n            .customButtonm span {\n                top: 50%;\n                position: relative;\n                transform: translateY(-50%);\n                display: block;\n                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);\n            }\n            </style>\n\n            <span class="span-new">License expired or Server Error. Check Discord</span>\n\n        ';
				b.insertBefore(c, b.children[0]);
				Lf(45E3)
			}
		});
		return !1
	}
	async function kj(b, c, e) {
		function h(k) {
			const g = [];
			for (let l = 0; l < k.length; l += 2) g.push(parseInt(k.substr(l, 2), 16));
			return new Uint8Array(g)
		}
		try {
			if (!e) return !1;
			const [k, g] = e.split(":"), l = h(k), q = h(g);
			if (b !== wa) return !1;
			const n = await window.crypto.subtle.importKey(String.fromCharCode(114, 97, 119), h("46d9ef519c1474cf8699ba24ab2a726a"), {
					name: String.fromCharCode(65, 69, 83) + "-CBC"
				}, !1, [String.fromCharCode(100, 101, 99, 114, 121, 112, 116)]),
				m = await window.crypto.subtle.decrypt({
					name: String.fromCharCode(65,
						69, 83) + "-CBC",
					iv: l
				}, n, q),
				r = (new TextDecoder).decode(new Uint8Array(m)),
				x = new Date(r);
			x.setHours(0, 0, 0, 0);
			if (!0 !== c) return !1;
			const u = new Date,
				w = new Date(u.setMonth(u.getMonth() + 13));
			return x > w || r < u ? !1 : !0
		} catch {
			throw hb(), Error("supportDev");
		}
	}

	function zc(b) {
		return 36E5 * Number(b.split(":")[0]) + 6E4 * Number(b.split(":")[1]) + 1E3 * Number(b.split(":")[2])
	}

	function lj() {
		function b(g, l) {
			ub ? alert("A repair process is already running.") : (k.yn = l, jQuery(".gladbot-worbench-button").addClass("disabled"), k.u(), k.xn = [], k.queue = 0, jQuery(document.body).addClass("workbench-cursor"), jQuery(document.body).on("contextmenu", function(q) {
				q.preventDefault();
				jQuery(document.body).removeClass("workbench-cursor");
				jQuery(document.body).off("contextmenu")
			}), jQuery("#inv .ui-draggable, #char .ui-draggable").mouseup(async q => {
				q = q.target;
				var n = q.className.match(/item-i-(\d+)-\d+/)[1],
					m = document.querySelector(".charmercsel.active").getAttribute("onclick").toString().match(/doll=(\d+)/),
					r = k.freeSlots.shift()["forge_slots.slot"];
				m = m[1];
				r = {
					item: {
						type: n,
						name: Zb(q),
						quality: nb(q),
						slot: r,
						container: q.getAttribute("data-container-number"),
						doll: m
					},
					spot: {
						bag: q.getAttribute("data-container-number"),
						x: q.getAttribute("data-position-x"),
						y: q.getAttribute("data-position-y")
					}
				};
				localStorage.setItem("workbench_itemList1", JSON.stringify(r));
				if (jQuery(q).parents("#char").length)
					if (ub) alert("A repair process is already running.");
					else {
						if (n = document.querySelector("#inventory_nav .awesome-tabs.current")) n = n.getAttribute("data-bag-number"), localStorage.setItem("workbench_itemBag",
							n);
						var {
							spot: x,
							bag: u
						} = await dc(2, 3);
						k.qa = {
							bag: u,
							x: x.x + 1,
							y: x.y + 1
						};
						k.Dn(q);
						k.Mm(q, 0, m);
						ub = !0
					}
				else if (jQuery(q).parents("#inv").length) {
					if (m = document.querySelector("#inventory_nav .awesome-tabs.current")) m = m.getAttribute("data-bag-number"), localStorage.setItem("workbench_itemBag", m);
					k.qa = {
						bag: q.getAttribute("data-container-number"),
						x: q.getAttribute("data-position-x"),
						y: q.getAttribute("data-position-y")
					};
					ub ? alert("A repair process is already running.") : (k.Dn(q), q = q.getAttribute("data-item-id"), k.kj(q),
						ub = !0)
				} else k.queue++, k.Lo(q), k.Rm(n)
			}))
		}

		function c(g, l, q) {
			l = jQuery("<button>").html(l).addClass(q);
			jQuery(g).append(l);
			return l
		}
		async function e() {
			try {
				const g = await jQuery.post(U({}), {
					mod: "forge",
					submod: "getWorkbenchPreview",
					mode: "workbench",
					a: (new Date).getTime(),
					sh: X("sh")
				});
				k.slots = JSON.parse(g).slots;
				k.spaces = k.slots.filter(l => "closed" === l["forge_slots.state"]).length;
				k.freeSlots = k.slots.filter(l => "closed" === l["forge_slots.state"])
			} catch (g) {}
		}
		async function h() {
			try {
				const g = X("sh"),
					l = document.querySelectorAll("#inv .ui-draggable"),
					q = [512, 256, 2, 8, 4, 1, 1024, 48];
				let n = 5;
				ab("Sending items to packages...");
				await e();
				if (0 < k.spaces) {
					for (let m of k.slots)
						if ("closed" === m["forge_slots.state"]) {
							n = m["forge_slots.slot"];
							break
						} for (let m of l) {
						const r = parseInt(m.getAttribute("data-content-type"), 10);
						if (q.includes(r)) {
							const x = m.getAttribute("data-item-id"),
								u = Zb(m),
								w = parseInt(m.getAttribute("data-amount"), 10) || 1,
								A = {
									mod: "forge",
									submod: "getWorkbenchPreview",
									mode: "workbench",
									slot: n,
									iid: x,
									amount: w,
									a: Date.now(),
									sh: g
								};
							await jQuery.post(U({}), A);
							const D = {
								mod: "forge",
								submod: "rent",
								mode: "workbench",
								slot: n,
								rent: 2,
								item: x,
								a: Date.now(),
								sh: g
							};
							await jQuery.post(U({}), D);
							const B = {
								mod: "forge",
								submod: "cancel",
								mode: "workbench",
								slot: n,
								a: Date.now(),
								sh: g
							};
							await jQuery.post(U({}), B);
							ab(`Item name : ${u} has been sent to the packages.`);
							await new Promise(t => setTimeout(t, 500))
						}
					}
					window.location.reload()
				} else ab("No available slots in the workbench.")
			} catch (g) {}
		}
		const k = {
			yn: "full",
			async start() {
				let {
					itemList1: g,
					itemList2: l,
					repairArena: q,
					repairTurma: n
				} = ua, m = ua.selectedItem;
				m ? this.u(() => {
					switch (m.status) {
						case "toWorkbench":
							k.kj(m.iid);
							break;
						case "toFillGoods":
							k.hc(m.slot);
							break;
						case "toPackage":
							k.bd(m.slot);
							break;
						case "toBag":
							k.Ga();
							break;
						case "toInv":
							k.bm()
					}
				}) : q && 0 < g.length ? "mod=overview&doll=1" != rf ? Mf("mod=overview&doll=1") : this.u(() => {
					0 < k.spaces && this.nm(ua.itemList1)
				}) : n && 0 < l.length && ("mod=overview&doll=2" != rf ? Mf("mod=overview&doll=2") : this.u(() => {
					0 < k.spaces && this.nm(ua.itemList2)
				}))
			},
			u(g = !1) {
				jQuery.post(U({}), {
					mod: "forge",
					submod: "getWorkbenchPreview",
					mode: "workbench",
					a: (new Date).getTime(),
					sh: X("sh")
				}, l => {
					k.slots = JSON.parse(l).slots;
					k.spaces = 0;
					k.freeSlots = [];
					for (let q of k.slots) "closed" == q["forge_slots.state"] && (k.spaces++, k.freeSlots.push(q));
					g && g()
				})
			},
			nm(g) {
				let l = g.shift();
				dc(l.nn, l.pn, (q, n) => {
					jQuery.post(U({
						mod: "inventory",
						submod: "move",
						from: l.container,
						fromX: 1,
						fromY: 1,
						to: n,
						toX: q.x + 1,
						toY: q.y + 1,
						amount: 1,
						doll: l.doll
					}), {
						a: (new Date).getTime(),
						sh: X("sh")
					}, m => {
						let r = {
							item: l,
							iid: JSON.parse(m).to.data.itemId,
							status: "toWorkbench",
							spot: q,
							bag: n
						};
						localStorage.setItem("workbench_selectedItem",
							JSON.stringify(r));
						this.kj(JSON.parse(m).to.data.itemId)
					})
				})
			},
			async Mm(g, l = 0, q) {
				var n = [512, 513, 514, 515];
				if (!(l >= n.length)) {
					n = n[l];
					var m = document.getElementById("inv");
					if (m = of(m)) try {
						const x = await jQuery.post(U({
								mod: "inventory",
								submod: "move",
								from: g.getAttribute("data-container-number"),
								fromX: 1,
								fromY: 1,
								to: n,
								toX: m.x + 1,
								toY: m.y + 1,
								amount: 1,
								doll: q
							}), {
								a: (new Date).getTime(),
								sh: X("sh")
							}),
							u = JSON.parse(x);
						if (u.error) this.Mm(g, l + 1, q);
						else {
							var r = {
								item: g,
								iid: u.to.data.itemId,
								status: "toWorkbench",
								spot: m,
								bag: n
							};
							localStorage.setItem("workbench_selectedItem", JSON.stringify(r));
							localStorage.setItem("workbench_itemBag", JSON.stringify(r.bag));
							await this.kj(u.to.data.itemId)
						}
					} catch (x) {} else this.Mm(g, l + 1)
				}
			},
			async kj(g) {
				mj();
				E(`${d.yb}`);
				let l = 5;
				for (let q of k.slots) "closed" == q["forge_slots.state"] && (l = q["forge_slots.slot"]);
				jQuery.post(U({}), {
					mod: "forge",
					submod: "getWorkbenchPreview",
					mode: "workbench",
					slot: l,
					iid: g,
					amount: 1,
					a: (new Date).getTime(),
					sh: X("sh")
				}, q => {
					k.needed = JSON.parse(q).slots[l].formula.needed;
					Gh().gold >
						JSON.parse(q).slots[l].formula.rent[2] ? jQuery.post(U({}), {
							mod: "forge",
							submod: "rent",
							mode: "workbench",
							slot: l,
							rent: 2,
							item: g,
							a: (new Date).getTime(),
							sh: X("sh")
						}, () => {
							"full" == k.yn ? (localStorage.setItem("workbench_selectedItem", JSON.stringify({
								slot: l,
								status: "toFillGoods"
							})), k.hc(l)) : (localStorage.setItem("workbench_selectedItem", JSON.stringify({
								slot: l,
								status: "toFillPartial"
							})), k.Yi(l))
						}) : ab("Not enough gold to rent the workbench")
				})
			},
			hc(g, l = -1, q = !0) {
				E(`${d.Nf}`, l);
				jQuery.post(U({}), {
					mod: "forge",
					submod: "storageToWarehouse",
					mode: "workbench",
					slot: g,
					quality: l,
					a: (new Date).getTime(),
					sh: X("sh")
				}, () => {
					l < Number(localStorage.getItem("repairMaxQuality")) ? k.hc(g, ++l, q) : jQuery.post(U({}), {
						mod: "forge",
						submod: "start",
						mode: "workbench",
						slot: g,
						a: (new Date).getTime(),
						sh: X("sh")
					}, () => {
						q ? (localStorage.setItem("workbench_selectedItem", JSON.stringify({
							status: "toPackage"
						})), k.u(() => {
							k.bd(g)
						})) : (k.queue--, 0 == k.queue && window.location.reload())
					})
				})
			},
			bd(g) {
				let l = 1E3 * k.slots[g].formula.duration || 1E4;
				E(`${d.Zf}`, l);
				1 == k.cancel ? this.u(() => {
					setTimeout(() => {
						jQuery.post(U({}), {
							mod: "forge",
							submod: "cancel",
							mode: "workbench",
							slot: g,
							a: (new Date).getTime(),
							sh: X("sh")
						}, q => {
							if ("document.location.href=document.location.href;" == q) return window.location.reload();
							localStorage.setItem("workbench_selectedItem", JSON.stringify({
								status: "toBag"
							}));
							k.Ga()
						})
					}, l)
				}) : this.u(() => {
					setTimeout(() => {
						jQuery.post(U({}), {
							mod: "forge",
							submod: "lootbox",
							mode: "workbench",
							slot: g,
							a: (new Date).getTime(),
							sh: X("sh")
						}, q => {
							if ("document.location.href=document.location.href;" == q) return window.location.reload();
							localStorage.setItem("workbench_selectedItem", JSON.stringify({
								status: "toBag"
							}));
							k.Ga()
						})
					}, l)
				})
			},
			async Ga(g = 1) {
				var l = JSON.parse(localStorage.getItem("workbench_itemList1"));
				localStorage.getItem("workbench_itemBag");
				({
					item: l
				} = l);
				let q = !1;
				var n = new URL(window.location.href),
					m = n.origin;
				n = n.searchParams.get("sh") || "";
				m = new URL(`${m}/game/index.php?mod=packages&qry=&f=${l.type}&page=${g}&sh=${n}`);
				m.searchParams.set("mod", "packages");
				m.searchParams.set("f", l.type);
				m.searchParams.set("page", g);
				m.searchParams.set("sh",
					n);
				m = await (await fetch(m.href)).text();
				m = (new DOMParser).parseFromString(m, "text/html");
				var r = m.querySelector(".ui-draggable");
				n = wb(r);
				nb(r);
				r = Zb(r);
				l.name == r && l.type == n && (q = !0, jQuery.post(U({
					mod: "inventory",
					submod: "move",
					from: m.querySelector("[data-container-number]").getAttribute("data-container-number"),
					fromX: 1,
					fromY: 1,
					to: k.qa.bag,
					toX: k.qa.x,
					toY: k.qa.y,
					amount: 1
				}), {
					a: (new Date).getTime(),
					sh: X("sh")
				}, () => {
					localStorage.setItem("workbench_selectedItem", JSON.stringify({
						status: "toInv"
					}));
					k.bm()
				}));
				q || this.Ga(++g)
			},
			bm() {
				JSON.parse(localStorage.getItem("workbench_selectedItem"));
				var g = JSON.parse(localStorage.getItem("workbench_itemList1"));
				localStorage.getItem("workbench_itemBag");
				({
					item: g
				} = g);
				jQuery.post(U({
					mod: "inventory",
					submod: "move",
					from: k.qa.bag,
					fromX: k.qa.x,
					fromY: k.qa.y,
					to: g.container,
					toX: 1,
					toY: 1,
					amount: 1,
					doll: g.doll
				}), {
					a: (new Date).getTime(),
					sh: X("sh")
				}, () => {
					localStorage.setItem("workbench_selectedItem", JSON.stringify({
						status: "toInv"
					}));
					E(`${d.Qf}`);
					ub = !1;
					window.location.reload()
				})
			},
			un(g) {
				g = jQuery(g);
				g = jQuery("<div>").addClass("gbot-overlay").width(g.width()).height(g.height()).offset(g.offset()).append(jQuery('<div class="gbot-spinner"></div>'));
				jQuery(document.body).append(g)
			},
			vm(g, l, q) {
				l = jQuery("<button>").html(l).addClass(q);
				jQuery(g).append(l);
				return l
			},
			bq() {
				let g = 0;
				for (let l of k.slots) "finished-succeeded" == l["forge_slots.state"] && (g++, jQuery.post(U({}), {
					mod: "forge",
					submod: "lootbox",
					mode: "workbench",
					slot: l["forge_slots.slot"],
					a: (new Date).getTime(),
					sh: X("sh")
				}, q => {
					g--;
					if ("document.location.href=document.location.href;" == q || 0 == g) return window.location.reload()
				}))
			},
			Lo(g) {
				ac(g) && (k.un(g), k.xn.push(g))
			},
			Dn(g) {
				ac(g) && k.un(g)
			},
			Rm(g, l, q) {
				let n = k.freeSlots.shift()["forge_slots.slot"],
					m = k.xn.shift(),
					r = null !== l ? l : m.getAttribute("data-item-id"),
					x = null !== q ? q : {
						bag: m.getAttribute("data-container-number"),
						x: m.getAttribute("data-position-x"),
						y: m.getAttribute("data-position-y")
					};
				jQuery.post(U({}), {
					mod: "forge",
					submod: "getWorkbenchPreview",
					mode: "workbench",
					slot: n,
					iid: r,
					amount: 1,
					a: (new Date).getTime(),
					sh: X("sh")
				}, u => {
					let w = JSON.parse(u).slots[n].formula.needed;
					Gh().gold > JSON.parse(u).slots[n].formula.rent[2] && jQuery.post(U({}), {
						mod: "forge",
						submod: "rent",
						mode: "workbench",
						slot: n,
						rent: 2,
						item: r,
						a: (new Date).getTime(),
						sh: X("sh")
					}, () => {
						"full" == g ? k.hc(n, x, !0) : "partial" == g && k.Yi(n, x, w)
					})
				})
			},
			Yi(g, l, q) {
				let n = [];
				q = k.needed;
				for (let m in q) 0 < q[m].amount && n.push(m - 18E3);
				k.Cl(n, (m, r) => {
					m && r ? k.Dl(l, m, r, x => {
						x || console.warn("pickMaterialFromPack did not return an iid. Skipping material picking.");
						jQuery.post(U({}), {
							mod: "forge",
							submod: "toWarehouse",
							mode: "workbench",
							slot: g,
							iid: x || "defaultIid",
							amount: 1,
							a: (new Date).getTime(),
							sh: X("sh")
						}, () => {
							jQuery.post(U({}), {
								mod: "forge",
								submod: "start",
								mode: "workbench",
								slot: g,
								a: (new Date).getTime(),
								sh: X("sh")
							}, () => {
								k.queue--;
								localStorage.setItem("workbench_selectedItem", JSON.stringify({
									status: "toPackage"
								}));
								k.u(() => {
									k.bd(g)
								});
								0 == k.queue && window.location.reload()
							})
						})
					}) : (k.cancel = !0, k.u(() => {
						k.bd(g)
					}))
				})
			},
			Cl(g, l = !1, q = 0, n = -1) {
				if (q == g.length)
					if (1 > n) q = 0, n++;
					else return l &&
						l(null, null);
				jQuery.post(U({
					mod: "forge",
					submod: "storageOut"
				}), {
					type: g[q],
					quality: n,
					amount: 1,
					a: (new Date).getTime(),
					sh: X("sh")
				}).done(() => l && l(g[q], n)).fail(() => k.Cl(g, l, ++q, n))
			},
			Dl(g, l, q, n = !1, m = 1) {
				let r = !1;
				jQuery.get(G({
					mod: "packages",
					f: 18,
					fq: q,
					qry: "",
					page: 1,
					sh: X("sh")
				}), x => {
					jQuery(x).find(".packageItem").each((u, w) => {
						var A = jQuery(w).find(".ui-draggable");
						u = A.context.querySelector("input").getAttribute("value");
						w = xb(A[0]).split("-")[1];
						A = nb(A[0]);
						l == w && q == A && (r = !0, jQuery.post(U({
							mod: "inventory",
							submod: "move",
							from: "-" + u,
							fromX: 1,
							fromY: 1,
							to: k.qa.bag,
							toX: k.qa.x,
							toY: k.qa.y,
							amount: 1
						}), {
							a: (new Date).getTime(),
							sh: X("sh")
						}, D => {
							n && n(JSON.parse(D).to.data.itemId)
						}))
					});
					r || k.Dl(g, l, q, n, ++m)
				})
			}
		};
		jQuery("#inv").after('\n              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">\n    \n                <fieldset id="gladbot-workbench" style="\n                  padding: 10px;\n                  margin: 10px 20px;\n                  text-align: center;\n                  display: flex;\n                  flex-direction: row;\n                  flex-wrap: wrap;\n                  align-items: center;\n                  justify-content: space-around;\n                  border: 2px solid darkred;\n                  border-radius: 8px;\n                  width: 235px;">\n                  <legend style="\n                    padding: 0 10px;\n                    color: darkred;\n                    font-weight: bold;">Gladbot Workbench Area</legend>\n                    <span class="span-new">Make sure last workbench slot is available, and make sure there\'s 3x3 space available. Repair only works for the equipments on the character. If you dont see the inventory, install Crazy-Addon.</span>\n                </fieldset>');
		c("#gladbot-workbench", '<i class="fa fa-wrench"></i>', "gladbot-button gladbot-worbench-button-full gladbot-stylish-button").attr("title", "Use this for full repair. You can only repair one item at a time.").mouseup(g => {
			b(g, "full")
		});
		c("#gladbot-workbench", '<i class="fa fa-hammer"></i>', "gladbot-button gladbot-worbench-button-full gladbot-stylish-button").attr("title", "Use this for partial repair. You can only repair one item at a time.").mouseup(g => {
			b(g, "partial")
		});
		c("#gladbot-workbench", '<i class="fa fa-undo"></i>',
			"gladbot-button gladbot-worbench-button-reset gladbot-stylish-button").attr("title", "If an item is stuck and not repairing, click this button to reset.").mouseup(() => {
			ub = !1
		});
		c("#gladbot-workbench", "Send items in the current inventory to packages", "gladbot-button gladbot-inventory-send-button gladbot-stylish-button").attr("title", "Click this button to send items from the current inventory to packages.").mouseup(async () => {
			await h()
		})
	}

	function ab(b) {
		const c = document.createElement("div");
		c.className =
			"notification-popup";
		c.innerText = b;
		c.style.position = "fixed";
		c.style.bottom = "20px";
		c.style.right = "20px";
		c.style.padding = "10px 20px";
		c.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
		c.style.color = "white";
		c.style.borderRadius = "5px";
		c.style.fontSize = "14px";
		c.style.zIndex = "9999";
		document.body.appendChild(c);
		setTimeout(() => {
			c.remove()
		}, 3E3)
	}

	function kh(b, c, e, h, k, g) {
		const l = document.createElement("span");
		l.className = c;
		l.innerHTML = b;
		l.title = g;
		l.style.cursor = e;
		l.style.fontSize = h;
		l.style.top = "70px";
		l.style.position =
			"absolute";
		l.style.right = k;
		return l
	}

	function lh(b, c) {
		try {
			var e = JSON.parse(b.replace(/&quot;/g, '"'))
		} catch (q) {
			return {}
		}
		b = e[0] ? e[0][0] : null;
		e = e[0] ? e[0][0][0] : null;
		var h = b[0];
		h = "string" !== typeof h ? "" : h.split(" ")[0];
		const k = cc(b[0]),
			g = c.getAttribute("data-quality"),
			l = c.getAttribute("data-content-type");
		c = c.getAttribute("data-level");
		return {
			itemName: b,
			kn: h,
			ln: k,
			itemColor: {
				"-1": "white",
				0: "green",
				1: "blue",
				2: "purple",
				3: "orange",
				4: "red"
			} [g] || "white",
			itemType: l,
			itemLevel: c,
			dn: e
		}
	}
	async function mj() {
		const b =
			G({
				mod: "packages",
				submod: "sort",
				page: "1",
				sh: X("sh")
			});
		return await jQuery.post(b, {
			packageSorting: "in_desc"
		})
	}
	async function nj() {
		var b = localStorage.getItem("PackageSort") || "in_desc",
			c = await ia.km();
		let e = [];
		var h = Math.min(10, c);
		if ("del_asc" === b || "in_asc" === b)
			for (c = 1; c <= h; c++) e.push(c);
		else
			for (b = c; b > c - h; b--) e.push(b);
		h = [];
		for (const k of e) try {
			const g = await jQuery.get(G({
				mod: "packages",
				f: "0",
				fq: "-1",
				qry: "",
				page: k.toString(),
				sh: X("sh")
			}));
			h.push(g)
		} catch (g) {
			E(`Error fetching pages ${k}: ${g.message}`)
		}
		return h.flat()
	}
	async function oj(b, c) {
		if ("mod=guildMarket" != rf) Mf("mod=guildMarket");
		else {
			E(`${d.wf}`);
			var e = {
					TOOLS: ["2097152", "1048576", "8388608", "4194304"],
					WEAPONS: ["2"],
					SHIELD: ["4"],
					CHEST: ["8"],
					HELMET: ["1"],
					GLOVES: ["256"],
					SHOES: ["512"],
					RINGS: ["48"],
					AMULETS: ["1024"],
					USABLES: ["4096", "32768"],
					FOOD: ["64"],
					UPGRADES: ["4096"],
					RECIPES: ["8192"],
					MERCENARY: ["16384"],
					SCROLLS: ["64"],
					REINFORCEMENTS: ["4096"]
				},
				h = JSON.parse(localStorage.getItem("resetColors")) || {
					colors: []
				},
				k = "true" === localStorage.getItem("resetUnderworld"),
				g =
				(await nj()).map(w => jQuery(w).find(".packageItem").toArray()).flat();
			b = 24 * b;
			var l = !1;
			for (const w of g) {
				g = w.querySelector("span[data-ticker-type]");
				if (!g) continue;
				g = g.getAttribute("data-ticker-time-left");
				if (!g) continue;
				g = g / 1E3 / 60 / 60;
				var q = w.querySelector("div[data-content-type]");
				const A = q ? q.getAttribute("data-content-type") : null;
				q = (q = w.querySelector(".ui-draggable")) ? q.getAttribute("data-basis") : null;
				if (("64" !== A || !q || c.includes("SCROLLS") && q.startsWith("20") || c.includes("FOOD") && q.startsWith("7") ||
						c.includes("REINFORCEMENTS") && q.startsWith("11")) && g <= b && (c.some(D => e[D].includes(A)) || k)) {
					q = w.querySelector("div[data-container-number]");
					var n = void 0,
						m = void 0;
					g = (m = w.querySelector("div[data-amount]")) ? m.getAttribute("data-amount") : null;
					var r = m ? m.getAttribute("data-quality") : null;
					k && (n = m ? m.getAttribute("data-basis") : null, m = m ? m.getAttribute("data-hash") : null, n = Ib(n, m));
					if (!k || n)
						if (!(null !== r && 0 < h.colors.length) || h.colors.includes(r)) {
							q = q ? q.getAttribute("data-container-number") : null;
							r = w.querySelector("div[data-measurement-x]").getAttribute("data-measurement-x");
							m = w.querySelector("div[data-measurement-y]").getAttribute("data-measurement-y");
							l = w.querySelector("div[data-tooltip]").getAttribute("data-tooltip");
							var x = df(l);
							l = !0;
							await pj(w, q, x, g, r, m);
							g = X("sh");
							g = `${window.location.origin}/game/index.php?mod=guildMarket&fl=0&fq=-1&f=0&qry=&seller=&s=p&p=1&&sh=${g}`;
							q = await (await fetch(g)).text();
							q = (new DOMParser).parseFromString(q, "text/html").querySelectorAll("#market_table tr");
							if ((r = document.querySelector('input[type="submit"][name="anbieten"][value="Offer"]')) &&
								r.disabled) g = JSON.parse(localStorage.getItem("Timers")), Z("resetExpired", g.ResetExpired || 10), E(`${d.Ef}`);
							else
								for (r = 1; r < q.length; r++) {
									var u = q[r];
									m = u.querySelectorAll("td")[2];
									x = u.querySelector('input[name="cancel"]');
									u = (u = u.querySelector("div[data-item-id]")) ? u.getAttribute("data-item-id") : null;
									x && Number(m.textContent.replace(/\./g, "")) === Number(mh) && (await fetch(g, {
										method: "POST",
										headers: {
											"Content-Type": "application/x-www-form-urlencoded"
										},
										body: new URLSearchParams({
											buyid: u,
											qry: "",
											seller: "",
											f: 0,
											fl: 0,
											fq: -1,
											s: "",
											p: 1,
											cancel: "Cancel"
										})
									}), E(`${d.xf}`), ja("itemReset", 0))
								}
						}
				}
			}
			if (!l || l) c = JSON.parse(localStorage.getItem("Timers")), Z("resetExpired", c.ResetExpired || 10), window.location.reload()
		}
	}
	async function pj(b, c, e, h, k, g) {
		let {
			spot: l,
			bag: q
		} = await dc(k, g);
		try {
			const n = await jQuery.post(U({
				mod: "inventory",
				submod: "move",
				from: c,
				fromX: 1,
				fromY: 1,
				to: q,
				toX: l.x + 1,
				toY: l.y + 1,
				amount: h
			}), {
				a: (new Date).getTime(),
				sh: X("sh")
			});
			if (n) {
				const m = Math.floor(41 * Math.random()) + 10;
				mh = m;
				const r = JSON.parse(n).to.data.itemId;
				await qj(c,
					m, r)
			}
		} catch (n) {
			E(`${d.yf}`), b = JSON.parse(localStorage.getItem("Timers")), Z("resetExpired", b.ResetExpired || 10), window.location.reload()
		}
	}
	async function qj(b, c, e) {
		await jQuery.post(G({
			mod: "guildMarket",
			sh: X("sh")
		}), {
			sellid: e,
			preis: c,
			dauer: 1,
			sell_mode: 0,
			anbieten: "Offer"
		})
	}
	async function rj() {
		if (!1 !== JSON.parse(localStorage.getItem("underworld") || "{}").isUnderworld || "true" !== localStorage.getItem("BuffUnderworldOnly")) {
			"mod=overview&doll=1" != rf && Mf("mod=overview&doll=1");
			var b = {
					"11-23": {
						type: "Health",
						item: "Gingko"
					},
					"11-22": {
						type: "Health",
						item: "Taigaroot"
					},
					"11-21": {
						type: "Health",
						item: "Hawthorn"
					},
					"11-1": {
						type: "Strength",
						item: "Flask"
					},
					"11-2": {
						type: "Strength",
						item: "Ampulla"
					},
					"11-3": {
						type: "Strength",
						item: "Flacon"
					},
					"11-4": {
						type: "Strength",
						item: "Bottle"
					},
					"11-13": {
						type: "Constitution",
						item: "Flask"
					},
					"11-14": {
						type: "Constitution",
						item: "Ampulla"
					},
					"11-15": {
						type: "Constitution",
						item: "Flacon"
					},
					"11-16": {
						type: "Constitution",
						item: "Bottle"
					},
					"11-9": {
						type: "Agility",
						item: "Flask"
					},
					"11-10": {
						type: "Agility",
						item: "Ampulla"
					},
					"11-11": {
						type: "Agility",
						item: "Flacon"
					},
					"11-12": {
						type: "Agility",
						item: "Bottle"
					},
					"11-17": {
						type: "Charisma",
						item: "Flask"
					},
					"11-18": {
						type: "Charisma",
						item: "Ampulla"
					},
					"11-19": {
						type: "Charisma",
						item: "Flacon"
					},
					"11-20": {
						type: "Charisma",
						item: "Bottle"
					},
					"11-24": {
						type: "Intelligence",
						item: "Flask"
					},
					"11-25": {
						type: "Intelligence",
						item: "Ampulla"
					},
					"11-26": {
						type: "Intelligence",
						item: "Flacon"
					},
					"11-27": {
						type: "Intelligence",
						item: "Bottle"
					},
					"11-5": {
						type: "Dexterity",
						item: "Flask"
					},
					"11-6": {
						type: "Dexterity",
						item: "Ampulla"
					},
					"11-7": {
						type: "Dexterity",
						item: "Flacon"
					},
					"11-8": {
						type: "Dexterity",
						item: "Bottle"
					}
				},
				c = JSON.parse(localStorage.getItem("buffs")) || {},
				e = JSON.parse(localStorage.getItem("Timers")),
				h = JSON.parse(localStorage.getItem("buffSelections")) || {};
			for (const g in h) {
				var k = h[g];
				let l = null;
				if (0 < k.length)
					for (let q of k)
						if (Object.entries(b).find(([, n]) => n.type === g && n.item === q) && !Object.keys(c).find(n => n.includes(g) && n.includes(q) && 0 < c[n].timeLeft)) try {
							let n = !1,
								m = null;
							for (k = 1; 3 >= k; k++) {
								const r = await jQuery.get(G({
									mod: "packages",
									f: 11,
									fq: -1,
									qry: "",
									page: k,
									sh: X("sh")
								}));
								jQuery(r).find(".packageItem").each(function(x, u) {
									x = jQuery(u).find(".ui-draggable").attr("data-basis");
									if ((x = b[x]) && x.type === g && x.item === q) {
										const w = x.item;
										l = w;
										if (Object.keys(c).some(A => A.includes(g) && A.includes(w))) return !0;
										n = !0;
										m = jQuery(u);
										return !1
									}
								});
								if (n) break
							}
							if (n && m) try {
								await dc(1, 1, async (r, x) => {
									const u = m.find('input[name="packages[]"]').val(),
										w = m.find(".ui-draggable").attr("data-position-x"),
										A = m.find(".ui-draggable").attr("data-position-y");
									await new Promise(D => setTimeout(D,
										250));
									await jQuery.post(U({
										mod: "inventory",
										submod: "move",
										from: "-" + u,
										fromX: w,
										fromY: A,
										to: x,
										toX: r.x + 1,
										toY: r.y + 1,
										amount: 1,
										doll: 1,
										a: (new Date).getTime(),
										sh: X("sh")
									}));
									E(`${g} buff (${q}) has been moved to the inventory.`);
									await new Promise(D => setTimeout(D, 250));
									await jQuery.post(U({
										mod: "inventory",
										submod: "move",
										from: x,
										fromX: r.x + 1,
										fromY: r.y + 1,
										to: 8,
										toX: 1,
										toY: 1,
										amount: 1,
										doll: 1,
										a: (new Date).getTime(),
										sh: X("sh")
									}));
									c[`${g} - ${l}`] = {
										timeLeft: m.find(".ticker").attr("data-ticker-time-left") / 6E4
									};
									localStorage.setItem("buffs",
										JSON.stringify(c))
								})
							} catch (r) {
								Z("BuffCheck", e.BuffTimer || 60), E(`Error moving or using ${g} buff (${q}):`, r)
							} else Z("BuffCheck", e.BuffTimer || 60), E(`No ${g} buff found for ${q}.`)
						} catch (n) {
							Z("BuffCheck", e.BuffTimer || 60), E("Error fetching buffs from packages:", n)
						}
			}
		}
	}

	function sj() {
		const b = Date.now(),
			c = JSON.parse(localStorage.getItem("activeItemsGladiator") || "{}"),
			e = JSON.parse(localStorage.getItem("disabledTimeGladiator") || "{}"),
			h = JSON.parse(localStorage.getItem("activeItemsMercenary") || "{}"),
			k = JSON.parse(localStorage.getItem("disabledTimeMercenary") ||
				"{}");
		Object.entries(e).forEach(([g, l]) => {
			3E5 < b - l && (c[g] = !0, delete e[g])
		});
		Object.entries(k).forEach(([g, l]) => {
			3E5 < b - l && (h[g] = !0, delete k[g])
		});
		localStorage.setItem("activeItemsGladiator", JSON.stringify(c));
		localStorage.setItem("disabledTimeGladiator", JSON.stringify(e));
		localStorage.setItem("activeItemsMercenary", JSON.stringify(h));
		localStorage.setItem("disabledTimeMercenary", JSON.stringify(k))
	}

	function ef() {
		const b = localStorage.getItem("healPercentage") || 25;
		var c = (new Date).getTime();
		let e = !1;
		if (fa <
			new Date) throw hb(), Error("SupportDevs");
		const h = [];
		if (!0 === Ca && aa == wa) {
			var k = zc(document.getElementById("cooldown_bar_text_expedition").innerText);
			h.push({
				name: "expedition",
				time: k,
				index: 0
			})
		}!0 === Ga && aa == wa && (k = zc(document.getElementById("cooldown_bar_text_dungeon").innerText), h.push({
			name: "dungeon",
			time: k,
			index: 1
		}));
		!0 === Ha && (k = zc(document.getElementById("cooldown_bar_text_arena").innerText), h.push({
			name: "arena",
			time: k,
			index: 2
		}));
		!0 === Da && (k = zc(document.getElementById("cooldown_bar_text_ct").innerText),
			h.push({
				name: "circusTurma",
				time: k,
				index: 3
			}));
		!0 === Ea && (c = localStorage.getItem("eventPoints.timeOut") - c, h.push({
			name: "eventExpedition",
			time: c,
			index: 4
		}));
		"true" === sessionStorage.getItem("autoGoActive") && !1 === Da && !1 === Ha && !1 === Ca && !1 === Ga && "true" === localStorage.getItem("activateAuction2") && Lf(2E4);
		const g = function(u) {
			let w = 0;
			for (; w < u.length && !u[w];) w++;
			if (w === u.length) return null;
			let A = u[w].time;
			for (let D = w + 1; D < u.length; D++) u[D] && u[D].time < A && (A = u[D].time, w = D);
			return u[w]
		}(h);

		function l(u) {
			if (1E3 > u) return "0:00:00";
			u = Math.round(u / 1E3);
			let w = u % 60;
			10 > w && (w = "0" + w);
			u = (u - w) / 60;
			let A = u % 60;
			10 > A && (A = "0" + A);
			return (u - A) / 60 + ":" + A + ":" + w
		}
		let q = document.getElementById("nextActionWindow");
		const n = (JSON.parse(localStorage.getItem("underworld")) || {}).isUnderworld;
		q || (q = document.createElement("div"), q.setAttribute("id", "nextActionWindow"), q.setAttribute("style", "\n                display: block;\n                align-items: center;\n                justify-content: center;\n                position: absolute;\n                top: -3px;\n                left: 50%;\n                transform: translateX(-50%);\n                height: 50px;\n                width: 190px;\n                color: black;\n                background: rgba(196, 172, 112, 0.9);\n                border-radius: 10px;\n                font-size: 16px;\n                font-family: 'Open Sans', sans-serif;\n                letter-spacing: 0.5px;\n                border: 1px solid black;\n                z-index: 1999;\n                \n                  "),
			g && g.time && !String(g.time).includes("NaN") ? q.innerHTML = `
                              <span class="span-new" style="color: black;">${d.cd}: </span>
                              <span class="span-new">${d[g.name]}</span></br>
                              <span class="span-new" style="color: black;">${d.Cc}: </span>
                              <span class="span-new">${l(g.time)}</span>` : q.innerHTML = '\n                              <span class="span-new">Please select an action. [Exp|Dungeon|Arena|Circus]</span></br>', document.getElementById("header_game").insertBefore(q, document.getElementById("header_game").children[0]));

		function m(u) {
			if (!0 === n) {
				if (!0 === (JSON.parse(localStorage.getItem("underworld")) || {}).isUnderworld) switch (u) {
					case "expedition":
						return "cooldown_bar_expedition";
					case "circusTurma":
						if (Da) return "cooldown_bar_ct";
					default:
						return null
				}
			} else switch (u) {
				case "expedition":
					if (Ca) return "cooldown_bar_expedition";
					break;
				case "dungeon":
					if (Ga) return "cooldown_bar_dungeon";
					break;
				case "arena":
					if (Ha) return "cooldown_bar_arena";
					break;
				case "circusTurma":
					if (Da) return "cooldown_bar_ct";
					break;
				case "eventExpedition":
					if (Ea) return null;
					break;
				default:
					return null
			}
		}

		function r(u) {
			if ("arena" == u && tf("arena")) {
				if ((u = document.getElementById("cooldown_bar_arena")) && "none" !== u.style.display) return !u.querySelector(".cooldown_bar_text").classList.contains("ticker")
			} else if ("circusTurma" ==
				u && tf("circus")) {
				if ((u = document.getElementById("cooldown_bar_ct")) && "none" !== u.style.display) return !u.querySelector(".cooldown_bar_text").classList.contains("ticker")
			} else if ("expedition" == u) {
				if ((u = document.getElementById("cooldown_bar_expedition")) && "none" !== u.style.display) return !u.querySelector(".cooldown_bar_text").classList.contains("ticker")
			} else if ("dungeon" == u) {
				if ((u = document.getElementById("cooldown_bar_dungeon")) && "none" !== u.style.display) return !u.querySelector(".cooldown_bar_text").classList.contains("ticker")
			} else if ("eventExpedition" ==
				u && Ea) return Array.from(document.getElementsByClassName("cooldown_bar_link")).some(w => (w = w.closest(".cooldown_bar")) && "none" !== w.style.display ? !w.querySelector(".cooldown_bar_text").classList.contains("ticker") : !1);
			return !1
		}

		function x(u) {
			try {
				if ("eventExpedition" === u && tf("eventPoints") && 1 == Ea && ("true" === localStorage.getItem("HealEnabled") ? da.o > Number(b) : 1)) try {
					const w = document.getElementById("submenu2").getElementsByClassName("menuitem glow")[0];
					return w ? (w.click(), e = !0) : !1
				} catch (w) {
					return E("Error performing eventExpedition action: " +
						w), !1
				} else {
					const w = m(u);
					if (w) {
						const A = document.getElementById(w);
						if (A) {
							const D = A.querySelector(".cooldown_bar_link");
							if (n && r(u) && !Ca) return !1;
							if (D && r(u)) return D.click(), !0
						}
					}
				}
			} catch (w) {
				window.location.reload()
			}
		}
		if ("true" === sessionStorage.getItem("autoGoActive")) {
			const u = ["expedition", "dungeon", "arena", "circusTurma", "eventExpedition"];
			let w = 0;

			function A() {
				let t = Date.now();
				if (400 > t - w) requestAnimationFrame(A);
				else {
					for (const v of u)
						if (r(v) && (e = x(v))) {
							w = t;
							return
						} e || requestAnimationFrame(A)
				}
			}
			A();
			setInterval(() => {
				if (g) {
					g.time -= 1E3;
					if (g && (D !== g.name || B !== g.time)) {
						var t = !g || isNaN(g.time) || String(g.time).includes("NaN") ? `<span class="span-new">${d.ba}</span></br>` : `
                            <span class="span-new" style="color: black;">${d.cd}: </span>
                            <span class="span-new">${d[g.name]}</span></br>
                            <span class="span-new" style="color: black;">${d.Cc}: </span>
                            <span class="span-new">${l(g.time)}</span>`;
						q.innerHTML = t;
						D = g.name;
						B = g.time;
						sa && !0 === Na && V() && "mod=quests" != rf && Mf("mod=quests")
					}(0 >= g.time || r(g.name)) && x(g.name)
				}
			}, 1E3);
			let D = null,
				B = -1
		}
	}(function() {
		if ("true" === localStorage.getItem("disableBG")) {
			var b = document.getElementById("wrapper_game");
			b && (b.style.backgroundImage = "none", b.style.backgroundColor = "black")
		}
		let c = setTimeout(() => {
			chrome.runtime.sendMessage({
				Up: !0
			})
		}, 1E4);
		window.onload = function() {
			clearTimeout(c);
			chrome.runtime.sendMessage({
				Vp: !0
			})
		};
		let e = !1;
		document.addEventListener("touchstart", function(h) {
			function k(l) {
				setTimeout(function() {
					var q = new MouseEvent("click", {
						bubbles: !0,
						cancelable: !0,
						view: window
					});
					l.dispatchEvent(q)
				}, 150)
			}
			var g = h.target;
			try {
				if ("AuctionaddPrefixButton" == g.id || "AuctionaddSuffixButton" == g.id || "Strength" == g.htmlFor || "Dexterity" == g.htmlFor || "Agility" == g.htmlFor || "Constitution" == g.htmlFor || "Charisma" == g.htmlFor || "Intelligence" == g.htmlFor || "costumes_button_left" === g.offsetParent.id || "costumes_button_right" === g.offsetParent.id ||
					"buy_rubies_link" === g.offsetParent.id || "footer_inner" === g.offsetParent.id || "footer_logos" === g.offsetParent.id || "content" === g.id || "sidebar" === g.id || "char" === g.id || "a.menuitem.advanced_menu_link" == g.className || "a.menuitem.advanced_menu_link active" == g.className || "a.menuitem.advanced_menu_link active" == g.className || "menuitem" == g.className || "menuitem " == g.className || "menuitem advanced_menu_link" == g.className || "menuitem active advanced_menu_link_active" == g.className || "set_dungeon_difficulty_normal" != g.id &&
					"set_dungeon_difficulty_advanced" != g.id && "set_event_monster_id_0" != g.id && "set_event_monster_id_1" != g.id && "set_event_monster_id_2" != g.id && "set_event_monster_id_3" != g.id && "do_combat_quests" != g.id && "do_arena_quests" != g.id && "do_circus_quests" != g.id && "do_expedition_quests" != g.id && "do_dungeon_quests" != g.id && "do_items_quests" != g.id && "ConstitutionPriority" != g.id && "CharismaPriority" != g.id && "IntelligencePriority" != g.id && "StrengthPriority" != g.id && "DexterityPriority" != g.id && "AgilityPriority" != g.id && "shoes-image" !=
					g.className && "ring1-image" != g.className && "ring2-image" != g.className && "helmet-image" != g.className && "necklace-image" != g.className && "sword-image" != g.className && "chest-image" != g.className && "shield-image" != g.className && "gloves-image" != g.className && ("div" == g.localName && "overlayBack" !== g.id || "div" == g.localName && "licotok" !== g.id)) return
			} catch {}
			e || "checkbox" === g.type && "switch" === g.className || (e = !0, k(g), "submit" !== g.type && "checkbox" !== g.type && "switch" !== g.className || h.preventDefault());
			e = !1
		}, {
			passive: !1
		});
		try {
			chrome && chrome.runtime && chrome.runtime.sendMessage && "true" === sessionStorage.getItem("autoGoActive") && (chrome.runtime.sendMessage({
				vn: !0,
				xm: "https://raw.githubusercontent.com/fociisoftware/glbt/main/aud.mp3"
			}), chrome.runtime.sendMessage({
				keepAlive: !0
			}, () => {}));
			let h = localStorage.getItem("activeItemsMercenary"),
				k = localStorage.getItem("activeItemsGladiator");
			null !== h && h !== JSON.stringify([]) || localStorage.setItem("activeItemsMercenary", JSON.stringify({}));
			null !== k && k !== JSON.stringify([]) || localStorage.setItem("activeItemsGladiator",
				JSON.stringify({}));
			chrome.runtime.onMessage.addListener(g => {
				g.vn && g.xm && "true" === sessionStorage.getItem("autoGoActive") && (g = new Audio(g.xm), g.loop = !0, g.volume = 0, g.play().catch(() => {}))
			})
		} catch {
			console.log("Could not play the audio")
		}(b = JSON.parse(localStorage.getItem("timeConditions")) || [], 1 > b.length) && !window.location.href.includes("/index.php?mod=hermit&submod=travel") && !window.location.href.includes("/index.php?mod=packages") && !window.location.href.includes("/index.php?mod=forge") ? setTimeout(function() {
				window.location.reload()
			},
			36E4) : window.location.href.includes("/index.php?mod=hermit&submod=travel") || window.location.href.includes("/index.php?mod=packages") || window.location.href.includes("/index.php?mod=forge") || setTimeout(function() {
			window.location.reload()
		}, 18E4)
	})();
	const tj = {
		start() {
			const b = async () => {
				const h = pb("gf-token-production");
				console.log("GF Token:", h);
				return h ? {
					"Content-Type": "application/json",
					headers: {
						np: `Bearer ${h}`
					}
				} : {}
			}, c = async () => {
				try {
					chrome.runtime.sendMessage({
						queryButtonClickedState: !0
					}, async h => {
						if (!h.state) {
							h = (h = document.cookie.split("; ").find(n => n.startsWith("gllastusername="))) ? h.split("=")[1] : null;
							let l = null,
								q = null;
							h && ([l, q] = h.split("-"));
							h = [];
							try {
								var k = await (await fetch("/api/users/me/accounts", await b())).json();
								h = Array.isArray(k) ? k : []
							} catch (n) {}
							h = h.sort((n, m) => new Date(m.Ao) - new Date(n.Ao));
							k = null;
							l && q && (k = h.find(n => n.name === l && String(n.id) === q));
							!k && 0 < h.length && (k = h[0]);
							if (k) {
								if (h = document.getElementById("accountlist")) {
									h = h.getElementsByClassName("rt-tr");
									for (var g of h) {
										h = g.querySelector(".player-cell");
										const n = g.querySelector(".btn.btn-primary");
										if (h && n && h.textContent.trim() === k.name) {
											n.click();
											sessionStorage.setItem("loggedIn", "true");
											return
										}
									}
								}
							} else if (g = document.getElementById("accountlist"))
								if (g = g.getElementsByClassName("btn btn-primary"), g[0]) {
									g[0].click();
									sessionStorage.setItem("loggedIn", "true");
									return
								} sessionStorage.setItem("loggedIn", "false")
						}
					})
				} catch (h) {
					sessionStorage.setItem("loggedIn", "false")
				}
			}, e = async () => {
				chrome.runtime.sendMessage({
					action: "ctab"
				}, h => {
					if (!h || !h.gr) {
						h = document.querySelectorAll(".registerForm");
						if (0 < document.querySelectorAll(".loginRegister").length || 0 < h.length) return !1;
						window.location.href.includes("/accounts") ? c() : window.location.href = "https://lobby.gladiatus.gameforge.com/en_GB/accounts"
					}
				})
			};
			(() => {
				if (!window.location.href.includes("game/index.php")) {
					const h = document.cookie.split("; ").find(g => g.startsWith("glautologin=")),
						k = h ? h.split("=")[1] : null;
					chrome.runtime.sendMessage({
						action: "ctab"
					}, g => {
						g.gr || window.location.href.includes("forum.gladiatus") || !window.location.href.includes("lobby") ||
							"true" !== k || setTimeout(e, 3500)
					})
				}
			})();
			(() => {
				var h = document.querySelectorAll('h1, h2, .error-code, h1[jstcache="0"], #main-frame-error');
				let k = !1;
				for (const g of h) {
					h = g.textContent || "";
					if (h.includes("503") || h.includes("500")) {
						k = !0;
						break
					}
					if ("main-frame-error" === g.id || g.hasAttribute("jstcache")) {
						k = !0;
						break
					}
				}
				k && (console.warn("Error detected on page. Reloading..."), setTimeout(() => {
					location.reload()
				}, 3E3))
			})()
		}
	};
	window.location.href.includes("index.php?mod=overview&submod=achievements") || window.location.href.includes("index.php?mod=overview&submod=stats") ||
		tj.start();
	const nh = localStorage.getItem("underworld"),
		Cb = nh ? JSON.parse(nh) : null,
		oh = document.querySelector('input[name="cancelTravel"]');
	try {
		document.querySelector("#header_LoginBonus") && !oh && Cb && !window.location.href.includes("/index.php?mod=hermit") && !1 === Cb.isUnderworld && document.querySelector("#linkLoginBonus").click()
	} catch {}
	let ph = document.getElementById("wrapper_game");
	if (ph && "underworld" === ph.className) {
		const b = JSON.parse(localStorage.getItem("underworld") || "{}");
		b.isUnderworld = !0;
		localStorage.setItem("underworld",
			JSON.stringify(b))
	} else {
		const b = JSON.parse(localStorage.getItem("underworld") || "{}");
		b.isUnderworld = !1;
		localStorage.setItem("underworld", JSON.stringify(b))
	}
	try {
		if ((window.location.href.includes("/index.php?mod=hermit&submod=travel") || oh || window.location.href.includes("/index.php?mod=hermit&submod=enterUnderworld")) && "true" === sessionStorage.getItem("autoGoActive") && "true" === localStorage.getItem("autoEnterHell")) {
			const b = document.querySelector('span[data-ticker-type="countdown"]');
			if (b) {
				const c = parseInt(b.getAttribute("data-ticker-time-left"),
					10);
				await new Promise(e => setTimeout(e, c - 7E3 || 358E3))
			} else await new Promise(c => setTimeout(c, 3E5));
			Mf("mod=overview")
		}
	} catch (b) {
		E(`Error in underworld wait: ${b.message}`)
	}
	const uj = "true" === localStorage.getItem("nestSearchType");
	await async function() {
		var b = "true" === localStorage.getItem("runNestDungeon");
		const c = "true" === localStorage.getItem("runNestExpedition"),
			e = "true" === localStorage.getItem("runNestEvent"),
			h = "true" === localStorage.getItem("runNestUnderworld");
		var k = document.querySelector('span[data-ticker-type="countdown"]');
		if (window.location.href.includes("/index.php?mod=reports") && !k || window.location.href.includes("/index.php?mod=guildMarket") && !k || window.location.href.includes("/index.php?mod=quests") && !k) {
			const l = localStorage.getItem("NestDelay") || 200;
			uj && await new Promise(n => setTimeout(n, l));
			k = document.getElementById("blackoutDialog");
			var g = document.getElementById("blackoutDialognotification");
			const q = document.getElementById("blackoutDialogLoginBonus");
			if (null !== k && "none" !== window.getComputedStyle(k).display) {
				g =
					localStorage.getItem("nestSearchType");
				const n = document.querySelector("#blackoutDialog.loot-modal"),
					m = "true" === sessionStorage.getItem("autoGoActive");
				if (g && n && m && (F() && b || N() && e || M() && c || (JSON.parse(localStorage.getItem("underworld")) || {}).isUnderworld && h)) {
					b = null;
					b = k.querySelectorAll(".action_buttons button");
					switch (g) {
						case "quick":
							b = b[1];
							E("Quick Search clicked");
							break;
						case "thorough":
							b = b[2];
							E("Thorough Search clicked");
							break;
						case "nothing":
							b = b[0];
							E("Return to Safety clicked");
							break;
						default:
							b = b[2],
								E("Thorough Search clicked")
					}
					b && b.click()
				}
			} else null !== q && Cb && !1 === Cb.isUnderworld ? setTimeout(() => {
				q.getElementsByTagName("input")[0]?.click()
			}, 100) : null !== g && "none" !== window.getComputedStyle(g).display && setTimeout(() => {
				const n = document.getElementById("breakDiv");
				n && n.click()
			}, 100)
		}
	}();
	let ff = !0;
	const bb = new URL(window.location.href);
	let qh = document.createElement("style");
	qh.innerHTML = "\n    #logMenu {\n      resize: vertical;\n      overflow: auto;\n      max-height: 500px;\n    }\n  ";
	document.head.appendChild(qh);
	let wf = null,
		xf = 0;
	null === localStorage.getItem("HealClothToggle") && localStorage.setItem("HealClothToggle", "false");
	window.location.href.includes("mod=auction") && T();
	const ma = JSON.parse(localStorage.getItem("userStats")) || {
		Jm: 0,
		Km: 0,
		Hm: 0,
		wm: 0,
		zm: 0,
		Cm: 0,
		Em: 0,
		Lm: 0,
		Sm: 0,
		gm: 0,
		hm: 0
	};
	let gb;
	localStorage.getItem("playerId") && Rh((localStorage.getItem("playerId") | 0) % 100 | 0);
	(function() {
		var b = "true" === localStorage.getItem("MoveButtons");
		let c = document.createElement("button");
		c.className = "menuitem breathing-light";
		c.innerHTML = "GladBOT License";
		c.setAttribute("id", "lico");
		c.addEventListener("click", Uh);
		b ? ((b = document.getElementById("lico")) && b.remove(), c.style.position = "fixed", c.style.left = "13px", c.style.bottom = "60px", c.style.zIndex = "1000", document.body.appendChild(c)) : (b = document.getElementById("mainmenu")) && b.children[0] && b.insertBefore(c, b.children[0]);
		document.head.appendChild(document.createElement("style"))
	})();
	if (window.location.href.includes("/index.php?mod=player&p") || window.location.href.includes("/index.php?mod=player&doll")) {
		var gf =
			document.querySelector(".playername.ellipsis") || document.querySelector(".playername_achievement.ellipsis"),
			vb = gf.textContent.trim();
		if (2 < vb.length) {
			var hf = document.getElementById("char");

			function b(e, h, k, g) {
				if (null !== document.getElementById("container_start")) {
					var l = window.location.href.split("p=")[1].split("&")[0],
						q = window.location.href.match(/s(\d+)-\w\w/),
						n = window.location.href.match(/s\d+-(\w\w)/);
					h = {
						playerName: h,
						aType: g,
						opponentId: l,
						serverId: q ? q[1] : null,
						country: n ? n[1] : null
					};
					k = 2 === g ? "arenacrosslist" :
						"circuscrosslist";
					var m = 2 === g ? "removeArenaList" : "removeCircusList";
					q = JSON.parse(pb(k) || "[]");
					var r = JSON.parse(pb(m) || "[]");
					n = q.findIndex(u => u.opponentId === l);
					var x = r.findIndex(u => u.opponentId === l); - 1 !== n ? (q.splice(n, 1), -1 === x && (r.push(h), ob(m, JSON.stringify(r), 7)), e.classList.remove("added"), e.setAttribute("data-tooltip", "Add to " + (2 === g ? "Arena" : "Circus"))) : (q.push(h), -1 !== x && (r.splice(x, 1), ob(m, JSON.stringify(r), 7)), e.classList.add("added"), e.setAttribute("data-tooltip", "Remove from " + (2 === g ? "Arena" :
						"Circus")));
					ob(k, JSON.stringify(q), 7)
				} else q = JSON.parse(localStorage.getItem(k)) || [], n = q.indexOf(h), -1 !== n ? (q.splice(n, 1), e.classList.remove("added"), e.setAttribute("data-tooltip", "Add to " + ("autoAttackList" === k ? "Arena" : "Circus"))) : (q.push(h), e.classList.add("added"), e.setAttribute("data-tooltip", "Remove from " + ("autoAttackList" === k ? "Arena" : "Circus"))), localStorage.setItem(k, JSON.stringify(q))
			}

			function c(e, h, k, g, l) {
				var q = document.createElement("a");
				q.className = "gladbot-button gladbot-" + e;
				q.textContent =
					h;
				q.setAttribute("data-tooltip", k);
				hf.appendChild(q);
				(JSON.parse(localStorage.getItem(g)) || []).includes(vb) && (q.classList.add("added"), q.setAttribute("data-tooltip", "Remove from " + ("autoAttackList" === g ? "Arena" : "Circus")));
				q.addEventListener("click", function() {
					b(q, vb, g, l)
				})
			}
			c("arena", "A", "GladB: Add to Arena List", "autoAttackList", 2);
			c("circus", "C", "GladB: Add to Circus List", "autoAttackCircusList", 3)
		}
	}
	const vj = localStorage.getItem("Username"),
		wa = localStorage.getItem("pid");
	let wj = localStorage.getItem("tkz_lcr");
	const xj = localStorage.getItem("tkn"),
		fc = await ta(wj, xj, wa, vj);
	window.location.href.includes("/index.php?mod") && sessionStorage.setItem("loggedIn", "false");
	if (window.location.href.includes("/index.php?mod=overview")) {
		const b = [3, 4, 5, 2, 9, 10, 6, 7, 11],
			c = [1, 2, 4, 8, 48, 256, 512, 1024];
		Vh();
		(function() {
			const k = {
					dbfa266e60c28ce109de4d9c216a2a: "Health - Gingko Leaves",
					"25925f7ce7c04483a3b4527846c04b": "Health - Taigaroot",
					"79e62e1e04445d354bcc955bb8baeb": "Health - Hawthorn",
					b306d3f65b14cb91c0f0c9de871e0a: "Strength - Flask",
					ee80ae69b48ebbeb81e52c20113709: "Constitution - Flask",
					"887d1152e2f7cba339a0a4675b3b5e": "Agility - Flask",
					"93820f465cb02d5d8828ee9a14f5fe": "Charisma - Flask",
					"2bf8795edae428b4646f8d6fd6dc4c": "Intelligence - Flask",
					"43ac2597d30a099dd7033273ac29c1": "Dexterity - Flask",
					"5368deb7929c8853843b420fb439ac": "Constitution - Bottle",
					"967321edb226ea075ac63acc701eea": "Dexterity - Bottle",
					"1c344cf484e5a87731eaf906ffd993": "Strength - Bottle",
					"8971734256abbbe0fea2bb40721953": "Intelligence - Bottle",
					d2df53b4e64ad33dc301b6bf125fd2: "Agility - Bottle",
					"37fc8feb4ead7f2e59c026af4228b3": "Charisma - Bottle",
					ce03a66b17f81394722a3fc2335a1d: "Constitution - Flacon",
					"352a093dc497a9ec659f217dc7d374": "Dexterity - Flacon",
					b5e7e6f2cd2ea3d86143894e5f9ade: "Charisma - Flacon",
					"2e8f9fc0f9b101f7ba49152cbe9779": "Strength - Flacon",
					"3b52078b78637bd54fed2e4cfb951b": "Agility - Flacon",
					a2ef931eff7cce75e07baa9ae2ac97: "Intelligence - Flacon",
					"48331278d1b0391f74ba54b4cac6d4": "Intelligence - Ampulla",
					"453199ebfb25d62f83af27b0187088": "Agility - Ampulla",
					"00ef972a002dc3040447e5cc0eb77d": "Dexterity - Ampulla",
					ce6fe5171b946cd26d5b21e87efb5d: "Strength - Ampulla",
					ddd6bc43a13d444409087b99b9f142: "Charisma - Ampulla",
					bd48bef94e6d066a8bfef716dd959a: "Constitution - Ampulla"
				},
				g = document.querySelectorAll("#buffbar_old .buff_inner");
			let l = JSON.parse(localStorage.getItem("buffs")) || {},
				q = new Set;
			g.forEach(n => {
				var m = n.querySelector("img");
				m = (m = m ? m.getAttribute("src") : null) ? m.split("/").pop().split(".")[0] : null;
				if (m = k[m])
					if (n = (n = n.parentElement.querySelector(".ticker")) ? n.getAttribute("data-ticker-time-left") : null) l[m] = {
						timeLeft: Math.round(Number(n) / 6E4)
					}, q.add(m)
			});
			Object.keys(l).forEach(n => {
				q.has(n) || delete l[n]
			});
			localStorage.setItem("buffs", JSON.stringify(l))
		})();
		const e = document.getElementById("char");
		if (e) {
			const k = document.createElement("button"),
				g = document.createElement("span");
			k.textContent = "\u21d3";
			k.className = "put-down awesome-button";
			k.style = "padding: 2.5px 5px; position: absolute; top: 235px; left: 170px; font-size: 12px; cursor: pointer;";
			k.classList.add("tooltip");
			k.appendChild(g);
			k.onclick = async function() {
				let n =
					Array.from(document.querySelectorAll("#char .ui-droppable")).filter(m => b.includes(parseInt(m.dataset.containerNumber, 10) || "0"));
				for (let m = 0; m < n.length; m++) await new Promise(r => setTimeout(r, 100)), Ba(n[m], "inv");
				await new Promise(m => setTimeout(m, 500))
			};
			e.appendChild(k);
			const l = document.createElement("button"),
				q = document.createElement("span");
			l.textContent = "\u21d1";
			l.className = "put-up awesome-button";
			l.style = "padding: 2.5px 5px; position: absolute; top: 235px; left: 192px; font-size: 12px; cursor: pointer;";
			l.classList.add("tooltip");
			l.appendChild(q);
			l.onclick = async function() {
				let n = Array.from(document.querySelectorAll("#inv .ui-draggable")).filter(m => c.includes(parseInt(m.dataset.contentType, 10)));
				for (let m = 0; m < n.length; m++) await new Promise(r => setTimeout(r, 100)), Ba(n[m], "char");
				await new Promise(m => setTimeout(m, 500))
			};
			e.appendChild(l)
		}
		if (document.getElementById("inv")) {
			async function k(n, m, r, x, u, w) {
				await jQuery.post(U({
					mod: "inventory",
					submod: "move",
					from: w,
					fromX: m + 1,
					fromY: r + 1,
					to: w,
					toX: x + 1,
					toY: u + 1,
					amount: n.dataset.amount ||
						1,
					doll: 1,
					a: (new Date).getTime(),
					sh: X("sh")
				}))
			}
			const g = document.createElement("button");
			g.id = "sort-button";
			g.textContent = "Sort Inventory";
			g.className = "sort-button awesome-button";
			g.style = "padding: 5px; margin: 5px; cursor: pointer;";
			const l = document.createElement("span");
			l.id = "loading-indicator";
			l.style = "margin-left: 10px; display: none;";
			const q = document.querySelector(".contentItem");
			q && (q.insertAdjacentElement("afterend", g), g.insertAdjacentElement("afterend", l));
			g.addEventListener("click", async function() {
				function n(B,
					t, v) {
					for (let z = 0; 5 > z; z++)
						for (let C = 0; 8 > C; C++)
							if (!u[z][C]) {
								let I = !0;
								for (let H = z; H < z + t && I; H++)
									for (let K = C; K < C + B; K++)
										if (5 <= H || 8 <= K || u[H][K]) I = !1;
								if (I) {
									if (v) {
										B = [{
											x: C - 1,
											y: z
										}, {
											x: C + B,
											y: z
										}, {
											x: C,
											y: z - 1
										}, {
											x: C,
											y: z + t
										}];
										for (const H of B)
											if (0 <= H.x && 8 > H.x && 0 <= H.y && 5 > H.y && x.find(K => {
													const L = parseInt(K.style.top, 10) / 32;
													return parseInt(K.style.left, 10) / 32 === H.x && L === H.y && K.dataset.basis.split("-")[0] === v
												})) break
									}
									return {
										x: C,
										y: z
									}
								}
							} return null
				}
				var m = document.getElementById("inv");
				document.getElementById("sort-button");
				var r = document.getElementById("loading-indicator");
				r.textContent = "Sorting...";
				r.style.display = "inline-block";
				const x = Array.from(m.getElementsByClassName("ui-draggable"));
				x.sort((B, t) => {
					const v = parseInt(B.dataset.basis.split("-")[0], 10) || 0,
						z = parseInt(t.dataset.basis.split("-")[0], 10) || 0;
					return v !== z ? v - z : (parseInt(B.dataset.measurementX, 10) * parseInt(B.dataset.measurementY, 10) || 1) - (parseInt(t.dataset.measurementX, 10) * parseInt(t.dataset.measurementY, 10) || 1)
				});
				const u = Array.from({
					length: 5
				}, () => Array(8).fill(!1));
				x.forEach(B => {
					const t = parseInt(B.style.left, 10) / 32,
						v = parseInt(B.style.top, 10) / 32,
						z = parseInt(B.dataset.measurementX, 10);
					B = parseInt(B.dataset.measurementY, 10);
					for (let C = v; C < v + B; C++)
						for (let I = t; I < t + z; I++) u[C][I] = !0
				});
				for (m = 0; m < x.length; m++) {
					var w = x[m];
					r = parseInt(w.dataset.measurementX, 10);
					const B = parseInt(w.dataset.measurementY, 10);
					var A = w.dataset.basis.split("-")[0];
					const t = parseInt(w.style.left, 10) / 32,
						v = parseInt(w.style.top, 10) / 32;
					var D = n(r, B, A);
					if (D && (A = D.x, D = D.y, t !== A || v !== D)) {
						await k(w, t, v, A, D,
							w.dataset.containerNumber);
						for (w = D; w < D + B; w++)
							for (let z = A; z < A + r; z++) u[w][z] = !0;
						for (A = v; A < v + B; A++)
							for (w = t; w < t + r; w++) u[A][w] = !1
					}
				}
				window.location.reload()
			})
		}
		const h = JSON.parse(localStorage.getItem("underworld")) || {};
		try {
			const k = document.querySelector("#avatar .ui-droppable");
			if (k) {
				const g = k.getAttribute("data-tooltip");
				g && g.toLowerCase().includes("pater") ? (h.jj = !0, localStorage.setItem("underworld", JSON.stringify(h)), Z("CheckDolls", 15)) : (h.jj = !1, localStorage.setItem("underworld", JSON.stringify(h)))
			}
		} catch {}
	}
	let Nc =
		localStorage.getItem("playerId");
	ec();
	let ub = !1,
		sa = "true" === sessionStorage.getItem("autoGoActive") ? !0 : !1,
		da;
	try {
		da = {
			level: parseInt(document.getElementById("header_values_level").innerText, 10) || 50,
			o: parseInt($("#header_values_hp_percent")[0].innerText, 10),
			gold: Number($("#sstat_gold_val")[0].innerHTML.replace(/\./g, ""))
		}
	} catch (b) {
		da = {
			level: 50
		}
	}
	const cb = document.createElement("div");
	cb.style.position = "fixed";
	cb.style.right = "10px";
	cb.style.top = "50px";
	cb.style.zIndex = "99999";
	document.body.appendChild(cb);
	const qa = document.createElement("div");
	qa.id = "logMenu";
	qa.style.width = "190px";
	qa.style.height = "210px";
	qa.style.overflowY = "hidden";
	qa.style.backgroundColor = "rgba(221, 213, 180, 0.8)";
	qa.style.border = "1px solid #c4ac70";
	qa.style.borderRadius = "10px";
	qa.style.fontFamily = "Arial, sans-serif";
	qa.style.color = "#333";
	cb.appendChild(qa);
	const db = document.createElement("h2");
	db.textContent = "Log Menu";
	db.style.backgroundColor = "rgba(196, 172, 112, 0.8)";
	db.style.color = "#333";
	db.style.margin = "0";
	db.style.padding =
		"10px 20px";
	db.style.borderTopLeftRadius = "10px";
	db.style.borderTopRightRadius = "10px";
	qa.appendChild(db);
	const Db = document.createElement("div");
	Db.id = "logEntriesContainer";
	Db.style.overflowY = "scroll";
	Db.style.height = "calc(100% - 60px)";
	Db.style.padding = "10px 20px";
	qa.appendChild(Db);
	const Qa = document.createElement("div");
	Qa.style.display = "flex";
	Qa.style.justifyContent = "space-between";
	Qa.style.marginTop = "10px";
	Qa.style.top = "calc(300px + 10px)";
	Qa.style.width = "155px";
	Qa.style.padding = "0 10px";
	Qa.style.zIndex =
		"99999";
	Qa.style.left = "0";
	cb.appendChild(Qa);
	const La = document.createElement("button");
	La.id = "clearLogsButton";
	La.textContent = "Clear Logs";
	Oc(La, "rgba(221, 213, 180, 0.8)");
	Qa.appendChild(La);
	La.addEventListener("click", function() {
		const b = document.querySelector("#logMenu");
		if (b) {
			for (; b.firstChild;) b.removeChild(b.firstChild);
			localStorage.removeItem("savedLogs")
		}
	});
	const Ub = document.createElement("button");
	Ub.id = "resetBOT";
	Ub.textContent = "Reset Bot";
	Oc(Ub, "rgba(221, 213, 180, 0.8)");
	Qa.appendChild(Ub);
	Ub.addEventListener("click", function() {
		na()
	});
	const Ra = document.createElement("button");
	Ra.textContent = "Sort Logs";
	Oc(Ra, "rgba(221, 213, 180, 0.8)");
	Qa.appendChild(Ra);
	Ra.addEventListener("click", function() {
		let b = localStorage.getItem("savedLogs");
		if (b) {
			b = JSON.parse(b);
			b.sort((e, h) => {
				e = e.split(" ")[0];
				h = h.split(" ")[0];
				return ff ? e.localeCompare(h) : h.localeCompare(e)
			});
			ff = !ff;
			for (var c = document.querySelector("#logMenu"); c.firstChild;) c.removeChild(c.firstChild);
			for (let e of b) {
				const h = document.createElement("p");
				h.style.margin = "0";
				h.style.padding = "0";
				h.style.fontSize = "12px";
				h.textContent = e;
				c.appendChild(h)
			}
			localStorage.setItem("savedLogs", JSON.stringify(b))
		}
	});
	qa.style.transition = "height 0.1s ease";
	const rh = localStorage.getItem("logMenuVisible"),
		th = "true" === localStorage.getItem("disableLogMenu");
	null === rh ? localStorage.setItem("logMenuVisible", "true") : 1 == th ? (qa.style.display = "none;", qa.style.height = "0px", qa.style.width = "0px", qa.style.border = "0px", La.style.display = "none", La.style.height = "0px", La.style.width =
		"0px", La.style.border = "0px", Ra.style.display = "none", Ra.style.height = "0px", Ra.style.width = "0px", Ra.style.border = "0px") : "true" === rh ? localStorage.getItem("logMenuHeight") : qa.style.height = "38px";
	window.location.href.includes("/hub") && (qa.style.display = "none;", qa.style.height = "0px", qa.style.width = "0px", qa.style.border = "0px", La.style.display = "none", La.style.height = "0px", La.style.width = "0px", La.style.border = "0px", Ra.style.display = "none", Ra.style.height = "0px", Ra.style.width = "0px", Ra.style.border = "0px");
	db.addEventListener("click",
		function() {
			if ("38px" !== qa.style.height) qa.style.height = "38px", localStorage.setItem("logMenuVisible", "false");
			else {
				const b = localStorage.getItem("logMenuHeight") || "210px";
				qa.style.height = b;
				localStorage.setItem("logMenuVisible", "true")
			}
		});
	qa.addEventListener("resize", Af);
	"38px" !== qa.style.height && Af();
	if (Mc()) {
		const b = "true" === localStorage.getItem("MoveButtons");
		let c = document.getElementById("mainmenu"),
			e = document.createElement("button");
		e.id = "autoGoButton";
		e.className = "customButton";
		e.innerHTML = `<span style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">${sa?
"&#9724;":"&#9658;"}</span>`;
		e.addEventListener("click", sa ? Ef : Df);
		let h = document.createElement("button");
		h.className = "customButton2";
		h.innerHTML = '<span style="position: relative; top: -12px;">&#9881;</span>';
		h.addEventListener("click", kc);
		b ? (h.style.position = "fixed", h.style.bottom = "10px", h.style.left = "10px", h.style.zIndex = "1000", e.style.position = "fixed", e.style.bottom = "10px", e.style.left = "105px", e.style.zIndex = "1000", document.body.appendChild(h), document.body.appendChild(e)) : c && (c.insertBefore(h,
			c.children[0]), c.insertBefore(e, c.children[1]))
	} else return hb(), !1;
	(function() {
		try {
			if ("mod=arena&submod=serverArena&aType=2" == rf || "mod=arena&submod=serverArena&aType=3" == rf) {
				let l = JSON.parse(localStorage.getItem("autoAttackList")) || [],
					q = JSON.parse(localStorage.getItem("autoAttackServerList")) || [],
					n = JSON.parse(localStorage.getItem("autoAttackCircusList")) || [],
					m = JSON.parse(localStorage.getItem("autoAttackCircusServerList")) || [],
					r = [...l, ...q, ...n, ...m].map(x => x.playerName);
				Array.from(document.querySelectorAll("#own2 tr")).forEach(x => {
					(x = x.querySelector("a")) && r.includes(x.innerText) && (x.style.color = "orange", x.style.fontWeight = "bold", x.style.textShadow = "1px 1px 2px #000000")
				})
			}
			var b = JSON.parse(pb("arenacrosslist") || "[]"),
				c = JSON.parse(pb("circuscrosslist") || "[]"),
				e = JSON.parse(pb("removeArenaList") || "[]"),
				h = JSON.parse(pb("removeCircusList") || "[]"),
				k = JSON.parse(localStorage.getItem("autoAttackServerList") || "[]"),
				g = JSON.parse(localStorage.getItem("autoAttackCircusServerList") || "[]");
			0 < b.length && (b.forEach(l => {
				k.some(q => q.opponentId ===
					l.opponentId) || k.push(l)
			}), localStorage.setItem("autoAttackServerList", JSON.stringify(k)), ob("arenacrosslist", JSON.stringify([]), 7));
			0 < c.length && (c.forEach(l => {
				g.some(q => q.opponentId === l.opponentId) || g.push(l)
			}), localStorage.setItem("autoAttackCircusServerList", JSON.stringify(g)), ob("circuscrosslist", JSON.stringify([]), 7));
			if (0 < e.length || 0 < h.length) k = k.filter(l => !e.some(q => q.opponentId === l.opponentId)), g = g.filter(l => !h.some(q => q.opponentId === l.opponentId)), localStorage.setItem("autoAttackServerList",
				JSON.stringify(k)), localStorage.setItem("autoAttackCircusServerList", JSON.stringify(g)), ob("removeArenaList", JSON.stringify([]), 7), ob("removeCircusList", JSON.stringify([]), 7)
		} catch {
			E("Something is wrong with HandlePlayers")
		}
	})();
	"mod=overview" == rf && Wh();
	if ("mod=location" !== rf && "mod=arena" !== rf && 0 == localStorage.getItem("eventPoints_")) {
		const b = document.getElementById("ServerQuestTime");
		if (b) {
			const c = b.querySelector("span");
			c && localStorage.setItem("eventPoints_", c.textContent)
		}
	}
	let Na = !0;
	localStorage.getItem("doQuests") &&
		(Na = "true" === localStorage.getItem("doQuests") ? !0 : !1);
	let Oa = {
		combat: !0,
		arena: !0,
		circus: !0,
		expedition: !0,
		dungeon: !0,
		items: !0
	};
	localStorage.getItem("questTypes") && (Oa = JSON.parse(localStorage.getItem("questTypes")));
	let Vb = 0;
	localStorage.getItem("nextQuestTime") && (Vb = Number(localStorage.getItem("nextQuestTime")));
	let Ca = !0;
	localStorage.getItem("doExpedition") && (Ca = "true" === localStorage.getItem("doExpedition") ? !0 : !1);
	let Uc = 0;
	localStorage.getItem("monsterId") && (Uc = Number(localStorage.getItem("monsterId")));
	let Ga = !0;
	localStorage.getItem("doDungeon") && (Ga = "true" === localStorage.getItem("doDungeon") ? !0 : !1);
	10 > da.level && (Ga = !1);
	let Jb = "advanced" === localStorage.getItem("dungeonDifficulty") ? "advanced" : "normal",
		Ha = !0;
	localStorage.getItem("doArena") && (Ha = "true" === localStorage.getItem("doArena") ? !0 : !1);
	2 > da.level && (Ha = !1);
	let Ff = "min";
	localStorage.getItem("arenaOpponentLevel") && (Ff = localStorage.getItem("arenaOpponentLevel"));
	let Da = !0;
	localStorage.getItem("doCircus") && (Da = "true" === localStorage.getItem("doCircus") ?
		!0 : !1);
	10 > da.level && (Da = !1);
	let Gf = "min";
	localStorage.getItem("circusOpponentLevel") && (Gf = localStorage.getItem("circusOpponentLevel"));
	let Ea = !0;
	localStorage.getItem("doEventExpedition") && (Ea = "true" === localStorage.getItem("doEventExpedition") ? !0 : !1);
	try {
		document.getElementById("submenu2").getElementsByClassName("menuitem glow")[0] || (Ea = !1)
	} catch {}
	let lc = 0;
	localStorage.getItem("eventMonsterId") && (lc = Number(localStorage.getItem("eventMonsterId")));
	let ib = !1;
	localStorage.getItem("AutoAuction") && (ib =
		"true" === localStorage.getItem("AutoAuction") ? !0 : !1);
	localStorage.getItem("DoOther") && localStorage.getItem("DoOther");
	let rb = !1;
	localStorage.getItem("doKasa") && (rb = "true" === localStorage.getItem("doKasa") ? !0 : !1);
	let d;
	switch (localStorage.getItem("settings.language")) {
		case "EN":
			d = {
				...Jh
			};
			break;
		case "PL":
			d = {
				...Kh
			};
			break;
		case "ES":
			d = {
				...Lh
			};
			break;
		case "TR":
			d = {
				...Mh
			};
			break;
		case "FR":
			d = {
				...Nh
			};
			break;
		case "HG":
			d = {
				...Oh
			};
			break;
		case "BR":
			d = {
				...Ph
			};
			break;
		default:
			d = {
				...Jh
			}
	}
	if (!window.location.href.includes("lobby") &&
		fa < new Date) sessionStorage.setItem("autoGoActive", "false"), hb();
	else {
		if ("true" === localStorage.getItem("activateAuction2")) {
			function b(n) {
				n.style.position = "flex";
				n.style.width = "150px";
				n.style.marginLeft = "8px";
				n.style.marginTop = "10px";
				n.style.height = "16px";
				n.style.backgroundColor = "rgba(221, 213, 180, 0.8)";
				n.style.border = "1px solid #c4ac70";
				n.style.padding = "10px";
				n.style.borderRadius = "10px";
				n.style.fontFamily = "Arial, sans-serif";
				n.style.color = "#333";
				n.style.textAlign = "center";
				n.style.zIndex = "1000"
			}
			const c = document.createElement("div");
			c.id = "auctionMPopup";
			b(c, "calc(55px + 200px + 100px + 10px + 10px + -5px)");
			c.addEventListener("click", async () => {
				Mf("mod=auction&ttype=3")
			});
			const e = document.createElement("div");
			e.id = "auctionPopup";
			b(e, "calc(100px + 200px + 100px + 10px)");
			e.addEventListener("click", async () => {
				Mf("mod=auction")
			});

			function h(n, m) {
				return `${m}: ${[d.Yb,d.Ab,d.Ib,d.Vb,d.Zb][n]||"Unknown"}`
			}
			const k = document.createElement("h3"),
				g = document.createElement("h3");
			cb.appendChild(e);
			cb.appendChild(c);
			const l = localStorage.getItem("auctionStatus"),
				q = localStorage.getItem("auctionMStatus");
			null !== l ? (k.textContent = h(parseInt(l, 10), "Gladiator"), e.appendChild(k), e.style.display = "block") : e.style.display = "none";
			null !== q ? (g.textContent = h(parseInt(q, 10), "Mercenary"), c.appendChild(g), c.style.display = "block") : c.style.display = "none";
			th && (e.style.display = "none", e.style.height = "0px", c.style.display = "none", c.style.height = "0px")
		}
		var Ac = localStorage.getItem("savedLogs");
		Ac && (Ac = JSON.parse(Ac), Ac.forEach(b => {
			const c =
				document.createElement("p");
			c.style.margin = "0";
			c.style.padding = "0";
			c.style.fontSize = "12px";
			c.textContent = b;
			Db.appendChild(c)
		}));
		var Aa = {
				async start() {
					return new Promise(() => {
						Aa.kl = Gh().gold;
						Aa.form = document.querySelectorAll("#auction_table form");
						Aa.L = [];
						const b = localStorage.getItem("auctiongladiatorenable"),
							c = localStorage.getItem("auctionmercenaryenable"),
							e = localStorage.getItem("bidFood"),
							h = localStorage.getItem("bidStatus"),
							k = localStorage.getItem("auctionStatus"),
							g = localStorage.getItem("auctionMStatus"),
							l = localStorage.getItem("auctionminlevel") || 0;
						let q = "true" === localStorage.getItem("enableMercenarySearch");
						const n = JSON.parse(localStorage.getItem("Timers")),
							m = async (x, u) => {
								try {
									E(`${d.uf}`);
									const w = await (await fetch(x)).text(),
										A = (new DOMParser).parseFromString(w, "text/html");
									await Aa.Xn(A);
									0 < Aa.L.length ? (E(`${d.vf}`), "auction" === u ? Aa.Xm(2, Aa.L.length) : Aa.Xm(3, Aa.L.length)) : ("auction" === u ? Z("auction", n.AuctionCheck || 10) : Z("auctionM", n.AuctionCheck || 10), window.location.reload());
									1 != localStorage.getItem("AuctionTurbo") &&
										Z("AuctionEmpty", 1)
								} catch (w) {
									window.location.reload()
								}
							}, r = async () => {
								var x = JSON.parse(localStorage.getItem("auctionPrefixes")) || [];
								let u = JSON.parse(localStorage.getItem("auctionSuffixes")) || [],
									w;
								var A = (new URL(window.location.href)).origin;
								try {
									1 === x.length ? w = cc(x[0]) : 1 === u.length && (w = cc(u[0]))
								} catch (D) {
									w = ""
								}
								if (q && Number(k) >= Number(h) && tf("auction") || "true" == e && Number(k) >= Number(h) && tf("auction")) rf != `mod=auction&itemType=0&itemLevel=${l}` && (A = `${A}/game/index.php?mod=auction&itemType=0&itemLevel=${l}&sh=${X("sh")}`,
									m(A, "auction"));
								else if ((1 == x.length || 1 == u.length) && "true" == b && Number(k) >= Number(h) && "false" == e && tf("auction")) x = `mod=auction&qry=${encodeURIComponent(w)}&itemType=0&itemLevel=${l}`, rf !== x && (A = `${A}/game/index.php?${x}&sh=${X("sh")}`, m(A, "auction"));
								else if (q && Number(k) >= Number(h) && "true" == e && tf("auction")) rf != `mod=auction&itemType=0&itemLevel=${l}` && (A = `${A}/game/index.php?mod=auction&itemType=0&itemLevel=${l}&sh=${X("sh")}`, m(A, "auction"));
								else if ((1 == x.length || 1 == u.length) && "true" == c && Number(g) >=
									Number(h) && "false" == e && tf("auctionM")) rf != `mod=auction&qry=${encodeURIComponent(w)}&itemType=0&ttype=3&itemLevel=${l}` && (A = `${A}/game/index.php?mod=auction&qry=${w}&itemType=0&ttype=3&itemLevel=${l}&sh=${X("sh")}`, m(A, "auctionM"));
								else if (("true" === b || "true" === e) && !q && Number(k) >= Number(h) && tf("auction"))
									if ("true" === e && 1 > x.length && 1 > u.length) rf != `mod=auction&itemType=7&itemLevel=${l}` && (A = `${A}/game/index.php?mod=auction&itemType=7&itemLevel=${l}&sh=${X("sh")}`, m(A, "auction"));
									else {
										if (("true" === b ||
												"true" === e) && !q && Number(k) >= Number(h) && tf("auction"))
											if ("true" === e && "false" === b && (0 < x.length || 0 < u.length)) rf != `mod=auction&itemType=7&itemLevel=${l}` && (A = `${A}/game/index.php?mod=auction&itemType=7&itemLevel=${l}&sh=${X("sh")}`, m(A, "auction"));
											else if ("true" === e && (0 < x.length || 0 < u.length)) rf != `mod=auction&itemType=0&itemLevel=${l}` && (A = `${A}/game/index.php?mod=auction&itemType=0&itemLevel=${l}&sh=${X("sh")}`, m(A, "auction"));
										else if (rf != `mod=auction&itemType=0&itemLevel=${l}` && 0 < x.length || rf != `mod=auction&itemType=0&itemLevel=${l}` &&
											0 < u.length) A = `${A}/game/index.php?mod=auction&itemType=0&itemLevel=${l}&sh=${X("sh")}`, m(A, "auction")
									}
								else if ("true" == c && Number(g) >= Number(h) && (0 < x.length || 0 < u.length) && tf("auctionM")) {
									if (rf != `mod=auction&itemType=0&ttype=3&itemLevel=${l}` && 0 < x.length || rf != `mod=auction&itemType=0&ttype=3&itemLevel=${l}` && 0 < u.length) A = `${A}/game/index.php?mod=auction&itemType=0&ttype=3&itemLevel=${l}&sh=${X("sh")}`, m(A, "auctionM")
								} else q ? rf != `mod=auction&itemType=15&itemLevel=${l}` && (A = `${A}/game/index.php?mod=auction&itemType=15&itemLevel=${l}&sh=${X("sh")}`,
									m(A, "auction")) : setTimeout(r, 3E3)
							};
						r()
					})
				},
				Wn(b) {
					const c = "true" === localStorage.getItem("AuctionCover");
					b = b.querySelector("span");
					if (!b || !b.getAttribute("style")) return !0;
					b = b.getAttribute("style");
					return c && b.includes("green") ? !1 : !c && b.includes("green") ? !0 : b.includes("blue") ? !1 : !0
				},
				async Xn(b) {
					this.form = b.querySelectorAll("#auction_table form");
					for (let e of this.form) {
						var c = e.querySelector(".auction_bid_div");
						b = e.querySelector(".ui-draggable");
						let h = c.querySelector("input").value;
						c = this.Wn(c);
						let k =
							Zb(b),
							g = Gb(b),
							l = JSON.parse(localStorage.getItem("equipmentSelection") || "[]"),
							q = localStorage.getItem("maximumBid"),
							n = localStorage.getItem("auctiongladiatorenable"),
							m = localStorage.getItem("auctionmercenaryenable"),
							r = nb(b),
							x = localStorage.getItem("auctionMinQuality") || 0,
							u = localStorage.getItem("bidFood"),
							w = parseInt(xb(b).split("-")[0], 10),
							A = 15 == w ? parseInt(b.getAttribute("data-tooltip").split(",")[7].match(/\d+/)[0], 10) : 0,
							D = 15 == w ? parseInt(b.getAttribute("data-tooltip").split(",")[9].match(/\d+/)[0], 10) :
							0,
							B = 15 == w ? parseInt(b.getAttribute("data-tooltip").split(",")[15].match(/\d+/)[0], 10) : 0,
							t = !1,
							v = "true" === localStorage.getItem("enableMercenarySearch"),
							z = parseInt(localStorage.getItem("minDexterity"), 10) || 0,
							C = parseInt(localStorage.getItem("minAgility"), 10) || 0,
							I = parseInt(localStorage.getItem("minIntelligence"), 10) || 0,
							H = !1,
							K = !1,
							L, O, Y;
						Y = localStorage.getItem("ignorePS") || "false";
						L = JSON.parse(localStorage.getItem("auctionPrefixes") || "[]");
						O = JSON.parse(localStorage.getItem("auctionSuffixes") || "[]");
						L.some(ea =>
							k.toLowerCase().includes(ea.toLowerCase()) ? H = !0 : !1);
						O.some(ea => {
							let ca = k.toLowerCase();
							ea = ea.toLowerCase();
							return ca.endsWith(" " + ea) || ca === ea ? K = !0 : !1
						});
						if ("true" === Y) {
							if (H || K) t = !0
						} else if (H && K || H && 0 === O.length || K && 0 === L.length) t = !0;
						"string" === typeof g && (g = [g]);
						null == x && (x = 5);
						t = t && 0 === l.length || t && l.includes("9999") || t && l.some(ea => g.includes(ea)) ? !0 : !1;
						"true" === u && 7 == w && h < da.gold && (t = !0);
						Number(r) < x && ("true" !== u || 7 != w) && (t = !1);
						"false" !== n || "false" !== m || "true" === u && 7 == w || (t = !1);
						1E3 > da.gold && (Z("AuctionEmpty",
							1), Z("AuctionMEmpty", 1));
						c && v && 15 == w && Number(h) < Number(q) && (0 == z || A >= z) && (0 == C || D >= C) && (0 == I || B >= I) && (t = !0);
						t && c && Number(h) < Number(q) && this.L.push([{
							itemLevel: Hb(b),
							itemName: k,
							basis: xb(b),
							quality: nb(b),
							price: h
						}, h, e.getAttribute("action"), {
							auctionid: e.querySelector("input[name=auctionid]").value,
							qry: e.querySelector("input[name=qry]").value,
							itemType: e.querySelector("input[name=itemType]").value,
							itemLevel: e.querySelector("input[name=itemLevel]").value,
							itemQuality: e.querySelector("input[name=itemQuality]").value,
							buyouthd: e.querySelector("input[name=buyouthd]").value,
							bid_amount: h,
							bid: e.querySelector("input[name=bid]").value
						}])
					}
				},
				Xm(b) {
					function c(k) {
						if ("string" === typeof k) return k;
						let g = [];
						for (let l in k) k.hasOwnProperty(l) && g.push(encodeURIComponent(l) + "=" + encodeURIComponent(k[l]));
						return g.join("&")
					}
					localStorage.getItem("auctionStatus");
					localStorage.getItem("auctionMStatus");
					const e = JSON.parse(localStorage.getItem("Timers")),
						h = () => {
							0 === Aa.L.length && (Z("AuctionEmpty", 1), Z("AuctionMEmpty", 1), window.location.reload());
							let k = [];
							for (let g = 0; 3 > g && 0 !== Aa.L.length; g++) {
								let l = Aa.L.pop(),
									q = new Promise((n, m) => {
										try {
											if (Number(l[1]) < Aa.kl) {
												Aa.kl -= l[1];
												let r = new XMLHttpRequest;
												r.open("POST", l[2], !0);
												r.onreadystatechange = function() {
													if (r.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
														if (200 === r.status) {
															let u = JSON.parse(localStorage.getItem("bidList")) || [];
															u.push(l[0].itemName);
															localStorage.setItem("bidList", JSON.stringify(u))
														} else console.error("Error placing bid:", r.status);
														n();
														r.abort()
													}
												};
												r.setRequestHeader("Content-Type",
													"application/x-www-form-urlencoded");
												const x = c(l[3]);
												r.send(x)
											} else 2 == b ? (Z("AuctionEmpty", 1), Z("auction", e.AuctionCheck || 10)) : (Z("AuctionMEmpty", 1), Z("auctionM", e.AuctionCheck || 10)), window.location.reload(), m("Not enough gold")
										} catch (r) {
											m(r)
										}
									});
								k.push(q)
							}
							Promise.all(k).then(() => {
								setTimeout(() => {
									h()
								}, 250)
							}).catch(() => {
								setTimeout(() => {
									h()
								}, 250)
							})
						};
					h()
				}
			},
			ia = {
				bag: null,
				g: null,
				Wp: null,
				gq: localStorage.getItem("smeltIgnorePS"),
				async start() {
					const b = "true" === localStorage.getItem("RepairBeforeSmelt");
					var c =
						"513";
					c = (c = localStorage.getItem("smeltTab")) ? (513 + parseInt(c, 10)).toString() : "513";
					c = document.querySelector(`[data-bag-number="${c}"]`);
					if ("mod=forge&submod=smeltery" != rf) Mf("mod=forge&submod=smeltery");
					else if (c.classList.contains("current") && uf()) {
						this.slots = await this.u();
						const e = this.slots.filter(g => "closed" === g["forge_slots.state"]);
						this.Pm(this.slots);
						await this.ym(this.slots);
						const h = JSON.parse(localStorage.getItem("Timers")),
							k = "true" === localStorage.getItem("smelteverything3");
						c = "true" === localStorage.getItem("smeltAnything") ?
							this.wo() : "true" === localStorage.getItem("smelteverything3") ? this.xo() : this.vo();
						if (0 < c.length) {
							for (let {
									id: g,
									slot: l,
									hammerState: q
								}
								of c) try {
								if (b) {
									const n = await yj.Oo(g);
									if (n && 0 != n) try {
										await ia.pm(l, n, q, g)
									} catch {
										await ia.pm(l, g, q, g)
									} else await ia.pm(l, g, q, g)
								} else await ia.pm(l, g, q, g)
							} catch (n) {}
							E("Smelting completed. Reloading page");
							Z("smelt", h.SmeltingNoItem || 10);
							window.location.reload()
						} else 1 > c.length && 1 == k ? (E("No items to smelt, reloading page"), Z("smelt", h.SmeltingNoItem || 10), window.location.reload()) :
							0 < e.length ? await this.pickItems() : 0 < e.length && "true" === localStorage.getItem("smelteverything3") ? ia.move() : (E("No free slots, reloading page"), Z("smelt", h.SmeltingNoItem || 10), window.location.reload())
					} else c.click(), uf(() => this.start())
				},
				Mo(b, c) {
					b = JSON.parse(localStorage.getItem("smeltedItems")) || [];
					b.push(c);
					localStorage.setItem("smeltedItems", JSON.stringify(b))
				},
				vo() {
					const b = this.slots.filter(h => "closed" === h["forge_slots.state"]).map(h => h["forge_slots.slot"]);
					var c = Array.from(document.querySelectorAll("#inv .ui-draggable"));
					let e = [];
					for (let h of c) {
						if (c = this.lm(h)) {
							let k = b.shift();
							void 0 !== k && e.push({
								id: h.getAttribute("data-item-id"),
								slot: k,
								hammerState: c.hammerState || "none",
								matchingRule: c
							})
						}
						if (0 === b.length) break
					}
					return e
				},
				wo() {
					const b = this.slots.filter(h => "closed" === h["forge_slots.state"]).map(h => h["forge_slots.slot"]);
					var c = Array.from(document.querySelectorAll("#inv .ui-draggable"));
					let e = [];
					for (let h of c) {
						if (c = this.lm(h)) {
							let k = b.shift();
							void 0 !== k && e.push({
								id: h.getAttribute("data-item-id"),
								slot: k,
								hammerState: c.hammerState ||
									"none",
								matchingRule: c
							})
						}
						if (0 === b.length) break
					}
					return e
				},
				xo() {
					const b = [2, 4, 8, 1, 256, 512, 48, 1024],
						c = this.slots.filter(e => "closed" === e["forge_slots.state"]).map(e => e["forge_slots.slot"]);
					return Array.from(document.querySelectorAll("#inv .ui-draggable")).filter(e => {
						if (!ac(e)) return !1;
						e = e.getAttribute("data-content-type");
						return b.includes(Number(e))
					}).map(e => ({
						id: e.getAttribute("data-item-id"),
						slot: c.shift()
					})).filter(({
						slot: e
					}) => void 0 !== e)
				},
				async pm(b, c, e, h) {
					try {
						var k = await jQuery.post(U({}), {
							mod: "forge",
							submod: "getSmeltingPreview",
							mode: "smelting",
							slot: b,
							iid: c,
							amount: 1,
							a: (new Date).getTime(),
							sh: X("sh")
						});
						let q;
						try {
							var g = JSON.parse(k);
							if (g.slots[b] && g.slots[b].formula && g.slots[b].formula.rent[2]) q = g.slots[b].formula.rent[2];
							else {
								for (k = 0; k < g.slots.length; k++)
									if (g.slots[k].formula && g.slots[k].formula.rent[2]) {
										q = g.slots[k].formula.rent[2];
										break
									} q ||= 3E3
							}
						} catch (m) {
							q = 3E3
						}
						const n = Zb(document.querySelector(`[data-item-id='${h}']`));
						try {
							if (e && "none" !== e) {
								const m = {
									bronze: "19-10",
									silver: "19-11",
									gold: "19-12"
								} [e];
								if (m) {
									var l = Array.from(document.querySelectorAll("#inventory_nav a.awesome-tabs"));
									const r = l.findIndex(u => u.classList.contains("current")),
										x = l.slice(r).concat(l.slice(0, r));
									h = !1;
									g = null;
									for (l = 0; l < x.length; l++) {
										let u = x[l];
										if ("false" === u.getAttribute("data-available")) continue;
										u.click();
										await new Promise(A => setTimeout(A, 250));
										const w = document.querySelector(`.item-i-${m}`);
										if (w) {
											h = !0;
											g = w;
											break
										}
									}
									if (h && g) {
										const u = g.getAttribute("data-container-number"),
											w = g.getAttribute("data-position-x"),
											A = g.getAttribute("data-position-y");
										await jQuery.post(U({
											mod: "inventory",
											submod: "move",
											from: u,
											fromX: w,
											fromY: A,
											to: 773,
											toX: b + 1,
											toY: 1,
											amount: 1,
											doll: 1,
											a: (new Date).getTime(),
											sh: X("sh")
										}));
										E(`Hammer (${e}) moved to inventory.`)
									} else E(`Hammer (${e}) not found in any inventory bag.`), E("Proceeding to smelt without a hammer.")
								} else E("Proceeding to smelt without a hammer.")
							}
						} catch (m) {}
						if (q < Gh().gold) await jQuery.post(U({
							mod: "forge",
							submod: "rent",
							mode: "smelting",
							slot: b,
							rent: 2,
							item: c,
							a: (new Date).getTime(),
							sh: X("sh")
						})), this.Mo(c, n), ja("itemSmelted",
							0), E(`${d.Sf}` + n), await new Promise(m => setTimeout(m, 250));
						else {
							E(`${d.zb}` + q);
							const m = JSON.parse(localStorage.getItem("Timers"));
							Z("smelt", m.Smelting || 10);
							window.location.reload()
						}
					} catch (q) {
						location.reload()
					}
				},
				async Qo(b, c) {
					var e = await jQuery.post(U({}), {
						mod: "forge",
						submod: "getSmeltingPreview",
						mode: "smelting",
						slot: b,
						iid: c,
						amount: 1,
						a: (new Date).getTime(),
						sh: X("sh")
					});
					e = JSON.parse(e).slots[b].formula.rent[2];
					e < Gh().gold ? jQuery.post(U({
						mod: "forge",
						submod: "rent",
						mode: "smelting",
						slot: b,
						rent: 2,
						item: c,
						a: (new Date).getTime(),
						sh: X("sh")
					})).done(function() {
						var h = JSON.parse(localStorage.getItem("smeltery_itemList1"));
						({
							item: h
						} = h);
						E(`${d.Tf}` + h.name);
						window.location.reload()
					}).fail(function() {
						E("Problem with smelting, maybe there is not enough space.");
						window.location.reload()
					}) : (E(`${d.zb}` + e), b = JSON.parse(localStorage.getItem("Timers")), Z("smelt", b.SmeltingNoGold || 5), window.location.reload())
				},
				init: function() {
					jQuery("#inv").after('\n                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">\n\n                        <fieldset id="gladbot-workbench" style="\n                        padding: 10px;\n                        margin: 10px 20px;\n                        text-align: center;\n                        display: flex;\n                        flex-direction: row;\n                        flex-wrap: wrap;\n                        align-items: center;\n                        justify-content: space-around;\n                        border: 2px solid darkred;\n                        border-radius: 8px;\n                        width: 235px;">\n                        <legend style="\n                            padding: 0 10px;\n                            color: darkred;\n                            font-weight: bold;">Gladbot Smeltery Area</legend>\n                        </fieldset>');
					ia.vm("#gladbot-workbench", '<i class="fa fa-fire"></i>', "gladbot-button gladbot-smelter-button-smelt gladbot-stylish-button").mouseup(b => {
						ia.Vm(b)
					});
					ia.vm("#gladbot-workbench", "RESET", "gladbot-button gladbot-smelter-button-reset gladbot-stylish-button").mouseup(() => {
						localStorage.setItem("activateSmeltMode", !1)
					});
					jQuery("#gladbot-workbench").append('<p style="font-size: 0.8em; color: darkred;">Right click to reset smelt mode.</p>')
				},
				Vm: async function() {
					jQuery(document.body).addClass("fire-smelt-cursor");
					jQuery(document.body).on("contextmenu", function(b) {
						b.preventDefault();
						jQuery(document.body).removeClass("fire-smelt-cursor");
						jQuery(document.body).off("contextmenu");
						localStorage.setItem("activateSmeltMode", !1)
					});
					this.slots = await this.u();
					localStorage.setItem("activateSmeltMode", !0);
					jQuery("#inv .ui-draggable, #char .ui-draggable").off("mouseup.smelt").on("mouseup.smelt", async b => {
						var c = b.target,
							e = c.className.match(/item-i-(\d+)-\d+/)[1];
						(b = this.slots.filter(h => "closed" === h["forge_slots.state"])[0]) ?
						(e = {
							item: {
								type: e,
								name: Zb(c),
								quality: nb(c),
								slot: b,
								container: c.getAttribute("data-container-number")
							},
							spot: {
								bag: c.getAttribute("data-container-number"),
								x: c.getAttribute("data-position-x"),
								y: c.getAttribute("data-position-y")
							}
						}, localStorage.setItem("smeltery_itemList1", JSON.stringify(e)), jQuery(c).parents("#char").length ? setTimeout(() => {}, 1E3) : (this.slots = await this.u(), await this.ym(this.slots), this.slots.filter(h => "closed" === h["forge_slots.state"]).map(h => h["forge_slots.slot"]), c = c.getAttribute("data-item-id"),
							e && await ia.Qo(b["forge_slots.slot"], c))) : console.log("No free slot available")
					})
				},
				async u() {
					try {
						const b = await jQuery.post(U({}), {
							mod: "forge",
							submod: "getSmeltingPreview",
							mode: "smelting",
							a: (new Date).getTime(),
							sh: X("sh")
						});
						return JSON.parse(b).slots
					} catch (b) {
						console.log(b)
					}
				},
				async Pm(b) {
					if ("undefined" !== typeof b) {
						let e = [];
						for (var c = 0; c < b.length; c++)
							if ("undefined" !== typeof b[c]["forge_slots.uend"]) {
								let h = 1E3 * b[c]["forge_slots.uend"];
								"finished-succeeded" === b[c]["forge_slots.state"] && (h = 0);
								e.push([h,
									b[c].item.name
								])
							} localStorage.setItem("smelt.timer", JSON.stringify(e))
					}
				},
				async ym(b) {
					const c = "true" === localStorage.getItem("smeltLootbox");
					Array.isArray(b) && (b = b.filter(e => "finished-succeeded" === e.state).map(e => e["forge_slots.slot"]), 0 < b.length && !c ? (await Promise.all(b.map(e => ia.Ho(e))), await this.u()) : 0 < b.length && c && (await Promise.all(b.map(e => ia.Io(e))), await this.u()))
				},
				async Io(b) {
					return jQuery.post("ajax.php", {
						mod: "forge",
						submod: "lootbox",
						mode: "smelting",
						slot: b,
						a: (new Date).getTime(),
						sh: X("sh")
					})
				},
				async Ho(b) {
					return jQuery.post("ajax.php", {
						mod: "forge",
						submod: "storeSmelted",
						mode: "smelting",
						slot: b,
						a: (new Date).getTime(),
						sh: X("sh")
					})
				},
				Zm() {
					var b = localStorage.getItem("smelt.timer");
					if (!b) return !0;
					b = JSON.parse(b).sort((c, e) => c[0] - e[0]);
					return 6 > b.length || b[0][0] + 6E4 < (new Date).getTime()
				},
				async pickItems() {
					E(`${d.Uf}`);
					ia.bag = document.getElementById("inv");
					ia.g = [];
					var b = JSON.parse(localStorage.getItem("smeltingSettings")) || [],
						c = JSON.parse(localStorage.getItem("smeltRandomlySettings")) || {};
					const e =
						new Set(JSON.parse(localStorage.getItem("playerEquipmentIDs") || "[]")),
						h = new Set(JSON.parse(localStorage.getItem("mercenaryEquipmentIDs") || "[]")),
						k = "true" === localStorage.getItem("smelthighercolors");
					var g = !1;
					try {
						for (let m of b) {
							if (!1 === m.isEnabled) continue;
							if ("isUnderworldItem" !== m.condition && 2 > m.prefix.length && 2 > m.suffix.length) continue;
							let r = [];
							var l = "";
							"nameContains" === m.condition && 2 < m.prefix.length && "" !== m.prefix.trim() ? l = m.prefix.trim() : !m.prefix && "nameContains" === m.condition && 2 < m.suffix.length &&
								"" !== m.suffix.trim() && (l = m.suffix.trim());
							"nameContains" === m.condition && m.jm && 2 < m.jm.length && (l = m.jm.trim());
							const x = {
								white: "-1",
								green: "0",
								blue: "1",
								purple: "2",
								orange: "3",
								red: "4"
							};
							if (m.colors && 0 < m.colors.length) {
								let w = [...m.colors];
								k && w.sort((A, D) => x[D] - x[A]);
								w.forEach(A => {
									A = x[A];
									void 0 !== A && r.push(A)
								})
							} else r = Object.values(x), k && r.sort((w, A) => A - w);
							var q = {
									2: 1,
									4: 2,
									8: 3,
									1: 4,
									256: 5,
									512: 8,
									48: 6,
									1024: 9
								},
								n = 0;
							const u = [];
							if (2 < l.length) {
								for (let w of r)
									for (let A of m.itemTypes) {
										const D = q[A];
										await new Promise(t =>
											setTimeout(t, 400));
										const B = await this.en(1, w, l, D);
										u.push(...B);
										5 <= n && (localStorage.setItem("smelt.timeOut", 0), window.location.reload())
									}
								1 <= n && (Z("smelt", 0), window.location.reload());
								l = u;
								for (let w of l) {
									if (5 <= n) break;
									const A = w.item,
										D = Zb(w.item);
									ia.g.some(B => B.id === w.id) || e.has(D) || h.has(D) || !this.lm(A, m, b, c) || (ia.g.push({
										item: A,
										id: w.id,
										hammerState: m.hammerState || "none",
										matchingRule: m
									}), n++, g = !0)
								}
								if (5 <= n) break
							} else if ("isUnderworldItem" === m.condition) {
								E("Looking for underworld items...");
								n = 0;
								for (let w of r) {
									if (5 <=
										n) break;
									const A = await this.km(w);
									l = [];
									for (q = 1; q <= Math.min(A, 5); q++) l.push(q);
									for (q = 0; q < l.length && !(5 <= n); q += 2) {
										const D = l.slice(q, q + 2).map(async t => {
												try {
													return await this.en(t, w)
												} catch (v) {
													return []
												}
											}),
											B = await Promise.all(D);
										for (let t of B) {
											if (5 <= n) break;
											for (let v of t) {
												const z = v.item;
												let C = this.lm(z, m);
												if (C && (ia.g.push({
														item: z,
														id: v.id,
														hammerState: C.hammerState || "none",
														matchingRule: C
													}), n++, 5 <= n)) break
											}
										}
									}
								}
							}
						}
						if (!g && "true" === localStorage.getItem("smeltAnything")) {
							const m = c.itemTypes || [],
								r = c.hammerState ||
								"none",
								x = {
									white: "-1",
									green: "0",
									blue: "1",
									purple: "2",
									orange: "3",
									red: "4"
								};
							let u = (c.colors || []).map(A => x[A]);
							0 === u.length && (u = Object.values(x));
							b = 0;
							const w = await this.km(u[0]);
							for (c = 1; c <= w && !(5 <= b); c++) {
								const A = await this.so(c, u[0]);
								for (let D of A) {
									if (5 <= b) break;
									const B = D.item,
										t = Zb(B),
										v = parseInt(nb(B), 10),
										z = new Set(JSON.parse(localStorage.getItem("playerEquipmentIDs") || "[]")),
										C = new Set(JSON.parse(localStorage.getItem("mercenaryEquipmentIDs") || "[]"));
									if (!z.has(t) && !C.has(t)) {
										if (Fa.colors && 0 < Fa.colors.length) {
											const I = {
													white: -1,
													green: 0,
													blue: 1,
													purple: 2,
													orange: 3,
													red: 4
												},
												H = Object.keys(I).find(K => I[K] === v);
											if (!Fa.colors.includes(H)) continue
										}
										m.includes(B.getAttribute("data-content-type")) && (ia.g.push({
											item: B,
											id: D.id,
											hammerState: r
										}), b++, g = !0)
									}
								}
								if (5 <= b) break
							}
						}
						if (g && 0 < ia.g.length) await ia.move(ia.g);
						else {
							E("No items found for smelting.");
							const m = JSON.parse(localStorage.getItem("Timers"));
							Z("smelt", m.SmeltingNoItem || 15);
							window.location.reload()
						}
					} catch (m) {
						E("Error looking for items for smelting. If you have too many conditions, please reduce them."),
							g = JSON.parse(localStorage.getItem("Timers")), Z("smelt", g.SmeltingError || 15), window.location.reload()
					}
				},
				async Fp(b, c) {
					b = await jQuery.get(G({
						mod: "packages",
						f: "0",
						fq: c,
						qry: "",
						page: b,
						sh: X("sh")
					}));
					const e = [];
					jQuery(b).find(".packageItem").each((h, k) => {
						h = k.querySelector("input").value;
						(k = jQuery(k).find(".ui-draggable")[0]) && e.push({
							id: h,
							item: k
						})
					});
					return e
				},
				qo(b) {
					return b.getAttribute("data-hammer-state") || "none"
				},
				async en(b, c = null, e = "", h = "0") {
					b = {
						mod: "packages",
						f: h,
						page: b,
						sh: X("sh")
					};
					null !== c && (b.fq = c);
					e && "" !== e.trim() && (b.qry = e.trim());
					c = await jQuery.get(G(b));
					const k = [];
					jQuery(c).find(".packageItem").each((g, l) => {
						g = l.querySelector("input").value;
						(l = jQuery(l).find(".ui-draggable")[0]) && k.push({
							id: g,
							item: l
						})
					});
					return k
				},
				async so(b, c = null, e = "") {
					b = {
						mod: "packages",
						f: "0",
						fq: null !== c ? c : -1,
						page: b,
						sh: X("sh")
					};
					e && "" !== e.trim() && (b.qry = e.trim());
					e = await jQuery.get(G(b));
					e = jQuery(e).find(".packageItem");
					const h = [],
						k = (JSON.parse(localStorage.getItem("smeltRandomlySettings")) || {}).itemTypes || [],
						g = new Set(JSON.parse(localStorage.getItem("playerEquipmentIDs") ||
							"[]")),
						l = new Set(JSON.parse(localStorage.getItem("mercenaryEquipmentIDs") || "[]"));
					e.each((q, n) => {
						const m = n.querySelector("input").value;
						if (q = jQuery(n).find(".ui-draggable")[0]) {
							n = Zb(q);
							var r = q.getAttribute("data-content-type");
							h.some(x => x.id === m) || g.has(n) || l.has(n) || k.includes(r) && h.push({
								item: q,
								id: m
							})
						}
					});
					return h
				},
				async km(b = null, c = "", e = "0") {
					b = {
						mod: "packages",
						f: e,
						fq: b || -1,
						qry: "",
						page: 1,
						sh: X("sh")
					};
					c && "" !== c.trim() && (b.qry = c.trim());
					c = await jQuery.get(G(b));
					b = jQuery(c).find(".paging_right_full");
					c = 1;
					0 < b.length && (b = b.last().attr("href")) && (b = b.match(/page=(\d+)(?!.*page=)/)) && b[1] && (c = parseInt(b[1], 10));
					return c
				},
				lm(b) {
					const c = "true" === localStorage.getItem("smeltAnything"),
						e = JSON.parse(localStorage.getItem("smeltingSettings")) || [],
						h = JSON.parse(localStorage.getItem("smeltRandomlySettings")) || [];
					if (!c && !c && 0 === e.length) return !1;
					const k = Zb(b),
						g = parseInt(b.getAttribute("data-level"), 10),
						l = Gb(b),
						q = parseInt(nb(b), 10);
					var n = this.qo(b),
						m = b.getAttribute("data-basis");
					n = b.getAttribute("data-hash");
					b.getAttribute("data-level");
					m = Ib(m, n);
					n = new Set(JSON.parse(localStorage.getItem("playerEquipmentIDs") || "[]"));
					const r = new Set(JSON.parse(localStorage.getItem("mercenaryEquipmentIDs") || "[]"));
					if (n.has(k) || r.has(k)) return !1;
					for (let x of e)
						if (n = x.hammerState || "none", !1 !== x.isEnabled && this.eo(b, x, {
								itemName: k,
								itemLevel: g,
								itemType: l,
								itemQuality: q,
								itemHammerState: n,
								isUnderworldItem: m
							})) return x;
					if (c) {
						if (h.itemTypes && 0 < h.itemTypes.length && !h.itemTypes.map(x => parseInt(x, 10)).includes(parseInt(l, 10))) return !1;
						if (h.colors && 0 < h.colors.length) {
							const x = {
								white: -1,
								green: 0,
								blue: 1,
								purple: 2,
								orange: 3,
								red: 4
							};
							b = Object.keys(x).find(u => x[u] === q);
							if (!h.colors.includes(b)) return !1
						}
						return h
					}
					return null
				},
				eo(b, c, e) {
					let {
						itemName: h,
						itemLevel: k,
						itemType: g,
						itemQuality: l,
						isUnderworldItem: q
					} = e;
					if ("nameContains" === c.condition) {
						b = !0;
						if (0 === c.prefix.length && 0 === c.suffix.length) return !1;
						c.prefix && 0 < c.prefix.length && h && 0 < h.length && !h.toLowerCase().includes(c.prefix.toLowerCase()) && (b = !1);
						c.suffix && 0 < c.suffix.length && h && 0 < h.length &&
							!h.toLowerCase().includes(c.suffix.toLowerCase()) && (b = !1);
						c.prefix && 0 < c.prefix.length && c.suffix && 0 < c.suffix.length && (!(h && 0 < h.length) || h.toLowerCase().includes(c.prefix.toLowerCase()) && h.toLowerCase().includes(c.suffix.toLowerCase()) || (b = !1));
						if (!b) return !1
					} else if ("isUnderworldItem" === c.condition && !q) return !1;
					if (!(k < (c.level ? parseInt(c.level, 10) : 0)) && c.itemTypes && 0 < c.itemTypes.length) {
						if (!c.itemTypes.includes("9999") && !c.itemTypes.map(n => parseInt(n)).includes(parseInt(g, 10))) return !1
					} else return !1;
					l ||= 0;
					if (c.colors && 0 < c.colors.length) {
						const n = {
							white: -1,
							green: 0,
							blue: 1,
							purple: 2,
							orange: 3,
							red: 4
						};
						b = Object.keys(n).find(m => n[m] === l);
						if (!c.colors.includes(b)) return !1
					} else return !1;
					return c
				},
				vm: function(b, c, e) {
					c = jQuery("<button>").html(c).addClass(e);
					jQuery(b).append(c);
					return c
				},
				async move() {
					var b = "513";
					b = (b = localStorage.getItem("smeltTab")) ? (513 + parseInt(b, 10)).toString() : "513";
					this.slots.filter(h => "closed" === h["forge_slots.state"]).map(h => h["forge_slots.slot"]).shift();
					try {
						let h = ia.g.pop();
						var c =
							mc(ia.bag);
						let k = Hc(5, 8, c),
							g = parseInt(h.item.getAttribute("data-measurement-x")),
							l = parseInt(h.item.getAttribute("data-measurement-y")),
							q = Ic(l, g, k);
						c = b;
						if (q) {
							await jQuery.post(U({
								mod: "inventory",
								submod: "move",
								from: "-" + h.id,
								fromX: "1",
								fromY: "1",
								to: c,
								toX: q.x + 1,
								toY: q.y + 1,
								amount: "1"
							}), {
								a: (new Date).getTime(),
								sh: X("sh")
							});
							var e = jQuery(h.item).css({
								left: 32 * q.x,
								top: 32 * q.y
							});
							ia.bag.appendChild(e[0]);
							0 < ia.g.length || h ? (localStorage.setItem("smeltCheck.timeOut", 0), await new Promise(n => setTimeout(n, 500)), await this.move()) :
								window.location.reload()
						} else if (0 < ia.g.length && !q) {
							E("Not enough space in inventory to smelt.");
							await new Promise(m => setTimeout(m, 500));
							await this.move();
							const n = JSON.parse(localStorage.getItem("Timers"));
							Z("smelt", n.SmeltingNoItem || 15)
						} else window.location.reload()
					} catch (h) {
						localStorage.setItem("smeltCheck.timeOut", 0), window.location.reload()
					}
				}
			};
		window.location.href.includes("index.php?mod=mysterybox") && (Yh(), Zh());
		window.location.href.includes("/index.php?mod=forge&submod=smeltery") && (ia.init(),
			ia.slots = await ia.u(), await ia.Pm(ia.slots), "true" == localStorage.getItem("activateSmeltMode") && ia.Vm());
		try {
			window.location.href.includes("/index.php?mod=location&submod=serverQuest") && (window.location.href.includes("submod=serverQuestHighscore&loc=hadrians_wall") || localStorage.setItem("eventPoints_", parseInt(document.querySelectorAll(".section-header p")[1].innerText.match(/\d+/g)[0], 10)))
		} catch {
			localStorage.setItem("doEventExpedition", !1);
			Mf("mod=overview");
			return
		}
		try {
			if (window.location.href.includes("/index.php?mod=work")) {
				let b =
					document.querySelector('span[data-ticker-type="countdown"]');
				if (b) {
					let c = b.innerText.split(":"),
						e = 6E4 * (60 * parseInt(c[0], 10) + parseInt(c[1], 10));
					await new Promise(h => setTimeout(h, e))
				}
			}
		} catch {
			Mf("mod=overview");
			return
		}
		var zj = {
				async start() {
					const b = await Promise.all([new Promise(c => {
						jQuery.get(G({
							mod: "overview",
							doll: "1",
							sh: X("sh")
						}), e => {
							e = jQuery(e).find(".avatar")[0].classList.contains("avatar_costume_part");
							c(!e)
						})
					}), new Promise(c => {
						jQuery.get(G({
							mod: "overview",
							doll: "2",
							sh: X("sh")
						}), e => {
							e = jQuery(e).find(".avatar")[0].classList.contains("avatar_costume_part");
							c(!e)
						})
					})]);
					b[0] && Z("CheckDolls", 1);
					b[1] && Z("CheckDolls", 1)
				}
			},
			jf = {
				async check(b = !1) {
					return new Promise(async c => {
						await new Promise(e => {
							jQuery.get(G({
								mod: "overview",
								doll: "1",
								sh: X("sh")
							}), h => {
								localStorage.setItem("arenaCostumeEquiped", jQuery(h).find(".avatar")[0].classList.contains("avatar_costume_part"));
								e()
							})
						});
						b && await b();
						c()
					})
				},
				async start() {
					if ("mod=costumes" != rf) Mf("mod=costumes");
					else {
						let e = localStorage.getItem("costumeUnderworld"),
							h = localStorage.getItem("costumeUnderworld");
						const k = "true" ===
							localStorage.getItem("wearUnderworld");
						var b = !1;
						let g = document.querySelectorAll(".costumes_box"),
							l = !1,
							q;
						const n = localStorage.getItem("costumeUnderworld");
						b = ["9", "10", "11"];
						const m = JSON.parse(localStorage.getItem("underworld"));
						for (var c of b) try {
							const r = g[Number(c) - 1].querySelector(".costumes_button_single").getAttribute("onclick");
							if (r && !r.includes("dropCostume")) {
								l = !0;
								break
							}
						} catch (r) {}
						0 < g.length && null !== n && (c = Number(n) - 1, 0 <= c && c < g.length && (c = g[c].querySelector(".costumes_button_single") || g[c].querySelector(".costumes_button_active_single")) &&
							(q = c.getAttribute("onclick")));
						["9", "10", "11"].includes(e) && q && q.includes("dropCostume") ? (b = !0, m.jj = !0, localStorage.setItem("underworld", JSON.stringify(m)), Z("CheckDolls", 15)) : (b = !1, m.jj = !1, localStorage.setItem("underworld", JSON.stringify(m)));
						b ? (Z("CheckDolls", 30), window.location.reload()) : await this.check(async () => {
							let r = [];
							if (k) {
								let x = 0;
								const u = ["9", "10", "11"];
								for (let w of u) try {
									const A = g[Number(w) - 1].querySelector(".costumes_button_single")?.getAttribute("onclick");
									if (A && !A.includes("dropCostume")) {
										l = !0;
										const D = Number(n) - 1;
										0 <= D && D < g.length && (l = g[D].querySelector(".costumes_button_single") || g[D].querySelector(".costumes_button_active_single") ? !0 : !1);
										if (l && "9" === h && 2 >= Number(Gh().Fa)) {
											r.push({
												doll: 1,
												setId: Number(h) + 2
											});
											break
										}
										if (l && "10" === h && 2 >= Number(Gh().fo)) {
											r.push({
												doll: 1,
												setId: Number(h) + 2
											});
											break
										}
										if (l && "11" === h) {
											r.push({
												doll: 1,
												setId: Number(h) + 2
											});
											break
										}
									}
								} catch (A) {
									x++
								}
								x === u.length && E(`${d.Af}`)
							}
							try {
								if (!l) {
									const x = g[Number(localStorage.getItem("costumeBasic") - 1)].querySelector("#costumes_button_left input"),
										u = x.getAttribute("onclick");
									x.classList.contains("disabled") || u.includes("dropCostume") || r.push({
										doll: 1,
										setId: localStorage.getItem("costumeBasic")
									});
									if (8 >= Number(localStorage.getItem("costumeDungeon"))) {
										const w = g[Number(localStorage.getItem("costumeDungeon") - 1)].querySelector("#costumes_button_right input"),
											A = w.getAttribute("onclick");
										w.classList.contains("disabled") || A.includes("dropCostume") || r.push({
											doll: 2,
											setId: localStorage.getItem("costumeDungeon")
										})
									}
								}
								if (0 < r.length) {
									let {
										doll: x,
										setId: u
									} = {
										...r.pop()
									};
									(await fetch(G({
										mod: "costumes",
										submod: "changeCostume",
										doll: x,
										setId: u,
										sh: X("sh")
									}))).ok && 0 < r.length && 9 > Number(u) && await jf.bn(r);
									Z("CheckDolls", 30)
								} else Z("CheckDolls", 15);
								window.location.reload()
							} catch {
								Z("CheckDolls", 15), window.location.reload(), E("Problem occurred while wearing a costume.")
							}
						})
					}
				},
				async bn(b, c = !1) {
					let {
						doll: e,
						setId: h
					} = {
						...b.pop()
					};
					await new Promise(k => {
						jQuery.get(G({
							mod: "costumes",
							submod: "changeCostume",
							doll: e,
							setId: h,
							sh: X("sh")
						}), () => {
							0 < b.length ? jf.bn(b, c) : (Z("CheckDolls", 15), k())
						})
					})
				}
			};
		fa < new Date && aa != wa && hb();
		if (sa && "true" === localStorage.getItem("guildBattleEnable") && tf("guildBattleEnable")) try {
			const b = "true" === localStorage.getItem("guildBattleRandom"),
				c = JSON.parse(localStorage.getItem("guildKeywords")) || [],
				e = await jQuery.get(G({
					mod: "guild_warcamp",
					sh: X("sh")
				})),
				h = (new DOMParser).parseFromString(e, "text/html"),
				k = h.querySelectorAll('a[href*="mod=guild_warcamp&submod=guild_combat&gid="]'),
				g = h.querySelectorAll("table.section-like tr:not(:first-child)");
			let l = null;
			0 < g.length && 0 < c.length ?
				g.forEach(q => {
					const n = q.querySelector('td a[href*="mod=guild"]');
					q = q.querySelector('a[href*="mod=guild_warcamp&submod=guild_combat&gid="]');
					if (n && q) {
						const m = n.textContent.trim().toLowerCase();
						c.some(r => m.includes(r.toLowerCase())) && (l = q.getAttribute("href"))
					}
				}) : b && (l = k[Math.floor(Math.random() * k.length)].getAttribute("href"));
			if (l) {
				const q = new URLSearchParams(l),
					n = q.get("gid"),
					m = q.get("sh");
				try {
					await jQuery.post(G({
						mod: "guild_warcamp",
						submod: "guild_combat",
						gid: n,
						sh: m
					}), {
						combat: "Attack!"
					});
					E(`Guild attack initiated against guild ID: ${n}`);
					const r = JSON.parse(localStorage.getItem("Timers")) || {};
					Z("guildBattleEnable", r.guildBattleEnable || 120)
				} catch (r) {
					E("Error initiating guild attack")
				}
			} else E("No matching guilds found for the provided guild names.")
		} catch (b) {
			E("Error loading guild warcamp page")
		}
		if (sa && "true" === localStorage.getItem("GuildEnable") && tf("GuildDonate")) {
			const b = parseInt(localStorage.getItem("GuildDonateMore") || 0, 10),
				c = parseInt(localStorage.getItem("GuildDonateLess") || 0, 10),
				e = parseInt(localStorage.getItem("GuildDonateAmount") ||
					0, 10);
			if (da.gold >= b && da.gold <= c) {
				await jQuery.post(G({
					mod: "guildBankingHouse",
					submod: "donate",
					sh: X("sh")
				}), {
					donation: e,
					doDonation: "Donate"
				});
				E(`${d.Cf} ${e}.`);
				const h = JSON.parse(localStorage.getItem("Timers"));
				Z("GuildDonate", h.GuildDonate || 5)
			}
		}
		if ("true" === localStorage.getItem("throwDice") && tf("throwDice") && "true" === sessionStorage.getItem("autoGoActive")) {
			const b = await jQuery.get(G({
					mod: "craps",
					sh: X("sh")
				})),
				c = jQuery(b).find("#tossAinfo_freeplay");
			0 < c.length ? (c.attr("style") || "").includes("display: block") ?
				(jQuery.post(window.location.protocol + "//" + window.location.host + "/game/ajax/craps.php", {
					type: "1",
					a: (new Date).getTime(),
					sh: X("sh")
				}), E(`${d.Bf}`)) : E("Used all the free dices today.") : E("Used all the free dices today.");
			Z("throwDice", 10)
		}
		if (tf("sortSettings") && "true" == sessionStorage.getItem("autoGoActive")) {
			const b = await jQuery.get(G({
					mod: "settings",
					submod: "gameSettings",
					sh: X("sh")
				})),
				c = (new DOMParser).parseFromString(b, "text/html").querySelector('select[name="packageSorting"]');
			let e = "in_desc";
			if (c) {
				const h =
					c.querySelector("option[selected]");
				e = h ? h.value : "in_desc"
			}
			Z("sortSettings", 30);
			localStorage.setItem("PackageSort", e)
		}
		if (window.location.href.includes("index.php?mod=location&loc=")) {
			let b = 0,
				c = !1;
			const e = () => {
					fetch(window.location.href).then(n => n.text()).then(n => {
						n = (new DOMParser).parseFromString(n, "text/html");
						if (n = Array.from(n.querySelectorAll("img[data-tooltip]")).find(m => {
								const r = m.getAttribute("data-tooltip").toLowerCase();
								return ["owned", "sahip", "propri", "posiad", "posees"].some(x => r.includes(x))
							})) n =
							(n = n.getAttribute("data-tooltip").match(/(Owned|Sahip[^:]*|Propri[^:]*|Posiad[^:]*|Posees[^:]*): (\d+)/i)) ? parseInt(n[2], 10) : 100, document.getElementById("hourglassesLeft").textContent = n, localStorage.setItem("hourglassesLeft", n)
					}).catch(() => {
						E("No hourglass left")
					})
				},
				h = (n, m, r, x, u, w) => {
					function A(C) {
						return new Promise((I, H) => {
							fetch(`${B}/game/index.php?mod=premium&submod=inventory&sh=${t}`).then(K => K.text()).then(K => {
								if (K = (new DOMParser).parseFromString(K, "text/html").querySelector(`div.premiumfeature_picture > img[src*="${C}"] + .premiumfeature_tokencount`)) return K.textContent.trim();
								throw Error("Token value not found!");
							}).then(K => fetch(`${B}/game/index.php?mod=premium&submod=inventoryActivate&feature=${"5fd403b4efa8ea7bc3ca5a852bfce9"===C?18:5}&token=${K}&sh=${t}`)).then(() => {
								I()
							}).catch(K => {
								H(K)
							})
						})
					}
					if (!c || b >= w) g();
					else {
						var D = new URL(window.location.href),
							B = D.origin,
							t = D.searchParams.get("sh") || "",
							v = document.getElementById("useLifePotion").checked;
						x = document.getElementById("useMobilizationExp2").checked;
						var z = parseInt(document.getElementById("healPercentage2").value, 10);
						D = new URLSearchParams({
							mod: "location",
							submod: "attack",
							location: n,
							stage: m,
							premium: r ? 1 : 0,
							a: Date.now(),
							sh: t
						});
						fetch(`${B}/game/ajax.php?${D.toString()}`).then(C => C.text()).then(() => {
							(v || x) && fetch(window.location.href).then(C => C.text()).then(async C => {
								C = (new DOMParser).parseFromString(C, "text/html");
								if (v) {
									const I = parseInt(C.getElementById("header_values_hp_percent").textContent, 10);
									if (Number(I) < Number(z)) return await A("5fd403b4efa8ea7bc3ca5a852bfce9")
								}
								if (x && (C = C.getElementById("expeditionpoints_value_point").innerText, 0 === Number(parseInt(C.replace("%",
										""), 10)))) return await A("c9ce614bbc67a9e85aa0ee87cf2bb7")
							}).then(async () => {
								b++;
								b >= Number(w) ? (g(), window.location.reload()) : (document.getElementById("attacksPerformed").textContent = b, localStorage.setItem("attackCount", b), await e(), setTimeout(async () => {
									await h(n, m, r, x, u, w)
								}, 1E3 * u))
							}).catch(() => {})
						})
					}
				},
				k = async () => {
					c = !0;
					document.getElementById("startExpedition").style.display = "none";
					document.getElementById("stopExpedition").style.display = "block";
					const n = (new URLSearchParams(window.location.search)).get("loc"),
						m = document.getElementById("monsterSelection").value,
						r = document.getElementById("useHourglass").checked,
						x = document.getElementById("attackInterval").value,
						u = document.getElementById("numberOfAttacks").value;
					await h(n, m, r, useMobilizationExp2, x, u)
				}, g = () => {
					c = !1;
					document.getElementById("startExpedition").style.display = "block";
					document.getElementById("stopExpedition").style.display = "none"
				}, l = () => {
					var n = document.createElement("div");
					n.innerHTML = `
    <div class="expedition-settings">
      <h2 class="section-header">${d.Oe}</h2>
      <div class="expedition-settings-content">
        <div>
            <label>${d.Le}: </label>
            <select id="monsterSelection">
            <option value="1">${d.De}</option>
            <option value="2">${d.Ee}</option>
            <option value="3">${d.Fe}</option>
            <option value="4">${d.Ge}</option>
            </select>
            <br>
            <label>${d.ze}: </label>
            <input type="checkbox" id="useHourglass">
            <br>
            <label>${d.Ce}: </label>
            <input type="checkbox" id="useMobilizationExp2">
            <br>
            <label>${d.Be}: </label>
            <input type="checkbox" id="useLifePotion">
            <br>
            <label>${d.ye}: </label>
            <input type="number" id="healPercentage2" value="25" min="1" max="99">
            <br>
            <label>${d.Je}: </label>
            <input type="number" id="numberOfAttacks" value="${document.getElementById("expeditionpoints_value_point").textContent||"0"}" min="1" max="36">
            <br>
            <label>${d.Ae}: </label>
            <input type="number" id="attackInterval" value="5" min="1" max="60">
            <br>
            <button id="startExpedition" class="expedition-button">${d.Me}</button>
            <button id="resetAttacks" class="expedition-button reset-button">${d.Ke}</button>
            <button id="stopExpedition" class="expedition-button" style="display: none;">${d.Ne}</button>
            <div id="attackLog"></div>
        </div>
      </div>
    </div>
  `;
					var m = document.querySelector(".section-header");
					m.parentNode.insertBefore(n, m);
					n.querySelector(".section-header").addEventListener("click", () => {
						const r = document.querySelector(".expedition-settings-content"),
							x = "none" === r.style.display;
						r.style.display = x ? "block" : "none";
						localStorage.setItem("expeditionSettingsHidden", x ? "false" : "true")
					});
					n = n.querySelector(".expedition-settings-content");
					m = "true" === localStorage.getItem("expeditionSettingsHidden");
					n.style.display = m ? "none" : "block";
					document.getElementById("resetAttacks").addEventListener("click",
						() => {
							b = 0;
							localStorage.removeItem("attackCount");
							document.getElementById("attacksPerformed").textContent = b
						});
					document.getElementById("startExpedition").addEventListener("click", k);
					document.getElementById("stopExpedition").addEventListener("click", g);
					b = parseInt(localStorage.getItem("attackCount") || "0");
					document.getElementById("attackLog").innerHTML = `
            ${d.we}: <span id="attacksPerformed">${b}</span><br>
            ${d.xe}: <span id="hourglassesLeft">${localStorage.getItem("hourglassesLeft")||"0"}</span><br>
            <span class="span-new">${d.He}</span><br>
            <span class="span-new">${d.Ie}</span>

            `
				};
			if (window.location.href.includes("index.php?mod=location&loc=") && !window.location.href.includes("location&loc=nile_bank") && !window.location.href.includes("index.php?mod=location&loc=false") && !window.location.href.includes("location&loc=desert")) {
				const n = document.querySelector("#wrapper_game.underworld");
				(JSON.parse(localStorage.getItem("underworld")) || {}).isUnderworld || n || l()
			}
			const q = document.createElement("style");
			q.innerHTML = "\n  .expedition-settings {\n    border: 2px solid #4CAF50;\n    padding: 10px;\n    margin: 10px 0;\n    background-color: #d3c195;\n    border-radius: 5px;\n  }\n  .expedition-button {\n    border: none;\n    padding: 10px 20px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    margin: 10px;\n    background-color: #a09270;\n    cursor: pointer;\n    border-radius: 5px;\n  }\n\n  .reset-button {\n    background-color: #f44336; /* Red color */\n  }\n\n  .expedition-button:disabled {\n    background-color: #ccc;\n    cursor: not-allowed;\n  }\n";
			document.head.appendChild(q)
		}
		if (window.location.href.includes("index.php?mod=reports&showExpeditions") || window.location.href.includes("index.php?mod=reports&submod=showDungeons") || window.location.href.includes("index.php?mod=reports&submod=showArena") || window.location.href.includes("index.php?mod=reports&submod=showCircusTurma")) {
			let b = document.createElement("div");
			b.id = "ReportSearchUI";
			b.innerHTML = '\n        <div class="setting-row">\n            <h5>GladBot - Search in Reports</h5>\n            <span>Searches for reports containing the specified keyword and gold amount. Limit 15 pages.</span>\n            <br>\n            <div class="input-container">\n                <input type="text" id="searchReports" placeholder="Enter keyword">\n                <input type="number" id="goldFilter" placeholder="Minimum gold">\n                <button class="awesome-button" id="searchReportsButton">Search</button>\n            </div>\n        </div>\n    ';
			const c = document.querySelector("#content");
			c.insertBefore(b, c.firstChild);
			document.getElementById("searchReportsButton").addEventListener("click", async () => {
				const g = document.getElementById("searchReports").value,
					l = parseInt(document.getElementById("goldFilter").value, 10) || 0,
					q = document.getElementById("searchReportsButton");
				q.disabled = !0;
				try {
					await e(g, l)
				} finally {
					q.disabled = !1
				}
			});
			async function e(g, l) {
				let q = 1;
				var n = await jQuery.get(window.location.href);
				n = jQuery(n).find(".paging_right_full");
				0 < n.length &&
					(n = n.last().attr("href")) && (n = n.match(/page=(\d+)(?!.*page=)/)) && n[1] && (q = parseInt(n[1], 10));
				n = [];
				for (let r = 1; r <= q && 15 >= r; r++) {
					var m = await h(r);
					m = k(m, g, l);
					0 < m.length && (n = n.concat(m))
				}
				if (0 < n.length) {
					const r = document.querySelector(".table-container tbody");
					r.innerHTML = "";
					n.forEach(x => {
						r.appendChild(x)
					})
				}
			}
			async function h(g) {
				let l = "";
				window.location.href.includes("index.php?mod=reports&submod=showArena") ? l = "showArena" : window.location.href.includes("index.php?mod=reports&submod=showCircusTurma") ? l = "showCircusTurma" :
					window.location.href.includes("index.php?mod=reports&submod=showDungeons") ? l = "showDungeons" : window.location.href.includes("index.php?mod=reports&showExpeditions") && (l = "showExpeditions");
				g = G({
					mod: "reports",
					submod: l,
					page: g,
					sh: X("sh")
				});
				return await jQuery.get(g)
			}

			function k(g, l, q) {
				let n = [];
				jQuery(g).find(".table-container tr").each((m, r) => {
					var x = jQuery(r);
					m = window.location.href.includes("index.php?mod=reports&showExpeditions") || window.location.href.includes("index.php?mod=reports&showDungeons") ? x.find("td").eq(1).text().trim() :
						x.find("td").eq(1).find("a").first().text().trim();
					x = x.find("td").eq(2).text().trim().replace(/[.,]/g, "");
					x = parseInt(x, 10) || 0;
					m.toLowerCase().includes(l.toLowerCase()) && x >= q && n.push(r)
				});
				return n
			}
		}
		if (window.location.href.includes("/index.php?mod=overview&doll=2")) {
			const b = Array.from(document.querySelectorAll("#char [data-soulbound-to]")).map(c => Zb(c));
			localStorage.setItem("mercenaryEquipmentIDs", JSON.stringify(b))
		} else if (window.location.href.includes("/index.php?mod=overview")) {
			const b = Array.from(document.querySelectorAll("#char [data-soulbound-to]")).map(c =>
				Zb(c));
			localStorage.setItem("playerEquipmentIDs", JSON.stringify(b))
		}
		if (window.location.href.includes("/index.php?mod=inventory&sub") && document.querySelector('td[valign="top"]')) {
			let b = !0;
			async function c() {
				var m = document.getElementById("sortCriteria");
				let r = Array.from(m.selectedOptions).map(A => A.value),
					x = document.getElementById("shop");
				m = Array.from(x.querySelectorAll(".ui-draggable")).map(A => {
					let D = Zb(A),
						B = parseInt(A.getAttribute("data-level"), 10) || 0,
						t = A.getAttribute("data-basis") || "",
						v = parseInt(t.split("-")[1],
							10) || 0,
						z = parseInt(A.getAttribute("data-quality"), 10) || 0,
						C = parseInt(A.getAttribute("data-content-type"), 10) || 0,
						I = parseInt(A.getAttribute("data-measurement-x"), 10) || 1,
						H = parseInt(A.getAttribute("data-measurement-y"), 10) || 1;
					return {
						element: A,
						name: D,
						level: B,
						fc: t,
						type: C,
						an: v,
						quality: z,
						measurementX: I,
						measurementY: H,
						Sp: parseInt(A.getAttribute("data-position-x"), 10),
						Tp: parseInt(A.getAttribute("data-position-y"), 10)
					}
				});
				m.sort((A, D) => {
					for (let B of r) {
						let t;
						switch (B) {
							case "name":
								t = A.name.localeCompare(D.name);
								break;
							case "level":
								t = A.level - D.level;
								break;
							case "data-basis":
								t = A.an - D.an;
								break;
							case "quality":
								t = A.quality - D.quality;
								break;
							case "type":
								t = A.type - D.type;
								break;
							default:
								t = 0
						}
						if (0 !== t) return t
					}
					return 0
				});
				let u = 0,
					w = 0;
				for (let A of m) A.element.setAttribute("data-position-x", u + 1), A.element.setAttribute("data-position-y", w + 1), A.element.style.left = `${32*u}px`, A.element.style.top = `${32*w}px`, u += A.measurementX, 6 <= u && (u = 0, w += 1);
				x.innerHTML = "";
				m.forEach(A => {
					x.appendChild(A.element)
				})
			}(function() {
				let m = `
                <section class="merchant-settings" style="display: block;">
                    <div class="sorting-options">
                        <label for="sortCriteria">Sort Items By:</label>
                        <select id="sortCriteria">
                            <option value="name">Name</option>
                            <option value="level">Level</option>
                            <option value="data-basis">Base</option>
                            <option value="type">Type</option>
                            <option value="quality">Quality</option>
                        </select>
                        <button class="awesome-button" type="button" id="sortItemsButton">Sort Items</button>
                        
                    </div>
                    <p>
                    <div class="actions">
                        <button class="awesome-button" type="button">${d.Hj}</button>
                        <button class="awesome-button" type="button">${d.Ij}</button>
                        <button class="awesome-button" type="button">Buy All</button>
                        <button class="awesome-button" type="button">Buy 10</button>
                    </div>
                    <ul class="compact-list">
                        <li><input type="checkbox" id="chkWeapons"><label for="chkWeapons">${d.fa}</label></li>
                        <li><input type="checkbox" id="chkShields"><label for="chkShields">${d.ca}</label></li>
                        <li><input type="checkbox" id="chkChestArmour"><label for="chkChestArmour">${d.U}</label></li>
                        <li><input type="checkbox" id="chkHelmets"><label for="chkHelmets">${d.X}</label></li>
                        <li><input type="checkbox" id="chkGloves"><label for="chkGloves">${d.W}</label></li>
                        <li><input type="checkbox" id="chkShoes"><label for="chkShoes">${d.da}</label></li>
                        <li><input type="checkbox" id="chkRings"><label for="chkRings">${d.aa}</label></li>
                        <li><input type="checkbox" id="chkAmulets"><label for="chkAmulets">${d.T}</label></li>
                        <li><input type="checkbox" id="chkUsable"><label for="chkUsable">${d.yi}</label></li>
                        <li><input type="checkbox" id="chkUpgrades"><label for="chkUpgrades">${d.xi}</label></li>
                        <li><input type="checkbox" id="chkRecipes"><label for="chkRecipes">${d.Zg}</label></li>
                        <li><input type="checkbox" id="chkMercenary"><label for="chkMercenary">${d.og}</label></li>
                        <li><input type="checkbox" id="chkScroll"><label for="chkScroll">Scroll</label></li>
                        <li><input type="checkbox" id="chkReinforcements"><label for="chkReinforcements">${d.ah}</label></li>
                    </ul>
                </section>
                `;
				document.getElementById("inv").insertAdjacentHTML("afterend", m)
			})();
			async function e() {
				if (b) {
					var m = Array.from(document.querySelectorAll("#inv .ui-draggable")).filter(r => {
						r = r.getAttribute("data-content-type");
						if (document.getElementById("chkWeapons").checked && "2" == r || document.getElementById("chkShields").checked && "4" == r || document.getElementById("chkChestArmour").checked && "8" == r || document.getElementById("chkHelmets").checked && "1" == r || document.getElementById("chkGloves").checked && "256" ==
							r || document.getElementById("chkShoes").checked && "512" == r || document.getElementById("chkRings").checked && "48" == r || document.getElementById("chkAmulets").checked && "1024" == r || document.getElementById("chkUsable").checked && "4096" == r || document.getElementById("chkUpgrades").checked && "4096" == r || document.getElementById("chkRecipes").checked && "8192" == r || document.getElementById("chkMercenary").checked && "16384" == r || document.getElementById("chkScroll").checked && "64" == r || document.getElementById("chkReinforcements").checked &&
							"4096" == r) return !0;
						if (b) return !1
					});
					for (let r = 0; r < m.length && b; r++) await new Promise(x => setTimeout(x, 200)), Ba(m[r], "shop")
				}
			}
			async function h() {
				if (b) {
					var m = document.querySelectorAll("#inv .ui-draggable");
					for (let r = 0; r < m.length; r++) await new Promise(x => setTimeout(x, 200)), Ba(m[r], "shop")
				}
			}
			async function k() {
				if (b) {
					var m = document.querySelectorAll("#shop .ui-draggable");
					for (let r = 0; r < m.length; r++) await new Promise(x => setTimeout(x, 200)), Ba(m[r], "inv")
				}
			}
			async function g() {
				if (b) {
					var m = document.querySelectorAll("#shop .ui-draggable");
					for (let r = 0; 10 > r; r++) await new Promise(x => setTimeout(x, 200)), Ba(m[r], "inv")
				}
			}
			let l = document.querySelector(".actions .awesome-button:nth-child(2)"),
				q = document.querySelector(".actions .awesome-button:nth-child(3)"),
				n = document.querySelector(".actions .awesome-button:nth-child(4");
			document.querySelector(".actions .awesome-button:nth-child(1)").addEventListener("click", async () => {
				b = !0;
				await new Promise(m => setTimeout(m, 500));
				h()
			});
			l.addEventListener("click", async () => {
				b = !0;
				await new Promise(m => setTimeout(m,
					500));
				e()
			});
			q.addEventListener("click", async () => {
				await new Promise(m => setTimeout(m, 500));
				k()
			});
			n.addEventListener("click", async () => {
				await new Promise(m => setTimeout(m, 500));
				g()
			});
			document.getElementById("sortItemsButton").addEventListener("click", async () => {
				await new Promise(m => setTimeout(m, 500));
				await c()
			})
		}
		if (window.location.href.includes("/index.php?mod=player&p") || window.location.href.includes("/index.php?mod=player&doll"))
			if (gf = document.querySelector(".playername.ellipsis") || document.querySelector(".playername_achievement.ellipsis"),
				vb = gf.textContent.trim(), 2 < vb.length) {
				hf = document.getElementById("char");

				function b(c, e, h, k) {
					var g = document.createElement("a");
					g.className = "gladbot-button gladbot-" + c;
					g.textContent = e;
					g.setAttribute("data-tooltip", h);
					hf.appendChild(g);
					(JSON.parse(localStorage.getItem(k)) || []).includes(vb) && (g.classList.add("added"), g.setAttribute("data-tooltip", "Remove from " + ("autoAttackList" === k ? "Arena" : "Circus")));
					g.addEventListener("click", function() {
						var l = vb,
							q = JSON.parse(localStorage.getItem(k)) || [],
							n = q.indexOf(l); -
						1 !== n ? (q.splice(n, 1), g.classList.remove("added"), g.setAttribute("data-tooltip", "Add to " + ("autoAttackList" === k ? "Arena" : "Circus"))) : (q.push(l), g.classList.add("added"), g.setAttribute("data-tooltip", "Remove from " + ("autoAttackList" === k ? "Arena" : "Circus")));
						localStorage.setItem(k, JSON.stringify(q))
					})
				}
				b("arena", "A", "GladB: Add to Arena List", "autoAttackList");
				b("circus", "C", "GladB: Add to Circus List", "autoAttackCircusList")
			} var Rc = JSON.parse(localStorage.getItem("smeltingSettings")) || [],
			Fa = JSON.parse(localStorage.getItem("smeltRandomlySettings")) || {
				itemTypes: [],
				colors: [],
				hammerState: "none",
				enabled: !1
			},
			hc = JSON.parse(localStorage.getItem("resetColors")) || {
				colors: []
			};
		"true" == localStorage.getItem("pauseBotEnable") && tf("pauseBot") && (sessionStorage.setItem("autoGoActive", "false"), localStorage.setItem("pauseBotEnable", "false"), alert("Bot has been paused!"), window.location.reload());
		1 == sa && tf("storeForgeResources") && fj();
		!0 === sa && tf("Training") && "true" == localStorage.getItem("trainEnable") && hj() && await gj();
		"true" === sessionStorage.getItem("autoGoActive") &&
			bb.href.includes("submod=showCombatReport") && ij();
		if ("true" === localStorage.getItem("HighlightUnderworldItems")) {
			function b(e) {
				e.querySelectorAll("div[data-basis]").forEach(h => {
					const k = h.getAttribute("data-basis"),
						g = h.getAttribute("data-hash");
					h.getAttribute("data-level");
					null != k && Ib(k, g) && (h.style.boxShadow = "0 0 0.1px 2px red")
				})
			}
			b(document);
			const c = new MutationObserver(e => {
				e.forEach(h => {
					h.addedNodes && h.addedNodes.forEach(k => {
						1 === k.nodeType && b(k)
					})
				});
				c.disconnect()
			});
			c.observe(document.body, {
				childList: !0,
				subtree: !0
			});
			document.querySelectorAll(".awesome-tabs").forEach(e => {
				e.addEventListener("click", () => {
					setTimeout(() => {
						b(document)
					}, 500)
				})
			})
		}
		if ("true" == localStorage.getItem("AutoAuction")) {
			const b = JSON.parse(localStorage.getItem("searchTerms") || "[]"),
				c = JSON.parse(localStorage.getItem("SearchTypes") || "[]"),
				e = JSON.parse(localStorage.getItem("Timers")),
				h = new DOMParser;

			function k(n, m, r) {
				let x = [],
					u = [];
				Array.from(n).forEach(w => {
					const A = w.getAttribute("data-tooltip");
					var D = w.getAttribute("data-content-type");
					const B = w.getAttribute("data-quality"),
						t = m.some(v => {
							const z = df(A);
							return z ? z.toLowerCase().split(/\s+/).includes(v.toLowerCase()) : !1
						});
					D = r.includes("9999") || r.includes(D);
					"2" == B || "3" == B ? u.push(w) : t && D && x.push(w)
				});
				return {
					En: x,
					Hn: u
				}
			}
			if (tf("ShopSearch")) {
				const n = await Nf();
				let m = [],
					r = [];
				for (const w of n) {
					const A = k(w.querySelectorAll("#shop .ui-draggable"), b, c);
					A.En.forEach(D => {
						D.setAttribute("data-original-url", w.Nm)
					});
					A.Hn.forEach(D => {
						D.setAttribute("data-original-url", w.Nm)
					});
					m = m.concat(A.En);
					r = r.concat(A.Hn)
				}
				const x =
					m.map(w => w.outerHTML);
				localStorage.setItem("MatchingShopItems", JSON.stringify(x));
				const u = r.map(w => w.outerHTML);
				localStorage.setItem("UniqueShopResults", JSON.stringify(u));
				Z("ShopSearch", e.SearchTimer || 5)
			}
			if (tf("AuctionSearch")) {
				const n = await jh(),
					m = await jh(3),
					r = w => Array.from(w.querySelectorAll('#auction_table [class^="item-i-"]')).filter(A => {
						const D = A.getAttribute("data-tooltip");
						var B = A.getAttribute("data-content-type");
						A = b.some(t => {
							const v = df(D);
							return v ? v.toLowerCase().split(/\s+/).includes(t.toLowerCase()) :
								!1
						});
						B = c.includes("9999") || c.includes(B);
						return A && B
					}),
					x = r(n);
				localStorage.setItem("MatchingAuctionItems", JSON.stringify(x.map(w => w.outerHTML)));
				const u = r(m);
				localStorage.setItem("MatchingMercAuctionItems", JSON.stringify(u.map(w => w.outerHTML)));
				Z("AuctionSearch", e.SearchTimer || 5)
			}

			function g(n, m, r) {
				const x = document.createElement("div");
				x.setAttribute("id", r);
				x.classList.add("search_results_panel");
				var u = document.createElement("div");
				u.classList.add("panel-header");
				u.innerHTML = `<h2>${n}</h2>`;
				x.appendChild(u);
				x.style.cssText = "\n                position: fixed;\n                left: 0;\n                top: 0;\n                width: 300px;\n                height: 400px; /* Set a default height */\n                overflow-y: auto; /* Allow both vertical and horizontal scrolling if needed */\n                overflow-x: hidden;\n                z-index: 500;\n                box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.3);\n                font-family: 'Arial', sans-serif;\n                background: rgba(221, 213, 180, 0.95);\n                background-size: cover;\n                border-radius: 8px;\n            ";
				n = x.querySelector(".panel-header");
				n.style.cssText = `
                background-color: ${"auction_items_panel"===r?"#bead79":"#8b6a45"};
                padding: 10px;
                cursor: move; /* Set cursor to move only on the header */
                user-select: none;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
            `;
				n.querySelector("h2").style.cssText = "\n                margin: 0;\n                font-size: 16px;\n                color: #fff;\n            ";
				n = localStorage.getItem(`${r}_top`);
				u = localStorage.getItem(`${r}_left`);
				let w = localStorage.getItem(`${r}_width`),
					A = localStorage.getItem(`${r}_height`);
				n && u ? (x.style.top = n + "px", x.style.left = u + "px") : "auction_items_panel" === r ? (x.style.top = "50px", x.style.left = "20px") : "shop_items_panel" === r && (x.style.top = "50px", x.style.left = "350px");
				w && (x.style.width =
					w + "px");
				A && (x.style.height = A + "px");
				q(x, r);
				m = l(m);
				x.appendChild(m);
				document.body.appendChild(x);
				x.style.maxHeight = `${window.innerHeight-100}px`
			}

			function l(n) {
				const m = document.createElement("div");
				m.classList.add("items-container");
				n.forEach(({
					key: r,
					label: x
				}) => {
					const u = document.createElement("div");
					u.classList.add("section-header");
					u.textContent = x;
					m.appendChild(u);
					const w = document.createElement("div");
					w.classList.add("grid-container");
					w.style.display = "grid";
					w.style.gridTemplateColumns = "repeat(auto-fill, minmax(50px, 1fr))";
					w.style.Gp = "5px";
					w.style.padding = "10px";
					x = localStorage.getItem(r);
					(JSON.parse(x) || []).forEach(A => {
						const D = h.parseFromString(A, "text/html").body.firstChild.cloneNode(!0);
						D.style.left = "";
						D.style.top = "";
						D.style.position = "relative";
						A = D.getAttribute("data-tooltip");
						var B = JSON.parse(A.replace(/&quot;/g, '"'));
						A = B[0][0][1].split(";")[0];
						const t = encodeURIComponent(B[0][0][0].split(" ")[0]);
						B = new URL(window.location.href);
						const v = B.origin,
							z = B.searchParams.get("sh") || "";
						B = document.createElement("div");
						B.classList.add("auction_item_div");
						B.appendChild(D);
						B.style.border = "2px solid " + A;
						B.style.borderRadius = "4px";
						B.style.padding = "2px";
						B.style.boxSizing = "border-box";
						B.style.cursor = "pointer";
						B.style.transform = "scale(0.8)";
						B.addEventListener("click", () => {
							var C = D.getAttribute("data-hash");
							localStorage.setItem("highlightedItemHash", C);
							if (["UniqueShopResults", "MatchingShopItems"].includes(r)) {
								if (C = D.getAttribute("data-original-url")) location.href = C
							} else C = `${v}/game/index.php?mod=auction&qry=${t}&itemLevel=1&itemType=0&itemQuality=-1&sh=${z}`,
								"MatchingMercAuctionItems" === r && (C += "&ttype=3"), location.href = C
						});
						w.appendChild(B)
					});
					m.appendChild(u);
					m.appendChild(w)
				});
				return m
			}

			function q(n, m) {
				const r = n.querySelector(".panel-header");
				$(n).draggable({
					handle: r,
					tp: "window",
					stop: function(x, u) {
						localStorage.setItem(`${m}_top`, u.position.top);
						localStorage.setItem(`${m}_left`, u.position.left)
					}
				});
				$(n).resizable({
					Hp: "n, e, s, w, ne, se, sw, nw",
					stop: function(x, u) {
						localStorage.setItem(`${m}_width`, u.size.width);
						localStorage.setItem(`${m}_height`, u.size.height)
					}
				})
			}
			(function() {
				document.querySelectorAll(".search_results_panel").forEach(n => n.remove());
				g(`${d.Ua}`, [{
					key: "MatchingAuctionItems",
					label: `${d.Ua}`
				}, {
					key: "MatchingMercAuctionItems",
					label: `${d.ng}`
				}], "auction_items_panel");
				g(`${d.Ub}`, [{
					key: "MatchingShopItems",
					label: `${d.Ub}`
				}, {
					key: "UniqueShopResults",
					label: `${d.wi}`
				}], "shop_items_panel")
			})()
		}
		if (document.hidden) try {
			chrome.runtime.sendMessage({
				vn: !0,
				xm: "https://raw.githubusercontent.com/fociisoftware/glbt/main/aud.mp3"
			})
		} catch (b) {}
		var Aj = btoa("autoGoActive"),
			Bj = btoa("false");
		await async function() {
			"a07d007624140ff70ecd788b780be2cf17f04a898fcc0b8b81e6ad3d47717a9b" !== await jj(ta) && sessionStorage.setItem(atob(Aj), atob(Bj))
		}();
		setInterval(() => {
			const b = JSON.parse(localStorage.getItem("timeConditions")) || [];
			var c = "true" === localStorage.getItem("botPaused");
			if (b && 0 < b.length && !c && Mc()) {
				c = new Date;
				const e = `${String(c.getHours()).padStart(2,"0")}:${String(c.getMinutes()).padStart(2,"0")}`;
				b.forEach(h => {
					h.start && h.end && (h.start > h.end ? e >= h.start || e <= h.end : e >= h.start &&
						e <= h.end) && ("stop" === h.action ? sessionStorage.setItem("autoGoActive", "false") : "start" === h.action && "false" === sessionStorage.getItem("autoGoActive") && (sessionStorage.setItem("autoGoActive", "true"), ef()))
				})
			}
		}, 15E3);
		var Wb = (new Date).getTime();
		if (!wa !== Nc) {
			"true" === localStorage.getItem("activateAuction2") && qf();
			var kf = {
				Wm(b) {
					let c = localStorage.getItem("MarketboughtItems");
					c ? c = JSON.parse(c) : c = [];
					c.push(b);
					localStorage.setItem("MarketboughtItems", JSON.stringify(c))
				},
				lq() {
					var b = localStorage.getItem("boughtItems");
					b ? b = JSON.parse(b) : b = [];
					let c = document.getElementById("boughtItems");
					for (; c.firstChild;) c.removeChild(c.firstChild);
					for (let e of b) b = document.createElement("option"), b.textContent = e, c.appendChild(b)
				},
				async Yn() {
					var b = new URL(window.location.href),
						c = b.origin;
					const e = b.searchParams.get("sh") || "";
					b = parseInt(localStorage.getItem("MarketHoldGold")) || 0;
					let h = localStorage.getItem("marketItems");
					h = h ? JSON.parse(h) : [];
					const k = {
							jp: "1",
							fp: "2",
							Xo: "3",
							$o: "4",
							Zo: "5",
							gp: "8",
							cp: "6",
							Vo: "9",
							ip: "7",
							Wo: "11",
							hp: "12",
							bp: "13",
							ap: "15",
							Yo: "18",
							rp: "19",
							ep: "20"
						},
						g = {
							Qn: "-1",
							Kn: "0",
							In: "1",
							Mn: "2",
							Ln: "3",
							Nn: "4"
						};
					E(`${d.zf}`);
					const l = {};
					if ("true" === localStorage.getItem("marketOnlyFood")) c = await this.cn(c, e, "-1"), await this.wn([], 7, 1, c, b);
					else {
						for (var q of h) {
							const n = `${k[q.itemType]||"0"}-${g[q.om]||"0"}`;
							l[n] || (l[n] = []);
							l[n].push(q)
						}
						q = h.map(n => g[n.om] || "0");
						q = Math.min(...q);
						c = await this.cn(c, e, q);
						for (const [n, m] of Object.entries(l)) {
							const [r, x] = n.split("-");
							await this.wn(m, r, x, c, b)
						}
					}
				},
				async cn(b, c, e) {
					const h = "true" === localStorage.getItem("marketOnlyFood");
					let k = `${b}/game/index.php?mod=market&sh=${c}&qry=&seller=&fl=0&f=0&fq=${e}`;
					h && (k = `${b}/game/index.php?mod=market&sh=${c}&qry=&seller=&fl=0&f=7&fq=${e}`);
					c = await fetch(k).then(B => B.text());
					b = new DOMParser;
					e = b.parseFromString(c, "text/html").querySelector(".standalone");
					c = 1;
					e && (c = parseInt(e.textContent.split("/")[1], 10));
					e = [];
					const g = localStorage.getItem("MarketMaxFoodPrice") || 1E5,
						l = localStorage.getItem("MarketMaxPerFoodPrice") || 1E3,
						q = localStorage.getItem("MarketMinItemLevel") || 1;
					let n = 0;
					for (let B =
							1; B <= c; B++) {
						var m = `${k}&p=${B}`;
						await new Promise(t => setTimeout(t, 250));
						m = await (await fetch(m)).text();
						await new Promise(t => setTimeout(t, 250));
						m = b.parseFromString(m, "text/html").querySelectorAll("#market_item_table tr");
						for (let t of m) {
							var r = t.querySelectorAll("td");
							if (r && 0 < r.length && (m = r[0].querySelector("div"))) {
								var x = Gb(m),
									u = nb(m),
									w = Zb(m),
									A = Hb(m);
								let v = m.getAttribute("data-item-id"),
									z = m.getAttribute("data-soulbound-to");
								r = parseInt(r[2].innerText.replace(/\./g, ""), 10);
								var D = parseInt(m.getAttribute("data-amount"),
									10) || 1;
								D = r / D;
								if (h && "64" === x && r <= l && (!z || null === z) && Number(A) >= Number(q)) {
									if (n + r > g) break;
									n += r;
									e.push({
										itemRarity: u,
										itemName: w,
										itemDataId: v,
										itemSoulbound: z,
										itemPrice: r,
										pricePerItem: D,
										page: B
									})
								} else h || (x = nb(m), u = Zb(m), w = m.getAttribute("data-item-id"), A = m.getAttribute("data-soulbound-to"), m = parseInt(m.getAttribute("data-amount"), 10) || 1, e.push({
									itemRarity: x,
									itemName: u,
									itemDataId: w,
									itemSoulbound: A,
									itemPrice: r,
									pricePerItem: r / m,
									page: B
								}))
							}
						}
						if (h && n >= g) break
					}
					return e
				},
				async wn(b, c, e, h, k) {
					for (const g of h) {
						const l =
							g.itemName;
						h = g.itemDataId;
						const q = g.itemSoulbound,
							n = g.itemPrice,
							m = g.pricePerItem,
							r = g.page,
							x = {
								Qn: "-1",
								Kn: "0",
								In: "1",
								Mn: "2",
								Ln: "3",
								Nn: "4"
							},
							u = localStorage.getItem("usePacks") || "false";
						"true" === localStorage.getItem("marketOnlyFood") ? da.gold >= n + k && (!q || null === q) && await jQuery.get(G({}), {
							mod: "market",
							buyid: h,
							sh: X("sh"),
							qry: "",
							seller: "",
							f: c,
							fl: 12,
							fq: e,
							s: "",
							p: r,
							buy: "Buy"
						}).then(w => {
							w = (new DOMParser).parseFromString(w, "text/html").getElementById("sstat_gold_val").innerText;
							w = parseInt(w.replace(/\./g, ""), 10);
							if (document.getElementById("sstat_gold_val").innerText = w) da.gold = w;
							kf.Wm(l);
							E(`Bought ${l} for ${n} gold`)
						}) : b.some(w => {
							const A = x[w.om] || "0";
							return l.trim().toLowerCase().includes(w.mn.trim().toLowerCase()) && e == A && da.gold >= n + k && (!q || null === q || "BuySoulbound" === w.Soulbound && q || "DontBuySoulbound" === w.Soulbound && !q) && (Number(w.maxPrice) >= n || "true" == u && Number(w.maxPrice) >= m && da.gold >= n)
						}) && await jQuery.get(G({}), {
							mod: "market",
							buyid: h,
							sh: X("sh"),
							qry: "",
							seller: "",
							f: c,
							fl: 12,
							fq: e,
							s: "",
							p: r,
							buy: "Buy"
						}).then(w => {
							w = (new DOMParser).parseFromString(w, "text/html").getElementById("sstat_gold_val").innerText;
							w = parseInt(w.replace(/\./g, ""), 10);
							if (document.getElementById("sstat_gold_val").innerText = w) da.gold = w;
							kf.Wm(l);
							E(`Bought ${l} for ${n} gold`)
						})
					}
					E(`${d.wb} in Market`)
				}
			};
			(window.location.href.includes("/index.php?mod=forge&submod=workbench") || window.location.href.includes("/index.php?mod=forge&doll=1&submod=workbench") || window.location.href.includes("index.php?mod=forge&doll=2&submod=workbench") || window.location.href.includes("index.php?mod=forge&doll=3&submod=workbench") ||
				window.location.href.includes("index.php?mod=forge&doll=4&submod=workbench") || window.location.href.includes("index.php?mod=forge&doll=5&submod=workbench") || window.location.href.includes("index.php?mod=forge&doll=6&submod=workbench")) && lj();
			var Cj = {
					async start() {
						try {
							const b = ua.repairArena,
								c = ua.repairTurma;
							let e = this.F(),
								h = this.po(e),
								k = this.rn("itemList1"),
								g = this.rn("itemList2");
							const l = JSON.parse(localStorage.getItem("ignoredMaterials")) || [];
							h ? (await this.u(), await this.Ko(h, l)) : b && 0 < k.length ? await this.hn("mod=overview&doll=1",
								ua.itemList1) : c && 0 < g.length && await this.hn("mod=overview&doll=2", ua.itemList2)
						} catch (b) {
							this.handleError()
						}
					},
					F() {
						let b = localStorage.getItem("workbenchItem");
						return b ? JSON.parse(b) : {
							selectedItem: {}
						}
					},
					po(b) {
						try {
							return b.selectedItem && 0 < Object.keys(b.selectedItem).length ? b.selectedItem : !1
						} catch (c) {
							return null
						}
					},
					rn(b) {
						return (b = localStorage.getItem(b)) ? this.Po(b) : []
					},
					Po(b) {
						try {
							let c = JSON.parse(b);
							return Array.isArray(c) && c.every(e => void 0 === e) ? [] : c
						} catch (c) {
							return []
						}
					},
					async hn(b, c) {
						rf !== b ? Mf(b) : (await this.u(),
							0 < this.F().spaces ? await this.nm(c) : this.Bn("workbench"))
					},
					Bn(b) {
						"space" === b ? E("Not enough inventory space for repair. Retrying in 10 minutes.") : "workbench" === b ? E("Not enough empty slots in workbench. Retrying in 10 minutes.") : "material" === b ? E(`${d.ta}`) : E("Repair: Retrying in 10 minutes.");
						b = JSON.parse(localStorage.getItem("Timers"));
						Z("repair", b.Repair || 10);
						window.location.reload()
					},
					async Ko(b, c, e) {
						switch (b.status) {
							case "toWorkbench":
								await this.kj(b.iid);
								break;
							case "toFillGoods":
								0 < c.length && e.workbenchneededitems ?
									await this.Yi(b.slot, -1, e.workbenchneededitems) : await this.hc(b.slot);
								break;
							case "toPackage":
								await this.bd(b.slot);
								break;
							case "toBag":
								await this.Ga();
								break;
							case "toInv":
								await this.bm();
								break;
							case "workbenchToBag":
								await this.sn(b.slot)
						}
					},
					handleError() {
						localStorage.removeItem("workbenchItem");
						const b = JSON.parse(localStorage.getItem("Timers"));
						Z("repair", b.Repair || 10);
						window.location.reload()
					},
					async u() {
						try {
							const b = await jQuery.post(U({}), {
								mod: "forge",
								submod: "getWorkbenchPreview",
								mode: "workbench",
								a: (new Date).getTime(),
								sh: X("sh")
							});
							let c = this.F();
							c.slots = JSON.parse(b).slots;
							c.spaces = c.slots.filter(e => "closed" === e["forge_slots.state"]).length;
							c.freeSlots = c.slots.filter(e => "closed" === e["forge_slots.state"]);
							localStorage.setItem("workbenchItem", JSON.stringify(c))
						} catch (b) {}
					},
					async nm(b) {
						try {
							let c = b.shift();
							E(`${d.Pf}${c.name}`);
							E(`${d.va}`);
							let {
								spot: e,
								bag: h
							} = await dc(c.nn, c.pn);
							const k = await jQuery.post(U({}), {
								mod: "inventory",
								submod: "move",
								from: c.container,
								fromX: 1,
								fromY: 1,
								to: h,
								toX: e.x + 1,
								toY: e.y + 1,
								amount: 1,
								doll: c.doll,
								a: (new Date).getTime(),
								sh: X("sh")
							});
							let g = this.F();
							g.selectedItem || (g.selectedItem = {});
							Object.assign(g.selectedItem, {
								item: c,
								iid: JSON.parse(k).to.data.itemId,
								status: "toWorkbench",
								spot: e,
								bag: h
							});
							localStorage.setItem("workbenchItem", JSON.stringify(g));
							await this.kj(JSON.parse(k).to.data.itemId)
						} catch {
							E("Error repairing the item."), localStorage.setItem("workbenchItem", JSON.stringify({})), window.location.reload()
						}
					},
					async kj(b) {
						try {
							E(`${d.yb}`);
							let c = this.F(),
								e = 0;
							for (let k of c.slots || [])
								if ("closed" ===
									k["forge_slots.state"]) {
									e = k["forge_slots.slot"];
									break
								} const h = await jQuery.post(U({}), {
								mod: "forge",
								submod: "getWorkbenchPreview",
								mode: "workbench",
								slot: e,
								iid: b,
								amount: 1,
								a: (new Date).getTime(),
								sh: X("sh")
							});
							c.slots = JSON.parse(h).slots;
							c.spaces = 0;
							c.freeSlots = [];
							for (let k of c.slots) "closed" === k["forge_slots.state"] && (c.spaces++, c.freeSlots.push(k));
							e = c.freeSlots.shift()["forge_slots.slot"];
							c.workbenchneededitems = JSON.parse(h).slots[e].formula.needed;
							c.workbenchneededitems || (E(`${d.ta}`), Object.assign(c.selectedItem, {
								status: "toBag"
							}), E("Error moving the item to the workbench."), localStorage.setItem("workbenchItem", JSON.stringify(c)), window.location.reload());
							Object.assign(c.selectedItem, {
								slot: e,
								status: "toFillGoods"
							});
							localStorage.setItem("workbenchItem", JSON.stringify(c));
							await this.No(e, b)
						} catch (c) {
							E("Error moving the item to the workbench." + c), window.location.reload()
						}
					},
					async No(b, c) {
						await jQuery.post(U({}), {
							mod: "forge",
							submod: "rent",
							mode: "workbench",
							slot: b,
							rent: 2,
							item: c,
							a: (new Date).getTime(),
							sh: X("sh")
						});
						c = this.F();
						Object.assign(c.selectedItem, {
							slot: b,
							status: "toFillGoods"
						});
						localStorage.setItem("workbenchItem", JSON.stringify(c));
						0 < (JSON.parse(localStorage.getItem("ignoredMaterials")) || []).length ? await this.Yi(b, -1, c.workbenchneededitems) : await this.hc(b)
					},
					async Yi(b, c, e) {
						c = [];
						const h = JSON.parse(localStorage.getItem("ignoredMaterials")) || [];
						for (let k in e) {
							const g = parseInt(k, 10);
							0 < e[k].amount && !h.some(l => parseInt(l, 10) + 18E3 === g) && c.push({
								type: g,
								amount: e[k].amount
							})
						}
						await this.Cl(c, -1, b);
						await jQuery.post(U({
							mod: "forge",
							submod: "start",
							mode: "workbench",
							slot: b,
							a: (new Date).getTime(),
							sh: X("sh")
						}));
						e = this.F();
						e.selectedItem.status = "toPackage";
						localStorage.setItem("workbenchItem", JSON.stringify(e));
						await this.bd(b)
					},
					async Cl(b, c = -1, e) {
						let h = !0;
						for (let g = 0; g < b.length; g++) {
							let l = c,
								q = !1,
								n = b[g].amount;
							b[g].type = b[g].type - 18E3;
							await new Promise(x => setTimeout(x, 800));
							let m = await this.ro(b[g].type);
							const r = Number(localStorage.getItem("repairMaxQuality"));
							for (; l <= r;) {
								var k = m[l] || 0;
								if (0 === k) l++;
								else {
									k = Math.min(n, k);
									n -= k;
									try {
										if (await jQuery.post(U({
												mod: "forge",
												submod: "storageOut",
												type: b[g].type,
												quality: l,
												amount: k,
												a: (new Date).getTime(),
												sh: X("sh")
											})), await this.Dl(b[g].type, l, e, k), q = !0, 0 >= n) break
									} catch (x) {
										if (l++, l > r) {
											h = !1;
											break
										}
									}
								}
							}
							if (!q || 0 < n) h = !1
						}
						return h
					},
					async ro(b) {
						let c = {};
						try {
							const e = await jQuery.get(G({
									mod: "forge",
									submod: "storage",
									sh: X("sh")
								})),
								h = jQuery("<div>").append(e).find("#resource-amount").attr("data-max");
							if (h) {
								const k = JSON.parse(h.replace(/&quot;/g, '"'));
								k[b] && (c = k[b])
							}
							console.log("Quantities for type", b, ":", c)
						} catch (e) {
							console.error("Failed to fetch material quantities:",
								e)
						}
						return c
					},
					async Dl(b, c, e, h) {
						let k = 1,
							g = !1,
							l = this.F(),
							{
								bag: q,
								spot: n
							} = l.selectedItem || {};
						for (await new Promise(m => setTimeout(m, 800)); !g && 5 >= k;) try {
							const m = await jQuery.get(G({
									mod: "packages",
									f: 18,
									fq: c,
									qry: "",
									page: k,
									sh: X("sh")
								})),
								r = jQuery(m).find(".packageItem");
							0 === r.length ? k++ : (r.each(async (x, u) => {
								try {
									let w = jQuery(u).find(".ui-draggable"),
										A = xb(w[0]).split("-")[1],
										D = nb(w[0]),
										B = w.context.querySelector("input").getAttribute("value");
									if (Number(A) == Number(b) && Number(D) == Number(c)) {
										g = !0;
										try {
											const t = await jQuery.post(U({
													mod: "inventory",
													submod: "move",
													from: "-" + B,
													fromX: 1,
													fromY: 1,
													to: q,
													toX: n.x + 1,
													toY: n.y + 1,
													amount: h
												}), {
													a: (new Date).getTime(),
													sh: X("sh")
												}),
												v = JSON.parse(t).to.data.itemId;
											try {
												await jQuery.post(U({
													mod: "forge",
													submod: "toWarehouse",
													mode: "workbench",
													slot: e,
													iid: v,
													amount: h,
													a: (new Date).getTime(),
													sh: X("sh")
												}))
											} catch (z) {
												E(`Error moving material to workbench: ${z}`)
											}
										} catch (t) {
											E(`Error moving material from package to bag: ${t}`)
										}
										return !1
									}
								} catch (w) {
									E(`Error processing package item: ${w}`)
								}
							}), g || k++)
						} catch (m) {
							E(`Error fetching materials from the package on page ${k}: ${m}`),
								k++
						}
						g || E(`Material of type ${b} and quality ${c} not found in packages.`)
					},
					async hc(b, c = -1) {
						let e = this.F();
						await jQuery.post(U({}), {
							mod: "forge",
							submod: "storageToWarehouse",
							mode: "workbench",
							slot: b,
							quality: c,
							a: (new Date).getTime(),
							sh: X("sh")
						});
						c < Number(localStorage.getItem("repairMaxQuality")) ? await this.hc(b, ++c) : (await jQuery.post(U({}), {
								mod: "forge",
								submod: "start",
								mode: "workbench",
								slot: b,
								a: (new Date).getTime(),
								sh: X("sh")
							}), e.selectedItem.status = "toPackage", localStorage.setItem("workbenchItem", JSON.stringify(e)),
							await this.bd(b))
					},
					async bd(b) {
						E(`${d.Of}`);
						let c = this.F();
						c.selectedItem.status = "workbenchToBag";
						localStorage.setItem("workbenchItem", JSON.stringify(c));
						let e;
						try {
							(e = 1100 * c.slots[b].formula.duration) || (e = 12E3)
						} catch (h) {
							e = 12E3
						}
						await new Promise(h => setTimeout(h, e));
						await this.sn(b)
					},
					async sn(b) {
						let c = this.F();
						(await jQuery.post(U({}), {
							mod: "forge",
							submod: "lootbox",
							mode: "workbench",
							slot: b,
							a: (new Date).getTime(),
							sh: X("sh")
						})).includes("document.location.href=document.location.href") ? (Object.assign(c.selectedItem, {
							status: "toBag"
						}), localStorage.setItem("workbenchItem", JSON.stringify(c))) : (Object.assign(c.selectedItem, {
							status: "toBag"
						}), localStorage.setItem("workbenchItem", JSON.stringify(c)), await jQuery.post(U({}), {
							mod: "forge",
							submod: "cancel",
							mode: "workbench",
							slot: b,
							a: (new Date).getTime(),
							sh: X("sh")
						}));
						await this.Ga()
					},
					async Pp(b = 1) {
						E(`${d.va}`);
						let c = await this.F(),
							{
								item: e,
								bag: h,
								spot: k
							} = c.selectedItem,
							g = !1;
						try {
							const u = await jQuery.get(G({}), {
								mod: "packages",
								f: -1,
								fq: e.quality,
								qry: e.name,
								page: b,
								sh: X("sh")
							});
							let w =
								jQuery(u).find(".packageItem").toArray();
							0 === w.length && E(`No package items found on page: ${b}`);
							for (let A of w) {
								let D = A.querySelector(".ui-draggable");
								wb(D);
								var l = nb(D),
									q = Zb(D);
								A.getAttribute("data-soulbound-to");
								var n = D.getAttribute("data-measurement-x"),
									m = D.getAttribute("data-measurement-y"),
									r = A.querySelector("[data-container-number]").getAttribute("data-container-number"),
									x = A.querySelector('input[name="packages[]"]').value;
								if (q === e.name && e.container === x || q === e.name && r.includes(e.container) || q ===
									e.name && e.quality === l) g = !0, c.selectedItem.status = "toInv", localStorage.setItem("workbenchItem", JSON.stringify(c)), await this.tn(A, h, k, r, n, m)
							}
							3 < b ? this.handleError() : g || await this.Ga(++b, !0)
						} catch (u) {
							E(`Error repairing the item. ${u}`), this.zn(), window.location.reload()
						}
					},
					async Ga(b = 1) {
						E(`${d.va}`);
						let c = await this.F(),
							{
								item: e,
								bag: h,
								spot: k
							} = c.selectedItem,
							g = !1;
						e.quality = e?.quality ?? 0;
						try {
							const u = await jQuery.get(G({}), {
								mod: "packages",
								f: -1,
								fq: e.quality,
								qry: e.name,
								page: b,
								sh: X("sh")
							});
							let w = jQuery(u).find(".packageItem").toArray();
							0 === w.length && E(`No package items found on page: ${b}`);
							for (let A of w) {
								let D = A.querySelector(".ui-draggable");
								wb(D);
								var l = nb(D) ?? 0,
									q = Zb(D);
								A.getAttribute("data-soulbound-to");
								var n = D.getAttribute("data-measurement-x"),
									m = D.getAttribute("data-measurement-y"),
									r = A.querySelector("[data-container-number]").getAttribute("data-container-number"),
									x = A.querySelector('input[name="packages[]"]').value;
								if (q === e.name && e.container === x || q === e.name && r.includes(e.container) || q === e.name && e.quality === l) g = !0, c.selectedItem.status =
									"toInv", localStorage.setItem("workbenchItem", JSON.stringify(c)), await this.tn(A, h, k, r, n, m)
							}
							3 < b ? this.handleError() : g || await this.Ga(++b, !0)
						} catch (u) {
							E(`Error repairing the item. ${u}`), this.zn(), window.location.reload()
						}
					},
					async tn(b, c, e, h, k, g) {
						await dc(k, g, async (l, q) => {
							await jQuery.post(U({}), {
								mod: "inventory",
								submod: "move",
								from: h,
								fromX: 1,
								fromY: 1,
								to: q,
								toX: l.x + 1,
								toY: l.y + 1,
								amount: 1,
								a: (new Date).getTime(),
								sh: X("sh")
							});
							await this.bm(h, l, q)
						})
					},
					async bm(b, c, e) {
						E("Trying to move repaired item to the equpiment.");
						b = this.F();
						let {
							item: h
						} = b.selectedItem;
						c = await jQuery.post(U({}), {
							mod: "inventory",
							submod: "move",
							from: e,
							fromX: c.x + 1,
							fromY: c.y + 1,
							to: h.container,
							toX: 1,
							toY: 1,
							amount: 1,
							doll: h.doll,
							a: (new Date).getTime(),
							sh: X("sh")
						});
						c.includes(`"data":{"containerNumber":${h.container}`) ? (Object.assign(b.selectedItem, {
							status: "toInv"
						}), localStorage.setItem("workbenchItem", JSON.stringify(b)), await this.no(c, h)) : (Object.assign(b.selectedItem, {
							status: "toBag"
						}), localStorage.setItem("workbenchItem", JSON.stringify(b)), window.location.reload())
					},
					async no(b, c) {
						let e, h, k = localStorage.getItem("repairPercentage") || 10;
						try {
							e = JSON.parse(b).to.data.tooltip.pop().pop()[0].match(/\d+/g), h = Number(e[0]) / Number(e[1]) * 100
						} catch (g) {
							location.reload()
						}
						h < parseInt(k, 10) ? (this.So(c.container, 2 === c.doll), E(`${d.ta}`)) : (E(`${d.Rf}`), ja("itemRepaired", 0));
						b = this.F();
						delete b.selectedItem;
						localStorage.setItem("workbenchItem", JSON.stringify(b));
						window.location.reload()
					},
					So(b, c = !1) {
						const e = JSON.parse(localStorage.getItem("activeItemsGladiator") || "{}"),
							h = JSON.parse(localStorage.getItem("activeItemsMercenary") ||
								"{}"),
							k = JSON.parse(localStorage.getItem("disabledTimeGladiator") || "{}"),
							g = JSON.parse(localStorage.getItem("disabledTimeMercenary") || "{}"),
							l = {
								2: "helmet",
								11: "necklace",
								3: "weapon",
								5: "armor",
								4: "shield",
								9: "gloves",
								10: "shoes",
								6: "rings1",
								7: "rings2"
							},
							q = {
								2: "helmetM",
								11: "necklaceM",
								3: "weaponM",
								5: "armorM",
								4: "shieldM",
								9: "glovesM",
								10: "shoesM",
								6: "rings1M",
								7: "rings2M"
							};
						b = c ? q[b] : l[b];
						c ? h[b] && (h[b] = !1, g[b] = Date.now(), localStorage.setItem("activeItemsMercenary", JSON.stringify(h)), localStorage.setItem("disabledTimeMercenary",
							JSON.stringify(g))) : e[b] && (e[b] = !1, k[b] = Date.now(), localStorage.setItem("activeItemsGladiator", JSON.stringify(e)), localStorage.setItem("disabledTimeGladiator", JSON.stringify(k)))
					},
					zn() {
						this.Bn()
					}
				},
				yj = {
					dm: [],
					async Oo(b) {
						try {
							let e;
							const h = parseInt(localStorage.getItem("smeltTab"), 10) || 1;
							E("Repairing before smelting, please wait...");
							1 === h ? e = 514 : 2 === h ? e = 515 : 3 === h ? e = 516 : 4 === h ? e = 517 : 5 === h ? e = 518 : 6 === h && (e = 519);
							const k = await this.mo(b);
							if (k) {
								var c = await this.Fo(b);
								if (null === c) console.error("Failed to move item to workbench.");
								else return await this.Rm(c), await this.Uo(c), await this.$n(c, e, k)
							} else console.error(`Item with ID ${b} not found in inventory.`)
						} catch (e) {}
					},
					async mo(b) {
						let c = null;
						document.querySelectorAll("#inv .ui-draggable").forEach(e => {
							if (e.getAttribute("data-item-id") === b) {
								const h = parseInt(e.getAttribute("data-position-x"), 10) + 1,
									k = parseInt(e.getAttribute("data-position-y"), 10) + 1,
									g = nb(e);
								e = Zb(e).toLowerCase();
								c = {
									container: "inv",
									x: h,
									y: k,
									quality: g,
									name: e
								};
								return !1
							}
						});
						return c
					},
					async Fo(b) {
						const c = await this.oo();
						if (null === c) return E("No available workbench slots. Continuing without repair."), !1;
						const e = await jQuery.post(U({}), {
							mod: "forge",
							submod: "getWorkbenchPreview",
							mode: "workbench",
							slot: c,
							iid: b,
							amount: 1,
							a: (new Date).getTime(),
							sh: X("sh")
						});
						if ("0" === (localStorage.getItem("PartialOrFull") || "0")) try {
							this.dm = JSON.parse(e).slots[c].formula.needed
						} catch {
							E("Error getting needed items for repair.")
						}
						await jQuery.post(U({}), {
							mod: "forge",
							submod: "rent",
							mode: "workbench",
							slot: c,
							rent: 2,
							item: b,
							a: (new Date).getTime(),
							sh: X("sh")
						});
						return c
					},
					async oo() {
						var b = await jQuery.post(U({}), {
							mod: "forge",
							submod: "getWorkbenchPreview",
							mode: "workbench",
							a: (new Date).getTime(),
							sh: X("sh")
						});
						b = JSON.parse(b).slots;
						let c = null;
						for (let e of b)
							if ("closed" === e["forge_slots.state"]) {
								c = e["forge_slots.slot"];
								break
							} return c
					},
					async Rm(b) {
						"0" === (localStorage.getItem("PartialOrFull") || "0") && 0 < Object.keys(this.dm).length ? await this.Yi(b) : await this.lo(b);
						await jQuery.post(U({}), {
							mod: "forge",
							submod: "start",
							mode: "workbench",
							slot: b,
							a: (new Date).getTime(),
							sh: X("sh")
						})
					},
					async lo(b) {
						const c = localStorage.getItem("repairBeforeSmeltMaxQuality") || 1;
						await jQuery.post(U({}), {
							mod: "forge",
							submod: "storageToWarehouse",
							mode: "workbench",
							slot: b,
							quality: c,
							a: (new Date).getTime(),
							sh: X("sh")
						})
					},
					async Yi(b) {
						let c = [];
						const e = JSON.parse(localStorage.getItem("ignoredMaterials")) || [];
						for (let h in this.dm) {
							const k = parseInt(h, 10);
							0 < this.dm[h].amount && !e.some(g => parseInt(g, 10) + 18E3 === k) && c.push({
								type: k,
								amount: this.dm[h].amount
							})
						}
						await this.Cl(c, -1, b)
					},
					async Cl(b, c = -1, e) {
						for (let h = 0; h < b.length; h++) {
							let k =
								c,
								g = 0,
								l = 1;
							2 >= b[h].amount && (l = 1);
							for (b[h].type = b[h].type - 18E3; k <= Number(localStorage.getItem("repairMaxQuality")) && g < l;) try {
								if (await jQuery.post(U({
										mod: "forge",
										submod: "storageOut",
										type: b[h].type,
										quality: k,
										amount: 1,
										a: (new Date).getTime(),
										sh: X("sh")
									})), await this.Dl(b[h].type, k, e, 1), g++, g <= l) break
							} catch (q) {
								if (k++, k > Number(localStorage.getItem("repairMaxQuality"))) break
							}
						}
					},
					async Dl(b, c, e, h) {
						let k = 1,
							g = !1,
							{
								spot: l,
								bag: q
							} = await dc(1, 1);
						for (; !g && 5 >= k;) try {
							const n = await jQuery.get(G({
									mod: "packages",
									f: 18,
									fq: c,
									qry: "",
									page: k,
									sh: X("sh")
								})),
								m = jQuery(n).find(".packageItem");
							if (0 === m.length) {
								k++;
								continue
							}
							let r = !1;
							m.each((x, u) => {
								try {
									let w = jQuery(u).find(".ui-draggable"),
										A = xb(w[0]).split("-")[1],
										D = nb(w[0]),
										B = w.context.querySelector("input").getAttribute("value");
									if (A == b && D == c) return r = g = !0, jQuery.post(U({
										mod: "inventory",
										submod: "move",
										from: "-" + B,
										fromX: 1,
										fromY: 1,
										to: q,
										toX: l.x + 1,
										toY: l.y + 1,
										amount: h
									}), {
										a: (new Date).getTime(),
										sh: X("sh")
									}).then(t => {
										try {
											const v = JSON.parse(t).to.data.itemId;
											jQuery.post(U({
												mod: "forge",
												submod: "toWarehouse",
												mode: "workbench",
												slot: e,
												iid: v,
												amount: h,
												a: (new Date).getTime(),
												sh: X("sh")
											})).catch(() => {})
										} catch (v) {}
									}).catch(() => {}), !1
								} catch (w) {}
							});
							r || k++
						} catch (n) {
							E(`Error fetching materials from the package on page ${k}: ${n}`), k++
						}
						g || E(`Material of type ${b} and quality ${c} not found in packages.`)
					},
					async Uo(b) {
						let c = 1E3,
							e = await this.uo(b);
						if (null === e || void 0 === e) e = 6;
						c = 1E3;
						await new Promise(h => setTimeout(h, 1100 * e + c))
					},
					async uo(b) {
						var c = await jQuery.post(U({}), {
							mod: "forge",
							submod: "getWorkbenchPreview",
							mode: "workbench",
							a: (new Date).getTime(),
							sh: X("sh")
						});
						return (c = JSON.parse(c).slots.find(e => e["forge_slots.slot"] === b)) && c.formula && c.formula.duration ? c.formula.duration : 6
					},
					async $n(b, c, e) {
						await jQuery.post(U({}), {
							mod: "forge",
							submod: "lootbox",
							mode: "workbench",
							slot: b,
							a: (new Date).getTime(),
							sh: X("sh")
						});
						return await this.Go(c, e)
					},
					async Go(b, c) {
						let e = 1;
						var h = !1;
						let k;
						for (; !h && 5 >= e;) {
							var g = await jQuery.get(G({
								mod: "packages",
								f: 0,
								fq: c.quality,
								qry: c.name,
								page: e,
								sh: X("sh")
							}));
							g = jQuery(g).find(".packageItem").toArray();
							for (let l of g) {
								jQuery(l).find(".ui-draggable");
								h = l.querySelector("input").value;
								k = (await jQuery.post(U({}), {
									mod: "inventory",
									submod: "move",
									from: "-" + h,
									fromX: 1,
									fromY: 1,
									to: b,
									toX: c.x - 1,
									toY: c.y - 1,
									amount: 1,
									a: (new Date).getTime(),
									sh: X("sh")
								}, null, "json")).to.data.itemId;
								h = !0;
								break
							}
							h || e++
						}
						if (!h) throw Error("Repaired item not found in packages.");
						return k
					}
				},
				R = {
					Am: !1,
					Fm: !0,
					spot: 1,
					bag: 512,
					start() {
						this.pack = function(b, c, e) {
							if (!e) return e;
							var h = 0,
								k = b + c.slice([e.split("^")[1]]);
							for (b = 0; b < k.length; b++) c = k.charCodeAt(b), h = (h << 5) - h + c, h |= 0;
							return e.split("^")[0] ==
								h
						};
						this.storage = JSON.parse(localStorage.getItem("packages")) || {
							packages: {}
						};
						this.createFunctions()
					},
					createFunctions() {
						function b(c) {
							var e = c.getAttribute("data-button");
							const h = c.getAttribute("data-name");
							c.getAttribute("data-value");
							const k = c.classList.toggle("selected");
							"packageAll" === e ? document.querySelectorAll(`.color-box[data-name="${h}"]`).forEach(l => {
								l !== c && l.classList.toggle("selected", k)
							}) : (k || document.querySelector(`.color-box.select-all[data-name="${h}"]`)?.classList.remove("selected"),
								Array.from(document.querySelectorAll(`.color-box[data-name="${h}"]`)).filter(l => l !== c && "packageAll" !== l.getAttribute("data-button")).every(l => l.classList.contains("selected")) && document.querySelector(`.color-box.select-all[data-name="${h}"]`)?.classList.add("selected"));
							e = Array.from(document.querySelectorAll(`.color-box.selected[data-name="${h}"]`)).map(l => l.getAttribute("data-value"));
							const g = JSON.parse(localStorage.getItem("packages") || "{}");
							g[h] = e;
							localStorage.setItem("packages", JSON.stringify(g))
						}
						document.getElementById("ConfirmGetGold").addEventListener("click", async function() {
							async function c(m, r) {
								r = await jQuery.post(U({
									mod: "inventory",
									submod: "move",
									from: m[0].closest("[data-container-number]").getAttribute("data-container-number"),
									fromX: 1,
									fromY: 1,
									to: 512,
									toX: 21 + r,
									toY: 21,
									amount: 1
								}), {
									a: (new Date).getTime(),
									sh: k
								});
								m[0].closest(".packageItem").remove();
								m = JSON.parse(r).header.gold.text || "0";
								m = parseInt(m.replace(/[^0-9]/g, ""), 10);
								q += m - l;
								l = m;
								document.getElementById("goldMovedIndicator").textContent =
									`Gold moved: ${q.toLocaleString()}`
							}
							async function e() {
								var m = await jQuery.get(G({
									mod: "packages",
									f: "14",
									fq: -1,
									qry: "",
									page: g,
									sh: k
								}));
								let r = jQuery(m).find(".ui-draggable").filter((x, u) => (x = parseInt(jQuery(u).attr("data-price-gold"), 10)) && x <= n - l).get();
								for (let [x, u] of r.entries())
									if (await c(jQuery(u), x), l >= n) {
										document.getElementById("goldMovedIndicator").textContent += " - Completed";
										return
									} g++;
								m = (m = jQuery(m).find(".paging_right_full")[0]) ? parseInt(m.href.match(/\d+$/)[0], 10) : 1;
								g < m ? await e() : document.getElementById("goldMovedIndicator").textContent =
									`Not enough gold found. Only ${q.toLocaleString()} moved.`
							}
							let h = parseInt(document.getElementById("getGold").value.replace(/[^0-9]/g, ""), 10);
							if (isNaN(h) || 0 >= h) alert("Please enter a valid amount greater than 0.");
							else {
								var k = X("sh"),
									g = 0,
									l = 0,
									q = 0;
								l = parseInt(document.getElementById("sstat_gold_val").textContent.replace(/[^0-9]/g, ""), 10);
								var n = l + h;
								document.getElementById("goldMovedIndicator").textContent = "Starting...";
								await e()
							}
						});
						document.querySelector("h2").addEventListener("click", () => {
							jQuery(".custom_packages").toggle();
							let c = jQuery(".custom_packages").is(":hidden");
							localStorage.setItem("packages_hidden", c)
						});
						jQuery(".custom_packages").mouseup(async c => {
							var e = c.target;
							c = e.getAttribute("data-button");
							var h = JSON.parse(localStorage.getItem("packages")),
								k = h.quality;
							const g = h.type;
							if (!e.getAttribute("disabled")) {
								switch (c) {
									case "pickAll":
										confirm("Pick all?") && this.pickItems(!0);
										break;
									case "pickAllSelected":
										-1 < va.type.indexOf(14) && confirm("Pick gold");
										this.pickItems(!1);
										break;
									case "sellThisPage":
										if (!h || !h.quality || !h.type) {
											Ya("Please select a valid package with both quality and type.");
											break
										}
										0 < k.length && 0 < g.length ? this.Ro() : (this.Dm = !0, Ya("Please select both quality and type to sell."));
										break;
									case "SARTH":
										this.sarth();
										break;
									case "SASTM":
										if (!h || !h.quality || !h.type) {
											Ya("Please select a valid package with both quality and type.");
											break
										}
										0 < k.length && 0 < g.length ? this.sastm() : (this.Dm = !0, Ya("Please select both quality and type to sell."));
										break;
									case "stop":
										this.stop = !0;
										break;
									case "switch":
										e = document.querySelector('input[data-name="useSmeltFilter"]');
										h = document.querySelector('input[data-name="sellUnderworld"]');
										k = document.querySelector('input[data-name="UCOTH"]');
										e.checked = "true" === localStorage.getItem("useTriggerSmeltFilter");
										h.checked = "true" === localStorage.getItem("packageSellUnderworld");
										k.checked = "true" === localStorage.getItem("useTriggerCloths");
										e.addEventListener("change", function() {
											localStorage.setItem("useTriggerSmeltFilter", this.checked)
										});
										h.addEventListener("change", function() {
											localStorage.setItem("packageSellUnderworld", this.checked)
										});
										k.addEventListener("change", function() {
											localStorage.setItem("useTriggerCloths",
												this.checked)
										});
										break;
									default:
										return
								}
								"stop" != c && "switch" != c && (this.Dm ? this.Dm = !1 : (this.stop = !1, jQuery("[pakageCmd]").attr("disabled", "")))
							}
						});
						document.querySelector(".custom_packages").addEventListener("click", c => {
							var e = c.target.closest(".item-checkbox");
							if (e) {
								var h = e.getAttribute("data-button");
								c = e.getAttribute("data-name");
								if (h && c) {
									var k = Array.from(document.querySelectorAll(`[data-name="${c}"][data-button="package"]`)),
										g = document.querySelector(`[data-name="${c}"][data-button="packageAll"]`),
										l = e.classList.toggle("selected");
									"packageAll" === h ? k.forEach(q => q.classList.toggle("selected", l)) : "package" === h && (!l && g && g.classList.remove("selected"), k.every(q => q.classList.contains("selected")) && g && g.classList.add("selected"));
									e = k.filter(q => q.classList.contains("selected")).map(q => q.getAttribute("data-value"));
									h = JSON.parse(localStorage.getItem("packages") || "{}");
									h[c] = e;
									localStorage.setItem("packages", JSON.stringify(h))
								}
							}
						});
						document.querySelectorAll(".color-box").forEach(c => {
							const e = () => b(c);
							c.addEventListener("touchstart", e, {
								passive: !0
							});
							c.addEventListener("click", e)
						});
						document.querySelectorAll(".item-checkbox img").forEach(c => {
							var e = window.getComputedStyle(c);
							const h = parseInt(e.width, 10);
							e = parseInt(e.height, 10);
							if (64 <= h && 96 <= e) c.style.transform = "scale(0.5)", c.style.width = "64px", c.style.height = "64px", c.style.transformOrigin = "top left";
							else if (32 < h || 32 < e) c.style.width = "64px", c.style.height = "64px", c.style.transform = "scale(0.5)", c.style.transformOrigin = "top left";
							else if (32 == h || 32 == e) c.style.transform = "scale(1)", c.style.transformOrigin =
								"top left"
						});
						(() => {
							var c = JSON.parse(localStorage.getItem("packages") || "{}");
							for (const [k, g] of Object.entries(c)) g.forEach(l => {
								(l = document.querySelector(`[data-name="${k}"][data-value="${l}"]`)) && l.classList.add("selected")
							}), (c = document.querySelector(`[data-name="${k}"][data-button="packageAll"]`)) && Array.from(document.querySelectorAll(`[data-name="${k}"][data-button="package"]`)).every(l => l.classList.contains("selected")) && c.classList.add("selected");
							var e = document.querySelector('input[data-name="useSmeltFilter"]');
							c = document.querySelector('input[data-name="sellUnderworld"]');
							const h = document.querySelector('input[data-name="UCOTH"]');
							if (e) {
								const k = "true" === localStorage.getItem("useTriggerSmeltFilter");
								e.checked = k
							}
							c && (e = "true" === localStorage.getItem("packageSellUnderworld"), c.checked = e);
							h && (h.checked = "true" === localStorage.getItem("useTriggerCloths"))
						})()
					},
					enableButtons() {
						jQuery("[pakageCmd]").removeAttr("disabled")
					},
					pickItems(b, c) {
						va = JSON.parse(localStorage.getItem("packages") || "{}");
						const e = va.type,
							h = va.quality;
						if (b || 0 != e.length && 0 != h.length) {
							var k = ["12"];
							this.arr = Array.from(document.querySelectorAll("#packages .ui-draggable")).filter(g => {
								const l = xb(g),
									[q] = l.split("-").map(Number);
								var n = parseInt(nb(g), 10);
								if (b) return !0;
								g = e.some(m => k.includes(String(q)) ? m === l || m === String(q) : m === l || m === String(q) || l.startsWith(`${m}-`));
								n = h.map(Number).includes(Number(n));
								return g && n
							}).sort((g, l) => Yb(l) - Yb(g));
							R.move();
							c && c()
						} else Ya("No package types or qualities selected")
					},
					async moveGold(b, c) {
						c = await jQuery.post(U({
							mod: "inventory",
							submod: "move",
							from: b.closest("[data-container-number]").getAttribute("data-container-number"),
							fromX: 1,
							fromY: 1,
							to: 512,
							toX: 21 + c,
							toY: 21,
							amount: 1
						}), {
							a: (new Date).getTime(),
							sh: X("sh")
						});
						b.closest(".packageItem").remove();
						document.getElementById("sstat_gold_val").innerText = JSON.parse(c).header.gold.text || 0
					},
					move() {
						var b = document.getElementById("inv"),
							c = mc(b);
						let e = Math.min(40 - bc(c), this.arr.length);
						b = this.arr.shift();
						0 < e && !R.stop ? ((c = pf(b, c)) ? Sa(b, c) : Ba(b, "inv"), setTimeout(() => {
							R.move()
						}, 500)) : setTimeout(R.enableButtons,
							500)
					},
					sarth: function() {
						jQuery.post(U({
							mod: "forge",
							submod: "storageIn"
						}), {
							Kp: 0,
							packages: 1,
							Qm: 1,
							a: (new Date).getTime() + "",
							sh: X("sh")
						}, () => {
							window.location.reload(!0)
						})
					},
					async sastm() {
						R.stop ? window.location.reload() : (document.getElementById("sellspinner").classList.remove("hidden"), this.fm = {}, this.pack && this.Im(this.Tm))
					},
					async Ro() {
						R.stop ? window.location.reload() : (document.getElementById("sellspinner").classList.remove("hidden"), R.Am = !0, this.fm = {}, this.pack && this.Im(this.Tm))
					},
					async Tm(b) {
						if (R.stop) window.location.reload();
						else if (R.fm = b, b = Object.values(b).every(c => c.items.length >= c.tm), R.Pn = document.querySelector('input[data-name="UCOTH"]'), b && !R.Pn.checked) {
							if (b = document.getElementById("sellspinner"), b.classList.add("hidden"), !document.getElementById("shops-full-message")) {
								const c = document.createElement("div");
								c.id = "shops-full-message";
								c.classList.add("message-container");
								c.textContent = "Shops are full! Please refresh the shops or select refresh shops automatically.";
								b.insertAdjacentElement("afterend", c);
								R.enableButtons()
							}
						} else dc(2,
							3, R.Jn)
					},
					async Jn(b, c) {
						R.stop && window.location.reload();
						try {
							R.Un = Object.assign(b, {
								b: c
							})
						} catch (w) {
							Ya("Please empty your inventory to have 3x3 space")
						}
						document.querySelectorAll("#inventory_nav a")[c - 512].click();
						R.inv = document.getElementById("inv");
						const e = JSON.parse(localStorage.getItem("packages")) || {};
						b = (new URL(window.location.href)).searchParams;
						b.get("f");
						b.get("fq");
						let h = {
							mod: "packages",
							f: "0",
							fq: e.quality[0] || -1,
							qry: "",
							page: 1,
							sh: X("sh")
						};
						b = await jQuery.get(G(h));
						b = jQuery(b).find(".paging_right_full")[0]?.href.match(/\d+$/)?.[0] ||
							1;
						console.log(`Max page determined: ${b}`);
						R.g = [];
						R.la = [];
						const k = "true" === localStorage.getItem("useTriggerSmeltFilter"),
							g = "true" === localStorage.getItem("packageSellUnderworld");
						let l = JSON.parse(localStorage.getItem("smeltingSettings")) || [];
						var q = JSON.parse(localStorage.getItem("auctionPrefixes")) || [],
							n = JSON.parse(localStorage.getItem("auctionSuffixes")) || [];
						const m = new Set(JSON.parse(localStorage.getItem("playerEquipmentIDs") || "[]")),
							r = new Set(JSON.parse(localStorage.getItem("mercenaryEquipmentIDs") ||
								"[]"));
						let x = !1;
						if (R.Am) R.Am && (R.stop && window.location.reload(), u = document.querySelectorAll("#packages .packageItem"), b = document.getElementById("sellspinner"), b.classList.remove("hidden"), c = document.getElementById("statusMessage"), c || (c = document.createElement("div"), c.id = "statusMessage", c.classList.add("status-message"), b.insertAdjacentElement("afterend", c)), 0 < u.length ? (c.textContent = `Processing ${u.length} items from the current page...`, u = Array.from(u).map(async w => {
							var A = w.querySelector("input").value,
								D = w.querySelector(".ui-draggable");
							const B = D.getAttribute("data-basis");
							var t = D.getAttribute("data-hash"),
								v = xb(D).split("-");
							const z = parseInt(v[0]);
							var C = v[1] ? parseInt(v[1]) : null;
							v = Ib(B, t);
							t = 14 === z;
							var I = Yb(D);
							const H = Zb(D);
							var K = yb(D);
							const L = ["12"].includes(String(z));
							w = {
								p: w,
								ql: D,
								s: I,
								id: A,
								q: K,
								Sn: z,
								Tn: C,
								name: H,
								yo: B
							};
							A = e.type.some(O => L ? O === B || O === String(z) : O === B || O === String(z) || B.startsWith(`${O}-`));
							D = e.quality.map(Number).includes(Number(nb(D)));
							v = !g && v;
							if (m.has(H) || r.has(H)) x = !0;
							K = l.some(O => {
								var Y =
									O.prefix && 2 < O.prefix.length ? O.prefix.toLowerCase() : null;
								O = O.suffix && 2 < O.suffix.length ? O.suffix.toLowerCase() : null;
								const ea = H.toLowerCase();
								Y = Y && ea.includes(Y);
								O = O && ea.includes(O);
								return Y || O
							});
							C = q.some(O => H.toLowerCase().includes(O.toLowerCase()));
							I = n.some(O => H.toLowerCase().includes(O.toLowerCase()));
							K = k && K;
							k ? !A || !D || K || x || C || I || v ? A && t && !x && !v && R.g.push(w) : R.g.push(w) : A && D && !x && !v ? R.g.push(w) : A && t && !x && !v && R.g.push(w)
						}), await Promise.all(u), 0 < R.g.length ? (c.textContent = `Selling ${R.g.length} items...`,
							await R.On()) : (c.textContent = "No items to sell. Please refresh the page.", b.classList.add("hidden"), R.enableButtons()), R.g = []) : (c.textContent = "No items found in the current page.", b.classList.add("hidden")));
						else {
							c = document.getElementById("sellspinner");
							c.classList.remove("hidden");
							var u = document.getElementById("statusMessage");
							u || (u = document.createElement("div"), u.id = "statusMessage", u.classList.add("status-message"), c.insertAdjacentElement("afterend", u));
							let w = 0;
							for (let A = 1; A <= b; A += 10) {
								const D = Array.from({
									length: Math.min(10,
										b - A + 1)
								}, (B, t) => A + t);
								console.log(`Fetching batch pages: ${D.join(", ")}`);
								u.textContent = `Reading pages ${D[0]} to ${D[D.length-1]}...`;
								await Promise.all(D.map(async B => {
									h.page = B;
									try {
										const t = await jQuery.get(G(h)),
											v = jQuery(t).find(".packageItem");
										0 < v.length && (w += v.length, v.each((z, C) => {
											var I = jQuery(C).find("input").val(),
												H = jQuery(C).find(".ui-draggable")[0];
											const K = H.getAttribute("data-basis");
											z = H.getAttribute("data-hash");
											var L = xb(H).split("-");
											const O = parseInt(L[0]);
											var Y = L[1] ? parseInt(L[1]) : null;
											L = Ib(K, z);
											z = 14 === O;
											var ea = Yb(H),
												ca = yb(H);
											const la = Zb(H).toLowerCase(),
												oa = ["12"].includes(String(O));
											C = {
												p: C,
												ql: H,
												s: ea,
												id: I,
												q: ca,
												Sn: O,
												Tn: Y,
												name: la,
												yo: K
											};
											I = e.type.some(ba => oa ? ba === K || ba === String(O) : ba === K || ba === String(O) || K.startsWith(`${ba}-`));
											H = e.quality.map(Number).includes(Number(nb(H)));
											L = !g && L;
											if (m.has(la) || r.has(la)) x = !0;
											ca = l.some(ba => {
												var pa = ba.prefix && 2 < ba.prefix.length ? ba.prefix.toLowerCase() : null;
												ba = ba.suffix && 2 < ba.suffix.length ? ba.suffix.toLowerCase() : null;
												const xa = la.toLowerCase();
												pa = pa &&
													xa.includes(pa);
												ba = ba && xa.includes(ba);
												return pa || ba
											});
											Y = q.some(ba => la.toLowerCase().includes(ba.toLowerCase()));
											ea = n.some(ba => la.toLowerCase().includes(ba.toLowerCase()));
											ca = k && ca;
											k ? !I || !H || x || ca || Y || ea || L ? I && z && !x && !L && R.g.push(C) : R.g.push(C) : I && !x && H && !L ? R.g.push(C) : I && z && !x && !L && R.g.push(C)
										}))
									} catch (t) {}
								}));
								await new Promise(B => setTimeout(B, 1E3))
							}
							u.textContent = 0 < w ? `Found ${w} items. Preparing to sell...` : "No items found. Please adjust your filters.";
							0 < R.g.length ? (u.textContent = `Selling ${R.g.length} items...`,
								R.sellItems()) : (c.classList.add("hidden"), u.textContent = "No items to sell. Please change your selections and refresh the page.")
						}
					},
					sellItems() {
						R.stop && window.location.reload();
						let b, c, e;
						const h = document.getElementById("sellspinner");
						h.classList.remove("hidden");
						let k = document.getElementById("statusMessage");
						k || (k = document.createElement("div"), k.id = "statusMessage", k.classList.add("status-message"), h.insertAdjacentElement("afterend", k));
						let g = document.getElementById("itemPreview");
						g || (g = document.createElement("div"),
							g.id = "itemPreview", g.classList.add("item-preview"), k.insertAdjacentElement("afterend", g));
						try {
							b = R.g.shift(), c = R.Un, e = R.Um(b.ql)
						} catch {
							0 < R.la.length && !e ? R.useCloths() : (h.classList.add("hidden"), k.textContent = "All items sold. Reloading...", setTimeout(() => window.location.reload(), 2E3));
							return
						}
						if (e) {
							let l = Zb(b.ql);
							k.textContent = `Selling: ${l} (${R.g.length} items left)`;
							g.innerHTML = "";
							g.appendChild(b.p.cloneNode(!0));
							jQuery.post(U({
								mod: "inventory",
								submod: "move",
								from: "-" + b.id,
								fromX: "1",
								fromY: "1",
								to: c.b,
								toX: c.x + 1,
								toY: c.y + 1,
								amount: b.q
							}), {
								a: (new Date).getTime(),
								sh: X("sh")
							}, () => {
								var q = jQuery(b.ql).css({
									left: 32 * c.x,
									top: 32 * c.y
								});
								R.inv.appendChild(q[0]);
								jQuery.post(U({
									mod: "inventory",
									submod: "move",
									from: c.b,
									fromX: c.x + 1,
									fromY: c.y + 1,
									to: e.Cn,
									toX: e.spot.x + 1,
									toY: e.spot.y + 1,
									amount: b.q,
									doll: "1"
								}), {
									a: (new Date).getTime(),
									sh: X("sh")
								}, n => {
									jQuery(b.ql).remove();
									try {
										document.getElementById("sstat_gold_val").innerText = JSON.parse(n).header.gold.text
									} catch {}
									0 < R.g.length ? R.sellItems() : (h.classList.add("hidden"), k.textContent =
										"All items sold successfully!", setTimeout(() => 0 < R.la.length ? R.useCloths() : window.location.reload(), 2E3))
								})
							})
						} else 0 < R.g.length ? (R.la.push(b), R.sellItems()) : (h.classList.add("hidden"), k.textContent = "All items sold. Reloading...", setTimeout(() => 0 < R.la.length ? R.useCloths() : window.location.reload(), 2E3))
					},
					async useCloths() {
						if ("true" === localStorage.getItem("useTriggerCloths") && 0 < R.la.length) {
							R.g = R.la;
							R.la = [];
							var b = await jQuery.get(G({
								mod: "inventory",
								sub: "1",
								subsub: "2",
								sh: X("sh")
							}));
							b = jQuery(b);
							b.find("#content form img")[0].src.includes("91e0372cccc24f52758be611a10a3b.png") ?
								(b = b.find("#content form input")[0], await jQuery.post(G({
									mod: "inventory",
									sub: "1",
									subsub: "2",
									sh: X("sh")
								}), {
									[b.name]: b.value
								}), await new Promise((c, e) => {
									R.Im(h => {
										(R.fm = h) && 0 < Object.keys(h).length ? c() : e("Failed to load shop grid data.")
									})
								}), R.sellItems()) : window.location.reload()
						} else window.location.reload()
					},
					async On() {
						if (!R.stop) {
							for (; 0 < R.g.length;) {
								if (R.Fm) {
									var b = await dc(2, 3);
									R.spot = b.spot;
									R.bag = b.bag;
									R.Fm = !1
								}
								await new Promise(c => setTimeout(c, 10));
								b = R.g.splice(0, 1).map(async c => {
									var e = R.Um(c.ql);
									if (e) {
										const h = await jQuery.post(U({
											mod: "inventory",
											submod: "move",
											from: "-" + c.id,
											fromX: "1",
											fromY: "1",
											to: R.bag,
											toX: R.spot.x + 1,
											toY: R.spot.y + 1,
											amount: c.q
										}), {
											a: (new Date).getTime(),
											sh: X("sh")
										});
										if (h.includes("Not possible") || h.includes("error")) R.Fm = !0;
										else if (e = await jQuery.post(U({
												mod: "inventory",
												submod: "move",
												from: R.bag,
												fromX: R.spot.x + 1,
												fromY: R.spot.y + 1,
												to: e.Cn,
												toX: e.spot.x + 1,
												toY: e.spot.y + 1,
												amount: c.q,
												doll: "1"
											}), {
												a: (new Date).getTime(),
												sh: X("sh")
											})) {
											jQuery(c.element).remove();
											try {
												const k = JSON.parse(e).header.gold.text;
												document.getElementById("sstat_gold_val").innerText = k || ""
											} catch (k) {}
										}
									} else 0 < R.g.length ? R.la.push(c) : 0 < R.la.length ? await R.useCloths() : window.location.reload()
								});
								await Promise.all(b);
								R.g = R.g.filter(c => !R.la.includes(c));
								await new Promise(c => setTimeout(c, 10))
							}
							0 === R.g.length && window.location.reload()
						}
					},
					Um(b) {
						var c = parseInt(b.getAttribute("data-measurement-x"), 10);
						b = parseInt(b.getAttribute("data-measurement-y"), 10);
						for (var e in R.fm) {
							var h = R.fm[e];
							if (!(isNaN(parseInt(e, 10)) || 1 > h.tm)) {
								var k = Ic(b, c, h.grid);
								if (k) return h.tm -= c * b, h.items.push({
									y: k.y,
									x: k.x,
									ml: b,
									w: c
								}), h.grid = Hc(8, 6, h.items), {
									spot: k,
									Cn: e
								}
							}
						}
					},
					Im(b) {
						const c = [{
								sub: 1,
								subsub: 2
							}, {
								sub: 2,
								subsub: 2
							}, {
								sub: 3,
								subsub: 1
							}, {
								sub: 3,
								subsub: 2
							}, {
								sub: 4,
								subsub: 0
							}, {
								sub: 4,
								subsub: 1
							}, {
								sub: 4,
								subsub: 2
							}, {
								sub: 5,
								subsub: 0
							}, {
								sub: 5,
								subsub: 1
							}, {
								sub: 5,
								subsub: 2
							}, {
								sub: 6,
								subsub: 0
							}, {
								sub: 6,
								subsub: 1
							}, {
								sub: 6,
								subsub: 2
							}].map(h => G({
								mod: "inventory",
								sh: X("sh"),
								...h
							})),
							e = {};
						Promise.all(c.map((h, k) => new Promise((g, l) => {
							jQuery.get(h, q => {
								try {
									const n = jQuery(q).find("#shop")[0],
										m = n.getAttribute("data-container-number"),
										r = mc(n);
									e[m] = {
										tm: 48 - bc(r),
										grid: Hc(8, 6, r),
										items: r
									};
									g()
								} catch (n) {
									l(n)
								}
							}).fail((q, n, m) => {
								l(Error(`Error loading shop grid ${k}: ${n} - ${m}`))
							})
						}))).then(() => {
							0 < Object.keys(e).length && b(e)
						}).catch(h => console.error("Error in gsgriz:", h))
					}
				};
			if (window.location.href.includes("/index.php?mod=market")) {
				let b = [];
				const c = document.querySelector("#market_filter");
				if (c) {
					const B = document.createElement("div");
					B.innerHTML = `
    <div class="custom-market-section">
        <div class="custom-market-header">${d.Db}</div>
        <div class="custom-market-content">
            <div class="item-sell-form" id="item-sell-form">
                <span class="custom-market-footer">${d.gg}</span>
                <span class="custom-market-footer">${d.fg}</span>
    
                <div>
                    <label>${d.ea}:</label>
                    <input type="text" id="item-name" placeholder="${d.ea}">
                </div>
                <div>
                    <label>${d.Bb}:</label>
                    <select id="item-color">
                        <option value="-1">${d.pa}</option>
                        <option value="0">${d.C}</option>
                        <option value="1">${d.B}</option>
                        <option value="2">${d.D}</option>
                        <option value="3">${d.H}</option>
                        <option value="4">${d.R}</option>
                    </select>
                </div>
                <div>
                    <label>${d.J}:</label>
                    <input type="text" id="item-howmany" placeholder="${d.J}?">
                </div>
                <div>
                    <label>${d.K}:</label>
                    <input type="number" id="price-min" placeholder="${d.K}">
                </div>
                <div>
                    <label>${d.G}:</label>
                    <input type="number" id="price-max" placeholder="${d.G}">
                </div>
    
                <div class="time-selection">
                    <button id="time-2h" value="1">2h</button>
                    <button id="time-8h" value="2">8h</button>
                    <button id="time-24h" value="3">24h</button>
                    <button id="time-48h" value="4">48h</button>
                </div>
    
                <div class="search-options">
                    <label class="search-options-title">${d.Cb}:&nbsp;</label>&nbsp;
                    <label><input type="checkbox" id="search-inventory"> &nbsp;${d.cg}</label>&nbsp;
                    <label><input type="checkbox" id="search-packages"> &nbsp;${d.hg}</label>&nbsp;
                </div>
    
                <button id="sell-item-btn">${d.Db}</button>
                <div class="spinner3 hidden" id="loadingSpinner3"></div>
            </div>
    
            <!-- Material Sell Form -->
            <div class="material-sell-form hidden" id="material-sell-form">
                <div>
                    <label>Select Material:</label>
                        <select id="material-select">
                            <!-- Base Materials -->
                            <option value="1">${d.Nc}</option>
                            <option value="2">${d.Dc}</option>
                            <option value="4">${d.Hc}</option>
                            <option value="3">${d.Jc}</option>

                            <!-- Materials -->
                            <option value="13">${d.Oc}</option>
                            <option value="14">${d.Ec}</option>
                            <option value="15">${d.Gc}</option>
                            <option value="16">${d.Fc}</option>
                            <option value="17">${d.Kc}</option>
                            <option value="18">${d.Ic}</option>
                            <option value="19">${d.Mc}</option>
                            <option value="20">${d.Lc}</option>

                            <!-- Monster Parts -->
                            <option value="5">${d.Wc}</option>
                            <option value="6">${d.Qc}</option>
                            <option value="7">${d.Zc}</option>
                            <option value="8">${d.Tc}</option>
                            <option value="9">${d.Vc}</option>
                            <option value="10">${d.Uc}</option>
                            <option value="11">${d.Rc}</option>
                            <option value="12">${d.Yc}</option>
                            <option value="55">${d.Sc}</option>
                            <option value="58">${d.Xc}</option>
                            <option value="62">${d.$c}</option>
                            <option value="64">${d.ad}</option>

                            <!-- Gemstones -->
                            <option value="21">${d.zc}</option>
                            <option value="22">${d.tc}</option>
                            <option value="23">${d.sc}</option>
                            <option value="24">${d.uc}</option>
                            <option value="25">${d.Ac}</option>
                            <option value="26">${d.xc}</option>
                            <option value="27">${d.wc}</option>
                            <option value="28">${d.vc}</option>
                            <option value="59">${d.yc}</option>
                            <option value="63">${d.Bc}</option>

                            <!-- Flasks -->
                            <option value="37">${d.nc}</option>
                            <option value="38">${d.qc}</option>
                            <option value="39">${d.jc}</option>
                            <option value="40">${d.ic}</option>
                            <option value="41">${d.pc}</option>
                            <option value="42">${d.mc}</option>
                            <option value="43">${d.kc}</option>
                            <option value="44">${d.lc}</option>
                            <option value="53">${d.rc}</option>
                            <option value="61">${d.oc}</option>

                            <!-- Runes -->
                            <option value="29">${d.Ad}</option>
                            <option value="30">${d.ud}</option>
                            <option value="31">${d.sd}</option>
                            <option value="32">${d.zd}</option>
                            <option value="33">${d.yd}</option>
                            <option value="34">${d.wd}</option>
                            <option value="35">${d.td}</option>
                            <option value="36">${d.xd}</option>
                            <option value="60">${d.vd}</option>

                            <!-- Ores -->
                            <option value="45">${d.fd}</option>
                            <option value="46">${d.ed}</option>
                            <option value="47">${d.kd}</option>
                            <option value="48">${d.nd}</option>
                            <option value="49">${d.od}</option>
                            <option value="50">${d.hd}</option>
                            <option value="51">${d.md}</option>
                            <option value="52">${d.ld}</option>
                            <option value="54">${d.dd}</option>
                            <option value="56">${d.gd}</option>
                            <option value="57">${d.jd}</option>
                        </select>
                </div>
                <div>
                    <label>${d.dg}:</label>
                    <select id="material-color">
                        <option value="-1">${d.pa}</option>
                        <option value="0">${d.C}</option>
                        <option value="1">${d.B}</option>
                        <option value="2">${d.D}</option>
                        <option value="3">${d.H}</option>
                        <option value="4">${d.R}</option>
                    </select>
                </div>
                <div>
                    <label>${d.J}:</label>
                    <input type="text" id="mat-item-howmany" placeholder="${d.J}?">
                </div>
                <div>
                    <label>${d.K}:</label>
                    <input type="number" id="material-price-min" placeholder="${d.K}">
                </div>
                <div>
                    <label>${d.G}:</label>
                    <input type="number" id="material-price-max" placeholder="${d.G}">
                </div>
    
                <div class="time-selection">
                    <button id="material-time-2h" value="1">2h</button>
                    <button id="material-time-8h" value="2">8h</button>
                    <button id="material-time-24h" value="3">24h</button>
                    <button id="material-time-48h" value="4">48h</button>
                </div>
    
                <div class="search-options">
                    <label class="search-options-title">${d.Cb}:&nbsp;</label>&nbsp;
                    <label><input type="checkbox" id="material-search-warehouse"> &nbsp;${d.kg}</label>&nbsp;
                </div>
    
                <button id="sell-material-btn">${d.jg}</button>
                <div class="spinner2 hidden" id="loadingSpinner2"></div>
            </div>
    
            <!-- Food Sell Form -->
            <div class="food-sell-form hidden" id="food-sell-form">
                <label>Level Range:</label>
                <div style="display: flex; gap: 5px;">
                    <input type="number" id="food-level-min" placeholder="Min Level" style="width: 100%;">
                    <input type="number" id="food-level-max" placeholder="Max Level" style="width: 100%;">
                </div>
                <div>
                    <label>${d.Bb}:</label>
                    <select id="food-quality">
                        <option value="-1">${d.pa}</option>
                        <option value="0">${d.C}</option>
                        <option value="1">${d.B}</option>
                        <option value="2">${d.D}</option>
                        <option value="3">${d.H}</option>
                        <option value="4">${d.R}</option>
                    </select>
                </div>
                <div>
                    <label>${d.J}:</label>
                    <input type="text" id="food-howmany" placeholder="${d.J}?">
                </div>
                <div>
                    <label>${d.K}:</label>
                    <input type="number" id="food-price-min" placeholder="${d.K}">
                </div>
                <div>
                    <label>${d.G}:</label>
                    <input type="number" id="food-price-max" placeholder="${d.G}">
                </div>
    
                <div class="time-selection">
                    <button id="food-time-2h" value="1">2h</button>
                    <button id="food-time-8h" value="2">8h</button>
                    <button id="food-time-24h" value="3">24h</button>
                    <button id="food-time-48h" value="4">48h</button>
                </div>
    
                <button id="sell-food-btn">${d.ig}</button>
                <div class="spinner3 hidden" id="loadingSpinner4"></div>
            </div>
    
            <div class="switch-section">${d.za}</div>
        </div>
    </div>
            `;
					c.insertAdjacentElement("afterend", B);
					document.getElementById("sell-item-btn").addEventListener("click", w);
					document.getElementById("sell-material-btn").addEventListener("click", A);
					document.getElementById("sell-food-btn").addEventListener("click", x);
					document.querySelector(".custom-market-header").addEventListener("click", k);
					document.querySelector(".switch-section").addEventListener("click", l);
					document.querySelectorAll(".time-selection button").forEach(t => {
						t.addEventListener("click", function() {
							g(t,
								t.textContent)
						})
					})
				}
				let e = ["item-sell-form", "material-sell-form", "food-sell-form"],
					h = 0;

				function k() {
					const B = document.querySelector(".custom-market-content"),
						t = document.querySelector(".custom-market-header");
					t.classList.toggle("collapsed");
					B.style.display = t.classList.contains("collapsed") ? "none" : "block";
					localStorage.setItem("sellItemsSectionCollapsed", t.classList.contains("collapsed"))
				}

				function g(B, t) {
					B.parentElement.querySelectorAll("button").forEach(v => {
						v.classList.remove("selected")
					});
					B.classList.add("selected");
					localStorage.setItem("selectedTime_" + B.closest("div").parentElement.id, t)
				}

				function l() {
					e.forEach(t => {
						document.getElementById(t).classList.add("hidden")
					});
					h = (h + 1) % e.length;
					document.getElementById(e[h]).classList.remove("hidden");
					const B = document.querySelector(".switch-section");
					"item-sell-form" === e[h] ? B.textContent = `${d.za}` : "material-sell-form" === e[h] ? B.textContent = `${d.Eb}` : "food-sell-form" === e[h] && (B.textContent = `${d.Fb}`);
					localStorage.setItem("currentSection", e[h])
				}
				async function q(B, t, v) {
					return new Promise(async z => {
						let C = !1;
						const I = Array.from(document.querySelectorAll("#inventory_nav a.awesome-tabs"));
						let H = 0;
						for (let L = 0; L < I.length && !(H >= parseInt(v, 10)); L++) {
							var K = I[L];
							if ("false" !== K.getAttribute("data-available")) {
								K.click();
								await new Promise(O => setTimeout(O, 175));
								K = Array.from(document.querySelectorAll("#inv .ui-draggable"));
								for (let O of K) {
									if (H >= parseInt(v)) break;
									O.getAttribute("data-basis");
									K = Zb(O);
									const Y = O.getAttribute("data-item-id"),
										ea = nb(O);
									if (K.toLowerCase() === B.toLowerCase() && t === ea) {
										b.push(Y);
										C = !0;
										H++;
										break
									}
								}
								if (C) break
							}
						}
						z(C)
					})
				}
				async function n(B, t, v, z, C) {
					try {
						let I = 1,
							H = parseInt(v, 10);
						for (v = !1; 1 <= I && 2 >= I && !(0 >= H);) {
							const K = await jQuery.get(G({
									mod: "packages",
									f: z ? "18" : "0",
									fq: t,
									qry: z ? "" : B,
									page: I.toString(),
									sh: X("sh")
								})),
								L = Array.from(jQuery(K).find(".packageItem"));
							for (let O of L) {
								if (0 >= H) break;
								const Y = O.querySelector("[data-content-type]"),
									ea = O.querySelector("[data-container-number]"),
									ca = Y.getAttribute("data-measurement-x"),
									la = Y.getAttribute("data-measurement-y");
								let oa = Y.getAttribute("data-quality");
								const ba = Y.getAttribute("data-tooltip"),
									pa = ea.getAttribute("data-container-number"),
									xa = Zb(Y).toLowerCase();
								oa || (ba.includes("white") && (oa = "-1"), ba.includes("lime") && (oa = "0"));
								const Pa = xa === B.toLowerCase() && t === oa;
								if (z) {
									const zb = Y.getAttribute("data-basis"),
										Kb = zb.startsWith("18") && zb.split("-")[1] === C.toString();
									t === oa && Kb && (await u(pa, ca, la), v = !0, H--)
								} else Pa && (await u(pa, ca, la), v = !0, H--)
							}
							I++
						}
						return v
					} catch (I) {
						return !1
					}
				}
				async function m(B, t = -1, v) {
					try {
						let z = !0,
							C = 0;
						for (let I = 0; I < parseInt(v, 10) && !(C >=
								v); I++) {
							for (; C < parseInt(v, 10);) try {
								if (await jQuery.post(U({
										mod: "forge",
										submod: "storageOut",
										type: B,
										quality: t,
										amount: 1,
										a: (new Date).getTime(),
										sh: X("sh")
									})), await n(B, t, 1, !0, B), C++, C >= parseInt(v, 10)) break
							} catch (H) {
								C++
							}
							z = !0
						}
						return z
					} catch (z) {
						return !1
					}
				}
				async function r(B, t, v, z) {
					try {
						let C = 1,
							I = parseInt(z, 10);
						for (z = !1; 1 <= C && 10 >= C && !(0 >= I);) {
							const H = await jQuery.get(G({
									mod: "packages",
									f: "7",
									fq: v,
									qry: "",
									page: C.toString(),
									sh: X("sh")
								})),
								K = Array.from(jQuery(H).find(".packageItem"));
							for (let L of K) {
								if (0 >= I) break;
								const O = L.querySelector("[data-content-type]"),
									Y = L.querySelector("[data-container-number]"),
									ea = O.getAttribute("data-measurement-x"),
									ca = O.getAttribute("data-measurement-y"),
									la = Hb(O),
									oa = nb(O);
								if (parseInt(la) >= B && parseInt(la) <= t && oa === v) {
									const ba = Y.getAttribute("data-container-number");
									await u(ba, ea, ca);
									z = !0;
									I--
								}
							}
							C++
						}
						return z
					} catch (C) {
						return !1
					}
				}
				async function x() {
					var B = parseInt(document.getElementById("food-level-min").value, 10);
					const t = parseInt(document.getElementById("food-level-max").value, 10),
						v =
						document.getElementById("food-quality").value,
						z = parseInt(document.getElementById("food-howmany").value, 10),
						C = parseInt(document.getElementById("food-price-min").value, 10),
						I = parseInt(document.getElementById("food-price-max").value, 10),
						H = document.getElementById("loadingSpinner4");
					if (isNaN(B) || isNaN(t) || B > t || isNaN(C) || isNaN(I) || C > I || 1 > z) alert(`${d.wa}`);
					else {
						H.style.display = "block";
						try {
							let ea = !1;
							if (ea = await r(B, t, v, z)) {
								var K = document.querySelector("#food-sell-form .time-selection button.selected"),
									L =
									K ? parseInt(K.value, 10) : 2,
									O = document.querySelector('input[name="anbieten"]'),
									Y = O ? O.value : "Offer";
								for (B = 0; B < b.length; B++) {
									const ca = b[B],
										la = C === I ? C : Math.floor(Math.random() * (I - C + 1)) + C,
										oa = G({
											mod: "market",
											sh: X("sh")
										});
									await jQuery.post(oa, {
										sellid: ca,
										preis: la,
										dauer: L,
										anbieten: Y
									})
								}
								b = [];
								alert(`${d.ya}`);
								await new Promise(ca => setTimeout(ca, 250));
								Mf("mod=market&f=7")
							} else alert(`${d.xa}`)
						} catch (ea) {} finally {
							H.style.display = "none"
						}
					}
				}
				async function u(B, t, v) {
					try {
						let {
							spot: z,
							bag: C
						} = await dc(t, v);
						const I = await jQuery.post(U({
								mod: "inventory",
								submod: "move",
								from: B,
								fromX: 1,
								fromY: 1,
								to: C,
								toX: z.x + 1,
								toY: z.y + 1,
								amount: 1,
								a: (new Date).getTime(),
								sh: X("sh")
							})),
							H = JSON.parse(I).to.data.itemId;
						b.push(H);
						return !0
					} catch (z) {
						return !1
					}
				}
				async function w() {
					const B = document.getElementById("item-name").value;
					var t = document.getElementById("item-color").value;
					const v = document.getElementById("item-howmany").value,
						z = parseInt(document.getElementById("price-min").value, 10),
						C = parseInt(document.getElementById("price-max").value, 10),
						I = document.getElementById("loadingSpinner3"),
						H = document.getElementById("search-inventory").checked,
						K = document.getElementById("search-packages").checked;
					if (!B || isNaN(z) || isNaN(C) || z > C || 1 > v) alert(`${d.wa}`);
					else {
						I.style.display = "block";
						try {
							let ca = !1;
							H && (ca = await q(B, t, v));
							!ca && K && (ca = await n(B, t, v));
							if (ca) {
								var L = document.querySelector(".time-selection button.selected"),
									O = L ? parseInt(L.value, 10) : 2,
									Y = document.querySelector('input[name="anbieten"]'),
									ea = Y ? Y.value : "Offer";
								for (t = 0; t < b.length; t++) {
									const la = b[t],
										oa = z === C ? z : Math.floor(Math.random() * (C -
											z + 1)) + z,
										ba = G({
											mod: "market",
											sh: X("sh")
										});
									jQuery.post(ba, {
										sellid: la,
										preis: oa,
										dauer: O,
										anbieten: ea
									})
								}
								b = [];
								alert(`${d.ya}`);
								await new Promise(la => setTimeout(la, 250));
								Mf("mod=market&qry=" + B)
							} else alert(`${d.xa}`)
						} catch (ca) {} finally {
							I.style.display = "none"
						}
					}
				}
				async function A() {
					var B = document.getElementById("material-select").value,
						t = document.getElementById("material-select");
					t = t.options[t.selectedIndex].textContent;
					const v = document.getElementById("material-color").value,
						z = document.getElementById("mat-item-howmany").value,
						C = parseInt(document.getElementById("material-price-min").value, 10),
						I = parseInt(document.getElementById("material-price-max").value, 10),
						H = document.getElementById("loadingSpinner2"),
						K = document.getElementById("material-search-warehouse").checked;
					if (!B || isNaN(C) || isNaN(I) || C > I || 1 > z) alert(`${d.wa}`);
					else {
						H.style.display = "block";
						try {
							let ca = !1;
							K && (ca = await m(B, v, z));
							if (ca) {
								var L = document.querySelector("#material-sell-form .time-selection button.selected"),
									O = L ? parseInt(L.value, 10) : 2,
									Y = document.querySelector('input[name="anbieten"]'),
									ea = Y ? Y.value : "Offer";
								for (B = 0; B < b.length; B++) {
									const la = b[B],
										oa = C === I ? C : Math.floor(Math.random() * (I - C + 1)) + C,
										ba = G({
											mod: "market",
											sh: X("sh")
										});
									jQuery.post(ba, {
										sellid: la,
										preis: oa,
										dauer: O,
										anbieten: ea
									})
								}
								b = [];
								alert(`${d.ya}`);
								await new Promise(la => setTimeout(la, 250));
								Mf("mod=market&qry=" + t)
							} else alert(`${d.xa}`)
						} catch (ca) {} finally {
							H.style.display = "none"
						}
					}
				}
				const D = localStorage.getItem("currentSection");
				if (D && e.includes(D)) {
					e.forEach(t => {
						document.getElementById(t).classList.add("hidden")
					});
					document.getElementById(D).classList.remove("hidden");
					h = e.indexOf(D);
					const B = document.querySelector(".switch-section");
					"item-sell-form" === e[h] ? B.textContent = `${d.za}` : "material-sell-form" === e[h] ? B.textContent = `${d.Eb}` : "food-sell-form" === e[h] && (B.textContent = `${d.Fb}`)
				} else document.getElementById("item-sell-form").classList.remove("hidden"), h = 0;
				e.forEach(B => {
					const t = localStorage.getItem("selectedTime_" + B);
					t && document.querySelectorAll("#" + B + " .time-selection button").forEach(v => {
						v.textContent === t && v.classList.add("selected")
					})
				});
				"true" === localStorage.getItem("sellItemsSectionCollapsed") &&
					(document.querySelector(".custom-market-header").classList.add("collapsed"), document.querySelector(".custom-market-content").style.display = "none")
			}
			if (window.location.href.includes("/index.php?mod=guild")) {
				const b = document.querySelectorAll("form");
				for (const c of b) {
					const e = c.getAttribute("action");
					e && e.includes("submod=create") && localStorage.setItem("resetExpiredItems", "false")
				}
			}
			if (window.location.href.includes("/index.php?mod=packages&")) {
				let b = jQuery(".section-header").first();
				b && (function() {
					var c =
						"true" === localStorage.getItem("packages_hidden");
					let e = `

<section class="custom_packages" style="display: block; box-shadow: 0px 0px 10px rgba(0,0,0,0.15);">
<div style="text-align: center">
    <button class="awesome-button" packageCmd data-button="pickAll">
    ${d.uj}
    </button>
    <button class="awesome-button" packageCmd data-button="pickAllSelected">
    ${d.vj}
    </button>
    <button class="awesome-button" pakageCmd data-button="sellThisPage">
    ${d.yj}
    </button>
    <button
    class="awesome-button" data-button="SASTM" pakageCmd data-name="SASTM"
>
${d.wj}
</button>
    <button class="awesome-button" data-button="stop">${d.Aj}</button>
    <button class="awesome-button" packageCmd data-button="SARTH">
    ${d.zj}
    </button>
</div>

<style>

    .awesome-button:hover {
        background-color: #444;
        color: #fff; 
    }

    .progress-container {
      width: 100%;
      height: 20px;
      background-color: #f3f3f3;
      position: relative;
      border-radius: 15px;
      margin: 10px 0;
    }
  
    .progress-bar {
      width: 0;
      height: 100%;
      background-color: #4caf50;
      position: absolute;
      border-radius: 15px;
      transition: width 0.4s ease-in-out;
    }
  
    .page-indicator {
      text-align: center;
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
    }

</style>

    <fieldset style="box-shadow: 0px 0px 10px rgba(0,0,0,0.15);">
        <legend>${d.xj}</legend>
        <table style="width: 100%; text-align: center">
            <tbody>
                <tr>
                    <td>
                    </td>
                    

                    <div id="sellspinner" class="spinnerNew hidden"></div>
                    <div id="statusMessage" class="status-message">Status</div>
                    <div id="itemPreview" class="item-preview">
                        <div class="item"></div>
                    </div>

                    <td>
                        <input
                            type="checkbox"
                            data-button="switch"
                            data-name-ek="packages"
                            data-name="UCOTH"
                            style="box-shadow: 0px 5px 10px rgba(0,0,0,0.15);"
                        /><span class="span-new">${d.Ej}</span>
                        <hr>
                        <input
                        type="checkbox"
                        data-button="switch"
                        data-name-ek="packages"
                        data-name="useSmeltFilter"
                        style="box-shadow: 0px 5px 10px rgba(0,0,0,0.15);"
                       /><span class="span-new">${d.le}</span>
                       <hr>
                       <input
                        type="checkbox"
                        data-button="switch"
                        data-name-ek="packages"
                        data-name="sellUnderworld"
                        style="box-shadow: 0px 5px 10px rgba(0,0,0,0.15);"
                       />
                       <span class="span-new">${d.Jj}</span>
                       <hr>
                        <div class="setting-row">
                        <label for="getGold">${d.Oi}</label>
                        <div class="switch-field3">
                          
                          <input type="number" id="getGold" min="1000" max="200000000" placeholder="Amount">
                          <button id="ConfirmGetGold" class="awesome-button">OK</button>
                          <span class="span-new" id="goldMovedIndicator">${d.Ze}: 0</span>
                        </div>
                      </div>
                    </td>
                </tr>

            </tbody>
        </table>
    </fieldset>
    <fieldset>
        <legend>${d.ma}</legend>
    <table>

    <td class="item-checkbox" data-button="package" data-name="type" data-value="1" title="Weapons">
      <img class="item-i-1-11">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="2" title="Shields">
      <img class="item-i-2-11">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="3" title="Armor">
      <img class="item-i-3-3">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="4" title="Helmets">
      <img class="item-i-4-7">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="5" title="Gloves">
      <img class="item-i-5-1">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="8" title="Boots">
      <img class="item-i-8-1">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="6" title="Rings">
      <img class="item-i-6-1">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="9" title="Necklaces">
      <img class="item-i-9-1">
    </td>

    <td class="item-checkbox" data-button="package" data-name="type" data-value="7" title="Food">
      <img class="item-i-7-1">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="12" title="Upgrades">
      <img class="item-i-12-2">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="13" title="Recipes">
      <img class="item-i-13-1">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="15" title="Mercenaries">
      <img class="item-i-15-1">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="19" title="Tools">
      <img class="item-i-19-1">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="20" title="Scrolls">
      <img class="item-i-20-1">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="11" title="Reinforcements">
      <img class="item-i-11-17">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="21" title="Event Items">
      <img class="item-i-21-1">
    </td>

    <td class="item-checkbox" data-button="package" data-name="type" data-value="18" title="Forging Goods">
      <img class="item-i-18-1">
    </td>

    <!-- Powders -->
    
    <td class="item-checkbox" data-button="package" data-name="type" data-value="12-10" title="Green Powder">
      <img class="item-i-12-10">
    </td>
        <td class="item-checkbox" data-button="package" data-name="type" data-value="12-6" title="Blue Powder">
      <img class="item-i-12-6">
    </td>
        <td class="item-checkbox" data-button="package" data-name="type" data-value="12-17" title="Red Powder">
      <img class="item-i-12-17">
    </td>
        <td class="item-checkbox" data-button="package" data-name="type" data-value="12-14" title="Purple Powder">
      <img class="item-i-12-14">
    </td>
        <td class="item-checkbox" data-button="package" data-name="type" data-value="12-8" title="Yellow Powder">
      <img class="item-i-12-8">
    </td>
        <td class="item-checkbox" data-button="package" data-name="type" data-value="12-12" title="Orange Powder">
      <img class="item-i-12-12">
    </td>

    <!-- Dust -->
    <td class="item-checkbox" data-button="package" data-name="type" data-value="12-7" title="Yellow Powder">
      <img class="item-i-12-7">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="12-5" title="Blue Powder">
      <img class="item-i-12-5">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="12-16" title="Red Powder">
      <img class="item-i-12-16">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="12-9" title="Green Powder">
      <img class="item-i-12-9">
    </td>
        <td class="item-checkbox" data-button="package" data-name="type" data-value="12-11" title="Orange Powder">
      <img class="item-i-12-11">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="12-13" title="Purple Powder">
      <img class="item-i-12-13">
    </td>

    <!-- Oils -->
    <td class="item-checkbox" data-button="package" data-name="type" data-value="12-18" title="Purple Oil">
      <img class="item-i-12-18">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="12-19" title="Yellow Oil">
      <img class="item-i-12-19">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="12-20" title="Orange Oil">
      <img class="item-i-12-20">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="12-21" title="Green Oil">
      <img class="item-i-12-21">
    </td>
        <td class="item-checkbox" data-button="package" data-name="type" data-value="12-22" title="Blue Oil">
      <img class="item-i-12-22">
    </td>
    <td class="item-checkbox" data-button="package" data-name="type" data-value="12-23" title="Red Oil">
      <img class="item-i-12-23">
    </td>

    <td class="item-checkbox" data-button="package" data-name="type" data-value="14" title="Gold">
      <img class="item-i-14-1">
    </td>

      <td class="item-checkbox select-all" data-button="packageAll" data-name="type" title="Select All">
        <div class="select-all-content">
          <span class="select-all-text">ALL</span>
        </div>
      </td>

</table>

    </fieldset>
    <fieldset>
        <legend>Quality</legend>
        <table style="width: 100% box-shadow: 0px 5px 10px rgba(0,0,0,0.15);">
            <tbody>
              <tr>
                <td style="width: 14.28%">
                    <div class="color-box" data-button="package" data-name="quality" data-value="-1" title="White" style="background-color: white; "></div>
                </td>
                <td style="width: 14.28%">
                    <div class="color-box" data-button="package" data-name="quality" data-value="0" title="Green" style="background-color: green;"></div>
                </td>
                <td style="width: 14.28%">
                    <div class="color-box" data-button="package" data-name="quality" data-value="1" title="Blue" style="background-color: blue;"></div>
                </td>
                <td style="width: 14.28%">
                    <div class="color-box" data-button="package" data-name="quality" data-value="2" title="Purple" style="background-color: purple;"></div>
                </td>
                <td style="width: 14.28%">
                    <div class="color-box" data-button="package" data-name="quality" data-value="3" title="Orange" style="background-color: orange;"></div>
                </td>
                <td style="width: 14.28%">
                    <div class="color-box" data-button="package" data-name="quality" data-value="4" title="Red" style="background-color: red;"></div>
                </td>
                <td style="width: 14.28%">
                    <div class="color-box select-all" data-button="packageAll" data-name="quality" data-value="99" title="All" style="background: linear-gradient(45deg, red, orange, yellow, green, blue, purple); border: 1px solid #ccc;"></div>
                </td>
                </tr>
            </tbody>
        </table>
    </fieldset>
</section>
`;
					b.before(`
                <h2 class="section-header" style="cursor: pointer" id="hidePackges">
                ${d.Bj}
                </h2>`);
					b.before(e);
					c && (c = document.querySelector(".custom_packages"), c.style.display = "none" === c.style.display ? "block" : "none")
				}(), $(".custom-button:contains('sell all selected to merchants')").click(async function() {
					await R.sastm()
				}));
				R.start()
			}
			if (window.location.href.includes("mod=auction")) {
				localStorage.getItem("auctionPrefixes") || localStorage.setItem("auctionPrefixes", JSON.stringify([]));
				localStorage.getItem("prefixes") || localStorage.setItem("prefixes", JSON.stringify([]));
				localStorage.getItem("searchTerms") ||
					localStorage.setItem("searchTerms", JSON.stringify([]));
				const b = document.getElementById("auction_table");
				let c;
				b && (c = b.querySelectorAll(".auction_item_div"));
				const e = localStorage.getItem("highlightedItemHash");
				if (e) {
					const h = document.querySelector(`form:has(div[data-hash="${e}"])`);
					h && (h.style.outline = "3px solid red", h.style.outlineOffset = "4px", h.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)", h.scrollIntoView({
						behavior: "smooth",
						block: "center",
						inline: "nearest"
					}), localStorage.removeItem("highlightedItemHash"))
				}
				if (!c ||
					0 === c.length) return;
				c.forEach(h => {
					h.style.position = "relative";
					h.style.height = "106px";
					const k = document.createElement("span");
					k.className = "auction-icon";
					k.innerHTML = "\ud83d\udd28";
					k.title = "Add to Auction List";
					k.style.cursor = "pointer";
					k.style.fontSize = "16px";
					k.style.marginTop = "88px";
					k.style.display = "inline-block";
					k.style.marginRight = "-25px";
					const g = document.createElement("span");
					g.className = "smelt-icon";
					g.innerHTML = "\ud83d\udd25";
					g.title = "Add to Smelting List";
					g.style.cursor = "pointer";
					g.style.fontSize =
						"16px";
					g.style.marginTop = "88px";
					g.style.display = "inline-block";
					let l = JSON.parse(localStorage.getItem("auctionPrefixes")) || [],
						q = JSON.parse(localStorage.getItem("auctionSuffixes")) || [],
						n = JSON.parse(localStorage.getItem("smeltingSettings")) || [];
					const m = h.querySelector("[data-tooltip]"),
						r = m ? m.getAttribute("data-tooltip") : null;
					if (r) {
						var {
							itemName: x,
							kn: u,
							ln: w,
							itemColor: A,
							itemType: D,
							itemLevel: B,
							dn: t
						} = lh(r, m);
						try {
							JSON.parse(r.replace(/&quot;/g, '"'))
						} catch (v) {
							return
						}
						x && (l.includes(u) && q.includes(w) && (k.innerHTML =
							"\u2705"), n.some(v => {
							const z = "" != v.prefix && u.includes(v.prefix) || "" != v.suffix && w.includes(v.suffix);
							v = "white" == A || v.colors.includes(A);
							return z && v
						}) && (g.innerHTML = "\u2705"), k.addEventListener("click", () => {
							let v = JSON.parse(localStorage.getItem("auctionPrefixes")) || [],
								z = JSON.parse(localStorage.getItem("auctionSuffixes")) || [];
							JSON.parse(localStorage.getItem("searchTerms"));
							v.includes(u) || (v.push(u), localStorage.setItem("auctionPrefixes", JSON.stringify(v)));
							z.includes(w) || (z.push(w), localStorage.setItem("auctionSuffixes",
								JSON.stringify(z)));
							ab(`Item "${x[0]}" added to the auction list!`);
							k.innerHTML = "\u2705";
							setTimeout(() => {
								k.innerHTML = "\ud83d\udd28"
							}, 1E3)
						}), g.addEventListener("click", () => {
							const v = {
								condition: "nameContains",
								prefix: u,
								suffix: w,
								jm: t,
								colors: ["white", "green"],
								itemTypes: [D],
								hammerState: "none",
								level: B,
								isEnabled: !0
							};
							let z = JSON.parse(localStorage.getItem("smeltingSettings")) || [];
							z.push(v);
							localStorage.setItem("smeltingSettings", JSON.stringify(z));
							ab(`Item "${x[0]}" added to the smelting list!`);
							g.innerHTML =
								"\u2705"
						}), h.appendChild(g), h.appendChild(k))
					}
				})
			}
			if (window.location.href.includes("mod=packages")) {
				await new Promise(e => setTimeout(e, 1E3));
				["auctionPrefixes", "prefixes", "searchTerms"].forEach(e => {
					localStorage.getItem(e) || localStorage.setItem(e, JSON.stringify([]))
				});
				const b = document.getElementById("packages");
				if (!b) return;
				const c = b.querySelectorAll(".packageItem");
				if (!c || 0 === c.length) return;
				c.forEach(e => {
					const h = kh("\ud83d\udd28", "auction-icon", "pointer", "16px", "1px", `${d.Ji}`),
						k = kh("\ud83d\udd25",
							"smelt-icon", "pointer", "16px", "40px", `${d.Zj}`),
						g = JSON.parse(localStorage.getItem("auctionPrefixes")) || [],
						l = JSON.parse(localStorage.getItem("auctionSuffixes")) || [],
						q = JSON.parse(localStorage.getItem("smeltingSettings")) || [],
						n = e.querySelector("[data-tooltip]"),
						m = n ? n.getAttribute("data-tooltip") : null;
					if (m) {
						var {
							itemName: r,
							kn: x,
							ln: u,
							itemColor: w,
							itemType: A,
							itemLevel: D,
							dn: B
						} = lh(m, n);
						r && (g.includes(x) && l.includes(u) && (h.innerHTML = "\u2705"), q.some(t => {
							const v = "" != t.prefix && x.includes(t.prefix) || "" != t.suffix &&
								u.includes(t.suffix);
							t = "white" == w || t.colors.includes(w);
							return v && t
						}) && (k.innerHTML = "\u2705"), h.addEventListener("click", () => {
							let t = JSON.parse(localStorage.getItem("auctionPrefixes")) || [],
								v = JSON.parse(localStorage.getItem("auctionSuffixes")) || [];
							t.includes(x) || (t.push(x), localStorage.setItem("auctionPrefixes", JSON.stringify(t)));
							v.includes(u) || (v.push(u), localStorage.setItem("auctionSuffixes", JSON.stringify(v)));
							ab(`Item "${r[0]}" added to the auction list!`);
							h.innerHTML = "\u2705"
						}), k.addEventListener("click",
							() => {
								const t = {
										condition: "nameContains",
										prefix: x,
										suffix: u,
										jm: B,
										colors: "white" === w ? ["white", "green"] : [w],
										itemTypes: [A],
										hammerState: "none",
										level: D || 1,
										isEnabled: !0
									},
									v = JSON.parse(localStorage.getItem("smeltingSettings")) || [];
								v.push(t);
								localStorage.setItem("smeltingSettings", JSON.stringify(v));
								ab(`Item "${r[0]}" added to the smelting list!`);
								k.innerHTML = "\u2705"
							}), e = e.querySelector('[data-no-combine="true"]')) && (e.appendChild(h), e.appendChild(k))
					}
				})
			}
			var mb = {
					A: {
						async start() {
							const b = JSON.parse(localStorage.getItem("Timers"));
							if (!X("mod") || "auction" !== X("mod")) {
								const c = {
									WEAPONS2: 1,
									SHIELD2: 2,
									CHEST2: 3,
									HELMET2: 4,
									GLOVES2: 5,
									SHOES2: 8,
									RINGS2: 6,
									AMULETS2: 9
								};
								let e = JSON.parse(localStorage.getItem("itemsToReset2") || "[]").map(h => c[h]).filter(h => void 0 !== h);
								if (0 < e.length) {
									Mf(`mod=auction&itemType=${e[0]}`);
									return
								}
							}
							mb.A.L = [];
							mb.A.kl = Math.floor(Gh().gold - Number(localStorage.getItem("storeGoldinAuctionholdGold")));
							mb.A.form = document.querySelectorAll("#auction_table form");
							mb.A.kl && await this.list(async () => {
								0 < this.L.length ? await this.buy() :
									this.Jo(b)
							})
						},
						async Jo(b) {
							const c = {
								WEAPONS2: 1,
								SHIELD2: 2,
								CHEST2: 3,
								HELMET2: 4,
								GLOVES2: 5,
								SHOES2: 8,
								RINGS2: 6,
								AMULETS2: 9
							};
							let e = JSON.parse(localStorage.getItem("itemsToReset2") || "[]").map(q => c[q]).filter(q => void 0 !== q);
							0 === e.length && (E("Auction Store: No valid auction types selected."), Z("enableHideGold", b.AuctionHoldGold || 5), window.location.reload());
							const h = parseInt(X("itemType"), 10),
								k = X("ttype"),
								g = e.indexOf(h),
								l = g === e.length - 1;
							"3" === k ? l ? (E("Auction Store: Last type reached, reloading and setting timeout for next cycle."),
								Z("enableHideGold", b.AuctionHoldGold || 5), window.location.reload()) : Mf(`mod=auction&itemType=${e[g+1]}`) : -1 !== g && (E("Auction Store: Toggling to mercenary mode for current type:", h), Mf(`mod=auction&itemType=${h}&ttype=3`))
						},
						async list(b = !1) {
							E(`${d.Kf}`);
							var c = this.kl;
							const e = "true" === localStorage.getItem("AuctionGoldCover");
							let h = [];
							const k = localStorage.getItem("storeInShopQuality") || -1;
							for (let q = 0; q < this.form.length; q++) {
								let n = this.form[q];
								var g = n.querySelector(".ui-draggable"),
									l = n.querySelector(".auction_bid_div");
								l = (l = l ? l.querySelector('input[type="text"], input[type="number"]') : null) ? Number(l.value) : 0;
								g = g ? $b(g) : 0;
								l <= g && l <= c && h.push({
									ja: n,
									price: parseInt(l, 10),
									value: g
								})
							}
							h.sort((q, n) => n.price - q.price);
							for (let q of h)
								if (c = q.ja.querySelector(".ui-draggable").getAttribute("data-quality"), !(Number(c) < Number(k))) {
									if (c = (c = (c = q.ja.querySelector(".auction_bid_div")) ? c.querySelector("div > a") : null) ? c.querySelector("span") : null) {
										c = c.getAttribute("style");
										if (e && c && c.includes("green")) continue;
										if (!e && c && c.includes("green")) return !0;
										if (c && c.includes("blue")) continue
									}
									mb.A.L.push([q.ja.getAttribute("action"), {
										auctionid: q.ja.querySelector('input[name="auctionid"]').value,
										qry: q.ja.querySelector('input[name="qry"]').value,
										itemType: q.ja.querySelector('input[name="itemType"]').value,
										itemLevel: q.ja.querySelector('input[name="itemLevel"]').value,
										itemQuality: q.ja.querySelector('input[name="itemQuality"]').value,
										buyouthd: q.ja.querySelector('input[name="buyouthd"]').value,
										bid_amount: q.price,
										bid: q.ja.querySelector('input[name="bid"]').value
									}])
								} b &&
								await b()
						},
						async buy() {
							let b = mb.A.L.pop();
							await jQuery.ajax({
								type: "POST",
								url: b[0],
								data: b[1]
							});
							0 < mb.A.L.length ? (await new Promise(c => setTimeout(c, 100)), await this.buy()) : window.location.reload()
						}
					}
				},
				uh = localStorage.getItem("OillastRan"),
				vh = Date.now(),
				Ua = {
					cm: "minerva diana vulcanus mars apollo merkur".split(" "),
					ao: [20, 60, 150, 0],
					Ym: [],
					async start() {
						"mod=gods" != rf ? Mf("mod=gods") : Ua.Om(0)
					},
					Zn() {
						let b = (new Date).getTime(),
							c = ya.Fn ? ya.Fn : [1];
						if (5 > c.length) return !0;
						for (let e = 0; e < c.length; e++) {
							if (c[e] && c[e] <
								b || !c[e] && (0 == ya[Ua.cm[e]] && !ya.jn || 1 == ya[Ua.cm[e]] || 2 == ya[Ua.cm[e]])) return !0;
							!c[e] && ya.jn && Va.isUnderworld()
						}
						return !1
					},
					async ko() {
						var b = bb.origin;
						const c = bb.searchParams.get("sh") || "";
						b = await fetch(`${b}/game/index.php?mod=gods&sh=${c}`);
						return (new DOMParser).parseFromString(await b.text(), "text/html")
					},
					async Om(b, c) {
						if (c) {
							var e = JSON.parse(localStorage.getItem("gods")),
								h = this.cm[b],
								k = c.getElementById(h);
							k && (c = parseInt(k.querySelector(".god_points").innerText.match(/\d+/)[0], 10), k = k.querySelector(".god_cooldown span") ?
								parseInt(k.querySelector(".god_cooldown span").getAttribute("data-ticker-time-left"), 10) : 0, e = e[h], h = this.ao[e], c >= h && 0 == k && 0 < h && 0 <= e && (Ua.Ym.push(!1), jQuery.get(G({
									mod: "gods",
									submod: "activateBlessing",
									god: b + 1,
									rank: e + 1,
									sh: X("sh")
								}), () => {
									Ua.Ym.push(!1);
									5 > b && Ua.Om(++b)
								})))
						}
					},
					async sp() {
						var b = bb.origin,
							c = bb.searchParams.get("sh") || "";
						b = await fetch(`${b}/game/index.php?mod=gods&sh=${c}`);
						c = new DOMParser;
						await new Promise(e => setTimeout(e, 800));
						b = c.parseFromString(await b.text(), "text/html");
						c = JSON.parse(localStorage.getItem("gods"));
						for (let e in c)
							if ((c = b.getElementById(e)) && 0 === (c.querySelector(".god_cooldown span") ? parseInt(c.querySelector(".god_cooldown span").getAttribute("data-ticker-time-left"), 10) : 0)) return !0;
						return !1
					}
				},
				mh, Dj = {
					async start() {
						const b = localStorage.getItem("healPercentage") || 25;
						var c = JSON.parse(localStorage.getItem("underworld")).isUnderworld;
						const e = localStorage.getItem("HealEnabled"),
							h = localStorage.getItem("HellHealHP") || 15,
							k = localStorage.getItem("useVillaMedici"),
							g = localStorage.getItem("useHealingPotion"),
							l = "true" === localStorage.getItem("usePray");
						if ("true" == e && da.o <= Number(b) || "true" == e && da.o <= parseInt(h) || "true" == k && aa == wa && da.o <= b && 1 == c || e && "true" == g && da.o <= b && 1 == c || e && !c && 3 >= Number(Gh().Fa) && localStorage.getItem("autoEnterHell") && da.o <= localStorage.getItem("hellEnterHP")) {
							c = document.createElement("div");
							c.setAttribute("id", "lowHealth");
							c.setAttribute("style", "\n                display: block;\n                position: absolute;\n                top: 140px;\n                left: 50%;\n                transform: translateX(-30%);\n                width: 115px;\n                color: rgba(234, 20, 20, 0.9);\n                background-color: rgba(0, 0, 0, 0.8);\n                font-size: 20px;\n                border-radius: 5px;\n                border-left: 10px solid rgba(234, 20, 20, 0.9);\n                border-right: 10px solid rgba(234, 20, 20, 0.9);\n                will-change: transform, opacity;\n                z-index: 999;\n            ");
							c.innerHTML = '<span class="span-new">Low Health!</span>';
							document.getElementById("header_game").insertBefore(c, document.getElementById("header_game").children[0]);
							async function q() {
								if ("inventoryPage" !== document.body.id) Mf("mod=inventory&sub=3&subsub=1");
								else {
									await new Promise(L => setTimeout(L, 500));
									var D = Array.from(document.querySelectorAll("#shop .ui-draggable"));
									const t = da.gold,
										v = bb.searchParams.get("doll") || "";
									let z = !1,
										C = 0,
										I = !1,
										H;
									var B = localStorage.getItem("HealPickBag");
									B && (H = 511 + Number(B) || 512);
									for (const L of D) {
										if (C >= Number(localStorage.getItem("FoodAmount"))) break;
										D = parseInt(L.getAttribute("data-price-gold"), 10);
										(B = (B = L.getAttribute("data-basis")) && "7" === B.split("-")[0]) && (z = !0);
										if (t >= D && B) {
											z = !0;
											localStorage.removeItem("healingStateX");
											D = Array.from(document.querySelectorAll('#inventory_nav a.awesome-tabs[data-available="true"]'));
											if (H && (B = document.querySelector(`#inventory_nav a.awesome-tabs[data-bag-number="${H}"]`)))
												if (B.click(), await new Promise(O => setTimeout(O, 370)), B = document.getElementById("inv"),
													of(B, L)) {
													Ba(L, "inv");
													C++;
													await new Promise(O => setTimeout(O, 370));
													if (C >= Number(localStorage.getItem("FoodAmount")) && "1" !== v) {
														Mf("mod=overview&doll=1");
														return
													}
													continue
												} else I = !0;
											if (I || !H)
												for (const O of D) {
													if (C >= Number(localStorage.getItem("FoodAmount"))) break;
													O.click();
													await new Promise(Y => setTimeout(Y, 500));
													D = document.getElementById("inv");
													if (of(D, L) && (Ba(L, "inv"), C++, await new Promise(Y => setTimeout(Y, 370)), C >= Number(localStorage.getItem("FoodAmount")) && "1" !== v)) {
														Mf("mod=overview&doll=1");
														return
													}
												}
										}
									}
									z ?
										(E(`${d.sb}`), localStorage.removeItem("healingStateX"), await new Promise(L => setTimeout(L, 3E4)), window.location.reload()) : "true" === localStorage.getItem("HealClothToggle") || "true" === localStorage.getItem("HealRubyToggle") ? await K() : (E(`${d.sb}`), localStorage.removeItem("healingStateX"), await new Promise(L => setTimeout(L, 3E4)), window.location.reload());
									async function K() {
										if ("true" === localStorage.getItem("HealClothToggle") || "true" === localStorage.getItem("HealRubyToggle")) {
											if (document.querySelector('img[src*="91e0372cccc24f52758be611a10a3b"]')) {
												var L =
													jQuery('form[action*="index.php?mod=inventory&sub=3&subsub=1"]'),
													O = L.attr("action");
												L = L.find('input[name="bestechen"]')[0];
												var Y = X("sh");
												await jQuery.post(`${O}?mod=inventory&sub=3&subsub=1&sh=${Y}`, {
													bestechen: L.value
												}) ? E(`${d.ub}`) : E(`${d.vb}`)
											} else 0 < Gh().An && "true" === localStorage.getItem("HealRubyToggle") && !document.querySelector('img[src*="91e0372cccc24f52758be611a10a3b"]') ? (L = jQuery('form[action*="index.php?mod=inventory&sub=3&subsub=1"]'), O = L.attr("action"), L = L.find('input[name="bestechen"]')[0],
												Y = X("sh"), await jQuery.post(`${O}?mod=inventory&sub=3&subsub=1&sh=${Y}`, {
													bestechen: L.value
												}) ? E(`${d.ub}`) : E(`${d.vb}`)) : (E(`${d.Hf}`), localStorage.setItem("HealClothToggle", "false"), localStorage.setItem("HealRubyToggle", "false"));
											window.location.reload()
										} else localStorage.removeItem("healingStateX"), setTimeout(() => {
											window.location.reload()
										}, 6E4)
									}
									return !1
								}
							}
							async function n() {
								if ("guild" == X("mod")) localStorage.setItem("useVillaMedici", "false"), Mf("mod=overview");
								else if ("guild_medic" != X("mod")) Mf("mod=guild_medic");
								else {
									var D = Array.from(document.querySelectorAll("#content a")).filter(({
										href: B
									}) => B.includes("mod=guild_medic"));
									0 < D.length ? window.location.href = D[0].href : (D = Math.min(...Array.from(document.querySelectorAll("span[data-ticker-time-left]")).map(B => parseInt(B.getAttribute("data-ticker-time-left"), 10))), isFinite(D) && Z("VillaMedici", Math.ceil(D / 6E4)), l ? (E(`${d.ua}`), Mf("mod=underworld&submod=prayStart")) : window.location.reload())
								}
							}
							async function m() {
								let D = !1;
								if ("mod=premium&submod=inventory" != rf) Mf("mod=premium&submod=inventory");
								else {
									await new Promise(B => setTimeout(B, 500));
									for (let B = 0, t = document.querySelectorAll(".contentboard_paper_repeat"); B < t.length; B++)
										if (t[B].querySelector("img").src && t[B].querySelector("img").src.includes("5fd403b4efa8ea7bc3ca5a852bfce9") || t[B].querySelector("img").src && t[B].querySelector("img").src.includes("token/18") || t[B].querySelector("img").src.includes("5fd403b4efa8ea7bc3ca5a852bfce9")) {
											D = !0;
											t[B].querySelector("input").click();
											Lf(1E3);
											return
										} D || (localStorage.setItem("useHealingPotion", "false"),
										l ? (E(`${d.ua}`), Mf("mod=underworld&submod=prayStart")) : Lf(1E3))
								}
							}
							async function r() {
								try {
									let C = document.getElementById("inv"),
										I = 0,
										H;
									var D = localStorage.getItem("HealPickBag") || 2,
										B = localStorage.getItem("PackageSort") || "del_asc";
									H = D ? 511 + Number(D) || 512 : 512;
									var t = Array.from(document.querySelectorAll(`#inventory_nav a.awesome-tabs[data-bag-number="${H}"]`));
									0 < t.length && t[0].click();
									t = 1;
									let K = 0,
										L = !1;
									D = [];
									const O = Number(localStorage.getItem("FoodAmount")) || 1;
									var v = G({
										mod: "packages",
										submod: "sort",
										page: "1",
										sh: X("sh")
									});
									jQuery.post(v, {
										packageSorting: "del_asc"
									});
									v = !1;
									t = await ia.km(-1, "", 7);
									for (v = !0; !L && 5 > K;) {
										const ea = await jQuery.get(G({
												mod: "packages",
												f: "7",
												fq: "-1",
												qry: "",
												page: t.toString(),
												sh: X("sh")
											})),
											ca = jQuery(ea).find(".packageItem");
										if (0 === ca.length) K++, v ? t-- : t++;
										else {
											D = [];
											for (let la = 0; la < ca.length; la++) {
												const oa = ca[la],
													ba = oa.querySelector("[data-content-type]"),
													pa = parseInt(ba.getAttribute("data-soulbound-to"), 10),
													xa = parseInt(ba.getAttribute("data-basis").split("-")[1], 10);
												(![30, 35].includes(xa) &&
													isNaN(pa) || ![30, 35].includes(xa) && pa === Number(wa)) && D.push(oa)
											}
											0 < D.length ? L = !0 : (E(`${d.wb} (Page ${t})`), K++, v ? t-- : t++)
										}
									}
									var z = G({
										mod: "packages",
										submod: "sort",
										page: "1",
										sh: X("sh")
									});
									jQuery.post(z, {
										packageSorting: B
									});
									if (!L) return localStorage.setItem("healingStateX", "true"), E(`${d.xb}`), !1;
									B = [5, 8];
									const Y = mc(C);
									for (z = 0; I < O && z < D.length;) {
										const ea = D[z],
											ca = ea.querySelector("[data-content-type]"),
											la = ea.querySelector("input").getAttribute("value"),
											oa = parseInt(ca.getAttribute("data-measurement-x"), 10),
											ba =
											parseInt(ca.getAttribute("data-measurement-y"), 10),
											pa = parseInt(ca.getAttribute("data-amount"), 10),
											xa = Hc(B[0], B[1], Y),
											Pa = Ic(ba, oa, xa);
										if (Pa) {
											Y.push({
												x: Pa.x,
												y: Pa.y,
												ml: ba,
												w: oa
											});
											await jQuery.post(U({
												mod: "inventory",
												submod: "move",
												from: "-" + la,
												fromX: 1,
												fromY: 1,
												to: H,
												toX: Pa.x + 1,
												toY: Pa.y + 1,
												amount: pa
											}), {
												a: (new Date).getTime(),
												sh: X("sh")
											});
											I++;
											const zb = jQuery(ca).css({
												left: 32 * Pa.x,
												top: 32 * Pa.y
											});
											C.appendChild(zb[0]);
											E(`${d.Ff}`);
											await new Promise(Kb => setTimeout(Kb, 500))
										} else {
											E(`${d.Gf}`);
											break
										}
										z++
									}
									if (0 < I) return I >=
										O ? E(`${d.If}`) : E(`${d.Jf}`), !0;
									E(`${d.xb}`);
									return !1
								} catch (C) {
									return E(`Error in pickFood(): ${C}`), !1
								}
							}
							async function x() {
								var D = document.querySelector("#header_values_hp_bar");
								const B = parseInt(D.getAttribute("data-value"), 10);
								D = parseInt(D.getAttribute("data-max-value"), 10);
								return {
									bo: B,
									Co: D
								}
							}
							async function u() {
								var D = JSON.parse(localStorage.getItem("underworld")).isUnderworld,
									B = "true" === localStorage.getItem("useSacrifice");
								const t = "true" === localStorage.getItem("HealShop"),
									v = localStorage.getItem("HellHealHP") ||
									15,
									z = "true" === localStorage.getItem("healingStateX"),
									C = "true" === localStorage.getItem("HealPackage"),
									I = document.getElementById("sstat_ruby_val");
								let H = 0;
								I && (H = I.textContent.trim().replace(/\./g, ""), H = parseInt(H, 10));
								if (z && t) await q() ? await u() : (localStorage.removeItem("healingStateX"), await A());
								else if (!0 === D || "true" === g && !0 === D || !0 === B && !0 === D) "true" === localStorage.getItem("useVillaMedici") && tf("VillaMedici") ? n() : "true" === localStorage.getItem("useHealingPotion") ? await m() : B && 5 <= Number(H) ? (E("Sacrificing for heal."),
									Mf("mod=underworld&submod=offering")) : l && "mod=underworld&submod=pray" != rf && ("true" === localStorage.getItem("HealEnabled") ? da.o <= Number(v) : 1) ? (E(`${d.ua}`), Mf("mod=underworld&submod=prayStart")) : l && "mod=underworld&submod=pray" == rf && ("true" === localStorage.getItem("HealEnabled") ? da.o <= Number(v) : 1) ? (await new Promise(K => setTimeout(K, 6E4)), E(`${d.Vf}`), window.location.reload()) : (E(`${d.Wf}`), Lf(6E4));
								else if (0 == D)
									if ("1" !== ((new URL(window.location.href)).searchParams.get("doll") || "")) "mod=overview&doll=1" !=
										rf && Mf("mod=overview&doll=1");
									else if (B = await A(), !B && da.o <= Number(b) || !B && !D && 3 >= Number(Gh().Fa) && localStorage.getItem("autoEnterHell") && da.o <= localStorage.getItem("hellEnterHP")) C ? (D = await r(), !D && t ? (localStorage.setItem("healingStateX", "true"), q()) : (D || (E(`${d.tb}`), await new Promise(K => setTimeout(K, 3E4))), window.location.reload())) : t ? (localStorage.setItem("healingStateX", "true"), q()) : (E(`${d.tb}`), await new Promise(K => setTimeout(K, 3E4)), window.location.reload())
							}
							async function w(D, B, t) {
								let v =
									null,
									z = 0,
									C = Infinity;
								const I = localStorage.getItem("playerId") || 0,
									H = "true" === localStorage.getItem("HealCervisia"),
									K = "true" === localStorage.getItem("HealEggs");
								let L = !1;
								H && (L = await yf());
								D.forEach(O => {
									var Y = O.getAttribute("data-basis");
									const ea = parseInt(O.getAttribute("data-soulbound-to"), 10);
									var ca = (ca = O.getAttribute("data-tooltip").match(/Heals ([\d,\.]+) of life/)) ? parseInt(ca[1].replace(/\./g, ""), 10) : 0;
									const la = t - (B + ca);
									if (!ea || ea === parseInt(I, 10)) {
										if (Y.startsWith("7-")) {
											Y = parseInt(Y.split("-")[1],
												10);
											if (!K && 23 <= Y && 34 >= Y || !H && 35 === Y) return;
											if (H && 35 === Y && L) L = !0;
											else if (35 === Y && H && !L) return
										}
										0 <= la && la < C ? (v = O, C = la) : 0 > la && ca > z && (z = ca, v = O)
									}
								});
								return v
							}
							async function A() {
								return new Promise(async D => {
									let B = !1;
									const {
										bo: t,
										Co: v
									} = await x();
									var z = new URL(window.location.href);
									const C = z.origin;
									z = z.searchParams.get("sh");
									if ("mod=overview&doll=1" != rf) Mf("mod=overview&doll=1");
									else {
										const Y = "true" === localStorage.getItem("HealPackage"),
											ea = "true" === localStorage.getItem("HealShop"),
											ca = "true" === localStorage.getItem("HealCervisia"),
											la = "true" === localStorage.getItem("HealEggs");
										let oa = !1;
										ca && (oa = await yf());
										var I = Array.from(document.querySelectorAll("#inventory_nav a.awesome-tabs")),
											H = I.findIndex(ba => ba.classList.contains("current"));
										I = I.slice(H).concat(I.slice(0, H));
										for (H = 0; H < I.length; H++) {
											var K = I[H];
											if ("false" !== K.getAttribute("data-available") && (await new Promise(ba => setTimeout(ba, 175)), K.click(), K.classList.contains("current"))) {
												K = document.querySelectorAll("#inv .ui-draggable");
												K = Array.from(K).filter(ba => {
													const pa = ba.getAttribute("data-basis");
													ba = parseInt(ba.getAttribute("data-soulbound-to"), 10);
													const xa = parseInt(pa.split("-")[1], 10);
													if (!ba || ba === parseInt(wa, 10)) {
														if (pa.startsWith("7-")) {
															if (!la && 23 <= xa && 34 >= xa || !ca && 35 === xa) return;
															if (oa && ca && 35 === xa) oa = !0;
															else if (35 === xa && ca && !oa) return
														}
														return pa && "7" === pa.split("-")[0]
													}
												});
												var L = void 0,
													O = !1;
												if (Va.cooldown() && "true" == localStorage.getItem("autoEnterHell")) {
													L = await (await fetch(`${C}/game/index.php?mod=hermit&sh=${z}`)).text();
													L = (new DOMParser).parseFromString(L, "text/html");
													L = Array.from(L.querySelectorAll('div[style="margin:20px"]'));
													for (let ba of L)
														if (ba.querySelector('a[href^="index.php?mod=hermit&submod=underworld&sh="]')) {
															O = !0;
															break
														}
												}
												if (O) {
													O = 0;
													L = localStorage.getItem("playerId");
													for (const ba of K)
														if (K = parseInt(ba.getAttribute("data-soulbound-to"), 10), (!K || K === parseInt(L, 10)) && "true" === localStorage.getItem("autoEnterHell"))
															if (ba) await new Promise(pa => setTimeout(pa, 250)), await Ba(ba, "avatar"), await new Promise(pa => setTimeout(pa, 450)), E(`${d.rb}`), O++, 2 <= O && window.location.reload();
															else {
																K = !1;
																Y && (K = await r());
																if (!K && ea) return localStorage.setItem("healingStateX",
																	"true"), q(), !0;
																window.location.reload()
															}
												} else
													for (const ba of K) {
														B = !0;
														if (O = await w(K, t, v)) await new Promise(pa => setTimeout(pa, 250)), await Ba(O, "avatar"), await new Promise(pa => setTimeout(pa, 450)), E(`${d.rb}`);
														else if (O = !1, Y && (O = await r()), !O && ea) {
															localStorage.setItem("healingStateX", "true");
															q();
															return
														}
														window.location.reload()
													}
											}
										}
										D(B)
									}
								})
							}
							await u()
						}
					}
				},
				Va = {
					isUnderworld() {
						if ("underworld" == document.getElementById("wrapper_game").className) {
							var b = JSON.parse(localStorage.getItem("underworld") || "{}");
							b.isUnderworld = !0;
							localStorage.setItem("underworld", JSON.stringify(b))
						} else b = JSON.parse(localStorage.getItem("underworld") || "{}"), b.isUnderworld = !1, localStorage.setItem("underworld", JSON.stringify(b));
						return (b = document.querySelector("#submenu2 a")) && b.href.match(/mod=.*&sh/) && "mod=underworld&submod=leave" === b.href.match(/mod=.*&sh/)[0].slice(0, -3) ? !0 : !1
					},
					jj() {
						return !0 !== (JSON.parse(localStorage.getItem("underworld")) || {}).jj
					},
					cooldown() {
						var b = (new Date).getTime();
						let c = JSON.parse(localStorage.getItem("underworld")) || {};
						c.cooldown = b;
						localStorage.setItem("underworld", JSON.stringify(c));
						let e = document.getElementById("submenu2");
						e && e.innerHTML.includes("index.php?mod=underworld") ? c.isUnderworld = !0 : c.isUnderworld = !1;
						if (ra.cooldown && ra.cooldown > b) return !1;
						if (b = document.querySelectorAll(".buff-clickable"))
							for (let h of b)
								if (h.getAttribute("data-link") == "index.php?mod=location&sh=" + X("sh")) return !1;
						return !0
					},
					async start() {
						function b() {
							var v = `expedition_info${parseInt(localStorage.getItem("farmEnemy"),10)||1}`,
								z = document.getElementById(v);
							if (!z) return !1;
							v = z.querySelector(".expedition_picture img");
							z = z.querySelector(".expedition_picture .avatar_costume_animation");
							if (!v && !z) return !1;
							if (v) {
								var C = v.getAttribute("src");
								if (!C) return !1;
								C = !C.includes("904194973d21066c96cb414d04d676")
							}
							z && (C = z.style.backgroundImage.match(/url\("(.+?)"\)/), v = null, C && C[1] && (v = C[1]), C = !v.includes("904194973d21066c96cb414d04d676"));
							return C
						}
						async function c(v = !1) {
							if (Va.isUnderworld || !w) {
								0 < (JSON.parse(localStorage.getItem("GodPowersHell")) || []).length && 0 == v && await e();
								Z("underworldArmorBuffs", 15);
								var z = "true" === localStorage.getItem("useWeaponBuff"),
									C = JSON.parse(localStorage.getItem("ArmorBuffsHell")) || [];
								v = [];
								z && v.push({
									type: "weapon",
									fc: "12-1",
									am: [3]
								});
								if (0 < C.length) {
									const I = {
										Helmet: 2,
										Armor: 5,
										Shield: 4,
										Boots: 10,
										Gloves: 9
									};
									z = C.map(H => I[H]).filter(H => H);
									0 < z.length && v.push({
										type: "armor",
										fc: "12-3",
										am: z
									})
								}
								0 < v.length && await h(v);
								localStorage.setItem("usedGodPowers", "true")
							}
						}
						async function e() {
							if ("true" === localStorage.getItem("useGodPowersHell")) {
								var v = JSON.parse(localStorage.getItem("GodPowersHell")) || [],
									z = "Minerva Diana Vulcan Mars Apollo Mercury".split(" ");
								for (let C of v)
									if (v = z.indexOf(C), -1 < v) try {
										await jQuery.get(G({
											mod: "gods",
											submod: "activateBlessing",
											god: v + 1,
											rank: 1,
											sh: X("sh")
										})), E(`${C} power activated`)
									} catch (I) {}
							}
						}
						async function h(v) {
							var z = v.map(I => I.fc);
							const C = {};
							z = await k(z);
							Object.assign(C, z);
							for (let I of v.slice())
								if (z = C[I.fc]) await q(z, I.am), v = v.filter(H => H.fc !== I.fc), E(`${I.type.charAt(0).toUpperCase()+I.type.slice(1)} buff equipped on slots ${I.am.join(", ")}`);
							0 < v.length && await g(v)
						}
						async function k(v) {
							return new Promise(async z => {
								const C = {};
								var I = Array.from(document.querySelectorAll("#inventory_nav a.awesome-tabs"));
								for (let H of I)
									if ("false" !== H.getAttribute("data-available")) {
										H.click();
										await new Promise(K => setTimeout(K, 200));
										I = Array.from(document.querySelectorAll("#inv .ui-draggable"));
										for (let K of I)
											if (I = K.getAttribute("data-basis"), v.includes(I) && !C[I]) {
												const L = parseInt(K.getAttribute("data-position-x"), 10),
													O = parseInt(K.getAttribute("data-position-y"), 10),
													Y = parseInt(K.getAttribute("data-container-number"),
														10);
												C[I] = {
													fromX: L,
													fromY: O,
													from: Y
												};
												if (Object.keys(C).length === v.length) {
													z(C);
													return
												}
											}
									} z(C)
							})
						}
						async function g(v) {
							try {
								let z = 1;
								for (; 1 <= z && 7 >= z && 0 < v.length;) {
									const C = await jQuery.get(G({
											mod: "packages",
											f: "12",
											page: z.toString(),
											sh: X("sh")
										})),
										I = Array.from(jQuery(C).find(".packageItem"));
									for (let H of I) {
										const K = H.querySelector("[data-content-type]"),
											L = H.querySelector("[data-container-number]");
										K.getAttribute("data-measurement-x");
										K.getAttribute("data-measurement-y");
										const O = K.getAttribute("data-basis");
										L.getAttribute("data-container-number");
										const Y = L.getAttribute("data-container-number"),
											ea = v.find(ca => ca.fc === O);
										if (ea && await l(Y, ea.am) && (E(`${ea.type.charAt(0).toUpperCase()+ea.type.slice(1)} buff equipped on slots ${ea.am.join(", ")}`), v = v.filter(ca => ca.fc !== O), 0 === v.length)) return
									}
									z++
								}
								if (0 < v.length)
									for (let C of v) E(`Could not find ${C.type} buff to equip.`)
							} catch (z) {}
						}
						async function l(v, z) {
							return new Promise((C, I) => {
								dc(1, 1, async (H, K) => {
									try {
										await jQuery.post(U({}), {
											mod: "inventory",
											submod: "move",
											from: v,
											fromX: 1,
											fromY: 1,
											to: K,
											toX: H.x + 1,
											toY: H.y + 1,
											amount: 1,
											a: (new Date).getTime(),
											sh: X("sh")
										});
										const L = {
											fromX: H.x + 1,
											fromY: H.y + 1,
											from: K
										};
										await q(L, z);
										C(L)
									} catch (L) {
										console.error("Error moving item to inventory and equipping:", L), I(L)
									}
								})
							})
						}
						async function q(v, z) {
							for (let C of z) await n(v.from, v.fromX, v.fromY, C, 1, 1, !0), await new Promise(I => setTimeout(I, 200))
						}
						async function n(v, z, C, I, H, K, L = !1) {
							v = {
								mod: "inventory",
								submod: "move",
								from: v,
								fromX: z,
								fromY: C,
								to: I,
								toX: H,
								toY: K,
								amount: 1,
								a: (new Date).getTime(),
								sh: X("sh")
							};
							L && (v.doll = 1);
							await jQuery.post(U({}),
								v)
						}
						this.location = Array.from(document.querySelectorAll("#submenu2 a")).pop().href;
						var m = "true" === localStorage.getItem("farmEnable"),
							r = localStorage.getItem("farmLocation") || 1;
						const x = localStorage.getItem("farmEnemy") || 1;
						var u = "true" === localStorage.getItem("useGodPowersHell");
						const w = "true" === localStorage.getItem("usedGodPowers");
						var A = localStorage.getItem("hellLimit") || 0;
						const D = "true" === localStorage.getItem("EnableHellLimit");
						if (u && !w) {
							if ("mod=overview&doll=1" != rf) {
								Mf("mod=overview&doll=1");
								return
							}
							await c()
						}
						if (tf("underworldArmorBuffs")) {
							if ("mod=overview&doll=1" !=
								rf) {
								Mf("mod=overview&doll=1");
								return
							}
							await c(!0)
						}
						let B;
						m && (B = b());
						u = localStorage.getItem("HellHealHP") || 15;
						da.o >= Number(u) && await jQuery.get(G({
							mod: "underworld",
							submod: "prayEnd",
							sh: X("sh")
						}));
						if ("true" == localStorage.getItem("exitUnderworld") && 0 == Number(Gh().Fa)) A = JSON.parse(localStorage.getItem("underworld")), A.isUnderworld = !1, localStorage.setItem("underworld", JSON.stringify(A)), await jQuery.get(G({
							mod: "underworld",
							submod: "exit",
							sh: X("sh")
						})), E(`${d.Xf}`), location.reload();
						else {
							if (0 == Number(Gh().Fa) &&
								"true" == localStorage.getItem("UnderworldUseMobi")) {
								if ("mod=premium&submod=inventory" !== rf) {
									Mf("mod=premium&submod=inventory");
									return
								}
								u = document.querySelectorAll(".contentboard_paper_repeat");
								for (var t = 0; t < u.length;) {
									u[t].querySelector("img").src && (u[t].querySelector("img").src.includes("c9ce614bbc67a9e85aa0ee87cf2bb7") || u[t].querySelector("img").src.includes("c9ce614bbc67a9e85aa0ee87cf2bb7")) ? u[t].querySelector("input").click() : localStorage.setItem("UnderworldUseMobi", "false");
									Lf(500);
									return
								}
							}
							t = document.querySelector("#submenu2");
							u = t.querySelector(`#location_inactive_${r}`);
							t = t.querySelector(`a[href*="loc=${r}"]`);
							u = u && u.classList.contains("inactive");
							if (!m || u && !t || rf === `mod=location&loc=${r}`)
								if (m && rf == `mod=location&loc=${r}` && B && (!D || D && 0 < A)) m = parseInt(x, 10), r = document.getElementsByClassName("expedition_button"), D && (A--, localStorage.setItem("hellLimit", A)), r[m - 1].click(), Lf(5E3);
								else if (window.location.href != this.location) window.location.href = this.location;
							else {
								await jQuery.get(G({
									mod: "underworld",
									submod: "prayEnd",
									sh: X("sh")
								}));
								let v = 0;
								Array.from(document.querySelectorAll(".expedition_box")).forEach(z => {
									z.querySelector(".expedition_picture img") && z.querySelector("img").src.includes("904194973d21066c96cb414d04d676") && v++
								});
								document.querySelector("#content .icon_expeditionpoints") && 0 < Number(Gh().Fa) || "true" == localStorage.getItem("UnderWorldUseRuby") && "0" == Gh().Fa ? (ja("underworldAttacks", 0), document.querySelectorAll(".expedition_button")[Math.floor(3 - v)].click()) : (E(`${d.Yf}`), await new Promise(z => setTimeout(z, 6E4)), Lf())
							} else Mf(`mod=location&loc=${r}`)
						}
					},
					async io() {
						let b = 0;
						const c = ["normal", "medium", "hard"][parseInt(localStorage.getItem("hellDifficulty"), 10) || 0],
							e = G({
								mod: "hermit",
								submod: "enterUnderworld",
								sh: X("sh")
							}),
							h = {};
						h[`difficulty_${c}`] = c.charAt(0).toUpperCase() + c.slice(1);
						try {
							jQuery.post(e, h), localStorage.setItem("usedGodPowers", "false"), await new Promise(k => {
								const g = ++b;
								var l = !document.hidden;
								let q = 1;
								var n = jQuery("#server-time");
								0 < n.length && (n = n.next().html()) && (n = n.match(/x(\d+)$/) || ["0", "1"], n = parseInt(n[1], 10), 0 < n && (q = 5 / n));
								l = l ? 400 : 400 *
									q;
								if ("undefined" !== typeof Worker) {
									const m = URL.createObjectURL(new Blob(["\n                            const timers = {};\n                            self.onmessage = function(event) {\n                                const { type, id, delay } = event.data;\n                                if (type === 'setTimeout') {\n                                    timers[id] = setTimeout(() => {\n                                        self.postMessage({ type: 'timeout', id });\n                                        delete timers[id];\n                                    }, delay);\n                                }\n                                if (type === 'clearTimeout') {\n                                    if (timers[id]) {\n                                        clearTimeout(timers[id]);\n                                        delete timers[id];\n                                    }\n                                }\n                            };\n                        "], {
											type: "application/javascript"
										})),
										r = new Worker(m),
										x = u => {
											"timeout" === u.data.type && u.data.id === g && (k(), r.removeEventListener("message", x), r.terminate(), URL.revokeObjectURL(m))
										};
									r.addEventListener("message", x);
									r.postMessage({
										type: "setTimeout",
										id: g,
										delay: l
									})
								} else setTimeout(() => {
									k()
								}, l)
							}), window.location.reload()
						} catch (k) {}
					}
				};
			null === localStorage.getItem("DELAY") && localStorage.setItem("DELAY", "0 seconds");
			var Bc = localStorage.getItem("DELAY");
			if (Bc.includes("to")) {
				const b = Bc.split(" "),
					c = parseInt(b[0],
						10);
				var Xb = Math.floor(Math.random() * (parseInt(b[2], 10) - c + 1)) + c
			} else Xb = parseInt(Bc.split(" ")[0], 10);
			Bc.includes("minute") && (Xb *= 60);
			var Cc = 1E3 * Xb,
				Ej = localStorage.getItem("costumeUnderworld"),
				Fj = ["9", "10", "11"],
				Dc = "true" === localStorage.getItem("activateAuction2"),
				wh = "true" === localStorage.getItem("auctionTURBO"),
				Ec = "true" === localStorage.getItem("bidFood"),
				xh = 9 < da.level,
				yh = "true" === localStorage.getItem("enableCircusWithoutHeal"),
				Gj = "true" === localStorage.getItem("resetUnderworld"),
				zh = "true" === localStorage.getItem("auctiongladiatorenable"),
				Ah = "true" === localStorage.getItem("auctionmercenaryenable"),
				Fc = "true" === localStorage.getItem("enableMercenarySearch"),
				lf = "true" === localStorage.getItem("EnableArenaHell"),
				Hj = "true" === localStorage.getItem("dontEnterUnderworld"),
				Gc = 0 < JSON.parse(localStorage.getItem("auctionPrefixes")).length || 0 < JSON.parse(localStorage.getItem("auctionSuffixes")).length,
				Eb = localStorage.getItem("auctionStatus") >= localStorage.getItem("bidStatus"),
				Bh = localStorage.getItem("auctionMStatus") >= localStorage.getItem("bidStatus"),
				eb = JSON.parse(localStorage.getItem("underworld")),
				Fb = tf("auction"),
				Ch = tf("auctionM"),
				Dh = localStorage.getItem("MarketlastRan"),
				Ij = localStorage.getItem("MarketSearchInterval") || 5,
				Jj = JSON.parse(localStorage.getItem("activeItemsGladiator") || "{}"),
				Kj = JSON.parse(localStorage.getItem("activeItemsMercenary") || "{}"),
				Eh = JSON.parse(localStorage.getItem("itemsToReset") || "[]"),
				mf = eb.jj;
			mf = mf ? !1 : !0;
			sa && "true" === localStorage.getItem("activateRepair") && sj();
			0 < Cc && (E(`Waiting for ${Xb} seconds...`), await new Promise(b =>
				setTimeout(b, Cc)));
			if (sa && (0 < Object.keys(Jj).length || 0 < Object.keys(Kj).length) && "true" === localStorage.getItem("activateRepair") && tf("repair") && !window.location.href.includes("/index.php?mod=hermit&submod=underworld") && aa == wa && 2E3 < Gh().gold && ("true" === localStorage.getItem("HealEnabled") ? da.o > Number(localStorage.getItem("healPercentage")) : 1)) {
				const b = "true" === localStorage.getItem("repairGladiator"),
					c = "true" === localStorage.getItem("repairMercenary");
				let e = [],
					h = [];
				const k = JSON.parse(localStorage.getItem("activeItemsGladiator") ||
						"{}"),
					g = JSON.parse(localStorage.getItem("activeItemsMercenary") || "{}");
				async function l(u, w, A) {
					const D = localStorage.getItem("repairPercentage"),
						B = null !== D ? parseInt(D, 10) / 100 : .1;
					u = await (await fetch(`${u}/game/index.php?mod=overview&doll=${w}&sh=${A}`)).text();
					u = (new DOMParser).parseFromString(u, "text/html").getElementById("char").querySelectorAll("div[data-tooltip]");
					A = (A = localStorage.getItem("workbenchItem")) ? JSON.parse(A) : {};
					A.selectedItem = A.selectedItem || {};
					let t = [];
					u.forEach(v => {
						if (v.classList.contains("ui-draggable")) {
							let z =
								Zb(v),
								C = v.getAttribute("data-container-number"),
								I = v.getAttribute("data-measurement-x"),
								H = v.getAttribute("data-measurement-y"),
								K = JSON.parse(v.getAttribute("data-tooltip")).pop().pop()[0].match(/\d+/g);
							null != K && K[0] / K[1] < B && t.push({
								type: wb(v),
								quality: nb(v),
								name: z,
								doll: w,
								container: C,
								nn: I,
								pn: H
							})
						}
					});
					return t
				}
				const q = bb.origin,
					n = bb.searchParams.get("sh") || "";
				let m = localStorage.getItem("workbenchItem");
				m = m ? JSON.parse(m) : {};
				b && (e = await l(q, 1, n), localStorage.setItem("itemList1", JSON.stringify(e)), ua.itemList1 =
					e);
				c && (h = await l(q, 2, n), localStorage.setItem("itemList2", JSON.stringify(h)), ua.itemList2 = h);
				const r = JSON.parse(localStorage.getItem("Timers"));
				m.selectedItem || (b && c ? 0 === e.length && 0 === h.length && Z("repair", r.Repair || 10) : b ? 0 === e.length && Z("repair", r.Repair || 10) : c ? 0 === h.length && Z("repair", r.Repair || 10) : Z("repair", r.Repair || 10));

				function x(u, w, A) {
					return Array.isArray(u) && 0 !== u.length ? u.filter(D => {
						const B = Object.keys(w).find(t => w[t] === D.container);
						return B ? !1 !== A[B] : !0
					}) : u
				}
				e = x(e, {
					helmet: "2",
					necklace: "11",
					weapon: "3",
					armor: "5",
					shield: "4",
					gloves: "9",
					shoes: "10",
					rings1: "6",
					rings2: "7"
				}, k);
				h = x(h, {
					helmetM: "2",
					necklaceM: "11",
					weaponM: "3",
					armorM: "5",
					shieldM: "4",
					glovesM: "9",
					shoesM: "10",
					rings1M: "6",
					rings2M: "7"
				}, g);
				localStorage.setItem("itemList1", JSON.stringify(e));
				localStorage.setItem("itemList2", JSON.stringify(h));
				ua.itemList1 = e;
				ua.itemList2 = h;
				if (m.selectedItem && !0 === m.selectedItem.enable) {
					let u = e.findIndex(w => w.name === m.selectedItem.item.name); - 1 !== u && e.splice(u, 1);
					u = h.findIndex(w => w.name === m.selectedItem.item.name); -
					1 !== u && h.splice(u, 1);
					localStorage.setItem("itemList1", JSON.stringify(e));
					localStorage.setItem("itemList2", JSON.stringify(h))
				}
				if (b && 0 < e.length || c && 0 < h.length || m.selectedItem && 0 < Object.keys(m.selectedItem).length) await Cj.start();
				else {
					const u = JSON.parse(localStorage.getItem("Timers"));
					Z("repair", u.Repair || 10);
					window.location.reload()
				}
			} else if (0 == await kj(wa, fc, ha)) hb();
			else if ((Dc || Ec || Fc) && wh && Dc && sa && xh && (zh && Gc && Eb && Fb && tf("AuctionEmpty") || Ec && Eb && Fb && tf("AuctionEmpty") || Fc && Eb && Fb && tf("AuctionMEmpty") ||
					Ah && Gc && Bh && Ch && tf("AuctionMEmpty"))) await Aa.start();
			else if (sa && "true" === localStorage.getItem("EnableSmelt") && ia.Zm() && 1E3 < da.gold && tf("smelt")) tf("smeltCheck") && (ia.slots = await ia.u(), await ia.ym(ia.slots), await ia.Pm(ia.slots), "true" === localStorage.getItem("EnableSmelt") && 1E3 < da.gold & ia.Zm() && tf("smelt") && await ia.start());
			else if (sa && 3 >= Number(Gh().Fa) && !0 === Ca && "true" === localStorage.getItem("autoEnterHell") && 100 <= da.level && 8E3 <= da.gold && da.o > Number(localStorage.getItem("hellEnterHP")) && Va.cooldown() &&
				(Hj ? mf : 1)) await Va.io();
			else if (1 == sa && "true" === localStorage.getItem("OilEnable") && Ua.Zn() && (!uh || 36E5 <= vh - uh)) {
				E(`${d.Lf}`);
				localStorage.setItem("OillastRan", vh.toString());
				const b = await Ua.ko();
				for (let c = 0; c < Ua.cm.length; c++) await Ua.Om(c, b);
				E(`${d.Mf}`);
				ef()
			} else if (sa && (da.o <= Number(localStorage.getItem("healPercentage")) && "true" === localStorage.getItem("HealEnabled") && !Va.isUnderworld() || 3 >= Number(Gh().Fa) && !Va.isUnderworld() && Va.cooldown() && "true" === localStorage.getItem("autoEnterHell") && da.o <=
					Number(localStorage.getItem("hellEnterHP")) || Va.isUnderworld() && "true" === localStorage.getItem("autoEnterHell") && da.o <= Number(localStorage.getItem("HellHealHP")))) await Dj.start();
			else if (sa && Ca && "true" === localStorage.getItem("autoEnterHell") && Va.isUnderworld() && Gh().jo) await Va.start();
			else if (sa && "true" == localStorage.getItem("useCostume") && (!window.location.href.includes("/index.php?mod=hermit") && tf("CheckDolls") && Fj.some(b => Ej.includes(b)) || !window.location.href.includes("/index.php?mod=hermit") &&
					tf("CheckDolls"))) await jf.start();
			else if (sa && (!0 === Na && V() && aa == wa || !0 === Na && ("true" === localStorage.getItem("HealEnabled") ? da.o > Number(localStorage.getItem("healPercentage")) : 1) && Vb < Wb && aa == wa)) {
				localStorage.setItem("nextQuestTime.timeOut", 0);
				localStorage.setItem("nextQuestTime", 0);

				function b(k) {
					const g = {
						Diana: "026bb622a42b4d00abc74c67f28d63",
						Apollo: "bb75bf0df76de3ec421bbfb0eac3c5",
						Vulcan: "6fbd05e43d699e65fc40cc92a17c51",
						Minerva: "72919cc6b457bf475fb81cc7de8863",
						Mercury: "5e272e2aade20b4a266e48663421ce",
						Mars: "5fd915f85b3e5e71b64632af0c6543"
					};
					k = k.querySelectorAll(".quest_slot_reward img");
					for (const l of k) {
						k = l.getAttribute("src");
						for (const [q, n] of Object.entries(g))
							if (k.includes(n) && "true" === localStorage.getItem(`questType${q}`)) return !0
					}
				}

				function c(k) {
					var g = JSON.parse(localStorage.getItem("acceptQuestKeywords") || "[]").map(q => q.toLowerCase());
					const l = parseInt(localStorage.getItem("questrewardvalue"), 10);
					if (k = $(k).find(".quest_slot_reward_item")[0]) {
						const q = k.outerHTML.toLowerCase();
						if (g.some(n => q.includes(n)) &&
							(g = q.match(/(\d+\.\d+)/)) && parseFloat(g[0].replace(".", "")) >= l) return !0
					}
					return !1
				}
				async function e() {
					var k = bb.origin,
						g = $("#content .contentboard_slot a.quest_slot_button_accept"),
						l = "true" === localStorage.getItem("skipTimeQuests");
					const q = "true" === localStorage.getItem("skipTimeCircusQuests"),
						n = "true" === localStorage.getItem("skipTimeOtherQuests"),
						m = "true" === localStorage.getItem("acceptnotfilter"),
						r = "true" === localStorage.getItem("UnderworldQuests"),
						x = JSON.parse(localStorage.getItem("questKeywords") || "[]"),
						u = JSON.parse(localStorage.getItem("acceptQuestKeywords") || "[]"),
						w = JSON.parse(localStorage.getItem("underworldQuestKeywords") || "[]"),
						A = JSON.parse(localStorage.getItem("underworld") || "{}");
					var D = $("#content .contentboard_slot_inactive").toArray();
					if (g.length) {
						function B(t) {
							return t.includes("8aada67d4c5601e009b9d2a88f478c") ? "combat" : t.includes("00f1a594723515a77dcd6d66c918fb") ? "arena" : t.includes("586768e942030301c484347698bc5e") ? "circus" : t.includes("4e41ab43222200aa024ee177efef8f") ? "expedition" : t.includes("dc366909fdfe69897d583583f6e446") ?
								"dungeon" : t.includes("5a358e0a030d8551a5a65d284c8730") ? "items" : null
						}
						g = !1;
						for (const t of D) {
							let v = t.getElementsByClassName("quest_slot_title")[0].innerText;
							D = B(t.getElementsByClassName("quest_slot_icon")[0].style.backgroundImage);
							if (!(l && 0 < t.getElementsByClassName("quest_slot_time").length && "arena" == D || q && 0 < t.getElementsByClassName("quest_slot_time").length && "circus" == D || n && 0 < t.getElementsByClassName("quest_slot_time").length && "circus" !== D && "arena" !== D)) {
								if (1 == A.isUnderworld && r && !g && 0 < w.length && Oa[D] &&
									r) {
									const z = $(t).find(".quest_slot_reward_item img[data-tooltip]")[0];
									if (z) {
										D = z.getAttribute("data-tooltip");
										const C = JSON.parse(D.replace(/&quot;/g, '"'))[0][0][0].toLowerCase();
										if (w.some(I => C.includes(I.toLowerCase()))) {
											l = t.getElementsByClassName("quest_slot_button_accept")[0].getAttribute("href");
											await jQuery.get(l).done();
											g = !0;
											break
										} else continue
									}
								}
								if (!x.some(z => v.includes(z))) {
									if (Oa[D] && b(t)) {
										l = t.getElementsByClassName("quest_slot_button_accept")[0].getAttribute("href");
										await jQuery.get(l).done();
										g = !0;
										break
									}
									if (Oa[D] && c(t) && !m) {
										l = t.getElementsByClassName("quest_slot_button_accept")[0].getAttribute("href");
										await jQuery.get(l).done();
										g = !0;
										break
									}
									if (Oa[D] && u.some(z => v.includes(z))) {
										l = t.getElementsByClassName("quest_slot_button_accept")[0].getAttribute("href");
										await jQuery.get(l).done();
										g = !0;
										break
									}!g && Oa[D] && m || g || !Oa[D] || m || 0 !== u.length || (g = t.getElementsByClassName("quest_slot_button_accept")[0].getAttribute("href"), await jQuery.get(g).done(), g = !0)
								}
							}
						}
						if (g) return;
						k = `${k}/game/index.php?mod=quests&submod=resetQuests&sh=${X("sh")}`;
						await jQuery.get(k).done();
						window.location.reload()
					}
					h()
				}
				async function h() {
					var k = $("#quest_header_cooldown");
					let g;
					switch (localStorage.getItem("questSpeed")) {
						case "0":
							g = 15E4;
							break;
						case "1":
							g = 2E5;
							break;
						case "2":
							g = 25E4;
							break;
						case "3":
							g = 3E5;
							break;
						case "4":
							g = 4E5;
							break;
						default:
							g = 3E5
					}
					k.length ? (k = Number($("#quest_header_cooldown b span").attr("data-ticker-time-left")), Vb = Wb + k) : Vb = Wb + g;
					localStorage.setItem("nextQuestTime", Vb);
					window.location.reload()
				}
				await async function() {
					if ("mod=quests" != rf) Mf("mod=quests");
					else {
						let k = [];
						const g = [],
							l = [];
						document.querySelectorAll("a.quest_slot_button_finish").forEach(m => {
							m.href && k.push(m.href)
						});
						document.querySelectorAll(".quest_slot_button_restart").forEach(m => {
							m.href && g.push(m.href)
						});
						document.querySelectorAll(".quest_slot_button_accept").forEach(m => {
							m.href && l.push(m.href)
						});
						async function q(m) {
							try {
								m < k.length && (await jQuery.get(k[m]), await q(m + 1))
							} catch (r) {}
						}
						async function n(m) {
							try {
								m < g.length && (await jQuery.get(g[m]), await n(m + 1))
							} catch (r) {}
						}
						await async function() {
							0 <
								k.length && await q(0);
							0 < g.length && await n(0);
							0 < l.length && await e();
							await h()
						}()
					}
				}()
			} else if (sa && Hh() && "true" === localStorage.getItem("doKasa") && tf("gold") && Gh().gold > Math.floor(localStorage.getItem("KasaHoldGold"))) await Xh();
			else if (sa && 5 < da.level && "true" == localStorage.getItem("storeGoldinAuction") && Number(Gh().gold) > Math.floor(Number(localStorage.getItem("storeGoldinAuctionmaxGold"))) && tf("enableHideGold")) await mb.A.start();
			else if (sa && Mc() && !0 === Ca && 0 == eb.isUnderworld && aa == wa && 0 == Cb.isUnderworld &&
				fa >= new Date && ("true" === localStorage.getItem("HealEnabled") ? da.o > Number(localStorage.getItem("healPercentage")) : 1) && !0 === document.getElementById("cooldown_bar_fill_expedition").classList.contains("cooldown_bar_fill_ready")) await async function() {
				function b() {
					const l = document.getElementById("errorText");
					"false" === localStorage.getItem("HealEnabled") ? (Ya("Your expedition/dungeon settings are incorrect!"), localStorage.setItem("HealEnabled", "true"), Lf(5E3)) : l && "" !== l.innerText.trim() && location.reload()
				}
				var c = localStorage.getItem("expeditionLocation");
				if (rf != `mod=location&loc=${c}`) Mf(`mod=location&loc=${c}`);
				else if ("true" === localStorage.getItem("nana_lcn") && fc) {
					var e = "true" === localStorage.getItem("autoCollectBonuses"),
						h = localStorage.getItem("selectedEnemy") || 0;
					c = document.getElementsByClassName("expedition_button");
					var k = document.querySelectorAll(".expedition_button.disabled");
					try {
						if (document.querySelector(".expedition_cooldown_reduce")) ab("Your expedition settings are incorrect or there is an unexpected page data!"),
							window.location.reload();
						else if (ja("expeditionAttacks", 0), e) {
							await new Promise(l => setTimeout(l, 800));
							for (var g = 0; g < c.length; g++) {
								if (4 > c[g].closest(".expedition_box").querySelectorAll(".expedition_bonus.active").length || 3 === g) {
									c[g].click();
									break
								}
								4 <= k.length ? window.location.reload() : setTimeout(b, 800)
							}
						} else g = c[parseInt(h, 10)], g.classList.contains("disabled") ? Ya("Your expedition setting is incorrect! You set it to disabled monster which is wrong.") : (g.click(), Array.from(c).every(l => l.classList.contains("disabled")) ?
							(console.log("All buttons are disabled. Reloading..."), window.location.reload()) : setTimeout(b, 800))
					} catch {
						E("There's a problem with the expedition, refreshing the page."), window.location.reload()
					}
				}
			}();
			else if (sa && !0 === Ga && !eb.isUnderworld && aa == wa && 9 < da.level && ("true" === localStorage.getItem("HealEnabled") ? da.o > Number(localStorage.getItem("healPercentage")) : 1) && Gh().ho && "none" !== document.getElementById("cooldown_bar_dungeon").style.display && !0 === document.getElementById("cooldown_bar_fill_dungeon").classList.contains("cooldown_bar_fill_ready")) await async function() {
				if ("true" ===
					localStorage.getItem("nana_lcn") && fc) {
					var b = localStorage.getItem("dungeonLocation") || "1",
						c = "true" === localStorage.getItem("skipBoss"),
						e = "true" === localStorage.getItem("resetIfLose"),
						h = "true" === localStorage.getItem("loose"),
						k = "true" === localStorage.getItem("dungeonFocusQuest"),
						g = "chefe Chefe \u0161\u00e9f chef chef juht boss Boss jefe jefe jefe patron capo vad\u012bt\u0101js vadovas f\u0151n\u00f6k patron Patron \u0428\u0435\u0444 baas sjef szef chefe \u0219ef \u0161\u00e9f \u0161ef pomo chef patron \u0645\u062f\u064a\u0631 \u03b1\u03c6\u03b5\u03bd\u03c4\u03b9\u03ba\u03cc \u0448\u0435\u0444 \u0431\u043e\u0441\u0441 \u8001\u677f".split(" ");
					if (rf != `mod=dungeon&loc=${b}`) Mf(`mod=dungeon&loc=${b}`);
					else {
						b = !document.getElementById("content").getElementsByTagName("area")[0];
						const n = document.getElementById("content").getElementsByClassName("button1");
						if (2 <= n.length) {
							c = n[0].getAttribute("name");
							e = n[1].getAttribute("name");
							try {
								if (b) {
									const m = (new URLSearchParams(window.location.search)).get("loc");
									"normal" === Jb && "dif1" === c ? (jQuery.post(G({
										mod: "dungeon",
										loc: m,
										sh: X("sh")
									}), {
										dif1: Jb
									}), n[0].click(), window.location.reload()) : "dif2" === e ? (jQuery.post(G({
										mod: "dungeon",
										loc: m,
										sh: X("sh")
									}), {
										dif2: Jb
									}), n[1].click(), window.location.reload()) : (Ya("Incorrect dungeon/expedition settings"), setTimeout(() => {
										Lf()
									}, 1E4))
								}
							} catch (m) {
								location.reload()
							}
						} else if (b) window.location.reload();
						else try {
							const m = document.querySelector("#content .map_label"),
								r = m && m.textContent.toLowerCase(),
								x = Array.from(document.querySelectorAll("#content .map_label")).find(u => g.some(w => w === u.textContent));
							ja("dungeonAttacks", 0);
							if (e && h) localStorage.setItem("loose", "false"), document.querySelectorAll("#content .button1")[0].click();
							else if (c && r && x) document.querySelectorAll("#content .button1")[0].click();
							else if (r && x && "true" === localStorage.getItem("dungeonAB")) x.click();
							else if (k) {
								var l = 0,
									q = null;
								document.querySelectorAll('[onclick*="startFight"]').forEach(function(u) {
									var w = u.getAttribute("onclick").match(/startFight\('(\d+)',/);
									w && w[1] && (w = parseInt(w[1], 10), w > l && (l = w, q = u))
								});
								q ? q.click() : window.location.reload()
							} else document.querySelector("#content area").click()
						} catch {
							window.location.reload()
						}
					}
				}
			}();
			else if (sa && tf("arena") &&
				(!0 === Ha || eb.isUnderworld && lf) && (!eb.isUnderworld || eb.isUnderworld && lf) && aa == wa && wa === Nc && fa >= new Date && (eb.isUnderworld || "true" !== localStorage.getItem("HealEnabled") || da.o > Number(localStorage.getItem("healPercentage")) || eb.isUnderworld && da.o > Number(localStorage.getItem("HellHealHP"))) && !0 === document.getElementById("cooldown_bar_fill_arena").classList.contains("cooldown_bar_fill_ready")) {
				async function b() {
					var k = new URL(window.location.href),
						g = k.origin;
					k = k.searchParams.get("sh") || "";
					var l = localStorage.getItem("scoreRange"),
						q = [];
					g = await (await fetch(`${g}/game/index.php?mod=highscore&sh=${k}&a=${l}`)).text();
					g = (new DOMParser).parseFromString(g, "text/html");
					g = Array.from(g.querySelectorAll(".section-like.narrow tr.alt span[data-tooltip] div a")).filter(n => (n = n.parentNode.querySelector('span[style="color:green;font-weight:bold;"]')) ? !("green" === n.style.color || "blue" === n.style.color) : null === n);
					q = [...q, ...g];
					if (0 === q.length) return console.log("No players available to attack"), !1;
					g = JSON.parse(localStorage.getItem("avoidAttackList")) || [];
					l = function(n) {
						for (var m = n.length, r, x; 0 !== m;) x = Math.floor(Math.random() * m), --m, r = n[m], n[m] = n[x], n[x] = r;
						return n
					}(q);
					q = 0;
					for (let n of l)
						if (l = n.textContent.toLowerCase(), !g.map(m => m.toLowerCase()).includes(l)) {
							l = await c(n.textContent, k);
							if (l.includes("index.php?mod=reports")) {
								k = (new URLSearchParams(l)).get("reportId");
								E(`${d.ra}` + n.textContent);
								Mf(`mod=reports&submod=showCombatReport&t=2&reportId=${k}`);
								await new Promise(m => setTimeout(m, 500));
								return
							}
							q++;
							if (3 <= q) break
						} return !1
				}
				async function c(k, g) {
					try {
						const l =
							(new URL(window.location.href)).origin;
						return await (await fetch(`${l}/game/ajax/doArenaFight.php?dname=${k}&a=${(new Date).getTime()}&sh=${g}`, {
							method: "POST"
						})).text()
					} catch {
						Lf(1E3)
					}
				}
				async function e(k) {
					var g = k.opponentId;
					const l = k.serverId;
					k = k.country;
					var q = (new URL(window.location.href)).origin;
					q = new URL(`${q}/game/ajax.php`);
					g = {
						mod: "arena",
						submod: "doCombat",
						aType: 2,
						opponentId: g,
						serverId: l,
						country: k.toString(),
						a: (new Date).getTime(),
						sh: X("sh")
					};
					q.search = (new URLSearchParams(g)).toString();
					return await (await fetch(q, {
						method: "GET",
						credentials: "include",
						headers: new Headers({
							"Content-Type": "application/x-www-form-urlencoded"
						})
					})).text()
				}
				async function h() {
					function k(u) {
						const w = null !== u.querySelector("span[style*='color:green;']");
						return Array.from(u.querySelectorAll("a, span")).find(A => "green" === A.style.color || "bold" === A.style.fontWeight) || w
					}
					var g = new URL(window.location.href);
					const l = g.origin;
					var q = await (await fetch(`${l}/game/index.php?mod=arena&sh=${X("sh")}`)).text();
					q = (new DOMParser).parseFromString(q, "text/html");
					var n = Array.from(q.querySelectorAll('table[width="80%"] tbody tr')).filter(u => u.querySelector(".attack"));
					if (n.length && 1 !== n.length) {
						var m = null;
						q = JSON.parse(localStorage.getItem("avoidAttackList")) || [];
						if ("true" === localStorage.getItem("leaguerandom")) {
							n = n.sort(() => Math.random() - .5);
							for (var r of n) {
								var x = r.querySelector("a");
								x = x ? x.innerText : null;
								if (!k(r) && !q.includes(x)) {
									m = r;
									break
								}
							}
						} else if ("true" === localStorage.getItem("leaguelowtohigh")) {
							n = n.sort((u, w) => parseInt(u.querySelector("th") ? u.querySelector("th").textContent :
								"0", 10) - parseInt(w.querySelector("th") ? w.querySelector("th").textContent : "0", 10));
							r = null;
							m = -1;
							for (x of n) n = (n = x.querySelector("a")) ? n.innerText : null, k(x) || q.includes(n) || (n = parseInt(x?.querySelector("th")?.textContent, 10), n > m && (m = n, r = x));
							m = r
						}
						if (null === m) localStorage.setItem("leaguelowtohigh", "false"), localStorage.setItem("leaguerandom", "false"), localStorage.setItem("leagueattackenable", "false"), Lf(500);
						else if (m)
							if (q = m.querySelector(".attack").getAttribute("onclick").match(/\d+/)[0], x = (new Date).getTime(),
								g = g.searchParams.get("sh") || "", await new Promise(u => setTimeout(u, 250)), g = await (await fetch(`${l}/game/ajax/doArenaFight.php?did=${q}&a=${x}&sh=${g}`)).text(), (q = g.match(/document\.location\.href\s*=\s*'([^']+)'/)) && q[1]) window.location = `${l}/game/${q[1]}`;
							else {
								g.includes("5") && ("true" === localStorage.getItem("leaguelowtohigh") ? (localStorage.setItem("leaguelowtohigh", "false"), localStorage.setItem("leaguerandom", "true")) : "true" === localStorage.getItem("leaguerandom") && (localStorage.setItem("leaguerandom",
									"false"), localStorage.setItem("leaguelowtohigh", "false"), localStorage.setItem("leagueattackenable", "false")), location.reload());
								if (g.includes("errorRow")) return !1;
								window.location.reload()
							}
					} else localStorage.setItem("leagueattackenable", "false"), location.reload()
				}
				eb.isUnderworld && lf && await jQuery.get(G({
					mod: "underworld",
					submod: "prayEnd",
					sh: X("sh")
				}));
				await async function() {
					function k(B) {
						const t = Date.now(),
							v = u.findIndex(z => z.playerName === B); - 1 < v ? u[v].timeout = t : u.push({
							playerName: B,
							timeout: t
						});
						localStorage.setItem("playerTimeouts",
							JSON.stringify(u))
					}

					function g(B, t) {
						const v = Date.now();
						if (Array.isArray(u)) {
							const z = u.find(C => C.playerName === B);
							return !z || v - z.timeout > t
						}
						return !u[B] || v - u[B] > t
					}

					function l(B) {
						for (var t = B.length - 1; 0 < t; t--) {
							const v = Math.floor(Math.random() * (t + 1));
							[B[t], B[v]] = [B[v], B[t]]
						}
						2 < B.length && (t = B.splice(0, 2), B.push(...t));
						return B
					}
					async function q(B, t, v) {
						try {
							const z = t.match(/\d+/)[0],
								C = t.match(/\w+/g)[2],
								I = (new URLSearchParams(t)).get("p");
							localStorage.setItem("tempOpponentDetails", JSON.stringify({
								playerName: v,
								aType: B,
								opponentId: I,
								serverId: z,
								country: C
							}));
							const H = await jQuery.get(U({
									mod: "arena",
									submod: "confirmDoCombat",
									aType: B,
									opponentId: I,
									serverId: z,
									country: C,
									a: (new Date).getTime(),
									sh: X("sh")
								})),
								K = (new URLSearchParams(H)).get("reportId");
							K || window.location.reload();
							Mf(`mod=reports&submod=showCombatReport&t=${B}&reportId=${K}`)
						} catch (z) {
							document.getElementById("content").querySelector("form > input").click(), Lf(1E3)
						}
					}
					"true" === localStorage.getItem("leagueattackenable") && await h();
					"true" === localStorage.getItem("scoreboardattackenable") &&
						await b();
					var n = (new URL(window.location.href)).searchParams.get("sh") || "",
						m = JSON.parse(localStorage.getItem("autoAttackList")) || [];
					let r = JSON.parse(localStorage.getItem("autoAttackServerList")) || [];
					const x = JSON.parse(localStorage.getItem("avoidAttackList")) || [];
					let u = JSON.parse(localStorage.getItem("playerTimeouts")) || [];
					const w = "true" === localStorage.getItem("onlyArena"),
						A = "true" === localStorage.getItem("onlyPlayerListArena");
					if (tf("arena") && 0 < m.length || tf("arena") && 0 < r.length || w || A) try {
						l(m);
						localStorage.setItem("autoAttackList",
							JSON.stringify(m));
						l(r);
						localStorage.setItem("autoAttackServerList", JSON.stringify(r));
						let B = 0,
							t = 2,
							v = 0,
							z = 0;
						const C = m.length + r.length;
						w && (t = 15);
						for (A && (t = C); B < t && (v < m.length || z < r.length);) {
							let I, H, K;
							(K = v < m.length && z < r.length ? .5 > Math.random() : z < r.length) ? (H = r[z], I = H.playerName, z++) : (I = m[v], v++);
							if (!x.includes(I) && (g(I, 6E4 * (10 + Math.floor(36 * Math.random()))) || w)) {
								let L;
								L = K ? await e(H) : await c(I, n);
								ja("arenaAttacks", 0);
								L.includes("index.php?mod=reports") && !L.includes("errorRow") && (k(I), E(`${d.ra}` + I), window.location.reload())
							}
							B++
						}
						if (B ===
							t && A) {
							E("Tried to attack arena list. Timing out 1min.");
							Z("arena", 1);
							window.location.reload();
							return
						}
					} catch (B) {
						window.location.reload()
					}
					if ("mod=arena&submod=serverArena&aType=2" != rf) Mf("mod=arena&submod=serverArena&aType=2");
					else try {
						let B = [...m, ...r].map(z => z.playerName);
						var D = Array.from(document.querySelectorAll("#own2 tr")).slice(1);
						const t = "true" === localStorage.getItem("circusAttackGM") || "true" === localStorage.getItem("arenaAttackGM"),
							v = "true" === localStorage.getItem("attackRandomly");
						n = null;
						m =
							Infinity;
						localStorage.getItem("Username");
						localStorage.getItem("enableArenaSimulator");
						localStorage.getItem("ArenaSimulatorAmount");
						for (let z of D) {
							const C = z.querySelector("a");
							D = 2;
							v && (D = Math.floor(5 * Math.random()) + 2);
							const I = z.querySelector(`td:nth-child(${D})`);
							if (C && I) {
								const H = C.innerText,
									K = parseInt(I.textContent.trim(), 10),
									L = x.includes(H),
									O = null !== C.querySelector("span[style*='color:green;']"),
									Y = "green" === C.style.color;
								if (!(L || !t && O && Y)) {
									if (B.includes(H)) {
										E(`${d.ra}` + H);
										n = C;
										break
									}!n && K < m && (m =
										K, n = C)
								}
							}
						}
						if (n) await q(2, n.href, n.outerText), ja("arenaAttacks", 0);
						else {
							const z = document.querySelector('form[name="filterForm"] input[type="submit"]');
							z && z.click()
						}
					} catch {
						window.location.reload()
					}
				}()
			} else if (sa && tf("circus") && !0 === Da && 9 < da.level && aa == wa && !0 === document.getElementById("cooldown_bar_fill_ct").classList.contains("cooldown_bar_fill_ready")) {
				async function b() {
					var g = new URL(window.location.href),
						l = g.origin;
					g = g.searchParams.get("sh") || "";
					var q = localStorage.getItem("scoreRangeCircus"),
						n = [];
					l = await (await fetch(`${l}/game/index.php?mod=highscore&sh=${g}&a=${q}`)).text();
					l = (new DOMParser).parseFromString(l, "text/html");
					l = Array.from(l.querySelectorAll(".section-like.narrow tr.alt span[data-tooltip] div a")).filter(m => (m = m.parentNode.querySelector('span[style="color:green;font-weight:bold;"]')) ? !("green" === m.style.color || "blue" === m.style.color) : null === m);
					n = [...n, ...l];
					if (0 === n.length) return console.log("No players available to attack"), !1;
					l = JSON.parse(localStorage.getItem("avoidAttackCircusList")) || [];
					q = function(m) {
						for (var r = m.length, x, u; 0 !== r;) u = Math.floor(Math.random() * r), --r, x = m[r], m[r] = m[u], m[u] = x;
						return m
					}(n);
					n = 0;
					for (let m of q)
						if (q = m.textContent.toLowerCase(), !l.map(r => r.toLowerCase()).includes(q)) {
							q = await c(m.textContent, g);
							if (q.includes("index.php?mod=reports")) {
								g = (new URLSearchParams(q)).get("reportId");
								E(`${d.sa}` + m.textContent);
								Mf(`mod=reports&submod=showCombatReport&t=3&reportId=${g}`);
								await new Promise(r => setTimeout(r, 500));
								return
							}
							n++;
							if (3 <= n) break
						} return !1
				}
				async function c(g, l) {
					try {
						const q =
							(new URL(window.location.href)).origin;
						return await (await fetch(`${q}/game/ajax/doGroupFight.php?dname=${g}&a=${Date.now()}&sh=${l}`, {
							method: "POST"
						})).text()
					} catch {
						Lf(1E3)
					}
				}
				async function e(g) {
					var l = g.opponentId;
					const q = g.serverId;
					g = g.country;
					var n = (new URL(window.location.href)).origin;
					n = new URL(`${n}/game/ajax.php`);
					l = {
						mod: "arena",
						submod: "doCombat",
						aType: 3,
						opponentId: l,
						serverId: q,
						country: g.toString(),
						a: (new Date).getTime(),
						sh: X("sh")
					};
					n.search = (new URLSearchParams(l)).toString();
					return await (await fetch(n, {
						method: "GET",
						credentials: "include",
						headers: new Headers({
							"Content-Type": "application/x-www-form-urlencoded"
						})
					})).text()
				}
				async function h() {
					function g(w) {
						const A = null !== w.querySelector("span[style*='color:green;']");
						return Array.from(w.querySelectorAll("a, span")).find(D => "green" === D.style.color || "bold" === D.style.fontWeight) || A
					}
					var l = new URL(window.location.href);
					const q = l.origin;
					var n = await (await fetch(`${q}/game/index.php?mod=arena&submod=grouparena&sh=&sh=${X("sh")}`)).text();
					n = (new DOMParser).parseFromString(n,
						"text/html");
					var m = Array.from(n.querySelectorAll('table[width="80%"] tbody tr')).filter(w => w.querySelector(".attack"));
					if (m.length && 1 !== m.length) {
						var r = null;
						n = JSON.parse(localStorage.getItem("avoidAttackCircusList")) || [];
						if ("true" === localStorage.getItem("leaguecircusrandom")) {
							m = m.sort(() => Math.random() - .5);
							for (var x of m) {
								var u = x.querySelector("a");
								u = u ? u.innerText : null;
								if (!g(x) && !n.includes(u)) {
									r = x;
									break
								}
							}
						} else if ("true" === localStorage.getItem("leaguecircuslowtohigh")) {
							m = m.sort((w, A) => parseInt(w.querySelector("th") ?
								w.querySelector("th").textContent : "0", 10) - parseInt(A.querySelector("th") ? A.querySelector("th").textContent : "0", 10));
							x = null;
							r = -1;
							for (u of m) m = (m = u.querySelector("a")) ? m.innerText : null, g(u) || n.includes(m) || (m = parseInt(u?.querySelector("th")?.textContent, 10), m > r && (r = m, x = u));
							r = x
						}
						if (null === r) localStorage.setItem("leaguecircuslowtohigh", "false"), localStorage.setItem("leaguecircusrandom", "false"), localStorage.setItem("leaguecircusattackenable", "false"), Lf(500);
						else if (r)
							if (n = r.querySelector(".attack").getAttribute("onclick").match(/\d+/)[0],
								u = (new Date).getTime(), l = l.searchParams.get("sh") || "", await new Promise(w => setTimeout(w, 250)), l = await (await fetch(`${q}/game/ajax/doGroupFight.php?did=${n}&a=${u}&sh=${l}`)).text(), (n = l.match(/document\.location\.href\s*=\s*'([^']+)'/)) && n[1]) window.location = `${q}/game/${n[1]}`;
							else {
								l.includes("5") && ("true" === localStorage.getItem("leaguecircuslowtohigh") ? (localStorage.setItem("leaguecircuslowtohigh", "false"), localStorage.setItem("leaguecircusrandom", "true")) : "true" === localStorage.getItem("leaguecircusrandom") &&
									(localStorage.setItem("leaguecircusrandom", "false"), localStorage.setItem("leaguecircuslowtohigh", "false"), localStorage.setItem("leaguecircusattackenable", "false")), location.reload());
								if (l.includes("errorRow")) return !1;
								window.location.reload()
							}
					} else localStorage.setItem("leaguecircusattackenable", "false"), location.reload()
				}
				async function k() {
					function g(t) {
						const v = Date.now(),
							z = w.findIndex(C => C.playerName === t); - 1 < z ? w[z].timeout = v : w.push({
							playerName: t,
							timeout: v
						});
						localStorage.setItem("playerTimeouts",
							JSON.stringify(w))
					}

					function l(t, v) {
						const z = Date.now();
						if (Array.isArray(w)) {
							const C = w.find(I => I.playerName === t);
							return !C || z - C.timeout > v
						}
						return !w[t] || z - w[t] > v
					}

					function q(t) {
						for (var v = t.length - 1; 0 < v; v--) {
							const z = Math.floor(Math.random() * (v + 1));
							[t[v], t[z]] = [t[z], t[v]]
						}
						2 < t.length && (v = t.splice(0, 2), t.push(...v));
						return t
					}
					async function n(t, v, z) {
						try {
							const C = v.match(/\d+/)[0],
								I = v.match(/\w+/g)[2],
								H = (new URLSearchParams(v)).get("p");
							localStorage.setItem("tempOpponentDetails", JSON.stringify({
								playerName: z,
								aType: t,
								opponentId: H,
								serverId: C,
								country: I
							}));
							const K = await jQuery.get(U({
									mod: "arena",
									submod: "confirmDoCombat",
									aType: t,
									opponentId: H,
									serverId: C,
									country: I,
									a: (new Date).getTime(),
									sh: X("sh")
								})),
								L = (new URLSearchParams(K)).get("reportId");
							L || window.location.reload();
							Mf(`mod=reports&submod=showCombatReport&t=${t}&reportId=${L}`)
						} catch (C) {
							document.getElementById("content").querySelector("form > input").click(), Lf(1E3)
						}
					}
					"true" === localStorage.getItem("leaguecircusattackenable") && await h();
					"true" === localStorage.getItem("scoreboardcircusenable") &&
						await b();
					var m = (new URL(window.location.href)).searchParams.get("sh") || "",
						r = JSON.parse(localStorage.getItem("autoAttackCircusList")) || [];
					let x = JSON.parse(localStorage.getItem("autoAttackCircusServerList")) || [];
					const u = JSON.parse(localStorage.getItem("avoidAttackCircusList")) || [];
					let w = JSON.parse(localStorage.getItem("playerTimeouts")) || [];
					const A = "true" === localStorage.getItem("onlyCircus");
					localStorage.getItem("CircusSimulatorAmount");
					const D = "true" === localStorage.getItem("onlyPlayerListCircus");
					if (tf("circus") && 0 < r.length || tf("circus") && 0 < x.length || A || D) try {
						q(r);
						localStorage.setItem("autoAttackCircusList", JSON.stringify(r));
						q(x);
						localStorage.setItem("autoAttackCircusServerList", JSON.stringify(x));
						let t = 0,
							v = 2,
							z = 0,
							C = 0;
						A && (v = 15);
						const I = r.length + x.length;
						for (D && (v = I); t < v && (z < r.length || C < x.length);) {
							let H, K, L;
							(L = z < r.length && C < x.length ? .5 > Math.random() : C < x.length) ? (K = x[C], H = K.playerName, C++) : (H = r[z], z++);
							if (!u.includes(H) && (l(H, 6E4 * (10 + Math.floor(36 * Math.random()))) || A)) {
								let O;
								O = L ? await e(K) :
									await c(H, m);
								ja("circusAttacks", 0);
								if (O.includes("index.php?mod=reports") && !O.includes("errorRow")) {
									g(H);
									E(`${d.sa}` + H);
									window.location.reload();
									break
								}
							}
							t++
						}
						if (t === v && D) {
							E("Tried to attack circus list. Timing out 1min.");
							Z("circus", 1);
							window.location.reload();
							return
						}
					} catch (t) {
						window.location.reload()
					}
					if ("mod=arena&submod=serverArena&aType=3" != rf) Mf("mod=arena&submod=serverArena&aType=3");
					else try {
						if (document.querySelector(".messages .message.fail")) localStorage.setItem("doCircus", !1), window.location.reload();
						else {
							let t = [...r, ...x].map(C => C.playerName);
							var B = Array.from(document.querySelectorAll("#own3 tr")).slice(1);
							const v = "true" === localStorage.getItem("circusAttackGM") || "true" === localStorage.getItem("arenaAttackGM"),
								z = "true" === localStorage.getItem("attackRandomly");
							m = null;
							r = Infinity;
							localStorage.getItem("Username");
							localStorage.getItem("enableCircusSimulator");
							for (let C of B) {
								const I = C.querySelector("a");
								B = 2;
								z && (B = Math.floor(5 * Math.random()) + 2);
								const H = C.querySelector(`td:nth-child(${B})`);
								if (I && H) {
									const K =
										I.innerText,
										L = parseInt(H.textContent.trim(), 10),
										O = u.includes(K),
										Y = null !== I.querySelector("span[style*='color:green;']"),
										ea = "green" === I.style.color;
									if (!(O || !v && Y && ea)) {
										if (t.includes(K)) {
											E(`${d.sa}` + K);
											m = I;
											break
										}!m && L < r && (r = L, m = I)
									}
								}
							}
							if (m) await n(3, m.href, m.outerText), ja("circusAttacks", 0);
							else {
								const C = document.querySelector('form[name="filterForm"] input[type="submit"]');
								C && C.click()
							}
						}
					} catch {
						window.location.reload()
					}
				}
				1 == Cb.isUnderworld ? (await jQuery.get(G({
						mod: "underworld",
						submod: "prayEnd",
						sh: X("sh")
					})),
					await k()) : yh ? await k() : !yh && ("true" === localStorage.getItem("HealEnabled") ? da.o > Number(localStorage.getItem("healPercentage")) : 1) && await k()
			} else if (sa && !0 === Ea && tf("eventPoints") && ("true" === localStorage.getItem("HealEnabled") ? da.o > Number(localStorage.getItem("healPercentage")) : 1) && 0 < jQuery("#submenu2 a").filter(".glow").length) await async function() {
				var b = jQuery("#submenu2 a").filter(".glow") ? jQuery("#submenu2 a").filter(".glow")[0].href.match(/mod=.*&sh/)[0].slice(0, -3) : null;
				if (rf != b) Mf(b);
				else {
					b =
						document.querySelector("#content .ticker");
					let c = parseInt(document.querySelectorAll(".section-header p")[1].innerText.match(/\d+/g)[0], 10),
						e = lc;
					localStorage.setItem("eventPoints_", c);
					if (b) {
						b = document.querySelector('[data-ticker-type="countdown"]').textContent.trim().split(" ").pop();
						let [h, k, g] = b.split(":").map(Number);
						(b = (new Date).getTime() + 1E3 * (3600 * h + 60 * k + g) + 1) ? localStorage.setItem("eventPoints.timeOut", b): Z("eventPoints", 5);
						setTimeout(Mf, 1E3, "mod=overview")
					} else !b && 0 < c ? (3 == e && 1 == c && (e = 2), setTimeout(Fh,
						1E3, document.querySelectorAll(".expedition_button")[e])) : !c && "true" === localStorage.getItem("renewEvent") && 0 < Gh().An ? ((new URL(window.location.href)).searchParams.get("loc"), setTimeout(Fh, 1E3, document.querySelectorAll(".expedition_button")[e])) : 0 == c && "false" === localStorage.getItem("renewEvent") ? (Z("eventPoints", 5), location.reload()) : 0 == c && setTimeout(Mf, 5E3, "mod=overview")
				}
			}();
			else if ((Dc || Ec || Fc) && !wh && Dc && sa && xh && (zh && Gc && Eb && Fb && tf("AuctionEmpty") || Ec && Eb && Fb && tf("AuctionEmpty") || Fc && Eb && Fb && tf("AuctionMEmpty") ||
					Ah && Gc && Bh && Ch && tf("AuctionMEmpty"))) await Aa.start();
			else if (sa && "true" === localStorage.getItem("resetExpiredItems") && (0 < Eh.length || Gj) && 5E3 <= da.gold && tf("resetExpired")) await oj(localStorage.getItem("resetDays"), Eh);
			else if (sa) {
				if ("true" == localStorage.getItem("useCostume") && tf("CheckDolls")) await zj.start();
				else if ("true" === localStorage.getItem("HealEnabled") && "true" == localStorage.getItem("BuffsEnable") && tf("BuffCheck")) await rj();
				else if (!Dh || Wb - Dh >= 6E4 * Ij) localStorage.setItem("MarketlastRan", Wb.toString()),
					"true" == localStorage.getItem("enableMarketSearch") && aa == wa && "true" == sessionStorage.getItem("autoGoActive") && await kf.Yn();
				11001 < Cc && (E(`Waiting for ${Xb} seconds...`), await new Promise(b => setTimeout(b, Cc)));
				ef()
			}
			fa < new Date && aa != wa && hb()
		}
	}
})();
const Jh = {
		Yj: "Smelt Higher Colors First?",
		$b: "Only Attack to player list?",
		ac: "This option will only attack arena/circus list. If cant, bot will skip for a minute.",
		Fk: "Your expedition settings are incorrect or there is an unexpected page data!",
		Gk: "Your expedition setting is incorrect! You set it to disabled monster which is wrong.",
		Tk: "Reset only all underworld items with selected color?",
		Ba: "Priority",
		Sb: "Set Priority",
		Ng: "Points",
		Gh: "Stat",
		Oi: "Collect Gold",
		Jj: "Sell Underworld Items?",
		pj: "Bot will look for nest in every action, not just expeditions.",
		nj: "Nest Search Type",
		lj: "Nothing",
		mj: "Quick",
		oj: "Thorough",
		El: "After expedition points are consumed, travel to Germania to consume Dungeon points",
		sk: "Use this if the bot gets stuck in the repair!",
		Hk: "When HP is below, use heal",
		Jg: "Partial Repair",
		Ye: "Full Repair",
		Ig: "Partial or Full Repair",
		pe: "Enable Limit",
		gj: "Limit",
		hj: "If you want to limit the number of times you want to attack to the enemy, enable this option and set the limit. Bot will continue to attack rest of the enemies after it finishes attacking to the selected monster.",
		ke: "Do not enter underworld with underworld costume?",
		je: "If you dont want to enter underworld while you have underworld costume on, enable this option",
		ui: "Underworld",
		li: "Underworld Buffs",
		ni: "Use god powers after entering the underworld?",
		oi: "Select gods to use powers from:",
		pi: "Use Weapon Buff on the weapon?",
		ri: "Use Armor Buff on the following equipment:",
		Ck: "Cooldown is 30 minutes. If you dont have a costume on you, bot will reset cooldown to 0.",
		Uk: "Select Colors",
		Ya: "Vulcanus Forge",
		bb: "Feronia`s Earthen Shield",
		cb: "Neptune`s Fluid Might",
		eb: "Aelous` Aerial Freedom",
		fb: "Pluto`s Deadly Mist",
		gb: "Juno`s Breath of Life",
		hb: "Wrath Mountain`s Scale Armour",
		ib: "Eagle Eyes",
		jb: "Saturn`s Winter Garment",
		Za: "Bubona` Bull Armour",
		$a: "Mercerius` Robber`s Garments",
		ab: "Ra` Light Robe",
		hg: "Packages",
		cg: "Inventory",
		K: "Min Price",
		J: "How Many",
		Db: "Sell Items",
		Cb: "Search in",
		dg: "Material Color",
		Bb: "Item Color",
		kg: "Warehouse",
		za: "Switch to Materials",
		Fb: "Switch to Items",
		jg: "Sell Materials",
		wa: "Please enter a valid item name and price range and how many.",
		xa: "No suitable items found in the selected search locations.",
		ya: "All items listed successfully!",
		Nk: "All materials listed successfully!",
		fg: "If you want to sell items for fixed price, you can enter the same value for both min and max price.",
		gg: "This feature is still experimental, use with caution. If you dont put fixed price, it will list items randomly between min and max price you enter.",
		Fj: "Repair Before Smelt",
		Qj: "Select the item types you want to smelt.",
		Rj: "Select the colors you want to smelt.",
		Sj: "Select the level of the items you want to smelt.",
		Tj: "Select the hammer you want to use",
		Uj: "Note that Green and Red circle next to the first box are for enabling/disabling the rule.",
		Vj: "If you want to use smelt randomly any colors or types, you can enable `Smelt randomly if no conditions met? (Last enabled option in the tutorial video)",
		yk: "Sets the max gold that the bot will spend per cycle.",
		Ta: "Bot will start bidding on any food items, if enabled. You do not require to enable gladiator/mercenary toggles",
		Jd: "Bot will not bid on allies` bids.",
		Kd: "Ignore Prefix/Suffix Combination when looking for an item in the auction.",
		Le: "Select Monster",
		ze: "Use Hourglass/Ruby?",
		Ek: "Use Ruby?",
		Ce: "Use Mobilization?",
		Be: "Use Life Potion?",
		ye: "Heal Percentage (%)",
		Je: "Number of Attacks",
		Ae: "Attack Interval (in seconds)",
		we: "Attacks Performed",
		xe: "Hourglass Left",
		He: "Note: It uses lifepotions to heal, not food.",
		Ie: "Note: If attacks stop prematurely, try 'Reset Attacks'.",
		Me: "Start",
		Ke: "Reset",
		Ne: "Stop",
		Oe: "Expedition Settings (Click to minimize)",
		De: "Monster 1",
		Ee: "Monster 2",
		Fe: "Monster 3",
		Ge: "Monster 4",
		Qk: "Repair Before Smelt",
		Mi: "This option will use cervisia when your premium expires.",
		sj: "This option will enables and picks oils from god rewards. It can use number 1 and number 3 oils on the character but number 2 will only be picked to packages.",
		Ki: "This option will use buffs at the time you set. It will find buffs in packages and apply it to the character.",
		ij: "This option will enter you to the underworld when your expedition points are below 3. Dont forget to enable Auto Login from Extras tab, otherwise you might get logged out upon entering underworld[Game Bug]",
		bc: "This option will only attack arena/circus list.If cant, bot will skip.",
		Cj: "This option is only for premium licenses. It simulates the attack before attacking a user for %75 win rate.",
		Md: "You do not need to enable main auction toggle to enable this option.",
		kk: "This option will refresh the page every second when auction is in -Very Short- state to bid constantly to win the auction.",
		Oj: "If none of the smelt conditions are met, it will smelt randomly. Make sure to select item type and color.",
		Pj: "This option will only smelt items from inventory. It will ignore items in packages.",
		Ua: "Auction Items",
		ng: "Mercenary Items",
		Ub: "Shop Items",
		wi: "Unique Items",
		Kj: "Set background to black [Increases performance]",
		Lj: "Move Gladbot buttons to bottom left?",
		Ni: "Attack Circus Without Heal",
		jk: "Pick gold from packages if needed?",
		Wl: "Gold has been picked from packages for training",
		Dd: "No gold has been found in packages for training",
		wl: 'GladBot: Use the dices to refresh the mystery box and find valuable items before opening them (Etc. Costumes). Click "Start" open chests.',
		gk: "Items Repaired",
		$j: "Arena Attacks",
		bk: "Circus Attacks",
		Cd: "Items Reset",
		ek: "Expedition Attacks",
		dk: "Dungeon Attacks",
		hk: "Underworld Attacks",
		ak: "Money Earned from Arena",
		ck: "Money Earned from Circus",
		Ul: "Items Smelted",
		fk: "Gold Cycled",
		$i: "Guild Battle",
		bj: "Guild Settings",
		ll: "Will attack guilds randomly.",
		Zi: "Attack Random Guilds?",
		aj: "Guild Name",
		Li: "Reset Stats",
		Nc: "Wood",
		Dc: "Copper",
		Hc: "Iron",
		Jc: "Leather",
		Oc: "Wool",
		Ec: "Cotton Wool",
		Gc: "Hemp",
		Fc: "Gauze Strip",
		Kc: "Linen Strip",
		Ic: "Jute Patch",
		Mc: "Velvet",
		Lc: "Silk Thread",
		Wc: "Fur",
		Qc: "Bone Splinter",
		Zc: "Scale",
		Tc: "Claw",
		Vc: "Fang",
		Uc: "Dragon Scale",
		Rc: "Bull`s Horn",
		Yc: "Poison Gland",
		Sc: "Cerberus` Pelt",
		Xc: "Hydra Scale",
		$c: "Sphinx Feather",
		ad: "Typhon Leather",
		zc: "Lapis Lazuli",
		tc: "Amethyst",
		sc: "Amber",
		uc: "Aquamarine",
		Ac: "Sapphire",
		xc: "Garnet",
		wc: "Emerald",
		vc: "Diamond",
		yc: "Jasper",
		Bc: "Sugilite",
		nc: "Scorpion Poison",
		qc: "Tincture of Stamina",
		jc: "Antidote",
		ic: "Adrenaline",
		pc: "Tincture of Enlightenment",
		mc: "Potion of Perception",
		kc: "Essence of Reaction",
		lc: "Phial of Charisma",
		rc: "Waters of Oblivion",
		oc: "Soul Essence",
		Ad: "Water Seal",
		ud: "Protection Rune",
		sd: "Earth Mark",
		zd: "Totem of Healing",
		yd: "Talisman of Power",
		wd: "Stone of Fortune",
		td: "Flintstone",
		xd: "Storm Rune",
		vd: "Shadow Rune",
		fd: "Crystal",
		ed: "Bronze",
		kd: "Obsidian",
		nd: "Silver",
		od: "Sulphur",
		hd: "Gold Ore",
		md: "Quartz",
		ld: "Platinum",
		dd: "Almandin",
		gd: "Cuprit",
		jd: "Hellstone",
		Hi: "Attack Randomly in Provinciarum?",
		Ii: 'Also disable "Sort players in arena by level" setting in crazy-addon.',
		Wg: "Only accept quests based on god type.",
		Va: "Auto Buff",
		$d: "Use it in hell only?",
		Cg: "New Rule",
		Ag: "Name Contains",
		isUnderworldItem: "Is Underworld Item",
		gf: "Ignore Materials",
		rk: "Use Pray?",
		ti: "When in underworld only accept underworld related quests?",
		si: "If enabled, you need to enter underworld item names. If the bot finds these items in the underworld, it will accept the quest.",
		Yk: "Underworld Quest Item",
		il: "Enter Material Name",
		Bk: "The bot loves dice! They help find clothes in chests. But if there are no dice, the bot opens chests anyway, hoping for some cool clothes (but it might not find any!).",
		Nj: "Send smelted materials to package?",
		oe: "Enable Arena",
		Og: "Prioritize arena list?",
		Pg: "Prioritize circus list?",
		ge: "Disable Log Menu",
		kh: "Reward Min. Gold Value",
		Xg: "Focus Quest, if enabled, will follow the shortest path to finish the dungeon.",
		Jh: "Throw Dice Automatically?",
		Kh: "Use throw dice cautiously, it will keep using the first dice until you disable the option.",
		ph: "Search Progress",
		eh: "Cooldown for repair by default is 10 minutes.",
		xg: "Minimum Condition",
		ee: "Current item on workbench [Clear if bot pauses unexpectedly]",
		Df: "Forge Resources stored to horreum successfully.",
		zf: "Checking marketplace for items...",
		yb: "Item moved to workbench.",
		Qf: "Item successfully repaired and equipped.",
		Rf: "Item successfully repaired.",
		Lk: "Repair failed. Page will be refreshed.",
		Nf: "Picking up materials...",
		Zf: "Waiting for repair...",
		Pf: "Repair has started for .",
		va: "Repair: Moving the item from inventory to bag",
		Of: "Repair: Moving the item from workbench to package.",
		ta: "Could not find enough materials. Disabling the repair slot for 5 minutes ",
		Kf: "Looking for items to buy to hide gold in Auction...",
		wf: "Checking for expired items in packages...",
		xf: "Item successfully reset.",
		yf: "No Empty Space or Gold to Reset.",
		Ef: "Make sure you have sell rights in guild market!",
		sb: "Not enough gold/or no item to buy. Waiting for 30sec to refresh.",
		ub: "Store has been refreshed.",
		vb: "Error while healing.",
		Hf: "No Ruby or Cloth, disabling the options.",
		Kk: "No healing item found in packages.",
		wb: "No suitable items found",
		If: "Foods have been picked. Ending the process.",
		Jf: "At least one food has been picked. Ending process.",
		xb: "No suitable space found in bag to pick food.",
		Ff: "Getting food from packages.",
		Gf: "No suitable space found in bag to pick food.",
		tb: "No more heal items. Waiting for 30 seconds.",
		rb: "HP Recovered.",
		ua: "Nothing to do so I am going to pray!",
		Vf: "Im going to refresh in 60 seconds to check for my health and villa medici.",
		Wf: "Waiting for Villa Medici, refreshing in 60 seconds.",
		Xf: "Left underworld.",
		Yf: "Im going to refresh in 60 seconds to check for my health.",
		Lf: "Checking for god oils...",
		Mf: "God oils have been picked.",
		ra: "Successfully attacked player in ARENA: ",
		sa: "Successfully attacked player in CIRCUS: ",
		uf: "Checking auction! Please wait...",
		vf: "Bidding to items. Please wait...",
		Sf: "Auto Smelted Item: ",
		Tf: "Smelting Item: ",
		zb: "Not enough gold to smelt. Required Gold: ",
		Uf: "SMELT: Looking for items to smelt...",
		Mk: "Looking for items to smelt...",
		Af: "Checking costume availability...",
		Cf: "Donated : ",
		Bf: "Throwing dice...",
		Ue: "Underworld Farm [Manual, Beta]",
		Ve: "Be aware: Turn on this feature after unlocking the creature you want to attack, it will not automatically attack to unlock the monster.",
		Te: "Farm Location",
		Se: "Farm Enemy",
		Td: "Auto Login",
		Ud: "You need to allow pop-ups from the lobby screen for GameForge. See documentation on how to do it.",
		Kg: "Pause Bot",
		Lg: "Pause Bot in (Minutes)",
		Qe: "Expiration Date",
		Fg: "Only buy food?",
		Gg: "If you enable this, it will ignore your selections and buy food automatically without entering anything.",
		Hb: "Max total gold to spend",
		Gb: "Max gold per food to spend",
		Eg: "Bot will check oils every 60 minutes",
		bi: "Sets a timer to check smelting times.",
		Zh: "Sets a timer to check smelting after you dont have gold.",
		ai: "Sets a timer to check smelting if you dont have available item.",
		Uh: "Sets a timer for repair to check your items.",
		Th: "Sets a timer to check guild market hold gold.",
		Ph: "Sets a timer for auction hold gold option.",
		Lh: "Sets a timer to check the arena pvp list to attack.",
		Qh: "Sets a timer to check the circus pvp list to attack.",
		hi: "Sets a timer for training to train your stats.",
		Wh: "Sets a timer to reset expired items.",
		fi: "Sets a timer to store forge materials to horreum.",
		Nh: "Sets a timer to check gladiatos & mercenary auction.",
		Yh: "Sets a timer to search for items in auction&shop.",
		Rh: "Sets the timer of sending donation to the guild.",
		Ze: "Gold Moved",
		le: "Don't sell smelt & auction list items",
		qh: "Shop Automation",
		th: "Item Search Settings",
		rh: "Use this tool to search for items in shops. Simply add the items to the list, specify the cloth amount, and start the search.",
		uh: "Cloths to use:",
		vh: "How many cloths to use?",
		ea: "Enter Full Item Name",
		Tb: "Enter Item Level",
		xh: "Item Quality",
		wh: "Item Name Here",
		yh: "Start Searching",
		zh: "Skip and Continue",
		Ah: "Stop Searching",
		We: "Buy cheapest or expensive?",
		zg: "Most Expensive",
		be: "Cheapest",
		ba: "Select an option",
		qe: "Highlight Underworld Items",
		Xe: "Focus on the quest?",
		Yl: "Use ruby if there isnt cloth?",
		Wa: "Add cross-server players: Find profile, use A & C buttons. Play nice: Avoid targeting same players to dodge reports/bans.",
		Ml: "Smelt Green?",
		Rg: "Do not accept random quests if entered any filters?",
		Pc: "Max Material Quality to use",
		Wi: "Enable Mercenary Search",
		sl: "Click \u2018Sell All Selected\u2019 to sell all items. Make sure to have 2x3 empty space in your first (1) bag and select quality. To mass collect Gold, use `USE GOLD` panel below or filter gold and use the `Pick Selected or Pick All`",
		Zj: "\ud83d\udd25 : Adds item to smelting list.",
		Ji: "\ud83d\udd28 : Adds item to auction list.",
		Ej: "Refresh shop automatically with cloth when its full.",
		Al: "Page:",
		Aj: "Stop",
		yj: "Sell This Page",
		vj: "Pick Selected",
		uj: "Pick All",
		Bj: "Auto Package Settings",
		zj: "Send Resources",
		wj: "Sell All Selected",
		ma: "Item Type",
		oa: "Weapons",
		S: "Shields",
		M: "Armour",
		P: "Helmets",
		O: "Gloves",
		N: "Boots",
		na: "Rings",
		ka: "Amulets",
		Ia: "Usables (Foods)",
		Na: "Upgrades",
		tj: "Boosts",
		Ka: "Recipes",
		Ja: "Mercenary",
		Ma: "Forging Tools",
		La: "Scrolls",
		rd: "Reinforcements",
		pd: "Event Items",
		qd: "Forging Goods",
		zl: "Gold",
		Ha: "All",
		Bl: "Quality",
		pa: "White",
		C: "Green",
		B: "Blue",
		D: "Purple",
		H: "Orange",
		R: "Red",
		xj: "Sell All Options",
		Mj: "Ignore Prefix/Suffix Combination?",
		cj: "How many food to buy/pick?",
		Ri: "Normal",
		Qi: "Middle",
		Pi: "Hard",
		Ea: "Standard",
		Fl: "Repair Stuck Fix",
		Ik: "Underworld mode will automatically disable Dungeon/Arena/Circus, and enable all of them after underworld. Disable Enter Underworld if you want to disable Dungeon/Circus/Arena. If you entered underworld manually, you need to enable underworld Mode.",
		ki: "Set how many times you want to train the stats and their priorities. The bot wont train unless you set a priority. If there is no more stat left but priority is set, it will continue with checked stat.",
		el: "Quest",
		Kl: "Smelt",
		Rl: "Smelt Settings",
		Wj: "Smelted Items",
		Sl: "Add Prefix or Suffix, once it finds it in the packages it will smelt automatically. If you only want to look for all the items listed without checking their combination, enable Ignore combination option.",
		Ql: "Smelting Item:",
		ec: "Click on the item you want to repair and choose the highest quality materials to use. You need to have at least 10,000 gold for the repair to start. Ensure you have a 3x3 space available in your first inventory bag and make sure a food item or any small item is not in the first inventory space otherwise, it might get stuck!. The bot will start the repair once the item has the condition you have chosen. Repair now should be able to continue from where it was left off. Items that have a Hint tooltip might cause a problem.",
		Zk: "Apply only to Mercenary",
		bl: "Auction will only bid when market is close to the end.",
		al: "Smelting will prioritize starting from the first item to search. You can drag and drop to change priority. Smelt will start when you have over 7k gold. ",
		fj: "Heal & Buffs",
		Gl: "Not enough gold to smelt. Required Gold:",
		Jl: "Skipping bid: Guild member has already bid for item ",
		Il: "Skipping bid: Already bid for item ",
		advanced: "Advanced",
		arena: "Arena",
		ia: "Auto Attack",
		cc: "Avoid Attack",
		ga: "Add Player",
		ha: "Add Player Name (Same Server)",
		nl: "Stop Bot if run out of food?",
		circusTurma: "Circus Turma",
		Si: "Difficulty",
		dungeon: "Dungeon",
		Ti: "Dungeon Settings",
		eventExpedition: "Event Expedition",
		expedition: "Expedition",
		Xi: "Expedition Settings",
		Gj: "Select Monster",
		pl: "Highest",
		ol: "Put your heal stuff in first page of your inventory",
		Cc: "In",
		Hh: "Store Gold in Guild Market",
		Ih: "Store Gold in Auction",
		nh: "Use Clothes to renew Shop?",
		Sk: "Select Items to Reset",
		gh: "Reset Expired Items",
		Nb: "Note: By enabling this option, the bot will sell upcoming expired items from Packages to Guild Market then cancels to reset expiration time. Guild is required. Make sure you have empty 3x3 space in your bags. It checks last 7 pages per cycle. This might slow down the bot while it is checking for the pages to reset. If it doesnt work, set display expiry date as Date in game settings.",
		Mg: "Pause bot randomly to work as [Testing Phase]:",
		Y: "Hold Gold: Bot will keep this gold in the bag:",
		lg: "Max Gold: Bot will spend when the gold is greater than",
		lh: "Bot will bid on random items.",
		Ed: "Add Random Delay",
		Fd: "You can add a delay to bot here.",
		Mb: "Repair",
		Ll: "Smelt Blue?",
		Ol: "Smelt Purple?",
		Nl: "Smelt Orange?",
		Xj: "Smelt Everything Only From Inventory?",
		Pl: "`Smelt Tab` works only for `Smelt Everything Only From Inventory` option. Rest of the options will use selected smelt tab. This will ignore color and ignore list items. Tab 1 is reserved for repair.",
		Ch: "Smelt",
		Nd: "Auto Search",
		Bg: "Auto Auction",
		Od: "Excess use of Auction might result in ban. If you enabled auction on Crazy-Addon please disable before using this. Note that, if you put only one item to PREFIX section, bot will try to filter by the items name for faster bidding. Although you need to disable bidding food for this.",
		mh: "Search in Gladiators Auction",
		oh: "Search in Mercenary Auction",
		Wd: "Bid Food?",
		mg: "Maximum Bid",
		Xd: "Bid if the status is less than",
		Yd: "Bidded Items",
		wk: "Auction Language",
		xk: "Please set the language according to your ingame language, otherwise auction wont work.",
		Id: "You can add items to look for items in market and auction. It will also show purple items in the market once you add an item into the list.",
		uk: "Use auction with caution!",
		vk: "Auto bid makes too many requests to the server causing white page error and can cause a ban if you use it often!!",
		dh: "Renew Event Points with Ruby?",
		se: "Enable Auto Oil",
		zk: "Auto Get Holy Oils",
		Ok: "Quest Check Speed",
		Sa: "Attack Guild Members?",
		Qa: 'Auto add people to the "Attack" list when X GOLD is stolen:',
		Ra: 'Automatically add people to the "Avoid Attack" list when you lose to them:',
		Qb: "Scoreboard Attacks",
		Yb: "Very Long",
		Ab: "Long",
		Ib: "Middle",
		Vb: "Short",
		Zb: "Very Short",
		te: "Enter Underworld if HP >",
		Yg: "Quest Check Speed",
		Qg: 'Default is "3x". If bot causes problems with quests, change quest speed according to your server speed.',
		$e: "Heal Pick Bag",
		ue: 'If you are renewing points manually, you need to click the button above "Refresh Event Expedition if stuck!',
		Dk: "You must enable at least one of the following: expedition, dungeon, arena, or circus to start the Event Expedition.",
		$g: "Refresh Event Expedition if stuck!",
		kb: "Dont bid on Allies` Bids?",
		Vk: "Leave all settings disabled if you wish to smelt using packages that contain the items in the list. However, you still need to choose colors.",
		Ak: "Character(Off) / Mercenary(On)",
		Rk: "Repair Both?",
		Wk: "Timers",
		Timers: "Enter the number of minutes for each timer below or leave it default. Be aware! If you enter very low numbers, bot might get stuck in loop!",
		Vg: "Quest Filter Ignore",
		Ug: "Enter keywords to filter out quests you do not want to take",
		V: "Enter Keyword",
		I: "Add",
		bh: "Remove",
		de: "Clear",
		Sg: "Quest Filter Accept",
		Tg: "Enter keywords to choose which quests to take. You can also use this to accept quests by their reward using keyword. Using this will ignore Quest Types",
		Ca: "Skip Time Quests?",
		Pk: "Quests",
		Qd: "Auto Costume",
		zi: "Use Costume?",
		Vd: "Basic Battle",
		me: "Dungeon Battle & Event",
		ce: "Choose underworld costume",
		Fi: "Wear Underworld costume when available?",
		Rd: 'To ensure the bot doesnt override your Underworld costume, make sure to select "Wear Underworld costume when available?" and "Choose Underworld costume." The bot will only switch to Dis Pater Normal and Medium costumes if your expedition or dungeon points are at 0.',
		bf: "Underworld Heal Settings",
		Hd: "Attack Boss When Available?",
		qb: "League attack will disable itself after 5 unsuccessful attack.",
		ef: "Holy Oils",
		wg: "Item Name",
		Z: "Min. Item Level",
		Aa: "Min. Item Quality",
		Gd: "Apply/Reset Timer",
		hf: "Ignore Prefix/Suffix Combination",
		Gi: "Yes",
		Dg: "No",
		Oa: "Add Prefix",
		Pa: "Add Suffix",
		Xa: "Clear History",
		Dh: "Ignore List",
		Jb: "Prefix",
		Wb: "Suffix",
		ih: "Reset Expiring Items",
		Eh: "Smelt randomly if no conditions met?",
		Fh: "Smelt Tab",
		ob: "Extras",
		Ld: "Auction",
		eg: "Market",
		Xb: "Timers",
		di: "Smelting",
		ci: "Smelting if not enough gold",
		$h: "Smelt if no item",
		Da: "Repair",
		Sh: "Guild Market Hold Gold",
		Oh: "Auction Hold Gold",
		gi: "Training",
		Vh: "Reset Expired",
		ei: "Store Forge",
		Mh: "Auction Check",
		Xh: "Search",
		v: "Enable",
		yg: "Minimum Gold",
		Rb: "Select Hour",
		lb: "Donate Gold to Guild",
		he: "Donates every 5 minutes. You can change the interval from timers tab",
		ff: "How much to donate?",
		ie: "Donate when you have more than >",
		tf: "Less than <",
		fh: "Reset Expired and Other settings",
		hh: "Reset in:",
		Jk: "Hold Ctrl (Cmd on Mac) to select multiple items",
		jf: "Import/Export Settings",
		Re: "Export Settings",
		kf: "Import Settings",
		pg: "Message All Players",
		qg: "[Requires Ultra Premium Key, message on Discord to get the key.]",
		rg: "Enter message to send",
		fe: "For custom scripts contact us on Discord",
		tg: "Send",
		ug: "Show Players",
		sg: "SelectAll",
		vg: "UnselectAll",
		sf: "Make sure your inventory has enough space. Cooldown is 2 minutes.",
		nb: "Enable Scoreboard Attack:",
		Ob: "Select Range to Attack",
		Pb: "Bot will randomly attack from the scoreboard list.",
		pb: "League Attack",
		mb: "Enable League Attack:",
		Kb: "Randomly Attack",
		Lb: "Attack lowest to highest",
		tk: "Bot will avoid attacking guild members by default.",
		Pe: "Expedition Location:",
		Pd: "Auto Collect Bonuses:",
		Bh: "Skip Boss",
		ne: "Dungeon Location:",
		jh: "Reset if lose?",
		cf: "Underworld Settings",
		df: "Underworld: Runs from start to finish! Set your heal % in the Heal tab (activate it first). Underworld Mode uses Underworld Heal %, so expect more food consumption. Enable Auto-login in Extras if logout occurs.",
		af: "Underworld Difficulty:",
		Sd: "Auto Enter Underworld / Underworld Mode:",
		Ai: "Use Mobilization if points = 0",
		Ei: "Use rubies?",
		Ci: "Use Sacrifice to heal?",
		mk: "Use Cloth to enter underworld?",
		ve: "Exit underworld if no points?",
		mi: "The bot will try to use Villa Medici first and disable itself if there is no available Villa Medici; if thats the case, it will use a healing potion. Dont forget to enable Heal toggle.",
		vi: "Auto enter Underworld will disable dungeon/arena/circus upon entering underworld.",
		Xk: "Underworld Heal Settings",
		Di: "Use Villa Medici?",
		Bi: "Use Healing Potion?",
		$f: "INFO: The bot will search for market items every selected minutes, which may pause attacking during the search.",
		re: "Enable Market Search:",
		ag: "Market Search Interval in Minutes:",
		bg: "Suggested 10 minutes.",
		nf: "Item Settings:",
		lf: "Item Name Includes",
		G: "Max Price",
		pf: "Item Type",
		mf: "Item Rarity",
		ae: "Buy Soulbound?",
		rf: "Items to Buy",
		qf: "Buy packs if any of them match the maximum price entered?",
		Zd: "Bought Items:",
		dj: "Heal Percentage",
		pk: "Buy Food from Shop?",
		qk: "Use Heal from Package?",
		lk: "Use Cervisia? (packages included)",
		nk: "Use Eggs? (packages included)",
		tl: "Last Used",
		location: "Location",
		Strength: "Strength",
		Dexterity: "Dexterity",
		Agility: "Agility",
		Constitution: "Constitution",
		Charisma: "Charisma",
		Intelligence: "Intelligence",
		ii: "Train Settings",
		ji: "Select the attributes you want to train. It will train once you have enough gold.",
		cd: "Next action",
		qj: "No",
		rj: "Normal",
		xl: "Opponent",
		yl: "Opponent Level",
		Dj: "Quests",
		random: "Random",
		Hl: "Settings",
		Tl: "Soon...",
		type: "Click on icons to activate quest types. Select first 3 if you want to focus on Circus & Arena",
		$l: "Yes",
		A: "Search",
		Bd: "Add item",
		ik: "Store Forge Resources automatically",
		Vl: "Submit",
		rl: "Interval : ",
		gl: "Enable Auto Bid",
		hl: "Cover Allies` Bids",
		Xl: "Tutorial",
		dc: "More users will slow down the bot.",
		$k: "Begin by adding an items full name to the list. Once added, the tool will display search results on the left. This also aids in auto-auction searches. With auto-bid enabled, the tool will periodically search based on your set interval. If the item is found and you have sufficient funds, it will bid automatically. Note: To search for unique items in shops, you must add at least one item to the search list..",
		jl: "The creature number can be selected from the buttons above. Number 1 represents the leftmost creature. Make sure you select the correct location otherwise bot might pause.",
		Ui: "Choose the difficulty of the dungeon from the options above. Ensure you select the correct location, as otherwise, the bot might pause.",
		ej: "Heal Settings",
		Vi: "Store excess gold in Guild by buying guild market items. -> Min. Gold. Leave some empty space in first inventory.",
		ul: "Move All",
		vl: "Move Selected",
		cl: "Auto Heal",
		dl: "Auto Heal Percentage",
		Zl: "Ruby",
		Hg: "General Settings",
		Hj: "Sell All",
		Ij: "Sell Selected",
		fa: "Weapons",
		ca: "Shields",
		U: "Chest Armour",
		X: "Helmets",
		W: "Gloves",
		da: "Shoes",
		aa: "Rings",
		T: "Amulets",
		yi: "Usable",
		xi: "Upgrades",
		Zg: "Recipes",
		og: "Mercenary Scroll",
		ah: "Reinforcements",
		ig: "Sell Food",
		Eb: "Switch to Food"
	},
	Mh = {
		Yj: "Once daha y\u00fcksek renkleri erit?",
		$b: "Sadece oyuncu listesine sald\u0131r?",
		ac: "Bu se\u00e7enek etkinle\u015ftirildi\u011finde, bot sadece oyuncu listesindeki oyunculara sald\u0131racak. Bu se\u00e7enek etkinle\u015ftirilmezse, bot rastgele oyunculara saldiracak.",
		Fk: "Sefer ayarlar\u0131n\u0131z yanl\u0131\u015f veya beklenmedik bir sayfa verisi var!",
		Gk: "Sefer ayar\u0131n\u0131z yanl\u0131\u015f! Devre d\u0131\u015f\u0131 b\u0131rak\u0131lm\u0131\u015f bir canavara ayarlad\u0131n\u0131z, bu yanl\u0131\u015f.",
		Tk: "Sadece se\u00e7ilen renge sahip t\u00fcm yeralt\u0131 \u00f6\u011felerini s\u0131f\u0131rla?",
		Ba: "\u00d6ncelik",
		Sb: "\u00d6ncelik Ayarla",
		Ng: "Puanlar",
		Gh: "Stat Ad\u0131",
		Oi: "Alt\u0131n Topla",
		Jj: "Yeralt\u0131 itemleri satilsin mi?",
		pj: "Bot her eylemde yuva arayacak, sadece ke\u015fiflerde de\u011fil.",
		nj: "Yuva arama t\u00fcr\u00fc",
		lj: "Bir Sey Yapma",
		mj: "Hizli Ara",
		oj: "Kapsamli Ara",
		El: "Expedition Sonras\u0131 Eylem",
		sk: "Tamir takilirsa TIKLA",
		Hk: "Kaca dustugunde iyilestirsin?",
		Jg: "K\u0131smi Onar\u0131m",
		Ye: "Tam Onar\u0131m",
		Ig: "K\u0131smi veya Tam Onar\u0131m",
		pe: "Limiti Etkinle\u015ftir",
		gj: "Limit",
		hj: "D\u00fc\u015fmana sald\u0131rmak istedi\u011finiz kez say\u0131s\u0131n\u0131 s\u0131n\u0131rlamak istiyorsan\u0131z, bu se\u00e7ene\u011fi etkinle\u015ftirin ve limiti ayarlay\u0131n. Bot, se\u00e7ilen canavara sald\u0131rmay\u0131 bitirdikten sonra di\u011fer d\u00fc\u015fmanlara sald\u0131rmaya devam edecek.",
		ke: "Yeralt\u0131 kost\u00fcm\u00fc ile yeralt\u0131na girmeyin",
		je: "Yeralt\u0131 kost\u00fcm\u00fc varken yeralt\u0131na girmek istemiyorsan\u0131z, bu se\u00e7ene\u011fi etkinle\u015ftirin",
		ui: "Yeralt\u0131 D\u00fcnyas\u0131",
		li: "Yeralt\u0131 D\u00fcnyas\u0131 G\u00fc\u00e7lendirmeleri",
		ni: "Yeralt\u0131 d\u00fcnyas\u0131na girdikten sonra tanr\u0131 g\u00fc\u00e7lerini kullan?",
		oi: "G\u00fc\u00e7lerini kullanmak istedi\u011fin tanr\u0131lar\u0131 se\u00e7:",
		pi: "Silaha Silah G\u00fc\u00e7lendirmesi kullan?",
		ri: "A\u015fa\u011f\u0131daki ekipmana Z\u0131rh G\u00fc\u00e7lendirmesi kullan:",
		Ck: "Bekleme s\u00fcresi 30 dakikad\u0131r. \u00dczerinde kost\u00fcm yoksa, bot bekleme s\u00fcresini s\u0131f\u0131rlar.",
		Uk: "Renkleri Se\u00e7",
		Ya: "Vulcano`nun Demirci Atesi",
		bb: "Feronia`nin Toprak Kalkani",
		cb: "Neptune`un sivi gucu",
		eb: "Aelous`un havali ozgurlugu",
		fb: "Pluto`nun olumcul nefesi",
		gb: "Juno`nun Hayat Solugu",
		hb: "Ofkeli Dag Ejderhasi Pul Zirhi",
		ib: "Kartal Bakisi",
		jb: "Saturn`un kisi giysisi",
		Za: "Bubona`nin okuz zirhi",
		$a: "Mercerius`un Hirsiz Kaftani",
		ab: "Ra`nin isikli esvabi",
		hg: "Paketler",
		cg: "Envanter",
		K: "Min. Fiyat",
		J: "Ka\u00e7 Tane",
		Db: "E\u015fya Sat",
		Cb: "\u015eurada Ara",
		dg: "Malzeme Rengi",
		Bb: "E\u015fya Rengi",
		kg: "Depo",
		za: "Malzemelere Ge\u00e7",
		Fb: "E\u015fyalara Ge\u00e7",
		jg: "Malzeme Sat",
		wa: "L\u00fctfen ge\u00e7erli bir e\u015fya ad\u0131, fiyat aral\u0131\u011f\u0131 ve miktar girin.",
		xa: "Se\u00e7ilen arama konumlar\u0131nda uygun e\u015fya bulunamad\u0131.",
		ya: "T\u00fcm e\u015fyalar ba\u015far\u0131yla listelendi!",
		Nk: "T\u00fcm malzemeler ba\u015far\u0131yla listelendi!",
		fg: "Sabit fiyata e\u015fya satmak istiyorsan\u0131z, min ve maks fiyat i\u00e7in ayn\u0131 de\u011feri girebilirsiniz.",
		gg: "Bu \u00f6zellik hala deneyseldir, dikkatli kullan\u0131n. Sabit fiyat koymazsan\u0131z, girdi\u011finiz minimum ve maksimum fiyat aras\u0131nda rastgele \u00f6\u011feler listeleyecektir.",
		Qj: "Eritmek istedi\u011finiz e\u015fya t\u00fcrlerini se\u00e7in.",
		Rj: "Eritmek istedi\u011finiz renkleri se\u00e7in.",
		Sj: "Eritmek istedi\u011finiz e\u015fyalar\u0131n seviyesini se\u00e7in.",
		Tj: "Kullanmak istedi\u011finiz \u00e7ekici se\u00e7in.",
		Uj: "\u0130lk kutunun yan\u0131ndaki Ye\u015fil ve K\u0131rm\u0131z\u0131 \u00e7emberin kural\u0131 etkinle\u015ftirme/devre d\u0131\u015f\u0131 b\u0131rakma i\u00e7in oldu\u011funa dikkat edin.",
		Vj: "E\u011fer rastgele herhangi bir renk veya t\u00fcr\u00fc ergitmek istiyorsan\u0131z, Ko\u015fullar sa\u011flanmazsa rastgele eritilsin mi? (E\u011fitim videosundaki son etkinle\u015ftirilen se\u00e7enek) se\u00e7ene\u011fini etkinle\u015ftirebilirsiniz.",
		yk: "Bot`un her d\u00f6ng\u00fcde harcayaca\u011f\u0131 maksimum alt\u0131n\u0131 belirler.",
		Ta: "Etkinle\u015ftirilirse, bot herhangi bir yiyecek \u00f6\u011fesi i\u00e7in teklif vermeye ba\u015flar. Gladyat\u00f6r/asker ayar\u0131n\u0131 etkinle\u015ftirmeniz gerekmez.",
		Jd: "Bot, m\u00fcttefiklerin tekliflerine teklif vermez.",
		Kd: "A\u00e7\u0131k art\u0131rmada bir \u00f6\u011fe ararken \u00d6nek/Son ek kombinasyonunu g\u00f6rmezden gelir.",
		Fj: "Eritmeden \u00f6nce tamir et?",
		Le: "Canavar Se\u00e7",
		ze: "Kum Saati/Rub kullan?",
		Ek: "Rub kullan?",
		Ce: "Mobilizasyon Kullan?",
		Be: "Ya\u015fam \u0130ksiri Kullan?",
		ye: "\u0130yile\u015ftirme Y\u00fczdesi (%)",
		Je: "Sald\u0131r\u0131 Say\u0131s\u0131",
		Ae: "Sald\u0131r\u0131 Aral\u0131\u011f\u0131 (saniye cinsinden)",
		we: "Yap\u0131lan Sald\u0131r\u0131lar",
		xe: "Kalan Kum Saati",
		He: "Not: \u0130yile\u015ftirmek i\u00e7in yiyecek de\u011fil, ya\u015fam iksiri kullan\u0131r.",
		Ie: "Not: Sald\u0131r\u0131lar erken durursa, 'Sald\u0131r\u0131lar\u0131 S\u0131f\u0131rla' deneyin.",
		Me: "Ba\u015flat",
		Ke: "S\u0131f\u0131rla",
		Ne: "Durdur",
		Oe: "Ke\u015fif Ayarlar\u0131 (K\u00fc\u00e7\u00fcltmek i\u00e7in t\u0131klay\u0131n)",
		De: "Canavar 1",
		Ee: "Canavar 2",
		Fe: "Canavar 3",
		Ge: "Canavar 4",
		Qk: "Eritmeden \u00f6nce tamir et?",
		Mi: "Bu se\u00e7enek, premium \u00fcyeli\u011finiz sona erdi\u011finde cervisia kullanacak.",
		sj: "Bu se\u00e7enek, tanr\u0131 \u00f6d\u00fcllerinden ya\u011flar\u0131 etkinle\u015ftirir ve se\u00e7er. Karakter \u00fczerinde 1 numara ve 3 numara ya\u011flar\u0131 kullanabilir ancak 2 numara sadece paketlere al\u0131n\u0131r.",
		Ki: "Bu se\u00e7enek, belirledi\u011finiz zamanda buff kullan\u0131r. Paketlerdeki bufflar\u0131 bulur ve karaktere uygular.",
		ij: "Bu se\u00e7enek sizi kesif seferleriniz 2 ve altina geldiginde yeralt\u0131 d\u00fcnyas\u0131na sokar. Ekstralar sekmesinden Otomatik Giri\u015fi etkinle\u015ftirmeyi unutmay\u0131n, yoksa yeralt\u0131na girerken \u00e7\u0131k\u0131\u015f yapabilirsiniz [Oyun Hatas\u0131]",
		bc: "Bot sadece arena veya circus listesindekilere saldirir. Saldiramazsa atlar.",
		Cj: "Bu se\u00e7enek sadece premium lisanslar i\u00e7indir. Kullan\u0131c\u0131ya sald\u0131rmadan \u00f6nce %75 kazanma oran\u0131 ile sald\u0131r\u0131y\u0131 sim\u00fcle eder.",
		Md: "Bu se\u00e7ene\u011fi etkinle\u015ftirmek i\u00e7in ana m\u00fczayede ge\u00e7i\u015fini etkinle\u015ftirmenize gerek yoktur.",
		kk: "Bu se\u00e7enek, m\u00fczayede -\u00c7ok K\u0131sa- durumundayken sayfay\u0131 her saniye yeniler ve s\u00fcrekli teklif vererek m\u00fczayede kazanmay\u0131 ama\u00e7lar.",
		Oj: "E\u011fer eritme ko\u015fullar\u0131ndan hi\u00e7biri kar\u015f\u0131lanmazsa rastgele eritir. L\u00fctfen e\u015fya tipini ve rengini se\u00e7in.",
		Pj: "Bu se\u00e7enek sadece envanterdeki e\u015fyalar\u0131 eritir. Paketlerdeki e\u015fyalar\u0131 g\u00f6rmezden gelecektir.",
		Kj: "Arkaplan\u0131 Siyah yap",
		Lj: "Bot butonlarini sol alta koy?",
		Ni: "Iyilestirme olmadan Sirke Sald\u0131r?",
		jk: "Gerekirse paketlerden alt\u0131n al\u0131ns\u0131n?",
		Wl: "E\u011fitim i\u00e7in paketlerden alt\u0131n al\u0131nd\u0131",
		Dd: "E\u011fitim i\u00e7in paketlerde alt\u0131n bulunamad\u0131",
		wl: 'GladBot: Gizem kutusunu yenilemek ve de\u011ferli e\u015fyalar\u0131 (Vb. Kost\u00fcmler) a\u00e7madan \u00f6nce bulmak i\u00e7in zarlar\u0131 kullan. Sand\u0131klar\u0131 a\u00e7mak i\u00e7in "Ba\u015flat"a t\u0131kla.',
		Ua: "Muzayede Esyalari",
		ng: "Mersaneri Esyalari",
		Ub: "Dukkan Esyalari",
		wi: "Degerli Dukkan Esyalari",
		gk: "E\u015fyalar Tamir Edildi",
		$j: "Arena Sald\u0131r\u0131lar\u0131",
		bk: "Sirk Sald\u0131r\u0131lar\u0131",
		Cd: "E\u015fyalar S\u0131f\u0131rland\u0131",
		ek: "Sefer Sald\u0131r\u0131lar\u0131",
		dk: "Zindan Sald\u0131r\u0131lar\u0131",
		hk: "Yeralt\u0131 Sald\u0131r\u0131lar\u0131",
		ak: "Arenadan Kazan\u0131lan Para",
		ck: "Sirkten Kazan\u0131lan Para",
		Ul: "E\u015fyalar Eritildi",
		fk: "D\u00f6n\u00fc\u015ft\u00fcr\u00fclen Alt\u0131n",
		$i: "Lonca Sava\u015f\u0131",
		bj: "Lonca Ayarlar\u0131",
		ll: "Loncalara rastgele sald\u0131racak.",
		aj: "Lonca Ismi",
		Zi: "Rastgele Sald\u0131r",
		Li: "\u0130statistikleri S\u0131f\u0131rla",
		Nc: "Ah\u015fap",
		Dc: "Bak\u0131r",
		Hc: "Demir",
		Jc: "Deri",
		Oc: "Y\u00fcn \u0130plik",
		Ec: "Y\u00fcn Yuma\u011f\u0131",
		Gc: "Kenevir",
		Fc: "Gaze \u015eeridi",
		Kc: "Keten Par\u00e7as\u0131",
		Ic: "J\u00fct Dikimi",
		Mc: "Kadife \u015eerit",
		Lc: "\u0130pek \u0130plik",
		Wc: "Post Par\u00e7as\u0131",
		Qc: "Kemik Par\u00e7as\u0131",
		Zc: "Kepek",
		Tc: "Pen\u00e7e",
		Vc: "K\u00f6pek Di\u015fi",
		Uc: "Ejderha Kepe\u011fi",
		Rc: "Bo\u011fa Boynuzu",
		Yc: "Zehir Bezesi",
		Sc: "Cerberus`un post par\u00e7as\u0131",
		Xc: "Hidra pulu",
		$c: "Sfenks t\u00fcy\u00fc",
		ad: "Tifon derisi",
		zc: "Lacivert Tasi",
		tc: "Ametist",
		sc: "Kehribar",
		uc: "Akuamarin",
		Ac: "Safir",
		xc: "Grena Ta\u015f\u0131",
		wc: "Z\u00fcmr\u00fct",
		vc: "Elmas",
		yc: "Jaspis",
		Bc: "Sugilith",
		nc: "Akrep Zehri",
		qc: "Dayan\u0131kl\u0131l\u0131k Tent\u00fcr\u00fc",
		jc: "Antidot",
		ic: "Adrenalin",
		pc: "Ayd\u0131nl\u0131k Tent\u00fcr\u00fc",
		mc: "Alg\u0131 Tent\u00fcr\u00fc",
		kc: "Refleks Esans\u0131",
		lc: "Karizma Flakonu",
		rc: "Unutman\u0131n Suyu",
		oc: "Ruh esans\u0131",
		Ad: "Su M\u00fchr\u00fc",
		ud: "Koruyucu Runik",
		sd: "D\u00fcnya Grav\u00fcr\u00fc",
		zd: "\u015eifa Totemi",
		yd: "G\u00fc\u00e7 T\u0131ls\u0131m\u0131",
		wd: "\u015eans Ta\u015f\u0131",
		td: "Ate\u015f Ta\u015f\u0131",
		xd: "F\u0131rt\u0131na Runi\u011fi",
		vd: "G\u00f6lge runi\u011fi",
		fd: "Kristal",
		ed: "Bronz",
		kd: "Obsidyen",
		nd: "G\u00fcm\u00fc\u015f",
		od: "K\u00fck\u00fcrt",
		hd: "Alt\u0131n Madeni",
		md: "Kuvars",
		ld: "Platin",
		dd: "Almandin",
		gd: "Cuprit",
		jd: "Cehennem ta\u015f\u0131",
		Hi: "Provinciarum'da Rastgele Sald\u0131r?",
		Ii: 'Crazy-addon\'da "Arena oyuncular\u0131n\u0131 seviyeye g\u00f6re s\u0131rala" se\u00e7ene\u011fini de devre d\u0131\u015f\u0131 b\u0131rak\u0131n.',
		Wg: "Sadece tanr\u0131 t\u00fcr\u00fcne g\u00f6re g\u00f6rev kabul et.",
		Va: "Oto Buff",
		$d: "Sadece cehennemde kullan?",
		Cg: "Yeni Kural",
		Ag: "\u0130sim \u0130\u00e7erir",
		isUnderworldItem: "Yeralt\u0131 item mi?",
		gf: "Malzemeleri Yoksay",
		rk: "Dua Kullan?",
		Ci: "\u015eifalanmak i\u00e7in Kurban Kullan?",
		mk: "Yeralt\u0131na girmek i\u00e7in kuma\u015f kullan?",
		ti: "Yeralt\u0131nda sadece yeralt\u0131 ile ilgili g\u00f6revleri kabul et?",
		si: "Etkinle\u015ftirilirse, yeralt\u0131 item adlar\u0131n\u0131 girmeniz gerekir. Bot, bu itemlari yeralt\u0131nda bulursa g\u00f6revi kabul eder.",
		Yk: "Yeralt\u0131 G\u00f6rev Itemi",
		il: "Malzeme Ad\u0131n\u0131 Girin",
		Bk: "Bot zarlar\u0131 sever! Zarlar, sand\u0131klarda k\u0131yafet bulmaya yard\u0131mc\u0131 olur. Ancak zar yoksa, bot yine de sand\u0131klar\u0131 a\u00e7ar ve k\u0131yafetler bulmay\u0131 umar (ama bulamayabilir!).",
		Nj: "Ertilen malzemeleri pakete g\u00f6nder?",
		oe: "Arena'y\u0131 Etkinle\u015ftir",
		Og: "Arena listesini \u00f6nceliklendir?",
		Pg: "Sirk listesini \u00f6nceliklendir?",
		ge: "Log Men\u00fcs\u00fcn\u00fc Devre D\u0131\u015f\u0131 B\u0131rak",
		kh: "\u00d6d\u00fcl Min. Alt\u0131n De\u011feri",
		Xg: "Odaklanm\u0131\u015f G\u00f6rev, etkinle\u015ftirilirse, zindan\u0131 bitirmek i\u00e7in en k\u0131sa yolu izler.",
		Jh: "Zar\u0131 Otomatik At?",
		Kh: "Zar\u0131 dikkatli kullan\u0131n, ilk zar\u0131 se\u00e7ene\u011fi devre d\u0131\u015f\u0131 b\u0131rakana kadar kullanmaya devam eder.",
		ph: "Arama \u0130lerlemesi",
		eh: "Onar\u0131m\u0131n varsay\u0131lan bekleme s\u00fcresi 10 dakikad\u0131r.",
		xg: "Minimum Durum",
		ee: "\u0130\u015f tezgah\u0131ndaki mevcut \u00f6\u011fe [Bot beklenmedik \u015fekilde durursa Temizle]",
		Df: "D\u00f6k\u00fcm Kaynaklar\u0131 ba\u015far\u0131yla horreuma depoland\u0131.",
		zf: "Pazar yerindeki \u00f6\u011feleri kontrol ediyor...",
		yb: "\u00d6\u011fe i\u015f tezgah\u0131na ta\u015f\u0131nd\u0131.",
		Qf: "\u00d6\u011fe ba\u015far\u0131yla onar\u0131ld\u0131 ve donat\u0131ld\u0131.",
		Rf: "\u00d6\u011fe ba\u015far\u0131yla onar\u0131ld\u0131.",
		Lk: "Onar\u0131m ba\u015far\u0131s\u0131z oldu. Sayfa yenilenecek.",
		Nf: "Malzemeler toplan\u0131yor...",
		Zf: "Onar\u0131m bekleniyor...",
		Pf: "Onar\u0131m ba\u015flad\u0131.",
		va: "Onar\u0131m: \u00d6\u011feyi envanterden \u00e7antaya ta\u015f\u0131ma",
		Of: "Onar\u0131m: \u00d6\u011feyi i\u015f tezgah\u0131ndan pakete ta\u015f\u0131ma.",
		ta: "Yeterli malzeme bulunamad\u0131. Onar\u0131m slotunu 5 dakikaligina devre disi birakiyorum. ",
		Kf: "Alt\u0131n\u0131 saklamak i\u00e7in a\u00e7\u0131k art\u0131rmadan sat\u0131n al\u0131nacak \u00f6\u011feler aran\u0131yor...",
		wf: "Paketlerdeki s\u00fcresi dolmu\u015f \u00f6\u011feler kontrol ediliyor...",
		xf: "\u00d6\u011fe ba\u015far\u0131yla s\u0131f\u0131rland\u0131.",
		yf: "Bo\u015f Alan veya S\u0131f\u0131rlanacak Alt\u0131n Yok.",
		Ef: "Klan pazar\u0131nda sat\u0131\u015f haklar\u0131n\u0131z oldu\u011fundan emin olun!",
		sb: "Yeterli alt\u0131n ve/veya sat\u0131n al\u0131nacak \u00f6\u011fe yok. Yenilemek i\u00e7in 30sn bekliyor.",
		ub: "Ma\u011faza yenilendi.",
		vb: "\u0130yile\u015ftirme s\u0131ras\u0131nda hata.",
		Hf: "Ruby veya Kuma\u015f yok, se\u00e7enekleri devre d\u0131\u015f\u0131 b\u0131rak.",
		Kk: "Paketlerde yiyecek bulunamad\u0131.",
		wb: "Uygun yiyecek bulunamad\u0131",
		If: "Yiyecekler topland\u0131. \u0130\u015flem sonland\u0131r\u0131l\u0131yor.",
		Jf: "En az bir yiyecek topland\u0131. \u0130\u015flem sonland\u0131r\u0131l\u0131yor.",
		xb: "\u00c7antada yiyecek almak i\u00e7in uygun alan bulunamad\u0131.",
		Ff: "Paketlerden yiyecek al\u0131n\u0131yor.",
		Gf: "\u00c7antada yiyecek almak i\u00e7in uygun alan bulunamad\u0131.",
		tb: "Daha fazla iyile\u015ftirme \u00f6\u011fesi yok. 30 saniye bekliyor.",
		rb: "HP Kurtar\u0131ld\u0131.",
		ua: "Yapacak bir \u015fey yok, bu y\u00fczden dua edece\u011fim!",
		Vf: "Sa\u011fl\u0131\u011f\u0131m\u0131 ve villa medicimi kontrol etmek i\u00e7in 60 saniye i\u00e7inde yenileyece\u011fim.",
		Wf: "Villa Medici bekleniyor, 60 saniye i\u00e7inde yenileniyor.",
		Xf: "Underworld terk edildi.",
		Yf: "Sa\u011fl\u0131\u011f\u0131m\u0131 kontrol etmek i\u00e7in 60 saniye i\u00e7inde yenileyece\u011fim.",
		Lf: "Tanr\u0131 ya\u011flar\u0131 kontrol ediliyor...",
		Mf: "Tanr\u0131 ya\u011flar\u0131 topland\u0131.",
		ra: "ARENADA ba\u015far\u0131yla oyuncuya sald\u0131r\u0131ld\u0131: ",
		sa: "CIRCUS'ta ba\u015far\u0131yla oyuncuya sald\u0131r\u0131ld\u0131: ",
		uf: "A\u00e7\u0131k art\u0131rma kontrol ediliyor! L\u00fctfen bekleyin...",
		vf: "\u00d6\u011felere teklif veriliyor. L\u00fctfen bekleyin...",
		Sf: "Otomatik Eritilen Item: ",
		Tf: "Eritme \u00d6\u011fesi: ",
		zb: "Eritmek i\u00e7in yeterli alt\u0131n yok. Gerekli Alt\u0131n: ",
		Uf: "ER\u0130T: Eritilecek \u00f6\u011feler aran\u0131yor...",
		Mk: "Eritilecek \u00f6\u011feler aran\u0131yor...",
		Af: "Kost\u00fcm mevcudiyeti kontrol ediliyor...",
		Cf: "Ba\u011f\u0131\u015fland\u0131 : ",
		Bf: "Zar at\u0131l\u0131yor...",
		Ue: "Yeralti Farmla [Manuel, BETA]",
		Ve: "Bu ozelligi saldirmak istediginiz yaratigi actiktan sonra acin, otomatik olarak yaratigi acana kadar saldirmayacaktir. Dikkat edin.",
		Te: "Farm Lokasyonu",
		Se: "Farm Dusmani",
		Td: "Otomatik Giri\u015f",
		Ud: "GameForge lobisinden a\u00e7\u0131l\u0131r pencere izinlerini vermeniz gerekmektedir. Nas\u0131l yap\u0131laca\u011f\u0131na dair dok\u00fcmantasyona bak\u0131n.",
		Kg: "Bot'u Durdur",
		Lg: "Bot'u ka\u00e7 dakika bitince durdurmak istersiniz? (Dakika)",
		Qe: "Son Kullanma Tarihi",
		Fg: "Sadece yemek sat\u0131n al?",
		Gg: "Bunu etkinle\u015ftirirseniz, se\u00e7imlerinizi g\u00f6rmezden gelir ve herhangi bir \u015fey girmeden otomatik olarak yemek sat\u0131n al\u0131r.",
		Hb: "Harcamak i\u00e7in maksimum toplam alt\u0131n",
		Gb: "Harcamak i\u00e7in maksimum alt\u0131n miktar\u0131",
		Eg: "Bot, ya\u011flar\u0131 her 60 dakikada bir kontrol edecek",
		bi: "Eritme s\u00fcrelerini kontrol etmek i\u00e7in bir zamanlay\u0131c\u0131 ayarlar.",
		Zh: "Alt\u0131n\u0131n\u0131z olmad\u0131\u011f\u0131nda erimeyi kontrol etmek i\u00e7in bir zamanlay\u0131c\u0131 ayarlar.",
		ai: "Kullan\u0131labilir e\u015fyan\u0131z olmad\u0131\u011f\u0131nda erimeyi kontrol etmek i\u00e7in bir zamanlay\u0131c\u0131 ayarlar.",
		Uh: "E\u015fyalar\u0131n\u0131z\u0131 kontrol etmek i\u00e7in bir tamir zamanlay\u0131c\u0131 ayarlar.",
		Th: "Ittifak pazar\u0131ndaki alt\u0131n\u0131 kontrol etmek i\u00e7in bir zamanlay\u0131c\u0131 ayarlar.",
		Ph: "M\u00fczayede tutma alt\u0131n\u0131 se\u00e7ene\u011fi i\u00e7in bir zamanlay\u0131c\u0131 ayarlar.",
		Lh: "Arenadaki PvP listesini kontrol etmek i\u00e7in bir zamanlay\u0131c\u0131 ayarlar.",
		Qh: "Sirk PvP listesini kontrol etmek i\u00e7in bir zamanlay\u0131c\u0131 ayarlar.",
		hi: "\u0130statistiklerinizi e\u011fitmek i\u00e7in bir e\u011fitim zamanlay\u0131c\u0131 ayarlar.",
		Wh: "S\u00fcresi dolmu\u015f e\u015fyalar\u0131 s\u0131f\u0131rlamak i\u00e7in bir zamanlay\u0131c\u0131 ayarlar.",
		fi: "D\u00f6vme malzemelerini horreum'a koymak i\u00e7in bir zamanlay\u0131c\u0131 ayarlar.",
		Nh: "Gladyat\u00f6rler ve paral\u0131 askerler m\u00fczayede kontrol\u00fc i\u00e7in bir zamanlay\u0131c\u0131 ayarlar.",
		Yh: "M\u00fczayede ve market i\u00e7in e\u015fya aramak i\u00e7in bir zamanlay\u0131c\u0131 ayarlar.",
		Rh: "Ittifaga ba\u011f\u0131\u015f g\u00f6nderme zamanlay\u0131c\u0131s\u0131n\u0131 ayarlar.",
		Ze: "Alt\u0131n Ta\u015f\u0131nd\u0131",
		le: "Eritme ve Muzayede listesi e\u015fyalar\u0131n\u0131 satma",
		qh: "Market Otomasyonu",
		th: "E\u015fya Arama Ayarlar\u0131",
		rh: "Bu ozellik, dukkanlarda e\u015fya aramak i\u00e7in kullanilir. Sadece e\u015fyalar\u0131 listeye ekleyin, kuma\u015f miktar\u0131n\u0131 belirtin ve aramay\u0131 ba\u015flat\u0131n. Ornegin mor samnit, mor samnit i bulana kadar arar.",
		uh: "Kullan\u0131lacak Kuma\u015flar:",
		vh: "Ka\u00e7 kuma\u015f kullan\u0131lacak?",
		ea: "Full E\u015fya Ad\u0131n\u0131 Girin",
		Tb: "E\u015fya Seviyesini Girin",
		xh: "E\u015fya Kalitesi",
		wh: "E\u015fya Ad\u0131 Buraya",
		yh: "Aramaya Ba\u015fla",
		zh: "Atla ve Devam Et",
		Ah: "Aramay\u0131 Durdur",
		We: "En ucuz mu, en pahal\u0131 m\u0131 alay\u0131m?",
		zg: "En Pahal\u0131",
		be: "En Ucuz",
		ba: "Bir se\u00e7enek se\u00e7in",
		qe: "Yeralt\u0131 D\u00fcnyas\u0131 Itemlarini Goster",
		Xe: "G\u00f6reve odaklan\u0131ls\u0131n m\u0131?",
		Yl: "Elbise yoksa yakut kullan?",
		Wa: "Diger serverlarda sald\u0131rmak icin, oyuncunun sayfasini acin ve A & C butonlariyla ekleyin. Not: Rapor edilmemek i\u00e7in ayn\u0131 ki\u015filere sald\u0131rmaktan ka\u00e7\u0131n\u0131n. Rapor edilmek, banlanma \u015fans\u0131n\u0131z\u0131 art\u0131r\u0131r.",
		Ml: "Yesil Eritilsin mi?",
		Rg: "Herhangi bir filtre girildiyse rastgele g\u00f6revleri kabul etme?",
		Pc: "Maksimum materyal kalitesi?",
		Wi: "Mersaneri Ara?",
		sl: "T\u00fcm Se\u00e7ilenleri Sat\u2019\u0131 t\u0131klay\u0131n ve t\u00fcm e\u015fyalar\u0131 sat\u0131n. \u0130lk (1) \u00e7antan\u0131zda 2x3 bo\u015f alan oldu\u011fundan emin olun ve kalite secmeyi unutmayin. Alt\u0131n toplamak i\u00e7in, alt\u0131n\u0131 filtreleyin ve `Se\u00e7ilenleri Al veya T\u00fcm\u00fcn\u00fc Al`\u0131 kullan\u0131n",
		Zj: "\ud83d\udd25 : E\u015fyay\u0131 eritme listesine ekler.",
		Ji: "\ud83d\udd28 : E\u015fyay\u0131 a\u00e7\u0131k art\u0131rma listesine ekler.",
		Ej: "D\u00fckkan dolu oldu\u011funda d\u00fckkan\u0131 kuma\u015fla yenileyin",
		Al: "Sayfa:",
		Aj: "Durdur",
		yj: "Bu Sayfay\u0131 Sat",
		vj: "Se\u00e7ilenleri Al",
		uj: "T\u00fcm\u00fcn\u00fc Al",
		Bj: "Paket Ayarlar\u0131",
		zj: "Kaynaklar\u0131 G\u00f6nder",
		wj: "T\u00fcm Se\u00e7ilenleri Sat",
		ma: "E\u015fya T\u00fcr\u00fc",
		oa: "Silahlar",
		S: "Kalkanlar",
		M: "Z\u0131rhlar",
		P: "Kasklar",
		O: "Eldivenler",
		N: "Ayakkabilar",
		na: "Y\u00fcz\u00fckler",
		ka: "Nazarliklar",
		Ia: "Malzemeler (Yiyecekler)",
		Na: "G\u00fc\u00e7lendirmeler",
		tj: "Yukseltmeler",
		Ka: "Receteler",
		Ja: "Mersaneri Askerler",
		Ma: "Demirhane Mallari",
		La: "Persomenler",
		rd: "Takviyeler",
		pd: "Etkinlik E\u015fyalar\u0131",
		qd: "D\u00f6vme Malzemeleri",
		zl: "Alt\u0131n",
		Ha: "Hepsi",
		Bl: "Kalite",
		pa: "Beyaz",
		C: "Ye\u015fil",
		B: "Mavi",
		D: "Mor",
		H: "Turuncu",
		R: "K\u0131rm\u0131z\u0131",
		xj: "T\u00fcm Sat\u0131\u015f Se\u00e7enekleri",
		Mj: "\u00d6nek/Sonek Kombinasyonunu Yoksay?",
		cj: "Ka\u00e7 yiyecek sat\u0131n almak/al\u0131nmal\u0131?",
		Ri: "Normal",
		Qi: "Orta",
		Pi: "Zor",
		Ea: "Standart",
		Fl: "S\u0131k\u0131\u015fma Onar\u0131m\u0131",
		Ik: "Dungeon/Circus/Arena\u2019y\u0131 devre d\u0131\u015f\u0131 b\u0131rakmak istiyorsan\u0131z Cehenneme Giri\u015fi Devre D\u0131\u015f\u0131 B\u0131rakin. Cehenneme manuel olarak girdiyseniz, Cehennem Modu\u2019nu etkinle\u015ftirmeniz gerekecektir.",
		ki: "Egitimleri ka\u00e7 kez e\u011fitmek istedi\u011finizi ve onlar\u0131n \u00f6nceliklerini belirleyin. Bot, bir \u00f6ncelik belirlemedik\u00e7e e\u011fitim yapmayacakt\u0131r. E\u011fer \u00f6ncelik belirlenmi\u015fse ancak ba\u015fka bir egitim kalmam\u0131\u015fsa, secilen egitim devam edecektir.",
		el: "Gorev",
		Kl: "Erit",
		Rl: "Eritme Ayarlar\u0131",
		Wj: "Eritilen Nesneler",
		Sl: "\u00d6nek veya Sonek Ekle, paketlerde bulunursa otomatik olarak eritilecektir.:",
		Ql: "Eritilen Nesne:",
		ec: "Onarmak istedi\u011finiz nesneyi t\u0131klay\u0131n. Onar\u0131ma ba\u015flamak i\u00e7in en az 10,000 alt\u0131n\u0131z\u0131n olmas\u0131 gerekmektedir. Yeni repair sistemi refresh atilsa bile kaldigi yerden devam edecektir. Sorun cikarsa clear a basip workbench itemini temizleyebilirsiniz. Ayr\u0131ca envanterinizde yer a\u00e7mayi unutmayin. Bot, kondisyon seciminize gore aktif olacaktir.",
		Zk: "Sadece S\u00f6zle\u015fmeliye Uygula",
		bl: "M\u00fczayede yaln\u0131zca piyasa sona yakla\u015ft\u0131\u011f\u0131nda teklif verecektir.",
		al: "Envanterde bos yer acmayi ve en az 7K alt\u0131n\u0131n\u0131z\u0131n oldu\u011fundan emin olun. Bot 1. koydugunuz prefixden baslayip sona dogru bakacaktir, bu siralamayi uzerine gelip tasiyarak degistirebilirsiniz. Bot, sectiginiz sekmeye gore itemlari tasiyacak ve eritecektir. Eritme i\u015flemi her ayarlanan zamana gore kontrol edilir. Bu ayari Zamanlayici sekmesinden degistirebilirsiniz. Eger kombinasyon olarak bakmak istemiyorsaniz, onek sonek kombinasyonunu yoksay`i aktiflestirin.",
		fj: "\u0130yile\u015ftirme/Buff",
		Gl: "Eritmek i\u00e7in yeterli alt\u0131n yok. Gerekli Alt\u0131n:",
		Jl: "Teklifi Atla: ittifak \u00fcyesi zaten nesne i\u00e7in teklif verdi ",
		Il: "Teklifi Atla: Zaten nesne i\u00e7in teklif verildi ",
		advanced: "Geli\u015fmi\u015f",
		arena: "Arena",
		ia: "Otomatik sald\u0131r\u0131 listesi",
		cc: "Bu listedekilere sald\u0131rma",
		ga: "Oyuncu Ekle",
		ha: "Oyuncu Ad\u0131 Gir (Ayni Server)",
		nl: "Yiyecek t\u00fckenirse Botu Durdur?",
		circusTurma: "Sirkin Turma",
		Si: "Zorluk",
		dungeon: "Zindan",
		Ti: "Zindan Ayarlar\u0131",
		eventExpedition: "Etkinlik Seferi",
		expedition: "Sefer",
		Xi: "Sefer Ayarlar\u0131",
		Gj: "Yarat\u0131k Se\u00e7",
		pl: "En Y\u00fcksek",
		ol: "\u0130yile\u015ftirme e\u015fyalar\u0131n\u0131z\u0131 envanterinizin ilk sayfas\u0131na koyun",
		Cc: "\u0130\u00e7inde",
		ce: "Yeralti kostumu secin",
		Fi: "Yeralti kostumu hazir oldugunda giy?",
		Hh: "Alt\u0131n\u0131 Depola",
		Ih: "Alt\u0131n\u0131 M\u00fczayedede Depola?",
		nh: "D\u00fckk\u00e2n\u0131 yenilemek i\u00e7in \u0130\u015f K\u0131yafetleri kullan\u0131ls\u0131n m\u0131?",
		Sk: "S\u0131f\u0131rlanacak Nesneleri Se\u00e7in",
		gh: "S\u00fcresi Dolan Nesneleri S\u0131f\u0131rla",
		Nb: "Not: Bu se\u00e7ene\u011fi etkinle\u015ftirirseniz, bot paketlerden gelecek s\u00fcresi dolan nesneleri ittifak marketine satar ve s\u00fcrelerini s\u0131f\u0131rlar. Ittifak gereklidir. \u00c7antalar\u0131n\u0131zda bo\u015f 3x3 alan\u0131n\u0131z oldu\u011fundan emin olun, ozellikle birinci canta. Her basladiginda son 7 sayfaya bakar. Eger calismazsa oyun ayarlarindan sure bitimini tarih olarak ayarlayin.",
		Mg: "Bota Rastgele Ara Vermesini Sa\u011fla [Test A\u015famas\u0131]:",
		Y: "Alt\u0131n\u0131 Tut: Bot bu alt\u0131n\u0131 \u00e7antada saklayacak:",
		lg: "Maksimum Alt\u0131n",
		lh: "Gereksiz itemlar i\u00e7in teklif verilecek",
		Ed: "Rastgele Gecikme Ekle",
		Fd: "Bot i\u00e7in rastgele gecikme ekleyebilirsiniz.",
		Mb: "Onar\u0131m",
		Ll: "Mavi Eritilsin mi?",
		Ol: "Mor Eritilsin mi?",
		Nl: "Turuncu Eritilsin mi?",
		Xj: "Sadece envantere koyulanlari mi eritsin?",
		Pl: "Bu renk se\u00e7imlerini yok sayacakt\u0131r",
		Oa: "\u00d6nek Ekle",
		Pa: "Sonek Ekle",
		Ch: "Erit",
		Nd: "Otomatik Arama",
		Bg: "Otomatik M\u00fczayede",
		Od: "Bu ozelligi fazla kullanmak banlanmaniza sebep olabilir. Eger Crazy Addon`da muzayedeyi zamanlarini gosteren ozelligi aktif ettiyseniz bu ozelligi kullanmadan once onu iptal edin, yoksa yavaslama olacaktir.",
		mh: "Gladyat\u00f6rler M\u00fczayedesinde Ara",
		oh: "Mersaneriler M\u00fczayedesinde Ara",
		Wd: "Yiyecek \u0130\u00e7in Teklif Verilsin mi?",
		mg: "Maksimum Teklif",
		Xd: "Durum daha azsa teklif ver",
		Yd: "Teklif Edilen Nesneler",
		wk: "M\u00fczayede Dili",
		xk: "L\u00fctfen dil ayarlarini oyunun diline gore tekrar ayarlay\u0131n.. Hepsi do\u011fru oldu\u011fundan emin olun, aksi takdirde teklif vermeyebilir.",
		Id: "Piyasada aranacak nesneleri ekleyebilirsiniz. Bir nesneyi listede ekledi\u011finizde, nesneyi arayacak ve sonu\u00e7lar\u0131 sol tarafta g\u00f6sterecektir. Otomatik m\u00fczayedeyi aramak i\u00e7in de arayacakt\u0131r. Otomatik teklifi etkinle\u015ftirirseniz, belirledi\u011finiz aral\u0131klarla nesneyi arayacak ve yeterli paran\u0131z varsa otomatik olarak teklif verecektir. *Not*: Tekil nesneleri d\u00fckkanlarda aramak i\u00e7in, en az\u0131ndan bir rastgele \u00f6\u011feyi arama listesine eklemeniz gerekmektedir.",
		uk: "M\u00fczayedeyi dikkatli kullan\u0131n!",
		vk: "Otomatik teklif, sunucuya \u00e7ok fazla istek g\u00f6nderir ve s\u00fcrekli kullan\u0131rsan\u0131z yasa\u011fa neden olabilir!",
		dh: "Etkinlik Puanlar\u0131n\u0131 Yakut ile Yenile?",
		se: "Otomatik Ya\u011f Topla",
		zk: "Kutsal Ya\u011flar\u0131 Otomatik Al",
		Ok: "G\u00f6rev Kontrol H\u0131z\u0131",
		Sa: "Ittifak \u00dcyelerine Sald\u0131r\u0131ls\u0131n m\u0131?",
		Qa: "Oto Sald\u0131r\u0131 listesine cal\u0131nan Alt\u0131n X ALTINI a\u015ft\u0131\u011f\u0131nda > eklensin mi? ",
		Ra: "Yenildi\u011finizde otomatik olarak eklensin mi?:",
		Qb: "Skor Tablosu Sald\u0131r\u0131lar\u0131",
		Yb: "\u00c7ok Uzun",
		Ab: "Uzun",
		Ib: "Orta",
		Vb: "K\u0131sa",
		Zb: "\u00c7ok K\u0131sa",
		te: "HP > ise Yeralt\u0131 D\u00fcnyas\u0131'na Gir",
		Yg: "G\u00f6rev Kontrol H\u0131z\u0131",
		Qg: 'Varsay\u0131lan olarak "3x" ayarl\u0131d\u0131r. Bot g\u00f6revlerle sorun \u00e7\u0131kar\u0131yorsa, g\u00f6rev h\u0131z\u0131n\u0131 sunucu h\u0131z\u0131n\u0131za g\u00f6re ayarlay\u0131n.',
		$e: "\u0130yile\u015ftirme \u00c7anta Se\u00e7imi",
		ue: 'Puanlar\u0131 manuel olarak yeniliyorsan\u0131z, s\u0131k\u0131\u015f\u0131rsa "Yeniden Etkinlik Seferi Yenile" d\u00fc\u011fmesine t\u0131klaman\u0131z gerekmektedir!',
		Dk: "Etkinlik Seferi'ni ba\u015flatmak i\u00e7in en az birini etkinle\u015ftirmeniz gerekmektedir: sefer, zindan, arena veya sirk.",
		$g: "E\u011fer s\u0131k\u0131\u015f\u0131rsa Etkinlik Seferi'ni Yenile!",
		kb: "\u0130ttifak \u00fcyesi teklif verdiyse atlas\u0131n m\u0131?",
		Vk: "E\u011fer paketlerde bulunan \u00f6\u011feleri kullanarak eritmek istiyorsan\u0131z, t\u00fcm ayarlar\u0131 devre d\u0131\u015f\u0131 b\u0131rak\u0131n. Ancak hala renkleri se\u00e7ebilirsiniz.",
		Ak: "Karakter(Kapal\u0131) / S\u00f6zle\u015fmeli(A\u00e7\u0131k)",
		Rk: "Ana/Sirk her iki karakteri de tamir etsin mi?",
		Wk: "Zamanlar",
		Timers: "Her zamanlay\u0131c\u0131 i\u00e7in a\u015fa\u011f\u0131daki dakika cinsinden say\u0131lar\u0131 girin veya varsay\u0131lan b\u0131rak\u0131n. Dikkat edin! eger cok kisa sureler girerseniz baz\u0131 ozellikler botu donguye sokayabilir.",
		nb: "Skor Tablosu Sald\u0131r\u0131s\u0131n\u0131 Etkinle\u015ftir:",
		Ob: "Sald\u0131r\u0131 Aral\u0131\u011f\u0131n\u0131 Se\u00e7",
		Pb: "Bot, skor tablosu listesinden rastgele sald\u0131r\u0131 yapacakt\u0131r.",
		pb: "Lig Sald\u0131r\u0131s\u0131",
		mb: "Lig Sald\u0131r\u0131s\u0131n\u0131 Etkinle\u015ftir:",
		Kb: "Rastgele Sald\u0131r",
		Lb: "En d\u00fc\u015f\u00fckten en y\u00fckse\u011fe sald\u0131r",
		tk: "Bot, varsay\u0131lan olarak ittifak \u00fcyelerine sald\u0131rmaktan ka\u00e7\u0131nacakt\u0131r.",
		Pe: "Sefer Yeri:",
		Pd: "Bonuslar\u0131 Otomatik Al:",
		Bh: "Boss`a sald\u0131rma",
		ne: "Zindan Yeri:",
		jh: "Kaybederseniz S\u0131f\u0131rlans\u0131n m\u0131?",
		cf: "Cehennem Ayarlar\u0131",
		df: "Bu mod birden sona kadar saldirarak cehennemi bitirir. \u0130yile\u015ftirme y\u00fczde ayarlar\u0131n\u0131z\u0131 iyile\u015ftirme sekmesinden yap\u0131land\u0131r\u0131n ve iyile\u015ftirme sekmesini etkinle\u015ftirdi\u011finizden emin olun. Cehennem modu aktif oldugunda bot cehennem iyilestirme oranina gore karakterinize yemek yedirecektir. Cehenneme giri\u015f sizi oturumdan \u00e7\u0131kar\u0131yorsa, extralar tabini ziyaret edin ve otomatik giri\u015f kutusunu i\u015faretleyin.",
		af: "Cehennem Zorlu\u011fu",
		Sd: "Otomatik Cehennem Giri\u015fi / Cehennem Modu:",
		Ai: "Puan = 0 ise Mobilizasyon Kullan?",
		Ei: "Yakut Kullan?",
		ve: "Puan Yoksa Cehennemden \u00c7\u0131k\u0131ls\u0131n m\u0131?",
		mi: "Bot, \u00f6nce villa mediciyi kullanmaya \u00e7al\u0131\u015facakt\u0131r, e\u011fer yoksa iyile\u015ftirme iksiri kullanacakt\u0131r. \u0130yile\u015ftirme anahtar\u0131n\u0131 etkinle\u015ftirdi\u011finizden emin olmay\u0131 unutmay\u0131n.",
		vi: "Otomatik cehennem giri\u015fi, cehenneme girdi\u011finizde zindan/arena/sirk otomatik olarak devre d\u0131\u015f\u0131 b\u0131rakacakt\u0131r.",
		Xk: "Cehennem \u0130yile\u015ftirme Ayarlar\u0131",
		Di: "Villa Medici Kullan?",
		Bi: "\u0130yile\u015ftirme \u0130ksiri Kullan?",
		$f: "Bu ozellik genel marketten esya almaya yarar. Satin alma suresi biraz surebilir.",
		re: "Pazar Aramas\u0131n\u0131 Etkinle\u015ftir:",
		ag: "Dakika cinsinden Pazar Arama Aral\u0131\u011f\u0131:",
		bg: "\u00d6nerilen 10 dakika.",
		nf: "Nesne Ayarlar\u0131:",
		lf: "Nesne Ad\u0131 \u0130\u00e7erir",
		G: "Maksimum Fiyat",
		pf: "Nesne T\u00fcr\u00fc",
		mf: "Nesne Nadirli\u011fi",
		ae: "Ruh Ba\u011fl\u0131 Al\u0131ns\u0131n m\u0131?",
		rf: "Al\u0131nacak Nesneler",
		qf: "Herhangi biri maksimum fiyat\u0131 a\u015f\u0131yorsa \u00f6\u011feleri almay\u0131 deneyin.:",
		Zd: "Sat\u0131n Al\u0131nan Nesneler:",
		dj: "\u0130yile\u015ftirme Y\u00fczdesi",
		pk: "D\u00fckkandan Yiyecek Sat\u0131n Al\u0131ns\u0131n m\u0131?",
		qk: "Paketten \u0130yile\u015ftirme Kullan\u0131ls\u0131n m\u0131?",
		lk: "Cervisia Kullan\u0131ls\u0131n m\u0131?",
		nk: "Yumurta Kullan\u0131ls\u0131n m\u0131?",
		tl: "Son Kullan\u0131ld\u0131",
		location: "Konum",
		Strength: "G\u00fc\u00e7",
		Dexterity: "Beceri",
		Agility: "\u00c7eviklik",
		Constitution: "Dayaniklilik",
		Charisma: "Karizma",
		Intelligence: "Zeka",
		ii: "E\u011fitim Ayarlar\u0131",
		ji: "E\u011fitim yapmak istedi\u011finiz nitelikleri se\u00e7in. Yeterli alt\u0131n\u0131z oldu\u011funda e\u011fitim yapacakt\u0131r.",
		cd: "Sonraki ad\u0131m",
		qj: "Hay\u0131r",
		rj: "Normal",
		xl: "Rakip",
		yl: "Rakip Seviyesi",
		Dj: "G\u00f6revler",
		random: "Rastgele",
		Hl: "Ayarlar",
		Tl: "Yak\u0131nda...",
		type: "G\u00f6rev t\u00fcrlerini etkinle\u015ftirmek i\u00e7in simgeleri t\u0131klay\u0131n.",
		$l: "Evet",
		A: "Arama",
		Bd: "\u00d6\u011feleri ekle",
		ik: "Demircilik Kaynaklar\u0131n\u0131 Otomatik Olarak Sakla",
		Vl: "G\u00f6nder",
		rl: "Aral\u0131k : ",
		gl: "Otomatik Teklif Etkinle\u015ftir",
		hl: "Bir ittifak \u00fcyesi zaten teklif verdiyse teklif vermeyin",
		Xl: "\u00d6\u011fretici",
		dc: "Arena'da en d\u00fc\u015f\u00fck veya en y\u00fcksek seviyeli rakiple y\u00fczle\u015fmek isteyip istemedi\u011finizi yukar\u0131daki d\u00fc\u011fmelerden se\u00e7in. Daha fazla kullan\u0131c\u0131, botun h\u0131z\u0131n\u0131 yava\u015flatabilir.",
		$k: "Ba\u015flamak i\u00e7in bir \u00f6\u011feyi listeyle ekleyin (\u00f6r. `Lucius`). Ekledikten sonra, arama sonu\u00e7lar\u0131n\u0131 sol tarafta g\u00f6r\u00fcnt\u00fclemek i\u00e7in arama sonu\u00e7lar\u0131n\u0131 g\u00f6sterir. Ayn\u0131 zamanda otomatik m\u00fczayede ama\u00e7lar\u0131 i\u00e7in de arar. Otomatik teklifi etkinle\u015ftirirseniz, belirli aral\u0131klarla \u00f6\u011feyi arar ve yeterli paran\u0131z varsa otomatik olarak teklif verecektir. *Not*: D\u00fckkanlarda benzersiz \u00f6\u011feleri aramak i\u00e7in, en az bir rastgele \u00f6\u011feyi arama listesine eklemeniz gerekmektedir.",
		jl: "Yarat\u0131k numaras\u0131n\u0131 yukar\u0131daki d\u00fc\u011fmelerden se\u00e7ebilirsiniz. Numara 1, en soldaki yarat\u0131\u011f\u0131 temsil eder. Do\u011fru konumu se\u00e7ti\u011finizden emin olun; aksi takdirde bot durabilir.",
		Ui: "Zindan\u0131n zorlu\u011funu yukar\u0131dakilerden se\u00e7in. Do\u011fru konumu se\u00e7ti\u011finizden emin olun; aksi takdirde bot durabilir.",
		ej: "\u0130yile\u015ftirme Ayarlar\u0131",
		Vi: "Ittifak Piyasas\u0131ndan al\u0131\u015fveri\u015f yaparak fazla alt\u0131n\u0131 depola -> Min. Alt\u0131n. 1. Envanterde bos yer birakmaya calisin.",
		ul: "T\u00fcm\u00fcn\u00fc Ta\u015f\u0131",
		vl: "Se\u00e7ilenleri Ta\u015f\u0131",
		cl: "Otomatik \u0130yile\u015ftirme",
		dl: "Otomatik \u0130yile\u015ftirme Y\u00fczdesi",
		Zl: "Yakut",
		Hg: "Genel Ayarlar",
		Hj: "Hepsini Sat",
		Ij: "Se\u00e7ilenleri Sat",
		fa: "Silahlar",
		ca: "Kalkanlar",
		U: "G\u00f6\u011f\u00fcs Z\u0131rhlar\u0131",
		X: "Kasklar",
		W: "Eldivenler",
		da: "Ayakkab\u0131lar",
		aa: "Y\u00fcz\u00fckler",
		T: "Kolyeler",
		yi: "Kullan\u0131labilir",
		xi: "G\u00fc\u00e7lendirmeler",
		Zg: "Re\u00e7eteler",
		og: "S\u00f6zle\u015fmeli Scrollar",
		ah: "Takviyeler",
		Vg: "G\u00f6rev Filtre \u0130gnore",
		Ug: "Almak istemedi\u011finiz g\u00f6revleri filtrelemek i\u00e7in anahtar kelimeleri girin",
		V: "Anahtar Kelime Girin",
		I: "Ekle",
		bh: "Kald\u0131r",
		de: "Temizle",
		Sg: "G\u00f6rev Filtre Kabul",
		Tg: "Almak istedi\u011finiz g\u00f6revleri se\u00e7mek i\u00e7in anahtar kelimeleri girin. Odule gore secmek isterseniz odulun icinde gecen bir kelimeyi girin.",
		Ca: "Zamanl\u0131 G\u00f6revleri Atla?",
		Pk: "G\u00f6revler",
		Qd: "Oto Kost\u00fcm",
		zi: "Kost\u00fcm Kullan?",
		Vd: "Ana Sava\u015f",
		me: "Dungeon Sava\u015f ve Etkinlik",
		Rd: "Bot yaln\u0131zca ke\u015fif/zindan puanlar\u0131n\u0131z 0 ise Dis Pater Normal ve Medium giyecektir.",
		bf: "Cehennem \u0130yile\u015ftirme Ayarlar\u0131",
		Hd: "Boss Mevcut Oldu\u011funda Sald\u0131r?",
		qb: "5 ba\u015far\u0131s\u0131z sald\u0131r\u0131dan sonra Lig sald\u0131r\u0131s\u0131n\u0131 devre d\u0131\u015f\u0131 b\u0131rakacakt\u0131r.",
		ef: "Kutsal Ya\u011flar",
		wg: "\u00dcr\u00fcn Ad\u0131",
		Z: "Min. Item Seviyesi",
		Aa: "Min. \u00dcr\u00fcn Kalitesi",
		Gd: "Zamanlay\u0131c\u0131y\u0131 Uygula/S\u0131f\u0131rla",
		hf: "\u00d6nek/Soneki Yok Say",
		Gi: "Evet",
		Dg: "Hay\u0131r",
		Xa: "Ge\u00e7mi\u015fi Temizle",
		Dh: "Yok Sayma Listesi",
		Jb: "\u00d6nek",
		Wb: "Sonek",
		ih: "S\u00fcresi Dolan \u00dcr\u00fcnleri S\u0131f\u0131rla",
		Eh: "Kondisyonlar disinda rastgele erit",
		Fh: "Eritme Sekmesi",
		ob: "Ekstralar",
		Ld: "M\u00fczayede",
		eg: "Pazar",
		Xb: "Zamanlar",
		di: "Eritme",
		ci: "Alt\u0131n Yoksa Eritme",
		$h: "\u00dcr\u00fcn Yoksa Eritme",
		Da: "Tamir",
		Sh: "Ittifak Pazar\u0131 Alt\u0131n Tutma",
		Oh: "M\u00fczayede Alt\u0131n Tutma",
		gi: "E\u011fitim",
		Vh: "S\u00fcresi Dolanlar\u0131 S\u0131f\u0131rla",
		ei: "Hammadde Depola",
		Mh: "M\u00fczayede Kontrol",
		Xh: "Arama",
		v: "Etkinle\u015ftir",
		yg: "Min. Alt\u0131n",
		Rb: "Saat Se\u00e7in",
		lb: "Ittifaga Alt\u0131n Ba\u011f\u0131\u015fla",
		he: "Her 5 dakikada bir ba\u011f\u0131\u015f yapacakt\u0131r. Zamanlay\u0131c\u0131lar sekmesinden aral\u0131\u011f\u0131 de\u011fi\u015ftirebilirsiniz",
		ff: "Ne kadar ba\u011f\u0131\u015f yap\u0131lmal\u0131?",
		ie: "Ne zaman ba\u011f\u0131\u015f yap\u0131lmal\u0131 >",
		tf: "Daha az <",
		fh: "S\u00fcresi Dolanlar\u0131 S\u0131f\u0131rla ve Di\u011fer Ayarlar\u0131",
		hh: "S\u0131f\u0131rla in:",
		Jk: "Birden fazla \u00f6\u011feyi se\u00e7mek i\u00e7in Ctrl (Mac'de Cmd) tu\u015funu bas\u0131l\u0131 tutun",
		jf: "Ayarlar\u0131 Kaydet / Yukle",
		Re: "Ayarlar\u0131 Indir",
		kf: "Ayarlar\u0131 Yukle",
		pg: "T\u00fcm Oyunculara Mesaj G\u00f6nder",
		qg: "[Ultra Premium Anahtar\u0131 gerektirir, anahtar i\u00e7in Discord \u00fczerinden ileti\u015fime ge\u00e7in.]",
		rg: "G\u00f6nderilecek mesaj\u0131 girin",
		fe: "\u00d6zel scriptler i\u00e7in Discord \u00fczerinden bize ula\u015f\u0131n",
		tg: "G\u00f6nder",
		ug: "Oyuncular\u0131 G\u00f6ster",
		sg: "T\u00fcm\u00fcn\u00fc Se\u00e7",
		vg: "T\u00fcm Se\u00e7imleri Kald\u0131r",
		sf: "Envanterinizin yeterli alan\u0131 oldu\u011fundan emin olun. Geri say\u0131m 2 dakikad\u0131r.",
		ig: "Yiyecek Sat",
		Eb: "Yiyeceklere Ge\u00e7"
	},
	Ph = {
		Yj: "Derreter cores mais altas primeiro?",
		$b: "Atacar apenas a lista de jogadores?",
		ac: "Quando esta op\u00e7\u00e3o \u00e9 ativada, o bot s\u00f3 atacar\u00e1 jogadores na lista de jogadores. Se esta op\u00e7\u00e3o n\u00e3o estiver ativada, o bot atacar\u00e1 jogadores aleat\u00f3rios.",
		Fk: "Suas configura\u00e7\u00f5es de expedi\u00e7\u00e3o est\u00e3o incorretas ou h\u00e1 dados de p\u00e1gina inesperados!",
		Gk: "Sua configura\u00e7\u00e3o de expedi\u00e7\u00e3o est\u00e1 incorreta! Voc\u00ea definiu um monstro desabilitado, o que est\u00e1 errado.",
		Tk: "Redefinir apenas todos os itens do submundo com a cor selecionada?",
		Ba: "Prioridade",
		Sb: "Definir Prioridade",
		Ng: "Pontos",
		Gh: "Stat",
		Oi: "Coletar Ouro",
		Jj: "Vender itens do Submundo?",
		pj: "O bot procurar\u00e1 pelo ninho em cada a\u00e7\u00e3o, n\u00e3o apenas em expedi\u00e7\u00f5es.",
		nj: "Tipo de busca de ninho",
		lj: "N\u00e3o fazer nada",
		mj: "Busca r\u00e1pida",
		oj: "Busca detalhada",
		El: "A\u00e7\u00e3o p\u00f3s expedi\u00e7\u00e3o",
		sk: "Clique aqui se o reparo ficar travado",
		Hk: "Quando HP estiver baixo, use cura",
		Jg: "Reparo Parcial",
		Ye: "Reparo Completo",
		Ig: "Reparo Parcial ou Completo",
		pe: "Habilitar Limite",
		gj: "Limite",
		hj: "Se voc\u00ea deseja limitar o n\u00famero de vezes que quer atacar o inimigo, habilite esta op\u00e7\u00e3o e defina o limite. O bot continuar\u00e1 atacando o resto dos inimigos ap\u00f3s terminar de atacar o monstro selecionado.",
		ke: "N\u00e3o entre no submundo com a fantasia do submundo",
		je: "Se voc\u00ea n\u00e3o quiser entrar no submundo enquanto estiver usando a fantasia do submundo, ative esta op\u00e7\u00e3o",
		ui: "Submundo",
		li: "Melhorias do Submundo",
		ni: "Usar os poderes dos deuses ap\u00f3s entrar no submundo?",
		oi: "Selecione os deuses para usar seus poderes:",
		pi: "Usar Buff de Arma na arma?",
		ri: "Usar Buff de Armadura no seguinte equipamento:",
		Ck: "O tempo de espera \u00e9 de 30 minutos. Se voc\u00ea n\u00e3o estiver com um traje, o bot redefinir\u00e1 o tempo de espera para 0.",
		Uk: "Selecionar Cores",
		Ya: "Forja de Vulcano",
		bb: "Escudo Terrestre de Feronia",
		cb: "Poder Fluido de Netuno",
		eb: "Liberdade A\u00e9rea de Aelous",
		fb: "N\u00e9voa Mortal de Plut\u00e3o",
		gb: "Sopro de Vida de Juno",
		hb: "Armadura de Escamas das Montanhas da Ira",
		ib: "Olhos de \u00c1guia",
		jb: "Vestimenta de Inverno de Saturno",
		Za: "Armadura de Touro de Bubona",
		$a: "Trajes de Ladr\u00e3o de Merc\u00fario",
		ab: "T\u00fanica de Luz de R\u00e1",
		hg: "Pacotes",
		cg: "Invent\u00e1rio",
		K: "Pre\u00e7o M\u00edn.",
		J: "Quantos",
		Db: "Vender Itens",
		Cb: "Procurar em",
		dg: "Cor do Material",
		Bb: "Cor do Item",
		kg: "Armaz\u00e9m",
		za: "Mudar para Materiais",
		Fb: "Mudar para Itens",
		jg: "Vender Materiais",
		wa: "Por favor, insira um nome de item v\u00e1lido, faixa de pre\u00e7o e quantidade.",
		xa: "Nenhum item adequado encontrado nos locais de busca selecionados.",
		ya: "Todos os itens foram listados com sucesso!",
		Nk: "Todos os materiais foram listados com sucesso!",
		fg: "Se voc\u00ea quiser vender itens por um pre\u00e7o fixo, voc\u00ea pode inserir o mesmo valor para o pre\u00e7o m\u00ednimo e m\u00e1ximo.",
		gg: "Este recurso ainda \u00e9 experimental, use com cautela. Se voc\u00ea n\u00e3o colocar um pre\u00e7o fixo, os itens ser\u00e3o listados aleatoriamente entre o pre\u00e7o m\u00ednimo e m\u00e1ximo que voc\u00ea inserir.",
		yk: "Define o m\u00e1ximo de ouro que o bot gastar\u00e1 por ciclo.",
		Ta: "O bot come\u00e7ar\u00e1 a fazer lances em itens de comida, se habilitado. Voc\u00ea n\u00e3o precisa habilitar os interruptores de gladiador/mercen\u00e1rio.",
		Jd: "O bot n\u00e3o far\u00e1 lances sobre os lances dos aliados.",
		Kd: "Ignorar combina\u00e7\u00e3o de Prefixo/Sufixo ao procurar por um item no leil\u00e3o.",
		Qj: "Selecione os tipos de item que voc\u00ea deseja fundir.",
		Rj: "Selecione as cores que voc\u00ea deseja fundir.",
		Sj: "Selecione o n\u00edvel dos itens que voc\u00ea deseja fundir.",
		Tj: "Selecione o martelo que voc\u00ea deseja usar.",
		Uj: "Note que o c\u00edrculo Verde e Vermelho ao lado da primeira caixa s\u00e3o para ativar/desativar a regra.",
		Vj: "Se voc\u00ea quiser fundir aleatoriamente quaisquer cores ou tipos, voc\u00ea pode ativar `Fundir aleatoriamente se nenhuma condi\u00e7\u00e3o for atendida? (\u00daltima op\u00e7\u00e3o habilitada no v\u00eddeo tutorial)",
		Fj: "Reparar antes de fundir?",
		Le: "Selecionar Monstro",
		ze: "Usar Ampulheta/Rubi?",
		Ek: "Usar Rubi?",
		Ce: "Usar Mobiliza\u00e7\u00e3o?",
		Be: "Usar Po\u00e7\u00e3o de Vida?",
		ye: "Percentual de Cura (%)",
		Je: "N\u00famero de Ataques",
		Ae: "Intervalo de Ataque (em segundos)",
		we: "Ataques Realizados",
		xe: "Ampulhetas Restantes",
		He: "Nota: Usa po\u00e7\u00f5es de vida para curar, n\u00e3o comida.",
		Ie: "Nota: Se os ataques pararem prematuramente, tente 'Resetar Ataques'.",
		Me: "Iniciar",
		Ke: "Resetar",
		Ne: "Parar",
		Oe: "Configura\u00e7\u00f5es de Expedi\u00e7\u00e3o (Clique para minimizar)",
		De: "Monstro 1",
		Ee: "Monstro 2",
		Fe: "Monstro 3",
		Ge: "Monstro 4",
		Qk: "Reparar antes de fundir?",
		Mi: "Esta op\u00e7\u00e3o usar\u00e1 cervisia quando seu premium expirar.",
		sj: "Esta op\u00e7\u00e3o ativa e seleciona \u00f3leos das recompensas divinas. Pode usar \u00f3leos n\u00famero 1 e 3 no personagem, mas o n\u00famero 2 s\u00f3 ser\u00e1 pego para pacotes.",
		Ki: "Esta op\u00e7\u00e3o usar\u00e1 buffs no hor\u00e1rio que voc\u00ea definir. Encontrar\u00e1 buffs nos pacotes e os aplicar\u00e1 ao personagem.",
		ij: "Esta op\u00e7\u00e3o te levar\u00e1 ao submundo. N\u00e3o esque\u00e7a de habilitar o Login Autom\u00e1tico na aba Extras, caso contr\u00e1rio, voc\u00ea pode ser desconectado ao entrar no submundo [Bug do Jogo]",
		bc: "Esta opci\u00f3n solo atacar\u00e1 la lista de arena/circo. Si no puede, el bot la omitir\u00e1.",
		Cj: "Esta op\u00e7\u00e3o \u00e9 apenas para licen\u00e7as premium. Simula o ataque antes de atacar um usu\u00e1rio para uma taxa de vit\u00f3ria de 75%.",
		Md: "Voc\u00ea n\u00e3o precisa habilitar a togglede leil\u00e3o principal para habilitar esta op\u00e7\u00e3o.",
		kk: "Esta op\u00e7\u00e3o atualizar\u00e1 a p\u00e1gina a cada segundo quando o leil\u00e3o estiver no estado -Muito Curto- para dar lances constantemente e vencer o leil\u00e3o.",
		Oj: "Se nenhuma das condi\u00e7\u00f5es de fus\u00e3o for atendida, ele fundir\u00e1 aleatoriamente. Certifique-se de selecionar o tipo e a cor do item.",
		Pj: "Esta op\u00e7\u00e3o fundir\u00e1 apenas itens do invent\u00e1rio. Ignorar\u00e1 itens nos pacotes.",
		Ua: "Itens de Leil\u00e3o",
		ng: "Itens de Mercen\u00e1rio",
		Ub: "Itens da Loja",
		wi: "Itens \u00danicos",
		Kj: "Definir fundo para preto [Aumenta o desempenho]",
		Lj: "Mover bot\u00f5es do Gladbot para o canto inferior esquerdo?",
		Ni: "Atacar o Circo Sem Curar",
		jk: "Pegar ouro dos pacotes se necess\u00e1rio?",
		Wl: "Ouro foi pego dos pacotes para treinamento",
		Dd: "Nenhum ouro foi encontrado nos pacotes para treinamento",
		gk: "Itens Reparados",
		$j: "Ataques na Arena",
		bk: "Ataques no Circo",
		Cd: "Itens Reiniciados",
		ek: "Ataques em Expedi\u00e7\u00f5es",
		dk: "Ataques em Masmorras",
		hk: "Ataques no Submundo",
		ak: "Dinheiro Ganhado na Arena",
		ck: "Dinheiro Ganhado no Circo",
		Ul: "Itens Fundidos",
		fk: "Ouro Reciclado",
		$i: "Batalha de Guilda",
		bj: "Configura\u00e7\u00f5es da Guilda",
		ll: "Atacar\u00e1 guildas aleatoriamente.",
		aj: "Nome da Guilda",
		Li: "Redefinir Estat\u00edsticas",
		Zi: "Atacar Guildas Aleatoriamente",
		wl: 'GladBot: Use os dados para atualizar a caixa misteriosa e encontrar itens valiosos antes de abri-los (Etc. Trajes). Clique em "Iniciar" para abrir ba\u00fas.',
		Nc: "Madeira",
		Dc: "Cobre",
		Hc: "Ferro",
		Jc: "Couro",
		Oc: "Fio de L\u00e3",
		Ec: "Bolas de Algod\u00e3o",
		Gc: "Hemp",
		Fc: "Tiras de Gaze",
		Kc: "Fios de Linho",
		Ic: "Remendo",
		Mc: "Veludo",
		Lc: "Fio de Seda",
		Wc: "Pelo",
		Qc: "Lasca de Osso",
		Zc: "Escama",
		Tc: "Garra",
		Vc: "Presas",
		Uc: "Escama de Drag\u00e3o",
		Rc: "Corno de Touro",
		Yc: "Gl\u00e2ndula Venenosa",
		Sc: "Casaco de Pele de Cerberus",
		Xc: "Escama de Hydra",
		$c: "Pena de Esfinge",
		ad: "Pele de Typhon",
		zc: "Lapis Lazuli",
		tc: "Ametista",
		sc: "Ambar",
		uc: "Agua-Marinha",
		Ac: "Safira",
		xc: "Granada",
		wc: "Esmeralda",
		vc: "Diamante",
		yc: "Jasper",
		Bc: "Sugilite",
		nc: "Veneno de Escorpi\u00e3o",
		qc: "Tintura de Resist\u00eancia",
		jc: "Antidoto",
		ic: "Adrenalina",
		pc: "Tintura Esclarecedora",
		mc: "Po\u00e7\u00e3o de Perce\u00e7\u00e3o",
		kc: "Ess\u00eancia de Rea\u00e7\u00e3o",
		lc: "Frasco de Carisma",
		rc: "\u00c0guas de Oblivion",
		oc: "Ess\u00eancia de Alma",
		Ad: "Selo Aqu\u00e1tico",
		ud: "Runa Protetora",
		sd: "Marca da Terra",
		zd: "Totem de Cura",
		yd: "Talism\u00e3 do Poder",
		wd: "Pedra da Fortuna",
		td: "Pedernal",
		xd: "Runa da Tempestade",
		vd: "Runa das Sombras",
		fd: "Cristal",
		ed: "Bronze",
		kd: "Obsidiana",
		nd: "Prata",
		od: "Enxofre",
		hd: "Mina de Ouro",
		md: "Quartzo",
		ld: "Platina",
		dd: "Almandin",
		gd: "Cuprit",
		jd: "Pedra do Inferno",
		Hi: "Atacar Aleatoriamente em Provinciarum?",
		Ii: 'Tamb\u00e9m desative a configura\u00e7\u00e3o "Classificar jogadores na arena por n\u00edvel" no crazy-addon.',
		Wg: "Aceitar apenas miss\u00f5es com base no tipo de deus.",
		Va: "Auto Buff",
		$d: "Usar apenas no inferno?",
		Cg: "Nova Regra",
		Ag: "Nome Cont\u00e9m",
		isUnderworldItem: "\u00c9 Item do Submundo",
		gf: "Ignorar Materiais",
		rk: "Usar Ora\u00e7\u00e3o?",
		Ci: "Usar Sacrif\u00edcio?",
		mk: "Usar Roupas para Entrar no Submundo?",
		ti: "Miss\u00f5es do Submundo",
		si: "Se habilitado, voc\u00ea precisa digitar nomes de itens do submundo. Se o bot encontrar esses itens no submundo, ele aceitar\u00e1 a miss\u00e3o.",
		Yk: "Item da Miss\u00e3o do Submundo",
		il: "Digite o nome do material",
		Bk: "O bot adora dados! Eles ajudam a encontrar roupas nos ba\u00fas. Mas se n\u00e3o houver dados, o bot abre os ba\u00fas mesmo assim, na esperan\u00e7a de encontrar roupas legais (mas pode n\u00e3o encontrar nenhuma!)",
		Nj: "Caixa de saque",
		oe: "Ativar Arena?",
		Og: "Priorizar lista de arena?",
		Pg: "Priorizar lista de circo?",
		ge: "Desativar Menu de Log",
		kh: "Recompensa Min. Valor em Ouro",
		Xg: "Miss\u00e3o Focada, se ativada, seguir\u00e1 o caminho mais curto para terminar a masmorra.",
		Jh: "Jogar Dados Automaticamente?",
		Kh: "Use jogar dados com cautela, ele continuar\u00e1 usando o primeiro dado at\u00e9 voc\u00ea desativar a op\u00e7\u00e3o.",
		ph: "Progresso da Pesquisa",
		eh: "O tempo de espera para reparo por padr\u00e3o \u00e9 de 10 minutos.",
		xg: "Condi\u00e7\u00e3o M\u00ednima",
		ee: "Item atual na bancada [Limpar se o bot pausar inesperadamente]",
		Df: "Recursos da Forja armazenados com sucesso no horreum.",
		zf: "Verificando itens no mercado...",
		yb: "Item movido para a bancada.",
		Qf: "Item reparado e equipado com sucesso.",
		Rf: "Item reparado com sucesso.",
		Lk: "Reparo falhou. A p\u00e1gina ser\u00e1 atualizada.",
		Nf: "Pegando materiais...",
		Zf: "Aguardando reparo...",
		Pf: "Reparo iniciado para .",
		va: "Reparo: Movendo o item do invent\u00e1rio para a bolsa",
		Of: "Reparo: Movendo o item da bancada para o pacote.",
		ta: "N\u00e3o foi poss\u00edvel encontrar materiais suficientes. Desativando o slot de reparo ",
		Kf: "Procurando itens para comprar para esconder ouro no Leil\u00e3o...",
		wf: "Verificando itens expirados nos pacotes...",
		xf: "Item redefinido com sucesso.",
		yf: "Sem Espa\u00e7o Vazio ou Ouro para Redefinir.",
		Ef: "Certifique-se de que voc\u00ea tem direitos de venda no mercado da guilda!",
		sb: "Ouro insuficiente e/ou nenhum item para comprar. Aguardando 30s para atualizar.",
		ub: "Loja foi atualizada.",
		vb: "Erro durante a cura.",
		Hf: "Sem Rubi ou Pano, desativando as op\u00e7\u00f5es.",
		Kk: "Nenhum item de cura encontrado nos pacotes.",
		wb: "Nenhum item adequado encontrado",
		If: "Alimentos foram pegos. Finalizando o processo.",
		Jf: "Pelo menos um alimento foi pego. Finalizando processo.",
		xb: "Nenhum espa\u00e7o adequado encontrado na bolsa para pegar comida.",
		Ff: "Pegando comida dos pacotes.",
		Gf: "Nenhum espa\u00e7o adequado encontrado na bolsa para pegar comida.",
		tb: "Sem mais itens de cura. Aguardando 30 segundos.",
		rb: "HP Recuperado.",
		ua: "Nada para fazer ent\u00e3o vou rezar!",
		Vf: "Vou atualizar em 60 segundos para verificar minha sa\u00fade e villa medici.",
		Wf: "Aguardando Villa Medici, atualizando em 60 segundos.",
		Xf: "Saiu do submundo.",
		Yf: "Vou atualizar em 60 segundos para verificar minha sa\u00fade.",
		Lf: "Verificando \u00f3leos de deus...",
		Mf: "\u00d3leos de deus foram pegos.",
		ra: "Atacou com sucesso o jogador na ARENA: ",
		sa: "Atacou com sucesso o jogador no CIRCO: ",
		uf: "Verificando leil\u00e3o! Por favor, aguarde...",
		vf: "Dando lances em itens. Por favor, aguarde...",
		Sf: "Item Derretido Automaticamente: ",
		Tf: "Derretendo Item: ",
		zb: "Ouro insuficiente para derreter. Ouro Necess\u00e1rio: ",
		Uf: "DERRETER: Procurando itens para derreter...",
		Mk: "Procurando itens para derreter...",
		Af: "Verificando disponibilidade de traje...",
		Cf: "Doado : ",
		Bf: "Jogando dados...",
		Ue: "Underworld Farm [Manual, Beta]",
		Ve: "Esteja ciente: ative este recurso ap\u00f3s desbloquear a criatura que deseja atacar, ela n\u00e3o atacar\u00e1 automaticamente para desbloquear o monstro.",
		Te: "Farm Location",
		Se: "Farm Enemy",
		Td: "Login Autom\u00e1tico",
		Ud: "Voc\u00ea precisa permitir pop-ups da tela do lobby do GameForge. Veja a documenta\u00e7\u00e3o sobre como fazer isso.",
		Kg: "Pausar Bot",
		Lg: "Pausar Bot em (Minutos)",
		Qe: "Data de Expira\u00e7\u00e3o",
		Fg: "Comprar apenas comida?",
		Gg: "Se voc\u00ea habilitar isso, o bot ignorar\u00e1 suas sele\u00e7\u00f5es e comprar\u00e1 comida automaticamente sem inserir nada.",
		Hb: "M\u00e1ximo de ouro total para gastar",
		Gb: "M\u00e1ximo de ouro por comida para gastar",
		Eg: "O bot verificar\u00e1 \u00f3leos a cada 60 minutos",
		bi: "Define um temporizador para verificar os tempos de fus\u00e3o.",
		Zh: "Define um temporizador para verificar a fus\u00e3o quando n\u00e3o tiver ouro.",
		ai: "Define um temporizador para verificar a fus\u00e3o quando n\u00e3o tiver o item dispon\u00edvel.",
		Uh: "Define um temporizador para reparar e verificar seus itens.",
		Th: "Define um temporizador para verificar o ouro mantido no mercado da guilda.",
		Ph: "Define um temporizador para a op\u00e7\u00e3o de reten\u00e7\u00e3o de ouro em leil\u00e3o.",
		Lh: "Define um temporizador para verificar a lista de PvP na arena para atacar.",
		Qh: "Define um temporizador para verificar a lista de PvP no circo para atacar.",
		hi: "Define um temporizador para treinar suas estat\u00edsticas.",
		Wh: "Define um temporizador para redefinir itens expirados.",
		fi: "Define um temporizador para armazenar materiais de forja no horreum.",
		Nh: "Define um temporizador para verificar o leil\u00e3o de gladiadores e mercen\u00e1rios.",
		Yh: "Define um temporizador para buscar itens em leil\u00e3o e loja.",
		Rh: "Define o temporizador para enviar doa\u00e7\u00f5es \u00e0 guilda.",
		Ze: "Ouro Movido",
		le: "N\u00e3o venda itens da lista de fundi\u00e7\u00e3o e leil\u00e3oo",
		qh: "Automa\u00e7\u00e3o da Loja",
		th: "Configura\u00e7\u00f5es de Busca de Item",
		rh: "Use esta ferramenta para buscar itens. Basta adicionar os itens \u00e0 lista, especificar a quantidade de pano e iniciar a busca.",
		uh: "Panos a Usar:",
		vh: "Quantos panos usar?",
		ea: "Full Digite o Nome do Item",
		Tb: "Digite o N\u00edvel do Item",
		xh: "Qualidade do Item",
		wh: "Nome do Item Aqui",
		yh: "Iniciar Busca",
		zh: "Pular e Continuar",
		Ah: "Parar Busca",
		We: "Comprar o mais barato ou o mais caro?",
		zg: "Mais Caro",
		be: "Mais Barato",
		ba: "Selecionar uma op\u00e7\u00e3o",
		qe: "Destacar itens do submundo",
		Xe: "Foco na miss\u00e3o?",
		Yl: "Usar Ruby se n\u00e3o houver pano?",
		Wa: "Evite atacar as mesmas pessoas para n\u00e3o ser reportado. Ser reportado aumenta as chances de ser banido.",
		Ml: "Queimar verde?",
		Rg: "N\u00e3o aceitar miss\u00f5es aleat\u00f3rias se algum filtro for inserido?",
		Pc: "Qualidade m\u00e1xima do material a ser usado",
		Wi: "Ativar a busca mercen\u00e1ria",
		sl: "Clique em `Vender Todos Selecionados` para vender todos os itens. Certifique-se de ter um espa\u00e7o vazio de 2x3 em sua primeira (1) bolsa. Para coletar ouro em massa, filtre ouro e use `Selecionar Todos ou Selecionar`",
		Zj: "\ud83d\udd25 : Adiciona item \u00e0 lista de fundi\u00e7\u00e3o.",
		Ji: "\ud83d\udd28 : Adiciona item \u00e0 lista de leil\u00e3o.",
		Ej: "Atualize a loja com pano quando estiver cheia",
		Al: "P\u00e1gina:",
		Aj: "Parar",
		yj: "Vender Esta P\u00e1gina",
		vj: "Selecionar Selecionados",
		uj: "Selecionar Tudo",
		Bj: "Configura\u00e7\u00f5es de Empacotamento Autom\u00e1tico",
		zj: "Enviar Recursos",
		wj: "Vender Todos Selecionados",
		ma: "Tipo de Item",
		oa: "Armas",
		S: "Escudos",
		M: "Armaduras",
		P: "Capacetes",
		O: "Luvas",
		N: "Botas",
		na: "An\u00e9is",
		ka: "Amuletos",
		Ia: "Utiliz\u00e1veis (Alimentos)",
		Na: "Melhorias",
		tj: "Potencializadores",
		Ka: "Receitas",
		Ja: "Mercen\u00e1rios",
		Ma: "Ferramentas de Forja",
		La: "Pergaminhos",
		rd: "Refor\u00e7os",
		pd: "Itens de Evento",
		qd: "Materiais de Forja",
		zl: "Ouro",
		Ha: "Todos",
		Bl: "Qualidade",
		pa: "Branco",
		C: "Verde",
		B: "Azul",
		D: "Roxo",
		H: "Laranja",
		R: "Vermelho",
		xj: "Op\u00e7\u00f5es de Venda",
		Mj: "Ignorar Combina\u00e7\u00e3o de Prefixo/Sufixo?",
		cj: "Quantos alimentos comprar/pegar?",
		Ri: "Normal",
		Qi: "Intermedi\u00e1rio",
		Pi: "Dif\u00edcil",
		Ea: "Padr\u00e3o",
		Fl: "Reparar Corre\u00e7\u00e3o de Travamento",
		Ik: "Desative a entrada no Inferno se voc\u00ea quiser desabilitar a Dungeon/Circo/Arena. Se voc\u00ea entrar no Inferno manualmente, ser\u00e1 necess\u00e1rio ativar o Modo Inferno.",
		ce: "Escolher traje do submundo",
		Fi: "Vestir traje do submundo quando dispon\u00edvel?",
		ki: "Define quantas vezes quer treinar as estat\u00edsticas e suas prioridades. O bot n\u00e3o treinar\u00e1 a menos que defina uma prioridade. Se n\u00e3o houver mais estat\u00edsticas ele continuar\u00e1 com as estat\u00edsticas Defenidas.",
		el: "Aventura",
		Kl: "Derreter",
		Rl: "Defini\u00e7\u00f5es de Derreter",
		Wj: "Itens Derretidos",
		Sl: "Adicione um Prefixo ou Sufixo, uma vez encontrado nos pacotes Ser\u00e1 Derretido automaticamente.:",
		Ql: "Derreter Item:",
		ec: "Clique no item que voc\u00ea deseja consertar. Isto utilizar\u00e1 apenas materiais Padr\u00e3o, Verde e Azul. Voc\u00ea precisa ter pelo menos 10.000 ouro para iniciar o reparo. Abra espa\u00e7o 3x3 em sua PRIMEIRA Bolsa do invent\u00e1rio. Caso contr\u00e1rio, ele poder\u00e1 ficar preso! O bot iniciar\u00e1 o reparo assim que o item tiver durabilidade de %0.",
		Zk: "Aplicar apenas no Mercenario.",
		bl: "O leil\u00e3o s\u00f3 dar\u00e1  o lance quando o mercado estiver no Fim..",
		al: "Certifique-se de que a SEGUNDA PAGINA DO INVENT\u00c1RIO est\u00e1 vazia e tem 10K de ouro. O bot encontrar\u00e1 e colocar\u00e1 o item na segunda pagina e na pr\u00f3xima vez, a p\u00e1gina, atualiza-se Derrentendo o item. A fundi\u00e7\u00e3o acontecer\u00e1 novamente a cada 5-10 minutos. ",
		fj: "Cura & Buffs",
		Gl: "Sem ouro suficiente para fundir. Ouro necess\u00e1rio!:",
		Jl: "Skipping bid: Membro da galian\u00e7a j\u00e1 deu lance no item ",
		Il: "Skipping bid: J\u00e1 licitei o item ",
		advanced: "Avan\u00e7ado",
		arena: "Arena",
		ia: "Ataque autom\u00e1tico",
		cc: "Evitar Atacar",
		ga: "Adicionar Jogador",
		ha: "Adicionar Nome do Jogador (Same Server)",
		nl: "Parar o Bot se ficar sem comida?",
		circusTurma: "Circus Turma",
		Si: "Dificuldade",
		dungeon: "Masmorra",
		Ti: "Configura\u00e7\u00e1o da Masmorra",
		eventExpedition: "Expedi\u00e7\u00e3o de evento",
		expedition: "Expedi\u00e7\u00f5es",
		Xi: "Configura\u00e7\u00e1o de Expedi\u00e7\u00f5es",
		Gj: "Selecionar Monstro",
		pl: "Maior",
		ol: "Coloque as curas na primeira p\u00e1gina do invent\u00e1rio",
		Cc: "No",
		Hh: "Guardar Ouro",
		Ih: "Guardar ouro no Leil\u00e3o?",
		Rb: "Selecionar Horas",
		nh: "Utilizar Roupas para Renovar Iventario?",
		Sk: "Selecione itens para serem redefinidos",
		gh: "Redefinir itens expirados\t",
		Nb: "Nota: Ao ativar esta op\u00e7\u00e3o, o bot vender\u00e1 os  itens expirados nos Pacotes para o Mercado da Guilda e cancelar\u00e1 para redefinir o tempo de expira\u00e7\u00e3o. Guilda \u00e9 necess\u00e1ria. Certifique-se que tem espa\u00e7o 3x3 vazio no iventario. Nota: Tamb\u00e9m ir\u00e1 coletar as Moedas de Ouro se elas estiverem prestes a expirar!!!",
		Mg: "Parar o Bot Aleatoriamente para trabalhar como [Fase de Teste]:",
		Y: "Ficar com o Ouro: Bot vai guardar esse ouro na bolsa:",
		lg: "maximo de Ouro: O bot gastar\u00e1 o ouro quando for Superior a",
		lh: "Ofertas ser\u00e3o aceitas por itens desnecess\u00e1rios",
		Ed: "Adicionar atraso aleat\u00f3rio",
		Fd: "Podes adicionar um atraso para o bot aqui.",
		Mb: "Reparar",
		Ll: "Derreter apenas Azul?",
		Ol: "Derreter apenas Roxo?",
		Nl: "Derreter apenas Laranja?",
		Xj: "Derreter tudo no ivent\u00e1rio?",
		Pl: "Isto ir\u00e1 ignorar a cor e os itens da lista. A pagina 1 est\u00e1 reservada a repara\u00e7\u00e3o..",
		Ch: "Derreter",
		Nd: "Pesquisa autom\u00e1tica",
		Bg: "Leil\u00e3o Autom\u00e1tico",
		Od: "O uso excessivo do Leil\u00e3o pode resultar em banimento. Esse recurso tamb\u00e9m pode desacelerar o bot, pois ele verifica os leil\u00f5es a cada atualiza\u00e7\u00e3o. As licita\u00e7\u00f5es s\u00e3o feitas a cada 5 minutos, a menos que o leil\u00e3o esteja no estado \u201cmuito curto\u201d. Observe que, se voc\u00ea colocar apenas um item na se\u00e7\u00e3o PREFIX, o bot tentar\u00e1 filtrar pelo nome dos itens para licitar mais rapidamente. Embora voc\u00ea precise desativar a licita\u00e7\u00e3o de alimentos para isso.",
		mh: "Pesquisar no leil\u00e3o dos gladiadores",
		oh: "Pesquisar no leil\u00e3o dos mercen\u00e1rios",
		Wd: "Licitar Comida?",
		mg: "Lance m\u00e1ximo",
		Xd: "Licitar se o Tempo for inferior a",
		Yd: "Itens licitados",
		wk: "Linguagem do Leil\u00e3o",
		xk: "De acordo com a atualiza\u00e7\u00e3o 2.5.6, defina o idioma novamente.",
		Id: "Poder\u00e1 adicionar itens para procurar no mercado e no leil\u00e3o. Tamb\u00e9m mostrar\u00e1 itens roxos no mercado assim que voc\u00ea adicionar um item \u00e0 lista.",
		uk: "Utilize o leil\u00e3o com cuidado!",
		vk: "O lance autom\u00e1tico faz muitas solicita\u00e7\u00f5es ao servidor, causando erro de p\u00e1gina em branco e pode causar banimento se for utilizado com frequ\u00eancia!!",
		dh: "Renovar pontos de evento com Rubis?",
		se: "Ativar \u00f3leo autom\u00e1tico",
		zk: "Obter os \u00f3leos sagrados automaticamente",
		Ok: "Velocidade de verifica\u00e7\u00e3o das miss\u00f5es",
		Sa: "Atacar membros da alian\u00e7a?",
		Qa: 'Adicionar Jogador automaticamente \u00e0 lista de "Ataque" quando X OURO for roubado:',
		Ra: 'Adicione Jogadores automaticamente \u00e0 lista "Evitar Ataque" quando perder:',
		Qb: "Placar De Ataques",
		Yb: "Muito Longo",
		Ab: "Longo",
		Ib: "M\u00e9dio",
		Vb: "Curto",
		Zb: "Bastante Curto",
		nb: "Aceitar Ataques ao Placar:",
		Ob: "Selecionar Posi\u00e7\u00e3o do ataque",
		Pb: "O bot ira atacar aleatoriamente jogadores no placar.",
		pb: "Ataque da Liga",
		mb: "Ativar ataque da liga:",
		Kb: "Ataque aleat\u00f3rio",
		Lb: "Atacar do Menor para o maior",
		tk: "Bot N\u00e3o atacara menbros da alian\u00e7a.",
		Pe: "Local da Expedi\u00e7\u00e3o:",
		Pd: "Coletar Bonus automaticamente:",
		Bh: "Ignorar Chefe",
		ne: "Local da Masmorra:",
		jh: "Recome\u00e7ar se perder?",
		cf: "Defeni\u00e7\u00f5es do Inferno",
		df: " A Personagem entrar\u00e1 no submundo apenas quando o HP for> 90%. Por favor, defina as configura\u00e7\u00f5es de porcentagem de cura na Aba de cura e certifique-se de que a Aba de cura est\u00e1 ativada. Se ao entrar no submundo fizer logout, v\u00e1 para o lobby e ative a caixa de sele\u00e7\u00e3o de login autom\u00e1tico.",
		af: "Dificuldade Do inferno:",
		Sd: "Entrar automaticamente no inferno / Inferno Mode",
		Ai: "Utilizar Mobiliza\u00e7\u00e3o se pontos = 0",
		Ei: "Usar Rubies?",
		ve: "Deixar Inferno se nao tiver pontos?",
		mi: "O bot tentar\u00e1 usar a Villa Medici primeiro, se voc\u00ea n\u00e3o tiver, ele usar\u00e1 a po\u00e7\u00e3o de cura. N\u00e3o se esque\u00e7a de ativar o bot\u00e3o de Cura!.",
		vi: "Entrar automaticamente no Inferno ira desabilitar masmorras/arena/Circus.",
		Xk: "Defeni\u00e7oes de cura no Inferno",
		Di: "Usar Villa Medici?",
		Bi: "Usar Po\u00e7\u00e3o de Vida?",
		$f: "INFO: O bot ir\u00e1 procurar itens no mercado a cada minuto selecionado, o que pode parar o ataque durante a busca.",
		re: "Ativar pesquisa de mercado:",
		ag: "Intervalo de pesquisa no mercado:",
		bg: "Sugest\u00e3o 10 minutos.",
		nf: "Defini\u00e7\u00f5es de itens:",
		lf: "Nome do item inclui",
		G: "Pre\u00e7o Maximo",
		pf: "Estilo do Item",
		mf: "Raridade do Item",
		ae: "Comprar Soulbound?",
		rf: "Itens para comprar",
		qf: "Tentar comprar itens com pacotes se algum deles corresponde ao pre\u00e7o m\u00e1ximo Defenido.:",
		Zd: "Itens Comprados:",
		dj: "Percentagem de Cura",
		pk: "Comprar comida da Loja?",
		qk: "Usar cura dos pacotes?",
		lk: "Usar Cervisia?",
		nk: "Usar Ovos?",
		tl: "Usado por \u00faltimo",
		location: "Localiza\u00e7\u00e3o",
		Strength: "For\u00e7a",
		Dexterity: "Destreza",
		Agility: "Agilidade",
		Constitution: "Constitui\u00e7\u00e3o",
		Charisma: "Carisma",
		Intelligence: "Inteligencia",
		ii: "Defini\u00e7\u00f5es de Treino",
		ji: "Selecione os atributos que deseja treinar. ir\u00e1 treinar assim que houver ouro suficiente.",
		cd: "Proxima A\u00e7\u00e3o",
		qj: "N\u00e3o",
		rj: "Normal",
		xl: "Oponente",
		yl: "Nivel do Oponente",
		Dj: "Miss\u00f5es",
		random: "aleat\u00f3rio",
		Hl: "Defini\u00e7\u00f5es",
		Tl: "Brevemente...",
		type: "Clique nos \u00edcones para ativar os tipos de miss\u00f5es. Selecione os 3 primeiros se quiser se concentrar em Circus & Arena",
		$l: "Sim",
		A: "Procura",
		Bd: "Adicionar item [NOME COMPLETO]",
		ik: "Guardar recursos da Forja automaticamente",
		Vl: "Enviar",
		rl: "Intervalo : ",
		gl: "Ativar lance autom\u00e1tico",
		hl: "Cobrir aliados",
		Xl: "Tutorial",
		dc: "MMais jogadores ir\u00e3o por o bot mais lento.",
		$k: "Comece adicionando o nome completo dos itens \u00e0 lista. Uma vez adicionado, a ferramenta exibir\u00e1 os resultados da pesquisa \u00e0 esquerda. Isso tamb\u00e9m auxilia nas pesquisas de leil\u00e3o autom\u00e1tico. Com o lance autom\u00e1tico ativado, a ferramenta far\u00e1 pesquisas peri\u00f3dicas com base no intervalo definido. Se o item for encontrado e voc\u00ea tiver fundos suficientes, ele far\u00e1 um lance automaticamente. Nota: Para pesquisar itens exclusivos em lojas, voc\u00ea deve adicionar pelo menos um item \u00e0 lista de pesquisa...",
		jl: "O n\u00famero da criatura pode ser escolhido nos bot\u00f5es acima. O n\u00famero 1 representa a criatura \u00e0 esquerda. Certifique-se de selecionar o local correto, caso contr\u00e1rio o bot poder\u00e1 fazer uma pausa.",
		Ui: "Escolha a dificuldade da masmorra nas op\u00e7\u00f5es acima. Certifique-se de selecionar o local correto, caso contr\u00e1rio, o bot poder\u00e1 fazer uma pausa.",
		ej: "Defini\u00e7\u00f5es de cura",
		Vi: "Armazene o excesso de ouro na Guilda comprando itens do mercado da Guilda. -> Min. Gold",
		ul: "Mover tudo",
		vl: "Mover o Selecionado",
		cl: "Curar autom\u00e1ticamente",
		dl: "Percentagem da cura",
		Zl: "Rubi",
		Hg: "Defini\u00e7\u00f5es Gerais",
		Hj: "Vender tudo",
		Ij: "Vender Selecionados",
		fa: "Armas",
		ca: "Escudos",
		U: "Armaduras",
		X: "Capacetes",
		W: "Luvas",
		da: "Sapatos",
		aa: "Aneis",
		T: "Amuletos",
		yi: "Usaveis",
		xi: "Atualiza\u00e7\u00f5es",
		Zg: "Receitas",
		og: "Mercen\u00e1rios",
		ah: "Refor\u00e7os",
		te: "Entrar no Submundo se HP >",
		Yg: "Velocidade de Verifica\u00e7\u00e3o de Miss\u00e3o",
		Qg: 'O padr\u00e3o \u00e9 "3x". Se o bot causar problemas com miss\u00f5es, altere a velocidade da miss\u00e3o de acordo com a velocidade do seu servidor.',
		$e: "Saco de Cura",
		ue: 'Se voc\u00ea est\u00e1 renovando pontos manualmente, voc\u00ea precisa clicar no bot\u00e3o acima "Atualizar Expedi\u00e7\u00e3o de Evento se estiver preso!',
		Dk: "Voc\u00ea deve ativar pelo menos uma das seguintes op\u00e7\u00f5es: expedi\u00e7\u00e3o, masmorra, arena ou circo para iniciar a Expedi\u00e7\u00e3o de Evento.",
		$g: "Atualizar Expedi\u00e7\u00e3o de Evento se estiver preso!",
		kb: "Cobrir Aliados?",
		Vk: "Deixe todas as configura\u00e7\u00f5es desativadas se desejar fundir usando pacotes que cont\u00eam os itens da lista. No entanto, voc\u00ea ainda pode escolher cores.",
		Ak: "Personagem(Desligado) / Mercen\u00e1rio(Ligado)",
		Rk: "Reparar Ambos?",
		Wk: "Cron\u00f4metros",
		Timers: "Insira o n\u00famero de minutos para cada cron\u00f4metro abaixo ou deixe-o padr\u00e3o.",
		Vg: "Ignorar Filtro de Miss\u00e3o",
		Ug: "Digite palavras-chave para filtrar miss\u00f5es que voc\u00ea n\u00e3o deseja aceitar",
		V: "Inserir Palavra-chave",
		I: "Adicionar",
		bh: "Remover",
		de: "Limpar",
		Sg: "Aceitar Filtro de Miss\u00e3o",
		Tg: "Digite palavras-chave para escolher quais miss\u00f5es aceitar. Usar isso ignorar\u00e1 os tipos de miss\u00e3o",
		Ca: "Pular Miss\u00f5es de Tempo?",
		Pk: "Miss\u00f5es",
		Qd: "Auto Traje",
		zi: "Usar Traje?",
		Vd: "Batalha B\u00e1sica",
		me: "Batalha em Masmorra",
		Rd: "O bot s\u00f3 usar\u00e1 Dis Pater Normal e M\u00e9dio se seus pontos de expedi\u00e7\u00e3o/masmorra forem 0.",
		bf: "Configura\u00e7\u00f5es de Cura no Inferno",
		Hd: "Atacar Chefe Quando Dispon\u00edvel?",
		qb: "O ataque \u00e0 Liga ser\u00e1 desativado ap\u00f3s 5 ataques malsucedidos.",
		ef: "\u00d3leos Sagrados",
		wg: "Nome do Item",
		Z: "N\u00edvel M\u00edn. do Item",
		Aa: "Qualidade M\u00edn. do Item",
		Gd: "Aplicar/Reiniciar Temporizador",
		hf: "Ignorar Combina\u00e7\u00e3o de Prefixo/Sufixo",
		Gi: "Sim",
		Dg: "N\u00e3o",
		Oa: "Adicionar Prefixo",
		Pa: "Adicionar Sufixo",
		Xa: "Limpar Hist\u00f3rico",
		Dh: "Lista de Ignora\u00e7\u00e3o de Fundi\u00e7\u00e3o",
		Jb: "Prefixo",
		Wb: "Sufixo",
		ih: "Redefinir Itens Expirados",
		Eh: "Fundir Aleatoriamente de Pacotes?",
		Fh: "Guia de Fundi\u00e7\u00e3o",
		ob: "Extras",
		Ld: "Leil\u00e3o",
		eg: "Mercado",
		Xb: "Temporizadores",
		di: "Fundi\u00e7\u00e3o",
		ci: "Fundi\u00e7\u00e3o se n\u00e3o houver ouro suficiente",
		$h: "Fundir se n\u00e3o houver item",
		Da: "Reparo",
		Sh: "Manter Ouro no Mercado da Guilda",
		Oh: "Manter Ouro no Leil\u00e3o",
		gi: "Treinamento",
		Vh: "Redefinir Expirados",
		ei: "Loja de Forja",
		Mh: "Verifica\u00e7\u00e3o de Leil\u00e3o",
		Xh: "Pesquisa",
		v: "Habilitar",
		yg: "Ouro M\u00ednimo",
		lb: "Doar Ouro para a Guilda",
		he: "Isso doar\u00e1 a cada 5 minutos. Voc\u00ea pode alterar o intervalo na guia de temporizadores",
		ff: "Quanto deseja doar?",
		ie: "Doar quando tiver mais que >",
		tf: "Menos que <",
		fh: "Redefinir Expirados e Outras Configura\u00e7\u00f5es",
		hh: "Redefinir em:",
		Jk: "Mantenha Ctrl (Cmd no Mac) pressionado para selecionar v\u00e1rios itens",
		jf: "Importar/Exportar Configura\u00e7\u00f5es",
		Re: "Exportar Configura\u00e7\u00f5es",
		kf: "Importar Configura\u00e7\u00f5es",
		pg: "Mensagem para Todos os Jogadores",
		qg: "[Requer Chave Ultra Premium, mensagem no Discord para obter a chave.]",
		rg: "Digite a mensagem a ser enviada",
		fe: "Para scripts personalizados, entre em contato conosco no Discord",
		tg: "Enviar",
		ug: "Mostrar Jogadores",
		sg: "Selecionar Todos",
		vg: "Desmarcar Todos",
		sf: "Certifique-se de que seu invent\u00e1rio tenha espa\u00e7o suficiente. O tempo de recarga \u00e9 de 2 minutos.",
		ig: "Vender Comida",
		Eb: "Mudar para Comida"
	},
	Kh = {
		Yj: "Roztopi\u0107 najpierw wy\u017csze kolory?",
		$b: "Atakowa\u0107 tylko list\u0119 graczy?",
		ac: "Kiedy ta opcja jest w\u0142\u0105czona, bot b\u0119dzie atakowa\u0142 tylko graczy z listy graczy. Je\u015bli ta opcja nie jest w\u0142\u0105czona, bot b\u0119dzie atakowa\u0142 losowych graczy.",
		Fk: "Twoje ustawienia ekspedycji s\u0105 nieprawid\u0142owe lub wyst\u0105pi\u0142y nieoczekiwane dane strony!",
		Gk: "Twoje ustawienie ekspedycji jest nieprawid\u0142owe! Ustawi\u0142e\u015b wy\u0142\u0105czonego potwora, co jest b\u0142\u0119dne.",
		Tk: "Zresetowa\u0107 tylko wszystkie przedmioty z podziemi o wybranym kolorze?",
		Ba: "Priorytet",
		Sb: "Ustaw Priorytet",
		Ng: "Punkty",
		Gh: "Stat",
		Oi: "Zbieranie Z\u0142ota",
		Jj: "Sprzedaj przedmioty z podziemia?",
		pj: "Bot b\u0119dzie szuka\u0142 gniazda w ka\u017cdej akcji, nie tylko na wyprawach.",
		nj: "Typ wyszukiwania gniazda",
		lj: "Nic nie r\u00f3b",
		mj: "Szybkie wyszukiwanie",
		oj: "Dok\u0142adne wyszukiwanie",
		El: "After expedition points are consumed, travel to Germania to consume Dungeon points",
		sk: "Kliknij tutaj, je\u015bli naprawa si\u0119 zacina",
		Hk: "Gdy HP spadnie poni\u017cej, u\u017cyj leczenia",
		Jg: "Cz\u0119\u015bciowa Naprawa",
		Ye: "Pe\u0142na Naprawa",
		Ig: "Cz\u0119\u015bciowa lub Pe\u0142na Naprawa",
		pe: "W\u0142\u0105cz Limit",
		gj: "Limit",
		hj: "Je\u015bli chcesz ograniczy\u0107 liczb\u0119 atak\u00f3w na przeciwnika, w\u0142\u0105cz t\u0119 opcj\u0119 i ustaw limit. Bot b\u0119dzie kontynuowa\u0142 atakowanie reszty przeciwnik\u00f3w po zako\u0144czeniu atak\u00f3w na wybranego potwora.",
		ke: "Nie wchod\u017a do podziemia w kostiumie podziemia",
		je: "Je\u015bli nie chcesz wchodzi\u0107 do podziemia, maj\u0105c na sobie kostium podziemia, w\u0142\u0105cz t\u0119 opcj\u0119",
		ui: "Podziemia",
		li: "Wzmocnienia Podziemi",
		ni: "U\u017cy\u0107 mocy bog\u00f3w po wej\u015bciu do podziemi?",
		oi: "Wybierz bog\u00f3w, kt\u00f3rych moce chcesz wykorzysta\u0107:",
		pi: "U\u017cy\u0107 Wzmocnienia Broni na broni?",
		ri: "U\u017cy\u0107 Wzmocnienia Zbroi na nast\u0119puj\u0105cym ekwipunku?",
		Ck: "Czas odnowienia wynosi 30 minut. Je\u015bli nie masz kostiumu, bot zresetuje czas odnowienia do 0.",
		Uk: "Wybierz Kolory",
		Ya: "Kowad\u0142o Wulkana",
		bb: "Ziemna Tarcza Feronii",
		cb: "P\u0142ynna Moc Neptuna",
		eb: "Powietrzna Wolno\u015b\u0107 Aelousa",
		fb: "Zab\u00f3jcza Mg\u0142a Plutona",
		gb: "Oddech \u017bycia Junony",
		hb: "Pancerz \u0141usek G\u00f3r Gniewu",
		ib: "Orle Oczy",
		jb: "Zimowy Str\u00f3j Saturna",
		Za: "Bycza Zbroja Bubony",
		$a: "Szaty Z\u0142odzieja Merceriusa",
		ab: "Szata \u015awiat\u0142a Ra",
		hg: "Paczki",
		cg: "Inwentarz",
		K: "Min. Cena",
		J: "Ile",
		Db: "Sprzedaj Przedmioty",
		Cb: "Szukaj w",
		dg: "Kolor Materia\u0142u",
		Bb: "Kolor Przedmiotu",
		kg: "Magazyn",
		za: "Prze\u0142\u0105cz na Materia\u0142y",
		Fb: "Prze\u0142\u0105cz na Przedmioty",
		jg: "Sprzedaj Materia\u0142y",
		wa: "Prosz\u0119 wprowadzi\u0107 poprawn\u0105 nazw\u0119 przedmiotu, zakres cen oraz ilo\u015b\u0107.",
		xa: "Nie znaleziono odpowiednich przedmiot\u00f3w w wybranych miejscach wyszukiwania.",
		ya: "Wszystkie przedmioty zosta\u0142y pomy\u015blnie wystawione!",
		Nk: "Wszystkie materia\u0142y zosta\u0142y pomy\u015blnie wystawione!",
		fg: "Je\u015bli chcesz sprzeda\u0107 przedmioty za sta\u0142\u0105 cen\u0119, mo\u017cesz wpisa\u0107 t\u0119 sam\u0105 warto\u015b\u0107 dla minimalnej i maksymalnej ceny.",
		gg: "Ta funkcja jest nadal eksperymentalna, u\u017cywaj ostro\u017cnie. Je\u015bli nie ustawisz sta\u0142ej ceny, przedmioty b\u0119d\u0105 wy\u015bwietlane losowo mi\u0119dzy minimaln\u0105 a maksymaln\u0105 cen\u0105, kt\u00f3r\u0105 wpiszesz.",
		yk: "Ustawia maksymaln\u0105 ilo\u015b\u0107 z\u0142ota, kt\u00f3r\u0105 bot wyda w jednym cyklu.",
		Ta: "Bot zacznie licytowa\u0107 wszelkie przedmioty \u017cywno\u015bciowe, je\u015bli opcja jest w\u0142\u0105czona. Nie musisz w\u0142\u0105cza\u0107 prze\u0142\u0105cznik\u00f3w gladiatora/najemnika.",
		Jd: "Bot nie b\u0119dzie licytowa\u0142 ofert sojusznik\u00f3w.",
		Kd: "Ignoruj kombinacj\u0119 Prefixu/Sufiksu podczas szukania przedmiotu na aukcji.",
		Qj: "Wybierz typy przedmiot\u00f3w, kt\u00f3re chcesz przetopi\u0107.",
		Rj: "Wybierz kolory, kt\u00f3re chcesz przetopi\u0107.",
		Sj: "Wybierz poziom przedmiot\u00f3w, kt\u00f3re chcesz przetopi\u0107.",
		Tj: "Wybierz m\u0142ot, kt\u00f3rego chcesz u\u017cy\u0107.",
		Uj: "Zwr\u00f3\u0107 uwag\u0119, \u017ce zielone i czerwone k\u00f3\u0142ko obok pierwszego pola s\u0142u\u017cy do w\u0142\u0105czania/wy\u0142\u0105czania regu\u0142y.",
		Vj: "Je\u015bli chcesz przetapia\u0107 losowo jakiekolwiek kolory lub typy, mo\u017cesz w\u0142\u0105czy\u0107 `Czy przetapia\u0107 losowo, je\u015bli \u017cadne warunki nie s\u0105 spe\u0142nione? (Ostatnia w\u0142\u0105czona opcja w filmie instrukta\u017cowym)",
		Fj: "Napraw przed przetopieniem",
		Le: "Wybierz Potwora",
		ze: "U\u017cy\u0107 Klepsydry/Rubinu?",
		Ek: "U\u017cy\u0107 Rubinu?",
		Ce: "U\u017cy\u0107 Mobilizacji?",
		Be: "U\u017cy\u0107 Mikstury \u017bycia?",
		ye: "Procent Leczenia (%)",
		Je: "Liczba Atak\u00f3w",
		Ae: "Interwa\u0142 Ataku (w sekundach)",
		we: "Wykonane Ataki",
		xe: "Pozosta\u0142e Klepsydry",
		He: "Uwaga: U\u017cywa mikstur \u017cycia do leczenia, nie jedzenia.",
		Ie: "Uwaga: Je\u015bli ataki zatrzymaj\u0105 si\u0119 przedwcze\u015bnie, spr\u00f3buj 'Zresetuj Ataki'.",
		Me: "Rozpocznij",
		Ke: "Resetuj",
		Ne: "Zatrzymaj",
		Oe: "Ustawienia Ekspedycji (Kliknij, aby zminimalizowa\u0107)",
		De: "Potw\u00f3r 1",
		Ee: "Potw\u00f3r 2",
		Fe: "Potw\u00f3r 3",
		Ge: "Potw\u00f3r 4",
		Qk: "Napraw przed przetopieniem",
		Mi: "Ta opcja u\u017cyje cervisia, gdy twoja subskrypcja premium wyga\u015bnie.",
		sj: "Ta opcja w\u0142\u0105cza i wybiera oleje z nagr\u00f3d boskich. Mo\u017ce u\u017cywa\u0107 olej\u00f3w numer 1 i 3 na postaci, ale numer 2 b\u0119dzie tylko zbierany do paczek.",
		Ki: "Ta opcja u\u017cyje buff\u00f3w o ustawionym przez ciebie czasie. Znajdzie buffy w paczkach i zastosuje je na postaci.",
		ij: "Ta opcja wprowadzi ci\u0119 do podziemia. Nie zapomnij w\u0142\u0105czy\u0107 Automatycznego Logowania z zak\u0142adki Dodatki, inaczej mo\u017cesz zosta\u0107 wylogowany przy wej\u015bciu do podziemia [B\u0142\u0105d Gry]",
		bc: "Ta opcja b\u0119dzie atakowa\u0107 tylko list\u0119 aren/cyrk\u00f3w. Je\u017celi nie uda si\u0119 jej wykona\u0107, bot pominie dan\u0105 aren\u0119.",
		Cj: "Ta opcja jest tylko dla licencji premium. Symuluje atak przed zaatakowaniem u\u017cytkownika dla 75% szansy na wygran\u0105.",
		Md: "Nie musisz w\u0142\u0105cza\u0107 g\u0142\u00f3wnego prze\u0142\u0105cznika aukcji, aby w\u0142\u0105czy\u0107 t\u0119 opcj\u0119.",
		kk: "Ta opcja od\u015bwie\u017cy stron\u0119 co sekund\u0119, gdy aukcja jest w stanie -Bardzo Kr\u00f3tki-, aby nieustannie licytowa\u0107 i wygra\u0107 aukcj\u0119.",
		Oj: "Je\u015bli \u017caden z warunk\u00f3w wytopu nie zostanie spe\u0142niony, b\u0119dzie wybiera\u0107 losowo. Upewnij si\u0119, \u017ce wybra\u0142e\u015b typ i kolor przedmiotu.",
		Pj: "Ta opcja b\u0119dzie tylko wytopi\u0107 przedmioty z inwentarza. Zignoruje przedmioty w paczkach.",
		Ua: "Przedmioty na Aukcji",
		ng: "Przedmioty Najemnika",
		Ub: "Przedmioty w Sklepie",
		wi: "Unikalne Przedmioty",
		Kj: "Ustaw t\u0142o na czarne [Zwi\u0119ksza wydajno\u015b\u0107]",
		Lj: "Przenie\u015b przyciski Gladbot do lewego dolnego rogu?",
		Ni: "Atakuj Cyrk Bez Leczenia",
		jk: "Czy pobra\u0107 z\u0142oto z paczek, je\u015bli to konieczne?",
		Wl: "Z\u0142oto zosta\u0142o pobrane z paczek do treningu",
		Dd: "Nie znaleziono z\u0142ota w paczkach do treningu",
		gk: "Naprawione Przedmioty",
		$j: "Ataki na Arenie",
		bk: "Ataki w Cyrku",
		Cd: "Zresetowane Przedmioty",
		ek: "Ataki na Wyprawach",
		dk: "Ataki w Lochach",
		hk: "Ataki w Podziemiach",
		ak: "Pieni\u0105dze Zarobione na Arenie",
		ck: "Pieni\u0105dze Zarobione w Cyrku",
		Ul: "Przedmioty Przetopione",
		fk: "Przetopione Z\u0142oto",
		$i: "Bitwa Gildii",
		bj: "Ustawienia Gildii",
		ll: "B\u0119dzie atakowa\u0107 gildie losowo.",
		aj: "Nazwa Gildii",
		Li: "Zresetuj Statystyki",
		Zi: "Atakuj losowo?",
		wl: "GladBot: U\u017cyj kostek, aby od\u015bwie\u017cy\u0107 tajemnicze pude\u0142ko i znale\u017a\u0107 cenne przedmioty przed ich otwarciem (itp. Kostiumy). Kliknij \u201eStart\u201d otw\u00f3rz skrzynie.",
		Nc: "Drewno",
		Dc: "Mied\u017a",
		Hc: "\u017belazo",
		Jc: "Sk\u00f3ra",
		Oc: "We\u0142niana nitka",
		Ec: "Bawe\u0142na",
		Gc: "Konopie",
		Fc: "Kawa\u0142ek tkaniny",
		Kc: "Kawa\u0142ek w\u0142\u00f3kna lnianego",
		Ic: "\u0141ata z juty",
		Mc: "Pasek aksamitu",
		Lc: "Jedwabna nitka",
		Wc: "Futro",
		Qc: "Od\u0142amek ko\u015bci",
		Zc: "\u0141uska",
		Tc: "Pazur",
		Vc: "Kie\u0142",
		Uc: "Smocza \u0142uska",
		Rc: "R\u00f3g byka",
		Yc: "Gruczo\u0142 jadowy",
		Sc: "Kawa\u0142ek futra Cerbera",
		Xc: "\u0141uska Hydry",
		$c: "Pi\u00f3ro Sfinksa",
		ad: "Sk\u00f3ra Tyfona",
		zc: "Lazuryt",
		tc: "Ametyst",
		sc: "Bursztyn",
		uc: "Akwamaryn",
		Ac: "Szafir",
		xc: "Granat",
		wc: "Szmaragd",
		vc: "Diament",
		yc: "Jaspis",
		Bc: "Sugilit",
		nc: "Jad skorpiona",
		qc: "Eliksir wytrwa\u0142o\u015bci",
		jc: "Antidotum",
		ic: "Adrenalina",
		pc: "Eliksir o\u015bwiecenia",
		mc: "Nap\u00f3j postrzegania",
		kc: "Esencja refleksu",
		lc: "Fiolka Charyzmy",
		rc: "Woda zapomnienia",
		oc: "Esencja duszy",
		Ad: "Wodna piecz\u0119\u0107",
		ud: "Runa ochrony",
		sd: "Ziemny grawerunek",
		zd: "\u015awi\u0119ty totem",
		yd: "Talizman mocy",
		wd: "Kamie\u0144 szcz\u0119\u015bcia",
		td: "Krzemie\u0144",
		xd: "Runa wichury",
		vd: "Runa cienia",
		fd: "Kryszta\u0142",
		ed: "Br\u0105z",
		kd: "Obsydian",
		nd: "Srebro",
		od: "Siarka",
		hd: "Ruda z\u0142ota",
		md: "Kwarc",
		ld: "Platina",
		dd: "Almandyn",
		gd: "Kupryt",
		jd: "Piekielny kamie\u0144",
		Hi: "Atakuj losowo?",
		Ii: 'Wy\u0142\u0105cz r\u00f3wnie\u017c ustawienie "Sortuj graczy na arenie wed\u0142ug poziomu" w crazy-addon.',
		Wg: "Akceptuj tylko misje na podstawie typu boga.",
		Va: "Automatyczny Buff",
		$d: "U\u017cywaj tylko w piekle?",
		Cg: "Nowa Zasada",
		Ag: "Nazwa Zawiera",
		isUnderworldItem: "Czy to przedmiot z Podziemi",
		gf: "Ignoruj Materia\u0142y",
		rk: "U\u017cyj modlitwy",
		Ci: "U\u017cyj ofiary",
		mk: "U\u017cyj tkaniny, aby wej\u015b\u0107 do podziemia",
		ti: "Czy w podziemiach akceptowa\u0107 tylko zadania zwi\u0105zane z podziemiami?",
		si: "Je\u015bli w\u0142\u0105czone, musisz wprowadzi\u0107 nazwy przedmiot\u00f3w z podziemi. Je\u015bli bot znajdzie te przedmioty w podziemiach, zaakceptuje zadanie.",
		Yk: "Przedmiot zadania z podziemi",
		il: "Wprowad\u017a nazw\u0119 materia\u0142u",
		Bk: "Bot uwielbia ko\u015bci! Pomagaj\u0105 znale\u017a\u0107 ubrania w skrzyniach. Ale je\u015bli nie ma ko\u015bci, bot i tak otwiera skrzynie, licz\u0105c na fajne ciuchy (ale mo\u017ce ich nie znale\u017a\u0107!)",
		Nj: "Czy chcesz przetopi\u0107 skrzynki?",
		oe: "W\u0142\u0105cz automatyczne ataki na arenie?",
		Og: "Priorytetowa lista aren?",
		Pg: "Priorytetowa lista cyrk\u00f3w?",
		ge: "Wy\u0142\u0105cz menu dziennika",
		kh: "Minimalna warto\u015b\u0107 nagrody z\u0142ota",
		Xg: "Je\u015bli w\u0142\u0105czone, Fokus na zadaniach b\u0119dzie pod\u0105\u017ca\u0142 najkr\u00f3tsz\u0105 drog\u0105 do uko\u0144czenia lochu.",
		Jh: "Automatyczne rzucanie kostk\u0105?",
		Kh: "U\u017cywaj rzucania kostk\u0105 ostro\u017cnie, b\u0119dzie ono nadal u\u017cywa\u0107 pierwszej kostki, dop\u00f3ki nie wy\u0142\u0105czysz opcji.",
		ph: "Post\u0119p w wyszukiwaniu",
		eh: "Czas odnowienia naprawy domy\u015blnie wynosi 10 minut.",
		xg: "Minimalny stan",
		ee: "Obecny przedmiot na warsztacie [Wyczy\u015b\u0107, je\u015bli bot nagle zostanie zatrzymany]",
		Df: "Pomy\u015blnie przechowywano zasoby do horreum.",
		zf: "Sprawdzanie rynku na przedmioty...",
		yb: "Przedmiot przeniesiony na warsztat.",
		Qf: "Przedmiot zosta\u0142 pomy\u015blnie naprawiony i za\u0142o\u017cony.",
		Rf: "Przedmiot zosta\u0142 pomy\u015blnie naprawiony.",
		Lk: "Naprawa nie powiod\u0142a si\u0119. Strona zostanie od\u015bwie\u017cona.",
		Nf: "Podnoszenie materia\u0142\u00f3w...",
		Zf: "Oczekiwanie na napraw\u0119...",
		Pf: "Naprawa rozpocz\u0119\u0142a si\u0119 dla .",
		va: "Naprawa: Przenoszenie przedmiotu z inwentarza do torby",
		Of: "Naprawa: Przenoszenie przedmiotu z warsztatu do paczki.",
		ta: "Nie uda\u0142o si\u0119 znale\u017a\u0107 wystarczaj\u0105cej ilo\u015bci materia\u0142\u00f3w. Wy\u0142\u0105czanie slotu naprawy ",
		Kf: "Szukanie przedmiot\u00f3w do kupienia w celu ukrycia z\u0142ota na Aukcji...",
		wf: "Sprawdzanie wygas\u0142ych przedmiot\u00f3w w paczkach...",
		xf: "Przedmiot zosta\u0142 pomy\u015blnie zresetowany.",
		yf: "Brak pustej przestrzeni lub z\u0142ota do zresetowania.",
		Ef: "Upewnij si\u0119, \u017ce masz prawa do sprzeda\u017cy na rynku gildii!",
		sb: "Brak wystarczaj\u0105cej ilo\u015bci z\u0142ota/lub brak przedmiotu do kupienia. Oczekiwanie 30 sekund na od\u015bwie\u017cenie.",
		ub: "Sklep zosta\u0142 od\u015bwie\u017cony.",
		vb: "B\u0142\u0105d podczas leczenia.",
		Hf: "Brak Rubina lub Materia\u0142u, wy\u0142\u0105czanie opcji.",
		Kk: "Brak przedmiotu do leczenia w paczkach.",
		wb: "Nie znaleziono odpowiednich przedmiot\u00f3w",
		If: "\u017bywno\u015b\u0107 zosta\u0142a wybrana. Zako\u0144czenie procesu.",
		Jf: "Wybrano przynajmniej jedzenie. Proces zako\u0144czony.",
		xb: "Nie znaleziono odpowiedniej przestrzeni w torbie, aby zebra\u0107 jedzenie.",
		Ff: "Pobieranie jedzenia z paczek.",
		Gf: "Nie znaleziono odpowiedniej przestrzeni w torbie, aby zebra\u0107 jedzenie.",
		tb: "Brak wi\u0119cej przedmiot\u00f3w do leczenia. Oczekiwanie 30 sekund.",
		rb: "Odzyskano punkty \u017cycia.",
		ua: "Nie ma nic do roboty, wi\u0119c id\u0119 si\u0119 pomodli\u0107!",
		Vf: "Zamierzam od\u015bwie\u017cy\u0107 za 60 sekund, aby sprawdzi\u0107 moje zdrowie i Vill\u0119 Medici.",
		Wf: "Oczekiwanie na Vill\u0119 Medici, od\u015bwie\u017canie za 60 sekund.",
		Xf: "Opuszczono za\u015bwiaty.",
		Yf: "Zamierzam od\u015bwie\u017cy\u0107 za 60 sekund, aby sprawdzi\u0107 moje zdrowie.",
		Lf: "Sprawdzanie olejk\u00f3w bo\u017cych...",
		Mf: "Olejki bo\u017ce zosta\u0142y podniesione.",
		ra: "Pomy\u015blnie zaatakowano gracza na ARENIE: ",
		sa: "Pomy\u015blnie zaatakowano gracza w CIRKUSIE: ",
		uf: "Sprawdzanie aukcji! Prosz\u0119 czeka\u0107...",
		vf: "Licytacja przedmiot\u00f3w. Prosz\u0119 czeka\u0107...",
		Sf: "Automatycznie przetopiony przedmiot: ",
		Tf: "Przetapiany przedmiot: ",
		zb: "Nie ma wystarczaj\u0105cej ilo\u015bci z\u0142ota do przetopienia. Wymagane z\u0142oto: ",
		Uf: "PRZETAP: Szukanie przedmiot\u00f3w do przetopienia...",
		Mk: "Szukanie przedmiot\u00f3w do przetopienia...",
		Af: "Sprawdzanie dost\u0119pno\u015bci kostium\u00f3w...",
		Cf: "Wys\u0142ano datek: ",
		Bf: "Rzucanie kostk\u0105...",
		Ue: "Underworld Farm [Manual, Beta]",
		Te: "Farm Location",
		Ve: "Uwaga: w\u0142\u0105cz t\u0119 funkcj\u0119 po odblokowaniu stworzenia, kt\u00f3re chcesz zaatakowa\u0107, nie b\u0119dzie ono automatycznie atakowa\u0107, aby odblokowa\u0107 potwora.",
		Se: "Farm Enemy",
		Td: "Automatyczne Logowanie",
		Ud: "Musisz zezwoli\u0107 na wyskakuj\u0105ce okienka z ekranu lobby GameForge. Zobacz dokumentacj\u0119, jak to zrobi\u0107.",
		Kg: "Wstrzymaj Bota",
		Lg: "Wstrzymaj Bota na (Minuty)",
		Qe: "Data Wyga\u015bni\u0119cia",
		Fg: "Tylko kupowa\u0107 jedzenie?",
		Gg: "Je\u015bli to w\u0142\u0105czysz, zignoruje twoje wybory i b\u0119dzie automatycznie kupowa\u0107 jedzenie, nie wprowadzaj\u0105c niczego.",
		Hb: "Maksymalna \u0142\u0105czna ilo\u015b\u0107 z\u0142ota do wydania",
		Gb: "Maksymalna ilo\u015b\u0107 z\u0142ota na jedzenie do wydania",
		Eg: "Bot b\u0119dzie sprawdza\u0107 oleje co 60 minut",
		bi: "Ustawia timer do sprawdzania czas\u00f3w topienia.",
		Zh: "Ustawia timer do sprawdzania topienia, gdy nie masz z\u0142ota.",
		ai: "Ustawia timer do sprawdzania topienia, gdy nie masz dost\u0119pnego przedmiotu.",
		Uh: "Ustawia timer do naprawy i sprawdzania twoich przedmiot\u00f3w.",
		Th: "Ustawia timer do sprawdzania ilo\u015bci z\u0142ota w gildijnym rynku.",
		Ph: "Ustawia timer dla opcji zatrzymania z\u0142ota na aukcji.",
		Lh: "Ustawia timer do sprawdzania listy PvP na arenie do ataku.",
		Qh: "Ustawia timer do sprawdzania listy PvP w cyrku do ataku.",
		hi: "Ustawia timer treningowy do trenowania statystyk.",
		Wh: "Ustawia timer do resetowania wygas\u0142ych przedmiot\u00f3w.",
		fi: "Ustawia timer do przechowywania materia\u0142\u00f3w do kucia w horreum.",
		Nh: "Ustawia timer do sprawdzania aukcji gladiator\u00f3w i najemnik\u00f3w.",
		Yh: "Ustawia timer do wyszukiwania przedmiot\u00f3w na aukcji i w sklepie.",
		Rh: "Ustawia timer do wysy\u0142ania darowizn do gildii.",
		Ze: "Z\u0142oto Przeniesione",
		le: "Nie sprzedawaj przedmiot\u00f3w z listy hutniczej i aukcyjnej",
		qh: "Automatyzacja Sklepu",
		th: "Ustawienia Wyszukiwania Przedmiotu",
		rh: "U\u017cyj tego narz\u0119dzia do wyszukiwania przedmiot\u00f3w. Po prostu dodaj przedmioty do listy, okre\u015bl ilo\u015b\u0107 tkaniny i rozpocznij wyszukiwanie.",
		uh: "Ilo\u015b\u0107 Tkaniny do U\u017cycia:",
		vh: "Ile tkaniny u\u017cy\u0107?",
		ea: "Full Wprowad\u017a Nazw\u0119 Przedmiotu",
		Tb: "Wprowad\u017a Poziom Przedmiotu",
		xh: "Jako\u015b\u0107 Przedmiotu",
		wh: "Wprowad\u017a Nazw\u0119 Przedmiotu Tutaj",
		yh: "Rozpocznij Wyszukiwanie",
		zh: "Pomi\u0144 i Kontynuuj",
		Ah: "Zatrzymaj Wyszukiwanie",
		We: "Kupi\u0107 najta\u0144sze czy najdro\u017csze?",
		zg: "Najdro\u017csze",
		be: "Najta\u0144sze",
		ba: "Wybierz Opcj\u0119",
		qe: "Pod\u015bwietl przedmioty z Podziemia",
		Xe: "Skoncentruj si\u0119 na zadaniu?",
		Yl: "U\u017cyj rubinu, je\u015bli nie ma tkaniny?",
		Wa: "Unikaj atakowania tych samych os\u00f3b, aby unikn\u0105\u0107 zg\u0142osze\u0144. Zg\u0142oszenia zwi\u0119kszaj\u0105 szans\u0119 na zablokowanie konta.",
		Ml: "Roztopi\u0107 zielone?",
		Rg: "Nie akceptuj losowych zada\u0144, je\u015bli wprowadzono jakiekolwiek filtry?",
		Pc: "Maksymalna jako\u015b\u0107 materia\u0142u do u\u017cycia",
		Wi: "W\u0142\u0105czy\u0107 wyszukiwanie najemnik\u00f3w",
		sl: "Kliknij \u201eSprzedaj Wszystkie Wybrane\u201d, aby sprzeda\u0107 wszystkie przedmioty. Upewnij si\u0119, \u017ce masz 2x3 puste miejsce w swojej pierwszej (1) torbie. Aby zbiera\u0107 z\u0142oto masowo, u\u017cyj filtra na z\u0142oto i opcji \u201eWybierz Wybrane lub Wybierz Wszystkie\u201d.",
		Zj: "\ud83d\udd25 : Dodaje przedmiot do listy przetapiania.",
		Ji: "\ud83d\udd28 : Dodaje przedmiot do listy aukcyjnej.",
		Ej: "Od\u015bwie\u017c sklep tkanin\u0105, gdy jest pe\u0142ny",
		Al: "Strona:",
		Aj: "Zatrzymaj",
		yj: "Sprzedaj T\u0119 Stron\u0119",
		vj: "Wybierz Wybrane",
		uj: "Wybierz Wszystko",
		Bj: "Ustawienia Automatycznego Pakowania",
		zj: "Wy\u015blij Zasoby",
		wj: "Sprzedaj Wszystkie Wybrane",
		ma: "Rodzaj Przedmiotu",
		oa: "Bronie",
		S: "Tarcze",
		M: "Zbroje",
		P: "He\u0142my",
		O: "R\u0119kawice",
		N: "Buty",
		na: "Pier\u015bcienie",
		ka: "Amulety",
		Ia: "U\u017cytkowe (\u017bywno\u015b\u0107)",
		Na: "Ulepszenia",
		tj: "Wzmacniacze",
		Ka: "Receptury",
		Ja: "Najemnicy",
		Ma: "Narz\u0119dzia Kowalskie",
		La: "Zwoje",
		rd: "Wzmocnienia",
		pd: "Przedmioty Eventowe",
		qd: "Materia\u0142y Kowalskie",
		zl: "Z\u0142oto",
		Ha: "Wszystko",
		Bl: "Jako\u015b\u0107",
		pa: "Bia\u0142y",
		C: "Zielony",
		B: "Niebieski",
		D: "Fioletowy",
		H: "Pomara\u0144czowy",
		R: "Czerwony",
		xj: "Opcje Sprzeda\u017cy",
		Mj: "Ignorowa\u0107 Kombinacje Przedrostk\u00f3w/Sufiks\u00f3w?",
		cj: "Ile jedzenia kupi\u0107/wybiera\u0107?",
		Ri: "Normalny",
		Qi: "\u015aredni",
		Pi: "Trudny",
		Ea: "Standardowy",
		Fl: "Naprawa Utkni\u0119\u0107",
		Ik: "Wy\u0142\u0105cz Wej\u015bcie do Piek\u0142a, je\u015bli chcesz wy\u0142\u0105czy\u0107 Lochy/Cyrk/Aren\u0119. Je\u015bli wszed\u0142e\u015b do Piek\u0142a r\u0119cznie, musisz w\u0142\u0105czy\u0107 Tryb Piek\u0142a.",
		ki: "Okre\u015bl, ile razy chcesz przeprowadzi\u0107 szkolenia dla statystyk oraz ich priorytety. Bot nie b\u0119dzie przeprowadza\u0142 szkole\u0144, dop\u00f3ki nie zostanie ustalony priorytet. Je\u015bli priorytet zosta\u0142 ustawiony, ale nie ma ju\u017c wi\u0119cej statystyk do szkolenia, bot kontynuowa\u0107 b\u0119dzie z priorytetowym szkoleniem.",
		el: "Quest",
		ce: "Wybierz kostium z Za\u015bwiat\u00f3w",
		Fi: "Nosi\u0107 kostium z Za\u015bwiat\u00f3w, gdy jest dost\u0119pny?",
		Kl: "Przetapianie",
		Rl: "Ustawienia Topienia",
		Wj: "Topione Przedmioty",
		Sl: "Dodaj Prefiks lub Sufiks, gdy bot znajdzie go w paczkach, automatycznie przeprowadzi przetapianie.:",
		Ql: "Topiony Przedmiot:",
		ec: "Kliknij na przedmiot, kt\u00f3ry chcesz naprawi\u0107. Ten system naprawi twoje dwie postacie, g\u0142\u00f3wn\u0105 oraz pierwsz\u0105 posta\u0107 cyrku. Musisz mie\u0107 co najmniej 10000 z\u0142ota, aby naprawa mog\u0142a si\u0119 rozpocz\u0105\u0107. Je\u015bli utkn\u0105\u0142 na jednym przedmiocie, oznacza to, \u017ce nie masz materia\u0142u do naprawy. Spr\u00f3buj r\u00f3wnie\u017c zrobi\u0107 troch\u0119 miejsca w swoim inwentarzu. Bot rozpocznie napraw\u0119, gdy trwa\u0142o\u015b\u0107 przedmiotu wynosi 0%.",
		Zk: "Zastosuj tylko do Najemnik\u00f3w",
		bl: "Licytacja b\u0119dzie licytowa\u0107 tylko wtedy, gdy rynek zbli\u017cy si\u0119 do ko\u0144ca.",
		al: "Upewnij si\u0119, \u017ce DRUGA KARTA INWENTARZA jest pusta i masz 10 000 z\u0142ota. Bot znajdzie i umie\u015bci przedmiot na drugiej karcie, a nast\u0119pnie, gdy strona zostanie od\u015bwie\u017cona, przeprowadzi przetapianie przedmiotu. przetapianie b\u0119dzie ponownie sprawdzane co 5-10 minut.",
		fj: "Leczenie & Buffs",
		Gl: "Za ma\u0142o z\u0142ota na przetapianie. Wymagane Z\u0142oto:",
		Jl: "Pomijanie licytacji: Cz\u0142onek gildii ju\u017c licytowa\u0142 przedmiot ",
		Il: "Pomijanie licytacji: Ju\u017c licytowa\u0142e\u015b przedmiot ",
		advanced: "Zaawansowane",
		arena: "Arena",
		ia: "Auto Atak",
		cc: "Unikaj Ataku",
		ga: "Dodaj Gracza",
		ha: "Wpisz Nazw\u0119 Gracza (Same Server)",
		nl: "Zatrzymaj Bota, je\u015bli brakuje jedzenia?",
		circusTurma: "Cyrk Turma",
		Si: "Trudno\u015b\u0107",
		dungeon: "Loch",
		Ti: "Ustawienia Lochu",
		eventExpedition: "Ekspedycja Wydarzenia",
		expedition: "Wyprawa",
		Xi: "Ustawienia Wyprawy",
		Gj: "Wybierz Potwora",
		pl: "Najwy\u017cszy",
		ol: "Umie\u015b\u0107 swoje przedmioty uzdrawiaj\u0105ce na pierwszej stronie swojego inwentarza",
		Cc: "W",
		Hh: "Przechowuj Z\u0142oto",
		Ih: "Przechowuj Z\u0142oto w Licytacji?",
		Rb: "Wybierz Godzin\u0119",
		nh: "U\u017cyj Roboczych Ubran, aby odnowi\u0107 Sklep?",
		Sk: "Wybierz Przedmioty do Zresetowania",
		gh: "Zresetuj Wygas\u0142e Przedmioty",
		Nb: "Uwaga: W\u0142\u0105czaj\u0105c t\u0119 opcj\u0119, bot b\u0119dzie sprzedawa\u0142 nadchodz\u0105ce wygas\u0142e przedmioty z Paczek na Rynek Gildii, a nast\u0119pnie anuluje, aby zresetowa\u0107 czas wyga\u015bni\u0119cia. Wymagana jest gildia. Upewnij si\u0119, \u017ce masz puste miejsce 3x3 w swoich torbach.",
		Mg: "Losowe Zatrzymywanie Bota [Faza Testowa]:",
		Y: "Zachowaj Z\u0142oto: Bot b\u0119dzie trzyma\u0142 to z\u0142oto w torbie:",
		lg: "Max Gold: Bot b\u0119dzie wydawa\u0142, gdy z\u0142oto b\u0119dzie wi\u0119ksze ni\u017c",
		lh: "Bot b\u0119dzie sk\u0142ada\u0142 oferty na losowe przedmioty.",
		Ed: "Dodaj Losowe Op\u00f3\u017anienie",
		Fd: "Mo\u017cesz tutaj doda\u0107 op\u00f3\u017anienie do bota.",
		Mb: "Naprawa",
		Ll: "Top Tylko Niebieskie?",
		Ol: "Top Tylko Fioletowe?",
		Nl: "Top Tylko Pomara\u0144czowe?",
		Xj: "Top Wszystko na 2. karcie?",
		Pl: "To zignoruje wyb\u00f3r kolor\u00f3w",
		Xa: "Wyczy\u015b\u0107 Histori\u0119",
		Ch: "Przetapianie",
		Nd: "Search",
		Bg: "Auto Licytacja",
		Od: "Nadmierne korzystanie z aukcji mo\u017ce skutkowa\u0107 banem. Zaleca si\u0119 wy\u0142\u0105czenie innych funkcji okre\u015blania stawek, aby unikn\u0105\u0107 potencjalnych konflikt\u00f3w. Ta funkcja spowolni bota.",
		mh: "Szukaj w Licytacji Gladiator\u00f3w",
		oh: "Szukaj w Licytacji Najemnik\u00f3w",
		Wd: "Licytuj Po\u017cywienie?",
		mg: "Maksymalna Licytacja",
		Xd: "Licytuj, je\u015bli status jest mniejszy ni\u017c",
		Yd: "Wystawione Przedmioty",
		wk: "J\u0119zyk Licytacji",
		xk: "Zgodnie z aktualizacj\u0105 2.9.4, prosz\u0119 ponownie ustawi\u0107 j\u0119zyk lub ZRESETOWA\u0106 BOTA. Upewnij si\u0119, \u017ce wszystko jest poprawne, w przeciwnym razie bot nie b\u0119dzie licytowa\u0107.",
		Id: "Mo\u017cesz doda\u0107 przedmioty do wyszukiwania na rynku i w licytacji. Poka\u017ce tak\u017ce fioletowe przedmioty na rynku, gdy dodasz przedmiot do listy. Je\u015bli chcesz w\u0142\u0105czy\u0107 auto licytacj\u0119, u\u017cyj opcji poni\u017cej",
		uk: "U\u017cywaj licytacji z rozwag\u0105!",
		vk: "Automatyczna licytacja generuje zbyt wiele \u017c\u0105da\u0144 do serwera i mo\u017ce spowodowa\u0107 ban, je\u015bli u\u017cywasz jej ca\u0142y czas!",
		dh: "Odnowi\u0107 Punkty Wydarzenia Rubinem?",
		se: "W\u0142\u0105cz Auto Olej",
		zk: "Auto Pobieraj \u015awi\u0119te Oleje",
		Ok: "Szybko\u015b\u0107 Sprawdzania Zada\u0144",
		Sa: "Atakowa\u0107 Cz\u0142onk\u00f3w Gildii?",
		Qa: 'Automatycznie dodawaj osoby do listy "Atak", gdy wi\u0119cej ni\u017c X z\u0142ota zostanie skradzione.:',
		Ra: 'Automatycznie dodawaj osoby do listy "Unikaj Atak", gdy przegrasz z nimi.:',
		Qb: "Ataki na Tablicy Wynik\u00f3w",
		Yb: "Bardzo D\u0142ugo",
		Ab: "D\u0142ugo",
		Ib: "\u015arednio",
		Vb: "Kr\u00f3tko",
		Zb: "Bardzo Kr\u00f3tko",
		te: "Wejd\u017a do Podziemia je\u015bli HP >",
		Yg: "Szybko\u015b\u0107 Sprawdzania Zada\u0144",
		Qg: 'Domy\u015blnie to "3x". Je\u015bli bot sprawia problemy z zadaniami, zmie\u0144 szybko\u015b\u0107 zada\u0144 zgodnie ze szybko\u015bci\u0105 serwera.',
		$e: "Wyb\u00f3r Worka z Lecznicami",
		ue: 'Je\u015bli r\u0119cznie odnawiasz punkty, musisz klikn\u0105\u0107 przycisk powy\u017cej: "Od\u015bwie\u017c Ekspedycj\u0119 Eventow\u0105, je\u015bli utkn\u0119\u0142o!"',
		Dk: "Musisz w\u0142\u0105czy\u0107 co najmniej jedn\u0105 z opcji: ekspedycja, loch, arena lub cyrk, aby rozpocz\u0105\u0107 Ekspedycj\u0119 Eventow\u0105.",
		$g: "Od\u015bwie\u017c Ekspedycj\u0119 Eventow\u0105, je\u015bli utkn\u0119\u0142o!",
		kb: "Nie przebijaj gildii?",
		Vk: "Pozostaw wszystkie ustawienia wy\u0142\u0105czone, je\u015bli chcesz przetapia\u0107 za pomoc\u0105 paczek zawieraj\u0105cych przedmioty z listy. Jednak nadal mo\u017cesz wybiera\u0107 kolory.",
		Ak: "Posta\u0107(Wy\u0142\u0105czona) / Najemnik(W\u0142\u0105czony)",
		Rk: "Naprawi\u0107 Obie?",
		Wk: "Timery",
		Timers: "Wprowad\u017a liczb\u0119 minut dla ka\u017cdego timera poni\u017cej lub pozostaw domy\u015blnie.",
		Vg: "Ignoruj Filtr Zada\u0144",
		Ug: "Wprowad\u017a s\u0142owa kluczowe, aby odfiltrowa\u0107 zadania, kt\u00f3rych nie chcesz przyj\u0105\u0107. You can also use this to accept quests by their reward using keywords.",
		V: "Wprowad\u017a S\u0142owo Kluczowe",
		I: "Dodaj",
		bh: "Usu\u0144",
		de: "Wyczy\u015b\u0107",
		Sg: "Akceptuj Filtr Zada\u0144",
		Tg: "Wprowad\u017a s\u0142owa kluczowe, aby wybra\u0107 zadania do przyj\u0119cia. U\u017cycie tego spowoduje ignorowanie rodzaj\u00f3w zada\u0144",
		Ca: "Pomi\u0144 Zadania Czasowe?",
		Pk: "Zadania",
		Qd: "Automatyczny Kostium",
		zi: "U\u017cywa\u0107 Kostiumu?",
		Vd: "Podstawowa Bitwa",
		me: "Bitwa w Lochach",
		Rd: "Bot b\u0119dzie nosi\u0142 Dis Pater Normal i Medium tylko wtedy, gdy Twoje punkty ekspedycji/podziemi wynosz\u0105 0.",
		bf: "Ustawienia Piekielnego Leczenia",
		Hd: "Atakuj Bossa, Gdy Dost\u0119pny?",
		qb: "Atak na Lig\u0119 zostanie wy\u0142\u0105czony po 5 nieudanych atakach.",
		ef: "\u015awi\u0119te Oleje",
		wg: "Nazwa Przedmiotu",
		Z: "Minimalny Poziom Przedmiotu",
		Aa: "Minimalna Jako\u015b\u0107 Przedmiotu",
		Gd: "Zastosuj/Resetuj Licznik",
		hf: "Ignoruj Prefiks/Sufiks",
		Gi: "Tak",
		Dg: "Nie",
		Oa: "Dodaj Prefiks",
		Pa: "Dodaj Sufiks",
		Dh: "Lista Ignorowanych Przedmiot\u00f3w do Topienia",
		Jb: "Prefiks",
		Wb: "Sufiks",
		ih: "Resetuj Wygas\u0142e Przedmioty",
		Eh: "Losowe Topienie z Paczek?",
		Fh: "Karta Topienia",
		ob: "Dodatki",
		Ld: "Aukcja",
		eg: "Rynek",
		Xb: "Zegary",
		di: "Topienie",
		ci: "Topienie, je\u015bli brakuje z\u0142ota",
		$h: "Topienie, je\u015bli brakuje przedmiotu",
		Da: "Naprawa",
		Sh: "Przechowuj Z\u0142oto na Rynku Gildii",
		Oh: "Przechowuj Z\u0142oto na Aukcji",
		gi: "Trening",
		Vh: "Resetuj Wygas\u0142e",
		ei: "Przechowuj W Ku\u017ani",
		Mh: "Sprawd\u017a Aukcj\u0119",
		Xh: "Szukaj",
		v: "W\u0142\u0105cz",
		yg: "Minimalne Z\u0142oto",
		lb: "Wp\u0142acaj Z\u0142oto do Gildii",
		he: "B\u0119dzie wp\u0142aca\u0107 co 5 minut. Mo\u017cesz zmieni\u0107 interwa\u0142 w zak\u0142adce zegar\u00f3w",
		ff: "Ile chcesz wp\u0142aci\u0107?",
		ie: "Wp\u0142aca\u0107, gdy masz wi\u0119cej ni\u017c >",
		tf: "Mniej ni\u017c <",
		fh: "Resetuj Wygas\u0142e i Inne Ustawienia",
		hh: "Reset za:",
		Jk: "Naci\u015bnij Ctrl (Cmd na Macu), aby zaznaczy\u0107 wiele przedmiot\u00f3w",
		jf: "Importuj/Eksportuj Ustawienia",
		Re: "Eksportuj Ustawienia",
		kf: "Importuj Ustawienia",
		pg: "Wiadomo\u015b\u0107 do Wszystkich Graczy",
		qg: "[Wymaga Klucza Ultra Premium, wiadomo\u015b\u0107 na Discordzie, aby go otrzyma\u0107.]",
		rg: "Wprowad\u017a wiadomo\u015b\u0107 do wys\u0142ania",
		fe: "Aby uzyska\u0107 niestandardowe skrypty, skontaktuj si\u0119 z nami na Discordzie",
		tg: "Wy\u015blij",
		ug: "Poka\u017c Graczy",
		sg: "Zaznacz Wszystkie",
		vg: "Odznacz Wszystkie",
		sf: "Upewnij si\u0119, \u017ce tw\u00f3j inwentarz ma wystarczaj\u0105co du\u017co miejsca. Czas odnowienia wynosi 2 minuty.",
		nb: "W\u0142\u0105cz Atak na Tablicy Wynik\u00f3w:",
		Ob: "Wybierz Zakres Ataku",
		Pb: "Bot losowo atakuje z listy tablicy wynik\u00f3w.",
		pb: "Atak Ligi",
		mb: "W\u0142\u0105cz Atak Ligi:",
		Kb: "Losowo Atakuj",
		Lb: "Atakuj od najs\u0142abszego do najsilniejszego",
		tk: "Domy\u015blnie bot unika atakowania cz\u0142onk\u00f3w gildii.",
		Pe: "Lokalizacja Wyprawy:",
		Pd: "Auto Zbieraj Bonusy:",
		Bh: "Pomi\u0144 Bossa",
		ne: "Lokalizacja Lochu:",
		jh: "Zresetowa\u0107, je\u015bli przegrasz?",
		cf: "Ustawienia Piek\u0142a",
		df: "Skonfiguruj ustawienia procentu leczenia w zak\u0142adce leczenia i upewnij si\u0119, \u017ce zak\u0142adka leczenia jest aktywowana. Je\u015bli wej\u015bcie do podziemi wyrzuca ci\u0119 z gry, przejd\u017a do lobby i zaznacz pole wyboru automatycznego logowania.",
		af: "Trudno\u015b\u0107 Piek\u0142a",
		Sd: "Auto Wej\u015bcie do Piek\u0142a: / Piek\u0142a Mode",
		Ai: "U\u017cyj Mobilizacji, je\u015bli punkty = 0",
		Ei: "U\u017cyj rubin\u00f3w?",
		ve: "Wyj\u015b\u0107 z podziemi, je\u015bli nie ma punkt\u00f3w?",
		mi: "Bot b\u0119dzie pr\u00f3bowa\u0142 u\u017cy\u0107 willi medici najpierw, je\u015bli jej nie masz, u\u017cyje mikstury uzdrawiania. Nie zapomnij w\u0142\u0105czy\u0107 prze\u0142\u0105cznika uzdrawiania.",
		vi: "Automatyczne wej\u015bcie do piek\u0142a wy\u0142\u0105czy loch/aren\u0119/cyrk po wej\u015bciu do piek\u0142a.",
		Xk: "Ustawienia Leczenia Piek\u0142a",
		Di: "U\u017cyj Willi Medici?",
		Bi: "U\u017cyj Mikstury Uzdrawiania?",
		$f: "INFORMACJA: Bot b\u0119dzie wyszukiwa\u0142 przedmioty na rynku co wybran\u0105 liczb\u0119 minut, co mo\u017ce spowodowa\u0107 zatrzymanie atakowania podczas wyszukiwania.",
		re: "W\u0142\u0105cz Wyszukiwanie na Rynku:",
		ag: "Interwa\u0142 Wyszukiwania na Rynku w Minutach:",
		bg: "Sugerowane 10 minut.",
		nf: "Ustawienia Przedmiotu:",
		lf: "Nazwa Przedmiotu Zawiera",
		G: "Maksymalna Cena",
		pf: "Rodzaj Przedmiotu",
		mf: "Rzadko\u015b\u0107 Przedmiotu",
		ae: "Kup Przedmiot Uwi\u0105zany?",
		rf: "Przedmioty do Kupienia",
		qf: "Pr\u00f3buj kupowa\u0107 przedmioty z paczek, je\u015bli kt\u00f3rykolwiek z nich pasuje do maksymalnej ceny wprowadzonej.:",
		Zd: "Zakupione Przedmioty:",
		dj: "Procent Leczenia",
		pk: "Kupuj Jedzenie ze Sklepu?",
		qk: "U\u017cyj Leczenia z Paczki?",
		lk: "U\u017cyj Cervisia?",
		nk: "U\u017cyj Jajka?",
		tl: "Ostatnio U\u017cyty",
		location: "Lokalizacja",
		Strength: "Si\u0142a",
		Dexterity: "W\u0142adanie broni\u0105",
		Agility: "Zr\u0119czno\u015b\u0107",
		Constitution: "Budowa fizyczna",
		Charisma: "Charyzma",
		Intelligence: "Inteligencja",
		ii: "Ustawienia Treningu",
		ji: "Wybierz atrybuty, kt\u00f3re chcesz trenowa\u0107. Bot przeprowadzi trening, gdy b\u0119dziesz mia\u0142 wystarczaj\u0105co du\u017co z\u0142ota.",
		cd: "Nast\u0119pna akcja",
		qj: "Nie",
		rj: "Normalnie",
		xl: "Przeciwnik",
		yl: "Poziom Przeciwnika",
		Dj: "Zadania",
		random: "Losowo",
		Hl: "Ustawienia",
		Tl: "Wkr\u00f3tce...",
		type: "Kliknij na ikony, aby aktywowa\u0107 rodzaje zada\u0144.",
		$l: "Tak",
		A: "Licytacja/Szukaj",
		Bd: "Dodaj przedmioty",
		ik: "Automatycznie Przechowuj Zasoby W\u0142asne",
		Vl: "Zatwierd\u017a",
		rl: "Interwa\u0142 : ",
		gl: "W\u0142\u0105cz Automatyczn\u0105 Licytacj\u0119",
		hl: "Nie licytuj, je\u015bli cz\u0142onek gildii ju\u017c licytowa\u0142",
		Xl: "Samouczek",
		dc: "Wybierz przyciski powy\u017cej, aby wybra\u0107, czy chcesz stawi\u0107 czo\u0142a najni\u017cszemu przeciwnikowi na arenie, czy przeciwnikowi najwy\u017cszego poziomu. Wi\u0119cej u\u017cytkownik\u00f3w spowolni dzia\u0142anie bota.",
		$k: 'Aby rozpocz\u0105\u0107, dodaj przedmiot do listy (np. "Lucius"). Po dodaniu narz\u0119dzie b\u0119dzie szuka\u0107 przedmiotu i wy\u015bwietla\u0107 wyniki wyszukiwania po lewej stronie ekranu. B\u0119dzie r\u00f3wnie\u017c szuka\u0107 przedmiotu w celu automatycznej licytacji. Je\u015bli w\u0142\u0105czysz automatyczn\u0105 licytacj\u0119, narz\u0119dzie b\u0119dzie regularnie szuka\u0107 przedmiotu w okre\u015blonych odst\u0119pach czasu, zgodnie z liczb\u0105 wpisan\u0105 w polu interwa\u0142u. Je\u015bli narz\u0119dzie znajdzie przedmiot i b\u0119dziesz mie\u0107 wystarczaj\u0105co du\u017co pieni\u0119dzy, automatycznie z\u0142o\u017cy za ciebie licytacj\u0119. *Uwaga* aby szuka\u0107 unikalnych przedmiot\u00f3w w sklepach, musisz doda\u0107 przynajmniej 1 losowy przedmiot do listy wyszukiwania.',
		jl: "Numer potwora mo\u017cna wybra\u0107 z przycisk\u00f3w powy\u017cej. Numer 1 reprezentuje potwora najbardziej na lewo. Upewnij si\u0119, \u017ce wybierasz w\u0142a\u015bciw\u0105 lokalizacj\u0119, inaczej bot mo\u017ce si\u0119 zatrzyma\u0107.",
		Ui: "Wybierz trudno\u015b\u0107 lochu z powy\u017cszych opcji. Upewnij si\u0119, \u017ce wybierasz w\u0142a\u015bciw\u0105 lokalizacj\u0119, inaczej bot mo\u017ce si\u0119 zatrzyma\u0107.",
		ej: "Ustawienia Leczenia",
		Vi: "Przechowuj nadmiar z\u0142ota w Gildii, kupuj\u0105c przedmioty z rynku gildii. -> Min. Z\u0142oto",
		ul: "Przenie\u015b Wszystko",
		vl: "Przenie\u015b Wybrane",
		cl: "Auto Uzdrawianie",
		dl: "Procent Auto Uzdrawiania",
		Zl: "Ruby",
		Hg: "Og\u00f3lne Ustawienia",
		Hj: "Sprzedaj Wszystko",
		Ij: "Sprzedaj Wybrane",
		fa: "Bronie",
		ca: "Tarcze",
		U: "Zbroje Piersiowe",
		X: "He\u0142my",
		W: "R\u0119kawice",
		da: "Buty",
		aa: "Pier\u015bcienie",
		T: "Amulety",
		yi: "U\u017cywalne",
		xi: "Ulepszenia",
		Zg: "Receptury",
		og: "Zwoje Najemnik\u00f3w",
		ah: "Wzmocnienia",
		ig: "Sprzedaj \u017bywno\u015b\u0107",
		Eb: "Prze\u0142\u0105cz na \u017bywno\u015b\u0107"
	},
	Lh = {
		Yj: "\u00bfDerretir los colores m\u00e1s altos primero?",
		$b: "\u00bfAtacar solo a la lista de jugadores?",
		ac: "Cuando esta opci\u00f3n est\u00e9 habilitada, el bot solo atacar\u00e1 a los jugadores en la lista de jugadores. Si esta opci\u00f3n no est\u00e1 habilitada, el bot atacar\u00e1 a jugadores aleatorios.",
		Fk: "\u00a1Tus configuraciones de expedici\u00f3n son incorrectas o hay datos de p\u00e1gina inesperados!",
		Gk: "\u00a1Tu configuraci\u00f3n de expedici\u00f3n es incorrecta! Has establecido un monstruo deshabilitado, lo cual est\u00e1 mal.",
		Ba: "Prioridad",
		Sb: "Establecer Prioridad",
		Ng: "Puntos",
		Gh: "Stat",
		Oi: "Recolectar Oro",
		Jj: "Vender en el Inframundo?",
		pj: "El bot buscar\u00e1 el nido en cada acci\u00f3n, no solo en expediciones.",
		nj: "Tipo de b\u00fasqueda de nido",
		lj: "No hacer nada",
		mj: "B\u00fasqueda r\u00e1pida",
		oj: "B\u00fasqueda exhaustiva",
		El: "After expedition points are consumed, travel to Germania to consume Dungeon points",
		sk: "Haz clic aqu\u00ed si la reparaci\u00f3n se atasca",
		Hk: "Cuando los HP est\u00e9n bajos, usa curar",
		Jg: "Reparaci\u00f3n Parcial",
		Ye: "Reparaci\u00f3n Completa",
		Ig: "Reparaci\u00f3n Parcial o Completa",
		pe: "Habilitar L\u00edmite",
		gj: "L\u00edmite",
		hj: "Si deseas limitar el n\u00famero de veces que quieres atacar al enemigo, habilita esta opci\u00f3n y establece el l\u00edmite. El bot continuar\u00e1 atacando al resto de los enemigos despu\u00e9s de terminar de atacar al monstruo seleccionado.",
		ke: "No entres al inframundo con el traje del inframundo",
		je: "Si no quieres entrar al inframundo mientras llevas el traje del inframundo puesto, activa esta opci\u00f3n",
		ui: "Inframundo",
		li: "Mejoras del Inframundo",
		ni: "\u00bfUsar los poderes de los dioses despu\u00e9s de entrar al inframundo?",
		oi: "Selecciona a los dioses para usar sus poderes:",
		pi: "\u00bfUsar Buff de Arma en el arma?",
		ri: "\u00bfUsar Buff de Armadura en el siguiente equipo?",
		Ck: "El tiempo de enfriamiento es de 30 minutos. Si no llevas un disfraz, el bot restablecer\u00e1 el tiempo de enfriamiento a 0.",
		Uk: "Seleccionar Colores",
		Ya: "Forja de Vulcano",
		bb: "Escudo Terrestre de Feronia",
		cb: "Poder Fluido de Neptuno",
		eb: "Libertad A\u00e9rea de Aelous",
		fb: "Niebla Mortal de Plut\u00f3n",
		gb: "Aliento de Vida de Juno",
		hb: "Armadura de Escamas de las Monta\u00f1as de la Ira",
		ib: "Ojos de \u00c1guila",
		jb: "Vestidura Invernal de Saturno",
		Za: "Armadura de Toro de Bubona",
		$a: "Vestiduras de Ladr\u00f3n de Mercurio",
		ab: "T\u00fanica de Luz de Ra",
		hg: "Paquetes",
		cg: "Inventario",
		K: "Precio M\u00edn.",
		J: "Cantidad",
		Db: "Vender Art\u00edculos",
		Cb: "Buscar en",
		dg: "Color del Material",
		Bb: "Color del Art\u00edculo",
		kg: "Almac\u00e9n",
		za: "Cambiar a Materiales",
		Fb: "Cambiar a Art\u00edculos",
		jg: "Vender Materiales",
		wa: "Por favor, introduce un nombre de art\u00edculo v\u00e1lido, rango de precio y cantidad.",
		xa: "No se han encontrado art\u00edculos adecuados en las ubicaciones de b\u00fasqueda seleccionadas.",
		ya: "\u00a1Todos los art\u00edculos fueron listados con \u00e9xito!",
		Nk: "\u00a1Todos los materiales fueron listados con \u00e9xito!",
		fg: "Si quieres vender art\u00edculos a un precio fijo, puedes ingresar el mismo valor para el precio m\u00ednimo y m\u00e1ximo.",
		gg: "Esta caracter\u00edstica todav\u00eda es experimental, \u00fasala con precauci\u00f3n. Si no pones un precio fijo, los art\u00edculos se listar\u00e1n aleatoriamente entre el precio m\u00ednimo y m\u00e1ximo que ingreses.",
		yk: "Establece el m\u00e1ximo de oro que el bot gastar\u00e1 por ciclo.",
		Ta: "El bot comenzar\u00e1 a pujar por cualquier art\u00edculo de comida, si est\u00e1 habilitado. No necesitas habilitar los interruptores de gladiador/mercenario.",
		Jd: "El bot no pujar\u00e1 sobre las ofertas de los aliados.",
		Kd: "Ignorar la combinaci\u00f3n de Prefijo/Sufijo al buscar un art\u00edculo en la subasta.",
		Qj: "Selecciona los tipos de art\u00edculos que quieres fundir.",
		Rj: "Selecciona los colores que quieres fundir.",
		Sj: "Selecciona el nivel de los art\u00edculos que quieres fundir.",
		Tj: "Selecciona el martillo que quieres usar.",
		Uj: "Nota que el c\u00edrculo verde y rojo junto a la primera caja son para habilitar/deshabilitar la regla.",
		Vj: "Si quieres fundir aleatoriamente cualquier color o tipo, puedes habilitar `\u00bfFundir aleatoriamente si no se cumplen condiciones? (\u00daltima opci\u00f3n habilitada en el video tutorial)",
		Fj: "Reparar antes de fundir?",
		Le: "Seleccionar Monstruo",
		ze: "\u00bfUsar Reloj de Arena/Rub\u00ed?",
		Ek: "\u00bfUsar Rub\u00ed?",
		Ce: "\u00bfUsar Movilizaci\u00f3n?",
		Be: "\u00bfUsar Poci\u00f3n de Vida?",
		ye: "Porcentaje de Curaci\u00f3n (%)",
		Je: "N\u00famero de Ataques",
		Ae: "Intervalo de Ataque (en segundos)",
		we: "Ataques Realizados",
		xe: "Reloj de Arena Restante",
		He: "Nota: Usa pociones de vida para curar, no comida.",
		Ie: "Nota: Si los ataques se detienen prematuramente, intenta 'Reiniciar Ataques'.",
		Me: "Comenzar",
		Ke: "Reiniciar",
		Ne: "Detener",
		Oe: "Configuraci\u00f3n de Expedici\u00f3n (Clic para minimizar)",
		De: "Monstruo 1",
		Ee: "Monstruo 2",
		Fe: "Monstruo 3",
		Ge: "Monstruo 4",
		Qk: "Reparar antes de fundir?",
		Mi: "Esta opci\u00f3n usar\u00e1 cervisia cuando tu premium expire.",
		sj: "Esta opci\u00f3n activa y selecciona aceites de las recompensas de los dioses. Puede usar los aceites n\u00famero 1 y n\u00famero 3 en el personaje, pero el n\u00famero 2 solo ser\u00e1 recogido para los paquetes.",
		Ki: "Esta opci\u00f3n usar\u00e1 buffs en el momento que establezcas. Encontrar\u00e1 buffs en los paquetes y los aplicar\u00e1 al personaje.",
		ij: "Esta opci\u00f3n te llevar\u00e1 al inframundo. No olvides activar el Inicio de Sesi\u00f3n Autom\u00e1tico desde la pesta\u00f1a de Extras, de lo contrario podr\u00edas desconectarte al entrar al inframundo [Error del Juego]",
		bc: "Esta op\u00e7\u00e3o atacar\u00e1 apenas a lista de arena/circo. Se n\u00e3o puder, o bot pular\u00e1.",
		Cj: "Esta opci\u00f3n es solo para licencias premium. Simula el ataque antes de atacar a un usuario para un ratio de victoria del 75%.",
		Md: "No necesitas activar el interruptor principal de subastas para habilitar esta opci\u00f3n.",
		kk: "Esta opci\u00f3n refrescar\u00e1 la p\u00e1gina cada segundo cuando la subasta est\u00e9 en estado -Muy Corto- para ofertar constantemente y ganar la subasta.",
		Oj: "Si ninguna de las condiciones de fundici\u00f3n se cumple, fundir\u00e1 aleatoriamente. Aseg\u00farate de seleccionar tipo de objeto y color.",
		Pj: "Esta opci\u00f3n solo fundir\u00e1 art\u00edculos del inventario. Ignorar\u00e1 los art\u00edculos en los paquetes.",
		Ua: "Art\u00edculos de Subasta",
		ng: "Art\u00edculos de Mercenario",
		Ub: "Art\u00edculos de la Tienda",
		wi: "Art\u00edculos \u00danicos",
		Kj: "Establecer fondo en negro [Aumenta el rendimiento]",
		Lj: "Mover los botones de Gladbot a la parte inferior izquierda?",
		Ni: "Atacar al circo sin sanar",
		jk: "\u00bfRecoger oro de los paquetes si es necesario?",
		Wl: "Se ha recogido oro de los paquetes para entrenamiento",
		Dd: "No se ha encontrado oro en los paquetes para entrenamiento",
		gk: "Objetos Reparados",
		$j: "Ataques en la Arena",
		bk: "Ataques en el Circo",
		Cd: "Objetos Reiniciados",
		ek: "Ataques en Expediciones",
		dk: "Ataques en Mazmorras",
		hk: "Ataques en el Inframundo",
		ak: "Dinero Ganado en la Arena",
		ck: "Dinero Ganado en el Circo",
		Ul: "Objetos Fundidos",
		fk: "Oro Reciclado",
		$i: "Batalla de Gremio",
		bj: "Configuraci\u00f3n del Gremio",
		ll: "Atacar\u00e1 gremios al azar.",
		aj: "Nombre del Gremio",
		Zi: "Atacar Guilds Aleatoriamente",
		Li: "Restablecer Estad\u00edsticas",
		wl: 'GladBot: usa los dados para actualizar la caja misteriosa y encontrar objetos valiosos antes de abrirla (por ejemplo, disfraces). Haz clic en "Iniciar" para abrir los cofres.',
		Nc: "Madera",
		Dc: "Cobre",
		Hc: "Hierro",
		Jc: "Cuero",
		Oc: "Hilo de lana",
		Ec: "Bolas de algod\u00f3n",
		Gc: "C\u00e1\u00f1amo",
		Fc: "Tiras de gasa",
		Kc: "Lino",
		Ic: "Yute",
		Mc: "Tiras de terciopelo",
		Lc: "Hilo de seda",
		Wc: "Pelaje",
		Qc: "Astilla \u00f3sea",
		Zc: "Escama",
		Tc: "Garra",
		Vc: "Colmillo",
		Uc: "Escama de drag\u00f3n",
		Rc: "Cuerno de toro",
		Yc: "Gl\u00e1ndula venenosa",
		Sc: "Pelaje de Cerbero",
		Xc: "Escama de Hidra",
		$c: "Pluma de Esfinge",
		ad: "Piel de Tif\u00f3n",
		zc: "Lapisl\u00e1zuli",
		tc: "Amatista",
		sc: "\u00c1mbar",
		uc: "Aguamarina",
		Ac: "Safiro",
		xc: "Granate",
		wc: "Esmeralda",
		vc: "Diamante",
		yc: "Jaspe",
		Bc: "Sugilita",
		nc: "Veneno de escorpi\u00f3n",
		qc: "Tintura de la resistencia",
		jc: "Ant\u00eddoto",
		ic: "Adrenalina",
		pc: "Tintura de la inspiraci\u00f3n",
		mc: "Poci\u00f3n de percepci\u00f3n",
		kc: "Esencia de reflejos",
		lc: "Frasco de carisma",
		rc: "Agua del olvido",
		oc: "Esencia de alma",
		Ad: "Sello acu\u00e1tico",
		ud: "Runa protectora",
		sd: "Grabado terrestre",
		zd: "T\u00f3tem curativo",
		yd: "Talism\u00e1n de poder",
		wd: "Piedra de la fortuna",
		td: "Pedernal",
		xd: "Runa de la tormenta",
		vd: "Runa de las sombras",
		fd: "Cristal",
		ed: "Bronce",
		kd: "Obsidiana",
		nd: "Plata",
		od: "Azufre",
		hd: "Mena de oro",
		md: "Cuarzo",
		ld: "Platino",
		dd: "Almandino",
		gd: "Cuprita",
		jd: "Piedra infernal",
		Hi: "\u00bfAtacar aleatoriamente?",
		Ii: 'Tambi\u00e9n desactiva la configuraci\u00f3n "Ordenar jugadores en la arena por nivel" en crazy-addon.',
		Wg: "Aceptar solo misiones basadas en el tipo de dios.",
		Va: "Auto Buff",
		$d: "\u00bfUsar solo en el infierno?",
		Cg: "Nueva Regla",
		Ag: "Nombre Contiene",
		isUnderworldItem: "\u00bfEs un objeto del inframundo?",
		gf: "Ignorar Materiales",
		rk: "\u00bfUsar Oraci\u00f3n?",
		Ci: "Usar Sacrificio",
		mk: "Usar Tela para entrar en el Inframundo",
		ti: "\u00bfCuando est\u00e9s en el inframundo, solo aceptar misiones relacionadas con el inframundo?",
		si: "Si est\u00e1 habilitado, necesitas ingresar los nombres de los objetos del inframundo. Si el bot encuentra estos objetos en el inframundo, aceptar\u00e1 la misi\u00f3n.",
		Yk: "Objeto de Misi\u00f3n del Inframundo",
		il: "Introduzca el nombre del material",
		Bk: "\u00a1El robot adora los dados! Le ayudan a encontrar ropa en los cofres. Pero si no hay dados, el robot abre los cofres de todos modos, con la esperanza de encontrar ropa genial (\u00a1pero puede que no encuentre nada!)",
		Nj: "\u00bfFusionar Cajas de Bot\u00edn?",
		oe: "Habilitar Arena",
		Og: "\u00bfPriorizar lista de arenas?",
		Pg: "\u00bfPriorizar lista de circos?",
		ge: "Desactivar men\u00fa de registro",
		kh: "Valor m\u00ednimo de recompensa en oro",
		Xg: "Si est\u00e1 habilitado, el Enfoque en misiones seguir\u00e1 el camino m\u00e1s corto para terminar el calabozo.",
		Jh: "\u00bfLanzar dados autom\u00e1ticamente?",
		Kh: "Usa el lanzamiento de dados con cautela, seguir\u00e1 usando el primer dado hasta que desactives la opci\u00f3n.",
		ph: "Progreso de b\u00fasqueda",
		eh: "El tiempo de enfriamiento para la reparaci\u00f3n por defecto es de 10 minutos.",
		xg: "Condici\u00f3n m\u00ednima",
		ee: "Art\u00edculo actual en el banco de trabajo [Borrar si el bot se detiene inesperadamente]",
		Df: "Recursos de forja almacenados en el horreum con \u00e9xito.",
		zf: "Comprobando el mercado para art\u00edculos...",
		yb: "Art\u00edculo movido al banco de trabajo.",
		Qf: "Art\u00edculo reparado y equipado con \u00e9xito.",
		Rf: "Art\u00edculo reparado con \u00e9xito.",
		Lk: "La reparaci\u00f3n fall\u00f3. La p\u00e1gina se actualizar\u00e1.",
		Nf: "Recogiendo materiales...",
		Zf: "Esperando reparaci\u00f3n...",
		Pf: "La reparaci\u00f3n ha comenzado para .",
		va: "Reparaci\u00f3n: Moviendo el art\u00edculo del inventario a la bolsa",
		Of: "Reparaci\u00f3n: Moviendo el art\u00edculo del banco de trabajo al paquete.",
		ta: "No se pudieron encontrar suficientes materiales. Desactivando la ranura de reparaci\u00f3n ",
		Kf: "Buscando art\u00edculos para comprar y ocultar oro en la subasta...",
		wf: "Comprobando los art\u00edculos caducados en los paquetes...",
		xf: "Art\u00edculo reseteado con \u00e9xito.",
		yf: "Sin espacio vac\u00edo o oro para resetear.",
		Ef: "\u00a1Aseg\u00farate de tener derechos de venta en el mercado de la guild!",
		sb: "No hay suficiente oro o ning\u00fan art\u00edculo para comprar. Esperando 30 segundos para actualizar.",
		ub: "La tienda ha sido actualizada.",
		vb: "Error durante la curaci\u00f3n.",
		Hf: "Sin Rub\u00ed o Tela, desactivando las opciones.",
		Kk: "No se encontr\u00f3 ning\u00fan art\u00edculo de curaci\u00f3n en los paquetes.",
		wb: "No se encontraron art\u00edculos adecuados",
		If: "Se han recogido alimentos. Finalizando el proceso.",
		Jf: "Se ha recogido al menos un alimento. Finalizando el proceso.",
		xb: "No se encontr\u00f3 espacio adecuado en la bolsa para recoger comida.",
		Ff: "Obteniendo alimentos de los paquetes.",
		Gf: "No se encontr\u00f3 espacio adecuado en la bolsa para recoger comida.",
		tb: "No hay m\u00e1s art\u00edculos de curaci\u00f3n. Esperando 30 segundos.",
		rb: "Puntos de vida recuperados.",
		ua: "\u00a1No hay nada que hacer, as\u00ed que voy a rezar!",
		Vf: "Voy a actualizar en 60 segundos para revisar mi salud y Villa Medici.",
		Wf: "Esperando Villa Medici, actualizando en 60 segundos.",
		Xf: "Sal\u00ed del inframundo.",
		Yf: "Voy a actualizar en 60 segundos para revisar mi salud.",
		Lf: "Comprobando aceites divinos...",
		Mf: "Los aceites divinos han sido recogidos.",
		ra: "Atacado con \u00e9xito al jugador en la ARENA: ",
		sa: "Atacado con \u00e9xito al jugador en el CIRCO: ",
		uf: "\u00a1Comprobando subasta! Por favor, espere...",
		vf: "Pujando por art\u00edculos. Por favor, espere...",
		Sf: "Art\u00edculo fundido autom\u00e1ticamente: ",
		Tf: "Fundiendo art\u00edculo: ",
		zb: "No hay suficiente oro para fundir. Oro requerido: ",
		Uf: "FUNDIR: Buscando art\u00edculos para fundir...",
		Mk: "Buscando art\u00edculos para fundir...",
		Af: "Comprobando disponibilidad de disfraces...",
		Cf: "Donado : ",
		Bf: "Lanzando dados...",
		Ue: "Underworld Farm [Manual, Beta]",
		Te: "Farm Location",
		Ve: "Tenga en cuenta: active esta funci\u00f3n despu\u00e9s de desbloquear la criatura que desea atacar, no atacar\u00e1 autom\u00e1ticamente para desbloquear el monstruo.",
		Se: "Farm Enemy",
		Td: "Inicio Autom\u00e1tico",
		Ud: "Necesitas permitir las ventanas emergentes desde la pantalla del lobby de GameForge. Consulta la documentaci\u00f3n sobre c\u00f3mo hacerlo.",
		Kg: "Pausar Bot",
		Lg: "Pausar Bot en (Minutos)",
		Qe: "Fecha de Expiraci\u00f3n",
		Fg: "\u00bfComprar solo comida?",
		Gg: "Si activas esto, el bot ignorar\u00e1 tus selecciones y comprar\u00e1 comida autom\u00e1ticamente sin ingresar nada.",
		Hb: "M\u00e1ximo de oro total para gastar",
		Gb: "M\u00e1ximo de oro por comida para gastar",
		Eg: "El bot verificar\u00e1 los aceites cada 60 minutos",
		bi: "Establece un temporizador para verificar los tiempos de fundici\u00f3n.",
		Zh: "Establece un temporizador para verificar la fundici\u00f3n cuando no tengas oro.",
		ai: "Establece un temporizador para verificar la fundici\u00f3n si no tienes el art\u00edculo disponible.",
		Uh: "Establece un temporizador para reparar y verificar tus objetos.",
		Th: "Establece un temporizador para verificar el oro en el mercado de la hermandad.",
		Ph: "Establece un temporizador para la opci\u00f3n de retenci\u00f3n de oro en la subasta.",
		Lh: "Establece un temporizador para verificar la lista de PVP en la arena para atacar.",
		Qh: "Establece un temporizador para verificar la lista de PVP en el circo para atacar.",
		hi: "Establece un temporizador para entrenar tus estad\u00edsticas.",
		Wh: "Establece un temporizador para reiniciar los objetos caducados.",
		fi: "Establece un temporizador para almacenar los materiales de forja en el horreo.",
		Nh: "Establece un temporizador para verificar la subasta de gladiadores y mercenarios.",
		Yh: "Establece un temporizador para buscar objetos en la subasta y la tienda.",
		Rh: "Establece el temporizador para enviar donaciones a la hermandad.",
		Ze: "Oro Movido",
		le: "No vender art\u00edculos de la lista de fundici\u00f3n y subasta.",
		qh: "Automatizaci\u00f3n de la Tienda",
		th: "Configuraci\u00f3n de B\u00fasqueda de Objetos",
		rh: "Utiliza esta herramienta para buscar objetos. Simplemente agrega los objetos a la lista, especifica la cantidad de tela y comienza la b\u00fasqueda.",
		uh: "Telas a Usar:",
		vh: "\u00bfCu\u00e1ntas telas usar?",
		ea: "Full Ingresa el Nombre del Objeto",
		Tb: "Ingresa el Nivel del Objeto",
		xh: "Calidad del Objeto",
		wh: "Nombre del Objeto Aqu\u00ed",
		yh: "Comenzar B\u00fasqueda",
		zh: "Saltar y Continuar",
		Ah: "Detener B\u00fasqueda",
		We: "\u00bfComprar lo m\u00e1s barato o lo m\u00e1s caro?",
		zg: "M\u00e1s Caros",
		be: "M\u00e1s Baratos",
		ba: "Selecciona una Opci\u00f3n",
		qe: "Pod\u015bwietl przedmioty z Podziemia",
		Xe: "\u00bfCentrarse en la b\u00fasqueda",
		Yl: "\u00bfUsar Ruby si no hay tela",
		Wa: "Evita atacar a las mismas personas para no ser reportado. Ser reportado aumenta las posibilidades de ser baneado.",
		Ml: "\u00bfDerretir verde?",
		Rg: "\u00bfNo aceptar misiones aleatorias si se han introducido filtros?",
		Pc: "Calidad m\u00e1xima del material a utilizar",
		Wi: "Habilitar la b\u00fasqueda de mercenarios",
		sl: "Haz clic en `Vender Todo Seleccionado` para vender todos los elementos. Aseg\u00farate de tener espacio vac\u00edo de 2x3 en tu primera (1) bolsa. Para recoger oro en masa, filtra el oro y usa `Seleccionar Seleccionados o Seleccionar Todo`.",
		Zj: "\ud83d\udd25 : A\u00f1ade elemento a la lista de fundici\u00f3n.",
		Ji: "\ud83d\udd28 : A\u00f1ade elemento a la lista de subastas.",
		Ej: "Actualiza la tienda con tela cuando est\u00e9 llena",
		Al: "P\u00e1gina:",
		Aj: "Detener",
		yj: "Vender Esta P\u00e1gina",
		vj: "Seleccionar Seleccionados",
		uj: "Seleccionar Todo",
		Bj: "Configuraci\u00f3n de Empaquetado Autom\u00e1tico",
		zj: "Enviar Recursos",
		wj: "Vender Todo Seleccionado",
		ma: "Tipo de Objeto",
		oa: "Armas",
		S: "Escudos",
		M: "Armaduras",
		P: "Cascos",
		O: "Guantes",
		N: "Botas",
		na: "Anillos",
		ka: "Amuletos",
		Ia: "Utilizables (Comida)",
		Na: "Mejoras",
		tj: "Potenciadores",
		Ka: "Recetas",
		Ja: "Mercenarios",
		Ma: "Herramientas de Forja",
		La: "Pergaminos",
		rd: "Refuerzos",
		pd: "Objetos de Evento",
		qd: "Materiales de Forja",
		zl: "Oro",
		Ha: "Todo",
		Bl: "Calidad",
		pa: "Blanco",
		C: "Verde",
		B: "Azul",
		D: "Morado",
		H: "Naranja",
		R: "Rojo",
		xj: "Opciones de Venta",
		Mj: "\u00bfIgnorar Combinaci\u00f3n de Prefijo/Sufijo?",
		cj: "\u00bfCu\u00e1nta comida comprar/recoger?",
		Ri: "Normal",
		Qi: "Intermedio",
		Pi: "Dif\u00edcil",
		Ea: "Est\u00e1ndar",
		Fl: "Reparar Correcci\u00f3n de Atascos",
		Ik: "Desactiva la entrada al Infierno si deseas desactivar la Mazmorra/Circo/Arena. Si entraste al Infierno manualmente, deber\u00e1s activar el Modo Infierno.",
		ce: "Wybierz kostium z Za\u015bwiat\u00f3w",
		Fi: "Nosi\u0107 kostium z Za\u015bwiat\u00f3w, gdy jest dost\u0119pny?",
		ki: "Indica cu\u00e1ntas veces deseas entrenar las estad\u00edsticas y establece sus prioridades. El bot no entrenar\u00e1 a menos que se establezca una prioridad. Si hay una prioridad configurada pero no quedan m\u00e1s estad\u00edsticas por entrenar, el bot continuar\u00e1 con la estad\u00edstica seleccionada.",
		el: "Quest",
		Kl: "Fundir",
		Rl: "Configuraci\u00f3n de Fundici\u00f3n",
		Wj: "Objetos Fundidos",
		Sl: "Agrega Prefijos o Sufijos, una vez que los encuentre en los paquetes, se fundir\u00e1n autom\u00e1ticamente:",
		Ql: "Objeto en Fundici\u00f3n:",
		ec: "Haz clic en el objeto que deseas reparar. Este sistema reparar\u00e1 a tus dos personajes, el principal y el primer personaje de circo. Debes tener al menos 10000 de oro para que comience la reparaci\u00f3n. Si se queda atascado en un objeto, significa que no tienes material para arreglarlo. Tambi\u00e9n trata de hacer espacio en tu inventario. El bot iniciar\u00e1 la reparaci\u00f3n una vez que el objeto tenga un %0 de durabilidad.",
		Zk: "Aplicar solo a Mercenarios",
		bl: "La subasta solo pujar\u00e1 cuando el mercado est\u00e9 cerca del final.",
		al: "Aseg\u00farate de que la SEGUNDA PESTA\u00d1A DEL INVENTARIO est\u00e9 vac\u00eda y tenga 10K de oro. El bot encontrar\u00e1 y colocar\u00e1 el objeto en la segunda pesta\u00f1a y luego, la pr\u00f3xima vez que se actualice la p\u00e1gina, fundir\u00e1 el objeto. La fundici\u00f3n se revisar\u00e1 cada 5-10 minutos.",
		fj: "Curar & Buffs",
		Gl: "No hay suficiente oro para fundir. Oro requerido:",
		Jl: "Saltando puja: El miembro del gremio ya ha pujado por el objeto ",
		Il: "Saltando puja: Ya has pujado por el objeto ",
		advanced: "Avanzado",
		arena: "Arena",
		ia: "Auto Ataque",
		cc: "Evitar Ataque",
		ga: "Agregar Jugador",
		ha: "Agregar Nombre de Jugador (Same Server)",
		nl: "\u00bfDetener el bot si se queda sin comida?",
		circusTurma: "Circo Turma",
		Si: "Dificultad",
		dungeon: "Mazmorra",
		Ti: "Configuraci\u00f3n de Mazmorra",
		eventExpedition: "Expedici\u00f3n de Evento",
		expedition: "Expedici\u00f3n",
		Xi: "Configuraci\u00f3n de Expedici\u00f3n",
		Gj: "Seleccionar Monstruo",
		pl: "M\u00e1s Alto",
		ol: "Coloca tus objetos de curaci\u00f3n en la primera p\u00e1gina de tu inventario",
		Cc: "En",
		Hh: "Almacenar Oro",
		Ih: "\u00bfAlmacenar Oro en Subasta?",
		nh: "\u00bfUsar Ropa de Trabajo para renovar la Tienda?",
		Sk: "Seleccionar Objetos para Reiniciar",
		gh: "Reiniciar Objetos Expirados",
		Nb: "Nota: Al habilitar esta opci\u00f3n, el bot vender\u00e1 los objetos pr\u00f3ximos a expirar de los Paquetes al Mercado del Gremio y luego los cancelar\u00e1 para reiniciar el tiempo de vencimiento. Se requiere el Gremio. Aseg\u00farate de tener un espacio vac\u00edo de 3x3 en tus bolsas.",
		Mg: "Pausar el bot aleatoriamente para funcionar como [Fase de Pruebas]:",
		Y: "Mantener Oro: El bot mantendr\u00e1 este oro en la bolsa:",
		lg: "Oro M\u00e1ximo: El bot gastar\u00e1 cuando el oro sea mayor que",
		lh: "El bot pujar\u00e1 por art\u00edculos aleatorios",
		Ed: "Agregar Retraso Aleatorio",
		Fd: "Puedes agregar un retraso al bot aqu\u00ed.",
		Mb: "Reparar",
		Ll: "\u00bfFundir solo Azules?",
		Ol: "\u00bfFundir solo P\u00farpuras?",
		Nl: "\u00bfFundir solo Naranjas?",
		Xj: "\u00bfFundir Todo en la 2da pesta\u00f1a?",
		Pl: "Esto ignorar\u00e1 las selecciones de colores",
		Xa: "Limpiar Historial",
		Ch: "Fundir",
		Nd: "Search",
		Bg: "Subasta Autom\u00e1tica",
		Od: "El uso excesivo de la Subasta podr\u00eda resultar en una prohibici\u00f3n. Se recomienda desactivar otras funciones de oferta para evitar posibles conflictos. Esta caracter\u00edstica ralentizar\u00e1 el bot.",
		mh: "Buscar en la Subasta de Gladiadores",
		oh: "Buscar en la Subasta de Mercenarios",
		Wd: "\u00bfPujar por Comida?",
		mg: "Puja M\u00e1xima",
		Xd: "Pujar si el estado es menor que",
		Yd: "Objetos Pujados",
		wk: "Idioma de Subasta",
		xk: "Seg\u00fan la actualizaci\u00f3n 2.9.4, establece el idioma nuevamente o REINICIA EL BOT. Aseg\u00farate de que todos sean correctos, de lo contrario, no pujar\u00e1.",
		Id: "Puedes agregar objetos para buscar en el mercado y en la subasta. Tambi\u00e9n mostrar\u00e1 objetos p\u00farpuras en el mercado una vez que agregues un objeto a la lista. Si deseas habilitar la puja autom\u00e1tica, usa las opciones a continuaci\u00f3n",
		uk: "\u00a1Usa la subasta con precauci\u00f3n!",
		vk: "La puja autom\u00e1tica realiza demasiadas solicitudes al servidor y puede causar una prohibici\u00f3n si se usa todo el tiempo.",
		dh: "\u00bfRenovar Puntos de Evento con Rub\u00edes?",
		se: "\u00bfHabilitar Aceite Autom\u00e1tico?",
		zk: "\u00bfObtener Aceites Sagrados Autom\u00e1ticamente?",
		Ok: "Velocidad de Verificaci\u00f3n de Misiones",
		Sa: "\u00bfAtacar a Miembros del Gremio?",
		Qa: 'Agregar autom\u00e1ticamente a las personas a la lista de "Ataque" cuando se roban m\u00e1s de X ORO.:',
		Ra: 'Agregar autom\u00e1ticamente a las personas a la lista de "Evitar Ataque" cuando pierdas contra ellas.:',
		Qb: "Ataques en el Marcador",
		Yb: "Muy Largo",
		Ab: "Largo",
		Ib: "Medio",
		Vb: "Corto",
		Zb: "Muy Corto",
		te: "Entrar al Inframundo si HP >",
		Yg: "Velocidad de Verificaci\u00f3n de Misiones",
		Qg: 'El valor predeterminado es "3x". Si el bot causa problemas con las misiones, cambia la velocidad de las misiones seg\u00fan la velocidad de tu servidor.',
		$e: "Selecci\u00f3n de Bolsa de Curaci\u00f3n",
		ue: 'Si est\u00e1s renovando puntos manualmente, debes hacer clic en el bot\u00f3n de arriba "Actualizar expedici\u00f3n de evento si est\u00e1 atascada".',
		Dk: "Debes habilitar al menos una de las siguientes opciones: expedici\u00f3n, mazmorra, arena o circo para comenzar la Expedici\u00f3n de Evento.",
		$g: "\u00a1Actualiza la Expedici\u00f3n de Evento si est\u00e1 atascada!",
		kb: "\u00bfCubrir a los Aliados?",
		Vk: "Deja todas las configuraciones desactivadas si deseas fundir usando paquetes que contienen los elementos de la lista. Sin embargo, a\u00fan puedes elegir colores.",
		Ak: "Personaje(Desactivado) / Mercenario(Activado)",
		Rk: "\u00bfReparar Ambos?",
		Wk: "Temporizadores",
		Timers: "Ingresa el n\u00famero de minutos para cada temporizador a continuaci\u00f3n o d\u00e9jalo en su valor predeterminado.",
		Vg: "Ignorar Filtro de Misiones",
		Ug: "Ingresa palabras clave para filtrar las misiones que no deseas tomar. You can also use this to accept quests by their reward using keywords.",
		V: "Ingresar Palabra Clave",
		I: "Agregar",
		bh: "Eliminar",
		de: "Limpiar",
		Sg: "Aceptar Filtro de Misiones",
		Tg: "Ingresa palabras clave para seleccionar qu\u00e9 misiones tomar. Usar esto ignorar\u00e1 los tipos de misiones",
		Ca: "\u00bfSaltar Misiones Temporales?",
		Pk: "Misiones",
		Qd: "Auto Traje",
		zi: "\u00bfUsar Traje?",
		Vd: "Batalla B\u00e1sica",
		me: "Batalla en Mazmorra",
		Rd: "Bot solo usar\u00e1 Dis Pater Normal y Medium si tus puntos de expedici\u00f3n/mazmorra son 0.",
		bf: "Configuraci\u00f3n de Sanaci\u00f3n Infernal",
		Hd: "\u00bfAtacar al Jefe cuando est\u00e9 disponible?",
		qb: "La opci\u00f3n de ataque a la Liga se desactivar\u00e1 despu\u00e9s de 5 intentos fallidos.",
		ef: "Aceites Sagrados",
		wg: "Nombre del Objeto",
		Z: "Nivel M\u00ednimo del Objeto",
		Aa: "Calidad M\u00ednima del Objeto",
		Gd: "Aplicar/Restablecer Temporizador",
		hf: "Ignorar Combinaci\u00f3n de Prefijo/Sufijo",
		Gi: "S\u00ed",
		Dg: "No",
		Oa: "Agregar Prefijo",
		Pa: "Agregar Sufijo",
		Dh: "Lista de Objetos a Ignorar al Fundir",
		Jb: "Prefijo",
		Wb: "Sufijo",
		ih: "Restablecer Objetos Expirados",
		Eh: "\u00bfFundir al Azar desde los Paquetes?",
		Fh: "Pesta\u00f1a de Fundici\u00f3n",
		ob: "Extras",
		Ld: "Subasta",
		eg: "Mercado",
		Xb: "Temporizadores",
		di: "Fundici\u00f3n",
		ci: "Fundici\u00f3n si no hay suficiente oro",
		$h: "Fundir si no hay objeto",
		Da: "Reparaci\u00f3n",
		Sh: "Mantener Oro en el Mercado de Gremio",
		Oh: "Mantener Oro en la Subasta",
		gi: "Entrenamiento",
		Vh: "Restablecer Expirados",
		ei: "Almacenar en la Forja",
		Mh: "Comprobar Subasta",
		Xh: "Buscar",
		v: "Habilitar",
		yg: "Oro M\u00ednimo",
		Rb: "Seleccionar Hora",
		lb: "Donar Oro al Gremio",
		he: "Donar\u00e1 cada 5 minutos. Puedes cambiar el intervalo desde la pesta\u00f1a de temporizadores",
		ff: "\u00bfCu\u00e1nto deseas donar?",
		ie: "Donar cuando tengas m\u00e1s de >",
		tf: "Menos de <",
		fh: "Restablecer Objetos Expirados y Otras Configuraciones",
		hh: "Restablecer en:",
		Jk: "Mant\u00e9n presionada la tecla Ctrl (Cmd en Mac) para seleccionar varios objetos",
		jf: "Importar/Exportar Configuraciones",
		Re: "Exportar Configuraciones",
		kf: "Importar Configuraciones",
		pg: "Mensaje a Todos los Jugadores",
		qg: "[Requiere Clave Ultra Premium, mensaje en Discord para obtenerla.]",
		rg: "Ingresar mensaje para enviar",
		fe: "Para scripts personalizados, cont\u00e1ctanos en Discord",
		tg: "Enviar",
		ug: "Mostrar Jugadores",
		sg: "Seleccionar Todos",
		vg: "Deseleccionar Todos",
		sf: "Aseg\u00farate de que tu inventario tenga suficiente espacio. El tiempo de reutilizaci\u00f3n es de 2 minutos.",
		nb: "Habilitar Ataque en el Marcador:",
		Ob: "Seleccionar Rango para Atacar",
		Pb: "El bot atacar\u00e1 aleatoriamente desde la lista del marcador.",
		pb: "Ataque de Liga",
		mb: "Habilitar Ataque de Liga:",
		Kb: "Ataque Aleatorio",
		Lb: "Atacar desde el m\u00e1s bajo al m\u00e1s alto",
		tk: "El bot evitar\u00e1 atacar a los miembros del gremio por defecto.",
		Pe: "Ubicaci\u00f3n de Expedici\u00f3n:",
		Pd: "\u00bfRecoger Bonos Autom\u00e1ticamente?",
		Bh: "\u00bfSaltar al Jefe?",
		ne: "Ubicaci\u00f3n de Mazmorra:",
		jh: "\u00bfReiniciar si pierdes?",
		cf: "Configuraci\u00f3n de Inframundo",
		df: "Configura tus ajustes de porcentaje de curaci\u00f3n desde la pesta\u00f1a de curaci\u00f3n y aseg\u00farate de que est\u00e9 activada. Si ingresar al inframundo te desconecta, ve al lobby y activa la casilla de inicio de sesi\u00f3n autom\u00e1tico.",
		af: "Dificultad del Inframundo",
		Sd: "Entrar Autom\u00e1ticamente al Inframundo: / Inframundo Mode",
		Ai: "\u00bfUsar Movilizaci\u00f3n si los puntos = 0",
		Ei: "\u00bfUsar Rub\u00edes?",
		ve: "\u00bfSalir del inframundo si no hay puntos?",
		mi: "El bot intentar\u00e1 usar villa medici primero, si no la tienes, usar\u00e1 poci\u00f3n de curaci\u00f3n. No olvides activar el interruptor de Curar.",
		vi: "El ingreso autom\u00e1tico al inframundo deshabilitar\u00e1 la mazmorra/arena/circo al ingresar al inframundo.",
		Xk: "Ajustes de Curaci\u00f3n del Inframundo",
		Di: "\u00bfUsar Villa Medici?",
		Bi: "\u00bfUsar Poci\u00f3n de Curaci\u00f3n?",
		$f: "INFO: El bot buscar\u00e1 objetos en el mercado cada ciertos minutos, lo que puede detener los ataques durante la b\u00fasqueda.",
		re: "Habilitar B\u00fasqueda en el Mercado:",
		ag: "Intervalo de B\u00fasqueda en el Mercado en Minutos:",
		bg: "Se sugieren 10 minutos.",
		nf: "Ajustes de Objetos:",
		lf: "Nombre del Objeto Incluye",
		G: "Precio M\u00e1ximo",
		pf: "Tipo de Objeto",
		mf: "Rareza del Objeto",
		ae: "\u00bfComprar con V\u00ednculo Espiritual?",
		rf: "Objetos para Comprar",
		qf: "Intentar comprar objetos con paquetes si alguno coincide con el precio m\u00e1ximo ingresado:",
		Zd: "Objetos Comprados:",
		dj: "Porcentaje de Curaci\u00f3n",
		pk: "\u00bfComprar Comida en la Tienda?",
		qk: "\u00bfUsar Curaci\u00f3n de Paquete?",
		lk: "\u00bfUsar Cervisia?",
		nk: "\u00bfUsar Huevos?",
		tl: "\u00daltima Vez Usado",
		location: "Ubicaci\u00f3n",
		Strength: "Fuerza",
		Dexterity: "Destreza",
		Agility: "Agilidad",
		Constitution: "Constituci\u00f3n",
		Charisma: "Carisma",
		Intelligence: "Inteligencia",
		ii: "Ajustes de Entrenamiento",
		ji: "Selecciona los atributos que deseas entrenar. Se entrenar\u00e1 una vez que tengas suficiente oro.",
		cd: "Siguiente acci\u00f3n",
		qj: "No",
		rj: "Normal",
		xl: "Oponente",
		yl: "Nivel del Oponente",
		Dj: "Misiones",
		random: "Aleatorio",
		Hl: "Ajustes",
		Tl: "Pronto...",
		type: "Haz clic en los \u00edconos para activar los tipos de misiones.",
		$l: "S\u00ed",
		A: "Subasta/B\u00fasqueda",
		Bd: "Agregar objetos",
		ik: "Almacenar Recursos Forjados autom\u00e1ticamente",
		Vl: "Enviar",
		rl: "Intervalo : ",
		gl: "Habilitar Puja Autom\u00e1tica",
		hl: "No pujar si el miembro del gremio ya ha pujado",
		Xl: "Tutorial",
		dc: "Selecciona entre los botones de arriba si deseas enfrentar al oponente de nivel m\u00e1s bajo en la arena o al oponente de nivel m\u00e1s alto. M\u00e1s usuarios ralentizar\u00e1n el bot.",
		$k: "Para empezar, agrega un objeto a la lista (p. ej., `Lucius`). Una vez agregado, la herramienta buscar\u00e1 el objeto y mostrar\u00e1 los resultados de la b\u00fasqueda en el lado izquierdo de la pantalla. Tambi\u00e9n se buscar\u00e1 para fines de subasta autom\u00e1tica. Si habilitas la puja autom\u00e1tica, la herramienta buscar\u00e1 el objeto a intervalos regulares seg\u00fan el n\u00famero que ingreses en el cuadro de intervalo. Si la herramienta encuentra el objeto y tienes suficiente dinero, pujar\u00e1 autom\u00e1ticamente por ti. *Nota* para buscar objetos \u00fanicos en las tiendas, debes agregar al menos 1 objeto aleatorio en la lista de b\u00fasqueda.",
		jl: "El n\u00famero de criatura se puede seleccionar desde los botones de arriba. El n\u00famero 1 representa la criatura m\u00e1s a la izquierda. Aseg\u00farate de seleccionar la ubicaci\u00f3n correcta, de lo contrario, el bot podr\u00eda detenerse.",
		Ui: "Selecciona la dificultad de la mazmorra de arriba. Aseg\u00farate de seleccionar la ubicaci\u00f3n correcta, de lo contrario, el bot podr\u00eda detenerse.",
		ej: "Ajustes de Curaci\u00f3n",
		Vi: "Almacena el oro excedente en el Gremio comprando objetos del mercado del gremio. -> M\u00edn. Oro",
		ul: "Mover Todo",
		vl: "Mover Seleccionados",
		cl: "Curaci\u00f3n Autom\u00e1tica",
		dl: "Porcentaje de Curaci\u00f3n Autom\u00e1tica",
		Zl: "Ruby",
		Hg: "Ajustes Generales",
		Hj: "Vender Todo",
		Ij: "Vender Seleccionados",
		fa: "Armas",
		ca: "Escudos",
		U: "Armadura de Pecho",
		X: "Cascos",
		W: "Guantes",
		da: "Zapatos",
		aa: "Anillos",
		T: "Amuletos",
		yi: "Usables",
		xi: "Mejoras",
		Zg: "Recetas",
		og: "Pergamino de Mercenario",
		ah: "Refuerzos",
		ig: "Vender Comida",
		Eb: "Cambiar a Comida"
	},
	Nh = {
		Yj: "Faire fondre d\u2019abord les couleurs plus \u00e9lev\u00e9es ?",
		$b: "Attaquer uniquement la liste de joueurs ?",
		ac: "Lorsque cette option est activ\u00e9e, le bot n\u2019attaquera que les joueurs figurant sur la liste des joueurs. Si cette option n\u2019est pas activ\u00e9e, le bot attaquera des joueurs al\u00e9atoires.",
		Fk: "Vos param\u00e8tres d'exp\u00e9dition sont incorrects ou il y a des donn\u00e9es de page inattendues !",
		Gk: "Votre param\u00e8tre d'exp\u00e9dition est incorrect ! Vous avez s\u00e9lectionn\u00e9 un monstre d\u00e9sactiv\u00e9, ce qui est incorrect.",
		Tk: "R\u00e9initialiser uniquement tous les \u00e9l\u00e9ments du monde souterrain avec la couleur s\u00e9lectionn\u00e9e?",
		Ba: "Priorit\u00e9",
		Sb: "D\u00e9finir la priorit\u00e9",
		Ng: "Points",
		Gh: "Stat",
		Oi: "Collecter de l`or",
		Jj: "Vendre des objets des Enfers?",
		pj: "Le bot cherchera le nid dans chaque action, pas seulement lors des exp\u00e9ditions.",
		nj: "Type de recherche de nid",
		lj: "Ne rien faire",
		mj: "Recherche rapide",
		oj: "Recherche approfondie",
		El: "After expedition points are consumed, travel to Germania to consume Dungeon points",
		sk: "Cliquez ici si la r\u00e9paration se bloque",
		Hk: "Quand les PV sont en dessous, utilisez soin",
		Jg: "R\u00e9paration Partielle",
		Ye: "R\u00e9paration Compl\u00e8te",
		Ig: "R\u00e9paration Partielle ou Compl\u00e8te",
		pe: "Activer la Limite",
		gj: "Limite",
		hj: "Si vous voulez limiter le nombre de fois que vous souhaitez attaquer l'ennemi, activez cette option et d\u00e9finissez la limite. Le bot continuera \u00e0 attaquer le reste des ennemis apr\u00e8s avoir fini d'attaquer le monstre s\u00e9lectionn\u00e9.",
		ui: "Monde Souterrain",
		li: "Am\u00e9liorations du Monde Souterrain",
		ni: "Utiliser les pouvoirs des dieux apr\u00e8s \u00eatre entr\u00e9 dans le monde souterrain?",
		oi: "S\u00e9lectionnez les dieux pour utiliser leurs pouvoirs:",
		pi: "Utiliser un Buff d'Arme sur l'arme?",
		ri: "Utiliser un Buff d'Armure sur l'\u00e9quipement suivant:",
		Ck: "Le temps de recharge est de 30 minutes. Si vous n'avez pas de costume, le bot r\u00e9initialisera le temps de recharge \u00e0 0.",
		Uk: "S\u00e9lectionner les Couleurs",
		Ya: "Forge de Vulcain",
		bb: "Bouclier de Terre de Feronia",
		cb: "Puissance Fluide de Neptune",
		eb: "Libert\u00e9 A\u00e9rienne d'Aelous",
		fb: "Brouillard Mortel de Pluton",
		gb: "Souffle de Vie de Junon",
		hb: "Armure d'\u00c9cailles des Montagnes de Col\u00e8re",
		ib: "Yeux d'Aigle",
		jb: "V\u00eatement d'Hiver de Saturne",
		Za: "Armure de Taureau de Bubona",
		$a: "V\u00eatements de Voleur de Mercure",
		ab: "Robe de Lumi\u00e8re de R\u00e2",
		ke: "N`entrez pas dans le monde souterrain avec le costume des enfers",
		je: "Si vous ne voulez pas entrer dans le monde souterrain en portant le costume des enfers, activez cette option",
		hg: "Paquets",
		cg: "Inventaire",
		K: "Prix Min.",
		J: "Combien",
		Db: "Vendre des Articles",
		Cb: "Rechercher dans",
		dg: "Couleur du Mat\u00e9riau",
		Bb: "Couleur de l`Article",
		kg: "Entrep\u00f4t",
		za: "Basculer vers Mat\u00e9riaux",
		Fb: "Basculer vers Articles",
		jg: "Vendre des Mat\u00e9riaux",
		wa: "Veuillez entrer un nom d`article valide, une fourchette de prix et une quantit\u00e9.",
		xa: "Aucun article correspondant trouv\u00e9 dans les emplacements de recherche s\u00e9lectionn\u00e9s.",
		ya: "Tous les articles ont \u00e9t\u00e9 list\u00e9s avec succ\u00e8s !",
		Nk: "Tous les mat\u00e9riaux ont \u00e9t\u00e9 list\u00e9s avec succ\u00e8s !",
		fg: "Si vous souhaitez vendre des articles \u00e0 un prix fixe, vous pouvez entrer la m\u00eame valeur pour le prix minimum et maximum.",
		gg: "Cette fonctionnalit\u00e9 est encore exp\u00e9rimentale, utilisez-la avec prudence. Si vous ne fixez pas un prix, les articles seront list\u00e9s al\u00e9atoirement entre le prix minimum et maximum que vous entrez.",
		yk: "D\u00e9finit le maximum d`or que le bot d\u00e9pensera par cycle.",
		Ta: "Le bot commencera \u00e0 faire des offres sur tout article de nourriture, si activ\u00e9. Vous n`avez pas besoin d`activer les bascules gladiateur/mercenaire.",
		Jd: "Le bot ne fera pas d`offres sur les ench\u00e8res des alli\u00e9s.",
		Kd: "Ignorer la combinaison Pr\u00e9fixe/Suffixe lors de la recherche d`un objet \u00e0 la vente aux ench\u00e8res.",
		Qj: "S\u00e9lectionnez les types d\u2019objets que vous souhaitez fondre.",
		Rj: "S\u00e9lectionnez les couleurs que vous souhaitez fondre.",
		Sj: "S\u00e9lectionnez le niveau des objets que vous souhaitez fondre.",
		Tj: "S\u00e9lectionnez le marteau que vous voulez utiliser.",
		Uj: "Notez que le cercle vert et rouge \u00e0 c\u00f4t\u00e9 de la premi\u00e8re case sert \u00e0 activer/d\u00e9sactiver la r\u00e8gle.",
		Vj: "Si vous voulez fondre al\u00e9atoirement n\u2019importe quelle couleur ou type, vous pouvez activer `Fondre al\u00e9atoirement si aucune condition n\u2019est remplie? (Derni\u00e8re option activ\u00e9e dans la vid\u00e9o du tutoriel)",
		Fj: "R\u00e9parer avant de fondre",
		Le: "S\u00e9lectionner Monstre",
		ze: "Utiliser Sablier/Rubis?",
		Ek: "Utiliser Rubis?",
		Ce: "Utiliser Mobilisation?",
		Be: "Utiliser Potion de Vie?",
		ye: "Pourcentage de Soin (%)",
		Je: "Nombre d'Attaques",
		Ae: "Intervalle d'Attaque (en secondes)",
		we: "Attaques Effectu\u00e9es",
		xe: "Sabliers Restants",
		He: "Note : Utilise des potions de vie pour gu\u00e9rir, pas de nourriture.",
		Ie: "Note : Si les attaques s'arr\u00eatent pr\u00e9matur\u00e9ment, essayez 'R\u00e9initialiser les Attaques'.",
		Me: "D\u00e9marrer",
		Ke: "R\u00e9initialiser",
		Ne: "Arr\u00eater",
		Oe: "Param\u00e8tres d'Exp\u00e9dition (Cliquez pour minimiser)",
		De: "Monstre 1",
		Ee: "Monstre 2",
		Fe: "Monstre 3",
		Ge: "Monstre 4",
		Qk: "R\u00e9parer avant de fondre",
		Mi: "Cette option utilisera cervisia lorsque votre premium expirera.",
		sj: "Cette option permet d'activer et de choisir les huiles parmi les r\u00e9compenses des dieux. Elle peut utiliser les huiles num\u00e9ro 1 et 3 sur le personnage, mais la num\u00e9ro 2 ne sera prise que pour les paquets.",
		Ki: "Cette option utilisera des buffs au moment que vous avez fix\u00e9. Elle trouvera les buffs dans les paquets et les appliquera au personnage.",
		ij: "Cette option vous m\u00e8nera aux enfers. N'oubliez pas d'activer la Connexion Automatique depuis l'onglet Extras, sinon vous pourriez \u00eatre d\u00e9connect\u00e9 en entrant aux enfers [Bug du Jeu]",
		bc: "Cette option n'attaquera que la liste ar\u00e8ne/cirque. Si ce n'est pas possible, le bot sautera.",
		Cj: "Cette option est uniquement pour les licences premium. Elle simule l'attaque avant d'attaquer un utilisateur pour un taux de victoire de 75%.",
		Md: "Vous n'avez pas besoin d'activer l'interrupteur principal de l'ench\u00e8re pour activer cette option.",
		kk: "Cette option rafra\u00eechira la page chaque seconde quand l'ench\u00e8re est en \u00e9tat -Tr\u00e8s Court- pour ench\u00e9rir constamment et gagner l'ench\u00e8re.",
		Oj: "Si aucune des conditions de fusion n'est remplie, il fusionnera al\u00e9atoirement. Assurez-vous de s\u00e9lectionner le type et la couleur de l'objet.",
		Pj: "Cette option ne fusionnera que les objets de l'inventaire. Elle ignorera les objets dans les paquets.",
		Ua: "Articles aux Ench\u00e8res",
		ng: "Articles de Mercenaire",
		Ub: "Articles de Boutique",
		wi: "Articles Uniques",
		Kj: "D\u00e9finir le fond en noir [Augmente les performances]",
		Lj: "D\u00e9placer les boutons Gladbot en bas \u00e0 gauche?",
		Ni: "Attaquer le cirque sans soigner",
		jk: "Prendre l'or des paquets si n\u00e9cessaire?",
		Wl: "L'or a \u00e9t\u00e9 pris des paquets pour l'entra\u00eenement",
		Dd: "Aucun or n'a \u00e9t\u00e9 trouv\u00e9 dans les paquets pour l'entra\u00eenement",
		gk: "Objets R\u00e9par\u00e9s",
		$j: "Attaques en Ar\u00e8ne",
		bk: "Attaques au Cirque",
		Cd: "Objets R\u00e9initialis\u00e9s",
		ek: "Attaques en Exp\u00e9dition",
		dk: "Attaques en Donjon",
		hk: "Attaques dans l'Underworld",
		ak: "Argent Gagn\u00e9 en Ar\u00e8ne",
		ck: "Argent Gagn\u00e9 au Cirque",
		Ul: "Objets Fondus",
		fk: "Or Recycl\u00e9",
		$i: "Bataille de Guilde",
		bj: "Param\u00e8tres de Guilde",
		aj: "Guild Name",
		ll: "Attaquera les guildes au hasard.",
		Li: "R\u00e9initialiser les Statistiques",
		Hh: "Stockage de l'Or",
		Zi: "Attaquer une Guilde Al\u00e9atoire",
		wl: "GladBot\u00a0: utilisez les d\u00e9s pour rafra\u00eechir la bo\u00eete myst\u00e8re et trouver des objets de valeur avant de les ouvrir (etc. Costumes). Cliquez sur \u00ab\u00a0D\u00e9marrer\u00a0\u00bb pour ouvrir les coffres.\u00a0",
		Nc: "Bois",
		Dc: "Cuivre",
		Hc: "Fer",
		Jc: "Cuir",
		Oc: "Fil de laine",
		Ec: "Boule de coton",
		Gc: "Chanvre",
		Fc: "Bande de gaze",
		Kc: "Toile de lin",
		Ic: "Jute",
		Mc: "Bande de velours",
		Lc: "Fil de soie",
		Wc: "Fourrure",
		Qc: "\u00c9clat osseux",
		Zc: "\u00c9caille",
		Tc: "Griffe",
		Vc: "Canine",
		Uc: "\u00c9caille de dragon",
		Rc: "Corne de taureau",
		Yc: "Glande \u00e0 venin",
		Sc: "Touffe de poils de Cerb\u00e8re",
		Xc: "\u00c9caille d`Hydre",
		$c: "Plume du Sphinx",
		ad: "Cuir de Typhon",
		zc: "Lapis-lazuli",
		tc: "Am\u00e9thyste",
		sc: "Ambre jaune",
		uc: "Aigue-marine",
		Ac: "Safir",
		xc: "Grenat",
		wc: "\u00c9meraude",
		vc: "Diamant",
		yc: "Jaspe",
		Bc: "Sugilith",
		nc: "Venin de scorpion",
		qc: "Teinture d`endurance",
		jc: "Antidote",
		ic: "Adr\u00e9naline",
		pc: "Teinture de r\u00e9v\u00e9lation",
		mc: "Potion de perception",
		kc: "Essence de reflet",
		lc: "Flacon du rayonnement",
		rc: "Eau de l`oubli",
		oc: "Essence d`\u00e2me",
		Ad: "Sceau aquatique",
		ud: "Rune protectrice",
		sd: "Gravure terrestre",
		zd: "Totem gu\u00e9risseur",
		yd: "Talism\u00e1n de puissance",
		wd: "Pierre de fortune",
		td: "Pierre du feu",
		xd: "Rune temp\u00e9tueuse",
		vd: "Rune t\u00e9n\u00e9breuse",
		fd: "Cristal",
		ed: "Bronze",
		kd: "Obsidienne",
		nd: "Argent",
		od: "Soufre",
		hd: "Minerai d`or",
		md: "Quartz",
		ld: "Platine",
		dd: "Almandin",
		gd: "Cuprit",
		jd: "Pierre infernale",
		Hi: "Attaquer al\u00e9atoirement?",
		Ii: 'D\u00e9sactivez \u00e9galement le param\u00e8tre "Trier les joueurs dans l\'ar\u00e8ne par niveau" dans crazy-addon.',
		Wg: "Accepter uniquement les qu\u00eates bas\u00e9es sur le type de dieu.",
		Va: "Buff Automatique",
		$d: "Utiliser uniquement en enfer?",
		Cg: "Nouvelle R\u00e8gle",
		Ag: "Le Nom Contient",
		isUnderworldItem: "Est-ce un objet du monde souterrain?",
		gf: "Ignorer les Mat\u00e9riaux",
		rk: "Utiliser la pri\u00e8re",
		Ci: "Utiliser le sacrifice",
		mk: "Utiliser des v\u00eatements pour entrer dans le monde souterrain",
		ti: "Lorsque vous \u00eates dans le monde souterrain, n`acceptez que les qu\u00eates li\u00e9es au monde souterrain ?",
		si: "Si activ\u00e9, vous devez entrer les noms des objets du monde souterrain. Si le bot trouve ces objets dans le monde souterrain, il acceptera la qu\u00eate.",
		Yk: "Objet de Qu\u00eate du Monde Souterrain",
		il: "Entrez le nom du mat\u00e9riau",
		Bk: "Le robot adore les d\u00e9s ! Ils l'aident \u00e0 trouver des v\u00eatements dans les coffres. Mais s'il n'y a pas de d\u00e9s, le robot ouvre quand m\u00eame les coffres, en esp\u00e9rant trouver des v\u00eatements cool (mais il pourrait ne rien trouver !)",
		Nj: "Fondre les coffres",
		oe: "Activer l'ar\u00e8ne",
		Og: "Prioriser la liste des ar\u00e8nes ?",
		Pg: "Prioriser la liste des cirques ?",
		ge: "D\u00e9sactiver le menu de journalisation",
		kh: "Valeur minimale de r\u00e9compense en or",
		lh: "Le robot ench\u00e9rira sur des articles al\u00e9atoires.",
		Xg: "Si activ\u00e9, le Focus sur les qu\u00eates suivra le chemin le plus court pour terminer le donjon.",
		Jh: "Lancer les d\u00e9s automatiquement ?",
		Kh: "Utilisez le lancer de d\u00e9s avec prudence, il continuera \u00e0 utiliser le premier d\u00e9 jusqu'\u00e0 ce que vous d\u00e9sactiviez l'option.",
		ph: "Progression de la recherche",
		eh: "Le temps de recharge pour la r\u00e9paration par d\u00e9faut est de 10 minutes.",
		xg: "Condition minimale",
		ee: "Article actuel sur l'\u00e9tabli [Effacer si le bot se met en pause de mani\u00e8re inattendue]",
		Df: "Ressources de forge stock\u00e9es avec succ\u00e8s dans l'horreum.",
		zf: "V\u00e9rification du march\u00e9 pour les articles...",
		yb: "Article d\u00e9plac\u00e9 sur l'\u00e9tabli.",
		Qf: "Article r\u00e9par\u00e9 et \u00e9quip\u00e9 avec succ\u00e8s.",
		Rf: "Article r\u00e9par\u00e9 avec succ\u00e8s.",
		Lk: "La r\u00e9paration a \u00e9chou\u00e9. La page sera rafra\u00eechie.",
		Nf: "Ramassage des mat\u00e9riaux...",
		Zf: "En attente de r\u00e9paration...",
		Pf: "La r\u00e9paration a commenc\u00e9 pour .",
		va: "R\u00e9paration : D\u00e9placement de l'article de l'inventaire vers le sac",
		Of: "R\u00e9paration : D\u00e9placement de l'article de l'\u00e9tabli vers le paquet.",
		ta: "Impossible de trouver suffisamment de mat\u00e9riaux. D\u00e9sactivation de l'emplacement de r\u00e9paration ",
		Kf: "Recherche d'articles \u00e0 acheter pour cacher de l'or aux ench\u00e8res...",
		wf: "V\u00e9rification des articles expir\u00e9s dans les paquets...",
		xf: "R\u00e9initialisation de l'article r\u00e9ussie.",
		yf: "Aucun espace vide ou or pour r\u00e9initialiser.",
		Ef: "Assurez-vous d'avoir les droits de vente sur le march\u00e9 de guilde !",
		sb: "Pas assez d'or ou aucun article \u00e0 acheter. Attente de 30 secondes pour rafra\u00eechir.",
		ub: "Le magasin a \u00e9t\u00e9 rafra\u00eechi.",
		vb: "Erreur lors de la gu\u00e9rison.",
		Hf: "Pas de Rubis ou de Tissu, d\u00e9sactivation des options.",
		Kk: "Aucun article de gu\u00e9rison trouv\u00e9 dans les paquets.",
		wb: "Aucun article appropri\u00e9 trouv\u00e9",
		If: "Les aliments ont \u00e9t\u00e9 ramass\u00e9s. Fin du processus.",
		Jf: "Au moins un aliment a \u00e9t\u00e9 ramass\u00e9. Fin du processus.",
		xb: "Aucun espace appropri\u00e9 trouv\u00e9 dans le sac pour ramasser de la nourriture.",
		Ff: "Obtention de la nourriture des paquets.",
		Gf: "Aucun espace appropri\u00e9 trouv\u00e9 dans le sac pour ramasser de la nourriture.",
		tb: "Plus d'articles de gu\u00e9rison. Attente de 30 secondes.",
		rb: "Points de vie r\u00e9cup\u00e9r\u00e9s.",
		ua: "Rien \u00e0 faire alors je vais prier !",
		Vf: "Je vais actualiser dans 60 secondes pour v\u00e9rifier ma sant\u00e9 et Villa Medici.",
		Wf: "En attente de Villa Medici, actualisation dans 60 secondes.",
		Xf: "Quitt\u00e9 les Enfers.",
		Yf: "Je vais actualiser dans 60 secondes pour v\u00e9rifier ma sant\u00e9.",
		Lf: "V\u00e9rification des huiles divines...",
		Mf: "Les huiles divines ont \u00e9t\u00e9 ramass\u00e9es.",
		ra: "Attaque r\u00e9ussie du joueur dans l'AR\u00c8NE : ",
		sa: "Attaque r\u00e9ussie du joueur dans le CIRQUE : ",
		uf: "V\u00e9rification des ench\u00e8res ! Veuillez patienter...",
		vf: "Mise aux ench\u00e8res d'articles. Veuillez patienter...",
		Sf: "Article fondu automatiquement : ",
		Tf: "Fusion de l'article : ",
		zb: "Pas assez d'or pour fondre. Or requis : ",
		Uf: "FONDRE : Recherche d'articles \u00e0 fondre...",
		Mk: "Recherche d'articles \u00e0 fondre...",
		Af: "V\u00e9rification de la disponibilit\u00e9 des costumes...",
		Cf: "Donn\u00e9 : ",
		Bf: "Lancer des d\u00e9s...",
		Ue: "Underworld Farm [Manual, Beta]",
		Te: "Farm Location",
		Ve: "Attention\u00a0: activez cette fonctionnalit\u00e9 apr\u00e8s avoir d\u00e9verrouill\u00e9 la cr\u00e9ature que vous souhaitez attaquer, elle n'attaquera pas automatiquement pour d\u00e9bloquer le monstre.",
		Se: "Farm Enemy",
		Td: "Connexion Automatique",
		Ud: "Vous devez autoriser les pop-ups depuis l'\u00e9cran du lobby de GameForge. Consultez la documentation pour savoir comment faire.",
		Kg: "Mettre le Bot en Pause",
		Lg: "Mettre le Bot en pause (Minutes)",
		Qe: "Date d'Expiration",
		Fg: "Acheter uniquement de la nourriture ?",
		Gg: "Si vous activez cette option, le bot ignorera vos s\u00e9lections et ach\u00e8tera automatiquement de la nourriture sans rien saisir.",
		Hb: "Montant total maximal d'or \u00e0 d\u00e9penser",
		Gb: "Montant maximal d'or par aliment \u00e0 d\u00e9penser",
		Eg: "Le bot v\u00e9rifiera les huiles toutes les 60 minutes",
		bi: "D\u00e9finit une minuterie pour v\u00e9rifier les temps de fusion.",
		Zh: "D\u00e9finit une minuterie pour v\u00e9rifier la fusion lorsque vous n'avez pas d'or.",
		ai: "D\u00e9finit une minuterie pour v\u00e9rifier la fusion si vous n'avez pas l'objet disponible.",
		Uh: "D\u00e9finit une minuterie pour r\u00e9parer et v\u00e9rifier vos objets.",
		Th: "D\u00e9finit une minuterie pour v\u00e9rifier l'or retenu sur le march\u00e9 de la guilde.",
		Ph: "D\u00e9finit une minuterie pour l'option de retenue d'or aux ench\u00e8res.",
		Lh: "D\u00e9finit une minuterie pour v\u00e9rifier la liste PvP dans l'ar\u00e8ne pour attaquer.",
		Qh: "D\u00e9finit une minuterie pour v\u00e9rifier la liste PvP dans le cirque pour attaquer.",
		hi: "D\u00e9finit une minuterie pour entra\u00eener vos statistiques.",
		Wh: "D\u00e9finit une minuterie pour r\u00e9initialiser les objets expir\u00e9s.",
		fi: "D\u00e9finit une minuterie pour stocker les mat\u00e9riaux de forge dans l'horreum.",
		Nh: "D\u00e9finit une minuterie pour v\u00e9rifier les ench\u00e8res des gladiateurs et des mercenaires.",
		Yh: "D\u00e9finit une minuterie pour rechercher des objets aux ench\u00e8res et en boutique.",
		Rh: "D\u00e9finit la minuterie d'envoi de dons \u00e0 la guilde.",
		Ze: "Or D\u00e9plac\u00e9",
		le: "Ne vendez pas d'articles de la fonderie et de la liste des ench\u00e8res",
		qh: "Automatisation de la Boutique",
		th: "Param\u00e8tres de Recherche d'Objets",
		rh: "Utilisez cet outil pour rechercher des objets. Ajoutez simplement les objets \u00e0 la liste, sp\u00e9cifiez la quantit\u00e9 de tissu et lancez la recherche.",
		uh: "Tissus \u00e0 Utiliser :",
		vh: "Combien de tissus utiliser ?",
		ea: "Full Entrez le Nom de l'Objet",
		Tb: "Entrez le Niveau de l'Objet",
		xh: "Qualit\u00e9 de l'Objet",
		wh: "Nom de l'Objet Ici",
		yh: "Commencer la Recherche",
		zh: "Sauter et Continuer",
		Ah: "Arr\u00eater la Recherche",
		We: "Acheter le moins cher ou le plus cher?",
		zg: "Le Plus Cher",
		be: "Le Moins Cher",
		ba: "S\u00e9lectionnez une Option",
		qe: "Mettre en surbrillance les objets du monde souterrain",
		Xe: "Concentrez-vous sur la qu\u00eate\u00a0?",
		Yl: "Utiliser Ruby s'il n'y a pas de tissu ?",
		Wa: "\u00c9vitez d'attaquer les m\u00eames personnes pour ne pas \u00eatre signal\u00e9. \u00catre signal\u00e9 augmente les chances d'\u00eatre banni.",
		Ml: "Fondre Green ?",
		Rg: "Ne pas accepter les qu\u00eates al\u00e9atoires si des filtres sont entr\u00e9s ?",
		Pc: "Qualit\u00e9 maximale des mat\u00e9riaux \u00e0 utiliser",
		Wi: "Activer la recherche de mercenaires",
		sl: "Cliquez sur `Vendre Tout S\u00e9lectionn\u00e9` pour vendre tous les objets. Assurez-vous d`avoir de l`espace vide de 2x3 dans votre premi\u00e8re (1) sac. Pour collecter de l`or en masse, filtrez l`or et utilisez `S\u00e9lectionner S\u00e9lectionn\u00e9s ou Tout S\u00e9lectionner`.",
		Zj: "\ud83d\udd25 : Ajoute l`objet \u00e0 la liste de fusion.",
		Ji: "\ud83d\udd28 : Ajoute l`objet \u00e0 la liste des ench\u00e8res.",
		Ej: "Actualisez la boutique avec du tissu lorsqu`elle est pleine",
		Al: "Page:",
		Aj: "Arr\u00eater",
		yj: "Vendre Cette Page",
		vj: "S\u00e9lectionner S\u00e9lectionn\u00e9s",
		uj: "Tout S\u00e9lectionner",
		Bj: "Param\u00e8tres d`Emballage Automatique",
		zj: "Envoyer les Ressources",
		wj: "Vendre Tout S\u00e9lectionn\u00e9",
		ma: "Type d`Objet",
		oa: "Armes",
		S: "Boucliers",
		M: "Armures",
		P: "Casques",
		O: "Gants",
		N: "Bottes",
		na: "Anneaux",
		ka: "Amulettes",
		Ia: "Utilisables (Nourriture)",
		Na: "Am\u00e9liorations",
		tj: "Boosts",
		Ka: "Recettes",
		Ja: "Mercenaires",
		Ma: "Outils de Forge",
		La: "Parchemins",
		rd: "Renforcements",
		pd: "Objets d`\u00c9v\u00e9nement",
		qd: "Mat\u00e9riaux de Forge",
		zl: "Or",
		Ha: "Tout",
		Bl: "Qualit\u00e9",
		pa: "Blanc",
		C: "Vert",
		B: "Bleu",
		D: "Violet",
		H: "Orange",
		R: "Rouge",
		xj: "Options de Vente",
		Mj: "Ignorer la Combinaison Pr\u00e9fixe/Suffixe ?",
		cj: "Combien de nourriture acheter/cueillir ?",
		Ri: "Normal",
		Qi: "Interm\u00e9diaire",
		Pi: "Difficile",
		Ea: "Standard",
		Fl: "R\u00e9paration Correction d`Enlisement",
		Ik: "D\u00e9sactivez l`Entr\u00e9e en Enfer si vous souhaitez d\u00e9sactiver le Donjon/Cirque/Arenas. Si vous \u00eates entr\u00e9 en Enfer manuellement, vous devrez activer le Mode Enfer.",
		ce: "Choisir le costume des Enfers",
		Fi: "Porter le costume des Enfers quand il est disponible ?",
		ki: "Tutoriel dentra\u00eenement : Indiquez combien de fois vous souhaitez entra\u00eener les statistiques et d\u00e9finissez leurs priorit\u00e9s. Le bot nentra\u00eenera pas sans quune priorit\u00e9 soit d\u00e9finie. Si une priorit\u00e9 est configur\u00e9e mais quil ne reste plus de statistiques \u00e0 entra\u00eener, le bot continuera avec la statistique s\u00e9lectionn\u00e9e.",
		el: "Quest",
		Ih: "Conserver l'Or aux Ench\u00e8res ?",
		Mg: "Mettre en Pause le Bot Al\u00e9atoirement pour travailler comme [Phase de Test] :",
		gh: "R\u00e9initialiser les Objets Expir\u00e9s",
		Nb: "Remarque : En activant cette option, le bot vendra les objets expir\u00e9s \u00e0 venir des paquets sur le march\u00e9 de la guilde, puis annulera pour r\u00e9initialiser le temps d'expiration. La guilde est requise. Assurez-vous d'avoir un espace vide de 3x3 dans vos sacs.",
		Y: "Conserver l'Or : Le bot conservera cet or dans le sac :",
		lg: "Or Maximum : Le bot d\u00e9pensera lorsque l'or sera sup\u00e9rieur \u00e0",
		Kl: "Fonderie",
		Rl: "Fonderie Param\u00e8tres",
		Wj: "Fonderie Liste",
		Sl: "Ajouter un pr\u00e9fixe ou un suffixe, une fois qu`il l`aura trouv\u00e9 dans les paquets, il le fondera automatiquement:",
		Ql: "Fusion d'item:",
		ec: "Cliquez sur l`\u00e9l\u00e9ment que vous souhaitez r\u00e9parer. Essayez de faire de la place dans votre inventaire",
		Zk: "S`applique-t-il uniquement aux mercenaires ?",
		bl: "L'ench\u00e8re ach\u00e8te que lorsque le march\u00e9 est proche de la fin.",
		al: "Assurez-vous que le SECOND ONGLET D'INVENTAIRE est vide. Le bot trouvera et mettra l'objet dans le deuxi\u00e8me onglet puis la prochaine fois que la page est actualis\u00e9e, il fondra l'objet.",
		fj: "Gu\u00e9risseur & Buffs",
		Gl: "Pas assez d'or pour fondre. Or requis:",
		Jl: "Ench\u00e8re ignor\u00e9e: un membre de la guilde a d\u00e9j\u00e0 mis\u00e9 pour l'objet ",
		Il: "Ench\u00e8re ignor\u00e9e: Vous avez d\u00e9j\u00e0 mis\u00e9 pour cet objet ",
		advanced: "Avanc\u00e9e",
		arena: "Ar\u00e8ne",
		ia: "Attaque automatique",
		cc: "Eviter l'attaque",
		ga: "Ajouter un joueur",
		ha: "Entrez le nom du joueur (Same Server)",
		nl: "Arr\u00eater le bot en cas de manque de nourriture?",
		circusTurma: "Circus Turma",
		Si: "Difficult\u00e9",
		dungeon: "Donjon",
		Ti: "Param\u00e8tres du donjon",
		eventExpedition: "Event Exp\u00e9dition",
		expedition: "Expedition",
		Xi: "Param\u00e8tres d'expedition",
		Gj: "S\u00e9lectionner un monstre",
		pl: "Plus haut",
		ol: "Mettez vos objets de soin dans la premi\u00e8re page de votre inventaire",
		Cc: "Dans",
		nh: "Utiliser les v\u00eatements de travail pour renouveler la boutique?",
		dj: "Pourcentage de gu\u00e9rison",
		pk: "Acheter de la nourriture dans la boutique?",
		qk: "Utiliser la gu\u00e9rison \u00e0 partir du paquet?",
		lk: "Utiliser Cervisia?",
		nk: "Utiliser des oeufs?",
		tl: "Dernier utilis\u00e9",
		location: "Emplacement",
		Strength: "Force",
		Dexterity: "Adresse",
		Agility: "Agilit\u00e9",
		Constitution: "Constitution",
		Charisma: "Charisme",
		Intelligence: "Intelligence",
		ii: "Param\u00e8tres d'entrainement",
		ji: "S\u00e9lectionnez les states que vous souhaitez entra\u00eener. L'entra\u00eenement commencera une fois que vous aurez assez d'or.",
		cd: "Action suivante",
		qj: "Non",
		rj: "Normal",
		xl: "Adversaire",
		yl: "Niveau de l'adversaire",
		Dj: "Qu\u00eates",
		random: "Al\u00e9atoire",
		Hl: "Param\u00e8tres",
		Tl: "Bient\u00f4t...",
		type: "Cliquez sur les ic\u00f4nes pour activer les types de qu\u00eate.",
		$l: "Oui",
		A: "Ench\u00e8re",
		Bd: "Ajouter des objets",
		ik: "Stocker automatiquement les ressources de la forge",
		Vl: "Soumettre",
		rl: "Intervalle : ",
		gl: "Activer l'ench\u00e8re automatique",
		hl: "Ne pas ench\u00e9rir si un membre de la guilde a d\u00e9j\u00e0 ench\u00e9ri",
		Xl: "Tutoriel",
		dc: "S\u00e9lectionnez \u00e0 partir des boutons ci-dessus pour choisir si vous souhaitez affronter l'adversaire le plus faible de l'ar\u00e8ne ou l'adversaire de niveau le plus \u00e9lev\u00e9.",
		$k: "Pour commencer, ajoutez un article \u00e0 la liste (par exemple, `Lucius`). Une fois ajout\u00e9, l'outil recherchera l'article et affichera les r\u00e9sultats de la recherche sur le c\u00f4t\u00e9 gauche de l'\u00e9cran. Il sera \u00e9galement recherch\u00e9 \u00e0 des fins d'ench\u00e8re automatique. Si vous activez l'ench\u00e8re automatique, l'outil recherchera l'article \u00e0 des intervalles r\u00e9guliers en fonction du nombre que vous mettez dans la case d'intervalle. Si l'outil trouve l'article et que vous avez assez d'argent, il ench\u00e9rira automatiquement pour vous. *Note* pour rechercher des articles uniques dans les boutiques, vous devez ajouter au moins 1 article al\u00e9atoire \u00e0 la liste de recherche.",
		jl: "Le num\u00e9ro de la cr\u00e9ature peut \u00eatre s\u00e9lectionn\u00e9 \u00e0 partir des boutons ci-dessus. Le num\u00e9ro 1 repr\u00e9sente la cr\u00e9ature la plus \u00e0 gauche. Assurez-vous de s\u00e9lectionner le bon emplacement, sinon le bot pourrait se mettre en pause.",
		Ui: "S\u00e9lectionnez la difficult\u00e9 du donjon depuis le dessus. Assurez-vous de s\u00e9lectionner le bon emplacement, sinon le bot pourrait se mettre en pause.",
		ej: "Param\u00e8tres de gu\u00e9rison",
		Vi: "Stocker l'or exc\u00e9dentaire dans la guilde en achetant des objets du march\u00e9 de la guilde. -> Or Min.",
		ul: "D\u00e9placer tout",
		vl: "D\u00e9placer les s\u00e9lectionn\u00e9s",
		cl: "Auto gu\u00e9rison",
		dl: "Pourcentage de gu\u00e9rison automatique",
		Zl: "Ruby",
		Hg: "Param\u00e8tres g\u00e9n\u00e9raux",
		Hj: "Tout vendre",
		Ij: "Vendre s\u00e9lectionn\u00e9s",
		fa: "Armes",
		ca: "Boucliers",
		U: "Armure de poitrine",
		X: "Casques",
		W: "Gants",
		da: "Chaussures",
		aa: "Anneaux",
		T: "Amulettes",
		yi: "Utilisable",
		xi: "Am\u00e9liorations",
		Zg: "Nourriture",
		og: "Parchemin de mercenaire",
		ah: "Renforts",
		Ed: "Ajouter un D\u00e9lai Al\u00e9atoire",
		Fd: "Vous pouvez ajouter un d\u00e9lai al\u00e9atoire au bot ici.",
		Mb: "R\u00e9parer",
		Ll: "Fonder uniquement les Bleus?",
		Ol: "Fonder uniquement les Violets?",
		Nl: "Fonder uniquement les Oranges?",
		Xj: "Tout Fondre dans le 2e Onglet?",
		Pl: "Cela ignorera les s\u00e9lections de couleur",
		Xa: "Effacer l'Historique",
		Ch: "Fondre",
		Nd: "Search",
		Bg: "Ench\u00e8re Automatique",
		Od: "Une utilisation excessive des ench\u00e8res peut entra\u00eener un bannissement. Il est recommand\u00e9 de d\u00e9sactiver les autres fonctionnalit\u00e9s d ench\u00e8res pour \u00e9viter les conflits potentiels. Cette fonctionnalit\u00e9 ralentira le bot..",
		mh: "Rechercher dans l'Ench\u00e8re des Gladiateurs",
		oh: "Rechercher dans l'Ench\u00e8re des Mercenaires",
		Wd: "Miser de la Nourriture?",
		mg: "Mise Maximale",
		Xd: "Miser si le statut est inf\u00e9rieur \u00e0",
		Yd: "Objets Mis\u00e9s",
		wk: "Langue de l'Ench\u00e8re",
		xk: "\u00c0 partir de la mise \u00e0 jour 2.9.4, veuillez r\u00e9initialiser la langue ou R\u00c9INITIALISER LE BOT. Assurez-vous que toutes les informations sont correctes, sinon les ench\u00e8res ne fonctionneront pas.",
		Id: "Vous pouvez ajouter des objets pour les rechercher dans le march\u00e9 et les ench\u00e8res. Il montrera \u00e9galement les objets violets dans le march\u00e9 une fois que vous aurez ajout\u00e9 un objet \u00e0 la liste. Si vous souhaitez activer les ench\u00e8res automatiques, utilisez les options ci-dessous.",
		uk: "Utilisez les ench\u00e8res avec prudence!",
		vk: "Les ench\u00e8res automatiques font trop de requ\u00eates au serveur et peuvent entra\u00eener un bannissement si elles sont utilis\u00e9es en permanence!",
		dh: "Renouveler les Points d'\u00c9v\u00e9nement avec des Rubis?",
		se: "Activer l'Huile Automatique",
		zk: "R\u00e9cup\u00e9rer Automatiquement les Huiles Sacr\u00e9es",
		Ok: "Vitesse de V\u00e9rification des Qu\u00eates",
		Sa: "Attaquer les Membres du Gremio ?",
		Qa: 'Ajouter automatiquement les personnes \u00e0 la liste "Attaque" lorsque plus de X OR est vol\u00e9.:',
		Ra: 'Ajouter automatiquement les personnes \u00e0 la liste "\u00c9viter l\'Attaque" lorsque vous perdez contre elles.:',
		Qb: "Attaques au Tableau des Scores",
		Yb: "Tr\u00e8s Long",
		Ab: "Long",
		Ib: "Moyen",
		Vb: "Court",
		Zb: "Tr\u00e8s Court",
		te: "Entrer dans le Monde Souterrain si HP >",
		Yg: "Vitesse de V\u00e9rification des Qu\u00eates",
		Qg: 'Par d\u00e9faut, c\'est "3x". Si le bot pose des probl\u00e8mes avec les qu\u00eates, changez la vitesse des qu\u00eates en fonction de la vitesse de votre serveur.',
		$e: "S\u00e9lection du Sac de Soins",
		ue: "Si vous renouvelez manuellement les points, vous devez cliquer sur le bouton ci-dessus \"Actualiser l'exp\u00e9dition d'\u00e9v\u00e9nement si bloqu\u00e9e !",
		Dk: "Vous devez activer au moins l'une des options suivantes : exp\u00e9dition, donjon, ar\u00e8ne ou cirque pour commencer l'exp\u00e9dition d'\u00e9v\u00e9nement.",
		$g: "Actualisez l'exp\u00e9dition d'\u00e9v\u00e9nement en cas de blocage !",
		kb: "Prot\u00e9ger les Alli\u00e9s ?",
		Vk: "Laissez tous les param\u00e8tres d\u00e9sactiv\u00e9s si vous souhaitez fondre en utilisant les paquets contenant les objets de la liste. Cependant, vous pouvez toujours choisir les couleurs.",
		Ak: "Personnage(D\u00e9sactiv\u00e9) / Mercenaire(Activ\u00e9)",
		Rk: "R\u00e9parer les Deux ?",
		Wk: "Minuteries",
		Timers: "Entrez le nombre de minutes pour chaque minuteur ci-dessous ou laissez-le par d\u00e9faut.",
		nb: "Activer l'Attaque au Tableau des Scores:",
		Ob: "S\u00e9lectionner la Fourchette pour Attaquer",
		Pb: "Le bot attaquera al\u00e9atoirement depuis la liste du tableau des scores.",
		pb: "Attaque de Ligue",
		mb: "Activer l'Attaque de Ligue:",
		Kb: "Attaquer Al\u00e9atoirement",
		Lb: "Attaquer du plus bas au plus haut",
		tk: "Le bot \u00e9vitera par d\u00e9faut d'attaquer les membres du gremio.",
		Pe: "Lieu d'Exp\u00e9dition:",
		Pd: "Collecter Automatiquement les Bonus:",
		Bh: "Passer le Boss",
		ne: "Lieu de Donjon:",
		jh: "R\u00e9initialiser en cas de perte?",
		cf: "Param\u00e8tres de l'Enfer",
		df: "Configurez vos param\u00e8tres de pourcentage de gu\u00e9rison depuis l'onglet Gu\u00e9rison, et assurez-vous que l'interrupteur Gu\u00e9rison est activ\u00e9. Si l'entr\u00e9e dans le monde souterrain vous d\u00e9connecte, allez au lobby et activez la case \u00e0 cocher Connexion Automatique.",
		af: "Difficult\u00e9 de l'Enfer",
		Sd: "Entrer Automatiquement dans l'Enfer: / Enfer Mode",
		Ai: "Utiliser Mobilisation si les points = 0",
		Ei: "Utiliser les Rubis?",
		ve: "Sortir du monde souterrain s'il n'y a plus de points?",
		mi: "Le bot essaiera d'abord d'utiliser Villa Medici, si vous ne l'avez pas, il utilisera la potion de gu\u00e9rison. N'oubliez pas d'activer l'interrupteur de Gu\u00e9rison.",
		vi: "L'entr\u00e9e automatique dans le monde souterrain d\u00e9sactivera le donjon/l'ar\u00e8ne/le cirque lors de l'entr\u00e9e dans le monde souterrain.",
		Xk: "Param\u00e8tres de Gu\u00e9rison du Monde Souterrain",
		Di: "Utiliser Villa Medici?",
		Bi: "Utiliser la Potion de Gu\u00e9rison?",
		$f: "INFO: Le bot recherchera les objets sur le march\u00e9 toutes les minutes s\u00e9lectionn\u00e9es, ce qui peut interrompre les attaques pendant la recherche.",
		re: "Activer la Recherche sur le March\u00e9:",
		ag: "Intervalle de Recherche sur le March\u00e9 en Minutes:",
		bg: "Sugg\u00e9r\u00e9: 10 minutes.",
		nf: "Param\u00e8tres de l'Objet:",
		lf: "Le Nom de l'Objet Inclut",
		G: "Prix Max",
		pf: "Type d'Objet",
		mf: "Raret\u00e9 de l'Objet",
		ae: "Acheter avec Lien d'\u00c2me?",
		rf: "Objets \u00e0 Acheter",
		qf: "Tentative d'achat d'objets avec des packs si l'un d'eux correspond au prix maximum indiqu\u00e9.:",
		Zd: "Objets Achet\u00e9s:",
		Vg: "Ignorer le Filtre de Qu\u00eates",
		Ug: "Saisissez des mots-cl\u00e9s pour filtrer les qu\u00eates que vous ne souhaitez pas accepter. You can also use this to accept quests by their reward using keywords.",
		V: "Saisir un Mot-cl\u00e9",
		I: "Ajouter",
		bh: "Supprimer",
		de: "Effacer",
		Sg: "Accepter le Filtre de Qu\u00eates",
		Tg: "Saisissez des mots-cl\u00e9s pour choisir les qu\u00eates \u00e0 accepter. Cela ignorera les types de qu\u00eates",
		Ca: "Ignorer les Qu\u00eates Temporelles ?",
		Pk: "Qu\u00eates",
		Qd: "Costume Automatique",
		zi: "Utiliser le Costume ?",
		Vd: "Combat de Base",
		me: "Combat en Donjon",
		Rd: "Le bot ne portera Dis Pater Normal et Medium que si vos points d'exp\u00e9dition/donjon sont de 0.",
		bf: "Param\u00e8tres de Gu\u00e9rison en Enfer",
		Hd: "Attaquer le Boss quand disponible ?",
		qb: "L'attaque en Ligue se d\u00e9sactivera apr\u00e8s 5 attaques infructueuses.",
		ef: "Huiles Sacr\u00e9es",
		wg: "Nom de l'Objet",
		Z: "Niveau Minimum de l'Objet",
		Aa: "Qualit\u00e9 Minimum de l'Objet",
		Gd: "Appliquer/R\u00e9initialiser la Minuterie",
		hf: "Ignorer la Combinaison de Pr\u00e9fixe/Suffixe",
		Gi: "Oui",
		Dg: "Non",
		Oa: "Ajouter un Pr\u00e9fixe",
		Pa: "Ajouter un Suffixe",
		Dh: "Liste des Objets \u00e0 Ignorer pour la Fusion",
		Jb: "Pr\u00e9fixe",
		Wb: "Suffixe",
		ih: "R\u00e9initialiser les Objets Expir\u00e9s",
		Eh: "Fusionner au Hasard depuis les Paquets ?",
		Fh: "Onglet Fusion",
		ob: "Extras",
		Ld: "Ench\u00e8res",
		eg: "March\u00e9",
		Xb: "Minuteries",
		di: "Fusion",
		ci: "Fusionner s'il n'y a pas assez d'or",
		$h: "Fusionner s'il n'y a pas d'objet",
		Da: "R\u00e9paration",
		Sh: "Garder de l'Or sur le March\u00e9 de Guilde",
		Oh: "Garder de l'Or aux Ench\u00e8res",
		gi: "Entra\u00eenement",
		Vh: "R\u00e9initialiser les Expir\u00e9s",
		ei: "Stockage \u00e0 la Forge",
		Mh: "V\u00e9rification des Ench\u00e8res",
		Xh: "Recherche",
		v: "Activer",
		yg: "Or Minimum",
		Rb: "S\u00e9lectionner une Heure",
		lb: "Donner de l'Or \u00e0 la Guilde",
		he: "Il donnera toutes les 5 minutes. Vous pouvez changer l'intervalle depuis l'onglet des minuteries",
		ff: "Combien souhaitez-vous donner ?",
		ie: "Donner lorsque vous avez plus de >",
		tf: "Moins de <",
		fh: "R\u00e9initialiser les Objets Expir\u00e9s et les Autres Param\u00e8tres",
		hh: "R\u00e9initialiser dans :",
		Jk: "Maintenez Ctrl (Cmd sur Mac) enfonc\u00e9 pour s\u00e9lectionner plusieurs objets",
		jf: "Import/Export des Param\u00e8tres",
		Re: "Exporter les Param\u00e8tres",
		kf: "Importer les Param\u00e8tres",
		pg: "Message \u00e0 Tous les Joueurs",
		qg: "[N\u00e9cessite une Cl\u00e9 Ultra Premium, message sur Discord pour l'obtenir.]",
		rg: "Saisir le message \u00e0 envoyer",
		fe: "Pour des scripts personnalis\u00e9s, contactez-nous sur Discord",
		tg: "Envoyer",
		ug: "Afficher les Joueurs",
		sg: "Tout S\u00e9lectionner",
		vg: "Tout D\u00e9s\u00e9lectionner",
		sf: "Assurez-vous que votre inventaire ait suffisamment d'espace. Le temps de recharge est de 2 minutes.",
		ig: "Vendre de la Nourriture",
		Eb: "Vendre de la Nourriture"
	},
	Oh = {
		Yj: "El\u0151sz\u00f6r olvassza fel a magasabb sz\u00edneket?",
		$b: "Csak a j\u00e1t\u00e9koslist\u00e1ra t\u00e1madjunk?",
		ac: "Ha ez az opci\u00f3 be van kapcsolva, a bot csak a j\u00e1t\u00e9koslist\u00e1n szerepl\u0151 j\u00e1t\u00e9kosokat t\u00e1madja meg. Ha ez az opci\u00f3 nincs bekapcsolva, a bot v\u00e9letlenszer\u0171 j\u00e1t\u00e9kosokat t\u00e1mad meg.",
		Fk: "Az exped\u00edci\u00f3s be\u00e1ll\u00edt\u00e1said helytelenek vagy v\u00e1ratlan oldaladatok vannak!",
		Gk: "Az exped\u00edci\u00f3s be\u00e1ll\u00edt\u00e1sod helytelen! Letiltott sz\u00f6rnyet \u00e1ll\u00edtott\u00e1l be, ami helytelen.",
		Tk: "Csak az \u00f6sszes kiv\u00e1lasztott sz\u00edn\u0171 alvil\u00e1gi elemet \u00e1ll\u00edtsa vissza?",
		Ba: "Priorit\u00e9",
		Sb: "D\u00e9finir la Priorit\u00e9",
		Ng: "Points",
		Gh: "Stat",
		Oi: "Collect Gold",
		Jj: "Alvil\u00e1gi t\u00e1rgyakat eladni?",
		pj: "A bot minden m\u0171veletben f\u00e9szket keres, nem csak exped\u00edci\u00f3k sor\u00e1n.",
		nj: "F\u00e9szek keres\u00e9si t\u00edpus",
		lj: "Ne csin\u00e1lj semmit",
		mj: "Gyors keres\u00e9s",
		oj: "Alapos keres\u00e9s",
		El: "After expedition points are consumed, travel to Germania to consume Dungeon points",
		sk: "Kattintson ide, ha a jav\u00edt\u00e1s beragad",
		Jg: "R\u00e9szleges Jav\u00edt\u00e1s",
		Ye: "Teljes Jav\u00edt\u00e1s",
		Ig: "R\u00e9szleges vagy Teljes Jav\u00edt\u00e1s",
		pe: "Korl\u00e1t Enged\u00e9lyez\u00e9se",
		gj: "Korl\u00e1toz\u00e1s",
		hj: "Ha korl\u00e1tozni szeretn\u00e9d a t\u00e1mad\u00e1sok sz\u00e1m\u00e1t az ellens\u00e9gre, enged\u00e9lyezd ezt az opci\u00f3t \u00e9s \u00e1ll\u00edtsd be a korl\u00e1tot. A bot folytatja a t\u00e1mad\u00e1st a t\u00f6bbi ellens\u00e9ggel, miut\u00e1n befejezte a kiv\u00e1lasztott sz\u00f6rny elleni t\u00e1mad\u00e1sokat.",
		ke: "Ne l\u00e9pj be az alvil\u00e1gba alvil\u00e1gi jelmezben",
		je: "Ha nem akarsz alvil\u00e1gi jelmezben az alvil\u00e1gba l\u00e9pni, enged\u00e9lyezd ezt az opci\u00f3t",
		ui: "Alvil\u00e1g",
		li: "Alvil\u00e1gi Buffok",
		ni: "Haszn\u00e1ld az istenek erej\u00e9t az alvil\u00e1gba l\u00e9p\u00e9s ut\u00e1n?",
		oi: "V\u00e1laszd ki az isteneket, akikt\u0151l er\u0151t szeretn\u00e9l nyerni:",
		pi: "Haszn\u00e1lj fegyver er\u0151s\u00edt\u00e9st a fegyveren?",
		ri: "Haszn\u00e1lj p\u00e1nc\u00e9l er\u0151s\u00edt\u00e9st a k\u00f6vetkez\u0151 felszerel\u00e9sen:",
		Ck: "A leh\u0171l\u00e9si id\u0151 30 perc. Ha nincs rajtad jelmez, a bot null\u00e1zza a leh\u0171l\u00e9si id\u0151t.",
		Uk: "Sz\u00ednek kiv\u00e1laszt\u00e1sa",
		Ya: "Vulcanus Kov\u00e1csm\u0171helye",
		bb: "Feronia F\u00f6ldi Pajzsa",
		cb: "Neptunusz Foly\u00e9kony Ereje",
		eb: "Aelous L\u00e9gies Szabads\u00e1ga",
		fb: "Pl\u00fat\u00f3 Hal\u00e1los K\u00f6de",
		gb: "Juno \u00c9let Lehelete",
		hb: "Harag Hegyeinek Pikkelyes P\u00e1nc\u00e9lja",
		ib: "Sas Szemei",
		jb: "Saturnusz T\u00e9li \u00d6lt\u00f6z\u00e9ke",
		Za: "Bubona Bikap\u00e1nc\u00e9lja",
		$a: "Mercerius Rabl\u00f3ruh\u00e1i",
		ab: "Ra F\u00e9nyk\u00f6nt\u00f6se",
		hg: "Csomagok",
		cg: "K\u00e9szlet",
		K: "Min. \u00c1r",
		J: "H\u00e1ny darab",
		Db: "T\u00e1rgyak Elad\u00e1sa",
		Cb: "Keres\u00e9s ebben",
		dg: "Anyag Sz\u00edne",
		Bb: "T\u00e1rgy Sz\u00edne",
		kg: "Rakt\u00e1r",
		za: "V\u00e1lt\u00e1s Anyagokra",
		Fb: "V\u00e1lt\u00e1s T\u00e1rgyakra",
		jg: "Anyagok Elad\u00e1sa",
		wa: "K\u00e9rj\u00fck, adjon meg \u00e9rv\u00e9nyes t\u00e1rgyn\u00e9v, \u00e1rfekv\u00e9s \u00e9s mennyis\u00e9get.",
		xa: "Nincsenek megfelel\u0151 t\u00e1rgyak a kiv\u00e1lasztott keres\u00e9si helyeken.",
		ya: "Minden t\u00e1rgy sikeresen list\u00e1zva!",
		Nk: "Minden anyag sikeresen list\u00e1zva!",
		fg: "Ha fix \u00e1ron szeretne t\u00e1rgyakat eladni, ugyanazt az \u00e9rt\u00e9ket adja meg a min \u00e9s max \u00e1rra.",
		gg: "Ez a funkci\u00f3 m\u00e9g k\u00eds\u00e9rleti, \u00f3vatosan haszn\u00e1lja. Ha nem ad meg fix \u00e1rat, az elemek v\u00e9letlenszer\u0171en ker\u00fclnek list\u00e1z\u00e1sra a megadott minimum \u00e9s maximum \u00e1r k\u00f6z\u00f6tt.",
		yk: "Be\u00e1ll\u00edtja a maxim\u00e1lis aranyat, amit a bot egy ciklusban elk\u00f6lt.",
		Ta: "A bot licit\u00e1lni kezd minden \u00e9tel t\u00e1rgyra, ha enged\u00e9lyezve van. Nem kell enged\u00e9lyezned a gladi\u00e1tor/zsoldos kapcsol\u00f3kat.",
		Jd: "A bot nem licit\u00e1l az sz\u00f6vets\u00e9gesei licitjeire.",
		Kd: "Figyelmen k\u00edv\u00fcl hagyja az El\u0151tag/Ut\u00f3tag kombin\u00e1ci\u00f3t t\u00e1rgy keres\u00e9sekor az aukci\u00f3n.",
		Qj: "V\u00e1laszd ki azokat a t\u00e1rgyt\u00edpusokat, amelyeket be akarsz olvasztani.",
		Rj: "V\u00e1laszd ki azokat a sz\u00edneket, amelyeket be akarsz olvasztani.",
		Sj: "V\u00e1laszd ki az t\u00e1rgyak szintj\u00e9t, amelyeket be akarsz olvasztani.",
		Tj: "V\u00e1laszd ki a kalap\u00e1csot, amit haszn\u00e1lni szeretn\u00e9l.",
		Uj: "Figyelj arra, hogy az els\u0151 mez\u0151 melletti z\u00f6ld \u00e9s piros k\u00f6r a szab\u00e1ly enged\u00e9lyez\u00e9s\u00e9hez/letilt\u00e1s\u00e1hoz van.",
		Vj: "Ha v\u00e9letlenszer\u0171en szeretn\u00e9l beolvasztani b\u00e1rmilyen sz\u00ednt vagy t\u00edpust, enged\u00e9lyezheted a `V\u00e9letlenszer\u0171en beolvasztani, ha nincsenek felt\u00e9telek teljes\u00edtve? (A tutorial vide\u00f3ban utolj\u00e1ra enged\u00e9lyezett opci\u00f3)",
		Fj: "R\u00e9parer avant la Fusion",
		Le: "Sz\u00f6rny Kiv\u00e1laszt\u00e1sa",
		ze: "Homok\u00f3ra/Rubin Haszn\u00e1lata?",
		Ek: "Rubin Haszn\u00e1lata?",
		Ce: "Mozg\u00f3s\u00edt\u00e1s Haszn\u00e1lata?",
		Be: "\u00c9letital Haszn\u00e1lata?",
		ye: "Gy\u00f3gy\u00edt\u00e1s Sz\u00e1zal\u00e9ka (%)",
		Je: "T\u00e1mad\u00e1sok Sz\u00e1ma",
		Ae: "T\u00e1mad\u00e1si Id\u0151k\u00f6z (m\u00e1sodpercben)",
		we: "V\u00e9grehajtott T\u00e1mad\u00e1sok",
		xe: "H\u00e1tral\u00e9v\u0151 Homok\u00f3ra",
		He: "Megjegyz\u00e9s: \u00c9leter\u0151-p\u00f3ci\u00f3kat haszn\u00e1l gy\u00f3gy\u00edt\u00e1sra, nem \u00e9telt.",
		Ie: "Megjegyz\u00e9s: Ha a t\u00e1mad\u00e1sok id\u0151 el\u0151tt meg\u00e1llnak, pr\u00f3b\u00e1lja meg az 'T\u00e1mad\u00e1sok Vissza\u00e1ll\u00edt\u00e1sa' opci\u00f3t.",
		Me: "Ind\u00edt\u00e1s",
		Ke: "Vissza\u00e1ll\u00edt\u00e1s",
		Ne: "Le\u00e1ll\u00edt\u00e1s",
		Oe: "Exped\u00edci\u00f3 Be\u00e1ll\u00edt\u00e1sai (Kattintson minimaliz\u00e1l\u00e1shoz)",
		De: "Sz\u00f6rny 1",
		Ee: "Sz\u00f6rny 2",
		Fe: "Sz\u00f6rny 3",
		Ge: "Sz\u00f6rny 4",
		Qk: "R\u00e9parer avant la Fusion",
		Mi: "Ez az opci\u00f3 haszn\u00e1lja a cervisia-t, amikor lej\u00e1r a pr\u00e9mium tags\u00e1god.",
		sj: "Ez az opci\u00f3 aktiv\u00e1lja \u00e9s v\u00e1laszt olajokat az istenek jutalmai k\u00f6z\u00fcl. Haszn\u00e1lhatja az 1. \u00e9s 3. sz\u00e1m\u00fa olajokat a karakteren, de a 2. sz\u00e1m\u00fa csak csomagokba ker\u00fcl.",
		Ki: "Ez az opci\u00f3 a be\u00e1ll\u00edtott id\u0151ben haszn\u00e1lja a buffokat. Megkeresi a csomagokban l\u00e9v\u0151 buffokat \u00e9s alkalmazza \u0151ket a karakteren.",
		ij: "Ez az opci\u00f3 bevisz az alvil\u00e1gba. Ne felejtsd el enged\u00e9lyezni az Auto Bejelentkez\u00e9st az Extra f\u00fcl\u00f6n, k\u00fcl\u00f6nben kijelentkezhetsz az alvil\u00e1gba l\u00e9p\u00e9skor [J\u00e1t\u00e9k Hiba]",
		bc: "Ez az opci\u00f3 csak az ar\u00e9na/cirkusz list\u00e1t t\u00e1madja meg. Ha nem, a bot kihagyja.",
		Cj: "Ez az opci\u00f3 csak pr\u00e9mium licencek sz\u00e1m\u00e1ra van. Szimul\u00e1l egy t\u00e1mad\u00e1st egy felhaszn\u00e1l\u00f3 ellen 75%-os gy\u0151zelmi r\u00e1t\u00e1val, miel\u0151tt megt\u00e1madn\u00e1.",
		Md: "Nem kell enged\u00e9lyezned a f\u0151 aukci\u00f3 kapcsol\u00f3t, hogy ezt az opci\u00f3t haszn\u00e1lhasd.",
		kk: "Ez az opci\u00f3 m\u00e1sodpercenk\u00e9nt friss\u00edti az oldalt, amikor az aukci\u00f3 -Nagyon R\u00f6vid- \u00e1llapotban van, hogy folyamatosan licit\u00e1ljon \u00e9s megnyerje az aukci\u00f3t.",
		Oj: "Ha egyik olvaszt\u00e1si felt\u00e9tel sem teljes\u00fcl, akkor v\u00e9letlenszer\u0171en olvaszt. Gy\u0151z\u0151dj meg r\u00f3la, hogy v\u00e1lasztott\u00e1l t\u00e1rgyt\u00edpust \u00e9s sz\u00ednt.",
		Pj: "Ez az opci\u00f3 csak a lelt\u00e1rban l\u00e9v\u0151 t\u00e1rgyakat olvasztja. A csomagokban l\u00e9v\u0151 t\u00e1rgyakat figyelmen k\u00edv\u00fcl hagyja.",
		Ua: "Aukci\u00f3s T\u00e1rgyak",
		ng: "Zsoldos T\u00e1rgyak",
		Ub: "Bolt T\u00e1rgyak",
		wi: "Egyedi T\u00e1rgyak",
		Kj: "H\u00e1tt\u00e9r be\u00e1ll\u00edt\u00e1sa feket\u00e9re [N\u00f6veli a teljes\u00edtm\u00e9nyt]",
		Lj: "Gladbot gombok \u00e1thelyez\u00e9se a bal als\u00f3 sarokba?",
		Ni: "Cirkusz T\u00e1mad\u00e1s Gy\u00f3gy\u00edt\u00e1s N\u00e9lk\u00fcl",
		jk: "Sz\u00fcks\u00e9g eset\u00e9n vegy\u00fcnk ki aranyat a csomagokb\u00f3l?",
		Wl: "Az edz\u00e9shez aranyat vettek a csomagokb\u00f3l",
		Dd: "Nem tal\u00e1ltak aranyat a csomagokban az edz\u00e9shez",
		gk: "Jav\u00edtott T\u00e1rgyak",
		$j: "Ar\u00e9na T\u00e1mad\u00e1sok",
		bk: "Cirkusz T\u00e1mad\u00e1sok",
		Cd: "T\u00e1rgyak Vissza\u00e1ll\u00edtva",
		ek: "Exped\u00edci\u00f3s T\u00e1mad\u00e1sok",
		dk: "Kazamata T\u00e1mad\u00e1sok",
		hk: "Alvil\u00e1gi T\u00e1mad\u00e1sok",
		ak: "Ar\u00e9n\u00e1ban Szerzett P\u00e9nz",
		ck: "Cirkuszban Szerzett P\u00e9nz",
		Ul: "Olvasztott T\u00e1rgyak",
		fk: "\u00dajrahasznos\u00edtott Arany",
		$i: "C\u00e9h Csata",
		bj: "C\u00e9h Be\u00e1ll\u00edt\u00e1sok",
		aj: "C\u00e9h N\u00e9v",
		Zi: "V\u00e9letlenszer\u0171 C\u00e9h T\u00e1mad\u00e1s",
		ll: "V\u00e9letlenszer\u0171en t\u00e1madja a c\u00e9heket.",
		Li: "Statisztik\u00e1k Vissza\u00e1ll\u00edt\u00e1sa",
		wl: 'GladBot: A kock\u00e1k seg\u00edts\u00e9g\u00e9vel friss\u00edtse a rejt\u00e9lydobozt, \u00e9s tal\u00e1ljon \u00e9rt\u00e9kes t\u00e1rgyakat, miel\u0151tt kinyitn\u00e1 azokat (stb. jelmezek). Kattintson a "Start" gombra, nyissa meg a l\u00e1d\u00e1kat.',
		Nc: "Wood",
		Dc: "Copper",
		Hc: "Iron",
		Jc: "Leather",
		Oc: "Wool",
		Ec: "Cotton Wool",
		Gc: "Hemp",
		Fc: "Gauze Strip",
		Kc: "Linen Strip",
		Ic: "Jute Patch",
		Mc: "Velvet",
		Lc: "Silk Thread",
		Wc: "Fur",
		Qc: "Bone Splinter",
		Zc: "Scale",
		Tc: "Claw",
		Vc: "Fang",
		Uc: "Dragon Scale",
		Rc: "Bull`s Horn",
		Yc: "Poison Gland",
		Sc: "Cerberus` Pelt",
		Xc: "Hydra Scale",
		$c: "Sphinx Feather",
		ad: "Typhon Leather",
		zc: "Lapis Lazuli",
		tc: "Amethyst",
		sc: "Amber",
		uc: "Aquamarine",
		Ac: "Sapphire",
		xc: "Garnet",
		wc: "Emerald",
		vc: "Diamond",
		yc: "Jasper",
		Bc: "Sugilite",
		nc: "Scorpion Poison",
		qc: "Tincture of Stamina",
		jc: "Antidote",
		ic: "Adrenaline",
		pc: "Tincture of Enlightenment",
		mc: "Potion of Perception",
		kc: "Essence of Reaction",
		lc: "Phial of Charisma",
		rc: "Waters of Oblivion",
		oc: "Soul Essence",
		Ad: "Water Seal",
		ud: "Protection Rune",
		sd: "Earth Mark",
		zd: "Totem of Healing",
		yd: "Talisman of Power",
		wd: "Stone of Fortune",
		td: "Flintstone",
		xd: "Storm Rune",
		vd: "Shadow Rune",
		fd: "Crystal",
		ed: "Bronze",
		kd: "Obsidian",
		nd: "Silver",
		od: "Sulphur",
		hd: "Gold Ore",
		md: "Quartz",
		ld: "Platinum",
		dd: "Almandin",
		gd: "Cuprit",
		jd: "Hellstone",
		Hi: "T\u00e1mad\u00e1s v\u00e9letlenszer\u0171en?",
		Ii: 'Kapcsold ki a "J\u00e1t\u00e9kosok rendez\u00e9se az ar\u00e9n\u00e1ban szint szerint" be\u00e1ll\u00edt\u00e1st a crazy-addonban is.',
		Wg: "Csak az isten t\u00edpus\u00e1n alapul\u00f3 k\u00fcldet\u00e9seket fogadja el.",
		Va: "Automatikus Buff",
		$d: "Csak a pokolban haszn\u00e1lja?",
		Cg: "\u00daj Szab\u00e1ly",
		Ag: "N\u00e9v Tartalmazza",
		isUnderworldItem: "Ez egy alvil\u00e1gi t\u00e1rgy?",
		gf: "Anyagok Figyelmen K\u00edv\u00fcl Hagy\u00e1sa",
		rk: "Utiliser la Pri\u00e8re ?",
		Ci: "Utiliser le Sacrifice ?",
		mk: "Utiliser le tissu pour entrer dans le monde souterrain ?",
		ti: "A m\u00e9lyvil\u00e1gban csak a m\u00e9lyvil\u00e1ggal kapcsolatos k\u00fcldet\u00e9seket fogadja el?",
		si: "Ha enged\u00e9lyezve van, meg kell adnia a m\u00e9lyvil\u00e1gi t\u00e1rgyak nev\u00e9t. Ha a bot megtal\u00e1lja ezeket a t\u00e1rgyakat a m\u00e9lyvil\u00e1gban, elfogadja a k\u00fcldet\u00e9st.",
		Yk: "M\u00e9lyvil\u00e1gi K\u00fcldet\u00e9s T\u00e1rgy",
		il: "Entrez le Nom du Mat\u00e9riel",
		Bk: "A robot im\u00e1dja a kock\u00e1kat! Seg\u00edtenek ruh\u00e1t tal\u00e1lni a l\u00e1d\u00e1kban. De ha nincs kocka, a robot akkor is kinyitja a l\u00e1d\u00e1kat, rem\u00e9lve, hogy tal\u00e1l valami men\u0151 ruh\u00e1t (de lehet, hogy semmit sem tal\u00e1l!)",
		Nj: "Fusionner les Bo\u00eetes de Butin ?",
		oe: "Enable Arena",
		Og: "Prioriz\u00e1lja az ar\u00e9na list\u00e1t?",
		Pg: "Prioriz\u00e1lja a cirkusz list\u00e1t?",
		ge: "Napl\u00f3 men\u00fc letilt\u00e1sa",
		kh: "Jutalom Min. Arany \u00c9rt\u00e9k",
		Xg: "Ha enged\u00e9lyezve van, a K\u00fcldet\u00e9s F\u00f3kusz a legr\u00f6videbb utat k\u00f6veti a dungeon befejez\u00e9s\u00e9hez.",
		Jh: "Dobja a kock\u00e1t automatikusan?",
		Kh: "Vigy\u00e1zva haszn\u00e1lja a dob\u00f3 kock\u00e1t, folyamatosan az els\u0151 kock\u00e1t fogja haszn\u00e1lni, am\u00edg ki nem kapcsolja az opci\u00f3t.",
		ph: "Keres\u00e9s folyamatban",
		eh: "A jav\u00edt\u00e1s alap\u00e9rtelmezett leh\u0171l\u00e9se 10 perc.",
		xg: "Minim\u00e1lis \u00c1llapot",
		ee: "Aktu\u00e1lis t\u00e9tel a munkapadon [T\u00f6r\u00f6lje, ha a bot v\u00e1ratlanul sz\u00fcnetelt]",
		Df: "Kov\u00e1csolt er\u0151forr\u00e1sok sikeresen elmentve a horreumhoz.",
		zf: "Piac ellen\u0151rz\u00e9se t\u00e1rgyak sz\u00e1m\u00e1ra...",
		yb: "T\u00e9tel \u00e1thelyezve a munkapadra.",
		Qf: "T\u00e9tel sikeresen jav\u00edtva \u00e9s felszerelve.",
		Rf: "T\u00e9tel sikeresen jav\u00edtva.",
		Lk: "A jav\u00edt\u00e1s sikertelen. Az oldal friss\u00edt\u00e9sre ker\u00fcl.",
		Nf: "Anyagok felv\u00e9tele...",
		Zf: "V\u00e1rakoz\u00e1s a jav\u00edt\u00e1sra...",
		Pf: "Jav\u00edt\u00e1s elindult: .",
		va: "Jav\u00edt\u00e1s: T\u00e9tel mozgat\u00e1sa az invent\u00e1riumb\u00f3l a t\u00e1sk\u00e1ba",
		Of: "Jav\u00edt\u00e1s: T\u00e9tel mozgat\u00e1sa a munkapadra a csomagol\u00f3ba.",
		ta: "Nem tal\u00e1lhat\u00f3 elegend\u0151 anyag. A jav\u00edt\u00e1si hely le lesz tiltva ",
		Kf: "T\u00e1rgyak keres\u00e9se arany elrejt\u00e9s\u00e9re az aukci\u00f3ban...",
		wf: "Lej\u00e1rt t\u00e1rgyak ellen\u0151rz\u00e9se a csomagokban...",
		xf: "T\u00e9tel sikeresen vissza\u00e1ll\u00edtva.",
		yf: "Nincs \u00fcres hely vagy arany a vissza\u00e1ll\u00edt\u00e1shoz.",
		Ef: "Gy\u0151z\u0151dj\u00f6n meg arr\u00f3l, hogy van elad\u00e1si joga a c\u00e9hes piacon!",
		sb: "Nincs el\u00e9g arany/vagy nincs meg a v\u00e1s\u00e1rl\u00f3 t\u00e1rgy. 30 m\u00e1sodperc v\u00e1rakoz\u00e1s a friss\u00edt\u00e9shez.",
		ub: "A bolt friss\u00edtve lett.",
		vb: "Hiba t\u00f6rt\u00e9nt a gy\u00f3gyul\u00e1s k\u00f6zben.",
		Hf: "Nincs Ruby vagy Cloth, letilt\u00e1sa az opci\u00f3knak.",
		Kk: "Nincs gy\u00f3gy\u00edt\u00f3 t\u00e1rgy a csomagokban.",
		wb: "Nem tal\u00e1lhat\u00f3 megfelel\u0151 t\u00e1rgy",
		If: "Az \u00e9lelmiszereket felvett\u00e9k. A folyamat v\u00e9get \u00e9rt.",
		Jf: "Legal\u00e1bb egy \u00e9tel felv\u00e9telre ker\u00fclt. A folyamat v\u00e9get \u00e9rt.",
		xb: "Nincs megfelel\u0151 hely a t\u00e1sk\u00e1ban az \u00e9tel felv\u00e9tel\u00e9hez.",
		Ff: "\u00c9telek felv\u00e9tele a csomagokb\u00f3l.",
		Gf: "Nincs megfelel\u0151 hely a t\u00e1sk\u00e1ban az \u00e9tel felv\u00e9tel\u00e9hez.",
		tb: "Nincs t\u00f6bb gy\u00f3gy\u00edt\u00f3 t\u00e1rgy. 30 m\u00e1sodperc v\u00e1rakoz\u00e1s.",
		rb: "\u00c9P helyre\u00e1ll\u00edtva.",
		ua: "Nincs teend\u0151, ez\u00e9rt im\u00e1dkozom!",
		Vf: "Friss\u00edt\u00e9s indul 60 m\u00e1sodperc m\u00falva az \u00e9n eg\u00e9szs\u00e9gem \u00e9s a Villa Medici ellen\u0151rz\u00e9s\u00e9re.",
		Wf: "V\u00e1rakoz\u00e1s a Villa Medici-re, friss\u00edt\u00e9s 60 m\u00e1sodperc m\u00falva.",
		Xf: "Elhagytam az alvil\u00e1got.",
		Yf: "Friss\u00edt\u00e9s indul 60 m\u00e1sodperc m\u00falva az \u00e9n eg\u00e9szs\u00e9gem ellen\u0151rz\u00e9s\u00e9re.",
		Lf: "Isteni olajok ellen\u0151rz\u00e9se...",
		Mf: "Isteni olajok felv\u00e9ve.",
		ra: "Sikeres t\u00e1mad\u00e1s a j\u00e1t\u00e9kos ellen AZ AR\u00c9N\u00c1BAN: ",
		sa: "Sikeres t\u00e1mad\u00e1s a j\u00e1t\u00e9kos ellen A CIRKUSZBAN: ",
		uf: "Aukci\u00f3 ellen\u0151rz\u00e9se! K\u00e9rem v\u00e1rjon...",
		vf: "T\u00e1rgyak licit\u00e1l\u00e1sa. K\u00e9rem v\u00e1rjon...",
		Sf: "Automatikus olvasztott t\u00e9tel: ",
		Tf: "Olvaszt\u00e1s alatt \u00e1ll\u00f3 t\u00e9tel: ",
		zb: "Nincs el\u00e9g arany az olvaszt\u00e1shoz. Sz\u00fcks\u00e9ges arany: ",
		Uf: "OLVASZT\u00c1S: T\u00e1rgyak keres\u00e9se az olvaszt\u00e1shoz...",
		Mk: "T\u00e1rgyak keres\u00e9se az olvaszt\u00e1shoz...",
		Af: "Koszt\u00fcm\u00f6k el\u00e9rhet\u0151s\u00e9g\u00e9nek ellen\u0151rz\u00e9se...",
		Cf: "Adom\u00e1nyozva: ",
		Bf: "Kocka dob\u00e1sa...",
		Ue: "Underworld Farm [Manual, Beta]",
		Te: "Farm Location",
		Ve: "Figyelem: Kapcsolja be ezt a funkci\u00f3t a t\u00e1madni k\u00edv\u00e1nt l\u00e9ny felold\u00e1sa ut\u00e1n, nem fog automatikusan t\u00e1madni, hogy feloldja a sz\u00f6rnyet.",
		Se: "Farm Enemy",
		Td: "Automatikus Bejelentkez\u00e9s",
		Ud: "Enged\u00e9lyezned kell a felugr\u00f3 ablakokat a GameForge el\u0151csarnok k\u00e9perny\u0151j\u00e9r\u0151l. N\u00e9zd meg a dokument\u00e1ci\u00f3t, hogy hogyan tedd meg.",
		Kg: "Bot Sz\u00fcneteltet\u00e9se",
		Lg: "Bot sz\u00fcneteltet\u00e9se ennyi id\u0151re: (Perc)",
		Qe: "Lej\u00e1rati D\u00e1tum",
		Fg: "Csak \u00e9telt v\u00e1s\u00e1rolj?",
		Gg: "Ha ezt enged\u00e9lyezed, a bot figyelmen k\u00edv\u00fcl hagyja a kiv\u00e1laszt\u00e1saidat, \u00e9s automatikusan v\u00e1s\u00e1rol \u00e9telt an\u00e9lk\u00fcl, hogy b\u00e1rmit be\u00edrn\u00e1l.",
		Hb: "Maxim\u00e1lis \u00f6sszes arany kiad\u00e1s",
		Gb: "Maxim\u00e1lis arany \u00e9telenk\u00e9nti kiad\u00e1s",
		Eg: "A bot 60 percenk\u00e9nt ellen\u0151rzi az olajokat",
		bi: "Be\u00e1ll\u00edt egy id\u0151z\u00edt\u0151t a olvaszt\u00e1si id\u0151k ellen\u0151rz\u00e9s\u00e9hez.",
		Zh: "Be\u00e1ll\u00edt egy id\u0151z\u00edt\u0151t az olvaszt\u00e1s ellen\u0151rz\u00e9s\u00e9hez, ha nincs aranyad.",
		ai: "Be\u00e1ll\u00edt egy id\u0151z\u00edt\u0151t az olvaszt\u00e1s ellen\u0151rz\u00e9s\u00e9hez, ha nincs el\u00e9rhet\u0151 t\u00e1rgyad.",
		Uh: "Be\u00e1ll\u00edt egy id\u0151z\u00edt\u0151t a t\u00e1rgyak jav\u00edt\u00e1s\u00e1hoz \u00e9s ellen\u0151rz\u00e9s\u00e9hez.",
		Th: "Be\u00e1ll\u00edt egy id\u0151z\u00edt\u0151t a guild piac\u00e1nak arany\u00e1nak ellen\u0151rz\u00e9s\u00e9hez.",
		Ph: "Be\u00e1ll\u00edt egy id\u0151z\u00edt\u0151t az aukci\u00f3 arany tart\u00e1si lehet\u0151s\u00e9g\u00e9hez.",
		Lh: "Be\u00e1ll\u00edt egy id\u0151z\u00edt\u0151t az ar\u00e9na PvP lista ellen\u0151rz\u00e9s\u00e9hez t\u00e1mad\u00e1s c\u00e9lj\u00e1b\u00f3l.",
		Qh: "Be\u00e1ll\u00edt egy id\u0151z\u00edt\u0151t a cirkusz PvP lista ellen\u0151rz\u00e9s\u00e9hez t\u00e1mad\u00e1s c\u00e9lj\u00e1b\u00f3l.",
		hi: "Be\u00e1ll\u00edt egy id\u0151z\u00edt\u0151t a statisztik\u00e1k tr\u00e9ningez\u00e9s\u00e9hez.",
		Wh: "Be\u00e1ll\u00edt egy id\u0151z\u00edt\u0151t a lej\u00e1rt t\u00e1rgyak vissza\u00e1ll\u00edt\u00e1s\u00e1hoz.",
		fi: "Be\u00e1ll\u00edt egy id\u0151z\u00edt\u0151t a kov\u00e1csol\u00f3 anyagok t\u00e1rol\u00e1s\u00e1hoz a horreum-ban.",
		Nh: "Be\u00e1ll\u00edt egy id\u0151z\u00edt\u0151t a gladi\u00e1torok \u00e9s zsoldosok aukci\u00f3j\u00e1nak ellen\u0151rz\u00e9s\u00e9hez.",
		Yh: "Be\u00e1ll\u00edt egy id\u0151z\u00edt\u0151t t\u00e1rgyak keres\u00e9s\u00e9hez az aukci\u00f3ban \u00e9s a boltban.",
		Rh: "Be\u00e1ll\u00edtja a guild adom\u00e1ny k\u00fcld\u00e9s\u00e9nek id\u0151z\u00edt\u0151j\u00e9t.",
		Ze: "Arany Mozgatva",
		le: "Ne adjon el az \u00f6sszeoml\u00e1si \u00e9s aukci\u00f3s list\u00e1n szerepl\u0151 t\u00e9teleket",
		qh: "Bolt Automatiz\u00e1l\u00e1s",
		th: "T\u00e1rgy Keres\u00e9s Be\u00e1ll\u00edt\u00e1sok",
		rh: "Haszn\u00e1lja ezt az eszk\u00f6zt t\u00e1rgyak keres\u00e9s\u00e9hez. Egyszer\u0171en adjon hozz\u00e1 t\u00e1rgyakat a list\u00e1hoz, hat\u00e1rozza meg a ruha mennyis\u00e9g\u00e9t, majd ind\u00edtsa el a keres\u00e9st.",
		uh: "Haszn\u00e1lni k\u00edv\u00e1nt Ruha:",
		vh: "H\u00e1ny ruh\u00e1t haszn\u00e1ljon?",
		ea: "Full Adja meg a T\u00e1rgy Nev\u00e9t",
		Tb: "Adja meg a T\u00e1rgy Szintj\u00e9t",
		xh: "T\u00e1rgy Min\u0151s\u00e9ge",
		wh: "T\u00e1rgy Neve Itt",
		yh: "Keres\u00e9s Ind\u00edt\u00e1sa",
		zh: "\u00c1tugr\u00e1s \u00e9s Folytat\u00e1s",
		Ah: "Keres\u00e9s Le\u00e1ll\u00edt\u00e1sa",
		We: "Guild Piac Rendez\u00e9se",
		zg: "Legdr\u00e1g\u00e1bb",
		be: "Legolcs\u00f3bb",
		ba: "V\u00e1lasszon egy lehet\u0151s\u00e9get",
		qe: "Mettre en surbrillance les objets du monde souterrain",
		Xe: "F\u00f3kuszban a k\u00fcldet\u00e9sre?",
		oq: "Haszn\u00e1ljon rubint, ha nincs ruha?",
		Wa: "Ker\u00fclje azonos szem\u00e9lyek megt\u00e1mad\u00e1s\u00e1t, hogy elker\u00fclje a jelent\u00e9st\u00e9tel\u00e9t. A jelent\u00e9s megn\u00f6veli a kitilt\u00e1s es\u00e9ly\u00e9t.",
		Ml: "Olvad a z\u00f6ld?",
		Rg: "Ne fogadja el a v\u00e9letlenszer\u0171 k\u00fcldet\u00e9seket, ha b\u00e1rmilyen sz\u0171r\u0151t megadott?",
		Pc: "Maxim\u00e1lis haszn\u00e1lhat\u00f3 anyagmin\u0151s\u00e9g",
		Wi: "Enged\u00e9lyezze a zsoldos keres\u00e9st",
		sl: 'Kattints a "Minden Kiv\u00e1lasztott Elad\u00e1sa" gombra az \u00f6sszes t\u00e9tel elad\u00e1s\u00e1hoz. Gy\u0151z\u0151dj meg r\u00f3la, hogy az els\u0151 (1) t\u00e1sk\u00e1dban van el\u00e9g 2x3 \u00fcres hely. Az arany t\u00f6meges gy\u0171jt\u00e9s\u00e9hez sz\u0171rd ki az aranyat, \u00e9s haszn\u00e1ld a "Kiv\u00e1lasztott vagy Mindet Kiv\u00e1laszt" lehet\u0151s\u00e9get.',
		Zj: "\ud83d\udd25 : Hozz\u00e1adja az elemet a koh\u00e1szati list\u00e1hoz.",
		Ji: "\ud83d\udd28 : Hozz\u00e1adja az elemet az \u00e1rver\u00e9si list\u00e1hoz.",
		Ej: "Friss\u00edtsd a boltot anyaggal, amikor tele van",
		Al: "Oldal:",
		Aj: "Meg\u00e1ll\u00edt",
		yj: "Elad\u00e1s Ezen az Oldalon",
		vj: "Kiv\u00e1lasztott Kiv\u00e1laszt\u00e1sa",
		uj: "Mindent Kiv\u00e1laszt",
		Bj: "Automatikus Csomagol\u00e1si Be\u00e1ll\u00edt\u00e1sok",
		zj: "Er\u0151forr\u00e1sok K\u00fcld\u00e9se",
		wj: "Minden Kiv\u00e1lasztott Elad\u00e1sa",
		ma: "T\u00e9tel T\u00edpusa",
		oa: "Fegyverek",
		S: "Pajzsok",
		M: "P\u00e1nc\u00e9lok",
		P: "Sisakok",
		O: "Keszty\u0171k",
		N: "Csizm\u00e1k",
		na: "Gy\u0171r\u0171k",
		ka: "Amulettek",
		Ia: "Haszn\u00e1lati T\u00e1rgyak (\u00c9telek)",
		Na: "Fejleszt\u00e9sek",
		tj: "Er\u0151s\u00edt\u00e9sek",
		Ka: "Receptek",
		Ja: "Zsoldosok",
		Ma: "Kov\u00e1csol\u00f3 Eszk\u00f6z\u00f6k",
		La: "Pergamenek",
		rd: "Er\u0151s\u00edt\u00e9sek",
		pd: "Esem\u00e9ny T\u00e1rgyak",
		qd: "Kov\u00e1csol\u00e1shoz Val\u00f3 T\u00e1rgyak",
		zl: "Arany",
		Ha: "Minden",
		Bl: "Min\u0151s\u00e9g",
		pa: "Feh\u00e9r",
		C: "Z\u00f6ld",
		B: "K\u00e9k",
		D: "Lila",
		H: "Narancss\u00e1rga",
		R: "Piros",
		xj: "Az \u00d6sszes Elad\u00e1si Be\u00e1ll\u00edt\u00e1s",
		Mj: "Elhanyagolja a El\u0151tag / Ut\u00f3tag Kombin\u00e1ci\u00f3t?",
		cj: "H\u00e1ny \u00e9telt vegy\u00e9l/fogj fel?",
		Ri: "Norm\u00e1l",
		Qi: "K\u00f6zepes",
		Pi: "Neh\u00e9z",
		Ea: "Alap",
		Fl: "Ragadt Megjav\u00edt\u00e1s",
		Ik: "Kapcsold ki a Pokol Bel\u00e9p\u00e9s\u00e9t, ha letiltan\u00e1d a Dungeon/Circus/Arena-t. Ha k\u00e9zzel l\u00e9pt\u00e9l be a Pokolba, akkor enged\u00e9lyezned kell a Pokol M\u00f3dot.",
		ce: "V\u00e1lassz alvil\u00e1gi jelmezt",
		Fi: "Viselj alvil\u00e1gi jelmezt, ha el\u00e9rhet\u0151?",
		ki: "K\u00e9pz\u00e9si \u00fatmutat\u00f3: Hat\u00e1rozza meg, h\u00e1nyszor szeretn\u00e9 edzeni a statisztik\u00e1kat, \u00e9s \u00e1ll\u00edtsa be priorit\u00e1saikat. A bot nem fog edzeni, hacsak nincs be\u00e1ll\u00edtva egy priorit\u00e1s. Ha van be\u00e1ll\u00edtott priorit\u00e1s, de nincs t\u00f6bb k\u00e9pzend\u0151 statisztika, a bot a kiv\u00e1lasztott statisztik\u00e1val folytatja.",
		el: "Quest",
		Kl: "Olvaszt\u00e1s",
		Rl: "Olvaszt\u00e1s Be\u00e1ll\u00edt\u00e1sok",
		Wj: "Olvasztott T\u00e1rgyak",
		Sl: "Adj hozz\u00e1 el\u0151tagot vagy ut\u00f3tagot, amint megtal\u00e1lja a csomagokban, aut\u00f3matikusan olvasztani fogja.:",
		Ql: "Olvasztand\u00f3 T\u00e1rgy:",
		ec: "Kattints a t\u00e1rgyra, amelyet meg akarsz jav\u00edtani. Ez a rendszer megjav\u00edtja a k\u00e9t f\u0151 karaktered t\u00e1rgyait ( AR\u00c9NA/CT). Legal\u00e1bb 10000 aranyra van sz\u00fcks\u00e9g a jav\u00edt\u00e1s elind\u00edt\u00e1s\u00e1hoz. Ha egy t\u00e1rgy beragad, az azt jelenti, hogy nincs anyagod a jav\u00edt\u00e1shoz. Pr\u00f3b\u00e1lj szabad helyet k\u00e9sz\u00edteni a t\u00e1sk\u00e1dban. A bot akkor kezdi meg a jav\u00edt\u00e1st, amikor a t\u00e9tel tart\u00f3ss\u00e1ga %0.",
		Zk: "Csak Zsoldosra alkalmaz",
		bl: "Aukci\u00f3 csak akkor licit\u00e1l, ha a lej\u00e1rati id\u0151 k\u00f6zel van a v\u00e9g\u00e9hez.",
		al: "Gy\u0151z\u0151dj meg arr\u00f3l, hogy a 2. lelt\u00e1r f\u00fcl \u00fcres \u00e9s rendelkezik 10K arannyal. A bot megtal\u00e1lja \u00e9s a m\u00e1sodik f\u00fclre helyezi a t\u00e1rgyat, majd legk\u00f6zelebb az oldal friss\u00edt\u00e9se ut\u00e1n olvasztja a t\u00e1rgyat. Az olvaszt\u00e1st minden 5-10 percen bel\u00fcl \u00fajraellen\u0151rzi.",
		fj: "Gy\u00f3gy\u00edt\u00e1s & Buffs",
		Gl: "Nincs el\u00e9g arany az olvaszt\u00e1shoz. Sz\u00fcks\u00e9ges Arany:",
		Jl: "Licit kihagy\u00e1sa: Egyes\u00fclet tag m\u00e1r licit\u00e1lt a t\u00e1rgyra ",
		Il: "Licit kihagy\u00e1sa: M\u00e1r licit\u00e1lt a t\u00e1rgyra ",
		advanced: "Halad\u00f3",
		arena: "Ar\u00e9na",
		ia: "Aut\u00f3matikus T\u00e1mad\u00e1s",
		cc: "T\u00e1mad\u00e1s Elker\u00fcl\u00e9se",
		ga: "J\u00e1t\u00e9kos Hozz\u00e1ad\u00e1sa",
		ha: "Add hozz\u00e1 a j\u00e1t\u00e9kos nev\u00e9t (Same Server)",
		nl: "Meg\u00e1ll\u00edtja a bot, ha elfogyott az \u00e9tel?",
		circusTurma: "Circus Turma",
		Si: "Neh\u00e9zs\u00e9g",
		dungeon: "Kazamata",
		Ti: "Kazamata Be\u00e1ll\u00edt\u00e1sok",
		eventExpedition: "Esem\u00e9ny Exped\u00edci\u00f3",
		expedition: "Exped\u00edci\u00f3",
		Xi: "Exped\u00edci\u00f3 Be\u00e1ll\u00edt\u00e1sok",
		Gj: "V\u00e1lassz Sz\u00f6rnyet",
		pl: "Legmagasabb",
		ol: "Tedd be a gy\u00f3gy\u00edt\u00f3 t\u00e1rgyaid az els\u0151 oldalra a lelt\u00e1rodon bel\u00fcl",
		Cc: "Bent",
		Hh: "Arany T\u00e1rol\u00e1sa",
		Ih: "Arany T\u00e1rol\u00e1sa az Aukci\u00f3ban?",
		nh: "Haszn\u00e1ld a Munk\u00e1sruh\u00e1t a Bolt Felt\u00f6lt\u00e9s\u00e9hez?",
		Sk: "V\u00e1lassz T\u00e9teleket a Vissza\u00e1ll\u00edt\u00e1shoz",
		gh: "Lej\u00e1rt T\u00e9telek Vissza\u00e1ll\u00edt\u00e1sa",
		Nb: "Megjegyz\u00e9s: Az opci\u00f3 enged\u00e9lyez\u00e9s\u00e9vel a bot eladja a k\u00f6zelg\u0151 lej\u00e1rat\u00fa t\u00e1rgyakat a Csomagokb\u00f3l az Egyes\u00fcleti Piacon majd megszak\u00edtja a lej\u00e1rati id\u0151 vissza\u00e1ll\u00edt\u00e1s\u00e1t. Egyes\u00fclet sz\u00fcks\u00e9ges. Gy\u0151z\u0151dj meg r\u00f3la, hogy a t\u00e1sk\u00e1dban van \u00fcres 3x3-as hely.",
		Mg: "Bot v\u00e9letlenszer\u0171 sz\u00fcneteltet\u00e9se m\u0171k\u00f6d\u00e9si [Teszt F\u00e1zis]:",
		Y: "Arany T\u00e1rol\u00e1sa: A bot megtartja ezt az aranyat a karakteren:",
		lg: "Max Arany: A bot elk\u00f6lti, ha az arany nagyobb, mint",
		lh: "A bot v\u00e9letlenszer\u0171 t\u00e1rgyakra fog licit\u00e1lni.",
		Ed: "V\u00e9letlenszer\u0171 k\u00e9sleltet\u00e9s hozz\u00e1ad\u00e1sa",
		Fd: "Itt adhatsz hozz\u00e1 k\u00e9sleltet\u00e9st a bothoz.",
		Mb: "Jav\u00edt\u00e1s",
		Ll: "Csak K\u00e9k t\u00e1rgy Olvaszt\u00e1s?",
		Ol: "Csak Lila t\u00e1rgy Olvaszt\u00e1s?",
		Nl: "Csak Narancss\u00e1rga t\u00e1rgy Olvaszt\u00e1s?",
		Xj: "Mindent Olvassz be a 2. f\u00fclben?",
		Pl: "Ez figyelmen k\u00edv\u00fcl hagyja a sz\u00ednv\u00e1laszt\u00e1sokat",
		Xa: "El\u0151zm\u00e9nyek T\u00f6rl\u00e9se",
		Ch: "Olvaszt\u00e1s",
		Nd: "Search",
		Bg: "Aut\u00f3matikus Aukci\u00f3",
		Od: "Az aukci\u00f3 t\u00falzott haszn\u00e1lata kitilt\u00e1st vonhat maga ut\u00e1n. Az esetleges \u00fctk\u00f6z\u00e9sek elker\u00fcl\u00e9se \u00e9rdek\u00e9ben aj\u00e1nlatos letiltani az egy\u00e9b aj\u00e1nlatt\u00e9teli funkci\u00f3kat. Ez a funkci\u00f3 lelass\u00edtja a botot.",
		mh: "Keres\u00e9s a Gladi\u00e1torok Aukci\u00f3j\u00e1ban",
		oh: "Keres\u00e9s a Zsoldosok Aukci\u00f3j\u00e1ban",
		Wd: "Licit\u00e1l\u00e1s \u00c9telekre?",
		mg: "Maxim\u00e1lis Licit",
		Xd: "Licit\u00e1l\u00e1s, ha az \u00e1llapot kevesebb, mint",
		Yd: "Licit\u00e1lt T\u00e1rgyak",
		wk: "Aukci\u00f3 Nyelve",
		xk: "2.9.4-es friss\u00edt\u00e9ssel kapcsolatban k\u00e9rlek \u00e1ll\u00edtsd be \u00fajra a nyelvet, vagy ALAP\u00c9RTELMEZET BE\u00c1LL\u00cdT\u00c1SOK. Gy\u0151z\u0151dj meg r\u00f3la, hogy minden helyesen van be\u00e1ll\u00edtva, k\u00fcl\u00f6nben a licit\u00e1l\u00e1s nem m\u0171k\u00f6dik.",
		Id: "Hozz\u00e1adhatsz t\u00e9teleket a piac keres\u00e9s\u00e9hez \u00e9s az aukci\u00f3hoz. Amikor egy t\u00e9telt hozz\u00e1ad a list\u00e1hoz, a piac lila t\u00e9teleket is megjelen\u00edti. Ha enged\u00e9lyezed az aut\u00f3matikus licit\u00e1l\u00e1st, az al\u00e1bbi opci\u00f3kat haszn\u00e1lhatod",
		uk: "\u00d3vatosan haszn\u00e1ld az aukci\u00f3t!",
		vk: "Az aut\u00f3matikus licit\u00e1l\u00e1s t\u00fal sok k\u00e9r\u00e9st k\u00fcldhet a szerverre, \u00e9s kitilthatj\u00e1k, ha folyamatosan haszn\u00e1lod!",
		dh: "\u00dajra Aktiv\u00e1lja az Esem\u00e9nypontokat Rubinokkal?",
		se: "Aut\u00f3matikus Olaj Enged\u00e9lyez\u00e9se",
		zk: "Aut\u00f3matikus Szent Olajok Beszerz\u00e9se",
		Ok: "K\u00fcldet\u00e9s ellen\u0151rz\u00e9si Sebess\u00e9g",
		Sa: "T\u00e1madj Egyes\u00fcleti Tagokat?",
		Qa: 'Aut\u00f3matikusan hozz\u00e1adja az embereket az "T\u00e1mad\u00e1s" list\u00e1hoz, amikor t\u00f6bb, mint X ARANYAT rabolsz.:',
		Ra: 'Aut\u00f3matikusan hozz\u00e1adja az embereket az "Elker\u00fclend\u0151 T\u00e1mad\u00e1s" list\u00e1hoz, ha vesz\u00edtesz ellen\u00fck.:',
		Qb: "T\u00e1mad\u00e1sok Statisztik\u00e1i",
		Yb: "Nagyon Hossz\u00fa",
		Ab: "Hossz\u00fa",
		Ib: "K\u00f6zepes",
		Vb: "R\u00f6vid",
		Zb: "Nagyon R\u00f6vid",
		te: "Bel\u00e9p\u00e9s az Alvil\u00e1gba, ha az \u00c9P >",
		Yg: "K\u00fcldet\u00e9s Ellen\u0151rz\u00e9si Sebess\u00e9g",
		Qg: 'Az alap\u00e9rtelmezett "3x". Ha a bot probl\u00e9m\u00e1kat okoz a k\u00fcldet\u00e9sekkel, \u00e1ll\u00edtsd \u00e1t a k\u00fcldet\u00e9s sebess\u00e9g\u00e9t a szerver sebess\u00e9g\u00e9nek megfelel\u0151en.',
		$e: "Gy\u00f3gy\u00edt\u00f3 Kiv\u00e1laszt\u00f3 T\u00e1ska",
		ue: 'Ha manu\u00e1lisan friss\u00edted a pontokat, akkor kattints a fent l\u00e9v\u0151 gombra: "Esem\u00e9ny K\u00fcldet\u00e9s Friss\u00edt\u00e9se, ha beragadt!"',
		Dk: "Legal\u00e1bb az egyiket enged\u00e9lyezned kell a k\u00f6vetkez\u0151k k\u00f6z\u00fcl: exped\u00edci\u00f3, dungeont, ar\u00e9n\u00e1t vagy cirkuszt, hogy elind\u00edtsd az Esem\u00e9ny Exped\u00edci\u00f3t.",
		$g: "Esem\u00e9ny K\u00fcldet\u00e9s Friss\u00edt\u00e9se, ha beragadt!",
		kb: "Fedezze a T\u00e1rsakat?",
		Vk: "Hagyd minden be\u00e1ll\u00edt\u00e1st letiltva, ha a csomagokban szerepl\u0151 elemekkel szeretn\u00e9l olvasztani. Azonban m\u00e9g mindig v\u00e1laszthatsz sz\u00edneket.",
		Ak: "Karakter(Ki) / Zsoldos(Be)",
		Rk: "Mindkett\u0151t Jav\u00edtani?",
		Wk: "Id\u0151z\u00edt\u0151k",
		Timers: "\u00cdrd be az egyes id\u0151z\u00edt\u0151kh\u00f6z a percek sz\u00e1m\u00e1t lent vagy hagyd az alap\u00e9rtelmezetten.",
		nb: "T\u00e1mad\u00e1s Statisztik\u00e1i Enged\u00e9lyez\u00e9se:",
		Ob: "V\u00e1lassz tartom\u00e1nyt a t\u00e1mad\u00e1shoz",
		Pb: "A bot v\u00e9letlenszer\u0171en t\u00e1mad a t\u00e1bl\u00e1zatban szerepl\u0151 j\u00e1t\u00e9kosok k\u00f6z\u00fcl.",
		pb: "Ligat\u00e1mad\u00e1sok",
		mb: "Ligat\u00e1mad\u00e1s Enged\u00e9lyez\u00e9se:",
		Kb: "V\u00e9letlenszer\u0171 T\u00e1mad\u00e1s",
		Lb: "T\u00e1mad\u00e1s alacsonyt\u00f3l a magas szint\u0171 j\u00e1t\u00e9kosokig",
		tk: "A bot alap\u00e9rtelmezetten elker\u00fcli az Egyes\u00fcleti tagok t\u00e1mad\u00e1s\u00e1t.",
		Pe: "Exped\u00edci\u00f3 Helysz\u00edne:",
		Pd: "Aut\u00f3matikus B\u00f3nuszok Begy\u0171jt\u00e9se:",
		Bh: "Boss Kihagy\u00e1sa",
		ne: "Kazamata Helysz\u00edne:",
		jh: "Kazamata \u00fajrakezd\u00e9se veres\u00e9g eset\u00e9n?",
		cf: "Alvil\u00e1g Be\u00e1ll\u00edt\u00e1sok",
		df: "K\u00e9rlek konfigur\u00e1ld a gy\u00f3gy\u00edt\u00e1s sz\u00e1zal\u00e9kos be\u00e1ll\u00edt\u00e1sait a gy\u00f3gy\u00edt\u00e1s f\u00fcl\u00f6n, \u00e9s gy\u0151z\u0151dj meg r\u00f3la, hogy a gy\u00f3gy\u00edt\u00e1s f\u00fcl be van kapcsolva. Ha az alvil\u00e1g bel\u00e9p\u00e9se kijelentkeztet, l\u00e9pj a lobbyba, \u00e9s kapcsold be az aut\u00f3mata bejelentkez\u00e9s jel\u00f6l\u0151n\u00e9gyzetet.",
		af: "Alvil\u00e1g Neh\u00e9zs\u00e9g",
		Sd: "Aut\u00f3matikus Alvil\u00e1g Bel\u00e9p\u00e9s: / Alvil\u00e1g Mode",
		Ai: "Mobiliz\u00e1ci\u00f3 haszn\u00e1lata, ha pontok = 0",
		Ei: "Rubinok haszn\u00e1lata?",
		ve: "Kil\u00e9p\u00e9s az alvil\u00e1gb\u00f3l, ha nincsenek pontok?",
		mi: "A bot megpr\u00f3b\u00e1lja el\u0151sz\u00f6r a Villa Medici-t haszn\u00e1lni, ha nincs, akkor gy\u00f3gy\u00edt\u00f3 italt haszn\u00e1l. Ne felejtsd el bekapcsolni a Gy\u00f3gy\u00edt\u00e1s kapcsol\u00f3t.",
		vi: "Az aut\u00f3matikus alvil\u00e1g bel\u00e9p\u00e9s letiltja a kazamata/ar\u00e9na/circus be\u00e1ll\u00edt\u00e1sokat az alvil\u00e1g bel\u00e9p\u00e9sekor.",
		Xk: "Alvil\u00e1g Gy\u00f3gy\u00edt\u00e1si Be\u00e1ll\u00edt\u00e1sok",
		Di: "Villa Medici Haszn\u00e1lata?",
		Bi: "Gy\u00f3gy\u00edt\u00f3 Ital Haszn\u00e1lata?",
		$f: "INF\u00d3: A bot minden kiv\u00e1lasztott percben keresni fog piaci t\u00e9teleket, ami meg\u00e1ll\u00edthatja a t\u00e1mad\u00e1st a keres\u00e9s alatt.",
		re: "Piaci Keres\u00e9s Enged\u00e9lyez\u00e9se:",
		ag: "Piaci Keres\u00e9s Id\u0151k\u00f6z Percekben:",
		bg: "Javasolt 10 perc.",
		nf: "T\u00e9tel Be\u00e1ll\u00edt\u00e1sok:",
		lf: "T\u00e9tel N\u00e9v Tartalmazza",
		G: "Max \u00c1r",
		pf: "T\u00e9tel T\u00edpus",
		mf: "T\u00e9tel Ritkas\u00e1g",
		ae: "L\u00e9lekhez k\u00f6t\u00f6ttet v\u00e1s\u00e1roljon?",
		rf: "V\u00e1s\u00e1roland\u00f3 T\u00e9telek",
		qf: "Megpr\u00f3b\u00e1lja megvenni a t\u00e1sk\u00e1ban l\u00e9v\u0151 legnagyobb \u00e1ron tal\u00e1lhat\u00f3 t\u00e9telt, ha b\u00e1rmelyik megegyezik a maxim\u00e1lis \u00e1r be\u00e1ll\u00edt\u00e1ssal.:",
		Zd: "Megv\u00e1s\u00e1rolt T\u00e9telek:",
		dj: "Gy\u00f3gy\u00edt\u00e1s Sz\u00e1zal\u00e9k",
		pk: "\u00c9tel V\u00e1s\u00e1rl\u00e1sa a Boltb\u00f3l?",
		qk: "Gy\u00f3gy\u00edt\u00f3 eszk\u00f6z haszn\u00e1lata a Csomagb\u00f3l?",
		lk: "Cervisia haszn\u00e1lata?",
		nk: "Toj\u00e1sok haszn\u00e1lata?",
		tl: "Utols\u00f3 Haszn\u00e1lat",
		location: "Helysz\u00edn",
		Strength: "Er\u0151",
		Dexterity: "\u00dcgyess\u00e9g",
		Agility: "F\u00fcrges\u00e9g",
		Constitution: "Alkat",
		Charisma: "Karizma",
		Intelligence: "Intelligencia",
		ii: "Gyakorl\u00e1s Be\u00e1ll\u00edt\u00e1sok",
		ji: "V\u00e1laszd ki az attrib\u00fatumokat, amiket szeretn\u00e9l edzeni. Akkor fogja elkezdeni az edz\u00e9st, ha van el\u00e9g aranyad.",
		cd: "K\u00f6vetkez\u0151 l\u00e9p\u00e9s",
		qj: "Nem",
		rj: "Norm\u00e1l",
		xl: "Ellens\u00e9g",
		yl: "Ellens\u00e9g Szintje",
		Dj: "K\u00e9rd\u00e9sek",
		random: "V\u00e9letlenszer\u0171",
		Hl: "Be\u00e1ll\u00edt\u00e1sok",
		Tl: "Hamarosan...",
		type: "Kattints az ikonokra a k\u00e9rd\u00e9s t\u00edpus\u00e1nak kiv\u00e1laszt\u00e1s\u00e1hoz.",
		$l: "Igen",
		A: "Aukci\u00f3/Keres\u00e9s",
		Bd: "T\u00e9telek Hozz\u00e1ad\u00e1sa",
		ik: "Fejleszt\u0151t\u00e1rgyak Aut\u00f3matikus T\u00e1rol\u00e1sa",
		Vl: "Elk\u00fcld\u00e9s",
		rl: "Id\u0151k\u00f6z : ",
		gl: "Aut\u00f3matikus Licit Enged\u00e9lyez\u00e9se",
		hl: "Ne licit\u00e1ljon, ha az Egyes\u00fcleti tag m\u00e1r licit\u00e1lt",
		Xl: "\u00datmutat\u00f3",
		dc: "V\u00e1lassz a fenti gombok k\u00f6z\u00fcl, hogy akarod-e az ar\u00e9n\u00e1ban a legkisebb vagy a legmagasabb szint\u0171 ellenfelet. T\u00f6bb felhaszn\u00e1l\u00f3 lass\u00edthatja a bot m\u0171k\u00f6d\u00e9s\u00e9t.",
		$k: "Kezdetnek adj hozz\u00e1 egy t\u00e9telt a list\u00e1hoz (pl. `Lucius`). Miut\u00e1n hozz\u00e1adtad, a bot keresni fogja a t\u00e1rgyakat \u00e9s megjelen\u00edti a keres\u00e9si eredm\u00e9nyeket a k\u00e9perny\u0151 bal oldal\u00e1n. Az aut\u00f3matikus aukci\u00f3 c\u00e9lj\u00e1b\u00f3l is keressen r\u00e1 a t\u00e1rgyra. Ha enged\u00e9lyezed az aut\u00f3matikus licit\u00e1l\u00e1st, a bot rendszeres id\u0151k\u00f6z\u00f6nk\u00e9nt keresni fogja a t\u00e9teleket a megadott id\u0151szak alapj\u00e1n. Ha a bot megtal\u00e1lja a t\u00e1rgyat \u00e9s van el\u00e9g p\u00e9nzed, aut\u00f3matikusan licit\u00e1l majd helyetted. *Megjegyz\u00e9s*: egyedi t\u00e1rgyak keres\u00e9s\u00e9hez a boltban legal\u00e1bb 1 v\u00e9letlenszer\u0171 t\u00e1rgyat hozz\u00e1 kell adnod a keres\u00e9si list\u00e1hoz.",
		jl: "A sz\u00f6rny sz\u00e1m\u00e1t a fenti gombok k\u00f6z\u00fcl v\u00e1laszthatod ki. A 1 a legbaloldali sz\u00f6rnyet k\u00e9pviseli. Gy\u0151z\u0151dj meg r\u00f3la, hogy megfelel\u0151 helyet v\u00e1lasztasz, k\u00fcl\u00f6nben a bot sz\u00fcnetelhet.",
		Ui: "V\u00e1lassz nehezs\u00e9get a kazamat\u00e1hoz a fentiek k\u00f6z\u00fcl. Gy\u0151z\u0151dj meg r\u00f3la, hogy megfelel\u0151 helyet v\u00e1lasztasz, k\u00fcl\u00f6nben a bot sz\u00fcnetelhet.",
		ej: "Gy\u00f3gy\u00edt\u00e1s Be\u00e1ll\u00edt\u00e1sok",
		Vi: "Felesleges arany t\u00e1rol\u00e1sa az egyes\u00fcletben az egyes\u00fcleti piacon t\u00e1rgyak v\u00e1s\u00e1rl\u00e1s\u00e1val. -> Min. Arany",
		ul: "Mindent Mozgat",
		vl: "Kijel\u00f6ltek Mozgat\u00e1sa",
		cl: "Aut\u00f3matikus Gy\u00f3gy\u00edt\u00e1s",
		dl: "Aut\u00f3matikus Gy\u00f3gy\u00edt\u00e1s Sz\u00e1zal\u00e9k",
		Zl: "Rubin",
		Hg: "\u00c1ltal\u00e1nos Be\u00e1ll\u00edt\u00e1sok",
		Hj: "Mindent Elad",
		Ij: "Kijel\u00f6ltek Elad\u00e1sa",
		fa: "Fegyverek",
		ca: "Pajzsok",
		U: "Mellv\u00e9rtek",
		X: "Sisakok",
		W: "Keszty\u0171k",
		da: "Cip\u0151k",
		aa: "Gy\u0171r\u0171k",
		T: "Amulettek",
		yi: "\u00c9telek",
		xi: "Fejleszt\u00e9sek",
		Zg: "Receptek",
		og: "Tekercsek",
		ah: "Er\u0151s\u00edt\u00e9sek",
		Vg: "K\u00fcldet\u00e9s Sz\u0171r\u0151 Figyelmen K\u00edv\u00fcl Hagy\u00e1sa",
		Ug: "\u00cdrja be a sz\u0171rend\u0151 kulcsszavakat, hogy kisz\u0171rje azokat a k\u00fcldet\u00e9seket, amelyeket nem szeretne v\u00e1llalni. You can also use this to accept quests by their reward using keywords.",
		V: "Adjon meg kulcssz\u00f3t",
		I: "Hozz\u00e1ad\u00e1s",
		bh: "Elt\u00e1vol\u00edt\u00e1s",
		de: "T\u00f6rl\u00e9s",
		Sg: "K\u00fcldet\u00e9s Sz\u0171r\u0151 Elfogad\u00e1sa",
		Tg: "\u00cdrja be a kulcsszavakat, hogy kiv\u00e1lassza, melyik k\u00fcldet\u00e9seket szeretn\u00e9 v\u00e1llalni. Ez figyelmen k\u00edv\u00fcl hagyja a k\u00fcldet\u00e9st\u00edpusokat",
		Ca: "Id\u0151 Sz\u0171r\u00e9s\u0171 K\u00fcldet\u00e9sek Kihagy\u00e1sa?",
		Pk: "K\u00fcldet\u00e9sek",
		Qd: "Automatikus Kost\u00fcm",
		zi: "Kost\u00fcm Haszn\u00e1lata?",
		Vd: "Alap Harc",
		me: "Dungeoni Harc",
		Rd: "A Bot csak akkor viseli a Dis Pater Normal \u00e9s Medium form\u00e1tumot, ha az exped\u00edci\u00f3/kazamata pontja 0.",
		bf: "Pokoli Gy\u00f3gy\u00edt\u00e1s Be\u00e1ll\u00edt\u00e1sai",
		Hd: "T\u00e1mad\u00e1s a F\u0151ellens\u00e9g el\u00e9rhet\u0151v\u00e9 v\u00e1l\u00e1sakor?",
		qb: "Az Ligat\u00e1mad\u00e1s \u00f6nmag\u00e1t letiltja 5 sikertelen t\u00e1mad\u00e1s ut\u00e1n.",
		ef: "Szent Olajok",
		wg: "T\u00e1rgy Neve",
		Z: "Minim\u00e1lis T\u00e1rgyszint",
		Aa: "Minim\u00e1lis T\u00e1rgymin\u0151s\u00e9g",
		Gd: "Alkalmaz/T\u00f6r\u00f6l Minut\u00e9ri\u00e1t",
		hf: "El\u0151tag/Ut\u00f3tag Kombin\u00e1ci\u00f3 Figyelmen K\u00edv\u00fcl Hagy\u00e1sa",
		Gi: "Igen",
		Dg: "Nem",
		Oa: "El\u0151tag Hozz\u00e1ad\u00e1sa",
		Pa: "Ut\u00f3tag Hozz\u00e1ad\u00e1sa",
		Dh: "Olvasd el a List\u00e1t",
		Jb: "El\u0151tag",
		Wb: "Ut\u00f3tag",
		ih: "Lej\u00e1r\u00f3 T\u00e1rgyak Vissza\u00e1ll\u00edt\u00e1sa",
		Eh: "V\u00e9letlenszer\u0171 Olvasd el a Csomagokat?",
		Fh: "Olvasd el a Lapon",
		ob: "Extr\u00e1k",
		Ld: "\u00c1rver\u00e9s",
		eg: "Piac",
		Xb: "Id\u0151z\u00edt\u0151k",
		di: "Olvasd el a Minut\u00e9ri\u00e1t",
		ci: "Olvasd el, ha nincs el\u00e9g arany",
		$h: "Olvasd el, ha nincs t\u00e1rgy",
		Da: "Jav\u00edt\u00e1s",
		Sh: "Gilda Piac Aranytartalma",
		Oh: "\u00c1rver\u00e9s Aranytartalma",
		gi: "Edz\u00e9s",
		Vh: "Lej\u00e1rtak Vissza\u00e1ll\u00edt\u00e1sa",
		ei: "\u00dczletek a Kov\u00e1cshoz",
		Mh: "\u00c1rver\u00e9s Ellen\u0151rz\u00e9se",
		Xh: "Keres\u00e9s",
		v: "Enged\u00e9lyez\u00e9s",
		yg: "Minim\u00e1lis Arany",
		Rb: "\u00d3ra Kiv\u00e1laszt\u00e1sa",
		lb: "Arany Adom\u00e1nyoz\u00e1sa a Gildinek",
		he: "Minden 5 percenk\u00e9nt adom\u00e1nyoz. Az id\u0151z\u00edt\u0151k lapr\u00f3l m\u00f3dos\u00edthatja az id\u0151k\u00f6zt",
		ff: "Mennyit szeretne adom\u00e1nyozni?",
		ie: "Adom\u00e1nyozni, amikor t\u00f6bb van, mint >",
		tf: "Kevesebb, mint <",
		fh: "Lej\u00e1rtak Vissza\u00e1ll\u00edt\u00e1sa \u00e9s Egy\u00e9b Be\u00e1ll\u00edt\u00e1sok",
		hh: "Vissza\u00e1ll\u00edt\u00e1s ideje:",
		Jk: "Tartsa lenyomva a Ctrl (Cmd a Mac-en) billenty\u0171t a t\u00f6bb t\u00e1rgy kiv\u00e1laszt\u00e1s\u00e1hoz",
		jf: "Be-/Kiv\u00e1laszt\u00e1s Be\u00e1ll\u00edt\u00e1sok",
		Re: "Be\u00e1ll\u00edt\u00e1sok Export\u00e1l\u00e1sa",
		kf: "Be\u00e1ll\u00edt\u00e1sok Import\u00e1l\u00e1sa",
		pg: "\u00dczenet Minden J\u00e1t\u00e9kosnak",
		qg: "[Ultra Pr\u00e9mium Kulcs sz\u00fcks\u00e9ges, \u00fczenet a Discordon az kulcs megszerz\u00e9s\u00e9hez.]",
		rg: "Adja meg az elk\u00fcldend\u0151 \u00fczenetet",
		fe: "Egyedi szkriptek\u00e9rt vegye fel a kapcsolatot vel\u00fcnk a Discordon",
		tg: "K\u00fcld\u00e9s",
		ug: "J\u00e1t\u00e9kosok Megjelen\u00edt\u00e9se",
		sg: "Mindet Kiv\u00e1laszt",
		vg: "\u00d6sszes Kiv\u00e1laszt\u00e1s Visszavon\u00e1sa",
		sf: "Gy\u0151z\u0151dj\u00f6n meg r\u00f3la, hogy van el\u00e9g hely a t\u00e1sk\u00e1j\u00e1ban. A leh\u0171l\u00e9si id\u0151 2 perc.",
		ig: "\u00c9tel Elad\u00e1sa a Piacon?",
		Eb: "\u00c9telre V\u00e1lt\u00e1s a Piacon?"
	};
if ("true" !== localStorage.getItem("isInitialized")) {
	const F = {
		Timers: JSON.stringify({
			Smelting: 10,
			SmeltingNoGold: 5,
			SmeltingNoItem: 15,
			Repair: 10,
			GuildMarket: 2,
			AuctionHoldGold: 15,
			Arena: 10,
			CircusTurma: 10,
			Training: 2,
			ResetExpired: 30,
			SearchTimer: 5,
			StoreForge: 30,
			AuctionCheck: 10,
			GuildDonate: 15,
			guildBattleEnable: 120,
			BuffTimer: 5
		}),
		packagesPurchased: "[]",
		questKeywords: "[]",
		activeItems: '{"gloves":false,"shoes":false,"rings1":false,"rings2":false,"shield":false,"armor":false,"weapon":false,"helmet":false,"necklace":false}',
		auctionPrefixes: "[]",
		auctionSuffixes: "[]",
		prefixes: "[]",
		suffixes: "[]",
		underworldQuestKeywords: "[]",
		UnderworldQuests: "false",
		statSettings: JSON.stringify([{
			stat: "Strength",
			count: "0",
			priority: null,
			continueTraining: !1
		}, {
			stat: "Dexterity",
			count: "0",
			priority: null,
			continueTraining: !1
		}, {
			stat: "Agility",
			count: "0",
			priority: null,
			continueTraining: !1
		}, {
			stat: "Constitution",
			count: "0",
			priority: null,
			continueTraining: !1
		}, {
			stat: "Charisma",
			count: "0",
			priority: null,
			continueTraining: !1
		}, {
			stat: "Intelligence",
			count: "0",
			priority: null,
			continueTraining: !1
		}]),
		farmEnable: "false",
		farmEnemy: "1",
		farmLocation: "0",
		HealPickBag: "1",
		AutoBidInterval: "5",
		AuctionItemLevel2: "0",
		HealShop: "false",
		noItemsLastCheck: "false",
		dungeonFocusQuest: "false",
		smeltBlue: "false",
		smeltGreen: "false",
		HealClothToggle: "false",
		questrewardvalue: "2000",
		smeltOrange: "false",
		smeltRed: "false",
		auctionTURBO: "false",
		smeltusehammers: "false",
		BuffsEnable: "false",
		repairPercentage: "10",
		HealRubyToggle: "false",
		dungeonLocation: "0",
		costumeBasic: "1",
		costumeDungeon: "2",
		smeltAnything: "false",
		skipTimeQuests: "false",
		skipTimeCircusQuests: "false",
		costumeUnderworld: "9",
		wearUnderworld: "false",
		hellDifficulty: "1",
		repairMaxQuality: "1",
		FoodAmount: "3",
		smeltIgnorePS: "false",
		EnableSmelt: "false",
		filterGM: "p",
		"AuctionEmpty.timeOut": "0",
		"BuffCheck.timeOut": "0",
		"CheckDolls.timeOut": "0",
		"AuctionMEmpty.timeOut": "0",
		expeditionLocation: "0",
		auctionMinQuality: "0",
		doQuests: "false",
		unique_shop_results_height: "124",
		unique_shop_results_width: "184",
		unique_shop_results_top: "452",
		unique_shop_results_left: "368",
		search_results_top: "112",
		search_results_width: "179",
		search_results_height: "284",
		search_results_left: "410",
		itemBought: "false",
		itemMovedToInventory: "false",
		AucTab: "true",
		patmp: "false",
		arenaPlayer: "true",
		repairInitiated: "true",
		doKasa: "false",
		packages: JSON.stringify({
			quality: [],
			type: [1, 2, 3, 4, 5, 8, 6, 9, 7, 12, 13, 15, 19, 20, 11, 21, 18, 14, 99]
		}),
		delaySelect: "0",
		autoAttackList: "[]",
		avoidAttackList: "[]",
		autoAttackCircusList: "[]",
		avoidAttackCircusList: "[]",
		autoAttackServerList: "[]",
		removeCircusList: "[]",
		removeArenaList: "[]",
		arenacrosslist: "[]",
		circuscrosslist: "[]",
		autoAttackCircusServerList: "[]",
		doArena: "false",
		doCircus: "false",
		"gladBotChecks.timeOut": "0",
		"repair.timeOut": "0",
		"storeForgeResources.timeOut": "0",
		HealCervisia: "false",
		dungeonAB: "false",
		bidStatus: "4",
		doDungeon: "false",
		doExpedition: "false",
		arenaAttackGM: "false",
		circusAttackGM: "false",
		AutoAuction: "false",
		auctionminlevel: "0",
		storeGoldinAuctionmaxGold: "0",
		storeGoldinAuction: "false",
		autoAddArenaAmount: "0",
		autoAddCircusAmount: "0",
		eventPoints_: "16",
		storeGoldinAuctionholdGold: "0",
		TrainingHoldGold: "0",
		smeltLevel: "1",
		MarketHoldGold: "0",
		KasaHoldGold: "0",
		HealPackage: "false",
		smeltPurple: "false",
		guildPackHour: "3",
		smeltEverything3: "false",
		questSpeed: "2",
		"enableHideGold.timeOut": "0",
		bidFood: "false",
		auctionmercenaryenable: "false",
		auctiongladiatorenable: "false",
		maximumBid: "100000",
		activateAuction2: "false",
		scoreboardattackenable: "false",
		scoreRange: "5",
		auctionlanguagesettings: JSON.stringify(["Very long", "Long", "Middle", "Short", "Very short"]),
		scoreboardcircusenable: "false",
		healPercentage: "25",
		hellEnterHP: "75",
		questTypes: JSON.stringify({
			combat: !0,
			arena: !0,
			circus: !0,
			expedition: !1,
			dungeon: !1,
			items: !1
		}),
		scoreRangeCircus: "5",
		underworld: JSON.stringify({
			cooldown: "",
			wins: 0,
			isUnderworld: !1,
			jj: !1
		}),
		enableMarketSearch: "false",
		smeltTab: "1",
		UnderWorldUseRuby: "false",
		renewEvent: "false",
		"arena.timeOut": "0",
		"circus.timeOut": "0",
		AuctionCover: "false",
		AuctionGoldCover: "false",
		UnderworldUseMobi: "false",
		MarketSearchInterval: "5",
		useVillaMedici: "false",
		autoEnterHell: "false",
		useHealingPotion: "false",
		repairMercenary: "false",
		repairALL: "false",
		AutoBidButton: "false",
		healstopbot: "false",
		HealEnabled: "false",
		minimumGoldAmount: "100000",
		doEventExpedition: "false",
		GuildMemberBid: "false",
		autoCollectBonuses: "false",
		exitUnderworld: "false",
		workbench_selectedItem: JSON.stringify({})
	};
	Object.keys(F).forEach(M => {
		null === localStorage.getItem(M) && localStorage.setItem(M, F[M])
	});
	["license_playerId", "eventPoints", "playerTimeouts"].forEach(M => {
		null !== localStorage.getItem(M) && localStorage.removeItem(M)
	});
	localStorage.setItem("isInitialized", "true")
};
