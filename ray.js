//dx, dy, dz = point on ray / end position
//x, y, z = starting position, or origin if not given
;(function (exports) {
    var ray = function (dx, dy, dz, x, y, z){
        this.x=x||0; 
        this.y=y||0; 
        this.z=z||0;
        this.dx=dx;
        this.dy=dy; 
        this.dz=dz;
    };

    ray.prototype = {
        vector: function () {
            return [(this.dx-this.x), (this.dy-this.y),(this.dz-this.z)];
        },
        unitVector: function () {
            var l = Math.sqrt(Math.pow(this.x-this.dx, 2) + Math.pow (this.y - this.dy, 2) + Math.pow (this.z - this.dz,2)); 
            return [(this.dx-this.x)/l, (this.dy-this.y)/l,(this.dz-this.z)/l];
        }, 
        dotProduct: function (ray2) {
            var r = this.unitVector(); 
            var r2 = ray2.unitVector(); 
            return r[0]*r2[0]+r[1]*r2[1]+r[2]*r2[2];
        }
    };
    exports.ray=ray; 
})(this); 
