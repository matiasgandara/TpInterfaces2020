
class Figure{
    constructor(posX,posY,fill,context){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.seleccionado = false;
        this.seleccionadoStyle = "rgb(0,0,0)";
    }

    setFill(fill){
        this.fill = fill;
    }

    setSeleccionado(selec){
        this.seleccionado = selec;
    }

    getPosition(){
        return {
            x : this.getPosX(),
            y : this.getPosY(),
        };
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    getFill(){
        return this.fill;
    }

    draw(){
        this.context.fillStyle = this.fill;
    }

    isPointInside(x,y){}
}