;(function (exports) {
    var Scene = function(width, height) {
        this.camera = new Camera(width/2, height/2, 500);
        this.screen = new Screen(width, height);
        this.objects = [];
        this.lights = [];

        var p1=new Plane([400,0,0],[-1, 0, 0]);
        this.objects.push(p1);
        var s = new Sphere(30, 75, -30, 40);
        s.material.setColor(30, 198, 0);
        s.material.lighting(0.6, 0.2, 0.2);
        var s2 = new Sphere (60, 150, -60, 20);
        s2.material.setColor(0, 77, 100);
        s2.material.lighting(0.3, 0.6, 0.1);
        s4=new Sphere(300, 250, -1000, 300);
        s4.material.lighting(0.6, 0.3, 0.1);
        this.objects.push(s);
        this.objects.push(s2);
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
            var cam_x=this.camera.x;
            var cam_y=this.camera.y;
            var cam_z=this.camera.z;

            var screenDepth = this.screen.z;
            var screenX = this.screen.x;
            var screenY = this.screen.y;
            for (var h=0; h<this.screen.height; h++) {
                renderedImage[h] = [];
                for (var w=0; w<this.screen.width; w++) {
                    var color=[0, 0, 0, 255];
                    var r = new Ray(w+screenX, h+screenY, screenDepth, cam_x, cam_y, cam_z);
                    // var r = new ray(cam_x,cam_y, cam_z, w+screenX, h+screenY, screenDepth);
                    var cl = this.closestObject(r);
                    if (cl!==undefined) {
                        var lighting = lightBuilder(cl, r);
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
            scene.draw();
        });
    };

    var Camera = function (x, y, z) {
        this.x=x;
        this.y=y;
        this.z=z;
    };

    exports.Scene=Scene;
})(this);
