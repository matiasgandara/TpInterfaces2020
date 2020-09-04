let imagen1 = new Image();
imagen1.src = "image/vacaciones.jpg";
imagen1.onload = function() {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    let img = new Image();
    img.src = "image/vacaciones.jpg";
    ctx.drawImage(img, 0, 0);
    let alto = img.width;
    let ancho = img.height;
    let imgDataOriginal = ctx.getImageData(0, 0,alto,ancho);
    let imgData = imgDataOriginal;
    // aplicacion de filtros
    let btnInvertir = document.querySelector("#btnInvertir");
    btnInvertir.addEventListener("click",invertir);
    let btnGrises = document.querySelector("#btnGrises");
    btnGrises.addEventListener("click",escalaGrises);
    let btnNegativo = document.querySelector("#btnNegativo");
    btnNegativo.addEventListener("click",filtroNegativo);
    let btnBinario = document.querySelector("#btnBinario");
    btnBinario.addEventListener("click",filtroBinario);
    let btnOriginal = document.querySelector("#btnOriginal");
    btnOriginal.addEventListener("click",function(){
      ctx.drawImage(img, 0, 0);
    });

    function invertir(){//Invierte los colores de la imagen cargada
      for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255 - imgData.data[i];
        imgData.data[i+1] = 255 - imgData.data[i+1];
        imgData.data[i+2] = 255 - imgData.data[i+2];
        imgData.data[i+3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);
    }

    function escalaGrises(){//Genera imagen en escala de grices
      for (let i = 0; i < imgData.data.length; i += 4) {
        let promedio = promGradiente(imgData,i);
        imgData.data[i] = promedio;
        imgData.data[i+1] = promedio;
        imgData.data[i+2] = promedio;
        imgData.data[i+3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);
    }

    function filtroBinario(){
      for (let i = 0; i < imgData.data.length; i += 4) {
        let promedio = mayorGradiente(imgData,i);
        imgData.data[i] = promedio;
        imgData.data[i+1] = promedio;
        imgData.data[i+2] = promedio;
        imgData.data[i+3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);
    }
    

    function filtroNegativo(){//Escala de grises opuesta
      for (let i = 0; i < imgData.data.length; i += 4) {
        let mayor = 255 - promGradiente(imgData,i);
        imgData.data[i] = mayor;
        imgData.data[i+1] = mayor;
        imgData.data[i+2] = mayor;
        imgData.data[i+3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);
    }


    function mayorGradiente(imgd,i){// calcula el gradiente promedio
      let prom = promGradiente(imgd,i);
      if (prom < (255/2)){
        return 0;
      }
      return 255;
    }

    function promGradiente(imgd,i){// calcula el gradiente promedio
      let suma = 0;
      for(let x = i; x < i+3; x++){
        suma += imgd.data[x];
      }
      return suma/3;
    }
  };