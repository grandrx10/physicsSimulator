

var entities = [];
var controller = new Controller();
var buttons = [];
var game = {state: "inMenu",
            text: "",
            previousState: "inMenu",
            trailLength: 30,
            time: new Date(),
            beginTime: new Date(),
            simulationSpeed: 1};

function setup (){
    createCanvas(windowWidth, windowHeight)
    // for (var i = 1; i < 1000; i ++){
    //     entities.push(new Entity(100 + randint(0, 1000), 0 + randint(0, 900), 100, 0, i));
    // }
    // entities.push(new Entity(400, 250, 6, 50, 1.1549));
    // entities.push(new Entity(400, 100, 100, 0.05774, 3));

    buttons.push(new StartButton(windowWidth/2 - 100, windowHeight/2 - 65, 200, 40, 
    "white", "Select Simulation", "inMenu"));
    buttons.push(new TutorialButton(windowWidth/2 - 100, windowHeight/2 - 20, 200, 40, 
    "white", "Tutorial", "inMenu"));
    buttons.push(new BackToMainButton(windowWidth/2 - 100, 100, 200, 40, 
    "white", "Back", "inExplanation"));
    buttons.push(new BackToMainButton(10, 10, 100, 40, 
    "white", "Back", "inSimulation"));

    buttons.push(new Simulation1Button(windowWidth/2 - 100, windowHeight/2 - 100, 200, 40, 
    "white", "Simulation 1: Galaxy", "inSimulationSelect"));
    buttons.push(new Simulation2Button(windowWidth/2 - 100, windowHeight/2 - 55, 200, 40, 
    "white", "Simulation 2: Earth", "inSimulationSelect"));
    buttons.push(new Simulation3Button(windowWidth/2 - 100, windowHeight/2 - 10, 200, 40, 
    "white", "Simulation 3: Elliptical Orbit", "inSimulationSelect"));
    buttons.push(new Simulation4Button(windowWidth/2 - 100, windowHeight/2 + 35, 200, 40, 
    "white", "Simulation 4: Escape Velocity", "inSimulationSelect"));
    buttons.push(new BackToMainButton(10, 10, 100, 40, 
        "white", "Back", "inSimulationSelect"));

    // in simulation controls
    buttons.push(new changeVelButton(90, 400, 100, 40, 
        "white", "+ Velocity", "inSimulation", 1.1));
    buttons.push(new changeVelButton(200, 400, 100, 40, 
        "white", "- Velocity", "inSimulation", 0.9));
    buttons.push(new changeEntityButton(90, 450, 100, 40, 
        "white", "Next Entity", "inSimulation", 1));
    buttons.push(new changeEntityButton(200, 450, 100, 40, 
        "white", "Prev Entity", "inSimulation", -1));

    buttons.push(new changeSimSpeedButton(windowWidth - 320, 10, 110, 40, 
        "white", "+ Simulation Speed", "inSimulation", 1));
    buttons.push(new changeSimSpeedButton(windowWidth - 200, 10, 110, 40, 
        "white", "- Simulation Speed", "inSimulation", -1));
    buttons.push(new changeTrailLengthButton(windowWidth - 320, 60, 110, 40, 
        "white", "+ Trail Length", "inSimulation", 1));
    buttons.push(new changeTrailLengthButton(windowWidth - 200, 60, 110, 40, 
        "white", "- Trail Length", "inSimulation", -1));


    frameRate(60)
    background(0,5);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}

function draw (){
    background(0);
    scale(1); // controls how zoomed in the screen is

    //update time
    game.time = new Date();

    for (var i = 0; i < buttons.length; i ++){
        buttons[i].draw(game);
    }

    fill ("white");
    textAlign(CENTER, CENTER);
    text (game.text, windowWidth/2, windowHeight/2);

    if (game.state == "inSimulation"){
        fill("white");
        textAlign(CENTER, CENTER);
        text("Trail Length: " + game.trailLength, windowWidth - 200, 120);
        text("Simulation Speed: " + game.simulationSpeed, windowWidth - 200, 140);
        text("Time Elapsed: " + (game.time - game.beginTime)/1000,windowWidth - 200, 160)
        
        controller.focus(entities);
        controller.drawStats(entities);
        controller.moveCamera();

        for (var i = entities.length -1; i >= 0; i --){
            entities[i].draw(controller.xRange, controller.yRange);
        }

        for (var c = 0; c < game.simulationSpeed; c ++){
            for (var i = entities.length -1; i >= 0; i --){
                entities[i].gravity(entities);
                entities[i].update(entities, controller, game);
            }
        }
    }
}

function mousePressed(){
    for (var i = 0; i < buttons.length; i ++){
        buttons[i].checkPressed(mouseX, mouseY, game, entities, controller);
    }
    game.previousState = game.state;

    if (game.state == "inSimulation"){
        controller.selectNewFocus(entities, mouseX, mouseY);
    }
}

function keyPressed(){
    if (keyCode == 85) {
        controller.summonEntity(entities)
    } // u is pressed
    else if (keyCode == 73){ // I
        game.simulationSpeed++;
    } else if (keyCode == 79){ // O
        game.simulationSpeed--;
    } else if (keyCode == 75){ // K
        game.trailLength++;
    } else if (keyCode == 76){ // L
        game.trailLength--;
    } else if (keyCode == 78){ // N key Increase speed
        controller.increaseVelocity(entities, 1.1);
    } else if (keyCode == 77){ // M key
        controller.increaseVelocity(entities, 0.9);
    }
}

function randint(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function orbitVelocity(mass, distance){
    var G = 6.67*Math.pow(10, -3)
    return Math.sqrt(G*mass/distance)
}