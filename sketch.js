var rocket, rocket_img
var space, space_img
var obstacles, obstaclesGroup, alien1_img, alien2_img
var gameOver_img 
var bullet, bullet_img, bulletsGroup
var invisibleGround
var tfail_sound
var restart, restart_img
var PLAY = 1
var END = 0
var gameState = PLAY

var score

function preload(){

    rocket_img= loadImage("Spaceship.png")
    space_img= loadImage("Space scene.png")
    alien1= loadImage("Alien 1.png")
    alien2= loadImage("Alien 2.png")
    gameOver_img= loadImage("Game Over.png")
    bullet_img = loadImage("Bullet.png")
    restart_img = loadImage("restart.png")
    //tfail_sound = loadSound("Error sound.mp3")
    
    
}

function setup() {
    createCanvas(400,400)

    space= createSprite(200,100)
    space.addImage(space_img);
    space.scale= 1
    space.velocityY= 3

    rocket= createSprite(200, 350)
    rocket.addImage(rocket_img)
    rocket.scale= 0.6

    invisibleGround = createSprite(200,400,400,15)
    invisibleGround.visible = false;

    gameOver= createSprite(200,150);
    gameOver.addImage(gameOver_img);
    gameOver.scale = 0.5;
    gameOver.visible=false;

    restart = createSprite(200,250)
    restart.addImage(restart_img)
    restart.scale = 0.5;
    restart.visible=false;

    obstaclesGroup= new Group() 
    bulletsGroup= new Group()

    score=0;

}


function draw() {
    background("blue")
   
    console.log(space.velocityY)
    
    if (gameState === PLAY){

        spawnObstacles(); 
        spawnBullets();
        gameOver.visible=false;
        restart.visible=false;

        if(space.y > 350){
            space.y = 200;
        }

        space.velocityY= 5 + 7* score/100
        
        if(keyDown("left")){
            rocket.x = rocket.x-7
        }
        
        if(keyDown("right")){
            rocket.x = rocket.x+7
        }

        if(obstaclesGroup.isTouching(bulletsGroup)){
            obstaclesGroup.destroyEach();
            bulletsGroup.destroyEach()
            score=score+5;
        }

        if(obstaclesGroup.isTouching(rocket) || obstaclesGroup.isTouching(invisibleGround)){
            gameState = END;

            
        }
    }

    else if(gameState === END){

        space.velocityY= 0;
        obstaclesGroup.setVelocityYEach(0);
        gameOver.visible=true;
        restart.visible=true;
        
        if(mousePressedOver(restart)) {
            reset();
        }
    }

    drawSprites()
}
function spawnBullets(){
    if(keyDown("space")){
        bullet = createSprite(rocket.x,rocket.y)
        bullet.addImage(bullet_img)
        bullet.velocityY = -5
        bullet.scale = 0.2
        bullet.lifeTime = 400;
        bulletsGroup.add(bullet);
        rocket.depth = bullet.depth+1
    }
}

function spawnObstacles(){
    if(frameCount % 90 === 0){
        var obstacles= createSprite(random(20,380),10)
        obstaclesGroup.add(obstacles);
        obstacles.scale= 0.4
        obstacles.velocityY = 7 + 7* score/100
        obstacles.lifeTime = 400
        var rand= Math.round(random(1,2));
        switch(rand) {
        
            case 1: obstacles.addImage(alien1)
                break;
            case 2: obstacles.addImage(alien2)
                break;
            default: break
        }    
    }
   

}

function reset(){

    gameState = PLAY
    gameOver.visible = false;
    restart.visible = false;
    obstaclesGroup.destroyEach();
    score = 0
}



