$( document ).ready(function() {
	new Dragdealer('just-a-slider', {
		slide:false,
		vertical:true,
		horizontal:false,
		y:1,
		animationCallback: function(x, y) {
			$('#just-a-slider .value').text(scaleY(y));
		}
	});

  $( ".direction" ).click(function() {
  	$('.forward-toggle').toggleClass('hide');
		$('.reverse-toggle').toggleClass('hide');
		$("#direction").trigger('click');
	});

	$( ".forward-toggle" ).click(function() {
		$('.forward-toggle').toggleClass('hide');
		$('.reverse-toggle').toggleClass('hide');
		$("#direction").trigger('click');
	});

	$( ".reverse-toggle" ).click(function() {
		$('.forward-toggle').toggleClass('hide');
		$('.reverse-toggle').toggleClass('hide');
		$("#direction").trigger('click');
	});

	function scaleY(y){
		// if(y < .4){
		//         		return 100 - Math.round(y / 0.004);
		//     		}
		// else if(y < .6){
		// 	return 0;
		// }
		// else{
		// 	return - Math.round((y - .6) / 0.004);
		// }
		return 100 - Math.round(y * 100);
	}

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
		var speed = Math.abs(speedJQ) / 100;
		if(speedJQ === 0){
			speed = 0;
		}
		else{
			speed = speed / 2 + .5;
		}

		$.post("http://192.168.1.81:5000",
			{
				speed:speed,
				direction:Number(direction)
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
		console.log('direction ', direction);
		updateHardware();
	}

	directionButton.click(toggleDirection);

});
