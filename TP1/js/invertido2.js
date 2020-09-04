let imagen1 = new Image();
imagen1.src = "image/vacaciones.jpg";

imagen1.onload = function() {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    let img = new Image();
    img.src = "image/vacaciones.jpg";
    ctx.drawImage(img, 0, 0);
    let alto = c.width;
    let ancho = c.height;
    let imgData = ctx.getImageData(0, 0,alto,ancho);
    // invert colors
    for (let i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i] = 255 - imgData.data[i];
      imgData.data[i+1] = 255 - imgData.data[i+1];
      imgData.data[i+2] = 255 - imgData.data[i+2];
      imgData.data[i+3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
  };