;(function(exports) {
    var moves = {
        moveRight : function (mover) {
            mover.x = mover.x-50;
        },

        moveLeft : function (mover) {
            mover.x = mover.x+50;
        },

        moveUp : function (mover) {
            mover.y = mover.y+50;
        },

        moveDown : function (mover) {
            mover.y = mover.y-50;
        },

        moveForward : function (mover) {
            mover.z = mover.z-50;
        },

        moveBackward : function (mover) {
            mover.z = mover.z+50;
        }
    };

    var moveMappings = [];
    moveMappings[38] = moves.moveDown;
    moveMappings[40] = moves.moveUp;
    moveMappings[39] = moves.moveLeft;
    moveMappings[37] = moves.moveRight;

    var makeMoveable = function (mover, movedCallback) {
        window.addEventListener("keydown", function(e) {
            if (e.keyCode in moveMappings) {
                moveMappings[e.keyCode](mover);
                movedCallback();
            }
        });
    };

    exports.makeMoveable = makeMoveable;
})(this);
