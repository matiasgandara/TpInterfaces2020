
enBlanco();
let btnEnBlanco = document.querySelector("#btnEnBlanco");
btnEnBlanco.addEventListener("click",enBlanco);
let imagen = new Image();
let file =document.querySelector("#myImage");
file.addEventListener("change",imagenCargada);
//tomo la direccion local de la imagen
function imagenCargada(e){
  let fileImg = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(fileImg);
  reader.onload= function(e){
    imagen.src = e.target.result;
    imagen.onload = function() {
        let c = document.querySelector("#myCanvas");
        let ctx = c.getContext("2d");
        let imgOriginal= this;
        //obtenida la imagen se ajusta al canvas
        ajustar(this);
        let alto = c.width;
        let ancho = c.height;
        let imgData = ctx.getImageData(0, 0,alto,ancho);
        let filtro = false;
        // aplicacion de filtros
   
       //#region Btn Filtros simples
        let btnInvertir = document.querySelector("#btnInvertir");
        btnInvertir.addEventListener("click",invertir);
        let btnGrises = document.querySelector("#btnGrises");
        btnGrises.addEventListener("click",escalaGrises);
        let btnNegativo = document.querySelector("#btnNegativo");
        btnNegativo.addEventListener("click",filtroNegativo);
        let btnBinario = document.querySelector("#btnBinario");
        btnBinario.addEventListener("click",filtroBinario);
        let btnOriginal = document.querySelector("#btnOriginal");
        btnOriginal.addEventListener("click",original);
  //#endregion
       
  
//#region Btn Filtro Avanzado 
        let btnLineas = document.querySelector("#btnLineas");
        btnLineas.addEventListener("click",detectarBordes);
        let btnSuavizado = document.querySelector("#btnSuavizar");
        btnSuavizado.addEventListener("click",suavizar);
//#endregion
        
//#region  Implementacion Filtros Simples
        function original(){
          ajustar(imgOriginal);
          imgData = ctx.getImageData(0, 0,alto,ancho);
        }

        function ajustar(img){
          // levanto la escala
          let scale = Math.min(c.width / img.width, c.height / img.height);
          // get the top left position of the image
          let x = (c.width / 2) - (img.width / 2) * scale;
          let y = (c.height / 2) - (img.height / 2) * scale;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
        

        function invertir(){//Invierte los colores de la imagen cargada
          if (filtro) {original(); filtro = false;}
          else{
            for (let i = 0; i < imgData.data.length; i += 4) {
              imgData.data[i] = 255 - imgData.data[i];
              imgData.data[i+1] = 255 - imgData.data[i+1];
              imgData.data[i+2] = 255 - imgData.data[i+2];
              //imgData.data[i+3] = 255;
            }
            filtro = true;
            ctx.putImageData(imgData, 0, 0);
          }
        }

        function escalaGrises(){//Genera imagen en escala de grices
          if (filtro) {filtro = false; original();}
          else{ 
            for (let i = 0; i < imgData.data.length; i += 4) {
              let promedio = promGradiente(imgData,i);
              imgData.data[i] = promedio;
              imgData.data[i+1] = promedio;
              imgData.data[i+2] = promedio;
             // imgData.data[i+3] = 255;
            }
            filtro = true;
            ctx.putImageData(imgData, 0, 0);
          }
        }


        function promGradientePorc(imgData,i){
          let grayR = imgData.data[i] * 0.3;
			    let grayG = imgData.data[i+1] * 0.59;
			    let grayB = imgData.data[i+2] * 0.11;
          let gray = grayR + grayG + grayB;
          return gray;
        }
        
        function escGrises(){//Genera imagen en escala de grices
           let grises = imgData;
            for (let i = 0; i < grises.data.length; i += 4) {
              let promedio = promGradientePorc(grises,i);
              grises.data[i] = promedio;
              grises.data[i+1] = promedio;
              grises.data[i+2] = promedio;
              grises.data[i+3] = promedio;
            }
            return grises;
          }
        

        function filtroBinario(){//Resalta solo blanco y negro extremo
          if (filtro) {original(); filtro = false;}
          else{
            for (let i = 0; i < imgData.data.length; i += 4) {
              let promedio = mayorGradiente(imgData,i);
              imgData.data[i] = promedio;
              imgData.data[i+1] = promedio;
              imgData.data[i+2] = promedio;
              imgData.data[i+3] = 255;
            }
            filtro = true;
            ctx.putImageData(imgData, 0, 0);
          }
        }
        

        function filtroNegativo(){//Escala de grises opuesta
          if (filtro) {original(); filtro = false;}
          else {
            for (let i = 0; i < imgData.data.length; i += 4) {
            let mayor = 255 - promGradiente(imgData,i);
            imgData.data[i] = mayor;
            imgData.data[i+1] = mayor;
            imgData.data[i+2] = mayor;
            imgData.data[i+3] = 255;
          }
          filtro = true;
          ctx.putImageData(imgData, 0, 0);}
        }

//#endregion


        function mayorGradiente(imgd,i){// calcula el gradiente mayor peso
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

        descargar_img = function(el) {
          // levanta la imagen del canvas y la descarga
          let imageURI = c.toDataURL("image/jpg");
          el.href = imageURI;
        }

        function getVecinos(imgOrigen,x,y){
          let dataCopy = {
            "r" : 0,
            "g" : 0,
            "b" : 0,
            "a" : 0,
          };
          let vecino = [];
          let pixx = x-1;
          let pixy = y-1;
          let pos = 0;
          for (let i = 0; i <= 2; i++){
            vecino[i]=[];
            for(let j = 0; j <= 2; j++){
              if((pixx >= 0) && (pixy>=0) && (pixy < imgOrigen.height) && (pixx < imgOrigen.width)){
                  pos = (pixx + pixy*imgOrigen.width)*4;
                  dataCopy.r= imgOrigen.data[pos];
                  dataCopy.g= imgOrigen.data[pos+1];
                  dataCopy.b= imgOrigen.data[pos+2];
                  dataCopy.a= imgOrigen.data[pos+3];
                }
                else{
                  dataCopy.r= 0;
                  dataCopy.g= 0;
                  dataCopy.b= 0;
                  dataCopy.a= 0;
                 }
                 vecino[i][j]= dataCopy;
                 pixx++;
            }
            pixy++;
          }
          return vecino;
        }

        function detectarBordes(){
          let imgparcial = escGrises();
          let param = 100;// ver;
          let kernelY=[[-1,-2,-1],[0,0,0],[1,2,1]];
          let kernelX=[[-1,0,1],[-2,0,2],[-1,0,1]];
          let result = ctx.getImageData(0,0,c.width,c.height);
          for (let y=0; y < imgparcial.height; y++){
              for (let x = 0; x < imgparcial.width; x++){
                  let index=(x+y*c.width)*4;
                  let gx=0; 
                  let gy=0;
                  let vecinos = getVecinos(imgparcial,x,y);  
                  for (let i = 0; i < 3; i++) {
                      for (let j = 0; j < 3; j++) {
                          let quepasa = imgparcial.data[index]; 
                          gx += vecinos[i][j].r * kernelX[i][j];
                          gy += vecinos[i][j].r * kernelY[i][j];
                      }
                  }
                  let color = Math.sqrt(gx*gx+gy*gy);
                  //console.log(color);
                  if (color > param){
                      color=255;
                  }
                  else {color= 0;}
                  result.data[index+0]=color;
                  result.data[index+1]=color;
                  result.data[index+2]=color;
              }
            }
            ctx.putImageData(result,0,0);
        }


       
        function detectarBordesDoble() {
          let reducedImage = escGrises();
          let width = reducedImage.width;
          let height = reducedImage.height;
          let pixels = imgData.data;
          let value = 0;
          let kernelX = [[-1,0,1],[-2,0,2],[-1,0,1]];
          let kernelY=[[-1,-2,-1],[0,0,0],[1,2,1]];
          let getReducedValue = function(x, y) {
              let index=(x + y * width)*4;
              return (x < 0 || width <= x || y < 0 || height <= y) ? 0: reducedImage.data[index];
          }
          let calcValue = function(x, y) {
              let result = 0;
              let gx = 0;let gy=0;
              for (let i = -1; i <= 1; i++) {
                  for (let j = -1; j <= 1; j++) {
                      gx += kernelX[i + 1][j + 1] * getReducedValue(x + i, y + j);
                      gy += kernelY[i + 1][j + 1] * getReducedValue(x + i, y + j);
                  }
              }
              result = Math.sqrt(gx*gx+gy*gy);
              return result;
          }
  
          for (let i = 0; i < pixels.length; i+=4) {
              x = Math.floor((i / 4 / width));
              y = Math.floor((i / 4) % width);
              value = Math.min(calcValue(x, y), 255);
             /*  let color = 0;
              if (value > 254){
                color = 255;
              }
              else{
                value = 0;
              }  */
              pixels[i] = value;
              pixels[i+1] = value;
              pixels[i+2] = value;  

          }
          ctx.putImageData(imgData, 0, 0);
        }
    };
  }
}


 
function enBlanco(){// pone el lienzo en blanco.
  let canvas = document.getElementById('myCanvas');
  let ctx = canvas.getContext("2d"); 
  let alto = canvas.width;
  let ancho = canvas.height;
  ctx.beginPath();
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, alto, ancho);
  ctx.fill();
  ctx.closePath();
 }
