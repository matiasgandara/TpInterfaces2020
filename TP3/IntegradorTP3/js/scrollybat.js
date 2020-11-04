document.addEventListener("DOMContentLoaded", function(){

'use strict'

let pagina = document.querySelector("#pagina");
pagina.classList.toggle("oculto");

let spinner = document.querySelector(".loading");

setTimeout(function(){ 
    spinner.classList.toggle("oculto"); 
    pagina.classList.toggle("oculto")}, 3000);


let bg = document.querySelector("#cielo");
let logo = document.querySelector("#logo");
let nubes = document.querySelector("#nubes");
let road = document.querySelector("#road");
let text = document.querySelector("#text");
let murcielago= document.querySelector("#murcielago");
let cardsFila = document.querySelector(".cardsFila");
let card1 = document.querySelector("#cards1");
card1.style.visibility = "hidden";
let card2 = document.querySelector("#cards2");
card2.style.visibility = "hidden";


//***scrollY para parallax inicial */

window.addEventListener('scroll', function(){
    let value = window.scrollY;

    bg.style.top = value * 0.5 + 'px';
    logo.style.top = value * 0.9 + 'px';
    logo.style.left = value * 0.05 + 'px';
    murcielago.style.top = -value * 0.8 + 'px'; 
    nubes.style.top = -value * 0.5 + 'px'; 
    road.style.top = value * 0.15 + 'px';
    text.style.top = value * 1 + 'px';
    text.style.left = value * 0.2 + 'px';
    console.log(value);
    let factor = 0;
    if (value > 1100){
        card1.style.visibility = "visible";
    }
    if (value > 1300){
        card2.style.visibility = "visible";
    }


        
});



});