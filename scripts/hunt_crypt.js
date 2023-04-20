// misc
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function normalizeAngleOffset() {
	while (angleOffset > 2 * Math.PI) {
		angleOffset -= 2 * Math.PI;
	}
}

function encrypt(code, content) {
	return CryptoJS.AES.encrypt(content, code).toString();
}

function decrypt(code, content) {
	let bytes = CryptoJS.AES.decrypt(content, code);
	return bytes.toString(CryptoJS.enc.Utf8);
}

// zodiac and alethiometer
const ZODIAC_CONTAINER = document.querySelector("#zodiac-container");
const ZODIACS = document.querySelectorAll(".zodiac-holder");
const ALETHIOMETER = document.querySelector("#alethiometer-holder");
const BLOCKER = document.querySelector("#blocker");

const COUNT = ZODIACS.length;
const SCALE = 0.5;
const SPECIAL_RADIUS = 50;

var tricked = false;

var angleOffset = 0;
var baseRadius = 300;

function redraw() {
	for (var i = 0; i < COUNT; i++) {
		var zodiac = ZODIACS[i];

		var localAngle = (2 * Math.PI * i / COUNT);
		var angle = localAngle + angleOffset;

		var deltaNorm = angle + angleOffset;
		while (deltaNorm > Math.PI) {
			deltaNorm -= Math.PI * 2;
		}
		var specialRadius = Math.abs(deltaNorm) < 0.55 ? SPECIAL_RADIUS * Math.pow(Math.cos((deltaNorm) * 3), 3) : 0;

		var x = (baseRadius + specialRadius) * Math.sin(angle);
		var y = -(baseRadius + specialRadius) * Math.cos(angle);

		zodiac.style.transform = "translate(" + x + "px, " + y + "px) rotate(" + (angle * 180 / Math.PI) + "deg) scale(" + SCALE + ")";
	}

	ALETHIOMETER.style.transform = "rotate(" + (-angleOffset * 180 / Math.PI) + "deg)";
}

function spin(rpm, dv) {
	var angleDelta = (2 * Math.PI) * (rpm / 12000);
	var angleDV = dv / 100000;

	return setInterval(function () {
		angleDelta += angleDV;
		angleOffset += angleDelta;
		normalizeAngleOffset();
		redraw();
	}, 5);
}
var basicSpin = spin(1, 0);

async function trick() {
	if (tricked)
		return;

	tricked = true;

	// cleanup
	clearInterval(basicSpin);

	// spin faster as constellation expands
	var fastSpin = spin(1, 2);
	var expand = setInterval(function () {
		baseRadius += baseRadius < 400 ? 1 : 3;
	}, 30);

	await sleep(7000);

	// after 7s slow ring to stop
	clearInterval(fastSpin);
	clearInterval(expand);
	// fade out constellations
	for (var i = 0; i < COUNT; i++) {
		var zodiac = ZODIACS[i];
		zodiac.style.opacity = "0";
	}

	// spin ring back to zero
	slowSpin = spin(50, -3.5);
	await sleep(2000);
	clearInterval(slowSpin);

	while (angleOffset < 2 * Math.PI) {
		angleOffset += ((2 * Math.PI - angleOffset) * 0.006) + 0.0005;
		redraw();
		await sleep(5);
	}

	// fade out
	ALETHIOMETER.style.opacity = "0";
	await sleep(2000);
}

setTimeout(function () {
	BLOCKER.style.opacity = 0;
}, 1000);

// codephrase entry
const CODEPHRASE_ENTRY_FIELD = document.querySelector("#codephrase-entry-field");
const CODEPHRASE_ENTRY_BUTTON = document.querySelector("#codephrase-entry-button");
const cpHashes = ["hehe"];

var codephrase = null;

CODEPHRASE_ENTRY_BUTTON.addEventListener("click", async function () {
	// check hash
	var entered = (CODEPHRASE_ENTRY_FIELD.value).toLowerCase();
	var hash = entered;//encrypt(entered, entered);

	var valid = false;
	var index = 0;
	while (!valid) {
		if (hash == cpHashes[index]) {
			valid = true;
		} else {
			index++;
			if (index >= cpHashes.length) {
				// invalid codephrase
				CODEPHRASE_ENTRY_FIELD.style.backgroundColor = "red";
				setTimeout(function () {
					CODEPHRASE_ENTRY_FIELD.style.backgroundColor = "black";
				}, 2000);
				return;
			}
		}
	}

	// valid codephrase
	codephease = entered;
	CODEPHRASE_ENTRY_FIELD.style.opacity = "0";
	CODEPHRASE_ENTRY_BUTTON.style.opacity = "0";
	CODEPHRASE_ENTRY_FIELD.style.zIndex = "-100";
	CODEPHRASE_ENTRY_BUTTON.style.zIndex = "-100";
	await sleep(1000);
	trick();

	// set up code entry page
});
