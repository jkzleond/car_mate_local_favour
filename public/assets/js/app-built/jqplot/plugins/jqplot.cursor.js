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

(function(e){function t(t,n,i){var s=i.plugins.cursor,o="",u=!1;s.showTooltipGridPosition&&(o=t.x+", "+t.y,u=!0);if(s.showTooltipUnitPosition){var a;for(var f=0;f<s.tooltipAxisGroups.length;f++){a=s.tooltipAxisGroups[f],u&&(o+="<br />");if(s.useAxesFormatters)for(var l=0;l<a.length;l++){l&&(o+=", ");var c=i.axes[a[l]]._ticks[0].formatter,h=i.axes[a[l]]._ticks[0].formatString;o+=c(h,n[a[l]])}else o+=e.jqplot.sprintf(s.tooltipFormatString,n[a[0]],n[a[1]]);u=!0}}if(s.showTooltipDataPosition){var p=i.series,d=r(i,t.x,t.y),u=!1;for(var f=0;f<p.length;f++)if(p[f].show){var v=p[f].index,m=p[f].label.toString(),g=e.inArray(v,d.indices),y=undefined,b=undefined;if(g!=-1){var w=d.data[g].data;if(s.useAxesFormatters){var E=p[f]._xaxis._ticks[0].formatter,S=p[f]._yaxis._ticks[0].formatter,x=p[f]._xaxis._ticks[0].formatString,T=p[f]._yaxis._ticks[0].formatString;y=E(x,w[0]),b=S(T,w[1])}else y=w[0],b=w[1];u&&(o+="<br />"),o+=e.jqplot.sprintf(s.tooltipFormatString,m,y,b),u=!0}}}s._tooltipElem.html(o)}function n(t,n){var i=n.plugins.cursor,s=i.cursorCanvas._ctx;s.clearRect(0,0,s.canvas.width,s.canvas.height),i.showVerticalLine&&i.shapeRenderer.draw(s,[[t.x,0],[t.x,s.canvas.height]]),i.showHorizontalLine&&i.shapeRenderer.draw(s,[[0,t.y],[s.canvas.width,t.y]]);var o=r(n,t.x,t.y);if(i.showCursorLegend){var u=e(n.targetId+" td.jqplot-cursor-legend-label");for(var a=0;a<u.length;a++){var f=e(u[a]).data("seriesIndex"),l=n.series[f],c=l.label.toString(),h=e.inArray(f,o.indices),p=undefined,d=undefined;if(h!=-1){var v=o.data[h].data;if(i.useAxesFormatters){var m=l._xaxis._ticks[0].formatter,g=l._yaxis._ticks[0].formatter,y=l._xaxis._ticks[0].formatString,b=l._yaxis._ticks[0].formatString;p=m(y,v[0]),d=g(b,v[1])}else p=v[0],d=v[1]}n.legend.escapeHtml?e(u[a]).text(e.jqplot.sprintf(i.cursorLegendFormatString,c,p,d)):e(u[a]).html(e.jqplot.sprintf(i.cursorLegendFormatString,c,p,d))}}s=null}function r(e,t,n){var r={indices:[],data:[]},i,s,o,u,a,f,l,c,h=e.plugins.cursor;for(var s=0;s<e.series.length;s++){i=e.series[s],f=i.renderer;if(i.show){c=h.intersectionThreshold,i.showMarker&&(c+=i.markerRenderer.size/2);for(var a=0;a<i.gridData.length;a++)l=i.gridData[a],h.showVerticalLine&&Math.abs(t-l[0])<=c&&(r.indices.push(s),r.data.push({seriesIndex:s,pointIndex:a,gridData:l,data:i.data[a]}))}}return r}function i(e,t){var n=t.plugins.cursor,r=n._tooltipElem;switch(n.tooltipLocation){case"nw":var i=e.x+t._gridPadding.left-r.outerWidth(!0)-n.tooltipOffset,s=e.y+t._gridPadding.top-n.tooltipOffset-r.outerHeight(!0);break;case"n":var i=e.x+t._gridPadding.left-r.outerWidth(!0)/2,s=e.y+t._gridPadding.top-n.tooltipOffset-r.outerHeight(!0);break;case"ne":var i=e.x+t._gridPadding.left+n.tooltipOffset,s=e.y+t._gridPadding.top-n.tooltipOffset-r.outerHeight(!0);break;case"e":var i=e.x+t._gridPadding.left+n.tooltipOffset,s=e.y+t._gridPadding.top-r.outerHeight(!0)/2;break;case"se":var i=e.x+t._gridPadding.left+n.tooltipOffset,s=e.y+t._gridPadding.top+n.tooltipOffset;break;case"s":var i=e.x+t._gridPadding.left-r.outerWidth(!0)/2,s=e.y+t._gridPadding.top+n.tooltipOffset;break;case"sw":var i=e.x+t._gridPadding.left-r.outerWidth(!0)-n.tooltipOffset,s=e.y+t._gridPadding.top+n.tooltipOffset;break;case"w":var i=e.x+t._gridPadding.left-r.outerWidth(!0)-n.tooltipOffset,s=e.y+t._gridPadding.top-r.outerHeight(!0)/2;break;default:var i=e.x+t._gridPadding.left+n.tooltipOffset,s=e.y+t._gridPadding.top+n.tooltipOffset}r.css("left",i),r.css("top",s),r=null}function s(e){var t=e._gridPadding,n=e.plugins.cursor,r=n._tooltipElem;switch(n.tooltipLocation){case"nw":var i=t.left+n.tooltipOffset,s=t.top+n.tooltipOffset;r.css("left",i),r.css("top",s);break;case"n":var i=(t.left+(e._plotDimensions.width-t.right))/2-r.outerWidth(!0)/2,s=t.top+n.tooltipOffset;r.css("left",i),r.css("top",s);break;case"ne":var i=t.right+n.tooltipOffset,s=t.top+n.tooltipOffset;r.css({right:i,top:s});break;case"e":var i=t.right+n.tooltipOffset,s=(t.top+(e._plotDimensions.height-t.bottom))/2-r.outerHeight(!0)/2;r.css({right:i,top:s});break;case"se":var i=t.right+n.tooltipOffset,s=t.bottom+n.tooltipOffset;r.css({right:i,bottom:s});break;case"s":var i=(t.left+(e._plotDimensions.width-t.right))/2-r.outerWidth(!0)/2,s=t.bottom+n.tooltipOffset;r.css({left:i,bottom:s});break;case"sw":var i=t.left+n.tooltipOffset,s=t.bottom+n.tooltipOffset;r.css({left:i,bottom:s});break;case"w":var i=t.left+n.tooltipOffset,s=(t.top+(e._plotDimensions.height-t.bottom))/2-r.outerHeight(!0)/2;r.css({left:i,top:s});break;default:var i=t.right-n.tooltipOffset,s=t.bottom+n.tooltipOffset;r.css({right:i,bottom:s})}r=null}function o(e,t,n,r,i){e.preventDefault(),e.stopImmediatePropagation();var s=i.plugins.cursor;s.clickReset&&s.resetZoom(i,s);var o=window.getSelection;return document.selection&&document.selection.empty?document.selection.empty():o&&!o().isCollapsed&&o().collapse(),!1}function u(e,t,n,r,i){e.preventDefault(),e.stopImmediatePropagation();var s=i.plugins.cursor;s.dblClickReset&&s.resetZoom(i,s);var o=window.getSelection;return document.selection&&document.selection.empty?document.selection.empty():o&&!o().isCollapsed&&o().collapse(),!1}function a(t,n,r,i,s){var o=s.plugins.cursor;o.onGrid=!1;if(o.show){e(t.target).css("cursor",o.previousCursor),o.showTooltip&&!(o._zoom.zooming&&o.showTooltipOutsideZoom&&!o.constrainOutsideZoom)&&(o._tooltipElem.empty(),o._tooltipElem.hide()),o.zoom&&(o._zoom.gridpos=n,o._zoom.datapos=r);if(o.showVerticalLine||o.showHorizontalLine){var u=o.cursorCanvas._ctx;u.clearRect(0,0,u.canvas.width,u.canvas.height),u=null}if(o.showCursorLegend){var a=e(s.targetId+" td.jqplot-cursor-legend-label");for(var f=0;f<a.length;f++){var l=e(a[f]).data("seriesIndex"),c=s.series[l],h=c.label.toString();s.legend.escapeHtml?e(a[f]).text(e.jqplot.sprintf(o.cursorLegendFormatString,h,undefined,undefined)):e(a[f]).html(e.jqplot.sprintf(o.cursorLegendFormatString,h,undefined,undefined))}}}}function f(e,r,o,u,a){var f=a.plugins.cursor;f.onGrid=!0,f.show&&(f.previousCursor=e.target.style.cursor,e.target.style.cursor=f.style,f.showTooltip&&(t(r,o,a),f.followMouse?i(r,a):s(a),f._tooltipElem.show()),(f.showVerticalLine||f.showHorizontalLine)&&n(r,a))}function l(e,r,s,o,u){var a=u.plugins.cursor;a.show&&(a.showTooltip&&(t(r,s,u),a.followMouse&&i(r,u)),(a.showVerticalLine||a.showHorizontalLine)&&n(r,u))}function c(e){var t=e.data.plot,n=t.eventCanvas._elem.offset(),r={x:e.pageX-n.left,y:e.pageY-n.top},i={xaxis:null,yaxis:null,x2axis:null,y2axis:null,y3axis:null,y4axis:null,y5axis:null,y6axis:null,y7axis:null,y8axis:null,y9axis:null,yMidAxis:null},s=["xaxis","yaxis","x2axis","y2axis","y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis","yMidAxis"],o=t.axes,u,a;for(u=11;u>0;u--)a=s[u-1],o[a].show&&(i[a]=o[a].series_p2u(r[a.charAt(0)]));return{offsets:n,gridPos:r,dataPos:i}}function h(e){var n=e.data.plot,r=n.plugins.cursor;if(r.show&&r.zoom&&r._zoom.started&&!r.zoomTarget){e.preventDefault();var s=r.zoomCanvas._ctx,o=c(e),u=o.gridPos,a=o.dataPos;r._zoom.gridpos=u,r._zoom.datapos=a,r._zoom.zooming=!0;var f=u.x,l=u.y,h=s.canvas.height,p=s.canvas.width;r.showTooltip&&!r.onGrid&&r.showTooltipOutsideZoom&&(t(u,a,n),r.followMouse&&i(u,n)),r.constrainZoomTo=="x"?r._zoom.end=[f,h]:r.constrainZoomTo=="y"?r._zoom.end=[p,l]:r._zoom.end=[f,l];var d=window.getSelection;document.selection&&document.selection.empty?document.selection.empty():d&&!d().isCollapsed&&d().collapse(),v.call(r),s=null}}function p(t,n,r,i,s){var o=s.plugins.cursor;s.plugins.mobile?e(document).one("vmouseup.jqplot_cursor",{plot:s},d):e(document).one("mouseup.jqplot_cursor",{plot:s},d);var u=s.axes;document.onselectstart!=undefined&&(o._oldHandlers.onselectstart=document.onselectstart,document.onselectstart=function(){return!1}),document.ondrag!=undefined&&(o._oldHandlers.ondrag=document.ondrag,document.ondrag=function(){return!1}),document.onmousedown!=undefined&&(o._oldHandlers.onmousedown=document.onmousedown,document.onmousedown=function(){return!1});if(o.zoom){if(!o.zoomProxy){var a=o.zoomCanvas._ctx;a.clearRect(0,0,a.canvas.width,a.canvas.height),a=null}o.constrainZoomTo=="x"?o._zoom.start=[n.x,0]:o.constrainZoomTo=="y"?o._zoom.start=[0,n.y]:o._zoom.start=[n.x,n.y],o._zoom.started=!0;for(var f in r)o._zoom.axes.start[f]=r[f];s.plugins.mobile?e(document).bind("vmousemove.jqplotCursor",{plot:s},h):e(document).bind("mousemove.jqplotCursor",{plot:s},h)}}function d(t){var n=t.data.plot,r=n.plugins.cursor;if(r.zoom&&r._zoom.zooming&&!r.zoomTarget){var i=r._zoom.gridpos.x,s=r._zoom.gridpos.y,o=r._zoom.datapos,u=r.zoomCanvas._ctx.canvas.height,a=r.zoomCanvas._ctx.canvas.width,f=n.axes;if(r.constrainOutsideZoom&&!r.onGrid){i<0?i=0:i>a&&(i=a),s<0?s=0:s>u&&(s=u);for(var l in o)o[l]&&(l.charAt(0)=="x"?o[l]=f[l].series_p2u(i):o[l]=f[l].series_p2u(s))}r.constrainZoomTo=="x"?s=u:r.constrainZoomTo=="y"&&(i=a),r._zoom.end=[i,s],r._zoom.gridpos={x:i,y:s},r.doZoom(r._zoom.gridpos,o,n,r)}r._zoom.started=!1,r._zoom.zooming=!1,e(document).unbind("mousemove.jqplotCursor",h),document.onselectstart!=undefined&&r._oldHandlers.onselectstart!=null&&(document.onselectstart=r._oldHandlers.onselectstart,r._oldHandlers.onselectstart=null),document.ondrag!=undefined&&r._oldHandlers.ondrag!=null&&(document.ondrag=r._oldHandlers.ondrag,r._oldHandlers.ondrag=null),document.onmousedown!=undefined&&r._oldHandlers.onmousedown!=null&&(document.onmousedown=r._oldHandlers.onmousedown,r._oldHandlers.onmousedown=null)}function v(){var e=this._zoom.start,t=this._zoom.end,n=this.zoomCanvas._ctx,r,i,s,o;t[0]>e[0]?(r=e[0],o=t[0]-e[0]):(r=t[0],o=e[0]-t[0]),t[1]>e[1]?(i=e[1],s=t[1]-e[1]):(i=t[1],s=e[1]-t[1]),n.fillStyle="rgba(0,0,0,0.2)",n.strokeStyle="#999999",n.lineWidth=1,n.clearRect(0,0,n.canvas.width,n.canvas.height),n.fillRect(0,0,n.canvas.width,n.canvas.height),n.clearRect(r,i,o,s),n.strokeRect(r,i,o,s),n=null}e.jqplot.Cursor=function(t){this.style="crosshair",this.previousCursor="auto",this.show=e.jqplot.config.enablePlugins,this.showTooltip=!0,this.followMouse=!1,this.tooltipLocation="se",this.tooltipOffset=6,this.showTooltipGridPosition=!1,this.showTooltipUnitPosition=!0,this.showTooltipDataPosition=!1,this.tooltipFormatString="%.4P, %.4P",this.useAxesFormatters=!0,this.tooltipAxisGroups=[],this.zoom=!1,this.zoomProxy=!1,this.zoomTarget=!1,this.looseZoom=!0,this.clickReset=!1,this.dblClickReset=!0,this.showVerticalLine=!1,this.showHorizontalLine=!1,this.constrainZoomTo="none",this.shapeRenderer=new e.jqplot.ShapeRenderer,this._zoom={start:[],end:[],started:!1,zooming:!1,isZoomed:!1,axes:{start:{},end:{}},gridpos:{},datapos:{}},this._tooltipElem,this.zoomCanvas,this.cursorCanvas,this.intersectionThreshold=2,this.showCursorLegend=!1,this.cursorLegendFormatString=e.jqplot.Cursor.cursorLegendFormatString,this._oldHandlers={onselectstart:null,ondrag:null,onmousedown:null},this.constrainOutsideZoom=!0,this.showTooltipOutsideZoom=!1,this.onGrid=!1,e.extend(!0,this,t)},e.jqplot.Cursor.cursorLegendFormatString="%s x:%s, y:%s",e.jqplot.Cursor.init=function(t,n,r){var i=r||{};this.plugins.cursor=new e.jqplot.Cursor(i.cursor);var s=this.plugins.cursor;s.show&&(e.jqplot.eventListenerHooks.push(["jqplotMouseEnter",f]),e.jqplot.eventListenerHooks.push(["jqplotMouseLeave",a]),e.jqplot.eventListenerHooks.push(["jqplotMouseMove",l]),s.showCursorLegend&&(r.legend=r.legend||{},r.legend.renderer=e.jqplot.CursorLegendRenderer,r.legend.formatString=this.plugins.cursor.cursorLegendFormatString,r.legend.show=!0),s.zoom&&(e.jqplot.eventListenerHooks.push(["jqplotMouseDown",p]),s.clickReset&&e.jqplot.eventListenerHooks.push(["jqplotClick",o]),s.dblClickReset&&e.jqplot.eventListenerHooks.push(["jqplotDblClick",u])),this.resetZoom=function(){var e=this.axes;if(!s.zoomProxy){for(var t in e)e[t].reset(),e[t]._ticks=[],s._zoom.axes[t]!==undefined&&(e[t]._autoFormatString=s._zoom.axes[t].tickFormatString);this.redraw()}else{var n=this.plugins.cursor.zoomCanvas._ctx;n.clearRect(0,0,n.canvas.width,n.canvas.height),n=null}this.plugins.cursor._zoom.isZoomed=!1,this.target.trigger("jqplotResetZoom",[this,this.plugins.cursor])},s.showTooltipDataPosition&&(s.showTooltipUnitPosition=!1,s.showTooltipGridPosition=!1,i.cursor.tooltipFormatString==undefined&&(s.tooltipFormatString=e.jqplot.Cursor.cursorLegendFormatString)))},e.jqplot.Cursor.postDraw=function(){var t=this.plugins.cursor;t.zoomCanvas&&(t.zoomCanvas.resetCanvas(),t.zoomCanvas=null),t.cursorCanvas&&(t.cursorCanvas.resetCanvas(),t.cursorCanvas=null),t._tooltipElem&&(t._tooltipElem.emptyForce(),t._tooltipElem=null),t.zoom&&(t.zoomCanvas=new e.jqplot.GenericCanvas,this.eventCanvas._elem.before(t.zoomCanvas.createElement(this._gridPadding,"jqplot-zoom-canvas",this._plotDimensions,this)),t.zoomCanvas.setContext());var n=document.createElement("div");t._tooltipElem=e(n),n=null,t._tooltipElem.addClass("jqplot-cursor-tooltip"),t._tooltipElem.css({position:"absolute",display:"none"}),t.zoomCanvas?t.zoomCanvas._elem.before(t._tooltipElem):this.eventCanvas._elem.before(t._tooltipElem);if(t.showVerticalLine||t.showHorizontalLine)t.cursorCanvas=new e.jqplot.GenericCanvas,this.eventCanvas._elem.before(t.cursorCanvas.createElement(this._gridPadding,"jqplot-cursor-canvas",this._plotDimensions,this)),t.cursorCanvas.setContext();if(t.showTooltipUnitPosition&&t.tooltipAxisGroups.length===0){var r=this.series,i,s=[];for(var o=0;o<r.length;o++){i=r[o];var u=i.xaxis+","+i.yaxis;e.inArray(u,s)==-1&&s.push(u)}for(var o=0;o<s.length;o++)t.tooltipAxisGroups.push(s[o].split(","))}},e.jqplot.Cursor.zoomProxy=function(e,t){function i(t,r,i,s,o){n.doZoom(r,i,e,o)}function s(t,n,r){e.resetZoom()}var n=e.plugins.cursor,r=t.plugins.cursor;n.zoomTarget=!0,n.zoom=!0,n.style="auto",n.dblClickReset=!1,r.zoom=!0,r.zoomProxy=!0,t.target.bind("jqplotZoom",i),t.target.bind("jqplotResetZoom",s)},e.jqplot.Cursor.prototype.resetZoom=function(e,t){var n=e.axes,r=t._zoom.axes;if(!e.plugins.cursor.zoomProxy&&t._zoom.isZoomed){for(var i in n)n[i].reset(),n[i]._ticks=[],n[i]._autoFormatString=r[i].tickFormatString;e.redraw(),t._zoom.isZoomed=!1}else{var s=t.zoomCanvas._ctx;s.clearRect(0,0,s.canvas.width,s.canvas.height),s=null}e.target.trigger("jqplotResetZoom",[e,t])},e.jqplot.Cursor.resetZoom=function(e){e.resetZoom()},e.jqplot.Cursor.prototype.doZoom=function(t,n,r,i){var s=i,o=r.axes,u=s._zoom.axes,a=u.start,f=u.end,l,c,h,p,d,v,m,g,y,b=r.plugins.cursor.zoomCanvas._ctx;if(s.constrainZoomTo=="none"&&Math.abs(t.x-s._zoom.start[0])>6&&Math.abs(t.y-s._zoom.start[1])>6||s.constrainZoomTo=="x"&&Math.abs(t.x-s._zoom.start[0])>6||s.constrainZoomTo=="y"&&Math.abs(t.y-s._zoom.start[1])>6){if(!r.plugins.cursor.zoomProxy){for(var w in n){s._zoom.axes[w]==undefined&&(s._zoom.axes[w]={},s._zoom.axes[w].numberTicks=o[w].numberTicks,s._zoom.axes[w].tickInterval=o[w].tickInterval,s._zoom.axes[w].daTickInterval=o[w].daTickInterval,s._zoom.axes[w].min=o[w].min,s._zoom.axes[w].max=o[w].max,s._zoom.axes[w].tickFormatString=o[w].tickOptions!=null?o[w].tickOptions.formatString:"");if(s.constrainZoomTo=="none"||s.constrainZoomTo=="x"&&w.charAt(0)=="x"||s.constrainZoomTo=="y"&&w.charAt(0)=="y")h=n[w],h!=null&&(h>a[w]?(d=a[w],v=h):(p=a[w]-h,d=h,v=a[w]),m=o[w],g=null,m.alignTicks&&(m.name==="x2axis"&&r.axes.xaxis.show?g=r.axes.xaxis.numberTicks:m.name.charAt(0)==="y"&&m.name!=="yaxis"&&m.name!=="yMidAxis"&&r.axes.yaxis.show&&(g=r.axes.yaxis.numberTicks)),!this.looseZoom||o[w].renderer.constructor!==e.jqplot.LinearAxisRenderer&&o[w].renderer.constructor!==e.jqplot.LogAxisRenderer?(o[w].min=d,o[w].max=v,o[w].tickInterval=null,o[w].numberTicks=null,o[w].daTickInterval=null):(y=e.jqplot.LinearTickGenerator(d,v,m._scalefact,g),o[w].tickInset&&y[0]<o[w].min+o[w].tickInset*o[w].tickInterval&&(y[0]+=y[4],y[2]-=1),o[w].tickInset&&y[1]>o[w].max-o[w].tickInset*o[w].tickInterval&&(y[1]-=y[4],y[2]-=1),o[w].renderer.constructor===e.jqplot.LogAxisRenderer&&y[0]<o[w].min&&(y[0]+=y[4],y[2]-=1),o[w].min=y[0],o[w].max=y[1],o[w]._autoFormatString=y[3],o[w].numberTicks=y[2],o[w].tickInterval=y[4],o[w].daTickInterval=[y[4]/1e3,"seconds"]),o[w]._ticks=[])}b.clearRect(0,0,b.canvas.width,b.canvas.height),r.redraw(),s._zoom.isZoomed=!0,b=null}r.target.trigger("jqplotZoom",[t,n,r,i])}},e.jqplot.preInitHooks.push(e.jqplot.Cursor.init),e.jqplot.postDrawHooks.push(e.jqplot.Cursor.postDraw),e.jqplot.CursorLegendRenderer=function(t){e.jqplot.TableLegendRenderer.call(this,t),this.formatString="%s"},e.jqplot.CursorLegendRenderer.prototype=new e.jqplot.TableLegendRenderer,e.jqplot.CursorLegendRenderer.prototype.constructor=e.jqplot.CursorLegendRenderer,e.jqplot.CursorLegendRenderer.prototype.draw=function(){function l(t,n,r,i){var s=r?this.rowSpacing:"0",o=e('<tr class="jqplot-legend jqplot-cursor-legend"></tr>').appendTo(this._elem);o.data("seriesIndex",i),e('<td class="jqplot-legend jqplot-cursor-legend-swatch" style="padding-top:'+s+';">'+'<div style="border:1px solid #cccccc;padding:0.2em;">'+'<div class="jqplot-cursor-legend-swatch" style="background-color:'+n+';"></div>'+"</div></td>").appendTo(o);var u=e('<td class="jqplot-legend jqplot-cursor-legend-label" style="vertical-align:middle;padding-top:'+s+';"></td>');u.appendTo(o),u.data("seriesIndex",i),this.escapeHtml?u.text(t):u.html(t),o=null,u=null}this._elem&&(this._elem.emptyForce(),this._elem=null);if(this.show){var t=this._series,n,r=document.createElement("table");this._elem=e(r),r=null,this._elem.addClass("jqplot-legend jqplot-cursor-legend"),this._elem.css("position","absolute");var i=!1;for(var s=0;s<t.length;s++){n=t[s];if(n.show&&n.showLabel){var o=e.jqplot.sprintf(this.formatString,n.label.toString());if(o){var u=n.color;n._stack&&!n.fill&&(u=""),l.call(this,o,u,i,s),i=!0}for(var a=0;a<e.jqplot.addLegendRowHooks.length;a++){var f=e.jqplot.addLegendRowHooks[a].call(this,n);f&&(l.call(this,f.label,f.color,i),i=!0)}}}t=n=null,delete t,delete n}return this._elem}})(jQuery);