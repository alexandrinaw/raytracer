;(function(exports) {
    var Renderer = function(canvas_id) {
        var canvas = document.getElementById(canvas_id);
        this.c = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.imageData = this.c.createImageData(this.width, this.height);
    };

    Renderer.prototype = {
        randomDots: function() {
            // draw random dots
            for (i = 0; i < this.width*this.height; i++) {
                x = Math.random() * this.width | 0; // |0 to truncate to Int32
                y = Math.random() * this.height | 0;
                r = Math.random() * 256 | 0;
                g = Math.random() * 256 | 0;
                b = Math.random() * 256 | 0;
                this.setPixel(this.imageData, x, y, r, g, b, 255); // 255 opaque
            }
            this.c.putImageData(this.imageData, 0, 0);
        },

function setPixel (imageData, x, y, r, g, b, a) {
     index = (x + y * imageData.width) * 4;
     imageData.data[index+0] = r;
     imageData.data[index+1] = g;
     imageData.data[index+2] = b;
     imageData.data[index+3] = a;
}

    exports.Renderer = Renderer;
})(this);
