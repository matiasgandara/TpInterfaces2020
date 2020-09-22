function clearCanvas(ctx,color){
    ctx.fillStyle = color;
    ctx.fillRect(20, 20, canvasWidth, canvasHeight);
}

function randomRGBA(){
    let R = parseInt(Math.random() * 255);
    let G = parseInt(Math.random() * 255);
    let B = parseInt(Math.random() * 255);
    /* let A = parseInt(Math.random() * 255); */
    return "rgb("+R+","+G+","+B+")";
}

