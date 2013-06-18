;(function(exports) {
    var addButtons = function () {
        window.addEventListener("keydown", function(e) {
            if(e.keyCode == 38) {
                cam.moveUp();   
            }
            if(e.keyCode == 40) {
                cam.moveDown(); 
            }
            if(e.keyCode == 39) {
                cam.moveRight(); 
            }
            if(e.keyCode == 37) {
                cam.moveLeft(); 
            }
        })
    };
    exports.addButtons=addButtons; 
})(this); 
