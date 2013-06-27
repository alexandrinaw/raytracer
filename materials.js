;(function (exports) {
    var Material = function () {
        this.r=Math.floor(Math.random()*255);
        this.g=Math.floor(Math.random()*255);
        this.b=Math.floor(Math.random()*255);
        this.ka=0.3;
        this.kd=0.6;
        this.ks=0.1;
    }
    Material.prototype = {
      lighting: function (ks, kd, ka) {
        this.ks = ks; //specular reflection constant
        this.kd = kd; //diffuse reflection constant (lambert)
        this.ka = ka; //ambient reflection constant
        this.alpha; //shininess constant;
      },
      setColor: function (r, g, b) {
        this.r=r;
        this.g=g;
        this.b=b;
      },
      getColor: function(){
        return [this.r, this.g, this.b];
      }
    };

    var Checkerboard = function(size) {
        Material.call(this);//call material constructor.
        this.size=size||Math.floor(Math.random()*10);
        this.r2=Math.floor(Math.random()*255);
        this.g2=Math.floor(Math.random()*255);
        this.b2=Math.floor(Math.random()*255);
    };
    //checkerboard extends material
    Checkerboard.prototype = Object.create(Material.prototype);
    Checkerboard.prototype.constructor=Checkerboard;

    Checkerboard.prototype = {
        getColor: function(targetPoint, originalPoint){
           // var dist = Math.sqrt(Math.pow((targetPoint[0]-originalPoint[0]), 2) + Math.pow((targetPoint[1]-originalPoint[1]), 2)+ Math.pow((targetPoint[2]-originalPoint[2]), 2));
           // if (Math.floor(dist/this.size)%2===1) {
           //     return [this.r, this.g, this.b];
           // } else {
           //     return [this.r2, this.g2, this.b2];
           // }

            //should be ...dist in plane-specific x from defined point
            //..dist in y diretion.
            var x = Math.abs(Math.floor((targetPoint[0]-originalPoint[0])/this.size)%2);
            var y = Math.abs(Math.floor((targetPoint[1]-originalPoint[1])/this.size)%2);
            var z = Math.abs(Math.floor((targetPoint[2]-originalPoint[2])/this.size)%2);
            if(x^z) {
                return [this.r, this.g, this.b];
            } else {
                return [this.r2, this.g2, this.b2];
           }
        }
    }
    exports.Material=Material;
    exports.Checkerboard=Checkerboard;
})(this);
