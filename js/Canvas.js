define(['main', 'FileSaver'], function(main) {
	//var dispCanvas = document.getElementById('canvas');
	//var dispContext = dispCanvas.getContext('2d');
	
	var canvas = document.getElementById('canvas');
//	canvas.width = 1433;
//	canvas.height = 2032;
	var imgDim = {w: 1433, h:2032};
	var context = canvas.getContext('2d');
	context.scale(canvas.width/imgDim.w, canvas.h/imgDim.h);
	//context.scale(0.4, 0.4);
	var broadieImg = new Image();
	broadieImg.src = "img/broadie_scaledup_with_hoskins_household.png";
	broadieImg.onload = function() {
		var img_px = { w:broadieImg.width, h:broadieImg.height };
		var img_cm = { w:21, h:29.7 };
		var ratio = img_cm.w / img_px.w;
		var cmForIn = function(inches) {
			return inches * (2.54);
		};
		var pxForCm = function(cm) {
			return cm / ratio;
		};
		
		var hands = 9;
		
		console.log("6 hands " + (hands*6));
		var centreCm = 0.5;
		var remainderH = img_cm.w - (hands*6);
		var remainderV = img_cm.h - (hands*2);
		var paddingH = (remainderH / 4);
		var paddingV = (remainderV / 4);
		console.log("equal horiz padding is " + paddingH);
		console.log("equal vert padding is " + paddingV);
		console.log("frame ratio is " + (img_cm.w / img_cm.h));
		console.log("img ratio is " + (img_px.w / img_px.h));
		
		var hCentre = img_cm.w / 2;
		var vCentre = img_cm.h / 2;
		var clockCentre = { x:hCentre, y:vCentre };
		
		//var thermCentre = { x:(2*paddingH) + (3*hands), y:vCentre };
		
		//var tideCentre = { x:(3*paddingH) + (5*hands), y:vCentre };
		
		
		// Draw BG img
		context.drawImage(broadieImg, 0, 0);
		
		/**
		 * c is centre of circle, t is thickness of lines
		 */
		var fillCentre = function(c, t) {
			context.strokeStyle = "#ffffff";
			context.fillStyle = "#000000";
			context.beginPath();
			context.arc(pxForCm(c.x), pxForCm(c.y), (pxForCm(centreCm)/2) + 3, 0, 2*Math.PI);
			context.fill();
			context.closePath();
			context.stroke();
			/*
			context.beginPath();
			context.strokeStyle = "#ffffff";
			for (var i=0; i<t/2; i++) {
				context.arc(pxForCm(c.x), pxForCm(c.y), pxForCm(hands) - 1 - i, 0, 2*Math.PI);
				context.arc(pxForCm(c.x), pxForCm(c.y), pxForCm(hands) + t + i, 0, 2*Math.PI);
			}
			context.closePath();
			context.stroke();

			context.beginPath();
			context.strokeStyle = "#000000";
			for (var i=0; i<t; i++) {
				context.arc(pxForCm(c.x), pxForCm(c.y), pxForCm(hands) + i, 0, 2*Math.PI);
			}
			context.closePath();
			context.stroke();
			*/
		};
		
		var halfPi = Math.PI / 2;
		var twoPi = Math.PI * 2;
		var to12OClock = function(r) {
			// 270 -> 0
			// 0 -> 90
			// 90 -> 180
			// 180 -> 270
			r -= halfPi;
			while (r < 0) {
				r += twoPi;
			}
			r %= twoPi;
			
			return r;
		};
		
		var fromPolar = function(r, theta) {
			return {
				x: r * Math.cos(theta),
				y: r * Math.sin(theta)
			};
		};
		
		fillCentre(clockCentre, 5);
		
		var paintTextWithOutline = function(text, x, y, color, outline) {
			
			console.log(text + " (" + x + ", " + y + ")");
			outline = outline||2;
			
			context.fillStyle = "#ffffff";
			for (var i=-(outline), iLen=(outline); i<iLen; i++) {
				for (var j=-(outline), jLen=(outline); j<jLen; j++) {
					context.fillText(text, x + i, y + j);
				}
			}
			
			context.fillStyle = "#000000";
			var black = 2;
			for (var i=-black, iLen=black; i<iLen; i++) {
				for (var j=-black, jLen=black; j<jLen; j++) {
					context.fillText(text, x + i, y + j);
				}
			}
			
			context.fillStyle=color;
			context.fillText(text, x, y);
		};
		
		var twelfth = twoPi / 12;
		
		var fontPx = 120;
		context.font = fontPx + "px Futura";
		context.textAlign = "center";

		for (var i=0; i<12; i++) {
			var num = i+1;
			var angle = twelfth * num;
			var normalised = to12OClock(angle);
			var c = fromPolar(hands, normalised);
			var x = pxForCm(clockCentre.x + c.x);
			var y = pxForCm(clockCentre.y + c.y);
			
			paintTextWithOutline("" + num, x, y + (fontPx / 2), "#000000", 8);
		}
		context.font = "75px Futura";
		paintTextWithOutline("HIGH TIDE", pxForCm(clockCentre.x), pxForCm(clockCentre.y - (hands*(2/3))), "#07b7e8", 8);
		paintTextWithOutline("LOW TIDE", pxForCm(clockCentre.x), pxForCm(clockCentre.y + (hands*(2/3))), "#07b7e8", 8);
		
		//var imgData=context.getImageData(0, 0, canvas.width, canvas.height);
		//dispContext.putImageData(imgData, 0, 0);
	};
	
	ext.saveClicked = function() { 
		canvas.toBlob(function(blob) {
		    saveAs(blob, "withclock.png");
		});
	};
	
});