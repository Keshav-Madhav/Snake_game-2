//Game Variables & constants
let inputDir = {x:0,y:0};
const foodConsumed=new Audio("Assets/snake-eat.mp3");
const gameOver= new Audio("Assets/snake-lose.mp3");
const snakeTurn=new Audio("Assets/snake-turn.mp3");
const backgroundMusic= new Audio("Assets/8-bit-slowed.mp3");
let speed=10;
let score=0;
let lastPaintTime=0;
let snakeArr=[{x:13,y:15}]
let food = {x:10,y:10};


//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    console.log(lastPaintTime);
    gameEngine();
}

function isCollide(snake){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    
    if((snake[0].x >=26 || snake[0].x<=0) || (snake[0].y>=26 || snake[0].y<=0)){
        return true;
    }
}

function gameEngine(){

    //updating snake and food
    if(isCollide(snakeArr)){
        gameOver.play();
        backgroundMusic.pause();
        inputDir={x:0,y:0};
        alert("Game Over, Press any key to restart");
        snakeArr=[{x:13,y:15}];
        backgroundMusic.play();
        score=0;
        scoreBox.innerHTML="Score: 0"
    }


    //Food eating
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodConsumed.play();
        score+=1;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            highScore.innerHTML="High Score: "+highscoreval
        }
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x , y: snakeArr[0].y+inputDir.y});
        let a= 2;
        let b= 24;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }


    //Moving snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //Snake Display
    board.innerHTML= "";
    snakeArr.forEach((e,index)=>{
        snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(index===0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    })

    //Food Display
    foodElement= document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart= food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}


//Main Logic
let highscore=localStorage.getItem("highscore");
if(highscore===null){
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval=JSON.parse(highscore)
    highScore.innerHTML="High Score: "+ highscoreval;
}
window.requestAnimationFrame(main);
backgroundMusic.play();
window.addEventListener('keydown', e=>{
    inputDir={x:0,y:1} //started
    snakeTurn.play();
    switch(e.key){
        case "ArrowUp":
            console.log("arrow up")
            inputDir.x= 0;
            inputDir.y= -1;
            break;

        case "ArrowDown":
            console.log("arrow down")
            inputDir.x= 0;
            inputDir.y= 1;
            break;

        case "ArrowRight":
            console.log("arrow right")
            inputDir.x= 1;
            inputDir.y= 0;
            break;

        case "ArrowLeft":
            console.log("arrow left")
            inputDir.x= -1;
            inputDir.y= 0;
            break;

        default:
            break;
    }
});