const ZODIAC_CONTAINER = document.querySelector("#zodiac-container");
const ZODIACS = document.querySelectorAll(".zodiac-holder");
const ALETHIOMETER = document.querySelector("#alethiometer-holder");

const COUNT = ZODIACS.length;
const SCALE = 0.5;

var angle_offset = 0;
var radius = 300;

function redraw() {
	for (var i = 0; i < COUNT; i++) {
		var zodiac = ZODIACS[i];

		var angle = (2 * Math.PI * i / COUNT) + angle_offset;
		var x = radius * Math.sin(angle);
		var y = -radius * Math.cos(angle);

		zodiac.style.transform = "translate(" + x + "px, " + y + "px) rotate(" + (angle * 180 / Math.PI) + "deg) scale(" + SCALE + ")";
	}

	ALETHIOMETER.style.transform = "rotate(" + (-angle_offset * 180 / Math.PI) + "deg)";
}

setInterval(function () {
	angle_offset += (2 * Math.PI) * (1 / 12000);
	while (angle_offset > 2 * Math.PI) {
		angle_offset -= 2 * Math.PI;
	}
	redraw();
}, 5);
