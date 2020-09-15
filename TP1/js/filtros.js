
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
  console.log(fileImg);
  reader.onload= function(e){
    imagen.src = e.target.result;
    
    
    imagen.onload = function() {
        let c = document.querySelector("#myCanvas");
        let ctx = c.getContext("2d");
        imgOriginal= this;
        //obtenida la imagen se ajusta al canvas
        ajustar(this);
        let alto = c.width;
        let ancho = c.height;
        let imgData = ctx.getImageData(0, 0,alto,ancho);
        let filtro = false;
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
        btnOriginal.addEventListener("click",original);

        let btnLineas = document.querySelector("#btnLineas");
        btnLineas.addEventListener("click",detectarBordes);

        function original(){
          ajustar(imgOriginal);
          imgData = ctx.getImageData(0, 0,alto,ancho);
        }

        function ajustar(img){
          // get the scale
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

        
        function escGrises(){//Genera imagen en escala de grices
            for (let i = 0; i < imgData.data.length; i += 4) {
              let promedio = promGradiente(imgData,i);
              imgData.data[i] = promedio;
              imgData.data[i+1] = promedio;
              imgData.data[i+2] = promedio;
             // imgData.data[i+3] = 255;
            }
            return imgData;
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

        function getVecinos(imgData,x,y){
          let vecino = [];
       
          let fila = x-4-imgData.height;
          let col = y-1;
          for (let i = 0; i <= 2; i++){
            vecino[i]=[];
            for(let j = 0; j <= 2; j++){
              if((fila >= 0) && (col>=0) && (fila < imgData.height) && (col < imgData.width)){
                  vecino[i][j]= imgData[fila-imgData.height];
                  fila+4;
                }
                else{ vecino[i][j]=255;
                 }
                 fila+=4;
            }
            col++;
          }
          return vecino;
        }

        function detectarBordes(){
          let imgparcial = escGrises();
          //let param=document.querySelector("#parametro").value*1000;
          let param = 100;
          let kernelX=[[-1,-2,-1],[0,0,0],[1,2,1]];
          let kernelY=[[-1,0,1],[-2,0,2],[-1,0,1]];
          let result=imgparcial;
          for (y=0;y<imgparcial.height;y++){
              for (x=0;x<imgparcial.width;x++){
                  let index=(x+y*c.width)*4;
                  let gx=0; let gy=0;
                  let vecinos=getVecinos(imgparcial,x,y);
                  for (let i = 0; i <=2; i++) {
                      for (let j = 0; j <=2; j++) {
                        gx+=vecinos[i][j] * kernelX[i][j];
                        gy+=vecinos[i][j] * kernelY[i][j];

                     /*      gx+=vecinos[i][j].data[0]*kernelX[i][j];
                          gy+=vecinos[i][j].data[0]*kernelY[i][j]; */
                      }
                  }
                  let color=Math.sqrt(gx*gx+gy*gy);
                  if (color>param)
                      color=255;
                  else color=0;
                  result.data[index+0]=color;
                  result.data[index+1]=color;
                  result.data[index+2]=color;
              }
          }
          ctx.putImageData(result,0,0);
        }

        function* convolveRgb2(context, Kx, Ky, input = context.getImageData(0, 0, width, height)) {
          const output = context.createImageData(width, height);
          yield context.canvas;
          for (let y = 1, i = (width + 1) * 4; y < height - 1; ++y, i += 8) {
            for (let x = 1; x < width - 1; ++x, i += 4) {
              let rx = 0, ry = 0;
              let gx = 0, gy = 0;
              let bx = 0, by = 0;
              for (let yk = y - 1, j = 0; yk <= y + 1; ++yk) {
                for (let xk = x - 1; xk <= x + 1; ++xk, ++j) {
                  let i = (yk * width + xk) << 2;
                  rx += input.data[i + 0] * Kx[j];
                  ry += input.data[i + 0] * Ky[j];
                  gx += input.data[i + 1] * Kx[j];
                  gy += input.data[i + 1] * Ky[j];
                  bx += input.data[i + 2] * Kx[j];
                  by += input.data[i + 2] * Ky[j];
                }
              }
              output.data[i + 0] = Math.hypot(rx, ry);
              output.data[i + 1] = Math.hypot(gx, gy);
              output.data[i + 2] = Math.hypot(bx, by);
              output.data[i + 3] = 255;
            }
            context.putImageData(output, 0, 0, 0, y, width, 1);
            yield context.canvas;
          }
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