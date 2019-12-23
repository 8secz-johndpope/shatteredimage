## Image Fragments Transition Effect with React
This is a fun project to fragmentize an image, scatter the image parts, then restore the fragments back to a whole image at another position.
![1](src/images/1.png)
![2](src/images/2.png)
![3](src/images/3.png)
![4](src/images/4.png)
![5](src/images/5.png)
![6](src/images/6.png)

* React is used
* only 100 lines of code

![fragments](src/images/fragments.png)

sample of 7x7=49 images combined as a whole image

### Basic ideas
* Create a matrix of *div* elements, each div contains an *img* element
* Use *position: aboslute* to control the position and size of each *div* in the grid
* Use *transform: translate(x,y)* and *overflow: hidden* to crop images into correct positions so that they can make up a whole image
* To scatter the fragmentized image, use random number to create different tranlations/rotations for each *div*
* Use setTimeout to wait the scattering finish, then set the transitions of the divs to the same values to restore the fragments to a whole image.




