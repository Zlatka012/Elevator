# Elevator

This algorithm is lightened version of what frequently used elevator would possess. While developing structure of this program I assumed that 
this elevator is going to have the best advantage of going in the straight direction without changing its way (unless users in cabin decide to go somewhere else than firstly intentioned), but the biggest disadvantage of not being able to combine routes to serve travelers more strategically.

version: 1.0.0
language: JavaScript

Mechanism description:
-
My elevator algorithm is based on what would be the most understandable mechanism for potential passengers.
Algorithm expects that users will be able to determine whether or not the elevator is being used by someone else.
That will be indicated by the buttons on individual floors - they'd be lit up when elevator is in use.


Logical steps this algorithm follows:
-
- it can be immediately called in the state of no actual usage (named "still" stage)
- it will wait 3 seconds for passengers to enter the cabin before closing the door and going in "still" stage
- it will go directly to caller without pausing on other floors in purpose to search for him
- its next destination will determine its direction, it won't be affected by it's last direction
- elevator in use won't be stoppable by some other caller


WAYS TO RUN IN ON YOUR MACHINE:
-
- I uploaded it on my domain, so you can access it by going directly on mainpage of https://vyvojwebu.sk and interact with it in your web browser.
(Note: I ensured that it's compatible with listed browsers: Google Chrome, MS Edge, Mozilla Firefox, Opera and Internet Explorer v.11. Safari should 
theoretically not cause errors, but I haven't got it manually tested.)
- You can download this repository as a single folder with all the files and without manipulating with files' paths open "index.html" in any advised 
browser mentioned before. At this stage, the program would be executable.

How to use it:
-
1. Click on the floor button you're calling from (- on the right side when using desktop, at the bottom while being on the phone).
2. When elevator arrives at your floor and opens its door, select the desired destination in the inside of the cabin.
3. When doors are opened, you can operate it from inside as many times as you want.
4. When calling buttons aren't lit up, you can call it by using them.

Notes under the line
-
CODE STRUCTURE:
- please don't mind my twice tabulated functions - it's purpose is to set apart code that's executed in defined order from later reused functions
- keep in mind that it's small project, so for some repeated operations I was lazy enough to automate it even further (because I'm sure it won't harm the efficiency)
- comments under the function signature is describing primary purpose and the overall behaviour of the whole function

VISUAL DESIGN OF THE "APP":
- I don't know how to design visual appealing interface, so forgive me the presentation
- I'm more of a "technical guy" than esthetically skilled artist, so I hope it won't hurt your eyes (sorry in advance)

CODE "COMPLEXITY":
- I hope that sectioning and explicitly typed parts mixed together won't cause readability issues or make the syntax un-understandable
- as time goes by I'm going to rebuild it in more intelligent system deciding over passengers to be more strategically programmed (any version updates will be mentioned in this file, too)
