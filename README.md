#Particles Lib js
##Example

* Imitation of particle.js https://vol4n3.github.io/JcParticles/example/01.html

##Usage

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
    // options
  });
```
###**Options**
TODO

##How to Contribute

_this project use Typescript for compile_

* Clone the project
* Install via Npm or Yarn
* Build with npm run build
* If you are ___not on windowsOS___ you can get an error, look on package.json for remove Temp folder script
* Before pull request launch build the project and commit dist changes
* you can watch files with your IDE (WebStorm) and auto run npm build command
