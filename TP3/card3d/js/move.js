/* windows.onload = function(){
    let card = document.querySelector(".capas");
    card.on('mousemove', function (e) {
        let x = e.clientX - this.offset().left + window.scrollLeft();
        let y = e.clientY - this.offset().top + window.scrollTop();
        
        let rY = map(x, 0, this.width(), -17, 17);
        let rX = map(y, 0, this.height(), -17, 17);
    
        this.children(".image").css("transform", "rotateY(" + rY + "deg)" + " " + "rotateX(" + -rX + "deg)");
    });
        
    function map(x, in_min, in_max, out_min, out_max)
    {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
} */

window.onload = function(){
    let card = document.querySelector(".capa0");
    card.onmousemove = function(e){
        let x= Math.round(e.clientX - this.clientLeft + window.screenLeft);
	    let y= Math.round(e.clientY - this.clientTop +window.screenTop);

        let rX = ((y - (this.clientWidth/2))/this.clientWidth) * 17; 
        let rY = ((x - (this.clientHeight/2))/this.clientHeight) * 17;

        /* let rY = map(x, 0, this.width, -17, 17);
        let rX = map(y, 0, this.height, -17, 17);*/
        this.style.transform = "rotateY(" + rY + "deg)" + " " + "rotateX(" + -rX + "deg)";
    };

    
}