class Simulation2Button extends Button{
    constructor(x, y, length, width, colour, text, stateShown){
        super(x, y, length, width, colour, text, stateShown);
    }

    checkPressed(x,y, game, entities, controller){
        if (super.contains(x, y) && game.state == this.stateShown&& game.previousState == game.state){
            game.state = "inSimulation";
            // SIMULATION #2
            entities.push(new Entity(400, 300, 10000,200, 0, 1));
            entities.push(new Entity(400, 600, 100, 10, orbitVelocity(10000, 300), 2));
        }
    }
}