const ZODIAC_CONTAINER = document.querySelector("#zodiac-container");
const ZODIACS = document.querySelectorAll(".zodiac-holder");
const ALETHIOMETER = document.querySelector("#alethiometer-holder");

const COUNT = ZODIACS.length;
const SCALE = 0.5;
const RADIUS = 300;
const SPECIAL_RADIUS = 50;

var angleOffset = 0;

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

		var x = (RADIUS + specialRadius) * Math.sin(angle);
		var y = -(RADIUS + specialRadius) * Math.cos(angle);

		zodiac.style.transform = "translate(" + x + "px, " + y + "px) rotate(" + (angle * 180 / Math.PI) + "deg) scale(" + SCALE + ")";
	}

	ALETHIOMETER.style.transform = "rotate(" + (-angleOffset * 180 / Math.PI) + "deg)";
}

setInterval(function () {
	angleOffset += (2 * Math.PI) * (1 / 12000);
	while (angleOffset > 2 * Math.PI) {
		angleOffset -= 2 * Math.PI;
	}
	redraw();
}, 5);
