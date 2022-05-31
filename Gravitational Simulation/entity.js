

class Entity {
    constructor(x,y,mass, radius, xVect, id){
        // CONSTANTS
        this.G = 6.67*Math.pow(10, -3)

        this.id = id
        this.position = createVector(x,y)
        this.mass = mass;
        this.r = radius;
        this.velocity = createVector(xVect, 0)//p5.Vector.random2D()
        this.acceleration = createVector(0,0);
        this.trail = []
        this.time = new Date();
    }

    update(entities, camera, game){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        if (game.time - this.time > 500){
            this.time = new Date();
            if (this.trail.length < game.trailLength){
                this.trail.push({x: this.position.x, y: this.position.y});
            } else {
                this.trail.push({x: this.position.x, y: this.position.y});
                this.trail.splice(0, 1);
            }
        }

        var removeIndex = -1;
        for(var i = 0; i < entities.length; i ++){
            if (this.distance(this.position.x, this.position.y, entities[i].position.x, entities[i].position.y) <
            this.r/2 + entities[i].r/2 && this!= entities[i]){

                // this.velocity.add(this.acceleration.copy().mult(-3));
                // this.acceleration.setMag;
                // this.position.add(this.velocity.copy().mult(-1));
                if (this.mass > entities[i].mass){
                    this.mass += entities[i].mass;
                    //this.r = Math.pow(this.mass, 1/2);
                    removeIndex = i;
                } else {
                    entities[i].mass += this.mass
                    //entities[i].r = Math.pow(entities[i].mass, 1/2);
                    removeIndex = entities.indexOf(this);
                }
            }
        }

        if (removeIndex != -1){
            if (camera.focusIndex == removeIndex){
                camera.focusIndex = -1;
            }
            entities.splice(removeIndex, 1)
        }

    }

    gravity(entities){
        this.acceleration = createVector();
        for (var i = 0; i < entities.length; i ++){
            if (this != entities[i] && entities[i].mass >= 10){
                this.attracted(entities[i])
            }
        }
    }

    attracted(attractorEntity){
        // direction points from this object to the object that it is attracted to
        var attractor = attractorEntity.position
        var forceDir = p5.Vector.sub(attractor, this.position);
        var distanceSqr = forceDir.magSq();
        // if (this.mass < 1000){
        //     distanceSqr = constrain(distanceSqr, this.radius, 10000000);
        // } // keeps this within these bounds
        var attractStrength = this.G*attractorEntity.mass*this.mass/distanceSqr;
        forceDir.setMag(attractStrength/this.mass)
        this.acceleration.add(forceDir);
    }
    
    draw(xRange, yRange){
        for (var i = 0; i < this.trail.length; i ++){
            // draw trail here
            fill("rgb(115, 115, 115)");
            circle(this.trail[i].x - xRange, this.trail[i].y - yRange, this.r);
        }

        fill("white");
        circle(this.position.x - xRange, this.position.y - yRange, this.r);

        stroke("blue");
        strokeWeight(3);
        var velVect = this.velocity.copy().mult(20);
        line(this.position.x-xRange, this.position.y-yRange, 
            this.position.x+velVect.x-xRange, this.position.y + velVect.y-yRange)
        stroke("red");
        var accVect = this.acceleration.copy().mult(5000);
        line(this.position.x-xRange, this.position.y-yRange, 
            this.position.x+accVect.x-xRange, this.position.y + accVect.y-yRange)
        strokeWeight(0);
        stroke("white");

        fill("black")
        textAlign(CENTER, CENTER)
        text(this.id, this.position.x- xRange, this.position.y - yRange)
    }

    contains(x, y){
        if (this.distance(this.position.x, this.position.y, x, y) < this.r){
            return true;
        }
        return false;
    }

    distance(x1, y1, x2, y2){
        return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
    }
}