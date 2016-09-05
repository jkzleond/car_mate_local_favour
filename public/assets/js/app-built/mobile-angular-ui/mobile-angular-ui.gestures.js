(function(){angular.module("mobile-angular-ui.gestures.drag",["mobile-angular-ui.gestures.touch","mobile-angular-ui.gestures.transform"]).provider("$drag",function(){this.$get=["$touch","$transform",function(e,t){var n=document.createElement("style");n.appendChild(document.createTextNode("")),document.head.appendChild(n);var r=n.sheet;return r.insertRule("html .ui-drag-move{z-index: 99999 !important;}",0),r.insertRule("html .ui-drag-move{-webkit-transition: none !important;-moz-transition: none !important;-o-transition: none !important;-ms-transition: none !important;transition: none !important;}",0),r.insertRule("html .ui-drag-move, html .ui-drag-move *{-webkit-touch-callout: none !important;-webkit-user-select: none !important;-khtml-user-select: none !important;-moz-user-select: none !important;-ms-user-select: none !important;user-select: none !important;}",0),n=r=null,{NULL_TRANSFORM:function(e,t){return t},TRANSLATE_BOTH:function(e,t,n){return t.translateX=n.distanceX,t.translateY=n.distanceY,t},TRANSLATE_HORIZONTAL:function(e,t,n){return t.translateX=n.distanceX,t.translateY=0,t},TRANSLATE_UP:function(e,t,n){return t.translateY=n.distanceY<=0?n.distanceY:0,t.translateX=0,t},TRANSLATE_DOWN:function(e,t,n){return t.translateY=n.distanceY>=0?n.distanceY:0,t.translateX=0,t},TRANSLATE_LEFT:function(e,t,n){return t.translateX=n.distanceX<=0?n.distanceX:0,t.translateY=0,t},TRANSLATE_RIGHT:function(e,t,n){return t.translateX=n.distanceX>=0?n.distanceX:0,t.translateY=0,t},TRANSLATE_VERTICAL:function(e,t,n){return t.translateX=0,t.translateY=n.distanceY,t},TRANSLATE_INSIDE:function(e){return e=e.length?e[0]:e,function(t,n,r){t=t.length?t[0]:t;var i=t.getBoundingClientRect(),s=e instanceof Element?e.getBoundingClientRect():e,o,u;return i.width>=s.width?o=0:i.right+r.stepX>s.right?o=s.right-i.right:i.left+r.stepX<s.left?o=s.left-i.left:o=r.stepX,i.height>=s.height?u=0:i.bottom+r.stepY>s.bottom?u=s.bottom-i.bottom:i.top+r.stepY<s.top?u=s.top-i.top:u=r.stepY,n.translateX+=o,n.translateY+=u,n}},bind:function(n,r,i){n=angular.element(n),r=r||{},i=i||{};var s=r.start,o=r.end,u=r.move,a=r.cancel,f=r.transform||this.TRANSLATE_BOTH,l=n[0],c=t.get(n),h=l.getBoundingClientRect(),p,d,v=!1,m=function(){return v},g=function(){v=!1,p=d=null,n.removeClass("ui-drag-move")},y=function(){t.set(l,c)},b=function(){t.set(l,p||c)},w=function(){v=!0,d=l.getBoundingClientRect(),p=t.get(l),n.addClass("ui-drag-move")},E=function(e){return e=angular.extend({},e),e.originalTransform=c,e.originalRect=h,e.startRect=d,e.rect=l.getBoundingClientRect(),e.startTransform=p,e.transform=t.get(l),e.reset=y,e.undo=b,e},S=function(e,r){r.preventDefault();if(!m())w(),s&&s(E(e),r);else{e=E(e);var i=f(n,angular.extend({},e.transform),e,r);t.set(l,i),u&&u(e,r)}},x=function(e,t){if(!m())return;t.__UiSwipeHandled__=!0,e=E(e),g(),o&&o(e,t)},T=function(e,t){if(!m())return;e=E(e),b(),g(),a&&a(e,t)};return e.bind(n,{move:S,end:x,cancel:T},i)}}}]})})(),function(){var e=angular.module("mobile-angular-ui.gestures.swipe",["mobile-angular-ui.gestures.touch"]);e.factory("$swipe",["$touch",function(e){var t=500,n=10,r=10,i=10,s=Math.abs,o={movementThreshold:n,valid:function(e){var n=s(e.angle);n=n>=90?n-90:n;var o=e.total-e.distance<=r,u=n<=i||n>=90-i,a=e.averageVelocity>=t;return o&&u&&a}};return{bind:function(t,n,r){return r=angular.extend({},o,r||{}),e.bind(t,n,r)}}}]),angular.forEach(["ui","ng"],function(t){angular.forEach(["Left","Right"],function(n){var r=t+"Swipe"+n;e.directive(r,["$swipe","$parse",function(e,t){return{link:function(i,s,o){var u=t(o[r]);e.bind(s,{end:function(e,t){e.direction===n.toUpperCase()&&(t.__UiSwipeHandled__||(t.__UiSwipeHandled__=!0,i.$apply(function(){u(i,{$touch:e})})))}})}}}])})})}(),function(){var e=angular.module("mobile-angular-ui.gestures.touch",[]);e.provider("$touch",function(){var e=function(){return!0},t=1,n={mouse:{start:"mousedown",move:"mousemove",end:"mouseup"},touch:{start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel"}},r=["mouse","touch"],i=function(e){return e[0].ownerDocument.documentElement.getBoundingClientRect()};this.setPointerEvents=function(e){n=e,r=Object.keys(n)},this.setValid=function(t){e=t},this.setMovementThreshold=function(e){t=e},this.setSensitiveArea=function(e){i=e};var s=Math.abs,o=Math.atan2,u=Math.sqrt,a=function(e){var t=e.touches&&e.touches.length?e.touches:[e],n=e.changedTouches&&e.changedTouches[0]||e.originalEvent&&e.originalEvent.changedTouches&&e.originalEvent.changedTouches[0]||t[0].originalEvent||t[0];return{x:n.clientX,y:n.clientY}},f=function(e,t){var r=[];return angular.forEach(e,function(e){var i=n[e][t];i&&r.push(i)}),r.join(" ")},l=function(){return new Date},c=function(e,t){return t=t||l(),s(t-e)},h=function(e,t){return u(e*e+t*t)},p=function(e,t,n,r){n=n||{},r=r||{};var i=l(),u=n.timestamp||i,a=r.timestamp||u,f=t.x,p=t.y,d=n.x||f,v=n.y||p,m=r.x||d,g=r.y||v,y=r.totalX||0,b=r.totalY||0,w=y+s(f-m),E=b+s(p-g),S=h(w,E),x=c(i,u),T=c(i,a),N=f-m,C=p-g,k=h(N,C),L=f-d,A=p-v,O=h(L,A),M=T>0?s(k/(T/1e3)):0,_=x>0?s(S/(x/1e3)):0,D=s(L)>s(A)?L<0?"LEFT":"RIGHT":A<0?"TOP":"BOTTOM",P=L!==0||A!==0?o(A,L)*(180/Math.PI):null;return P=P===-180?180:P,{type:e,timestamp:i,duration:x,startX:d,startY:v,prevX:m,prevY:g,x:t.x,y:t.y,step:k,stepX:N,stepY:C,velocity:M,averageVelocity:_,distance:O,distanceX:L,distanceY:A,total:S,totalX:w,totalY:E,direction:D,angle:P}};this.$get=[function(){return{bind:function(n,s,o){n=angular.element(n),o=o||{};var u=o.pointerTypes||r,l=o.valid===undefined?e:o.valid,c=o.movementThreshold===undefined?t:o.valid,h=o.sensitiveArea===undefined?i:o.sensitiveArea,d,v,m=f(u,"start"),g=f(u,"end"),y=f(u,"move"),b=f(u,"cancel"),w=s.start,E=s.end,S=s.move,x=s.cancel,T=angular.element(n[0].ownerDocument),N=function(){d=v=null,T.off(y,A),T.off(g,O),b&&T.off(b,L)},C=function(){return!!d},k=function(e){if(e.touches&&e.touches.length>1)return;v=d=p("touchstart",a(e)),T.on(y,A),T.on(g,O),b&&T.on(b,L),w&&w(d,e)},L=function(e){var t=p("touchcancel",a(e),d,v);N(),x&&x(t,e)},A=function(e){if(e.touches&&e.touches.length>1)return;if(!C())return;var t=a(e),r=typeof h=="function"?h(n):h;r=r.length?r[0]:r;var i=r instanceof Element?r.getBoundingClientRect():r;if(t.x<i.left||t.x>i.right||t.y<i.top||t.y>i.bottom)return;var s=p("touchmove",t,d,v),o=s.totalX,u=s.totalY;v=s;if(o<c&&u<c)return;l(s,e)&&((e.cancelable===undefined||e.cancelable)&&e.preventDefault(),S&&S(s,e))},O=function(e){if(e.touches&&e.touches.length>1)return;if(!C())return;var t=angular.extend({},v,{type:"touchend"});l(t,e)&&((e.cancelable===undefined||e.cancelable)&&e.preventDefault(),E&&setTimeout(function(){E(t,e)},0)),N()};return n.on(m,k),function(){n&&(n.off(m,k),b&&T.off(b,L),T.off(y,A),T.off(g,O),n=T=m=b=y=g=k=L=A=O=u=l=c=h=null)}}}}]})}(),function(){var e=angular.module("mobile-angular-ui.gestures.transform",[]);e.factory("$transform",function(){var e,t,n,r=["","webkit","Moz","O","ms"],i=document.createElement("div");for(var s=0;s<r.length;s++){var o=r[s];if(o+"Perspective"in i.style){e=o===""?"":"-"+o.toLowerCase()+"-",n=o+(o===""?"transform":"Transform"),t=e+"transform";break}}i=null;var u=function(e){e=e.length?e[0]:e;var n=window.getComputedStyle(e,null).getPropertyValue(t);return n},a=function(e,t){e=e.length?e[0]:e,e.style[n]=t},f=1e-7,l=function(e){return e*180/Math.PI},c=Math.sqrt,h=Math.asin,p=Math.atan2,d=Math.cos,v=Math.abs,m=Math.floor,g=function(e){var t=[[],[],[],[]];for(var n=0;n<e.length;n++)for(var r=0;r<e[n].length;r++)t[n][r]=e[n][r];return t},y=function(e,t,n,r){return e*r-t*n},b=function(e,t,n,r,i,s,o,u,a){return e*y(i,s,u,a)-r*y(t,n,u,a)+o*y(t,n,i,s)},w=function(e){var t=e[0][0],n=e[0][1],r=e[0][2],i=e[0][3],s=e[1][0],o=e[1][1],u=e[1][2],a=e[1][3],f=e[2][0],l=e[2][1],c=e[2][2],h=e[2][3],p=e[3][0],d=e[3][1],v=e[3][2],m=e[3][3];return t*b(o,l,d,u,c,v,a,h,m)-n*b(s,f,p,u,c,v,a,h,m)+r*b(s,f,p,o,l,d,a,h,m)-i*b(s,f,p,o,l,d,u,c,v)},E=function(e){var t=[[],[],[],[]],n=e[0][0],r=e[0][1],i=e[0][2],s=e[0][3],o=e[1][0],u=e[1][1],a=e[1][2],f=e[1][3],l=e[2][0],c=e[2][1],h=e[2][2],p=e[2][3],d=e[3][0],v=e[3][1],m=e[3][2],g=e[3][3];return t[0][0]=b(u,c,v,a,h,m,f,p,g),t[1][0]=-b(o,l,d,a,h,m,f,p,g),t[2][0]=b(o,l,d,u,c,v,f,p,g),t[3][0]=-b(o,l,d,u,c,v,a,h,m),t[0][1]=-b(r,c,v,i,h,m,s,p,g),t[1][1]=b(n,l,d,i,h,m,s,p,g),t[2][1]=-b(n,l,d,r,c,v,s,p,g),t[3][1]=b(n,l,d,r,c,v,i,h,m),t[0][2]=b(r,u,v,i,a,m,s,f,g),t[1][2]=-b(n,o,d,i,a,m,s,f,g),t[2][2]=b(n,o,d,r,u,v,s,f,g),t[3][2]=-b(n,o,d,r,u,v,i,a,m),t[0][3]=-b(r,u,c,i,a,h,s,f,p),t[1][3]=b(n,o,l,i,a,h,s,f,p),t[2][3]=-b(n,o,l,r,u,c,s,f,p),t[3][3]=b(n,o,l,r,u,c,i,a,h),t},S=function(e){var t=E(e),n=w(e);if(v(n)<f)return!1;for(var r=0;r<4;r++)for(var i=0;i<4;i++)t[r][i]=t[r][i]/n;return t},x=function(e){var t=[[],[],[],[]];for(var n=0;n<4;n++)for(var r=0;r<4;r++)t[n][r]=e[r][n];return t},T=function(e,t){var n=[];return n[0]=e[0]*t[0][0]+e[1]*t[1][0]+e[2]*t[2][0]+e[3]*t[3][0],n[1]=e[0]*t[0][1]+e[1]*t[1][1]+e[2]*t[2][1]+e[3]*t[3][1],n[2]=e[0]*t[0][2]+e[1]*t[1][2]+e[2]*t[2][2]+e[3]*t[3][2],n[3]=e[0]*t[0][3]+e[1]*t[1][3]+e[2]*t[2][3]+e[3]*t[3][3],n},N=function(e){return c(e[0]*e[0]+e[1]*e[1]+e[2]*e[2])},C=function(e,t){var n=[],r=N(e);if(r!==0){var i=t/r;n[0]*=i,n[1]*=i,n[2]*=i}return n},k=function(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]},L=function(e,t,n,r){var i=[];return i[0]=n*e[0]+r*t[0],i[1]=n*e[1]+r*t[1],i[2]=n*e[2]+r*t[2],i},A=function(e,t){var n=[];return n[0]=e[1]*t[2]-e[2]*t[1],n[1]=e[2]*t[0]-e[0]*t[2],n[2]=e[0]*t[1]-e[1]*t[0],n},O=function(e){var t={},n=g(e),r,i;if(n[3][3]===0)return!1;for(r=0;r<4;r++)for(i=0;i<4;i++)n[r][i]/=n[3][3];var s=g(n);for(r=0;r<3;r++)s[r][3]=0;s[3][3]=1;if(w(s)===0)return!1;if(n[0][3]!==0||n[1][3]!==0||n[2][3]!==0){var o=[];o[0]=n[0][3],o[1]=n[1][3],o[2]=n[2][3],o[3]=n[3][3];var u=S(s),a=x(u),f=T(o,a);t.perspectiveX=f[0],t.perspectiveY=f[1],t.perspectiveZ=f[2],t.perspectiveW=f[3],n[0][3]=n[1][3]=n[2][3]=0,n[3][3]=1}else t.perspectiveX=t.perspectiveY=t.perspectiveZ=0,t.perspectiveW=1;t.translateX=n[3][0],n[3][0]=0,t.translateY=n[3][1],n[3][1]=0,t.translateZ=n[3][2],n[3][2]=0;var c=[[],[],[]],v;for(r=0;r<3;r++)c[r][0]=n[r][0],c[r][1]=n[r][1],c[r][2]=n[r][2];t.scaleX=N(c[0]),C(c[0],1),t.skewXY=k(c[0],c[1]),L(c[1],c[0],c[1],1,-t.skewXY),t.scaleY=N(c[1]),C(c[1],1),t.skewXY/=t.scaleY,t.skewXZ=k(c[0],c[2]),L(c[2],c[0],c[2],1,-t.skewXZ),t.skewYZ=k(c[1],c[2]),L(c[2],c[1],c[2],1,-t.skewYZ),t.scaleZ=N(c[2]),C(c[2],1),t.skewXZ/=t.scaleZ,t.skewYZ/=t.scaleZ,v=A(c[1],c[2]);if(k(c[0],v)<0)for(r=0;r<3;r++)t.scaleX*=-1,c[r][0]*=-1,c[r][1]*=-1,c[r][2]*=-1;return t.rotateY=l(h(-c[0][2]))||0,d(t.rotateY)!==0?(t.rotateX=l(p(c[1][2],c[2][2]))||0,t.rotateZ=l(p(c[0][1],c[0][0]))||0):(t.rotateX=l(p(-c[2][0],c[1][1]))||0,t.rotateZ=0),t},M=function(e,t){var n=e||t||0;return""+n.toFixed(20)},_=function(e,t){return M(e,t)+"px"},D=function(e,t){return M(e,t)+"deg"};return{fromCssMatrix:function(e){var t=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];if(e&&e!=="none"){var n=e.split("(")[1].split(")")[0].split(",").map(Number);if(e.match(/^matrix\(/))t[0][0]=n[0],t[1][0]=n[1],t[0][1]=n[2],t[1][1]=n[3],t[3][0]=n[4],t[3][1]=n[5];else for(var r=0;r<16;r++){var i=m(r/4),s=r%4;t[i][s]=n[r]}}return O(t)},toCss:function(e){var t=[M(e.perspectiveX),M(e.perspectiveY),M(e.perspectiveZ),M(e.perspectiveW,1)],n=[_(e.translateX),_(e.translateY),_(e.translateZ)],r=[M(e.scaleX),M(e.scaleY),M(e.scaleZ)],i=[D(e.rotateX),D(e.rotateY),D(e.rotateZ)],s=[M(e.skewXY),M(e.skewXZ),M(e.skewYZ)];return["matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,"+t.join(",")+")","translate3d("+n.join(",")+")","rotateX("+i[0]+") rotateY("+i[1]+") rotateZ("+i[2]+")","matrix3d(1,0,0,0,0,1,0,0,0,"+s[2]+",1,0,0,0,0,1)","matrix3d(1,0,0,0,0,1,0,0,"+s[1]+",0,1,0,0,0,0,1)","matrix3d(1,0,0,0,"+s[0]+",1,0,0,0,0,1,0,0,0,0,1)","scale3d("+r.join(",")+")"].join(" ")},get:function(e){return this.fromCssMatrix(u(e))},set:function(e,t){var n=typeof t=="string"?t:this.toCss(t);a(e,n)}}})}(),function(){angular.module("mobile-angular-ui.gestures",["mobile-angular-ui.gestures.drag","mobile-angular-ui.gestures.swipe","mobile-angular-ui.gestures.transform"])}();