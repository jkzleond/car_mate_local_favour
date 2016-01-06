/**
 * jqPlot
 * Pure JavaScript plotting plugin using jQuery
 *
 * Version: 1.0.8
 * Revision: 1250
 *
 * Copyright (c) 2009-2013 Chris Leonello
 * jqPlot is currently available for use in all personal or commercial projects 
 * under both the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL 
 * version 2.0 (http://www.gnu.org/licenses/gpl-2.0.html) licenses. This means that you can 
 * choose the license that best suits your project and use it accordingly. 
 *
 * Although not required, the author would appreciate an email letting him 
 * know of any substantial use of jqPlot.  You can reach the author at: 
 * chris at jqplot dot com or see http://www.jqplot.com/info.php .
 *
 * If you are feeling kind and generous, consider supporting the project by
 * making a donation at: http://www.jqplot.com/donate.php .
 *
 * sprintf functions contained in jqplot.sprintf.js by Ash Searle:
 *
 *     version 2007.04.27
 *     author Ash Searle
 *     http://hexmen.com/blog/2007/03/printf-sprintf/
 *     http://hexmen.com/js/sprintf.js
 *     The author (Ash Searle) has placed this code in the public domain:
 *     "This code is unrestricted: you are free to use it however you like."
 * 
 */

(function(e){function t(t,n,r,i){this.rendererOptions.barDirection=="horizontal"&&(this._stackAxis="x",this._primaryAxis="_yaxis");if(this.rendererOptions.waterfall==1){this._data=e.extend(!0,[],this.data);var s=0,o=!this.rendererOptions.barDirection||this.rendererOptions.barDirection==="vertical"||this.transposedData===!1?1:0;for(var u=0;u<this.data.length;u++)s+=this.data[u][o],u>0&&(this.data[u][o]+=this.data[u-1][o]);this.data[this.data.length]=o==1?[this.data.length+1,s]:[s,this.data.length+1],this._data[this._data.length]=o==1?[this._data.length+1,s]:[s,this._data.length+1]}if(this.rendererOptions.groups>1){this.breakOnNull=!0;var a=this.data.length,f=parseInt(a/this.rendererOptions.groups,10),l=0;for(var u=f;u<a;u+=f)this.data.splice(u+l,0,[null,null]),this._plotData.splice(u+l,0,[null,null]),this._stackData.splice(u+l,0,[null,null]),l++;for(u=0;u<this.data.length;u++)this._primaryAxis=="_xaxis"?(this.data[u][0]=u+1,this._plotData[u][0]=u+1,this._stackData[u][0]=u+1):(this.data[u][1]=u+1,this._plotData[u][1]=u+1,this._stackData[u][1]=u+1)}}function n(t){var n=[];for(var r=0;r<t.length;r++){var i=e.jqplot.getColorComponents(t[r]),s=[i[0],i[1],i[2]],o=s[0]+s[1]+s[2];for(var u=0;u<3;u++)s[u]=o>570?s[u]*.8:s[u]+.3*(255-s[u]),s[u]=parseInt(s[u],10);n.push("rgb("+s[0]+","+s[1]+","+s[2]+")")}return n}function r(e,t,n,i,s){var o=e,u=e-1,a,f,l=s==="x"?0:1;return o>0?(f=i.series[u]._plotData[t][l],n*f<0?a=r(u,t,n,i,s):a=i.series[u].gridData[t][l]):a=l===0?i.series[o]._xaxis.series_u2p(0):i.series[o]._yaxis.series_u2p(0),a}function i(t,n,r){for(var i=0;i<this.series.length;i++)this.series[i].renderer.constructor==e.jqplot.BarRenderer&&this.series[i].highlightMouseOver&&(this.series[i].highlightMouseDown=!1)}function s(){this.plugins.barRenderer&&this.plugins.barRenderer.highlightCanvas&&(this.plugins.barRenderer.highlightCanvas.resetCanvas(),this.plugins.barRenderer.highlightCanvas=null),this.plugins.barRenderer={highlightedSeriesIndex:null},this.plugins.barRenderer.highlightCanvas=new e.jqplot.GenericCanvas,this.eventCanvas._elem.before(this.plugins.barRenderer.highlightCanvas.createElement(this._gridPadding,"jqplot-barRenderer-highlight-canvas",this._plotDimensions,this)),this.plugins.barRenderer.highlightCanvas.setContext(),this.eventCanvas._elem.bind("mouseleave",{plot:this},function(e){u(e.data.plot)})}function o(e,t,n,r){var i=e.series[t],s=e.plugins.barRenderer.highlightCanvas;s._ctx.clearRect(0,0,s._ctx.canvas.width,s._ctx.canvas.height),i._highlightedPoint=n,e.plugins.barRenderer.highlightedSeriesIndex=t;var o={fillStyle:i.highlightColors[n]};i.renderer.shapeRenderer.draw(s._ctx,r,o),s=null}function u(e){var t=e.plugins.barRenderer.highlightCanvas;t._ctx.clearRect(0,0,t._ctx.canvas.width,t._ctx.canvas.height);for(var n=0;n<e.series.length;n++)e.series[n]._highlightedPoint=null;e.plugins.barRenderer.highlightedSeriesIndex=null,e.target.trigger("jqplotDataUnhighlight"),t=null}function a(e,t,n,r,i){if(r){var s=[r.seriesIndex,r.pointIndex,r.data],a=jQuery.Event("jqplotDataMouseOver");a.pageX=e.pageX,a.pageY=e.pageY,i.target.trigger(a,s);if(i.series[s[0]].show&&i.series[s[0]].highlightMouseOver&&(s[0]!=i.plugins.barRenderer.highlightedSeriesIndex||s[1]!=i.series[s[0]]._highlightedPoint)){var f=jQuery.Event("jqplotDataHighlight");f.which=e.which,f.pageX=e.pageX,f.pageY=e.pageY,i.target.trigger(f,s),o(i,r.seriesIndex,r.pointIndex,r.points)}}else r==null&&u(i)}function f(e,t,n,r,i){if(r){var s=[r.seriesIndex,r.pointIndex,r.data];if(i.series[s[0]].highlightMouseDown&&(s[0]!=i.plugins.barRenderer.highlightedSeriesIndex||s[1]!=i.series[s[0]]._highlightedPoint)){var a=jQuery.Event("jqplotDataHighlight");a.which=e.which,a.pageX=e.pageX,a.pageY=e.pageY,i.target.trigger(a,s),o(i,r.seriesIndex,r.pointIndex,r.points)}}else r==null&&u(i)}function l(e,t,n,r,i){var s=i.plugins.barRenderer.highlightedSeriesIndex;s!=null&&i.series[s].highlightMouseDown&&u(i)}function c(e,t,n,r,i){if(r){var s=[r.seriesIndex,r.pointIndex,r.data],o=jQuery.Event("jqplotDataClick");o.which=e.which,o.pageX=e.pageX,o.pageY=e.pageY,i.target.trigger(o,s)}}function h(e,t,n,r,i){if(r){var s=[r.seriesIndex,r.pointIndex,r.data],o=i.plugins.barRenderer.highlightedSeriesIndex;o!=null&&i.series[o].highlightMouseDown&&u(i);var a=jQuery.Event("jqplotDataRightClick");a.which=e.which,a.pageX=e.pageX,a.pageY=e.pageY,i.target.trigger(a,s)}}e.jqplot.BarRenderer=function(){e.jqplot.LineRenderer.call(this)},e.jqplot.BarRenderer.prototype=new e.jqplot.LineRenderer,e.jqplot.BarRenderer.prototype.constructor=e.jqplot.BarRenderer,e.jqplot.BarRenderer.prototype.init=function(t,n){this.barPadding=8,this.barMargin=10,this.barDirection="vertical",this.barWidth=null,this.shadowOffset=2,this.shadowDepth=5,this.shadowAlpha=.08,this.waterfall=!1,this.groups=1,this.varyBarColor=!1,this.highlightMouseOver=!0,this.highlightMouseDown=!1,this.highlightColors=[],this.transposedData=!0,this.renderer.animation={show:!1,direction:"down",speed:3e3,_supported:!0},this._type="bar",t.highlightMouseDown&&t.highlightMouseOver==null&&(t.highlightMouseOver=!1),e.extend(!0,this,t),e.extend(!0,this.renderer,t),this.fill=!0,this.barDirection==="horizontal"&&this.rendererOptions.animation&&this.rendererOptions.animation.direction==null&&(this.renderer.animation.direction="left"),this.waterfall&&(this.fillToZero=!1,this.disableStack=!0),this.barDirection=="vertical"?(this._primaryAxis="_xaxis",this._stackAxis="y",this.fillAxis="y"):(this._primaryAxis="_yaxis",this._stackAxis="x",this.fillAxis="x"),this._highlightedPoint=null,this._plotSeriesInfo=null,this._dataColors=[],this._barPoints=[];var r={lineJoin:"miter",lineCap:"round",fill:!0,isarc:!1,strokeStyle:this.color,fillStyle:this.color,closePath:this.fill};this.renderer.shapeRenderer.init(r);var o={lineJoin:"miter",lineCap:"round",fill:!0,isarc:!1,angle:this.shadowAngle,offset:this.shadowOffset,alpha:this.shadowAlpha,depth:this.shadowDepth,closePath:this.fill};this.renderer.shadowRenderer.init(o),n.postInitHooks.addOnce(i),n.postDrawHooks.addOnce(s),n.eventListenerHooks.addOnce("jqplotMouseMove",a),n.eventListenerHooks.addOnce("jqplotMouseDown",f),n.eventListenerHooks.addOnce("jqplotMouseUp",l),n.eventListenerHooks.addOnce("jqplotClick",c),n.eventListenerHooks.addOnce("jqplotRightClick",h)},e.jqplot.preSeriesInitHooks.push(t),e.jqplot.BarRenderer.prototype.calcSeriesNumbers=function(){var t=0,n=0,r=this[this._primaryAxis],i,s,o;for(var u=0;u<r._series.length;u++)s=r._series[u],s===this&&(o=u),s.renderer.constructor==e.jqplot.BarRenderer&&(t+=s.data.length,n+=1);return[t,n,o]},e.jqplot.BarRenderer.prototype.setBarWidth=function(){var e,t=0,n=0,r=this[this._primaryAxis],i,s,o,u=this._plotSeriesInfo=this.renderer.calcSeriesNumbers.call(this);t=u[0],n=u[1];var a=r.numberTicks,f=(a-1)/2;return r.name=="xaxis"||r.name=="x2axis"?this._stack?this.barWidth=(r._offsets.max-r._offsets.min)/t*n-this.barMargin:this.barWidth=((r._offsets.max-r._offsets.min)/f-this.barPadding*(n-1)-this.barMargin*2)/n:this._stack?this.barWidth=(r._offsets.min-r._offsets.max)/t*n-this.barMargin:this.barWidth=((r._offsets.min-r._offsets.max)/f-this.barPadding*(n-1)-this.barMargin*2)/n,[t,n]},e.jqplot.BarRenderer.prototype.draw=function(t,n,i,s){var o,u=e.extend({},i),a=u.shadow!=undefined?u.shadow:this.shadow,f=u.showLine!=undefined?u.showLine:this.showLine,l=u.fill!=undefined?u.fill:this.fill,c=this.xaxis,h=this.yaxis,p=this._xaxis.series_u2p,d=this._yaxis.series_u2p,v,m;this._dataColors=[],this._barPoints=[],this.barWidth==null&&this.renderer.setBarWidth.call(this);var g=this._plotSeriesInfo=this.renderer.calcSeriesNumbers.call(this),y=g[0],b=g[1],w=g[2],E=[];this._stack?this._barNudge=0:this._barNudge=(-Math.abs(b/2-.5)+w)*(this.barWidth+this.barPadding);if(f){var S=new e.jqplot.ColorGenerator(this.negativeSeriesColors),x=new e.jqplot.ColorGenerator(this.seriesColors),T=S.get(this.index);this.useNegativeColors||(T=u.fillStyle);var N=u.fillStyle,C,k,L;if(this.barDirection=="vertical")for(var o=0;o<n.length;o++){if(!this._stack&&this.data[o][1]==null)continue;E=[],C=n[o][0]+this._barNudge,this._stack&&this._prevGridData.length?L=r(this.index,o,this._plotData[o][1],s,"y"):this.fillToZero?L=this._yaxis.series_u2p(0):this.waterfall&&o>0&&o<this.gridData.length-1?L=this.gridData[o-1][1]:this.waterfall&&o==0&&o<this.gridData.length-1?this._yaxis.min<=0&&this._yaxis.max>=0?L=this._yaxis.series_u2p(0):this._yaxis.min>0?L=t.canvas.height:L=0:this.waterfall&&o==this.gridData.length-1?this._yaxis.min<=0&&this._yaxis.max>=0?L=this._yaxis.series_u2p(0):this._yaxis.min>0?L=t.canvas.height:L=0:L=t.canvas.height,this.fillToZero&&this._plotData[o][1]<0||this.waterfall&&this._data[o][1]<0?this.varyBarColor&&!this._stack?this.useNegativeColors?u.fillStyle=S.next():u.fillStyle=x.next():u.fillStyle=T:this.varyBarColor&&!this._stack?u.fillStyle=x.next():u.fillStyle=N,!this.fillToZero||this._plotData[o][1]>=0?(E.push([C-this.barWidth/2,L]),E.push([C-this.barWidth/2,n[o][1]]),E.push([C+this.barWidth/2,n[o][1]]),E.push([C+this.barWidth/2,L])):(E.push([C-this.barWidth/2,n[o][1]]),E.push([C-this.barWidth/2,L]),E.push([C+this.barWidth/2,L]),E.push([C+this.barWidth/2,n[o][1]])),this._barPoints.push(E);if(a&&!this._stack){var A=e.extend(!0,{},u);delete A.fillStyle,this.renderer.shadowRenderer.draw(t,E,A)}var O=u.fillStyle||this.color;this._dataColors.push(O),this.renderer.shapeRenderer.draw(t,E,u)}else if(this.barDirection=="horizontal")for(var o=0;o<n.length;o++){if(!this._stack&&this.data[o][0]==null)continue;E=[],C=n[o][1]-this._barNudge,k,this._stack&&this._prevGridData.length?k=r(this.index,o,this._plotData[o][0],s,"x"):this.fillToZero?k=this._xaxis.series_u2p(0):this.waterfall&&o>0&&o<this.gridData.length-1?k=this.gridData[o-1][0]:this.waterfall&&o==0&&o<this.gridData.length-1?this._xaxis.min<=0&&this._xaxis.max>=0?k=this._xaxis.series_u2p(0):this._xaxis.min>0?k=0:k=0:this.waterfall&&o==this.gridData.length-1?this._xaxis.min<=0&&this._xaxis.max>=0?k=this._xaxis.series_u2p(0):this._xaxis.min>0?k=0:k=t.canvas.width:k=0,this.fillToZero&&this._plotData[o][0]<0||this.waterfall&&this._data[o][0]<0?this.varyBarColor&&!this._stack?this.useNegativeColors?u.fillStyle=S.next():u.fillStyle=x.next():u.fillStyle=T:this.varyBarColor&&!this._stack?u.fillStyle=x.next():u.fillStyle=N,!this.fillToZero||this._plotData[o][0]>=0?(E.push([k,C+this.barWidth/2]),E.push([k,C-this.barWidth/2]),E.push([n[o][0],C-this.barWidth/2]),E.push([n[o][0],C+this.barWidth/2])):(E.push([n[o][0],C+this.barWidth/2]),E.push([n[o][0],C-this.barWidth/2]),E.push([k,C-this.barWidth/2]),E.push([k,C+this.barWidth/2])),this._barPoints.push(E);if(a&&!this._stack){var A=e.extend(!0,{},u);delete A.fillStyle,this.renderer.shadowRenderer.draw(t,E,A)}var O=u.fillStyle||this.color;this._dataColors.push(O),this.renderer.shapeRenderer.draw(t,E,u)}}if(this.highlightColors.length==0)this.highlightColors=e.jqplot.computeHighlightColors(this._dataColors);else if(typeof this.highlightColors=="string"){var g=this.highlightColors;this.highlightColors=[];for(var o=0;o<this._dataColors.length;o++)this.highlightColors.push(g)}},e.jqplot.BarRenderer.prototype.drawShadow=function(e,t,n,i){var s,o=n!=undefined?n:{},u=o.shadow!=undefined?o.shadow:this.shadow,a=o.showLine!=undefined?o.showLine:this.showLine,f=o.fill!=undefined?o.fill:this.fill,l=this.xaxis,c=this.yaxis,h=this._xaxis.series_u2p,p=this._yaxis.series_u2p,d,v,m,g,y,b;if(this._stack&&this.shadow){this.barWidth==null&&this.renderer.setBarWidth.call(this);var w=this._plotSeriesInfo=this.renderer.calcSeriesNumbers.call(this);g=w[0],y=w[1],b=w[2],this._stack?this._barNudge=0:this._barNudge=(-Math.abs(y/2-.5)+b)*(this.barWidth+this.barPadding);if(a)if(this.barDirection=="vertical")for(var s=0;s<t.length;s++){if(this.data[s][1]==null)continue;v=[];var E=t[s][0]+this._barNudge,S;this._stack&&this._prevGridData.length?S=r(this.index,s,this._plotData[s][1],i,"y"):this.fillToZero?S=this._yaxis.series_u2p(0):S=e.canvas.height,v.push([E-this.barWidth/2,S]),v.push([E-this.barWidth/2,t[s][1]]),v.push([E+this.barWidth/2,t[s][1]]),v.push([E+this.barWidth/2,S]),this.renderer.shadowRenderer.draw(e,v,o)}else if(this.barDirection=="horizontal")for(var s=0;s<t.length;s++){if(this.data[s][0]==null)continue;v=[];var E=t[s][1]-this._barNudge,x;this._stack&&this._prevGridData.length?x=r(this.index,s,this._plotData[s][0],i,"x"):this.fillToZero?x=this._xaxis.series_u2p(0):x=0,v.push([x,E+this.barWidth/2]),v.push([t[s][0],E+this.barWidth/2]),v.push([t[s][0],E-this.barWidth/2]),v.push([x,E-this.barWidth/2]),this.renderer.shadowRenderer.draw(e,v,o)}}}})(jQuery);