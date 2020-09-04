var canvas = document.getElementById("myCanvas");
 if (canvas && canvas.getContext) {
   var ctx = canvas.getContext("2d");
   if (ctx) {
     var X = canvas.width;
     var Y = canvas.height;

     ctx.fillStyle = "#333";
     ctx.fillRect(0, 0, X, Y);
     ctx.save() // guarda el 1° estado

     ctx.fillStyle = "#999";
     ctx.fillRect(15, 15, X - 30, Y - 30);
     ctx.save(); // guarda el 2° estado

     ctx.fillStyle = "#ccc";
     ctx.fillRect(30, 30, X - 60, Y - 60);
     ctx.save(); // guarda el 3° estado

     ctx.fillStyle = "#eee";
     ctx.fillRect(45, 45, X - 90, Y - 90);

     ctx.restore(); // recupera el 3° estado
     ctx.fillRect(60, 60, X - 120, Y - 120);

     ctx.restore(); // recupera el 2° estado
     ctx.fillRect(75, 75, X - 150, Y - 150);

     ctx.restore(); // recupera el 1° estado
     ctx.fillRect(90, 90, X - 180, Y - 180);
   }
 }