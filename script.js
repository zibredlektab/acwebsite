var bluramount = 0;
var arrowisvisible = false;
var havescrolled = false;
var scroller = new scrollPercent;

$(document).load(function(){
	
	blur("body", 50);
	
});

$(document).ready(function(){

	$("body").animate({foo:50},{
		duration: 2000,
		step: function(value) {
			blur("body", 50-value);
		}, complete: function() {
			if (!havescrolled) {
				$("#arrow").delay(3000).animate({"opacity":1},{
					duration: 1000,
					complete: function() {
						arrowisvisible = true;
					}
				});
			}
		}
	});

	$("#play").click(function() {
		$("#name").animate({foo:100}, {
			duration: 4000,
			step: function(value) {
				blur("#name", value);
			}
		});
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

	if (radius > 50) {
		radius = 50;
	}
	
	if (radius < 0) {
		radius = 0;
	}
	
	$(thingtoblur).foggy({
		blurRadius: radius,
		opacity: 1
	});
}



window.onscroll = function() {

	havescrolled = true;

	if (arrowisvisible) {
		$("#arrow").fadeOut(200);
		arrowisvisible = false;
	}

	scroller.init();

	var scrollamount = scroller.percent();
	
	//$("#name").css("transform", "translate(0px," + scrollamount*1.7 + "px)");
	//$("#title").css("transform", "translate(0px," + scrollamount*-.2 + "px)");
	//$("#content").css("transform", "translate(0px," + scrollamount*-5 + "px)");	
	
	
	//$("#title").css("top", scrollamount*-20 + "%");
	
	$("#content").css("top", 115+scrollamount*-.5 + "%");
	
	blur("#name", scrollamount*.35);
	blur("#title", scrollamount*.1);
	blur("#line", scrollamount*.1);
	//blur("#content", 50-scrollamount);
}