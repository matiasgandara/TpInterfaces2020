class Triangulo extends Figure {
    constructor(posX,posY,fill,context,height,width){
    super(posX,posY,fill,context);
    this.height = height;
    this.width = width;
    }

    draw(){
        super.draw();
        this.context.beginPath();

        this.context.moveTo(this.posX,this.posY);
        this.context.lineTo(this.height,this.posX);
        this.context.lineTo(this.width,this.posY);
        this.context.fill()
        this.context.closePath();
    }
    
    getHeight(){
        return this.height;
    }

    getWhidth(){
        return this.width;
    }

    setWhidth(newWhidth){
        this.width = newWhidth;
    }

    setWhidth(newHeight){
        this.height = newHeight;
    }
}