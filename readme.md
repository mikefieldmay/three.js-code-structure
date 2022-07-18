# Three.js Code Structure

## Intro

This uses the code structure section from (Bruno Simon's excellent Three.js course)[https://threejs-journey.com/] as a base. I used (Mixamo)[https://www.mixamo.com/#/] for the model and animations. I would definitely use this as a starting point for making more complex Three.js applications. The EventEmitter is a great way of sharing updates across classes.
I'm not too keen of having the Experience as a singleton class that's used to share values between other classes, so would likely attempt to address this in any new project.

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```
