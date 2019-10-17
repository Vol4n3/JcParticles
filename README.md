# Particles Lib js ##
## Intro ##
This lib is for make simple particles animations in canvas 2D js.
## Goal ##
* Simplify configurations
* To be able to interact with particles
* Increase options
* Optimization with powerful algorithms
* Support recent navigators
* add lib on Npm repository
* Write unit tests \o/ (in progress)
## Test ##
Tested in Chrome only for the moment

## Examples ##

*  https://vol4n3.github.io/JcParticles/example/linked-particles.html
*  https://vol4n3.github.io/JcParticles/example/wave-line.html
*  https://vol4n3.github.io/JcParticles/example/text-image-convert.html

## Usage ##

**HTML**
```
<body>
    <div id="particleContainer" style="width: 100vw;height: 100vh;"></div>
    <script src="./dist/JcParticle.js"></script>
    <script src="yourScript.js"></script>
</body>
```
**JS**
```
  const instance = new JcParticle('particleContainer',{
    demoType: 'example01'
  });
```
## Options ##
TODO

## How to Contribute ##

_This project use Typescript Browserify and Uglify only for compile_

* Clone the project
* Install via Npm or Yarn with command ``npm run install``
* Build with ``npm run build``
* If you are ___not on windowsOS___ you can get an error, look on package.json for remove Temp folder script
* Before pull request launch build the project and commit dist changes
* you can watch files with your IDE (WebStorm) and auto run npm build command
