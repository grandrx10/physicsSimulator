class Entity {
    constructor(x,y,mass, xVect, id){
        // CONSTANTS
        this.G = 6.67*Math.pow(10, -3)

        this.id = id
        this.position = createVector(x,y)
        this.mass = mass;
        this.r = Math.pow(mass, 1/2);
        this.velocity = createVector(xVect, 0)//p5.Vector.random2D()
        this.acceleration = createVector(0,0);
    }

    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration = createVector();
    }

    gravity(entities){
        for (var i = 0; i < entities.length; i ++){
            if (this != entities[i] && entities[i].mass > 10){
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
        //     distanceSqr = constrain(distanceSqr, 25, 100000);
        // } // keeps this within these bounds
        var attractStrength = this.G*attractorEntity.mass*this.mass/distanceSqr;
        forceDir.setMag(attractStrength/this.mass)
        this.acceleration.add(forceDir);
    }
    
    draw(){
        fill("white");
        circle(this.position.x, this.position.y, this.r);
        fill("black")
        textAlign(CENTER)
        text(this.id, this.position.x, this.position.y+5)
    }

    distance(x1, y1, x2, y2){
        return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
    }
}