function castParallax() {

	let opThresh = 350;
	let opFactor = 750;

	window.addEventListener("scroll", function(event){

		let top = this.pageYOffset;

		let layers = document.getElementsByClassName("parallax");
		let layer, speed, yPos;
		for (var i = 0; i < layers.length; i++) {
			layer = layers[i];
			speed = layer.getAttribute('data-speed');
			let yPos = -(top * speed / 100);
			layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');

		}
	});
}

document.body.onload = castParallax();