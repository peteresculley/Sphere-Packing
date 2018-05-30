const tubeRadius = 100;

var lastX = 0;
var lastY = 0;
var lastR = 0;
var lastIsUpper = true;
var totalLength = 0;

var highest = 0;
var lowest = 0;

var isShuffleFast = false;
var shuffleFastTimer;

var spheres = [];

function canvasClickHandler(event, canvas) {
	var coord = getCursorPosition(canvas, event);
	for(let i = 0; i < spheres.length; i++) {
		let diffX = coord.x - spheres[i].x;
		let diffY = coord.y - spheres[i].y;
		// if click was inside this sphere
		if(Math.pow(spheres[i].radius, 2) >= (Math.pow(diffX, 2) + Math.pow(diffY, 2))) {
			// if click on right side, move this sphere to the right, and vice versa
			if(coord.x > spheres[i].x) {
				// cannot move right-most sphere to the right
				if(i+1 < spheres.length) {
					// swap with sphere to the right
					let temp = spheres[i];
					spheres[i] = spheres[i+1];
					spheres[i+1] = temp;
				}
			} else {
				// cannot move left-most sphere to the left
				if(i > 0) {
					// swap with sphere to the left
					let temp = spheres[i];
					spheres[i] = spheres[i-1];
					spheres[i-1] = temp;
				}
			}
			break;
		}
	}
	placeSpheres(spheres); // redraw spheres
}

function shuffleSpheres() {
	spheres = shuffle(spheres);
	placeSpheres(spheres);
}

function shuffleSpheresFast() {
	if(isShuffleFast) {
		clearInterval(shuffleFastTimer);
		isShuffleFast = false;
	} else {
		shuffleFastTimer = setInterval(function() {
			shuffleSpheres();
		}, 50);
		isShuffleFast = true;
	}
	return isShuffleFast;
}

function placeSpheres(spheres) {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.font = "10px Arial";
	ctx.clearRect(0, 0, c.width, c.height); // clear the canvas
	
	spheres[0] = firstSphere(ctx, spheres[0].radius);
	for(let i = 1; i < spheres.length; i++) {
		spheres[i] = addSphere(ctx, spheres[i].radius);
	}
	
	if(totalLength > highest) {
		highest = totalLength;
	}
	if(totalLength < lowest) {
		lowest = totalLength;
	}
	
	updateHighAndLow(highest, lowest);
	document.getElementById("result").innerHTML = "Total Length: " + totalLength + "mm";
}

function firstSphere(ctx, radius) {
	ctx.beginPath();
	ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
	ctx.stroke();
	addSphereLabel(ctx, radius, radius, radius);
	lastX = radius;
	lastY = radius;
	lastR = radius;
	lastIsUpper = true;
	totalLength = radius * 2;
	
	return {x: lastX, y: lastY, radius: lastR};
}

function addSphere(ctx, radius) {
	let y = radius;
	if(lastIsUpper) {
		y = tubeRadius - radius;
	}
	let yDiff = tubeRadius - lastR - radius;
	let hypot = lastR + radius;
	let xDiff = Math.sqrt(Math.pow(hypot, 2) - Math.pow(yDiff, 2));
	let x = lastX + xDiff;
	
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
	addSphereLabel(ctx, x, y, radius);
	
	lastX = x;
	lastY = y;
	lastR = radius;
	lastIsUpper = !lastIsUpper;
	totalLength = x + radius;
	
	return {x: lastX, y: lastY, radius: lastR};
}

function addSphereLabel(ctx, x, y, r) {
	ctx.fillText(r + "mm", x - 13, y + 3);
}

function updateHighAndLow(highest, lowest) {
	document.getElementById("highest").innerHTML = "Highest found: " + highest + "mm";
	document.getElementById("lowest").innerHTML = "Lowest found: " + lowest + "mm";
}

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
	return {x: x, y: y};
}

function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}