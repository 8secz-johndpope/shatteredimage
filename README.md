## Shattered Image Effect with React Hook
It is a tiny(100 lines of code) fun project using React Hook. Basically what it does is that it fragments an image, scatters the image pieces, and then restores the parts back to a whole image at the position of your choice.

Double Click on a point in the browser
![1](src/images/1.png)

The image starts shattering
![2](src/images/2.png)

Image fragments move and rotation randomly toward target point
![3](src/images/3.png)

Parts start converging to the final position
![4](src/images/4.png)

The image is restored as a whole at the destination point.
![5](src/images/5.png)

### Basic ideas

![fragments](src/images/fragments.png)


* Create a matrix of *div* elements, each div contains an *img* element
* Use *position: abosulate* to control the position and size of each *div* in the grid
* Use *transform: translate(x,y)* and *overflow: hidden* of the *div* to crop images at the calculated position so that they can make up a whole image
* To generate the shattered image effect, use random number to create different translations/rotations for each *div*
* Use *setTimeout* to wait for the scattering to finish, then set all the transitions of the divs to the offset of the target point (This will restore the fragments to a whole image at a difference point).




