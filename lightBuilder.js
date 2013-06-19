;(function (exports) {
    var lightBuilder = function (obj, ry) {
      var o = obj; 
      var p = o.intersections(ry)[0];
      if (p===undefined){
        return[0, 0, 0]; 
      }
      //todo: also think about shadows...
      var kd = o.Material.kd; 
      var ks = o.Material.ks; 
      var c = o.Material.getColor(p, o.point);
      var r = c[0]; 
      var g = c[1];
      var b = c[2];
      var ru = ry.unitVector(); //ray unit vector
      var ambient_r = o.Material.ka*r; 
      var ambient_g = o.Material.ka*g; 
      var ambient_b = o.Material.ka*b; 
      var illumination = [ambient_r, ambient_g, ambient_b];
      if (p!==undefined){
        for (var j=0, len=lights.length; j<len; j++) {
          var l = lights[j];//current light
          var nu = o.normal(p[0], p[1], p[2]);//normal unit vector
          var lu = l.unitVector(p[0], p[1], p[2]);//light -> point unit vector
          var lambert = nu[0]*lu[0]+nu[1]*lu[1]+nu[2]*lu[2];
          var lr = new ray(lu[0], lu[1], lu[2], p[0], p[1], p[2]); 
          if (isInShadow(lr, o, l)) {
            lambert = 0; 
          }
          if (lambert>0) {
            var diff_r = kd*lambert*r;
            var diff_g = kd*lambert*g;
            var diff_b = kd*lambert*b;
          } else {
            var diff_r=0; 
            var diff_g=0; 
            var diff_b=0; 
          }
          var rr = [2*lambert*nu[0]-lu[0], 2*lambert*nu[1]-lu[1],2*lambert*nu[2]-lu[2]];//reflected ray
          var rDotV = rr[0]*ru[0]+rr[1]*ru[1]+rr[2]*ru[2];
          if (lambert > 0 && rDotV>0) {
            var spec_r = ks*rDotV*r; 
            var spec_g = ks*rDotV*g; 
            var spec_b = ks*rDotV*b; 
          } else {
            var spec_r=0;
            var spec_g=0; 
            var spec_b=0; 
          }
          illumination[0]+=diff_r+spec_r;
          illumination[1]+=diff_g+spec_g;
          illumination[2]+=diff_b+spec_b;
        }
      }
      return illumination; 
    };
    var isInShadow = function (ry, obj, lt) {
        for (var i=0; i<objects.length; i++){
            var p = objects[i].intersections(ry);
            if (p.length>0 && obj !==objects[i]) {
               if (((lt.x > p[0][0] && p[0][0] > ry.x) || (lt.x < p[0][0] && p[0][0] < ry.x)) &&  ((lt.y > p[0][1] && p[0][1] > ry.y) || (lt.y < p[0][1] && p[0][1] < ry.y)) && ((lt.z > p[0][2] && p[0][2] > ry.z) || (lt.z < p[0][2] && p[0][2] < ry.z))){
                   return true; 
               }
            }
        }
        return false; 
    };
    exports.lightBuilder=lightBuilder;
})(this); 
