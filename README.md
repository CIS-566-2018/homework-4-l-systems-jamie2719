Demo link: https://jamie2719.github.io/homework-4-l-systems-jamie2719/


I started my L-System project by making a linked list class to represent the input string. I wrote a function to expand the seed string by converting it to a linked list and then iterating through that linked list and replacing each character with its corresponding new set of characters from the grammar map. Once the seed was fully expanded (after the number of iterations set in the GUI), I passed that expanded string into the TurtleParser. The TurtleParser iterated through this expanded string and for each character, performed some action on the turtle to change its state. For example, 'F' moved the turtle forward and then drew a new branch at that new location. Only 'F' and 'L' actually drew geometry; the rest of the cases for the other characters just rotated the turtle or kept track of the turtle stack, in order to allow for branching. I had a lot of trouble with the order of transformations that were being applied to the turtles and eventually simplified my turtle class so that it only kept track of its position and direction, and the rotate function only modified the direction of the turtle. Once I had the basic structure of the assignment working, I focused on trying to develop a grammar for the tree. This consisted of a lot of trial and error to see how to expand the string in a way that would make the final product look the way I wanted it to. I added leaves in at the ends of some of the branches also; these leaves are drawn whenever there is an 'L' in the expanded string. To load in the meshed for the branches, trunk (which I just drew one of at the beginning of the program), and leaves, I used the web-gl obj loader that was recommended to us. I had to go through the positions and normals that were read in by that loader and add a 4th coordinate to each vector in order for the meshes to be rendered properly. I loaded in one instance of each  mesh at the beginning and then every time I wanted to draw a new branch or leaf, I just made a new Branch or Leaf object and copied over the vertex data from the default mesh for that object, and then transformed it accordingly. On the GUI, I added attributes so that the user can control the color of the tree, the number of iterations performed, and the initial axiom, as well as a button to reload the tree with these new attributes set.


# Homework 4: L-systems

For this assignment, you will design a set of formal grammar rules to create
a plant life using an L-system program. Once again, you will work from a
Typescript / WebGL 2.0 base code like the one you used in homework 0. You will
implement your own set of classes to handle the L-system grammar expansion and
drawing. You will rasterize your L-system using faceted geometry. Feel free
to use ray marching to generate an interesting background, but trying to
raymarch an entire L-system will take too long to render!

## L-System Components
The way you implement your L-System is ultimately up to you, but we recommend
creating the following classes / constructs to help you instantiate, expand, and
draw your grammars:
* Some sort of expandable collection of string characters. You might implement
a linked list data structure, or you might use a basic Javascript array (which
is resizeable).
* Some sort of class to represent a Rule for expanding a character into a
string. You might consider creating a map within each Rule that maps
probabilities to strings, so that a Rule can represent multiple possible
expansions for a character with different probabilities.
* A second Rule-style class that dictates what drawing operation should be
performed when a character is parsed during the drawing process. This should
also be a map of probabilities, but this time the values in the map will be
functions rather than strings. Invoke a given function, e.g. `drawBranch`, when
a character is parsed.
* A Turtle class that lets you keep track of, at minimum, a position, an
orientation, and a depth. You should also create a stack onto which you can push
and pop turtle states.
* A class in which to store the VBOs that will represent __all__ of your faceted
geometry. __Do not draw individual mesh components one at a time. This will
cause your program to render very slowly.__ Instead, expand lists of vertex
information as you "draw" your grammar, and push all VBO data to the GPU at once
after you've finished parsing your entire string for drawing.

## OBJ loading
So that you can more easily generate interesting-looking plants, we ask that you
enable your program to import OBJ files and store their information in VBOs. You
can either implement your own OBJ parser, or use an OBJ-loading package via NPM:

[obj-mtl-loader](https://www.npmjs.com/package/obj-mtl-loader)

[webgl-obj-loader](https://www.npmjs.com/package/webgl-obj-loader)


## Aesthetic Requirements
Your plant must have the following attributes:
* It must grow in 3D
* It must have flowers, leaves, or some other branch decoration in addition to
basic branch geometry
* Organic variation (i.e. noise or randomness in grammar expansion)
* A flavorful twist. Don't just make a basic variation on the example broccoli
grammar from the slides! Create a plant that is unique to you!

Feel free to use the resources linked in the slides for inspiration!

## Interactivity
Using dat.GUI, make at least three aspects of your demo an interactive variable.
For example, you could modify:

* The axiom
* Your input grammar rules and their probability
* The angle of rotation of the turtle
* The size or color or material of the cylinder the turtle draws

Don't feel restricted to these examples; make any attributes adjustable that you
want!

## Examples from last year (Click to go to live demo)

Andrea Lin:

[![](andreaLin.png)](http://andrea-lin.com/Project3-LSystems/)

Tabatha Hickman:

[![](tabathaHickman.png)](https://tabathah.github.io/Project3-LSystems/)

Joe Klinger:

[![](joeKlinger.png)](https://klingerj.github.io/Project3-LSystems/)

## Extra Credit (Up to 20 points)
For bonus points, add functionality to your L-system drawing that ensures
geometry will never overlap. In other words, make your plant behave like a
real-life plant so that its branches and other components don't compete for the
same space. The more complex you make your L-system self-interaction, the more
points you'll earn.
