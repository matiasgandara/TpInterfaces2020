'use strict'

let bg = document.querySelector("#cielo");
let moon = document.querySelector("#logo");
let mountain = document.querySelector("#nubes");
let road = document.querySelector("#road");
let text = document.querySelector("#text");

window.addEventListener('scroll', function(){
    let value = window.scrollY;

    bg.style.top = value * 0.5 + 'px';
    /* moon.style.left = -value * 0.6 + 'px'; */
    moon.style.top = value * 0.8 + 'px';
    mountain.style.top = -value * 0.5 + 'px'; 
    road.style.top = value * 0.15 + 'px';
    text.style.top = value * 1 + 'px';
})