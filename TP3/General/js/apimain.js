'use strict';
document.addEventListener("DOMContentLoaded", function(){
    let URL="http://localhost:8080/TP3Integrador/api/";

    let btnReporte = document.querySelector('#btnReporte');
    btnReporte.addEventListener('click',cargarReporteCarrera);

    

    async function cargarReporteCarrera(){
        let request = URL+"carreras/reporte";
        let tabla = document.querySelector("#tableReport");
        try {
            let response = await  fetch(request);
            if (response.ok) {
                let dato = await response.json();
                for (let elemento of dato){
                        tabla.innerHTML += 
                        "<tr><td>"+ elemento.carrera+"</td>"+
                        "<td>"+ elemento.ciclo+"</td>"+
                        "<td>"+ elemento.ingresos +"</td>"+
                        "<td>"+ elemento.egresos+"</td>"+
                        "</tr>"
                }
            }
            else
                container.innerHTML = "<h1>Error - Failed URL!</h1>";
            }
        catch (response) {
            container.innerHTML = "<h1>Connection error22</h1>";
            };
    }

})