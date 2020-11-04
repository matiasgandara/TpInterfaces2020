var inputs = document.getElementsByClassName('formulario__input');
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup', function(){
    if(this.value.length>=1) {
      this.nextElementSibling.classList.add('fijar');
    } else {
      this.nextElementSibling.classList.remove('fijar');
    }
  });
}

let primero =  document.querySelector(".primero");
let segundo =  document.querySelector(".segundo");
let tercero =  document.querySelector(".tercero");
let cuarto =  document.querySelector(".cuarto");
primero.style.visibility = "hidden";
segundo.style.visibility = "hidden";
tercero.style.visibility = "hidden";
cuarto.style.visibility = "hidden";
mostrar(primero,1000);
mostrar(segundo,1200);
mostrar(tercero,1400);
mostrar(cuarto,1600);




let button = document.querySelector('.button');
let buttonText = document.querySelector('.tick');

const tickMark = "<svg width=\"58\" height=\"45\" viewBox=\"0 0 58 45\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#fff\" fill-rule=\"nonzero\" d=\"M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65\"/></svg>";
buttonText.innerHTML = "Enviar";

button.addEventListener('click', function() {

  if (buttonText.innerHTML !== "Enviar") {
    buttonText.innerHTML = "Enviar";
  } else if (buttonText.innerHTML === "Enviar") {
    buttonText.innerHTML = tickMark;
  }
  this.classList.toggle('button__circle');
});

function mostrar(input,tiempo){
  setTimeout(function(){ 
    input.style.visibility = "visible";}, 4000 + tiempo);
}