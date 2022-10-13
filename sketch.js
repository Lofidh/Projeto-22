const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var barco

var canvas, angle, tower, ground, cannon;
var bolaCanhao
var cannonBallMatriz = []
var barcosMatriz = []
var brokenBoatAnimation = [];
var brokenBoatJSON, brokenBoatIMG;
var backgroundMusic, splashSound, pirataSound, tiroSound
var gameoverMarca = false
var riso = false
var barcoAnimatioMatriz = []
var jsonVariable
var barcosImages

var waterSplashAnimation = [];
var waterSplashJSON, waterSplashIMG;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  brokenBoatJSON = loadJSON("assets/boat/broken_boat.json");
  brokenBoatIMG = loadImage("assets/boat/broken_boat.png");
  jsonVariable = loadJSON("assets/boat/boat.json")
  barcosImages = loadImage("assets/boat/boat.png")
  waterSplashJSON = loadJSON("assets/water_splash/water_splash.json");
  waterSplashIMG = loadImage("assets/water_splash/water_splash.png");
  backgroundMusic = loadSound("assets/background_music.mp3")
  splashSound = loadSound("assets/cannon_water.mp3")
  pirataSound = loadSound("assets/pirate_laugh.mp3")
  tiroSound = loadSound("assets/cannon_explosion.mp3")
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  angle = 15
  cannon = new Cannon(180, 110, 130, 100, angle)
  var framesMatriz = jsonVariable.frames
  for (var i = 0; i < framesMatriz.length; i++) {
    var pos = framesMatriz[i].position
    var img = barcosImages.get(pos.x, pos.y, pos.w, pos.h)
    barcoAnimatioMatriz.push(img)
  }
  var brokenBoatFrames = brokenBoatJSON.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatIMG.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }

  var waterSplashFrames = waterSplashJSON.frames;
  for (var i = 0; i < waterSplashFrames.length; i++) {
    var pos = waterSplashFrames[i].position;
    var img = waterSplashIMG.get(pos.x, pos.y, pos.w, pos.h);
    waterSplashAnimation.push(img);
  }
}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600)
  Engine.update(engine);

  if (!backgroundMusic.isPlaying()){
backgroundMusic.play()
backgroundMusic.setVolume(0.2)
  }

  rect(ground.position.x, ground.position.y, width * 2, 1);

  cannon.exibir()
  barcosExibir()


  console.log(barco.exibir)

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();
  for (var i = 0; i < cannonBallMatriz.length; i++) {
    showBalls(cannonBallMatriz[i], i)
    colisaoBarco(i)

  }
}
function keyReleased() {
  if (keyCode === 32) {
    cannonBallMatriz[cannonBallMatriz.length - 1].tiro()
tiroSound.play
  }
}
function keyPressed() {
  if (keyCode === 32) {
    bolaCanhao = new CannonBall(cannon.x, cannon.y)
    cannonBallMatriz.push(bolaCanhao)
  }
}
function showBalls(bolaCanhao, index) {
  if (bolaCanhao) {
    bolaCanhao.exibir()
    bolaCanhao.animate()
    if (bolaCanhao.body.position.x >= width || bolaCanhao.body.position.y >= height - 50) {
      if (!bolaCanhao.afundando){
        bolaCanhao.remove(index)
        splashSound.play
      }
     
    }
  }
}
function colisaoBarco(index) {
  for (var i = 0; i < barcosMatriz.length; i = i + 1) {
    if (cannonBallMatriz[index] !== undefined && barcosMatriz[i] !== undefined) {
      var colision = Matter.SAT.collides(cannonBallMatriz[index].body, barcosMatriz[i].body)
      if (colision.collided) {
        barcosMatriz[i].remove(i)
        Matter.World.remove(world, cannonBallMatriz[index].body)
        delete cannonBallMatriz[index]
      }
    }
  }
}
function barcosExibir() {
  if (barcosMatriz.length > 0) {
    if (barcosMatriz[barcosMatriz.length - 1] === undefined || barcosMatriz[barcosMatriz.length - 1].body.position.x < width - 300) {
      var position = [-50, -70, -40, -60]
      var posicaoAleatorio = random(position)
      barco = new Navio(width - 79, height - 60, 170, 170, posicaoAleatorio)
      barcosMatriz.push(barco)
    }
    for (var i = 0; i < barcosMatriz.length; i = i + 1) {
      if (barcosMatriz[i]) {
        Matter.Body.setVelocity(barcosMatriz[i].body, { x: -1, y: 0 })

        barcosMatriz[i].exibir()
        barcosMatriz[i].animate()
        var colisao = Matter.SAT.colides(this.tower,barcosMatriz[i].body)
        if (colisao.collided&&!barcosMatriz[i].quebrado){
          if (!riso&&!pirataSound.isPlaying){
pirataSound.play()
riso = true
          }
gameOver()
gameoverMarca = true
        }
      }
      else {
        barcosMatriz[i]
      }
    }
  } else {
    barco = new Navio(width - 79, height - 60, 170, 170, -80)
    barcosMatriz.push(barco)
  }
}
function gameOver() {
  swal({
      title: `Fim de Jogo!!!`,
      text: "Obrigada por jogar!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}