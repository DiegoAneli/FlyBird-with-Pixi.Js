//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

//Create a Pixi Application
let app = new Application({ 
    width: 1429, //dimensioni prese da finestra file .json
    height: 981, //dimensioni prese da finestra file .json                      
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);


//Background
var bg = PIXI.Sprite.fromImage('img/bezier/BackGame.png');
bg.width = app.screen.width;
bg.height = app.screen.height;
app.stage.addChild(bg);


//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load a JSON file and run the `setup` function when it's done
loader
  .add("img/bezier/birdfly.json")
  .load(setup);

//Define variables that might be used in more 
//than one function
let cicogna, id;

function setup() {

  //Create an optional alias called `id` for all the texture atlas 
  //frame id textures.
  id = PIXI.loader.resources["img/bezier/birdfly.json"].textures; 
  
  //alias
  cicogna = new Sprite(id["birdfly.png"]);
  app.stage.addChild(cicogna);

  //Position of the canvas
  cicogna.x = app.stage.width;
  cicogna.y = app.stage.height;
  app.stage.addChild(cicogna);
  
}

//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



//PROVA CON SPINE//

/*import * as PIXI from 'pixi.js';
import {Spine} from 'pixi-spine';

const app = new PIXI.Application();
document.body.appendChild(app.view);

app.loader
    .add('spineCharacter', 'img/bezier/birdfly.json')
    .load(function (loader, resources) {
        const animation = new Spine(resources.spineCharacter.spineData);

        // add the animation to the scene and render...
        app.stage.addChild(animation);        
        app.start();
    });
*/




//A risultato, non si visualizza nulla,capire come eseguire l importazione del file .json in modo corretto.
//Cercare come viene chiamato ogni singolo frame nella cache di Pixi utilizzando il primo metodo della doc. 
// https://github.com/kittykatattack/learningPixi#textureatlas
//si è scelto di utilizzare il terzo metodo della documentazione inerente json file creando l alias id
//se utilizzo il naming FL_* non funziona
//se utilizzo il naming birdfly non funziona

//note: il file json è stato creato con software TexturePacker per l unione di singoli frame nel file .png
//      il file json è conforme {frames} / FL_*.PNG








//Prima Prova :Importazione json (non funziona) -- load sprite sheet image + data file, call setup() if completed

//let animatedFL, background, spritesheetname;
//spritesheetname = "birdfly.json";
//PIXI.loader
//    .add("birdfly.json")
//    .add(FLFrames)
//    .add(objects)
//    .load(setup);





//Seconda Prova : METODO IMPORTAZIONE JSON TRAMITE SPRITESHEETLOADER(non funziona)

//PIXI.Loader.shared.add("img/bezier/birdfly.json").load(setup);

//PIXI.SpritesheetLoader.Loader.add('myatlas', 'img/bezier/birdfly.json');

/*loader.load(() => {
  loader.resources.myatlas; // atlas JSON resource
  loader.resources.myatlas_image; // atlas Image resource
});*/

/*function setup() {
    let resources = PIXI.loader.resources;
    let resources = PIXI.Loader.shared.resources["img/bezier/birdfly.json"].spritesheet;

    // initialize background sprite
    background = new PIXI.Sprite(resources["img/bezier/birdfly.png"].texture);
    app.stage.addChild(background);

    // scale stage container that it fits into the view
    app.stage.scale.x = app.view.width / background.width;
    app.stage.scale.y = app.view.height / background.height;

    // create an animated sprite
    animatedFL = new PIXI.extras.AnimatedSprite.fromFrames(FLFrames);

    // configure + start animation:
    animatedFL.animationSpeed = 0.167;                  
    animatedFL.position.set(0, background.height - 350); 
    animatedFL.play();

    // add it to the stage and render!
    app.stage.addChild(animatedFL);
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    animatedFL.x = (animatedFL.x + 5*delta) % (background.width + 200);
}





/* // BEZIER CURVE da ESEMPI PER PERCORSO E SINTASSI da utilizzare con libreria PIXI GRAPHICS////


const realPath = new PIXI.Graphics();

realPath.lineStyle(2, 0xFFFFFF, 1);
realPath.moveTo(0, 0);
realPath.lineTo(100, 200);
realPath.lineTo(200, 200);
realPath.lineTo(240, 100);

realPath.position.x = 50;
realPath.position.y = 50;

app.stage.addChild(realPath);

const bezier = new PIXI.Graphics();

bezier.lineStyle(5, 0xAA0000, 1);
bezier.bezierCurveTo(100, 200, 200, 200, 240, 100);

bezier.position.x = 50;
bezier.position.y = 50;

app.stage.addChild(bezier);

// // BEZIER CURVE 2 ////
const realPath2 = new PIXI.Graphics();

realPath2.lineStyle(2, 0xFFFFFF, 1);
realPath2.moveTo(0, 0);
realPath2.lineTo(0, -100);
realPath2.lineTo(150, 150);
realPath2.lineTo(240, 100);

realPath2.position.x = 320;
realPath2.position.y = 150;

app.stage.addChild(realPath2);

const bezier2 = new PIXI.Graphics();

bezier2.lineTextureStyle(10, sprite.texture);
bezier2.bezierCurveTo(0, -100, 150, 150, 240, 100);

bezier2.position.x = 320;
bezier2.position.y = 150;

app.stage.addChild(bezier2);

// // ARC ////
const arc = new PIXI.Graphics();

arc.lineStyle(5, 0xAA00BB, 1);
arc.arc(600, 100, 50, Math.PI, 2 * Math.PI);

app.stage.addChild(arc);

// // ARC 2 ////
const arc2 = new PIXI.Graphics();

arc2.lineStyle(6, 0x3333DD, 1);
arc2.arc(650, 270, 60, 2 * Math.PI, 3 * Math.PI / 2);

app.stage.addChild(arc2);

// // ARC 3 ////
const arc3 = new PIXI.Graphics();

arc3.lineTextureStyle(20, sprite.texture);
arc3.arc(650, 420, 60, 2 * Math.PI, 2.5 * Math.PI / 2);

app.stage.addChild(arc3);

// / Hole ////
const rectAndHole = new PIXI.Graphics();

rectAndHole.beginFill(0x00FF00);
rectAndHole.drawRect(350, 350, 150, 150);
rectAndHole.beginHole();
rectAndHole.drawCircle(375, 375, 25);
rectAndHole.drawCircle(425, 425, 25);
rectAndHole.drawCircle(475, 475, 25);
rectAndHole.endHole();
rectAndHole.endFill();

app.stage.addChild(rectAndHole);

// // Line Texture Style ////
const beatifulRect = new PIXI.Graphics();

beatifulRect.lineTextureStyle(20, sprite.texture);
beatifulRect.beginFill(0xFF0000);
beatifulRect.drawRect(80, 350, 150, 150);
beatifulRect.endFill();

app.stage.addChild(beatifulRect);*/