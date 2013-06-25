(function (exports) {
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
    exports.cl=closest_object;
})(this);
