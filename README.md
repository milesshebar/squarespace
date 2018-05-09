# [squarespace](http://cslab.kenyon.edu:9000)
interactive webpage that enables users to change colors of tiles on a website in real time

## Run your own
- Requrires [node](https://nodejs.org/en/)
- Clone the repository
- Run `npm run deploy` to compile static HTML/CSS/JS resources
 - This script transpiles `_sass/main.scss` and `_javascript/main.js` to `css/main.css` and `lib/main.js` respectively.
- Navigate to the directory via the command line and run `node server.js` to host locally on port 8080.

## Setup for development
- Requrires [node](https://nodejs.org/en/)
- Clone the repository
- Install dependencies with `npm install`
- Run `npm run start` to watch for changes and instantly compile them to static HTML/CSS/JS resources as you develop
- Run `npm run deploy` when you're done to compile static HTML/CSS/JS resources for deployment
- Run `node server.js` in the directory to host locally on port 8080.

---
Created for SCMP368: Software Development at [Kenyon College](http://kenyon.edu) by [@milesshebar](https://github.com/milesshebar),
[@hoode15](https://github.com/hoode15),
and [@flynnshannon](https://github.com/flynnshannon).
