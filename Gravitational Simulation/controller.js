class Controller {
    constructor(){
        this.xRange = 0;
        this.yRange = 0;
        this.focusIndex = -1;
        this.id = 0;
    }

    focus(entities){
        if (this.focusIndex != -1){
            this.xRange = entities[this.focusIndex].position.x - windowWidth/2;
            this.yRange = entities[this.focusIndex].position.y - windowHeight/2;
        }
    }

    drawStats(entities){
        if (this.focusIndex != -1){
            textSize(12);
            textAlign(LEFT);
            fill("white");
            text("Entity Number: " + entities[this.focusIndex].id, 100, 80);
            text("Speed: " + entities[this.focusIndex].velocity.mag(), 100, 100);
            text("Acceleration: " + entities[this.focusIndex].acceleration.mag(), 100, 120);
            text("Mass: " + entities[this.focusIndex].mass, 100, 140);
            text("Radius: " + entities[this.focusIndex].r, 100, 160);
            text("Kinetic Energy: " + (entities[this.focusIndex].mass*
                Math.pow(entities[this.focusIndex].velocity.mag(),2)/2), 100, 180)
            text("Location: (X) " + Math.round(entities[this.focusIndex].position.x) + ", (Y) "
             + Math.round(entities[this.focusIndex].position.y), 100, 200)
            text("Distance from center mass: " + this.distance(entities[this.focusIndex].position.x, 
                entities[this.focusIndex].position.y, entities[0].position.x, entities[0].position.y), 100, 220)
        }
    }

    selectNewFocus(entities, mouseX, mouseY){
        var aimX = mouseX + this.xRange;
        var aimY = mouseY + this.yRange;
        for (var i = 0; i < entities.length; i ++){
            if (entities[i].contains(aimX, aimY)){
                this.focusIndex = i;
            }
        }
    }

    increaseVelocity(entities, amount){
        if (this.focusIndex != -1){
            entities[this.focusIndex].velocity.mult(amount);
        }
    }

    moveCamera(){
        if (keyIsDown(65)){
            this.focusIndex = -1;
            this.xRange -= 2;
        } else if (keyIsDown(68)) {
            this.focusIndex = -1;
            this.xRange += 2;
        }
        if (keyIsDown(87)) {
            this.focusIndex = -1;
            this.yRange -= 2;
        } else if (keyIsDown(83)) {
            this.focusIndex = -1;
            this.yRange += 2;
        }
    }

    summonEntity(entities){
        entities.push(new Entity(this.xRange + windowWidth/2, 
        this.yRange + windowHeight/2, randint(50, 300), randint(-1, 1), "S" + this.id));
        this.id ++;
    }

    distance(x1, y1, x2, y2){
        return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
    }
}