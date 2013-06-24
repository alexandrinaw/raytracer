var ia = 100;
;(function(exports) {
    var Light = function(x, y, z, intensity) {
        this.x=x;
        this.y=y;
        this.z=z;
        this.i=intensity;
    };

    Light.prototype = {
        //unitVector = a unit vector from the point given to the light (x, y, z) position
        unitVector: function(x, y, z) {
            var l = Math.sqrt(Math.pow(this.x-x, 2) + Math.pow (this.y - y, 2) + Math.pow (this.z - z,2));
            return [(this.x-x)/l, (this.y-y)/l,(this.z-z)/l];
        }
    };
    exports.Light=Light;
})(this);
