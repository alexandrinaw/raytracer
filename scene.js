var objects=[];
var lights = [];
var cam;
var screenDepth;
var screen;

(function (exports) {
  var Screen = function () {
    this.width = width;
    this.height = height;
    this.depth = -500; 
    this.x_center = this.width/2;
    this.y_center = this.height/2; 
  };


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

    Camera.prototype = {}
    addMovements(Camera.prototype);

    Screen.prototype = {}
    addMovements(Screen.prototype); 


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
    
    var s3 = new Sphere(200,200,-200,40);
    objects.push(s3);

    var s4 = new Sphere(300, 250, -1000, 300);
    s4.Material.lighting(0.6, 0.3, 0.1);
    objects.push(s4);

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
