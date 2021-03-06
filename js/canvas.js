"use strict";

var canvas;
var ctx;

window.addEventListener("resize", resizeCanvas);

function retrieveCanvasData() {
	const treeCanv = document.getElementById("treeCanvas");
	const treeTab = document.getElementById("treeTab");
	if (treeCanv === undefined || treeCanv === null) return false;
	if (treeTab === undefined || treeTab === null) return false;
	canvas = treeCanv;
	ctx = canvas.getContext("2d");
	return true;
}

function resizeCanvas() {
	if (!retrieveCanvasData()) return;
	canvas.width = 0;
	canvas.height = 0;
	canvas.width = document.getElementById("treeTab").scrollWidth;
	canvas.height = document.getElementById("treeTab").scrollHeight;
	drawTree();
}

function drawTree() {
	if (!retrieveCanvasData()) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Branches! :D
	for (const key in layers.layers) {
		const layer = layers.layers[key];
		if (layer.shown() && layer.branches) {
			layer.branches.forEach(branch => drawTreeBranch(key, branch));
		}
	}
	needCanvasUpdate = false;
}

function drawTreeBranch(num1, num2) {
	// Taken from Antimatter Dimensions & adjusted slightly
	const start = document.getElementById(num1).getBoundingClientRect();
	const end = document.getElementById(num2).getBoundingClientRect();
	const x1 =
		start.left +
		start.width / 2 +
		(document.getElementById("treeTab").scrollLeft ||
			document.body.scrollLeft);
	const y1 =
		start.top +
		start.height / 2 +
		(document.getElementById("treeTab").scrollTop ||
			document.body.scrollTop);
	const x2 =
		end.left +
		end.width / 2 +
		(document.getElementById("treeTab").scrollLeft ||
			document.body.scrollLeft);
	const y2 =
		end.top +
		end.height / 2 +
		(document.getElementById("treeTab").scrollTop ||
			document.body.scrollTop);
	ctx.lineWidth = 15;
	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}
