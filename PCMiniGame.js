var game = function () {

	function drag (piece, start, stop) {
		this.piece = piece;
		this.start = start;
		this.stop = stop;
		var self = this;

		var move = function (e) {
			if(self.start !== undefined) {
				self.start();
			}
			e.stopPropagation();
			e.preventDefault();

			var leftOrigin = parseInt(window.getComputedStyle(this).left);
			var topOrigin = parseInt(window.getComputedStyle(this).top);

			var mouseDownX = e.clientX;
			var mouseDownY = e.clientY;

			function pickUp (e) {
				var divoffset = $("#PCMiniGame").offset ();
				
				if (leftOrigin + e.clientX - mouseDownX < divoffset.left)
					self.piece.style.left = divoffset.left;
				else if (leftOrigin + e.clientX - mouseDownX > divoffset.left + 1280 - self.piece.clientWidth)
					self.piece.style.left = divoffset.left + 1280 - self.piece.clientWidth;
				else
					self.piece.style.left = leftOrigin + e.clientX - mouseDownX + "px";
				
				if (topOrigin + e.clientY - mouseDownY < divoffset.top)
					self.piece.style.top = divoffset.top;
				else if (topOrigin + e.clientY - mouseDownY > divoffset.top + 720 - self.piece.clientHeight)
					self.piece.style.top = divoffset.top + 720 - self.piece.clientHeight;
				else
					self.piece.style.top = topOrigin + e.clientY - mouseDownY + "px";
				e.stopPropagation();
			}

			function drop (e){
				document.removeEventListener('mousemove',pickUp,true);
				document.removeEventListener('mouseup',drop,true);
				if(self.stop !== undefined) { 
					self.stop();
				}
				e.stopPropagation();
			}

			document.addEventListener('mouseup',drop,true);
			document.addEventListener('mousemove',pickUp,true);
		};

		this.piece.addEventListener('mousedown',move,false);

	}

	var start = function(){
		this.piece.style.width = parseInt(window.getComputedStyle(this.piece).width) * 1.3 + "px";
	}
	var stop = function(){
		this.piece.style.width = parseInt(window.getComputedStyle(this.piece).width) * (100/130) + "px";
	}

	var processorpiece = document.getElementById ("processorpiece");
	var monitorpiece = document.getElementById ("monitorpiece");
	var keyboardpiece = document.getElementById ("keyboardpiece");
	var mousepiece = document.getElementById ("mousepiece");
	
	var divoffset = $("#PCMiniGame").offset ();
	processorpiece.style.left = divoffset.left + 1280/2 + "px";
	processorpiece.style.top = divoffset.top + 720 - 50 - processorpiece.clientHeight + "px";
	
	monitorpiece.style.left = divoffset.left + 1280/2 + processorpiece.clientWidth + "px";
	monitorpiece.style.top = divoffset.top + 720 - 50 - monitorpiece.clientHeight + "px";
	
	keyboardpiece.style.left = divoffset.left + 1280/2 - keyboardpiece.clientWidth + "px";
	keyboardpiece.style.top = divoffset.top + 720 - 50 - keyboardpiece.clientHeight + "px";
	
	mousepiece.style.left = divoffset.left + 1280/2 - mousepiece.clientWidth - keyboardpiece.clientWidth + "px";
	mousepiece.style.top = divoffset.top + 720 - 50 - mousepiece.clientHeight + "px";
	
	
	var p1 = new drag(processorpiece,start,stop);
	var p2 = new drag(monitorpiece,start,stop);
	var p3 = new drag(keyboardpiece,start,stop);
	var p4 = new drag(mousepiece,start,stop);
};

window.addEventListener('load',game, false);

window.onload = function () {
	var dp = document.getElementById ("puzzledarkened");
	var divoffset = $("#PCMiniGame").offset ();
	dp.style.left = divoffset.left + (1280 - dp.clientWidth)/2 + "px";
	dp.style.top = divoffset.top + 50 + "px";
}