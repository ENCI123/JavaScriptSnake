function game()
{
window.onload=function(){

	var cvs = document.getElementById("canvas");
	var ctx = cvs.getContext("2d");

	var cvsW = cvs.width;
	var cvsH = cvs.height;

	var snakeW = 10;
	var snakeH = 10;

	var speed=80;
	var len=5;
	var snake=[];
	var score=0;
	for (var i = len; i >= 0; i--) {
		snake.push({x:i,y:0});
	}

	var direction ="right";

	document.addEventListener("keydown",getDirection);
    
	function getDirection(e){
		if(e.keyCode==37 && direction!="right"){
			direction="left";
		}else if(e.keyCode==38 &&direction!="down"){
			direction="up";	
		}
		else if(e.keyCode==39 && direction !="left"){
			direction="right";	
		}
		else if(e.keyCode==40 && direction !="up"){
			direction="down";	
		}
	}
	function drawScore(score) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
	}
	function drawSnake(x,y){
		
		ctx.fillStyle="#FFF";
		ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

		ctx.fillStyle = "#000";
		ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);

	}
	function determineHeadPosition(snake){
		var widthLimit=250;
		
		if(snake[0].x>widthLimit)
			return false;
		else
			return true;
	}
	fruit= {
			x:Math.floor(Math.random()*(cvsW/snakeW)+1),
			y:Math.floor(Math.random()*(cvsH/snakeH)+1)

		}
	function setFruit(x,y){
		ctx.fillStyle="red";
		ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

		ctx.fillStyle = "#000";
		ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);

	}
	function displayMessage(){
	document.getElementById("message").style.display='block';
   } 
	function draw(){
		//setFruit();
		
		ctx.clearRect(0,0,cvsW,cvsH);

		for (var i = 0; i < snake.length; i++) {
			var x=snake[i].x;
			var y=snake[i].y;

			drawSnake(x,y);

		}
		 setFruit(fruit.x,fruit.y);
		 var snakex = snake[0].x;
		 var snakey = snake[0].y;
		 if(snakex==fruit.x&& snakey==fruit.y){

		 	fruit.x=Math.round(Math.random()*(cvsW/snakeW)+1);
		 	fruit.y=Math.round(Math.random()*(cvsH/snakeH)+1);
		 	snake.push({x:len,y:0});
		 	score++;
		 	drawScore(score);
		 	

		 }
		 if(snakex<0 || snakey<0 || snakex>=cvsW/snakeW || snakey>=cvsH/snakeH){
		 	//	location.reload();
		 	return;
		 }
		 for(var i=1;i<snake.length;i++){
		 	if(snakex==snake[i].x && snakey==snake[i].y)
				{
					return;
				}
		}
		 snake.pop();
		 if(direction =="left") snakex--;
		 else if(direction == "up") snakey--;
		 else if(direction == "right") snakex++;
		 else if(direction == "down")  snakey++;



		var newHead= {
			x : snakex,
			y : snakey
		};
		 
	    snake.unshift(newHead);



	} 

 
  setInterval(draw,speed);
  

}
	
}
function newGame(){
	game();
}
function displayMessage(){
	document.getElementById("message").style.display='block';
} 
game();