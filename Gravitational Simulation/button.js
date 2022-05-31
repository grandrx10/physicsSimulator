class Button{
    constructor(x, y, length, width, colour, text, stateShown){
        this.x = x;
        this.y = y;
        this.length = length;
        this.width = width;
        this.colour = colour;
        this.text = text;
        this.stateShown = stateShown
    }

    draw(game){
        if (game.state == this.stateShown){
            fill(this.colour);
            rect(this.x, this.y, this.length, this.width);
            textAlign(CENTER, CENTER);
            fill("black")
            text(this.text, this.x + this.length/2, this.y + this.width/2);
        }
    }

    checkPressed(x, y, game, entities, controller){

    }

    contains(x, y){
        if (x > this.x && x < this.x + this.length && y > this.y && y < this.y +this.width){
            return true;
        }
        return false;
    }
}