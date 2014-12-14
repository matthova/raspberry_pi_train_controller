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
	var directionButton = $('#direction');
	var direction = false;
	
	// add event to when the slider is clicked
	// trigger event upon release
	for(i=0; i < elements.length; i++){ 
		if (typeof window.ontouchstart !== 'undefined') {
			//mobile events
			elements[i].addEventListener('touchstart', tap);
			elements[i].addEventListener('touchend', release);
			elements[i].addEventListener('drag', drag);
		}else{
			//desktop events
			elements[i].addEventListener('mousedown', tap);
			elements[i].addEventListener('mouseup', release);
			elements[i].addEventListener('mousemove', drag);
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
	//check the checkboxes with this
	//$('#stopGo').is(':checked')
	function release(event){
		if(sliding === true){
			// drag has ended, trigger event
			updateHardware();
			sliding = false;
		}
	}
	
	function drag(event){
		updateHardware();
	}

	setInterval(function(){
		if(sliding){
			updateHardware();
		}
	},500);

	function updateHardware(){
		var speedJQ = Number($('#just-a-slider .value').text())
		var speed;
		if(speedJQ === 0){
			speed = 0;
		}
		else{
			speed = speedJQ / 200 + .5;
		}

		var theDirection = Number(direction);
		$.post("http://train.local:5000",
			{
				hello:speed,
				direction:theDirection
			}
		);
	}
	
	function toggleDirection(){
		if(direction){
			directionButton.removeClass("forward");
			directionButton.addClass("reverse");
		}else{
			directionButton.removeClass("reverse");
			directionButton.addClass("forward");
		}
		direction = !direction;
		updateHardware();
	}
	
	directionButton.click(toggleDirection);
	updateHardware();
});
