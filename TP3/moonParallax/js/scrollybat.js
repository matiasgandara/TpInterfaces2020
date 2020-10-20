document.addEventListener("DOMContentLoaded", function(){

'use strict'
/*  let baseURL = "http://localhost/proyectos/cinefilo3/";
let container = document.querySelector("#use-ajax");

async function cargarIndex() {
    container.innerHTML = "<h1>Loading...</h1>";
    try {
        let response = await fetch(baseURL+"indexplus.html");
        if (response.ok) {
            let dato = await response.text();
            container.innerHTML = dato
        }
        else
            container.innerHTML = "<h1>Error - Failed URL!</h1>";
        }
    catch (response) {
        container.innerHTML = "<h1>Connection error22</h1>";
        };
} */
setTimeout(function(){ 
    let spinner = document.querySelector(".loading");
    spinner.classList.toggle("oculto"); }, 3000);

let bg = document.querySelector("#cielo");
let moon = document.querySelector("#logo");
let mountain = document.querySelector("#nubes");
let road = document.querySelector("#road");
let text = document.querySelector("#text");
let murcielago= document.querySelector("#murcielago");




window.addEventListener('scroll', function(){
    let value = window.scrollY;

    bg.style.top = value * 0.5 + 'px';
    /* moon.style.left = -value * 0.6 + 'px'; */
    moon.style.top = value * 0.8 + 'px';
    murcielago.style.top = -value * 0.8 + 'px'; 
    mountain.style.top = -value * 0.5 + 'px'; 
    road.style.top = value * 0.15 + 'px';
    text.style.top = value * 1 + 'px';
})

});