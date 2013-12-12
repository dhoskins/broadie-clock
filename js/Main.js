define(function() {
	var img_px = { w:1030, h:728 };
	var img_cm = { w:70, h:50 };
	var ratio = img_cm.w / img_px.w;
	var cmForIn = function(inches) {
		return inches * (2.54);
	};
	var pxForCm = function(cm) {
		return cm / ratio;
	};
	
	var hands = cmForIn(3 + (3/8));
	
	console.log("6 hands " + (hands*6));
	var centreCm = cmForIn(0.198);
	var remainderH = img_cm.w - (hands*6);
	var remainderV = img_cm.h - (hands*2);
	var paddingH = (remainderH / 4);
	var paddingV = (remainderV / 4);
	console.log("equal horiz padding is " + paddingH);
	console.log("equal vert padding is " + paddingV);
	console.log("frame ratio is " + (img_cm.w / img_cm.h));
	console.log("img ratio is " + (img_px.w / img_px.h));
	
	var vCentre = img_cm.h / 2;
	var clockCentre = { x:paddingH + hands, y:vCentre };
	
	var thermCentre = { x:(2*paddingH) + (3*hands), y:vCentre };
	
	var tideCentre = { x:(3*paddingH) + (5*hands), y:vCentre };
	
	
	var createCentreDiv = function(centre) {
		var div = document.createElement("div");
		div.style.backgroundColor = "rgb(0,0,0)";
		div.style.left = pxForCm(centre.x - (centreCm / 2));
		div.style.top = pxForCm(centre.y - (centreCm / 2));
		div.style.width = pxForCm(centreCm);
		div.style.height = pxForCm(centreCm);
		div.style.position = "absolute";
		return div;
	};
	
	var drawClock = function(centre, handsLen) {
		
		for (var i=0; i<12; i++) {
			
		}
	};
	/*
	var mainDiv = document.getElementById("main");
	mainDiv.appendChild(createCentreDiv(clockCentre));
	mainDiv.appendChild(createCentreDiv(thermCentre));
	mainDiv.appendChild(createCentreDiv(tideCentre));
	return {
		hands: hands,
		clockCentre: clockCentre,
		thermCentre: thermCentre,
		tideCentre: tideCentre
	}*/
});