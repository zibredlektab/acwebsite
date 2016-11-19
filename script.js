var bluramount = 0;

var scroller = new scrollPercent;

$(document).ready(function(){

	$("#play").click(function() {
		$("#name").animate({foo:100}, {
			duration: 4000,
			step: function(value) {
				blur("#name", value);
			}
		});
	});
	
	$("#resume").click(function() {
		$("body").animate({foo:50},{
			duration: 600,
			step: function(value) {
				blur("body", value);
			},complete: function() {
				window.location.href = "http://www.maxbatchelder.com/resume.pdf";
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

	scroller.init();

	var scrollamount = scroller.percent();
	
	//$("#name").css("transform", "translate(0px," + scrollamount*1.7 + "px)");
	//$("#title").css("transform", "translate(0px," + scrollamount*-.2 + "px)");
	//$("#content").css("transform", "translate(0px," + scrollamount*-5 + "px)");	
	
	
	//$("#title").css("top", scrollamount*-20 + "%");
	
	$("#content").css("top", 115+scrollamount*-.5 + "%");
	
	blur("#name", scrollamount*.35);
	blur("#title", scrollamount*.1);
	//blur("#content", 50-scrollamount);
}