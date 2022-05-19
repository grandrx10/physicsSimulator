var entities = [];

function setup (){
    createCanvas(windowWidth, windowHeight)
    // for (var i = 1; i < 10; i ++){
    //     entities.push(new Entity(400, 250 - randint(0, 200), 100, orbitVelocity(10000, 100), i));
    // }
    // entities.push(new Entity(400, 250, 6, 50, 1.1549));
    // entities.push(new Entity(400, 100, 100, 0.05774, 3));
    entities.push(new Entity(400, 300, 10000, 0, 1));
    entities.push(new Entity(400, 200, 100, orbitVelocity(10000, 100), 2));
    entities.push(new Entity(400, 0, 100, orbitVelocity(10000, 300), 2));
    frameRate(60)
    background(0,5);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}



function draw (){

    for (var i = 0; i < entities.length; i ++){
        entities[i].draw();
        entities[i].gravity(entities);
        entities[i].update();
    }
}

function randint(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function orbitVelocity(mass, distance){
    var G = 6.67*Math.pow(10, -3)
    return Math.sqrt(G*mass/distance)
}