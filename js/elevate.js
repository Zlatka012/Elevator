        // ForEach polyfill
            // Production steps of ECMA-262, Edition 5, 15.4.4.18
            // Reference: https://es5.github.io/#x15.4.4.18

            if (!Array.prototype['forEach']) {
                Array.prototype.forEach = function(callback, thisArg) {
                if (this == null) { throw new TypeError('Array.prototype.forEach called on null or undefined'); }
                var T, k;
                var O = Object(this);
                var len = O.length >>> 0;
                // If isCallable(callback) is false, throw a TypeError exception.
                // See: https://es5.github.io/#x9.11
                if (typeof callback !== "function") { throw new TypeError(callback + ' is not a function'); }
                if (arguments.length > 1) { T = thisArg; }
                k = 0;
                while (k < len) {
                    var kValue;
                    if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                    }
                    k++;
                }
                };
            }
        // ------------------------------

        function getID(x) {
            return document.getElementById(x);
        }

        function arrayFromClass(x) {
            return Array.prototype.slice.call(document.getElementsByClassName(x));
        }

        function CL(elem, x, y) {
            // ClassList operations.
            switch (x) {
                case "add":
                    return elem.classList.add(y);
                    break;
                case "has":
                    return elem.classList.contains(y);
                    break;
                default:
                    return elem.classList.remove(y);
            }
        }

// Visible output data.
let elevState = getID("elevstate");
let showFloor = getID("currfloor");
let elevDir = getID("direction");

        function displayState() {
            // Updating state info seen by user.
            elevState.textContent = "elevator: " + state;
        }

        function showElev(elem, x) {
            // Abstract function for further usage.
            elem.textContent = x;
        }

        function displayFloor() {
            // Updating elevator's current position.
            showElev(showFloor, currFloor);
        }

        function displayDirection() {
            // Updating elevator's direction
            showElev(elevDir, direction);
        }

// Actual info.
let state = "still";
let currFloor = 5;
let direction = "";
let where;

        function updateInfo() {
            displayState();
            displayFloor();
            displayDirection();
        }

// Show real-time output for user.
updateInfo();


// Clickable functionality of buttons.
let floorBtns = arrayFromClass("floorbtn");

floorBtns.forEach(function(btn) {
    // Select floor by clicking on a number.
    btn.addEventListener("click", selectFloor);
});


        function selectFloor() {
            // Actions of elevator call.
            let next = this;

            if ( isStill() ) {
                setIt(next);
            } else if ( isWaiting() ) {
                chooseWay();
            } 
        }

        function isStill() {
            if (state == "still") {
                return true;
            } else {
                return false;
            }
        }

        function isWaiting() {
            if (state == "waiting") {
                return true;
            } else {
                return false;
            }
        }

        function setIt(x) {
            // Floor's conditions check.
            if ( (!CL(x,"has","chosen")) || ( !CL(x,"has","light"))) {
                CL(x, "add", "chosen");

                // Set destination.
                where = x.textContent;
                where = parseInt(where, 10);

                // Indicate moving elevators to all floors.
                lightOthers();

                // Elevator answers to call.
                answer();
            }
        }

        function lightOthers() {
            // Every other floor won't be able to click the call elevator.
            floorBtns.forEach(function(btn) {
                if ( !CL(btn, "has", "chosen") ) {
                    CL(btn, "add", "light");
                }
            });
        }

        function answer() {
            if (currFloor == where) {
                state = "waiting";
                updateInfo();
                openDoor();
            } else {
                findWay();
            }
        }

        function findWay() {
            if (currFloor < where) {
                direction = "↑";
                go("up");
            } else {
                direction = "↓";
                go("down");
            }
            
            updateInfo();
        }

        function go(x) {
            state = "moving";
            if (x == "up") {
                differ = where - currFloor;
                stepByStep(differ, "+");
            } else {
                differ = currFloor - where;
                stepByStep(differ);
            }
        }

        function stepByStep(x, y) {
            // Move through floors towards destination.
            for (let i = 1; i <= x; i++) {

                setTimeout(function() {
                    if (y == "+") {
                        currFloor++;
                    } else {
                        currFloor--;
                    }

                    // Real-time output.
                    displayFloor();
                    updateInfo();
                }, i*1300);
            }

            setTimeout(function() {
                // Stop at the right floor.
                state = "waiting";
                direction = "";
                updateInfo();

                // Open the door for the passenger.
                openDoor();
            }, x*1300);
        }

// The inside of an elevator.
let inside = getID("numbers")

        function openDoor() {
            // Show buttons in the inside.
            CL(inside, "del", "hidden");
            where = null;
            noneBtn();

            waitForUser();
        }

        function waitForUser() {
            let now = showFloor.textContent;
            setTimeout(function() {
                if ( (where == null) && ( showFloor.textContent == now) ) {
                    closeDoor();
                }
            }, 3000);
        }

        function closeDoor() {
            CL(inside,"add","hidden");
            state = "still";
            updateInfo();

            clearOrder();
        }

        function clearOrder() {
            floorBtns.forEach(function(btn) {
                CL(btn,"remove","chosen");
                CL(btn,"remove","light");
            })
        }

        function noneBtn() {
            floorBtns.forEach(function(btn) {
                CL(btn,"remove","chosen");
                CL(btn,"add","light");
            })
        }

        function hideInside() {
            CL(inside,"add", "hidden");
            clearOrder();
        }

// Functionality of control panel in the inside.
let controls = arrayFromClass("select");

controls.forEach(function(btn) {
    btn.addEventListener("click", function() {
        // Set next destination.
        where = this.textContent;
        where = parseInt(where, 10);

        if (where != currFloor) {
            hideInside();
            noneBtn();
            findWay();
        }
    });
});
