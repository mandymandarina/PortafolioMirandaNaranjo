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

//menu

(function(){
	var listItems = document.querySelectorAll("#block li"),wrapper,overlayer;
	var classArr = ["","noise","noise2"];
	function disablAeAnim(e){
		elemEnabled = false;
		this.parentNode.querySelector('.elemWrapper').style.display = "none";
		clearInterval(myInt);
		overlayer.removeEventListener('mouseleave',disableAnim,false);
		e.target.parentNode.querySelector("a").style.border = "1px solid #DDFFFF";
	}
	for(var i = 0,len = listItems.length;i < len;i++){
		var width = listItems[i].offsetWidth;
		var height = listItems[i].offsetHeight;
		var a = listItems[i].querySelector("a");
		var txt = "<div class='overlayer' title='" + a.title + "'></div><div class='elemWrapper'><div id='elem" + i + "1' class='elem elem1'><span>" + a.innerHTML + "</span></div><div id='elem" + i + "2' class='elem elem2'><span>" + a.innerHTML + "</span></div><div id='elem" + i + "3' class='elem elem3'><span>" + a.innerHTML + "</span></div></div>";
		var oldHTML = listItems[i].innerHTML;
		listItems[i].innerHTML = txt + oldHTML;
		var elems = listItems[i].querySelectorAll(".elem");
		for(var j = 0;j < elems.length;j++){
			elems[j].style.width = width + "px";
			elems[j].style.height = (height / 3) + "px";
		}
	}
	var currentLink = document.querySelector("#block a.current"),curLinkIndex;
	for(var i = 0,len = listItems.length;i < len;i++){
		if(listItems[i] === currentLink.parentNode){
			curLinkIndex = i;
			break;
		}
	}
	currentLink.className = "red";
	currentLink.parentNode.querySelector(".elemWrapper").style.display = "none";
	setTimeout(function(){
		currentLink.className = "current";
		currentLink.parentNode.querySelector(".elemWrapper").style.display = "inline-block";
	},700);
	var curLinkInt = setInterval(function(){
		var elem1 = document.getElementById("elem" + curLinkIndex + "1");
		elem1.className += " elemCurrent";
		var elem2 = document.getElementById("elem" + curLinkIndex + "2");
		elem2.className += " elemCurrent";
		var elem3 = document.getElementById("elem" + curLinkIndex + "3");
		elem3.className += " elemCurrent";
		var elemArr = [elem1,elem2,elem3];
		var translateArr = [-3,0,3];
		var index = Math.round(Math.random() * 2);
		var translate = translateArr[Math.round(Math.random() * 2)];
		elemArr[index].style.transform = "translateX(" + translate + "px)";
		elem1.className = "elemCurrent elem1 " + classArr[index];
		elem2.className = "elemCurrent elem2 " + classArr[index];
		elem3.className = "elemCurrent elem3 " + classArr[index];
	},100);
	var a = document.querySelector("#block ul li a");
	console.log(a.style);
	var elemEnabled = false,myInt;
	var block = document.getElementById("block");
	block.addEventListener('mouseover',function(e){
		if(e.target.className === "overlayer" && e.target.parentNode.querySelector("a").className != 'current'){
			var li = e.target.parentNode,liIndex;
			for(var i = 0,len = listItems.length;i < len;i++){
				if(e.target.parentNode === listItems[i]){
					liIndex = i;
					break;
				}
			}
			e.target.parentNode.querySelector("a").style.border = "1px solid #000";
			wrapper = e.target.parentNode.querySelector(".elemWrapper");
			overlayer = e.target;
			overlayer.addEventListener('mouseleave',disableAnim,false);
			var elem1 = document.getElementById("elem" + liIndex + "1");
			elem1.style.transform = "";
			var elem2 = document.getElementById("elem" + liIndex + "2");
			elem2.style.transform = "";
			var elem3 = document.getElementById("elem" + liIndex + "3");
			elem3.style.transform = "";
			e.target.parentNode.querySelector(".elemWrapper").style.display = "inline-block";
			elemEnabled = true;
			
			myInt = setInterval(function(){
				var elemArr = [elem1,elem2,elem3];
				var translateArr = [-3,0,3];
				var index = Math.round(Math.random() * 2);
				var translate = translateArr[Math.round(Math.random() * 2)];
				elemArr[index].style.transform = "translateX(" + translate + "px)";
				elem1.className = "elem elem1 " + classArr[index];
				elem2.className = "elem elem2 " + classArr[index];
				elem3.className = "elem elem3 " + classArr[index];
				
			},100);
		}
	},false);
	
	block.addEventListener('click',function(e){
		var href;
		if(e.target.className === "overlayer"){
			href = e.target.parentNode.querySelector("a").href;
		}
		if(href){
			location.href = href;
		}
	},false);
	
	document.body.addEventListener("mouseover",function(e){
		console.log(e.target);
		if(wrapper){
			if(e.target !== wrapper && e.target !== wrapper.querySelector("span")){
			}
		}
		
	},false);
	
	})();