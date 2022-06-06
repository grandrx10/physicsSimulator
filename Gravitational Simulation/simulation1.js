class Simulation1Button extends Button{
    constructor(x, y, length, width, colour, text, stateShown){
        super(x, y, length, width, colour, text, stateShown);
    }

    checkPressed(x,y, game, entities, controller){
        if (super.contains(x, y)&& game.state == this.stateShown&& game.previousState == game.state){
            game.state = "inSimulation";
            game.beginTime = new Date();
            // SIMULATION #1
            entities.push(new Entity(400, 300, 10000, 100, 0, 1));
            entities.push(new Entity(400, 200, 100,10, orbitVelocity(10000, 100), 2));
            entities.push(new Entity(400, 0, 100, 10, orbitVelocity(10000, 300), 4));
            entities.push(new Entity(400, 550, 100, 10, orbitVelocity(10000, 250), 3));
            entities.push(new Entity(400, 800, 1000, 30, orbitVelocity(10000, 500), 5));
            entities.push(new Entity(400, 900, 20, 10, orbitVelocity(1000, 100) +orbitVelocity(10000, 600) , 6));
            controller.focusIndex = 0;
        }
    }
}