//MAKING THE VARIABLES
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;

function preload() {

  // LOADING THE IMAGES
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(500, 400);

  //CREATEING THE SPRITES AND THE GROUPS
  monkey = createSprite(120, 330, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.19;

  ground = createSprite(250, 385, 500, 15);


  foodGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
}


function draw() {
  background(185);
  // MONKEY WILL COLLIDE WITH THE GROUND
  monkey.collide(ground);
  //THINGS TO HAPPEN IN GAME STATE PLAY
  if (gameState === PLAY) {

    monkey.velocityY = monkey.velocityY + 0.8;
    text("TOOK BANANA :" + score, 200, 70);
    if (World.frameCount % 200 == 0) {
      banana1();
    }
    if (World.frameCount % 250 == 0) {
      obstacle1();
    }
    if (keyDown("space")) {
      monkey.velocityY = -12;
    }
    if (foodGroup.isTouching(monkey)) {
      score = score + 1;
      foodGroup.destroyEach();
    }

    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
  }
  //THINGS TO HAPPEN IN GAMESTATE END
  if (gameState === END) {
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.destroy();
    textSize(25);
    textFont("algerian");
    text("GAME OVER", 200, 200);

  }
  drawSprites();

}
//BANANA FUNCTION
function banana1() {
  banana = createSprite(510, 150, 20, 20);
  banana.y = Math.round(random(75, 200));
  banana.addImage(bananaImage);
  banana.scale = 0.12;
  banana.velocityX = -2;
  banana.lifetime = 250;
  if (banana.isTouching(monkey)) {
    score = score + 1;
  }
  foodGroup.add(banana);
}
//OBSTACLE FUNCTION
function obstacle1() {
  obstacle = createSprite(400, 330);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.33
  obstacle.velocityX = -2;
  obstacle.lifetime = 160;
  obstacleGroup.add(obstacle);
}