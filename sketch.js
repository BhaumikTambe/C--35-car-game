var ball;
var hypnoticball,dataBase,position;

function setup(){
    createCanvas(500,500);
    hypnoticball = createSprite(250,250,10,10);
    hypnoticball.shapeColor = "red";
    
    dataBase = firebase.database();
    console.log(dataBase);
    var  hypnoticballposition = dataBase.ref('ball/position');
    hypnoticballposition.on("value", readPosition, showError);
}

function draw(){
    background("white");

    if(position !== undefined) {
    if(keyDown(LEFT_ARROW)){
        writePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+5);
    }
}
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readPosition(data) {
    position = data.val();
    console.log(position);
    hypnoticball.x = position.x;
    hypnoticball.y = position.y;
}

function writePosition(x, y) {
    dataBase.ref('ball/position').set({ 'x': position.x + x , 'y': position.y + y })
}
function showError() {
console.log("Error in writing to the database"); 
}