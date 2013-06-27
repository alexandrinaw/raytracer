;(function(exports) {
    var Renderer = function(canvasId) {
        var canvas = document.getElementById(canvasId);
        this.c = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.newImageData = function() {
            return this.c.createImageData(this.width, this.height);
        };

        this.setImageData = function(imageData) {
            this.c.putImageData(imageData, 0, 0);
        };
    };

    Renderer.setPixel = function(imageData, x, y, r, g, b, a) {
        var index = (x + y * imageData.width) * 4;
        imageData.data[index+0] = r;
        imageData.data[index+1] = g;
        imageData.data[index+2] = b;
        imageData.data[index+3] = a;
    };

    Renderer.prototype = {
        draw: function(image) {
            var imageData = this.newImageData();
            for (var h = 0; h < this.height; h++) {
                for (var w = 0; w < this.width; w++) {
                    var p = image[h][w];
                    Renderer.setPixel(imageData, w, h, p[0], p[1], p[2], p[3]);
                }
            }
            this.setImageData(imageData);
        },

        randomDots: function() {
            // draw random dots
            var imageData = this.newImageData();
            for (i = 0; i < this.width*this.height; i++) {
                x = Math.random() * this.width | 0; // |0 to truncate to Int32
                y = Math.random() * this.height | 0;
                r = Math.random() * 256 | 0;
                g = Math.random() * 256 | 0;
                b = Math.random() * 256 | 0;
                Renderer.setPixel(imageData, x, y, r, g, b, 255); // 255 opaque
            }
            this.setImageData(imageData);
        }
    };

    exports.Renderer = Renderer;
})(this);
