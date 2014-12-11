$( document ).ready(function() {	
	new Dragdealer('just-a-slider', {
		slide:false,
		animationCallback: function(x, y) {
			$('#just-a-slider .value').text(Math.round(x * 100));
		}
	});
	var sliding = false; // variable toggled when slider is moved
	var everything = document.body; // the entire page
	var elements = everything.getElementsByClassName("trainControl"); // all slider elements
	
	// add event to when the slider is clicked
	// trigger event upon release
	for(i=0; i < elements.length; i++){ 
		if (typeof window.ontouchstart !== 'undefined') {
			//mobile events
			elements[i].addEventListener('touchstart', tap);
			elements[i].addEventListener('touchend', release);
		}else{
			//desktop events
			elements[i].addEventListener('mousedown', tap);
			elements[i].addEventListener('mouseup', release);
		}
	}
	
	if (typeof window.ontouchstart !== 'undefined') {
		everything.addEventListener('touchend', release);
	}else{
		everything.addEventListener('mouseup', release);
	}
	
	function tap(event) {
		//start drag
		sliding = true;
	}
	
	function release(event){
		if(sliding === true){
			// drag has ended, trigger event
			sliding = false;
			var speed = Number($('#just-a-slider .value').text()) * 2
			//alert($('#just-a-slider .value').text());

			$.post("http://train.local:5000",
				{
					hello:speed
				}
			);
		}
	}
});
