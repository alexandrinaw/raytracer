var lights = [];
var screenDepth;
(function (exports) {
    function draw(){
        var cam_x=scene.camera.x;
        var cam_y=scene.camera.y;
        var cam_z=scene.camera.z;

        var screenDepth = scene.screen.z;
        var screenX = scene.screen.x;
        var screenY = scene.screen.y;
        for (var w=0; w<renderer.width; w++) {
            for (var h=0; h<renderer.height; h++) {
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
                renderer.setPixel(renderer.imageData, w, h, color[0], color[1], color[2], color[3]);
            }
        }
        renderer.c.putImageData(renderer.imageData, 0, 0);
    }

    function closest_object(ry) {
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
    exports.setUpScene = setUpScene;
    exports.draw=draw;
    exports.cl=closest_object;
})(this);
