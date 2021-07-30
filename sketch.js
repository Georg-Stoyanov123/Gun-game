var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;
var redBalloonSprite, blueBalloonSprite, blueBalloonGroup;
var bulletSprite;
var life=3;
var score=0;
var gameState=1
var randomNum, randomNum2;
var heading;
var detector;
var blast;
var endMessage;
var heading2;
var resetButton;

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);
  balloonGroup = new Group();
  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup(); 
  detector = createSprite(0, 0, 251, 1600)
  detector.visible = false;
  heading = createElement("h4");
  heading2 = createElement("h4")
}

function draw() {
  background("#BDA297");
  heading2 = heading2.html("Score: " + score)
  heading2.style("color: 255")
  heading2.position(100, 25)

  heading = heading.html("Lives: " + life)
  heading.style("color: 255")
  heading.position(100, 50)
  if (frameCount % 120 === 0) {
    spawnRandomRed();
  }
  if (frameCount % 160 === 0) {
    spawnRandomBlue();
  }
  if (keyWentDown("space")) {
    shoot()
  }
  if (blueBubbleGroup.isTouching(detector)) {
    gameOver(blueBubbleGroup)
  }
  if (redBubbleGroup.isTouching(detector)) {
    gameOver(redBubbleGroup)
  }
  if (bulletGroup.isTouching(blueBubbleGroup) && life > 0) {
    handleCollision(blueBubbleGroup);
  }
  if (bulletGroup.isTouching(redBubbleGroup) && life > 0) {
    handleCollision(redBubbleGroup);
  }
  //display Score and number of lives
  if(gameState===1){
    gun.y=mouseY  

    
    drawSprites();
  }
     

function spawnRandomRed(){
  randomNum = Math.round(random(0, height))
  redBalloonSprite = createSprite(width, randomNum, 10, 10)
  redBalloonSprite.addImage(redBubbleImg)
  redBalloonSprite.scale = 0.09
  redBubbleGroup.add(redBalloonSprite);
  redBubbleGroup.setVelocityXEach(-3)
}
function spawnRandomBlue() {
  randomNum2 = Math.round(random(0, height))
  blueBalloonSprite = createSprite(width, randomNum, 10, 10)
  blueBalloonSprite.scale = 0.1
  blueBalloonSprite.addImage(blueBubbleImg);
  blueBubbleGroup.add(blueBalloonSprite)
  blueBubbleGroup.setVelocityXEach(-3)
}
function shoot() {
  bulletSprite = createSprite(gun.x + 10, gun.y, 30, 30)
  bulletSprite.addImage(bulletImg);
  bulletSprite.scale = 0.2
  bulletGroup.add(bulletSprite)
  bulletGroup.setVelocityXEach(6);
}
function handleCollision(bubbleGroup) {
  if (life > 0) {
    score += 1
  }
  blast = createSprite(bulletSprite.x + 60, bulletSprite.y, 50, 50);
  blast.addImage(blastImg);
  blast.scale = 0.2;
  blast.lifetime = 20;
  bubbleGroup.destroyEach()
  bulletGroup.destroyEach()
}

}
function gameOver(bubbleGroup) {
  life = life - 1;
  bubbleGroup.destroyEach()
  if (life === 0) {
    gameState = 2;
    endMessage = swal({
      title: `Game over! press "Reset" to restart!`,
      text: "Oh no! You ran out of lives and ended up with a final score of: " + score + "!",
      imageUrl: "https://media.tenor.com/images/47053f0481d36f2e6a2b11994f568528/tenor.gif",
      imageSize: "100x100",
      confirmButtonText: "Okay"
    })
    resetButton = createImg("reset.png")
    resetButton.position(400, 400);
    resetButton.size(200, 200)
    resetButton.mousePressed(()=>{
      window.location.reload();
    })
  }
}