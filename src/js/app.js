function randomizer(min,range,floored){
	//~~ is bitwise or. faster way to do Math.floor.
	return floored ? ~~(Math.random() * range) + min : (Math.random() * range) + min;
}

var cloneColors = ["redClone", "greenClone", "blueClone", "defaultClone","purpleClone", "yellowClone", "cyanClone"];

var waitingForAnother;

function glitcher(that, isFirst) {
	isGlitching = randomizer(0,7,1);
	if(!isGlitching || isFirst){
		that.addClass("colorNaturalizer");
		var w = that.outerWidth();
		var h = that.outerHeight();
		var l = that.offset().left;
		var t = that.offset().top;
		//effect radius
		var times = 7;
		
		for(var i = 0; i<times; i++){
			setTimeout(function(){
				var cloneTop = 0;
				while(cloneTop<h){
					var glitchEffect = Math.round(Math.sqrt(w*h) )/randomizer(3,15,1);
					var glitchRadius = randomizer(-glitchEffect,glitchEffect*2);
					var glitchedL = l+glitchRadius;
					var glitchedT = t//+glitchRadius;
					var newRandom = randomizer(1,20,1);
					var newClone = that.clone().addClass("cGlitch");

					newClone.html("<div class='inner'>"+that.html()+"</div>")
						.removeClass("colorNaturalizer")
						.addClass(cloneColors[randomizer(0,cloneColors.length,1)])
						.css({"left":glitchedL+"px", "top":glitchedT+"px",
						"z-index":randomizer(-5,10,1),
						"height":newRandom+"px",
						"transform":"translateY("+cloneTop+"px)"})
						newClone.find(".inner").css("transform","translateY("+(-cloneTop)+"px)");
					cloneTop += newRandom;
					$("body").append(newClone);
				}
			},40*i);
		}
		//ending it before for after glitch effect
		setTimeout(function(){
			$(".cGlitch").remove();
			that.removeClass("colorNaturalizer");
		},(30*times)+30)
		//ending it for real
		setTimeout(function(){
			that.removeClass("colorNaturalizer");
		},(40*times)+40)
	}
}

$(".beGlitchy").mouseover(function(i){
	var that = $(this);
	glitcher(that, 1);
	waitingForAnother = setInterval(function(){glitcher(that)},280);
});

$(".beGlitchy").mouseleave(function(){
	clearInterval(waitingForAnother);
})

$(".beGlitchy").mouseenter();