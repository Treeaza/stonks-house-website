const ZODIAC_CONTAINER = document.querySelector("#zodiac-container");
const ZODIACS = document.querySelectorAll(".zodiac-holder");

const COUNT = 12;
const SCALE = 0.5;

var angle_offset = 0;
var radius = 300;

function redraw() {
	for (var i = 0; i < ZODIACS.length; i++) {
		var zodiac = ZODIACS[i];

		var angle = (2 * Math.PI * i / COUNT) - angle_offset;
		var x = radius * Math.sin(angle);
		var y = radius * Math.cos(angle);

		zodiac.style.transform = "translate(" + x + "px, " + y + "px) rotate(" + (-(angle + Math.PI) * 180 / Math.PI) + "deg) scale(" + SCALE + ")";
	}
}

setInterval(function () {
	angle_offset += (2 * Math.PI) * (1 / 12000);
	radius = 300 + 20 * Math.sin(6 * angle_offset);
	redraw();
}, 5);
