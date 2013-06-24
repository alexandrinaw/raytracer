var objects=[];
var lights = [];
var cam;
var screenDepth;
var screen;

(function (exports) {
    var Screen = function () {
        this.x=0;
        this.y=0;
        this.z=0;
        this.width = width;
        this.height = height;
    };


    Screen.prototype = {
        moveRight : function () {
            this.x = this.x-50;
            draw();
        },
        moveLeft : function () {
            this.x = this.x+50;
            draw();
        },
        moveUp : function () {
            this.y = this.y+50;
            draw();
        },
        moveDown : function () {
            this.y = this.y-50;
            draw();
        },
        moveForward : function () {
            this.z = this.z-50;
            draw();
        },
        moveBackward : function () {
            this.z = this.z+50;
            draw();
        },
    };

    var Camera = function (x, y, z) {
        this.x=x;
        this.y=y;
        this.z=z;
    };

    Camera.prototype = {
        moveRight : function () {
            this.x = this.x+50;
            draw();
        },
        moveLeft : function () {
            this.x = this.x-50
            draw();
        },
        moveUp : function () {
            this.y = this.y+50;
            draw();
        },
        moveDown : function () {
            this.y = this.y-50;
            draw();
        },
        moveForward : function () {
            this.z = this.z-50;
            draw();
        },
        moveBackward : function () {
            this.z = this.z+50;
            draw();
        },
    }

    function setUpScene() {
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
        cam = new Camera(width/2, height/2, 500);
        screen = new Screen();
    }

    exports.setUpScene = setUpScene;
    exports.Camera=Camera;
    exports.Screen=Screen;
})(this);
