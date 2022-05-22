var entities = [];
var controller = new Controller();

function setup (){
    createCanvas(windowWidth, windowHeight)
    // for (var i = 1; i < 10; i ++){
    //     entities.push(new Entity(400, 250 - randint(0, 200), 100, orbitVelocity(10000, 100), i));
    // }
    // entities.push(new Entity(400, 250, 6, 50, 1.1549));
    // entities.push(new Entity(400, 100, 100, 0.05774, 3));
    entities.push(new Entity(400, 300, 10000, 0, 1));
    entities.push(new Entity(400, 200, 100, orbitVelocity(10000, 100), 2));
    entities.push(new Entity(400, 0, 100, orbitVelocity(10000, 300), 3));
    entities.push(new Entity(400, 550, 100, orbitVelocity(10000, 250), 4));
    entities.push(new Entity(400, 800, 1000, orbitVelocity(10000, 500), 5));
    entities.push(new Entity(400, 900, 20, orbitVelocity(1000, 100) +orbitVelocity(10000, 500) , 6));
    frameRate(60)
    background(0,5);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}

function draw (){
    background(0);
    scale(1); // controls how zoomed in the screen is
    
    controller.focus(entities);
    controller.drawStats(entities);
    controller.moveCamera();

    for (var i = 0; i < entities.length; i ++){
        entities[i].draw(controller.xRange, controller.yRange);
        entities[i].gravity(entities);
        entities[i].update();
    }
}

function mousePressed(){
    controller.selectNewFocus(entities, mouseX, mouseY);
}

function keyPressed(){
    if (keyCode == 85) {
        controller.summonEntity(entities)
    } // u is pressed
}

function randint(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function orbitVelocity(mass, distance){
    var G = 6.67*Math.pow(10, -3)
    return Math.sqrt(G*mass/distance)
}