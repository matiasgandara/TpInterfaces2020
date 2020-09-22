class CircleImg extends Circle{

    constructor(posX,posY,fill,radius,context){
        super(posX,posY,fill,radius,context);
    }

    draw(){
        super.draw();
        fill
    }
}



function ajustar(img){
    // levanto la escala
    let scale = Math.min(c.width / img.width, c.height / img.height);
    // get the top left position of the image
    let x = (c.width / 2) - (img.width / 2) * scale;
    let y = (c.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }