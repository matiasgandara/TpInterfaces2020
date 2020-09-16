	herramienta = "lapiz";
	pintar = Boolean(false);
	let canvasColor = document.getElementById("myColor");
	let ctxColor = canvasColor.getContext("2d");
	let altoC = canvasColor.width;
	let anchoC = canvasColor.height;
	let color_prim = selecColor();
	let color_sec = "#FFFFFF";
	actualizaColor();
	let trazo = document.getElementById("trazo");
	let btnR = document.getElementById("rangoRojo");
	let btnG = document.getElementById("rangoVerde");
	let btnB = document.getElementById("rangoAzul");
	btnR.addEventListener("click",actualizaColor);
	btnG.addEventListener("click",actualizaColor);
	btnB.addEventListener("click",actualizaColor);

	window.onload = function(){
		'use strict'
		//paleta de color
		
		//movientos dentro del canvas 
		let c = document.getElementById("myCanvas");
		let ctx = c.getContext("2d");
		c.onmousedown = function (e){
			pintar = true;
			if( herramienta == "lapiz" ){
				ctx.moveTo(e.offsetX, e.offsetY);
			}
		}
		c.onmouseup = function(){
			pintar = false;
			ctx.beginPath();
		}
		// funcion lapiz y borrador
		c.onmousemove = function(e){
			if (pintar) {
				if (herramienta == "lapiz") {
					ctx.lineTo(e.offsetX, e.offsetY);
					ctx.lineWidth = trazo.value;
					ctx.strokeStyle = selecColor();
					ctx.stroke();
				}
				else if(herramienta == "borrador"){
					ctx.lineTo(e.offsetX, e.offsetY);
					ctx.lineWidth = trazo.value;
					ctx.strokeStyle = "#FFFFFF";
					ctx.stroke();
				}
			}
		}
		c.onmouseout = function(){
			pintar = false;
		};

		

		
	}
// canvas de seleccion de color segun rgb
	function actualizaColor(){
		color_prim = selecColor();
		ctxColor.beginPath();
		ctxColor.fillStyle = color_prim;
		ctxColor.fillRect(0, 0,altoC,anchoC);
		ctxColor.fill();
		ctxColor.closePath();
	}

	function selecColor(){
		let porRojo = Number(document.getElementById("rangoRojo").value);
		let porAzul = Number(document.getElementById("rangoAzul").value);
		let porVerde = Number(document.getElementById("rangoVerde").value);
		return "rgb("+porRojo+","+porVerde+","+porAzul+")";
	}