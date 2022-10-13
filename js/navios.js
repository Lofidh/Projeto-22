class Navio {
    constructor(positionX, positionY, largura, altura, positionBarco) {
        this.body = Bodies.rectangle(positionX, positionY, largura, altura)
        this.largura = largura
        this.altura = altura
        this.positionBarco = positionBarco
        //this.barcoImage = loadImage("assets/boat.png")
        this.animation = barcoAnimatioMatriz
        this.quebrado = false
        this.speed = 0.02
        World.add(world, this.body)
    }
    exibir() {
        var angle = this.body.angle
        var posicao = this.body.position
        var index = floor(this.speed%this.animation.length)
        push()
        translate(posicao.x, posicao.y)
        rotate(angle)
        imageMode(CENTER)
        image(this.animation[index], 0, this.positionBarco, this.largura, this.altura)
        pop()
    }
    remove(index) {
        this.animation = brokenBoatAnimation
        this.speed = 0.01
        this.largura = 300
        this.altura = 300
        this.quebrado = true
        setTimeout(() => {
            Matter.World.remove(world, barcosMatriz[index].body)
            delete barcosMatriz[index]
        }, 2000);
    }
    animate(){
        this.speed +=0.02
    }
}