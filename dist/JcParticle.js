!function r(s,a,h){function c(e,t){if(!a[e]){if(!s[e]){var i="function"==typeof require&&require;if(!t&&i)return i(e,!0);if(l)return l(e,!0);var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}var n=a[e]={exports:{}};s[e][0].call(n.exports,function(t){return c(s[e][1][t]||t)},n,n.exports,r,s,a,h)}return a[e].exports}for(var l="function"==typeof require&&require,t=0;t<h.length;t++)c(h[t]);return c}({1:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=(n.prototype.save=function(){this._stack.push(new Float32Array(this.data))},n.prototype.restore=function(){var t=this._stack[this._stack.length-1];t&&(this.data=t,this._stack.pop())},n);function n(){this.data=new Float32Array([]),this._stack=[]}i.Matrix=o},{}],2:[function(t,e,i){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(i,"__esModule",{value:!0});var r,s=t("./Matrix"),a=(r=s.Matrix,n(h,r),Object.defineProperty(h,"identity",{get:function(){return new Float32Array([1,0,0,0,1,0,0,0,1])},enumerable:!0,configurable:!0}),h.transform2D=function(t){var e=(new h).project(t.width,t.height);return 0!==t.position.x&&0!==t.position.y&&e.translate(t.position.x,t.position.y),0!==t.rotation.angle&&e.rotate(t.rotation.angle),0!==t.rotation.x&&0!==t.rotation.y&&e.translate(t.rotation.x,t.rotation.y),1!==t.scale.x&&1!==t.rotation.y&&e.scale(t.scale.x,t.scale.y),e},h.translation=function(t,e){return new Float32Array([1,0,0,0,1,0,t,e,1])},h.rotation=function(t){var e=Math.cos(t),i=Math.sin(t);return new Float32Array([e,i,0,-i,e,0,0,0,1])},h.scaling=function(t,e){return new Float32Array([t,0,0,0,e,0,0,0,1])},h.projection=function(t,e){return new Float32Array([2/t,0,0,0,-2/e,0,-1,1,1])},h.prototype.multiply=function(t){var e=t[0]*this.data[0]+t[1]*this.data[3]+t[2]*this.data[6],i=t[0]*this.data[1]+t[1]*this.data[4]+t[2]*this.data[7],o=t[0]*this.data[2]+t[1]*this.data[5]+t[2]*this.data[8],n=t[3]*this.data[0]+t[4]*this.data[3]+t[5]*this.data[6],r=t[3]*this.data[1]+t[4]*this.data[4]+t[5]*this.data[7],s=t[3]*this.data[2]+t[4]*this.data[5]+t[5]*this.data[8],a=t[6]*this.data[0]+t[7]*this.data[3]+t[8]*this.data[6],h=t[6]*this.data[1]+t[7]*this.data[4]+t[8]*this.data[7],c=t[6]*this.data[2]+t[7]*this.data[5]+t[8]*this.data[8];return this.data[0]=e,this.data[1]=i,this.data[2]=o,this.data[3]=n,this.data[4]=r,this.data[5]=s,this.data[6]=a,this.data[7]=h,this.data[8]=c,this},h.prototype.rotate=function(t){return this.multiply(h.rotation(t)),this},h.prototype.translate=function(t,e){return this.multiply(h.translation(t,e)),this},h.prototype.scale=function(t,e){return this.multiply(h.scaling(t,e)),this},h.prototype.project=function(t,e){return this.multiply(h.projection(t,e)),this},h);function h(t){void 0===t&&(t=h.identity);var e=r.call(this)||this;return e.data=t,e}i.Matrix3=a},{"./Matrix":1}],3:[function(t,e,i){"use strict";var o;Object.defineProperty(i,"__esModule",{value:!0}),(o=i.MathUtils||(i.MathUtils={})).randomRange=function(t){return Math.random()*t*2-t},o.round=function(t,e){return void 0===e&&(e=1),Math.round(t*e)/e}},{}],4:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=t("./PositionPoint"),n=t("../geometry2D/Point"),r=t("./RotationPoint"),s=(a.prototype.update=function(t){this.position.update(t),this.rotation.update(t)},a.prototype.offsetX=function(t){return t*this.scale.x+this.position.x},a.prototype.offsetY=function(t){return t*this.scale.y+this.position.y},a.prototype.reverseX=function(t){return(t+this.position.x)/this.scale.x},a.prototype.reverseY=function(t){return(t+this.position.y)/this.scale.y},a);function a(){this.position=new o.PositionPoint,this.scale=new n.Point(1,1),this.rotation=new r.RotationPoint}i.Camera=s},{"../geometry2D/Point":22,"./PositionPoint":9,"./RotationPoint":11}],5:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});function o(t,e,i){this.x=t,this.y=e,this.rgbColor=i}i.ColorPoint=o},{}],6:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var u=t("./ColorPoint"),p=t("./RGBColor"),o=(n.prototype.fromImage=function(t){void 0===t&&(t=new Image),t.complete||console.warn("image must be complete for "+t.currentSrc),this.setSize(t.width,t.height),this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height),this._ctx.drawImage(t,0,0);var e=t.width/300,i=t.height/300,o=Math.round((4*e+4*i)/2);return o=o<2?2:o,this.getPixel(o)},n.prototype.setSize=function(t,e){this._canvas.width=t,this._canvas.height=e},n.prototype.getPixel=function(t,e){void 0===t&&(t=1),void 0===e&&(e=new p.RGBColor(240,240,240,1));for(var i=this._ctx.getImageData(0,0,this._canvas.width,this._canvas.height),o=[],n=0;n<i.width;n+=t)for(var r=0;r<i.height;r+=t){var s=4*(n+r*i.width),a=i.data[s],h=i.data[1+s],c=i.data[2+s],l=i.data[3+s]/255;.5<l&&(a<=e.red||h<=e.green||c<=e.blue)&&o.push(new u.ColorPoint(n,r,new p.RGBColor(a,h,c,l)))}return o},n.prototype.FromText=function(t,e,i,o){return void 0===e&&(e=40),void 0===i&&(i="'Arial', sans-serif"),void 0===o&&(o="rgba(0,0,0,1)"),this.setSize(e*t.length,2*e),this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height),this._ctx.fillStyle="rgba(255,255,255,0.1)",this._ctx.fillRect(0,0,this._canvas.width,this._canvas.height),this._ctx.font=e+"px "+i,this._ctx.fillStyle=o,this._ctx.fillText(t,0,e),this.getPixel(2)},n);function n(){this._canvas=document.createElement("canvas"),this._ctx=this._canvas.getContext("2d"),this._ctx.imageSmoothingEnabled=!1}i.ImageToPointsFactory=o},{"./ColorPoint":5,"./RGBColor":10}],7:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=(n.prototype.destroy=function(){this._scene.canvas.removeEventListener("click",this._refOnClick),this._scene.canvas.removeEventListener("mousemove",this._refOnHover)},n.prototype._OnClick=function(e){this.subscribesClick.forEach(function(t){t(e)})},n.prototype._OnHover=function(e){this.subscribesHover.forEach(function(t){t(e)})},n);function n(t){this._scene=t,this.subscribesClick=[],this.subscribesHover=[],this._refOnClick=this._OnClick.bind(this),this._refOnHover=this._OnHover.bind(this),this._scene.canvas.addEventListener("click",this._refOnClick),this._scene.canvas.addEventListener("mousemove",this._refOnHover)}i.Interaction=o},{}],8:[function(t,e,i){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(i,"__esModule",{value:!0});var r,s=t("../geometry2D/Segment"),a=(r=s.Segment,n(h,r),Object.defineProperty(h.prototype,"alpha",{get:function(){return Math.round(10*(1-this.length/this.maxlength))/10},enumerable:!0,configurable:!0}),h.prototype.draw=function(t){if(!(this.alpha<.1)){t.ctx.save();var e=t.ctx.createLinearGradient(this.start.x,this.start.y,this.end.x,this.end.y);e.addColorStop(0,this.start.color),e.addColorStop(1,this.end.color),t.ctx.strokeStyle=e,t.ctx.globalAlpha=this.alpha,t.ctx.lineWidth=this.width,t.ctx.beginPath(),t.ctx.moveTo(this.start.x,this.start.y),t.ctx.lineTo(this.end.x,this.end.y),t.ctx.stroke(),t.ctx.closePath(),t.ctx.restore()}},h);function h(){var t=null!==r&&r.apply(this,arguments)||this;return t.width=2,t.maxlength=100,t}i.Link=a},{"../geometry2D/Segment":23}],9:[function(t,e,i){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(i,"__esModule",{value:!0});var r,s=t("../geometry2D/Point"),a=(r=s.Point,n(h,r),h.prototype.update=function(t){this._isTargeting?this._traveling():(0<this.maxVelocity&&(this.velocity.x=this.velocity.x>this.maxVelocity?this.maxVelocity:this.velocity.x,this.velocity.x=this.velocity.x<-this.maxVelocity?-this.maxVelocity:this.velocity.x,this.velocity.y=this.velocity.y>this.maxVelocity?this.maxVelocity:this.velocity.y,this.velocity.y=this.velocity.y<-this.maxVelocity?-this.maxVelocity:this.velocity.y),this.velocity.multiply(this.friction),this.add(this.velocity))},h.prototype.startEasingTravel=function(t,e,i,o){this._targetPoint=t.copy(),this._easing=i,this._originPoint=this.copy(),this._time=e,this._isTargeting=!0,this._timeCount=0,this._callback=o},h.prototype._traveling=function(){this._timeCount<=this._time?(this.x=this._easing(this._timeCount,this._originPoint.x,this._targetPoint.x-this._originPoint.x,this._time),this.y=this._easing(this._timeCount,this._originPoint.y,this._targetPoint.y-this._originPoint.y,this._time),this._timeCount++):(this._isTargeting=!1,this._callback&&this._callback())},h);function h(){var t=null!==r&&r.apply(this,arguments)||this;return t.friction=new s.Point(1,1),t.velocity=new s.Point(0,0),t.maxVelocity=0,t._timeCount=0,t}i.PositionPoint=a},{"../geometry2D/Point":22}],10:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=(n.prototype.copy=function(){return new n(this.red,this.green,this.blue,this.alpha)},n.prototype.toVec4=function(){return new Float32Array([this.red/255,this.green/255,this.blue/255,this.alpha])},n.prototype.toRGBACss=function(){return"rgba("+this.red+","+this.green+","+this.blue+","+this.alpha+")"},n.prototype.toRGBCss=function(){return"rgb("+this.red+","+this.green+","+this.blue+")"},n.random=function(){return new n(Math.round(255*Math.random()),Math.round(255*Math.random()),Math.round(255*Math.random()))},n.prototype.setFrom=function(t){this.red=t.red,this.green=t.green,this.blue=t.blue,this.alpha=t.alpha},n.prototype.random=function(t){if(void 0===t&&(t=[]),t.length){var e=t[Math.round(Math.random()*(t.length-1))];this.setFrom(e)}else this.red=Math.round(255*Math.random()),this.green=Math.round(255*Math.random()),this.blue=Math.round(255*Math.random())},n);function n(t,e,i,o){void 0===t&&(t=0),void 0===e&&(e=0),void 0===i&&(i=0),void 0===o&&(o=1),this.red=t,this.green=e,this.blue=i,this.alpha=o}i.RGBColor=o},{}],11:[function(t,e,i){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(i,"__esModule",{value:!0});var r,s=t("../geometry2D/Point"),a=(r=s.Point,n(h,r),h.prototype.update=function(t){this.velocity*=this.friction,this.angle+=this.velocity},h);function h(){var t=null!==r&&r.apply(this,arguments)||this;return t.friction=1,t.velocity=0,t.angle=0,t}i.RotationPoint=a},{"../geometry2D/Point":22}],12:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=t("./Camera"),n=t("./Interaction"),r=(s.prototype.loop=function(){var e=this;this.updates.forEach(function(t){t.update(e)})},s.prototype.animate=function(){var e=this;this.useGL?this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT):this.ctx.clearRect(0,0,this.width,this.height),this.draws.forEach(function(t){t.draw(e)}),requestAnimationFrame(this._animateRef)},s.prototype.resize=function(){this.width=this.container.clientWidth,this.height=this.container.clientHeight,this.canvas.width=this.width,this.canvas.height=this.height,this.useGL&&this.gl.viewport(0,0,this.width,this.height)},s.prototype.destroy=function(){window.removeEventListener("resize",this._resizeRef),window.cancelAnimationFrame(this._animationFrame),window.clearInterval(this._interval),this.interaction.destroy()},s);function s(t,e){this.canvas=document.createElement("canvas"),this.camera=new o.Camera,this.draws=[],this.updates=[],this._resizeRef=this.resize.bind(this),this._animateRef=this.animate.bind(this),this._loopRef=this.loop.bind(this),this.container=document.getElementById(t),window.addEventListener("resize",this._resizeRef),this.resize(),e?(this.gl=this.canvas.getContext("webgl2"),this.useGL=!0):(this.ctx=this.canvas.getContext("2d"),this.useGL=!1),this.gl?(this.gl.viewport(0,0,this.width,this.height),this.gl.enable(this.gl.DEPTH_TEST),this.gl.clearColor(0,0,0,0)):(this.ctx=this.canvas.getContext("2d"),this.useGL=!1),this.canvas.style.display="block",this.container.appendChild(this.canvas),this._animationFrame=requestAnimationFrame(this._animateRef),this._interval=setInterval(this._loopRef,1e3/45),this.interaction=new n.Interaction(this)}i.SceneRenderer=r},{"./Camera":4,"./Interaction":7}],13:[function(t,e,i){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(i,"__esModule",{value:!0});var r,s=t("../PositionPoint"),a=t("../../geometry2D/Point"),h=t("../../Math/Utils"),c=t("../RGBColor"),l=t("../../Math/Matrix3"),u=t("../RotationPoint"),p=(r=s.PositionPoint,n(d,r),Object.defineProperty(d.prototype,"color",{get:function(){return 1<=this.rgbColor.alpha?this.rgbColor.toRGBCss():this.rgbColor.toRGBACss()},enumerable:!0,configurable:!0}),d.prototype.updateMat3=function(t,e){this.transformMat3=l.Matrix3.transform2D({width:t,height:e,position:{x:this.x,y:this.y},rotation:{angle:this.rotation.angle,x:this.rotation.x,y:this.rotation.y},scale:{x:this.radius,y:this.radius}})},d.prototype._bounce=function(t){(this.hasMoveType("bounce")||this.hasMoveType("bounceX"))&&(this.bounceBox("x",t.width-this.radius),this.bounceBox("x",this.radius,!0)),(this.hasMoveType("bounce")||this.hasMoveType("bounceY"))&&(this.bounceBox("y",t.height-this.radius),this.bounceBox("y",this.radius,!0))},d.prototype.bounceBox=function(t,e,i){(i?this[t]<e:this[t]>e)&&(this[t]=e,this.velocity[t]*=-1)},d.prototype.draw=function(t){t.useGL?console.warn("Particle draw fn not yet implemented for webgl"):(t.ctx.fillStyle=this.color,t.ctx.beginPath(),t.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI),t.ctx.fill(),t.ctx.closePath())},d.prototype.hasMoveType=function(t){return-1<this.moveTypes.indexOf(t)},d.prototype._teleport=function(t){(this.hasMoveType("teleport")||this.hasMoveType("teleportX"))&&(this.teleportBox("x",t.width+this.distanceTeleport,-this.distanceTeleport),this.teleportBox("x",-this.distanceTeleport,t.width+this.distanceTeleport,!0)),(this.hasMoveType("teleport")||this.hasMoveType("teleportY"))&&(this.teleportBox("y",t.height+this.distanceTeleport,-this.distanceTeleport),this.teleportBox("y",-this.distanceTeleport,t.height+this.distanceTeleport,!0))},d.prototype.teleportBox=function(t,e,i,o){(o?this[t]<e:this[t]>e)&&(this[t]=i)},d.prototype.attractTo=function(t){this.velocity.add(new a.Point(t.x-this.x,t.y-this.y))},d.prototype.randomPropulsion=function(t){this.velocity.add(new a.Point(h.MathUtils.randomRange(t),h.MathUtils.randomRange(t)))},d.prototype.update=function(t){r.prototype.update.call(this,t),this._bounce(t),this._teleport(t),this._vibration(),this._randomWalk(),this.hasMoveType("pinned")&&this.attractTo(this._startedPosition),this.updateMat3(t.width,t.height)},d.prototype._randomWalk=function(){if(this.hasMoveType("randomWalk")&&Math.random()>this.walkFrequency){var t=h.MathUtils.randomRange(Math.PI/4);this.velocity.rotateAround(new a.Point,t);var e=Math.random()+.5;this.velocity.x*=e,this.velocity.y*=e}},d.prototype._vibration=function(){this.hasMoveType("vibration")&&(.5<Math.random()?this.randomPropulsion(this.vibrationStrength):this.attractTo(this._startedPosition))},d);function d(t,e){void 0===t&&(t=0),void 0===e&&(e=0);var i=r.call(this,t,e)||this;return i.distanceTeleport=50,i.rgbColor=new c.RGBColor,i.moveTypes=[],i.radius=1,i.depth=0,i.rotation=new u.RotationPoint,i.walkStrength=3,i.walkFrequency=.95,i.vibrationStrength=5,i._startedPosition=i.copy(),i}i.Particle=p},{"../../Math/Matrix3":2,"../../Math/Utils":3,"../../geometry2D/Point":22,"../PositionPoint":9,"../RGBColor":10,"../RotationPoint":11}],14:[function(t,e,i){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(i,"__esModule",{value:!0});var r,s=t("./Particle"),a=(r=s.Particle,n(h,r),Object.defineProperty(h.prototype,"ellipseHeight",{get:function(){return this._centerY+this._maxHeight-this.y},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"ellipseRotation",{get:function(){return(1-this.ellipseHeight/this._maxHeight)*Math.PI/12},enumerable:!0,configurable:!0}),h.prototype.draw=function(t){t.ctx.fillStyle=this.color,t.ctx.beginPath(),t.ctx.ellipse(this.x,this._centerY,4,this.ellipseHeight,this.ellipseRotation,0,2*Math.PI),t.ctx.fill(),t.ctx.closePath()},h.prototype.update=function(t){r.prototype.update.call(this,t),this._increment>2*Math.PI&&(this._increment-=2*Math.PI),this.y=this._centerY+Math.cos(this._increment)*this._maxHeight,this._increment+=this.speed},h);function h(t,e,i,o){var n=r.call(this,t,e)||this;return n._maxHeight=i,n._increment=o,n.speed=.06,n._centerY=e,n.y=n._centerY+Math.cos(n._increment)*n._maxHeight,n.rgbColor.random(),n}i.WaveParticle=a},{"./Particle":13}],15:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=t("../particles/Particle"),n=t("../../webgl/Shader"),r=t("../webgl/SimpleGeometryColor"),s=t("../../geometry2D/Point"),a=(h.prototype.draw=function(e){var i=this;this.particles.forEach(function(t){if(e.useGL){if(!t.transformMat3)return;i.boidGL.drawGl(t.transformMat3,t.rgbColor,t.depth)}else t.draw(e)})},h.prototype.update=function(e){this.particles.forEach(function(t){t.velocity.isZero||(t.rotation.angle=t.velocity.angleTo(new s.Point)),t.update(e)})},h);function h(t){this._sc=t,this.particles=[];var e=new n.Shader(t.gl,r.SimpleGeometryColor.vertex,r.SimpleGeometryColor.fragment);this.boidGL=new r.SimpleGeometryColor(t.gl,e,[.5,0,1,1,-1,0,1,-1]);var i=new o.Particle(100,100);i.moveTypes=["randomWalk","bounce"],i.velocity.x=2,i.radius=10,this.particles.push(i)}i.BoidsScene=a},{"../../geometry2D/Point":22,"../../webgl/Shader":25,"../particles/Particle":13,"../webgl/SimpleGeometryColor":20}],16:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=t("../particles/WaveParticle"),o=(n.prototype.update=function(t){},n.prototype.draw=function(t){},n);function n(t){var e;this._sc=t,this.particles=[];for(var i=1;i<30;i++){var o=i/30*t.width,n=t.height/2,r=new s.WaveParticle(o,n,40,.35*i);this.particles.push(r),(e=t.draws).push.apply(e,this.particles)}}i.ColoredWaveScene=o},{"../particles/WaveParticle":14}],17:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=t("../../webgl/Shader"),a=t("../webgl/SimpleGeometryColor"),h=t("../../geometry2D/Point"),c=t("../particles/Particle"),l=t("../RGBColor"),o=(n.prototype.draw=function(e){var i=this;this.particles.forEach(function(t){if(e.useGL){if(!t.transformMat3)return;i.polygonShape.drawGl(t.transformMat3,t.rgbColor,t.depth)}else t.draw(e)})},n.prototype.update=function(e){this.particles.forEach(function(t){t.update(e)})},n);function n(t){this._sc=t,this.particles=[];var e=new s.Shader(t.gl,a.SimpleGeometryColor.vertex,a.SimpleGeometryColor.fragment),i=new h.Point;this.polygonShape=new a.SimpleGeometryColor(t.gl,e,i.makePolygonPoints(6,1,0,!0));for(var o=[l.RGBColor.random(),l.RGBColor.random(),l.RGBColor.random()],n=0;n<1500;n++){var r=new c.Particle(Math.random()*t.width,Math.random()*t.height);r.moveTypes.push("randomWalk","bounce"),r.maxVelocity=10,r.rgbColor.random(o),r.radius=10*Math.random(),this.particles.push(r)}}i.GLScene=o},{"../../geometry2D/Point":22,"../../webgl/Shader":25,"../RGBColor":10,"../particles/Particle":13,"../webgl/SimpleGeometryColor":20}],18:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=t("../Link"),o=t("../particles/Particle"),n=(r.prototype.update=function(t){},r.prototype.addParticle=function(){var t=new o.Particle(Math.random()*this._sc.width,Math.random()*this._sc.height);t.radius=Math.round(2*Math.random()+1),t.velocity.translate(4*Math.random()-2,4*Math.random()-2),t.moveTypes=["bounce"],t.rgbColor.random(),this.particles.push(t),this._sc.draws.push(t),this._sc.updates.push(t)},r.prototype.draw=function(t){for(var e=0;e<this._particlesNumber;e++)for(var i=e+1;i<this._particlesNumber;i++){var o=this.particles[e],n=this.particles[i];if(!(o.distanceTo(n)>this.maxLinkLength)){var r=new s.Link(o,n);r.maxlength=this.maxLinkLength,r.draw(t)}}},r);function r(t,e){this._sc=t,this._particlesNumber=e,this.particles=[],this.maxLinkLength=70;for(var i=0;i<this._particlesNumber;i++)this.addParticle()}i.LinkedParticlesScene=n},{"../Link":8,"../particles/Particle":13}],19:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=t("../particles/Particle"),n=t("../ImageToPointsFactory"),r=t("../../geometry2D/Point"),s=t("../../geometry2D/Circle"),a=t("../../geometry2D/Segment"),h=(c.prototype.loadText=function(t){if(void 0===t&&(t="Hello world !"),t&&t.length){var e=this.canvasToPoint.FromText(t);this.createParticles(e)}},c.prototype.createParticles=function(t){var i=this;this.particles=[],t.forEach(function(t){var e=new o.Particle(t.x,t.y);e.moveTypes=["vibration","pinned"],e.rgbColor=t.rgbColor.copy(),e.radius=3,e.friction=new r.Point(.12,.12),e.translate(Math.random()*i._sc.width,Math.random()*i._sc.height),i.particles.push(e)})},c.prototype.loadImage=function(t){var e=this.canvasToPoint.fromImage(t);this.createParticles(e)},c.prototype.draw=function(e){this.particles.forEach(function(t){return t.draw(e)})},c.prototype.update=function(e){this.particles.forEach(function(t){return t.update(e)})},c);function c(t){var e=this;this._sc=t,this.particles=[],this.canvasToPoint=new n.ImageToPointsFactory,this._sc.interaction.subscribesHover.push(function(t){var i=new s.Circle(t.x,t.y);i.radius=30,e.particles.forEach(function(t){if(t.inCircle(i,!0)){var e=new a.Segment(i,t).vector;e.length=3*i.radius,t.velocity.add(e.destination),t.moveTypes=["vibration","pinned"]}else t.moveTypes=["vibration"]})})}i.TransformScene=h},{"../../geometry2D/Circle":21,"../../geometry2D/Point":22,"../../geometry2D/Segment":23,"../ImageToPointsFactory":6,"../particles/Particle":13}],20:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=(Object.defineProperty(n,"vertex",{get:function(){return"#version 300 es\t\nin vec2 a_position;\nuniform vec4 u_colors;\nuniform mat3 u_matrix;\nuniform float u_depth;\nout vec4 v_color;\nvoid main() {\n\tgl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, u_depth, 1);\n\tv_color = u_colors;\n}\n"},enumerable:!0,configurable:!0}),Object.defineProperty(n,"fragment",{get:function(){return"#version 300 es\nprecision mediump float;\nin vec4 v_color;\nout vec4 outColor;\nvoid main() {\n  outColor = v_color;\n}\n"},enumerable:!0,configurable:!0}),n.prototype.destroy=function(){this._shader.destroy(),this._gl.deleteBuffer(this._positionBuffer),this._gl.deleteBuffer(this._colorBuffer)},n.prototype.drawGl=function(t,e,i){void 0===i&&(i=0),this._gl.useProgram(this._shader.program),this._gl.uniformMatrix3fv(this._uMatrixLocation,!1,t.data),this._gl.uniform4fv(this._uColorLocation,e.toVec4()),this._gl.uniform1f(this._uDepthLocation,i),this._gl.drawArrays(this._gl.TRIANGLE_FAN,0,this._vertices.length/2)},n.prototype._init=function(){this._positionBuffer=this._gl.createBuffer(),this._gl.bindBuffer(this._gl.ARRAY_BUFFER,this._positionBuffer),this._gl.bufferData(this._gl.ARRAY_BUFFER,new Float32Array(this._vertices),this._gl.STATIC_DRAW);var t=this._shader.getAttributeLocationBy("a_position");this._gl.enableVertexAttribArray(t),this._gl.vertexAttribPointer(t,2,this._gl.FLOAT,!1,0,0)},n);function n(t,e,i){this._gl=t,this._shader=e,this._vertices=i,this._uMatrixLocation=this._shader.getUniformLocationBy("u_matrix"),this._uColorLocation=this._shader.getUniformLocationBy("u_colors"),this._uDepthLocation=this._shader.getUniformLocationBy("u_depth"),this._init()}i.SimpleGeometryColor=o},{}],21:[function(t,e,i){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(i,"__esModule",{value:!0});var r,s=t("./Point"),a=(r=s.Point,n(h,r),h.prototype.inRectangle=function(t){var e=Math.abs(this.x-t.origin.x-t.width/2),i=Math.abs(this.y-t.origin.y-t.height/2);if(e>t.width/2+this.radius)return!1;if(i>t.height/2+this.radius)return!1;if(e<=t.width/2)return!0;if(i<=t.height/2)return!0;var o=e-t.width/2,n=i-t.height/2;return o*o+n*n<=this.radius*this.radius},h);function h(t,e,i){void 0===i&&(i=1);var o=r.call(this,t,e)||this;return o.radius=i,o}i.Circle=a},{"./Point":22}],22:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=t("../Math/Utils"),n=(l.prototype.angleTo=function(t){return Math.atan2(t.y-this.y,t.x-this.x)},l.prototype.angleFrom=function(t){return Math.atan2(this.y-t.y,this.x-t.x)},Object.defineProperty(l.prototype,"isZero",{get:function(){return 0===this.x&&0===this.y},enumerable:!0,configurable:!0}),l.prototype.distanceTo=function(t){var e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)},l.prototype.inRectangle=function(t){return this.inRangeX(t.origin.x,t.origin.x+t.width)&&this.inRangeY(t.origin.y,t.origin.y+t.height)},l.prototype.copy=function(){return new l(this.x,this.y)},l.prototype.makePolygonPoints=function(t,e,i,o){void 0===i&&(i=0);var n=[];t<3&&(t=3);for(var r=2*Math.PI/t,s=0;s<t;s++){var a=i+s*r,h=this.x+e*Math.cos(a),c=this.y-e*Math.sin(a);o?n.push(h,c):n.push(new l(h,c))}return n},l.prototype.roundedCopy=function(t){return void 0===t&&(t=1),new l(o.MathUtils.round(this.x,t),o.MathUtils.round(this.y,t))},l.prototype.inTriangle=function(t,e,i,o){var n,r,s;return s=o?(n=this.signTo(t,e)<0,r=this.signTo(e,i)<0,this.signTo(i,t)<0):(n=this.signTo(t,e)<=0,r=this.signTo(e,i)<=0,this.signTo(i,t)<=0),n===r&&r===s},l.prototype.signTo=function(t,e){return(this.x-e.x)*(t.y-e.y)-(t.x-e.x)*(this.y-e.y)},l.prototype.rotateAround=function(t,e){var i=Math.cos(e),o=Math.sin(e),n=this.x-t.x,r=this.y-t.y;this.translate(n*i+r*o+t.x,-n*o+r*i+t.y)},l.prototype.translate=function(t,e){this.x=t,this.y=e},l.prototype.inCircle=function(t,e){return e?this.distanceTo(t)-t.radius<0:this.distanceTo(t)-t.radius<=0},l.prototype.moveTo=function(t){this.translate(t.x,t.y)},l.prototype.add=function(t){this.x+=t.x,this.y+=t.y},l.prototype.copyAdd=function(t){var e=this.copy();return e.add(t),e},l.prototype.multiply=function(t){this.x*=t.x,this.y*=t.y},l.prototype.inRangeX=function(t,e){return this.x>=Math.min(t,e)&&this.x<=Math.max(t,e)},l.prototype.inRangeY=function(t,e){return this.y>=Math.min(t,e)&&this.y<=Math.max(t,e)},l.prototype.subtract=function(t){this.x-=t.x,this.y-=t.y},l.prototype.divide=function(t){this.x/=t.x,this.y/=t.y},l);function l(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this.x=t,this.y=e}i.Point=n},{"../Math/Utils":3}],23:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=t("./Point"),n=t("./Vector"),r=(Object.defineProperty(s.prototype,"length",{get:function(){return this.start.distanceTo(this.end)},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"vector",{get:function(){return new n.Vector(new o.Point(this.end.x-this.start.x,this.end.y-this.start.y))},enumerable:!0,configurable:!0}),s.prototype.draw=function(t){t.ctx.beginPath(),t.ctx.moveTo(this.start.x,this.start.y),t.ctx.lineTo(this.end.x,this.end.y),t.ctx.stroke(),t.ctx.closePath()},s);function s(t,e){this.start=t,this.end=e}i.Segment=r},{"./Point":22,"./Vector":24}],24:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=t("./Point"),n=t("./Segment"),r=(Object.defineProperty(s.prototype,"angle",{get:function(){return this._origin.angleTo(this.destination)},set:function(t){this.destination.rotateAround(this._origin,t)},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"length",{get:function(){return this._origin.distanceTo(this.destination)},set:function(t){var e=this.angle;this.destination.translate(Math.cos(e)*t,Math.sin(e)*t)},enumerable:!0,configurable:!0}),s.prototype.copy=function(){return new s(this.destination)},s.prototype.makeSegmentFrom=function(t){return new n.Segment(t.copy(),t.copyAdd(this.destination))},s);function s(t){void 0===t&&(t=new o.Point),this.destination=t,this._origin=new o.Point}i.Vector=r},{"./Point":22,"./Segment":23}],25:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=(n.prototype.createShader=function(t,e){var i=this._gl.createShader(t);if(this._gl.shaderSource(i,e),this._gl.compileShader(i),this._gl.getShaderParameter(i,this._gl.COMPILE_STATUS))return i;console.warn("createShader fail",this._gl.getShaderInfoLog(i)),this._gl.deleteShader(i)},n.prototype.createProgram=function(t,e){var i=this._gl.createProgram();if(this._gl.attachShader(i,t),this._gl.attachShader(i,e),this._gl.linkProgram(i),this._gl.getProgramParameter(i,this._gl.LINK_STATUS))return i;console.warn("createProgram fail",this._gl.getProgramInfoLog(i)),this._gl.deleteProgram(i)},n.prototype.getAttributeLocationBy=function(t){return this._gl.getAttribLocation(this.program,t)},n.prototype.getUniformLocationBy=function(t){return this._gl.getUniformLocation(this.program,t)},n.prototype.destroy=function(){this._gl.deleteProgram(this.program),this._gl.deleteShader(this._fragmentShader),this._gl.deleteShader(this._vertexShader)},n);function n(t,e,i){this._gl=t,this._vertexShader=this.createShader(this._gl.VERTEX_SHADER,e),this._fragmentShader=this.createShader(this._gl.FRAGMENT_SHADER,i),this.program=this.createProgram(this._vertexShader,this._fragmentShader)}i.Shader=o},{}],26:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=t("./core/engine2D/SceneRenderer"),n=t("./core/engine2D/scenes/LinkedParticlesScene"),s=t("./core/engine2D/scenes/ColoredWaveScene"),a=t("./core/engine2D/scenes/TransformScene"),h=t("./core/engine2D/scenes/GLScene"),c=t("./core/engine2D/scenes/BoidsScene"),r=(l.prototype.destroy=function(){this.scene.destroy()},l.prototype.initExample=function(){var t;switch(this._options.demoType){case"example01":this.map=new n.LinkedParticlesScene(this.scene,120),this.scene.draws.push(this.map);break;case"example02":this.map=new s.ColoredWaveScene(this.scene),(t=this.scene.updates).push.apply(t,this.map.particles);break;case"example03":var r=new a.TransformScene(this.scene);r.loadText(),document.getElementById("importText").addEventListener("input",function(t){var e=t.target;r.loadText(e.value)}),document.getElementById("importImg").addEventListener("input",function(t){var e=t.target,i=new FileReader,o=e.files[0],n=document.createElement("img");i.addEventListener("load",function(){n.src=i.result}),n.addEventListener("load",function(){r.loadImage(n)}),o&&i.readAsDataURL(o)}),this.scene.draws.push(r),this.scene.updates.push(r);break;case"example04":this.map=new h.GLScene(this.scene),this.scene.draws.push(this.map),this.scene.updates.push(this.map);break;case"example05":this.map=new c.BoidsScene(this.scene),this.scene.draws.push(this.map),this.scene.updates.push(this.map)}},l);function l(t,e){switch(void 0===e&&(e={}),(this._options=e).demoType){case"example01":case"example02":case"example03":this.scene=new o.SceneRenderer(t);break;case"example04":case"example05":this.scene=new o.SceneRenderer(t,!0)}e.demoType&&this.initExample()}window.JcParticle=r},{"./core/engine2D/SceneRenderer":12,"./core/engine2D/scenes/BoidsScene":15,"./core/engine2D/scenes/ColoredWaveScene":16,"./core/engine2D/scenes/GLScene":17,"./core/engine2D/scenes/LinkedParticlesScene":18,"./core/engine2D/scenes/TransformScene":19}]},{},[26]);