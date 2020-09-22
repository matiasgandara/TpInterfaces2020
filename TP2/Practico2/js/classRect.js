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
        if(this.seleccionado === true){
            this.context.strokeStyle = this.seleccionadoStyle;
            this.context.lineWidth = 5;
            this.context.stroke();
        }
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

    isPiontInside(x,y){
        return  ((x < this.posX) || (x > this.posX + this.width) || (y < this.posY) || (y > this.posY +this.height));
    }
}