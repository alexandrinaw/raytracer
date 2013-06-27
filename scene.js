;(function (exports) {
    var Scene = function(width, height) {
        this.view = new View(width, height); 
     //   this.view.camera = new Camera(width/2, height/2, 500);
     //   this.view.screen = new Screen(width, height);
        this.objects = [];
        this.lights = [];

        var p1=new Plane([400,0,0],[-1, 0, 0]);
        this.objects.push(p1);

        var s = new Sphere(30, 75, -30, 40);
        s.material.setColor(30, 198, 0);
        s.material.lighting(0.6, 0.2, 0.2);
        this.objects.push(s);
        
        var s2 = new Sphere (60, 150, -60, 20);
        s2.material.setColor(0, 77, 100);
        s2.material.lighting(0.3, 0.6, 0.1);
        this.objects.push(s2);
        
        var s4=new Sphere(300, 250, -1000, 300);
        s4.material.lighting(0.6, 0.3, 0.1);
        this.objects.push(s4);
        
        var s3 = new Sphere (200,200,-200,40);
        this.objects.push(s3);
        
        var p = new Plane([100,300,100],[0,-1,0]);
        p.material=new Checkerboard(100);
        this.objects.push(p);
        
        var l = new Light(250, 100, 100, 100);
        this.lights.push(l);
    };

    Scene.prototype = {
        render: function() {
            var renderedImage = [];
            var cam_x=this.view.camera.x;
            var cam_y=this.view.camera.y;
            var cam_z=this.view.camera.z;
            var screenDepth = this.view.screen.z;
            var screenX = this.view.screen.x;
            var screenY = this.view.screen.y;
            for (var h=0; h<this.view.screen.height; h++) {
                renderedImage[h] = [];
                for (var w=0; w<this.view.screen.width; w++) {
                    var color=[0, 0, 0, 255];
                    //var r = new Ray(w+screenX, h+screenY, screenDepth, cam_x, cam_y, cam_z);
                    var r = this.view.rays[h][w]; 
                    //adds current rays to view object...
                    //this.view.rays[h][w] = r; 
                    //need to have way to read in...

                    var cl = this.closestObject(r);
                    if (cl!==undefined) {
                        var lighting = lightLevel(cl, r);
                        color[0]+=lighting[0];
                        color[1]+=lighting[1];
                        color[2]+=lighting[2];
                    }
                    renderedImage[h][w] = [color[0], color[1], color[2], color[3]];
                }
            }
            return renderedImage;
        },

        closestObject: function(ry) {
            var closest_dist=10000000;
            var closest_i=-1;
            for (var i=0; i<scene.objects.length; i++) {
                var p = scene.objects[i].intersections(ry);
                for (var j=0; j<p.length; j++) {
                    var dist = Math.sqrt(Math.pow(ry.x-p[j][0], 2)+Math.pow(ry.y-p[j][1], 2)+Math.pow(ry.z-p[j][2], 2));
                    if (dist<closest_dist) {
                        closest_dist=dist;
                        closest_i=i;
                    }
                }
            }
            if (closest_i>-1) {
                return scene.objects[closest_i];
            }
        }
    };

    var Screen = function (width, height) {
        this.x=0;
        this.y=0;
        this.z=0;
        this.width = width;
        this.height = height;
        makeMoveable(this, function() {
            renderer.draw(scene.render());
        });
    };

    var Camera = function (x, y, z) {
        this.x=x;
        this.y=y;
        this.z=z;
    };
    
    var View = function(width, height) {
        this.camera = new Camera(width/2, height/2, 500);
        this.screen = new Screen(width, height);
        this.rays = [];
        for (var h=0; h<height; h++) {
            this.rays[h]=[];
            for (var w=0; w<width; w++) {
                this.rays[h][w] = new Ray(w+this.screen.x, h+this.screen.y, this.screen.z, this.camera.x, this.camera.y, this.camera.z);
            }
        }
    };

    var rotations = function (axis, angle) {
        if (axis == 'x') {
            return [[1,0,0],[0, Math.cos(angle), -Math.sin(angle)],[0, Math.sin(angle), Math.cos(angle)]]; 
        } else if (axis =='y') {
            return [[Math.cos(angle), 0, Math.sin(angle)],[0, 1, 0],[-Math.sin(angle), 0, Math.cos(angle)]];
        } else if (axis =='z') {
            return [[Math.cos(angle), -Math.sin(angle), 0],[Math.sin(angle), Math.cos(angle), 0],[0,0,1]];
        }
    }

    View.prototype = {
        rotate: function (rotationAxis, angle) {
            for (var h=0; h<this.rays.length; h++){
                for (var w=0; w<this.rays[h].length; w++) {
                    var current = this.rays[h][w]; 
                    var vector = current.vector(); 
                    var rotMatrix = rotations(rotationAxis, angle); 
                    var newX = rotMatrix[0][0]*vector[0]+rotMatrix[0][1]*vector[1]+rotMatrix[0][2]*vector[2]; 
                    var newY = rotMatrix[1][0]*vector[0]+rotMatrix[1][1]*vector[1]+rotMatrix[1][2]*vector[2]; 
                    var newZ = rotMatrix[2][0]*vector[0]+rotMatrix[2][1]*vector[1]+rotMatrix[2][2]*vector[2]; 
                    var newRay = new Ray (current.x + newX, current.y+newY, current.z+newZ, current.x, current.y, current.z); 
                    this.rays[h][w]=newRay; 
                }
            }
        },
        move: function(direction, amount) {
            for (var h=0; h<this.rays.length; h++){
                for (var w=0; w<this.rays[h].length; w++) {
                    var current = this.rays[h][w];
                    current[direction]+=amount; 
                    current['d' + direction]+=amount; 
                }
            }
                //for each ray
                //add amount to x/dx, y/dy, z/dz
            //write new array to this.rays
        }
    }
    exports.Scene=Scene;
})(this);
