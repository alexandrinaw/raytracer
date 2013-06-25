var objects=[];
var lights = [];
var screenDepth;
var screen;

(function (exports) {
    var Screen = function () {
        this.x=0;
        this.y=0;
        this.z=0;
        this.width = renderer.width;
        this.height = renderer.height;
        makeMoveable(this, draw);
    };

    var Camera = function (x, y, z) {
        this.x=x;
        this.y=y;
        this.z=z;
    };
    var Scene = function() {
        this.camera = new Camera(renderer.width/2, renderer.height/2, 500);

        var p1=new Plane([400,0,0],[-1, 0, 0]);
        objects.push(p1);
        var s = new Sphere(30, 75, -30, 40);
        s.Material.setColor(30, 198, 0);
        s.Material.lighting(0.6, 0.2, 0.2);
        var s2 = new Sphere (60, 150, -60, 20);
        s2.Material.setColor(0, 77, 100);
        s2.Material.lighting(0.3, 0.6, 0.1);
        s4=new Sphere(300, 250, -1000, 300);
        s4.Material.lighting(0.6, 0.3, 0.1);
        objects.push(s);
        objects.push(s2);
        objects.push(s4);
        var s3 = new Sphere (200,200,-200,40);
        objects.push(s3);
        var p = new Plane([100,300,100],[0,-1,0]);
        p.Material=new Checkerboard(100);
        objects.push(p);
        var l = new Light(250, 100, 100, 100);
        lights.push(l);
        cam = new Camera(renderer.width/2, renderer.height/2, 500);
        screen = new Screen();
    };

    exports.Screen=Screen;
    exports.Scene=Scene;
})(this);
