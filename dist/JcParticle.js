!function r(s,a,c){function h(e,t){if(!a[e]){if(!s[e]){var i="function"==typeof require&&require;if(!t&&i)return i(e,!0);if(p)return p(e,!0);var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}var o=a[e]={exports:{}};s[e][0].call(o.exports,function(t){return h(s[e][1][t]||t)},o,o.exports,r,s,a,c)}return a[e].exports}for(var p="function"==typeof require&&require,t=0;t<c.length;t++)h(c[t]);return h}({1:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=t("./Position"),o=t("../geometry2D/Point"),r=t("./Rotation"),s=(a.prototype.update=function(t){this.position.update(t),this.rotation.update(t)},a.prototype.offsetX=function(t){return t*this.scale.x+this.position.x},a.prototype.offsetY=function(t){return t*this.scale.y+this.position.y},a.prototype.reverseX=function(t){return(t+this.position.x)/this.scale.x},a.prototype.reverseY=function(t){return(t+this.position.y)/this.scale.y},a);function a(){this.position=new n.Position,this.scale=new o.Point(1,1),this.rotation=new r.Rotation}i.Camera=s},{"../geometry2D/Point":12,"./Position":5,"./Rotation":6}],2:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=t("./Camera"),o=t("./Interaction"),r=(s.prototype.loop=function(){var e=this;this.updates.forEach(function(t){t.update(e)})},Object.defineProperty(s.prototype,"height",{get:function(){return this.container.clientHeight},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"width",{get:function(){return this.container.clientWidth},enumerable:!0,configurable:!0}),s.prototype.animate=function(){var e=this;this.ctx.clearRect(0,0,this.width,this.height),this.draws.forEach(function(t){t.draw(e)}),requestAnimationFrame(this._animateRef)},s.prototype.resize=function(){this.canvas.width=this.width,this.canvas.height=this.height},s.prototype.destroy=function(){window.removeEventListener("resize",this._resizeRef),window.cancelAnimationFrame(this._animationFrame),window.clearInterval(this._interval),this.interaction.destroy()},s);function s(t){this.canvas=document.createElement("canvas"),this.camera=new n.Camera,this.draws=[],this.updates=[],this._resizeRef=this.resize.bind(this),this._animateRef=this.animate.bind(this),this._loopRef=this.loop.bind(this),this.container=document.getElementById(t),this.ctx=this.canvas.getContext("2d"),this.canvas.style.display="block",this.ctx.imageSmoothingEnabled=!0,this.container.appendChild(this.canvas),window.addEventListener("resize",this._resizeRef),this.resize(),this._animationFrame=requestAnimationFrame(this._animateRef),this._interval=setInterval(this._loopRef,1e3/60),this.interaction=new o.Interaction(this)}i.CanvasScene=r},{"./Camera":1,"./Interaction":3}],3:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=(o.prototype.destroy=function(){this._scene.canvas.removeEventListener("click",this._refOnClick),this._scene.canvas.removeEventListener("mousemove",this._refOnHover)},o.prototype._OnClick=function(e){this.subscribesClick.forEach(function(t){t(e)})},o.prototype._OnHover=function(e){this.subscribesHover.forEach(function(t){t(e)})},o);function o(t){this._scene=t,this.subscribesClick=[],this.subscribesHover=[],this._refOnClick=this._OnClick.bind(this),this._refOnHover=this._OnHover.bind(this),this._scene.canvas.addEventListener("click",this._refOnClick),this._scene.canvas.addEventListener("mousemove",this._refOnHover)}i.Interaction=n},{}],4:[function(t,e,i){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(i,"__esModule",{value:!0});var r,s=t("../geometry2D/Segment"),a=(r=s.Segment,o(c,r),Object.defineProperty(c.prototype,"alpha",{get:function(){return Math.round(10*(1-this.length/this.maxlength))/10},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"startColor",{get:function(){return"hsla("+this.start.hue+", "+this.start.saturation+"%, "+this.start.light+"%, "+this.alpha+")"},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"endColor",{get:function(){return"hsla("+this.end.hue+", "+this.end.saturation+"%, "+this.end.light+"%, "+this.alpha+")"},enumerable:!0,configurable:!0}),c.prototype.draw=function(t){t.ctx.save();var e=t.ctx.createLinearGradient(this.start.x,this.start.y,this.end.x,this.end.y);e.addColorStop(0,this.startColor),e.addColorStop(1,this.endColor),t.ctx.strokeStyle=e,t.ctx.lineWidth=this.width,t.ctx.beginPath(),t.ctx.moveTo(this.start.x,this.start.y),t.ctx.lineTo(this.end.x,this.end.y),t.ctx.stroke(),t.ctx.closePath(),t.ctx.restore()},c);function c(){var t=null!==r&&r.apply(this,arguments)||this;return t.width=2,t.maxlength=50,t}i.Link=a},{"../geometry2D/Segment":13}],5:[function(t,e,i){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(i,"__esModule",{value:!0});var r,s=t("../geometry2D/Point"),a=(r=s.Point,o(c,r),c.prototype.update=function(t){this._isTargeting?this._traveling():(this.velocity.multiply(this.friction),this.add(this.velocity))},c.prototype.setTarget=function(t,e,i,n){this._targetPoint=t.copy(),this._easing=i,this._originPoint=this.copy(),this._time=e,this._isTargeting=!0,this._timeCount=0,this._callback=n},c.prototype._traveling=function(){this._timeCount<=this._time?(this.x=this._easing(this._timeCount,this._originPoint.x,this._targetPoint.x-this._originPoint.x,this._time),this.y=this._easing(this._timeCount,this._originPoint.y,this._targetPoint.y-this._originPoint.y,this._time),this._timeCount++):(this._isTargeting=!1,this._callback&&this._callback())},c);function c(){var t=null!==r&&r.apply(this,arguments)||this;return t.friction=new s.Point(1,1),t.velocity=new s.Point(0,0),t._timeCount=0,t}i.Position=a},{"../geometry2D/Point":12}],6:[function(t,e,i){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(i,"__esModule",{value:!0});var r,s=t("../geometry2D/Point"),a=(r=s.Point,o(c,r),c.prototype.update=function(t){this.velocity*=this.friction,this.angle+=this.velocity},c);function c(){var t=null!==r&&r.apply(this,arguments)||this;return t.friction=1,t.velocity=0,t.angle=0,t}i.Rotation=a},{"../geometry2D/Point":12}],7:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r=t("../particles/WaveParticle"),n=(o.prototype.update=function(t){},o.prototype.draw=function(t){},o);function o(t){this._scene=t,this.particles=[];for(var e=1;e<50;e++){var i=e/50*this._scene.width,n=this._scene.height/2,o=new r.WaveParticle(i,n,45,.35*e);this.particles.push(o)}}i.ColoredWaveMap=n},{"../particles/WaveParticle":11}],8:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=t("../particles/ColoredParticle"),s=t("../Link"),o=(r.prototype.update=function(t){},r.prototype.addParticle=function(){var t=new n.ColoredParticle(Math.random()*this._scene.width,Math.random()*this._scene.height);t.radius=Math.round(2*Math.random()+1),t.velocity.translate(4*Math.random()-2,4*Math.random()-2),t.randomColor(),this.particles.push(t)},r.prototype.draw=function(t){for(var e=0;e<this._particlesNumber;e++)for(var i=e+1;i<this._particlesNumber;i++){var n=this.particles[e],o=this.particles[i];if(!(n.distanceTo(o)>this.maxLinkLength)){var r=new s.Link(n,o);r.maxlength=this.maxLinkLength,r.draw(t)}}},r);function r(t,e){this._scene=t,this._particlesNumber=e,this.particles=[],this.maxLinkLength=100;for(var i=0;i<this._particlesNumber;i++)this.addParticle()}i.LinkedParticlesMap=o},{"../Link":4,"../particles/ColoredParticle":9}],9:[function(t,e,i){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(i,"__esModule",{value:!0});var r,s=t("./Particle"),a=(r=s.Particle,o(c,r),Object.defineProperty(c.prototype,"color",{get:function(){return"hsla("+this.hue+","+this.saturation+"%,"+this.light+"%,"+this.alpha+")"},enumerable:!0,configurable:!0}),c.prototype.randomColor=function(){this.hue=Math.round(360*Math.random()),this.saturation=Math.round(100*Math.random()),this.light=Math.round(100*Math.random())},c.prototype.draw=function(t){t.ctx.save(),t.ctx.fillStyle=this.color,t.ctx.beginPath(),t.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI),t.ctx.fill(),t.ctx.closePath(),t.ctx.restore()},c);function c(){var t=null!==r&&r.apply(this,arguments)||this;return t.radius=1,t.hue=0,t.saturation=0,t.light=0,t.alpha=1,t}i.ColoredParticle=a},{"./Particle":10}],10:[function(t,e,i){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(i,"__esModule",{value:!0});var r,s=t("../Position"),a=(r=s.Position,o(c,r),c.prototype.update=function(t){r.prototype.update.call(this,t),this.bounceOnBox?(this.bounceBox("x",t.width),this.bounceBox("x",0,!0),this.bounceBox("y",t.height),this.bounceBox("y",0,!0)):(this.teleportBox("x",t.width+this.distanceDisappear,-this.distanceDisappear),this.teleportBox("x",-this.distanceDisappear,t.width+this.distanceDisappear,!0),this.teleportBox("y",t.height+this.distanceDisappear,-this.distanceDisappear),this.teleportBox("y",-this.distanceDisappear,t.height+this.distanceDisappear,!0))},c.prototype.teleportBox=function(t,e,i,n){(n?this[t]<e:this[t]>e)&&(this[t]=i)},c.prototype.bounceBox=function(t,e,i){(i?this[t]<e:this[t]>e)&&(this[t]=e,this.velocity[t]*=-1)},c.prototype.draw=function(t){t.ctx.save(),t.ctx.beginPath(),t.ctx.arc(this.x,this.y,1,0,2*Math.PI),t.ctx.fill(),t.ctx.closePath(),t.ctx.restore()},c);function c(){var t=null!==r&&r.apply(this,arguments)||this;return t.bounceOnBox=!1,t.distanceDisappear=50,t}i.Particle=a},{"../Position":5}],11:[function(t,e,i){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(i,"__esModule",{value:!0});var r,s=t("./ColoredParticle"),a=(r=s.ColoredParticle,o(c,r),c.prototype.update=function(t){r.prototype.update.call(this,t),this._increment>2*Math.PI&&(this._increment-=2*Math.PI),this.y=this._centerY+Math.cos(this._increment)*this._maxHeight,this._increment+=this.speed},Object.defineProperty(c.prototype,"ellipseHeight",{get:function(){return this._centerY+this._maxHeight-this.y},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"ellipseRotation",{get:function(){return(1-this.ellipseHeight/this._maxHeight)*Math.PI/12},enumerable:!0,configurable:!0}),c.prototype.draw=function(t){t.ctx.save(),t.ctx.fillStyle=this.color,t.ctx.beginPath(),t.ctx.ellipse(this.x,this._centerY,3,this.ellipseHeight,this.ellipseRotation,0,2*Math.PI),t.ctx.fill(),t.ctx.closePath(),t.ctx.restore()},c);function c(t,e,i,n){var o=r.call(this,t,e)||this;return o._maxHeight=i,o._increment=n,o.speed=.04,o._centerY=e,o.y=o._centerY+Math.cos(o._increment)*o._maxHeight,o.randomColor(),o}i.WaveParticle=a},{"./ColoredParticle":9}],12:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=(o.prototype.angleTo=function(t){return Math.atan2(t.y-this.y,t.x-this.x)},o.prototype.distanceTo=function(t){var e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)},o.prototype.inRectangle=function(t){return this.inRangeX(t.origin.x,t.origin.x+t.width)&&this.inRangeY(t.origin.y,t.origin.y+t.height)},o.prototype.copy=function(){return new o(this.x,this.y)},o.prototype.roundedCopy=function(t){return void 0===t&&(t=1),new o(Math.round(this.x*t)/t,Math.round(this.y*t)/t)},o.prototype.inTriangle=function(t,e,i,n){var o,r,s;return s=n?(o=this.signTo(t,e)<0,r=this.signTo(e,i)<0,this.signTo(i,t)<0):(o=this.signTo(t,e)<=0,r=this.signTo(e,i)<=0,this.signTo(i,t)<=0),o===r&&r===s},o.prototype.signTo=function(t,e){return(this.x-e.x)*(t.y-e.y)-(t.x-e.x)*(this.y-e.y)},o.prototype.rotateAround=function(t,e){var i=Math.cos(e),n=Math.sin(e);this.moveTo(new o(i*(this.x-t.x)+n*(this.y-t.y)+t.x,i*(this.y-t.y)-n*(this.x-t.x)+t.y))},o.prototype.translate=function(t,e){this.x=t,this.y=e},o.prototype.inCircle=function(t){return this.distanceTo(t)-t.radius<=0},o.prototype.moveTo=function(t){this.translate(t.x,t.y)},o.prototype.add=function(t){this.x+=t.x,this.y+=t.y},o.prototype.multiply=function(t){this.x*=t.x,this.y*=t.y},o.prototype.inRangeX=function(t,e){return this.x>=Math.min(t,e)&&this.x<=Math.max(t,e)},o.prototype.inRangeY=function(t,e){return this.y>=Math.min(t,e)&&this.y<=Math.max(t,e)},o.prototype.subtract=function(t){this.x-=t.x,this.y-=t.y},o.prototype.divide=function(t){this.x/=t.x,this.y/=t.y},o);function o(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this.x=t,this.y=e}i.Point=n},{}],13:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=(Object.defineProperty(o.prototype,"length",{get:function(){return this.start.distanceTo(this.end)},enumerable:!0,configurable:!0}),o);function o(t,e){this.start=t,this.end=e}i.Segment=n},{}],14:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=t("./class/engine2D/CanvasScene"),o=t("./class/engine2D/maps/LinkedParticlesMap"),r=t("./class/engine2D/maps/ColoredWaveMap"),s=(a.prototype.initExample=function(){var t,e,i,n;switch(this._options.demoType){case"example01":this.map=new o.LinkedParticlesMap(this.scene,70),(t=this.scene.draws).push.apply(t,this.map.particles),(e=this.scene.updates).push.apply(e,this.map.particles),this.scene.draws.push(this.map);break;case"example02":this.map=new r.ColoredWaveMap(this.scene),(i=this.scene.draws).push.apply(i,this.map.particles),(n=this.scene.updates).push.apply(n,this.map.particles)}},a.prototype.destroy=function(){this.scene.destroy()},a);function a(t,e){void 0===e&&(e={}),this._options=e,this.scene=new n.CanvasScene(t),e.demoType&&this.initExample()}window.JcParticle=s},{"./class/engine2D/CanvasScene":2,"./class/engine2D/maps/ColoredWaveMap":7,"./class/engine2D/maps/LinkedParticlesMap":8}]},{},[14]);