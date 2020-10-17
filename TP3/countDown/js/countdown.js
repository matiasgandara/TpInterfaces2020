
// dia de estreno
let countDownDate = new Date("May 5, 2021 15:37:25").getTime();

// Actualiza cuenta cada un segundo
let x = setInterval(function() {

  // Dia actual
  let now = new Date().getTime();
    
  // tiempo restante
  let distance = countDownDate - now;
    
  // Calculo de milisegundos en dias, horas, minutos y segundos restantes
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Salida de los calculos de tiempo a html
  let eDays = document.querySelector("#days");
  let eHours = document.querySelector("#hours");
  let eMinutes = document.querySelector("#minutes");
  let eSeconds = document.querySelector("#seconds");
  eDays.innerHTML = days;
  eHours.innerHTML = hours;
  eMinutes.innerHTML = minutes;
  eSeconds.innerHTML = seconds;
  

    
  // Si el tiempo es menor a 0 expiro
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
