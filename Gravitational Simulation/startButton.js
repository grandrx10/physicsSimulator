class StartButton extends Button{
    constructor(x, y, length, width, colour, text, stateShown){
        super(x, y, length, width, colour, text, stateShown);
    }

    checkPressed(x,y, game, entities, controller){
        if (super.contains(x, y) && game.state == this.stateShown&& game.previousState == game.state){
            game.state = "inSimulationSelect";
        }
    }
}