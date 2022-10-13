class CannonBall {
    constructor(x, y) {
        var option = {
            isStatic: true
        }
        this.raio = 30
        this.body = Bodies.circle(x, y, this.raio, option)
        this.imageBall = loadImage("assets/cannonball.png")
        this.animation = [this.imageBall]
        this.afundando = false
        World.add(world, this.body)
    }
    tiro() {
        Matter.Body.setStatic(this.body, false);

        var newAngle = cannon.angle - 28;
        newAngle = newAngle * (3.14 / 180);

        var velocidade = p5.Vector.fromAngle(newAngle);
        velocidade.mult(0.5);

        Matter.Body.setVelocity(this.body, {
            x: velocidade.x * (180 / 3.14),
            y: velocidade.y * (180 / 3.14),
        });
    }
    animate(){
        this.speed +=0.02
    }
    exibir() {
        var index = floor(this.speed%this.animation.length)
        var angle = this.body.angle
        push()
        translate(this.body.position.x, this.body.position.y)
        rotate (angle)
        imageMode(CENTER)
        image(this.animation[index], 0,0, this.raio, this.raio)
        pop()
    }
    remove(index) {
        this.afundando = true 
        Matter.Body.setVelocity(this.body,{x:0,y:0})
        this.animation = waterSplashAnimation
        this.speed = 0.04
        this.raio = 150
        setTimeout(() => {
            Matter.World.remove(world, this.body)
            delete cannonBallMatriz[index]
        }, 2000);
    }
}