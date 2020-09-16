class Rect extends Figure {
    constructor(posX,posY,fill,context,height,width){
        super(posX,posY,fill,context);
        this.height = height;
        this.width = width;
    }

    draw(){
        super.draw();
        this.context.beginPath();
        this.context.fillRect(this.posX, this.posY, this.height, this.width);
        this.context.fill();
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