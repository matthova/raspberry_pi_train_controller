$( document ).ready(function() {
	var sliding = false;
	new Dragdealer('just-a-slider', {
		slide:false,
		
		animationCallback: function(x, y) {
			$('#just-a-slider .value').text(Math.round(x * 100));
		}
	});
	
	$('#just-a-slider').children().mousedown(function(){
		sliding = true;
	});

	$('#just-a-slider').mousedown(function(){
		sliding = true;
	});
	
	$( document ).mouseup(function(){
		if(sliding === true){
			sliding = false;
			alert($('#just-a-slider .value').text());
		}
	});
});