(function (exports) {
    function draw(){
        var cam_x=cam.x; 
        var cam_y=cam.y; 
        var cam_z=cam.z;
      
        for (var w=0; w<width; w++) {
            for (var h=0; h<height; h++) {
                var color=[0, 0, 0, 255];
                var targetX = w-(screen.width/2 - screen.x_center);
                var targetY = h-(screen.height/2 - screen.y_center); 
                var targetZ =cam.z+screen.depth; 
                
                var r = new ray(targetX, targetY, targetZ, cam_x, cam_y, cam_z); 
                var cl = closest_object(r); 
                if (cl!==undefined) {
                    var lighting = lightLevel(cl, r); 
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
    exports.draw=draw;
})(this); 
