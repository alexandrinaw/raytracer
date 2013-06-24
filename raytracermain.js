var objects=[];
var lights = [];
var cam; 
var screenDepth;
var screen;  
(function (exports) {
    function setUpScene() {
        var p1 = new Plane([400,0,0],[-1, 0, 0]);
        objects.push(p1); 

        var s = new Sphere(30, 75, -30, 40);
        s.Material.setColor(30, 198, 0); 
        s.Material.lighting(0.6, 0.2, 0.2); 
        objects.push(s); 

        var s2 = new Sphere(60, 150, -60, 20); 
        s2.Material.setColor(0, 77, 100); 
        s2.Material.lighting(0.3, 0.6, 0.1); 
        objects.push(s2);

        var s4 = new Sphere(300, 250, -1000, 300); 
        s4.Material.lighting(0.6, 0.3, 0.1); 
        objects.push(s4); 

        var s3 = new Sphere(200,200,-200,40); 
        objects.push(s3); 

        var p = new Plane([100,300,100],[0,-1,0]);
        p.Material = new Checkerboard(100); 
        objects.push(p); 

        var l = new Light(250, 100, 100, 100);
        lights.push(l); 

        cam = new Camera(width/2, height/2, 500); 
        screen = new Screen();
    }
    var Camera = function (x, y, z) {
      this.x=x; 
      this.y=y; 
      this.z=z; 
    };
    movements = {
        moveLeft : ['x', 50],
        moveRight : ['x', -50],
        moveUp : ['y', 50],
        moveDown : ['y', -50],
        moveForward : ['z', -50],
        moveBackward : ['z', 50]
    }
    Camera.prototype = {}
    function addMovements(obj){
        for (movement in movements){
            (function(){
                var name = movement;
                var dim = movements[movement][0];
                var delta = movements[movement][1];
                var f = function(){
                    this[dim] = this[dim] + delta;
                    draw();
                }
                obj[movement] = f;
            })()
        }
    }
    addMovements(Camera.prototype);
    
    var Screen = function () {
        this.x=0; 
        this.y=0; 
        this.z=0; 
        this.width = width; 
        this.height = height; 
    };

    Screen.prototype = {};
    addMovements(Screen.prototype);

    function draw(){
        var cam_x=cam.x; 
        var cam_y=cam.y; 
        var cam_z=cam.z;
       
        var screenDepth = screen.z; 
        var screenX = screen.x;
        var screenY = screen.y;
        for (var w=0; w<width; w++) {
            for (var h=0; h<height; h++) {
                var color=[0, 0, 0, 255];
                var r = new ray(w+screenX, h+screenY, screenDepth, cam_x, cam_y, cam_z); 
               // var r = new ray(cam_x,cam_y, cam_z, w+screenX, h+screenY, screenDepth);
                var cl = closest_object(r); 
                if (cl!==undefined) {
                    var lighting = lightBuilder(cl, r); 
                    color[0]+=lighting[0]; 
                    color[1]+=lighting[1]; 
                    color[2]+=lighting[2]; 
                }
                setPixel(imageData, w, h, color[0], color[1], color[2], color[3]);
            }
        }
        c.putImageData(imageData, 0, 0);
    }

    function closest_object(ry) {
        var closest_dist=10000000; 
        var closest_i=-1; 
        for (var i=0; i<objects.length; i++) {
            var p = objects[i].intersections(ry); 
            for (var j=0; j<p.length; j++) {
                var dist = Math.sqrt(Math.pow(ry.x-p[j][0], 2)+Math.pow(ry.y-p[j][1], 2)+Math.pow(ry.z-p[j][2], 2));
                if (dist<closest_dist) {
                    closest_dist=dist; 
                    closest_i=i; 
                }
            }
        }
        if (closest_i>-1) {
            return objects[closest_i]; 
        }
    }
    exports.setUpScene = setUpScene; 
    exports.draw=draw;
    exports.cl=closest_object;
})(this); 
