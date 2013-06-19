;(function(exports) {
    var allowMovement = function () {
        window.addEventListener("keydown", function(e) {
            if(e.keyCode == 38) {
                screen.moveDown(); 
            }
            if(e.keyCode == 40) {
                screen.moveUp(); 
            }
            if(e.keyCode == 39) {
                screen.moveLeft(); 
            }
            if(e.keyCode == 37) {
                screen.moveRight(); 
            }
        })
    };
    exports.allowMovement=allowMovement;
})(this); 
