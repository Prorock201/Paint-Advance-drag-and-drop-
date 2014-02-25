window.onload = bindEventHandlers;
var BruchWidth = 1;
var Clicking = false;
var EraserMode = false;
var Color = 'FFFFFF';

function bindEventHandlers() {
	var canvas = document.getElementById('content');
    var context = canvas.getContext('2d');
    var rect = canvas.getBoundingClientRect();
    canvas.width = 1000;
    canvas.height = 600;

    function getMousePos(canvas, event) {
        return {
        	x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
     
	$(canvas).on('mousedown', function(event) {
		Clicking = true;
    });

    $(canvas).on('mouseup', function(event) {
		Clicking = false;
    });

    $(canvas).on('mousemove', function(event) {
    	var mousePos = getMousePos(canvas, event);
    	if (Clicking) {
    		if (EraserMode) {
    			context.fillStyle = 'rgb(255, 255, 255)';
    			context.fillRect(mousePos.x - (BruchWidth/2),mousePos.y - (BruchWidth/2),BruchWidth,BruchWidth);
    		} else {
       			context.fillStyle = Color;
    			context.fillRect(mousePos.x - (BruchWidth/2),mousePos.y - (BruchWidth/2),BruchWidth,BruchWidth);
    		}
    	}
    });

    $(".color").on('change', function(event) {
    	Color = $(event.currentTarget).val();
    });

    $('#brush').on('change', function(event) {
    	BruchWidth = $(event.currentTarget).val();
    });

    $('#buttonEraser').on('click', function(event) {
    	var eraser = $(event.currentTarget).css('background-color');
    	if (eraser == 'rgb(255, 255, 255)') {
    		EraserMode = true;
    		$(event.currentTarget).css('background-color', 'rgb(255, 216, 0)');
    	} else {
    		EraserMode = false;
    		$(event.currentTarget).css('background-color', 'rgb(255, 255, 255)');
    	}
    });

    $('#buttonEraseAll').on('click', function(event) {
    	context.clearRect(0, 0, canvas.width, canvas.height);
    });
}