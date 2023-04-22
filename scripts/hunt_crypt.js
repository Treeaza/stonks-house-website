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

	// nasty hack for if this fucks up
	try {
		return bytes.toString(CryptoJS.enc.Utf8);
	} catch (err) {
		return "";
	}
}

function setCodephraseCookie(codephrase) {
	var date = new Date();

	// keep the cookie for 5 days
	date.setTime(date.getTime() + (5 * 24 * 60 * 60 * 1000));
	document.cookie = "codephrase=" + codephrase + "; expires=" + date.toGMTString() + "; path=/";
}

function getCodephraseCookie() {
	var cookies = document.cookie.split(";");

	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];

		// trim
		while (cookie.charAt(0) == " ") {
			cookie = cookie.substring(1, cookie.length);
		}

		if (cookie.indexOf("codephrase=") == 0) {
			return cookie.substring(11, cookie.length);
		}
	}

	return null;
}

function isKey(key, hash) {
	if (key == "") return false;
	return decrypt(key, hash) == key;
}

function makeElementAngry(element, duration, backgroundColor = "red", foregroundColor = "white") {
	element.style.backgroundColor = backgroundColor;
	element.style.color = foregroundColor;
	setTimeout(function () {
		element.style.backgroundColor = null;
		element.style.color = null;
	}, duration);
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

		var x = baseRadius * Math.sin(angle);
		var y = -baseRadius * Math.cos(angle);

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
var basicSpin = spin(2, 0);

async function trick() {
	if (tricked)
		return;

	tricked = true;

	// cleanup
	clearInterval(basicSpin);

	// spin faster as constellation expands
	var fastSpin = spin(2, 5);
	await sleep(500);

	// fade out constellations
	var val = 1.0;
	var fade = setInterval(function () {
		for (var i = 0; i < COUNT; i++) {
			var zodiac = ZODIACS[i];
			zodiac.style.opacity = val.toString();
		}
		val -= 0.02;
	}, 20);

	await sleep(2000);

	// fade out
	ALETHIOMETER.style.opacity = "0";
	await sleep(1500);
	clearInterval(fastSpin);
}

setTimeout(function () {
	BLOCKER.style.opacity = 0;
}, 1000);

// codephrase entry
const CODEPHRASE_ENTRY_FIELD = document.querySelector("#codephrase-entry-field");
const CODEPHRASE_ENTRY_BUTTON = document.querySelector("#codephrase-entry-button");
const CODE_ENTRY = document.querySelector("#code-entry");
const TEAM_INFO_STRING = document.querySelector("#team-info");

const cpHashes = {
	"U2FsdGVkX195Qjb/WD5LbWTwevYDVFqKDUDq5z4NXBI=": "U2FsdGVkX18dkcQc47KeddHLsTtKn4CkQsPwAvWyx7CixnSWkN+kdhD6dxvJxIV+",
};

var codephrase = getCodephraseCookie();

// check for cookie
if (codephrase != null) {
	CODEPHRASE_ENTRY_FIELD.value = codephrase;
} else {
	console.log("No saved codephrase found.");
}

function handleCodephrase(e) {
	e.preventDefault();
	submitCodephrase();

	return false;
}

async function submitCodephrase() {
	// check hash
	var entered = (CODEPHRASE_ENTRY_FIELD.value).toLowerCase();

	var valid = false;
	var teamInfo;
	for (var encKey in cpHashes) {
		if (isKey(entered, encKey)) {
			valid = true;
			teamInfo = decrypt(entered, cpHashes[encKey]);
			break;
		}
	}

	if (!valid) {
		makeElementAngry(CODEPHRASE_ENTRY_BUTTON, 2000);
		return;
	}

	// valid codephrase
	codephrase = entered;

	// save cookie for next time
	setCodephraseCookie(codephrase);

	// set team info string
	TEAM_INFO_STRING.innerHTML = teamInfo;

	// fade out
	CODEPHRASE_ENTRY_FIELD.style.opacity = "0";
	CODEPHRASE_ENTRY_BUTTON.style.opacity = "0";
	CODEPHRASE_ENTRY_FIELD.style.zIndex = "-100";
	CODEPHRASE_ENTRY_BUTTON.style.zIndex = "-100";
	await trick();

	// reveal code entry page
	CODE_ENTRY.style.opacity = 1;
	CODE_ENTRY.style.zIndex = 10;
}

CODEPHRASE_ENTRY_BUTTON.addEventListener("click", submitCodephrase);

// code entry
const CONSTELLATION_BUTTONS = document.querySelectorAll(".constellation-button");
const CONSTELLATION_SUBMIT = document.querySelector("#constellation-submit");

const TEXT_ENTRY = document.querySelector("#text-entry-field");
const TEXT_SUBMIT = document.querySelector("#text-entry-button");

const CLUE = document.querySelector("#clue");
const CLUE_TEXT = document.querySelector("#clue-text");
const CLOSE_BUTTON = document.querySelector("#close");

const STAR_KEY_MAP = {
	"U2FsdGVkX19JtEzmLfWF8iR7TlYD5gyErfH+XZnOaJ459KpReBy8eV+sBUHEfsyh": "U2FsdGVkX18FGuCK3I5Gv0Qbg4r3owoO/XPZo2GnNNw=",
}

const TEXT_KEY_MAP = {
	"U2FsdGVkX1/oqQ/TJGDEXU+pdU6ddGrcbcd2vSNI0kab+8Kg6fDpe2eVug6e+NwC": "U2FsdGVkX1+v6HPFuRwbaSl8THOnQLjFuF1/X9pIO6Av/UwI1Vzg5xZrXrcop54J",
}

var clickedButtons = [];

var showingClue = false;

function displayClue(clue) {
	CLUE_TEXT.innerHTML = clue;
	showingClue = true;

	CLUE.style.opacity = "1";
	CLUE.style.zIndex = "10";
}

CLOSE_BUTTON.addEventListener("click", function () {
	if (showingClue) {
		showingClue = false;
		CLUE.style.opacity = null;

		setTimeout(function () {
			CLUE.style.zIndex = null;
		}, 2000);
	}
});

// put CBs on all the constellation buttons
CONSTELLATION_BUTTONS.forEach(function (button) {
	var index = button.id.split("-").at(-1);
	button.addEventListener("click", function () {
		if (clickedButtons.includes(index)) {
			clickedButtons.splice(clickedButtons.indexOf(index), 1);
			button.style.borderColor = "darkslateblue";
		} else {
			clickedButtons.push(index);
			button.style.borderColor = "lightskyblue";
		}
	});
	button.addEventListener("mouseenter", function () {
		button.style.borderColor = "white";
	});
	button.addEventListener("mouseleave", function () {
		if (clickedButtons.includes(index)) {
			button.style.borderColor = "lightskyblue";
		} else {
			button.style.borderColor = "darkslateblue";
		}
	});
});

// put CB on the enter button to submit
CONSTELLATION_SUBMIT.addEventListener("click", function () {
	// only worth doing if a codephrase is entered
	// just checking in case anyone hacks around, wouldn't work anyways
	if (codephrase == null) {
		return;
	}

	// sort constellations selected
	clickedButtons.sort();

	// build key
	var key = codephrase;
	clickedButtons.forEach(function (i) {
		key += i.toString();
	});

	var valid = false;

	// check if key is valid
	for (var encKey in STAR_KEY_MAP) {
		if (isKey(key, encKey)) {
			// this is the way
			var clue = decrypt(key, STAR_KEY_MAP[encKey]);
			valid = true;
			displayClue(clue);
			break;
		}
	}

	if (!valid) {
		makeElementAngry(CONSTELLATION_SUBMIT, 2000);
	}

	// clear stars
	clickedButtons = [];
	CONSTELLATION_BUTTONS.forEach(function (button) {
		button.style.borderColor = "darkslateblue";
	});
});

function handleText(e) {
	e.preventDefault();
	submitTextClue();

	return false;
}

async function submitTextClue() {
	// only worth doing if a codephrase is entered
	// just checking in case anyone hacks around, wouldn't work anyways
	if (codephrase == null || TEXT_ENTRY.value == "") {
		return;
	}

	// build key
	var key = codephrase + TEXT_ENTRY.value.toString().toLowerCase();

	var valid = false;

	// check if key is valid
	for (var encKey in TEXT_KEY_MAP) {
		if (isKey(key, encKey)) {
			// this is the way
			var clue = decrypt(key, TEXT_KEY_MAP[encKey]);
			valid = true;
			displayClue(clue);
			break;
		}
	}
	console.log(valid);
	if (!valid) {
		makeElementAngry(TEXT_SUBMIT, 2000);
	}

	// clear field
	TEXT_ENTRY.value = "";
}

TEXT_SUBMIT.addEventListener("click", submitTextClue);
