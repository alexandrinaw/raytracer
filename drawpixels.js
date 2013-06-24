var canvas;
var c;
var width;
var height;
var imageData;

function init(canvas_id){
    canvas = document.getElementById(canvas_id);
    c = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
    imageData = c.createImageData(width, height);
}

function setPixel (imageData, x, y, r, g, b, a) {
     index = (x + y * imageData.width) * 4;
     imageData.data[index+0] = r;
     imageData.data[index+1] = g;
     imageData.data[index+2] = b;
     imageData.data[index+3] = a;
}

function randomDots (){
    // draw random dots
    for (i = 0; i < width*height; i++) {
        x = Math.random() * width | 0; // |0 to truncate to Int32
        y = Math.random() * height | 0;
        r = Math.random() * 256 | 0;
        g = Math.random() * 256 | 0;
        b = Math.random() * 256 | 0;
        setPixel(imageData, x, y, r, g, b, 255); // 255 opaque
    }
    c.putImageData(imageData, 0, 0);
}
