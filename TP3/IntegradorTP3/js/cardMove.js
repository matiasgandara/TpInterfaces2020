
let img1 = document.querySelector("#img1");
let img2 = document.querySelector("#img2");
let img3 = document.querySelector("#img3");
let img4 = document.querySelector("#img4");

img1.addEventListener('mousemove', rotateCard);
img2.addEventListener('mousemove', rotateCard);
img3.addEventListener('mousemove', rotateCard);
img4.addEventListener('mousemove', rotateCard);


function rotateCard(e){
  let xAxis = -(window.innerWidth / 2 - e.pageX) / 10;
  let yAxis = -(window.innerHeight / 2 - e.pageY) / 10;
  yAxis-= 240;
  this.style.transform = `rotateY(${yAxis}deg) rotateX(${xAxis}deg)`;
}
