let ctx = document.getElementById('myCanvas').getContext("2d"); 

ctx.beginPath();
ctx.fillStyle = "#FF0055";
ctx.fillRect(20, 40, 100, 100);
ctx.fill();
ctx.closePath();


// sigo desde aca

function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");

      ctx.fillStyle = "rgb(200,0,0)";
      ctx.fillRect (10, 10, 55, 50);

      ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      ctx.fillRect (30, 30, 55, 50);
    }
  }

