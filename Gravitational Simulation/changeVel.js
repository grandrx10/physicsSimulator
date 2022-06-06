class changeVelButton extends Button{
    constructor(x, y, length, width, colour, text, stateShown, changeAmount){
        super(x, y, length, width, colour, text, stateShown);
        this.changeAmount = changeAmount;
    }

    checkPressed(x,y, game, entities, controller){
        if (super.contains(x, y)&& game.state == this.stateShown&& game.previousState == game.state){
            if (controller.focusIndex != -1){
                entities[controller.focusIndex].velocity.mult(this.changeAmount);
            }
        }
    }
}