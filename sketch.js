const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;
var rope
var chao;
var gomugomu
var link
var bonnie,bonnieimg
var background 
var gomugomuimg
var button 
var idle
var eating
var sad 
var air 
var eatsound
var cut
var music 
var balloon
var sadsound
var mute
var rope2
var link2
var button2
function preload(){
gomugomuimg = loadImage("images/gomugomunomi.png")
background = loadImage ("images/background.png")
bonnieimg = loadImage ("images/rabbit1.png")
idle = loadAnimation ("images/rabbit1.png","images/rabbit2.png","images/rabbit3.png")
eating = loadAnimation ("images/eat.png","images/eat_2.png","images/eat_3.png","images/eat_4.png")
sad = loadAnimation ("images/sad_1.png","images/sad_2.png","images/sad_3.png")
air = loadSound ("sounds/air.wav")
eatsound = loadSound ("sounds/eating_sound.mp3")
cut = loadSound ("sounds/rope_cut.mp3")
music = loadSound ("sounds/sound1.mp3")
sadsound = loadSound ("sounds/sad.wav")


eating.looping = false
sad.looping = false
}
function setup() {
  //aumenta o tamanho da tela - largura e altura
  createCanvas(500, 700);

  engine = Engine.create();
  world = engine.world;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);

  //definir como corpo fisico
  chao = Bodies.rectangle(250, 690, 500, 20, { isStatic: true });

  //adicionar ao mundo
  World.add(world, chao);
  rope = new Rope(8,{x:250,y:50}) 
  gomugomu = Bodies.circle (250,300,15)
  Composite.add (rope.body,gomugomu)
  link = new Link(rope,gomugomu)
  rope2 = new Rope (8,{x:170,y:50}) 
  link2 = new Link (rope2,gomugomu)
  bonnie = createSprite(100,590)
idle.frameDelay = 17
sad.frameDelay = 17
eating.frameDelay = 17
  bonnie.addAnimation("bonnie",idle)
  bonnie.addAnimation("eating",eating)
  bonnie.addAnimation("sad",sad)
  bonnie.scale = 0.25
button = createImg("images/cut_btn.png")
button.position(300,50)
button.size(50,50)
button.mouseClicked(drop)
button2 = createImg("images/cut_btn.png")
button2.position(100,50)
button2.size(50,50)
button2.mouseClicked(drop2)

mute = createImg ("images/mute.png")
mute.size (50,50)
mute.position (50,50)
mute.mouseClicked(mutar)

balloon = createImg("images/balloon.png")
balloon.position (350,250)
balloon.size (150,100)
balloon.mouseClicked(soprar)
music.play()
music.setVolume (0.3)


}

function draw() {
  image (background,250,350,500,700)
  Engine.update(engine);

  //desenho do chao
  rect(chao.position.x, chao.position.y, 500, 20);
  rope.show()
  rope2.show()
  if (gomugomu!= null){
    image(gomugomuimg,gomugomu.position.x,gomugomu.position.y,85,85)
  }
  if (gomugomu!= null && gomugomu.position.y>=650) {
    bonnie.changeAnimation("sad")
    sadsound.play()
    gomugomu=null
  }
  if(collision(gomugomu,bonnie)===true){
    bonnie.changeAnimation("eating")
    eatsound.play()
  }
  drawSprites ()
}
function drop (){
  rope.break()
    link.break()
  
}
function collision(body,sprite){
  if (body!=null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if (d<=80) {
      World.remove (world,gomugomu)
      gomugomu = null
      return true
    }
    else{
      return false
    }
  }
}
function soprar(){
  air.play()
  Matter.Body.applyForce (gomugomu,{x:0,y:0},{x:-0.05,y:0})
}
function mutar(){
  if (music.isPlaying()){
    music.stop()
    
  }
  else{music.play()}
}
function drop2 (){
  rope2.break()
    link2.break()
  
}