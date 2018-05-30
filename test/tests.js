QUnit.test("Tube Radius is 100", function(assert) {
	assert.strictEqual(tubeRadius, 100, "Tube Radius ok!");
});

QUnit.test("Highest starts at 0", function(assert) {
	assert.strictEqual(highest, 0, "Highest ok!");
});

QUnit.test("Lowest starts at 0", function(assert) {
	assert.strictEqual(lowest, 0, "Lowest ok!");
});

QUnit.test("getCursorPosition()", function(assert) {
	let testEvent = {clientX: 123, clientY: 95};
	let testCanvas = {getBoundingClientRect: () => {return {left: 50, top: 40};}};
	let testPosition = getCursorPosition(testCanvas, testEvent);
	assert.deepEqual(testPosition, {x: 73, y: 55}, "Position ok!");
});

QUnit.test("addSphereLabel()", function(assert) {
	let ctx = {fillText: (text, xPos, yPos) => {
		assert.strictEqual(text, "45mm", "Text ok!");
		assert.strictEqual(xPos, 70, "x ok!");
		assert.strictEqual(yPos, 51, "y ok!");
	}};
	addSphereLabel(ctx, 83, 48, 45);
});

QUnit.test("firstSphere()", function(assert) {
	let ctx = {beginPath: () => {
		assert.ok(true, "Begin Path!");
	}, arc: (x, y, radius, angleStart, angleEnd) => {
		assert.strictEqual(x, 35, "arc x ok!");
		assert.strictEqual(y, 35, "arc y ok!");
		assert.strictEqual(radius, 35, "arc radius ok!");
		assert.strictEqual(angleStart, 0, "arc angle start ok!");
		assert.strictEqual(angleEnd, 6.283185307179586, "arc angle end ok!");
	}, stroke: () => {
		assert.ok(true, "Stroke!");
	}, fillText: () => {}};
	
	assert.deepEqual(firstSphere(ctx, 35), {x: 35, y: 35, radius: 35}, "Sphere ok!");
});

QUnit.test("addSphere()", function(assert) {
	let ctx = {beginPath: () => {
		assert.ok(true, "Begin Path!");
	}, arc: (x, y, radius, angleStart, angleEnd) => {
		assert.strictEqual(x, 84.77225575051662, "arc x ok!");
		assert.strictEqual(y, 65, "arc y ok!");
		assert.strictEqual(radius, 35, "arc radius ok!");
		assert.strictEqual(angleStart, 0, "arc angle start ok!");
		assert.strictEqual(angleEnd, 6.283185307179586, "arc angle end ok!");
	}, stroke: () => {
		assert.ok(true, "Stroke!");
	}, fillText: () => {}};
	
	lastX = 30;
	lastY = 30;
	lastR = 30;
	lastIsUpper = true;
	
	assert.deepEqual(addSphere(ctx, 35), {x: 84.77225575051662, y: 65, radius: 35}, "Sphere ok!");
});
