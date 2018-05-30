window.onload = () => {
	for(let i = 30; i <= 50; i++) {
		spheres.push({radius: i});
	}
	
	placeSpheres(spheres);
	highest = totalLength;
	lowest = totalLength;
	updateHighAndLow(highest, lowest);
	
	var c = document.getElementById("myCanvas");
	c.addEventListener('click', function(event) {
		canvasClickHandler(event, c);
	}, false);
}
