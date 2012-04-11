function checkSupported() {
    canvas = document.getElementById('mainScreen');
    if (canvas.getContext){
     	
    	
    	ctx = canvas.getContext('2d');
    	this.gridSize = 10;
    	start();

      
    } else {
      // Canvas is not supported
      alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
    }
 }

function start(){
	   ctx.clearRect(0,0, canvas.width, canvas.height);
	   this.currentPosition = {0:50, 1:50};
	   snakeBody = [];
	   snakeLength = 3;
	   updateScore();
	   makeFoodItem();
	   drawSquare();
	   direction = 'right';
	   play();  
}

function makeFoodItem(){
	    suggestedPoint = [Math.floor(Math.random()*(canvas.width/gridSize))*gridSize, Math.floor(Math.random()*(canvas.height/gridSize))*gridSize];
	    if (snakeBody.some(hasPoint)) {
	      makeFoodItem();
	    } else {
	      ctx.fillStyle = "rgb(10,100,0)";
	      ctx.fillRect(suggestedPoint[0], suggestedPoint[1], gridSize, gridSize);
	    };
}
	 
function hasPoint(element, index, array) {
	   return (element[0] == suggestedPoint[0] && element[1] == suggestedPoint[1]);
}

function moveUp(){
	   if (upPosition() >= 0) {
	      executeMove('up', 1, upPosition());
	   }else{
		   whichWayToGo(0);
	   }
}
	  
function moveDown(){
	   if (downPosition() < canvas.height) {
	      executeMove('down', 1, downPosition());    
	   }else{
		   whichWayToGo(0);
	   }
}
	 
function moveLeft(){
	   if (leftPosition() >= 0) {
	     executeMove('left', 0, leftPosition());
	   }else{
		   whichWayToGo(1);
	   }
}
	 
function moveRight(){
	   if (rightPosition() < canvas.width) {
	     executeMove('right', 0, rightPosition());
	   }else{
		   whichWayToGo(1);
	   }
}

function executeMove(dir, axisType, axisValue){
	direction = dir;
	currentPosition[axisType] = axisValue;
	drawSquare();
}

function whichWayToGo(axisType){  
	   if (axisType==0) {
	     a = (currentPosition[0] > canvas.width / 2) ? moveLeft() : moveRight();
	   } else {
	     a = (currentPosition[1] > canvas.height / 2) ? moveUp() : moveDown();
	   }
}

function pause(){
   clearInterval(interval);
   allowPressKeys = false;
}

function play(){
	interval = setInterval(moveSnake,100);
	allowPressKeys = true;
}

function restart(){
	pause();
	play();
}

function moveSnake(){
   switch(direction){
     case 'up':
       moveUp();
       break;
 
     case 'down':
       moveDown();
       break;
 
     case 'left':
       moveLeft();
       break;
 
     case 'right':
      moveRight();
       break;
   }
}

function drawSquare(){
	if (snakeBody.some(hasEatenItself)) {
		   gameOver();
		   return false;
	}
	
	snakeBody.push([currentPosition[0], currentPosition[1]]);
    
    ctx.fillStyle = "rgb(200,0,0)";
	ctx.fillRect(currentPosition[0], currentPosition[1], gridSize, gridSize);
	if (snakeBody.length > snakeLength) {
	     var itemToRemove = snakeBody.shift();
	     ctx.clearRect(itemToRemove[0], itemToRemove[1], gridSize, gridSize);
	}
	
	if (currentPosition[0] == suggestedPoint[0] && currentPosition[1] == suggestedPoint[1]) {
		  makeFoodItem();
		  snakeLength += 1;
		  updateScore();
	}
}

function gameOver(){
	var score = (snakeLength - 3)*10;
	pause();
	alert("Game Over. Your score was "+ score);
	ctx.clearRect(0,0, canvas.width, canvas.height);
	document.getElementById('play_menu').style.display='none';
	document.getElementById('restart_menu').style.display='block';
}

function updateScore(){
	var score = (snakeLength - 3)*10
	document.getElementById('score').innerText = score;
}

function hasEatenItself(element, index, array) {
	 return (element[0] == currentPosition[0] && element[1] == currentPosition[1]);  
}


function leftPosition(){
	 return currentPosition[0] - gridSize;  
} 
	 
function rightPosition(){
	return currentPosition[0] + gridSize;
}
 
function upPosition(){
	return currentPosition[1] - gridSize;  
}

function downPosition(){
	return currentPosition[1] + gridSize;
}



document.onkeydown = function(event) {
	if(!allowPressKeys){
		return null;
	}
	var keyCode;
	
	if(event == null){
		keyCode = window.event.keyCode;
	}else{
		keyCode = event.keyCode;
	}
	
	switch(keyCode){
		// Left
		case 37:
			if(direction != "right"){
				moveLeft();
			}
			break;
		// Up
		case 38:
			if(direction != "down"){
				moveUp();
			}
			break;
	
		// Right
		case 39:
			if(direction != "left"){
				moveRight();
			}
			break;
			
		// Down
		case 40:
			if(direction != "up"){
				moveDown();
			}
			break;
	
		default:
			break;
	}

}