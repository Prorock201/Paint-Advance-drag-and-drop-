window.onload = bindEventHandlers;
var BruchWidth = 10;
var Clicking = false;
var EraserMode = false;
var Color = '#000000';
var PreviousX = 0;
var PreviousY = 0;
var Marks = [];
var Pen = [];

function bindEventHandlers() {
	window.canvas = document.getElementById('content');
    window.context = canvas.getContext('2d');
    var rect = canvas.getBoundingClientRect();
    canvas.width = 1000;
    canvas.height = 600;

    function getMousePos(event) {
    	return {
        	x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    function getMark() {
        this.x = event.clientX - rect.left;
        this.y = event.clientY - rect.top;
        this.color = Color;
        this.size = BruchWidth;
    }

    function getBruch() {
        this.x = event.clientX - rect.left;
        this.y = event.clientY - rect.top;
        this.color = Color;
        this.size = BruchWidth;
    }
     
	$(canvas).on('mousedown', function(event) {
		Clicking = true;
    });

    $(canvas).on('mouseup', function(event) {
		Clicking = false;
    });

    $(canvas).on('mousemove', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        var mousePos = getMousePos(event);
        Pen = [];
        Pen.push(new getBruch());
        $.each(Marks, function (index, element) {
            context.fillStyle = element.color;  
            context.fillRect(element.x - (element.size/2),element.y - (element.size/2), element.size, element.size);
        });

        $.each(Pen, function (index, element) {
            context.fillStyle = element.color;  
            context.fillRect(element.x - (element.size/2),element.y - (element.size/2), element.size, element.size);
        });

    	if (Clicking) {
    		if (EraserMode) {
                Color = '#FFFFFF'
    			context.fillStyle = 'rgb(255, 255, 255)';
    			context.fillRect(mousePos.x - (BruchWidth/2),mousePos.y - (BruchWidth/2), BruchWidth, BruchWidth);
    		} else {
       			context.fillStyle = Color;
    			context.fillRect(mousePos.x - (BruchWidth/2),mousePos.y - (BruchWidth/2), BruchWidth, BruchWidth);
    		}
            Marks.push(new getMark());
    	} 
        Color = $('.color').val();
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
        Marks = [];
    });
}