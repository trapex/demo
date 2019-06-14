import style from "../css/style.scss";

if (process.env.NODE_ENV === 'development') {
	console.log('Working in development mode');
}

import { saveAs } from 'file-saver';

$(function () {
	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');

	let imagesList = ['/miniature-pug.jpg', '/sparkles.png'],
		images = [],
		async = [new $.Deferred(), new $.Deferred()];

	imagesList.forEach((item, key) => {
		images[key] = new Image;
		images[key].onload = function() {
			async[key].resolve(this);
		};
		images[key].src = location.origin + item;
	});

	$.when(async[0], async[1]).then((result1, result2) => {
		ctx.drawImage(result1, 0, 0);
		ctx.drawImage(result2, 0, 0);
	});

	$('.js-save-canvas-btn').on('click', (e) => {

		// document.getElementById("downloader").download = "image.png";
		// document.getElementById("downloader").href = document.getElementById("canvas").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
		// e.target.href = canvas.toDataURL("image/png");

		if (canvas.msToBlob) { //for IE
			let blob = canvas.msToBlob();
			window.navigator.msSaveBlob(blob, 'image.png');
		} else if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
			e.preventDefault();
			canvas.toBlob(function(blob) {
				saveAs(blob, "image.png");
			});
		} else {
			//other browsers
			e.target.href = canvas.toDataURL();
			e.target.download = "image.png";
		}

	});

});