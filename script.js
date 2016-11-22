var bluramount = 0;
var arrowisvisible = false;
var havescrolled = false;
var scroller = new scrollPercent;

$(window).load(function(){
	setTimeout(function() {
		$('html, body').scrollTop(0); 
	}, 10);
});

$(document).ready(function(){
	
	$("body").animate({foo:50},{
		duration: 2000,
		step: function(value) {
			blur("body", 50-value);
		}, complete: function() {
			console.log("fade-in complete");			
			if (!havescrolled) { // if we haven't already started scrolling
				console.log("check 1: have not scrolled yet");
				setTimeout(function() {
					console.log("waited two seconds");
					// wait two seconds before showing the arrow
					if (!havescrolled) { // double-check that we haven't scrolled in those two seconds
						console.log("check 2: still haven't scrolled, fading in arrow");
						$("#arrow").animate({"opacity":1},{ // show the arrow
							duration: 1000,
							complete: function() {
								console.log("arrow is fully faded-in");
								arrowisvisible = true;
							}
						});
					} else {
						console.log("check 2 failed, scrolled during the two second wait");
					}
				}, 2000);
				
			} else {
				console.log("check 1 failed, have already scrolled");
			}
		}
	});
	
	$("a").click(function() {
		var link = $(this)
		$("body").animate({foo:50},{
			duration: 600,
			step: function(value) {
				blur("body", value);
			},complete: function() {
				window.location.href = link.text()+".html";
			}
		});
	});
});

$(document).on('input change', '#blur', function() {
    bluramount = $('#blur').html( $(this) ).prop("value");

	blur("#name", bluramount);
    
});



function blur(thingtoblur, radius) {

	if (radius > 50) { // don't blur anything more than 50 pixels
		radius = 50;
	}
	
	if (radius < 0) { // blur radii of less than 0 make no sense, lets not waste time
		radius = 0;
	}
	
	$(thingtoblur).foggy({
		blurRadius: radius,
		opacity: 1
	});
}



window.onscroll = function() {

	if (arrowisvisible) {
		$("#arrow").fadeOut(200);
		arrowisvisible = false;
	}

	scroller.init();

	var scrollamount = scroller.percent();
	
	// the page automatically scrolls to the top when it is loaded, but that shouldn't
		// count as "scrolling" for the purposes of showing the arrow
	if (scrollamount == 0) {
		havescrolled = false;
	} else {
		havescrolled = true;
	}
	
	
	
	console.log("scrolling, position is " + scrollamount + "%");
	
	//$("#name").css("transform", "translate(0px," + scrollamount*1.7 + "px)");
	//$("#title").css("transform", "translate(0px," + scrollamount*-.2 + "px)");
	//$("#content").css("transform", "translate(0px," + scrollamount*-5 + "px)");	
	
	
	//$("#title").css("top", scrollamount*-20 + "%");
	
	//$("#content").css("top", 115+scrollamount*-.5 + "%");
	
	blur("#name", scrollamount*.35);
	blur("#title", scrollamount*.1);
	blur("#line", scrollamount*.1);
	//blur("#content", 50-scrollamount);
}