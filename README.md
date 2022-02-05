# :jigsaw:  The Fibonacci Grid

The Fibonacci Grid is a single player puzzle game based on the [Fibonacci Sequence](https://en.wikipedia.org/wiki/Fibonacci_number).

<p align="center">
    <img src="https://github.com/katerina-tziala/the-fibonacci-grid/blob/master/the-fibonnacci-grid.png" alt="the fibonacci grid overview" width="90%" height="auto">
</p>


### Game Play
The Fibonacci Grid consists of a 50x50 grid.

When the player clicks on a cell, all values in the cells in the same row and column are increased by 1 or, if a cell was empty, it is set to 1. After each change, the cells will briefly turn yellow.

If 5 consecutive numbers in the [Fibonacci Sequence](https://en.wikipedia.org/wiki/Fibonacci_number) are next to each other (vertically or horizontally), thes cells will briefly turn green and will be cleared. The sum of the Fibonacci numbers in these cells is added to the current points of the player.

## Prerequisites

Node version >= 16.13.1

## Technologies

Here’s a high level list of the technologies used for this app:

- [Node.js v16.13.0](https://nodejs.org/en/)

- JavaScript ES6

- [SASS](https://sass-lang.com/)

- [Google Fonts](https://google-webfonts-helper.herokuapp.com/fonts)

- [Webpack](https://webpack.js.org/)

## Running the App

1. Fork and clone this repository

2. To install the dependencies of the app, run in the project directory `npm install` or `npm i`

3. To run the app, in the project directory run: `npm run start`

## Future Improvements
- Give the user the option to set the prefered dimensions for the grid
- Give the user the option to set the number of the sequential terms that should be matched to gain points
- Add an app loader
- Use of a UI library like, Bootstrap or Tailwind to improve UI
- Migrate to TypeScript
- Set up the coding styles for this repository and use [Prettier](https://prettier.io/), [Stylelint](https://stylelint.io/) and [ESLint](https://eslint.org/) to enforce the selected coding styles
- Write Unit Tests
