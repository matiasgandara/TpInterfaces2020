class FichaRect extends Rect {
    constructor(posX,posY,fill,context,height,width,dir){
        super(posX,posY,fill,context,height,width);
        this.img = new Image();
        this.img.src = dir;
    }

    draw(){
        let cargarImg = function() {
            this.context.drawImage(this.img,this.posX,this.posY,
            this.width,this.height);
        };
        this.img.onload = cargarImg.bind(this);
        }
    }