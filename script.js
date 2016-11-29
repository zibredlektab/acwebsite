var bluramount = 0;
var arrowisvisible = false;
var havescrolled = false;
var scroller = new scrollPercent;
history.navigationMode = 'compatible';


// Safari needs things to happen on "pageshow" instead of document.ready.
$(window).bind("pageshow", function(event) {

	console.log("window loaded");
	setTimeout(function() {
		$('html, body').scrollTop(0); 
	}, 10);

	
	console.log("document ready");

	$("body").animate({fadeincounter:50},{
		duration: 500,
		step: function(value) {
			console.log("blurring in");
			blur(".fade-on-transition", 50-value, value/50);
		}, complete: function() {
			console.log("fade-in complete");			
			showArrowIfHaventScrolled();
			$("body").css("fadeincounter", 0);
		}
	});
	
	
	
	// links should blur out the page before transitioning
	$("a").click(function() {
		var link = $(this);
		if (!link.attr("href")) {
			console.log("link doesn't have an href");
			$("body").animate({fadeoutcounter:50},{
				duration: 300,
				step: function(value) {
					console.log("blur value is " + value);
					blur(".fade-on-transition", value, 1-(0.02*value));
				},complete: function() {
					var suffix = "html";
					if (link.attr("id") == "resume") {
						// the resume is a pdf, not html
						suffix = "pdf";
					}
					window.location.href = link.attr("id") + "." + suffix;
					$("body").css("fadeoutcounter", 0);
				}
			});
		}
	});
});



window.onscroll = function() {

	//var scrollTop     = $(window).scrollTop(),
		//elementOffset = $('.about-container').offset().top,
		//distance      = (elementOffset - scrollTop);

	//console.log(elementOffset);


	if (arrowisvisible) {
		$("#arrow").fadeOut(600);
		arrowisvisible = false;
	}

	scroller.init();

	var scrollamount = scroller.percent();
	
	// the page automatically scrolls to the top when it is loaded, but that shouldn't
	// count as "scrolling" for the purposes of showing the hint arrow
	if (scrollamount == 0) {
		havescrolled = false;
	} else {
		havescrolled = true;
	}
	
	
	// if we're on a "scrollable" page (like about.html), scroll effects shouldn't begin
	// until we're most of the way down the page
	if ($("body").hasClass("scrollable")) {
	
		scrollamount -= 80;

		
		// at -12%, the menu should fade in
	/*	if (scrollamount > -12) {
			blur("#about-menu", scrollamount, scrollamount/100);
		}
*/

		
		blur("#about-menu", 19-scrollamount, .05*scrollamount);
		
		
	console.log("scrolling, position is " + scrollamount + "%");
		
		if (scrollamount > 0) {
			scrollamount *= 5;
		}


	}
	
	
	//$("#name").css("transform", "translate(0px," + scrollamount*1.7 + "px)");
	//$("#title").css("transform", "translate(0px," + scrollamount*-.2 + "px)");
	//$("#content").css("transform", "translate(0px," + scrollamount*-5 + "px)");	
	
	
	//$("#title").css("top", scrollamount*-20 + "%");
	
	//$("#content").css("top", 115+scrollamount*-.65 + "%");
	
	blur(".name .blur", scrollamount*.35, (120-scrollamount)/100);
	blur(".blur", scrollamount*.1, (120-scrollamount)/100);
	//blur("#content", 50-scrollamount);
}


function showArrowIfHaventScrolled() {
	if ($("#arrow").attr("class") != "no-animate") {
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
	} else {
		$("#arrow").css("opacity", 1);
		arrowisvisible = true;
	}

}




function blur(thingtoblur, radius, opac) {

	if (opac == undefined) {
		opac = 1;
	}

	if (radius > 50) { // don't blur anything more than 50 pixels
		radius = 50;
	}
	
	if (radius < 0) { // blur radii of less than 0 make no sense, lets not waste time
		radius = 0;
	}
	
	$(thingtoblur).foggy({
		blurRadius: radius,
		opacity: opac
	});
}