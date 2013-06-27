;(function(exports) {
    var moves = {
        moveRight : function (mover) {
            mover.x -= 50;
        },

        moveLeft : function (mover) {
            mover.x += 50;
        },

        moveUp : function (mover) {
            mover.y += 50;
        },

        moveDown : function (mover) {
            mover.y -= 50;
        },

        moveForward : function (mover) {
            mover.z -= 50;
        },

        moveBackward : function (mover) {
            mover.z += 50;
        }
    };

    var moveMappings = [];
    moveMappings[38] = moves.moveDown; //down arrow
    moveMappings[40] = moves.moveUp; //up arrow
    moveMappings[39] = moves.moveLeft; //left arrow
    moveMappings[37] = moves.moveRight; //righw arrow
    moveMappings[74] = moves.moveForward; //j key
    moveMappings[75] = moves.moveBackward; //k key

    var makeMoveable = function (mover, movedCallback) {
        window.addEventListener("keyup", function(e) {
            if (e.keyCode in moveMappings) {
                moveMappings[e.keyCode](mover);
                movedCallback();
            }
        });
    };

    exports.makeMoveable = makeMoveable;
})(this);
