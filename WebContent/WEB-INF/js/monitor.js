function checkSupported() {

	
	drawCanvas('canvas');
 }

// Draw on the given canvas
function drawCanvas(canvas){
	canvas = document.getElementById(canvas);
    if (canvas.getContext){
     	
    	// Setup the canvas with some dummy items.
    	ctx = canvas.getContext('2d');
    	
    	canvas.addEventListener("mousedown", getPosition, false);
    	
    	// Needs to be a list of packages
    	this.items = [1,2,3,5,6,7,8,9];
  
    	// Some global variables for the initial position
    	this.itemSize = 10;
    	this.currentPosition = {'x':canvas.width/2,'y':canvas.height/2};
    	// Keep Track of all drawn items
    	this.itemPositions = [];
    	
    	drawElements(items);
    	
      
    } else {
      // Canvas is not supported
      alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
    }
}

// Draw all elents passed to this method. Should maybe pass which canvas to draw on.
function drawElements(elements){
	for(item in items){
		drawRandomItem(item);
	}
}

// Find the currenty clicked position. Taken from:  http://miloq.blogspot.com/2011/05/coordinates-mouse-click-canvas.html
function getPosition(event)
{
  var x = event.x;
  var y = event.y;

  var canvas = document.getElementById("canvas");

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  alert("x:" + x + " y:" + y);
}


function drawRandomItem(item){
	// Get a point which is within the bounds of the canvas
    suggestedPoint = [Math.floor(Math.random()*(canvas.width/itemSize))*itemSize, Math.floor(Math.random()*(canvas.height/itemSize))*itemSize];
    // If this point is already in use then call again.
    if (itemPositions.some(hasPoint)) {
    	drawRandomItem();
    } else {
    	// Fill in a rectangle on the suggested Point
        ctx.fillRect(suggestedPoint[0], suggestedPoint[1], itemSize, itemSize);
        
        // Push this new point onto the itemPositionsArray for future comparison
        itemPositions.push([suggestedPoint[0], suggestedPoint[1]]);
    };
}

function hasPoint(element, index, array) {
	   // Returns if the elements are on the same point.
	   return (element[0] == suggestedPoint[0] && element[1] == suggestedPoint[1]);
}
