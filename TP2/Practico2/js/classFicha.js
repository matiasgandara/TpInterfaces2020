class Ficha extends Circle{
    constructor(posX,posY,img,radius,context){
        super(posX,posY,img,radius,context);
    }

    draw(){
        let imagenFig = new imagen();
        imagenFig = this.img
        imagenFig
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0 , 2*Math.PI);
        this.context.fill();
        
        this.context.closePath();
    }

}