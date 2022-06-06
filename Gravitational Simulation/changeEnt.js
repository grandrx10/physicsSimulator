class changeEntityButton extends Button{
    constructor(x, y, length, width, colour, text, stateShown, changeAmount){
        super(x, y, length, width, colour, text, stateShown);
        this.changeAmount = changeAmount;
    }

    checkPressed(x,y, game, entities, controller){
        if (super.contains(x, y)&& game.state == this.stateShown&& game.previousState == game.state){
            if (controller.focusIndex + this.changeAmount >= 0 &&
                controller.focusIndex + this.changeAmount < entities.length){
                controller.focusIndex += this.changeAmount
            }
        }
    }
}