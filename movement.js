;(function(exports) {
    var moves = {
        moveRight : function (mover) {
            mover.move('x', -50);
        },
        moveLeft : function (mover) {
            mover.move('x', 50);
        },
        moveUp : function (mover) {
            mover.move('y', 50);
        },
        moveDown : function (mover) {
            mover.move('y', -50);
        },
        moveForward : function (mover) {
            mover.move('z', 50);
        },
        moveBackward : function (mover) {
            mover.move('z', -50);
        },
        rotateRight : function (mover) {
            mover.rotate('y', -3.14159/16);
        },
        rotateLeft : function (mover) {
            mover.rotate('y', 3.14159/16);
        },
        rotateUp : function (mover) {
            mover.rotate(mover.lookUpDownAxis(), 3.14159/16);
        },
        rotateDown : function (mover) {
            mover.rotate(mover.lookUpDownAxis(), -3.14159/16);
        },
        tiltLeft : function (mover) {
            mover.rotate(mover.tiltAxis(), 3.14159/16);
        },
        tiltRight : function (mover) {
            mover.rotate(mover.tiltAxis(), -3.14159/16);
        }
    };

    var moveMappings = [];
    moveMappings[38] = moves.moveBackward; //down arrow
    moveMappings[40] = moves.moveForward; //up arrow
    moveMappings[39] = moves.moveLeft; //left arrow
    moveMappings[37] = moves.moveRight; //righw arrow
    moveMappings[74] = moves.moveUp; //j key
    moveMappings[75] = moves.moveDown; //k key
    moveMappings[68] = moves.rotateRight; //d kay
    moveMappings[65] = moves.rotateLeft; //a key
    moveMappings[87] = moves.rotateUp; //w key
    moveMappings[83] = moves.rotateDown; //d key
    moveMappings[81] = moves.tiltLeft; //q key
    moveMappings[69] = moves.tiltRight; //e key

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
