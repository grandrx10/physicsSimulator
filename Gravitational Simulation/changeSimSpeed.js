class changeSimSpeedButton extends Button{
    constructor(x, y, length, width, colour, text, stateShown, changeAmount){
        super(x, y, length, width, colour, text, stateShown);
        this.changeAmount = changeAmount;
    }

    checkPressed(x,y, game, entities, controller){
        if (super.contains(x, y)&& game.state == this.stateShown&& game.previousState == game.state){
            if (game.simulationSpeed+ this.changeAmount >= 0){
                game.simulationSpeed += this.changeAmount;
            }
        }
    }
}