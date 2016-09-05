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

(function(e){function i(t,n){var r=t.plugins.highlighter,i=t.series[n.seriesIndex],s=i.markerRenderer,o=r.markerRenderer;o.style=s.style,o.lineWidth=s.lineWidth+r.lineWidthAdjust,o.size=s.size+r.sizeAdjust;var u=e.jqplot.getColorComponents(s.color),a=[u[0],u[1],u[2]],f=u[3]>=.6?u[3]*.6:u[3]*(2-u[3]);o.color="rgba("+a[0]+","+a[1]+","+a[2]+","+f+")",o.init(),o.draw(i.gridData[n.pointIndex][0],i.gridData[n.pointIndex][1],r.highlightCanvas._ctx)}function s(i,s,o){var u=i.plugins.highlighter,a=u._tooltipElem,f=s.highlighter||{},l=e.extend(!0,{},u,f);if(l.useAxesFormatters){var c=s._xaxis._ticks[0].formatter,h=s._yaxis._ticks[0].formatter,p=s._xaxis._ticks[0].formatString,d=s._yaxis._ticks[0].formatString,v,m=c(p,o.data[0]),g=[];for(var y=1;y<l.yvalues+1;y++)g.push(h(d,o.data[y]));if(typeof l.formatString=="string")switch(l.tooltipAxes){case"both":case"xy":g.unshift(m),g.unshift(l.formatString),v=e.jqplot.sprintf.apply(e.jqplot.sprintf,g);break;case"yx":g.push(m),g.unshift(l.formatString),v=e.jqplot.sprintf.apply(e.jqplot.sprintf,g);break;case"x":v=e.jqplot.sprintf.apply(e.jqplot.sprintf,[l.formatString,m]);break;case"y":g.unshift(l.formatString),v=e.jqplot.sprintf.apply(e.jqplot.sprintf,g);break;default:g.unshift(m),g.unshift(l.formatString),v=e.jqplot.sprintf.apply(e.jqplot.sprintf,g)}else switch(l.tooltipAxes){case"both":case"xy":v=m;for(var y=0;y<g.length;y++)v+=l.tooltipSeparator+g[y];break;case"yx":v="";for(var y=0;y<g.length;y++)v+=g[y]+l.tooltipSeparator;v+=m;break;case"x":v=m;break;case"y":v=g.join(l.tooltipSeparator);break;default:v=m;for(var y=0;y<g.length;y++)v+=l.tooltipSeparator+g[y]}}else{var v;typeof l.formatString=="string"?v=e.jqplot.sprintf.apply(e.jqplot.sprintf,[l.formatString].concat(o.data)):l.tooltipAxes=="both"||l.tooltipAxes=="xy"?v=e.jqplot.sprintf(l.tooltipFormatString,o.data[0])+l.tooltipSeparator+e.jqplot.sprintf(l.tooltipFormatString,o.data[1]):l.tooltipAxes=="yx"?v=e.jqplot.sprintf(l.tooltipFormatString,o.data[1])+l.tooltipSeparator+e.jqplot.sprintf(l.tooltipFormatString,o.data[0]):l.tooltipAxes=="x"?v=e.jqplot.sprintf(l.tooltipFormatString,o.data[0]):l.tooltipAxes=="y"&&(v=e.jqplot.sprintf(l.tooltipFormatString,o.data[1]))}e.isFunction(l.tooltipContentEditor)&&(v=l.tooltipContentEditor(v,o.seriesIndex,o.pointIndex,i)),a.html(v);var b={x:o.gridData[0],y:o.gridData[1]},w=0,E=.707;s.markerRenderer.show==1&&(w=(s.markerRenderer.size+l.sizeAdjust)/2);var S=t;s.fillToZero&&s.fill&&o.data[1]<0&&(S=r);switch(S[n[l.tooltipLocation]]){case"nw":var x=b.x+i._gridPadding.left-a.outerWidth(!0)-l.tooltipOffset-E*w,T=b.y+i._gridPadding.top-l.tooltipOffset-a.outerHeight(!0)-E*w;break;case"n":var x=b.x+i._gridPadding.left-a.outerWidth(!0)/2,T=b.y+i._gridPadding.top-l.tooltipOffset-a.outerHeight(!0)-w;break;case"ne":var x=b.x+i._gridPadding.left+l.tooltipOffset+E*w,T=b.y+i._gridPadding.top-l.tooltipOffset-a.outerHeight(!0)-E*w;break;case"e":var x=b.x+i._gridPadding.left+l.tooltipOffset+w,T=b.y+i._gridPadding.top-a.outerHeight(!0)/2;break;case"se":var x=b.x+i._gridPadding.left+l.tooltipOffset+E*w,T=b.y+i._gridPadding.top+l.tooltipOffset+E*w;break;case"s":var x=b.x+i._gridPadding.left-a.outerWidth(!0)/2,T=b.y+i._gridPadding.top+l.tooltipOffset+w;break;case"sw":var x=b.x+i._gridPadding.left-a.outerWidth(!0)-l.tooltipOffset-E*w,T=b.y+i._gridPadding.top+l.tooltipOffset+E*w;break;case"w":var x=b.x+i._gridPadding.left-a.outerWidth(!0)-l.tooltipOffset-w,T=b.y+i._gridPadding.top-a.outerHeight(!0)/2;break;default:var x=b.x+i._gridPadding.left-a.outerWidth(!0)-l.tooltipOffset-E*w,T=b.y+i._gridPadding.top-l.tooltipOffset-a.outerHeight(!0)-E*w}a.css("left",x),a.css("top",T),l.fadeTooltip?a.stop(!0,!0).fadeIn(l.tooltipFadeSpeed):a.show(),a=null}function o(e,t,n,r,o){var u=o.plugins.highlighter,a=o.plugins.cursor;if(u.show)if(r==null&&u.isHighlighting){var f=jQuery.Event("jqplotHighlighterUnhighlight");o.target.trigger(f);var l=u.highlightCanvas._ctx;l.clearRect(0,0,l.canvas.width,l.canvas.height),u.fadeTooltip?u._tooltipElem.fadeOut(u.tooltipFadeSpeed):u._tooltipElem.hide(),u.bringSeriesToFront&&o.restorePreviousSeriesOrder(),u.isHighlighting=!1,u.currentNeighbor=null,l=null}else if(r!=null&&o.series[r.seriesIndex].showHighlight&&!u.isHighlighting){var f=jQuery.Event("jqplotHighlighterHighlight");f.which=e.which,f.pageX=e.pageX,f.pageY=e.pageY;var c=[r.seriesIndex,r.pointIndex,r.data,o];o.target.trigger(f,c),u.isHighlighting=!0,u.currentNeighbor=r,u.showMarker&&i(o,r),o.series[r.seriesIndex].show&&u.showTooltip&&(!a||!a._zoom.started)&&s(o,o.series[r.seriesIndex],r),u.bringSeriesToFront&&o.moveSeriesToFront(r.seriesIndex)}else if(r!=null&&u.isHighlighting&&u.currentNeighbor!=r&&o.series[r.seriesIndex].showHighlight){var l=u.highlightCanvas._ctx;l.clearRect(0,0,l.canvas.width,l.canvas.height),u.isHighlighting=!0,u.currentNeighbor=r,u.showMarker&&i(o,r),o.series[r.seriesIndex].show&&u.showTooltip&&(!a||!a._zoom.started)&&s(o,o.series[r.seriesIndex],r),u.bringSeriesToFront&&o.moveSeriesToFront(r.seriesIndex)}}e.jqplot.eventListenerHooks.push(["jqplotMouseMove",o]),e.jqplot.Highlighter=function(t){this.show=e.jqplot.config.enablePlugins,this.markerRenderer=new e.jqplot.MarkerRenderer({shadow:!1}),this.showMarker=!0,this.lineWidthAdjust=2.5,this.sizeAdjust=5,this.showTooltip=!0,this.tooltipLocation="nw",this.fadeTooltip=!0,this.tooltipFadeSpeed="fast",this.tooltipOffset=2,this.tooltipAxes="both",this.tooltipSeparator=", ",this.tooltipContentEditor=null,this.useAxesFormatters=!0,this.tooltipFormatString="%.5P",this.formatString=null,this.yvalues=1,this.bringSeriesToFront=!1,this._tooltipElem,this.isHighlighting=!1,this.currentNeighbor=null,e.extend(!0,this,t)};var t=["nw","n","ne","e","se","s","sw","w"],n={nw:0,n:1,ne:2,e:3,se:4,s:5,sw:6,w:7},r=["se","s","sw","w","nw","n","ne","e"];e.jqplot.Highlighter.init=function(t,n,r){var i=r||{};this.plugins.highlighter=new e.jqplot.Highlighter(i.highlighter)},e.jqplot.Highlighter.parseOptions=function(e,t){this.showHighlight=!0},e.jqplot.Highlighter.postPlotDraw=function(){this.plugins.highlighter&&this.plugins.highlighter.highlightCanvas&&(this.plugins.highlighter.highlightCanvas.resetCanvas(),this.plugins.highlighter.highlightCanvas=null),this.plugins.highlighter&&this.plugins.highlighter._tooltipElem&&(this.plugins.highlighter._tooltipElem.emptyForce(),this.plugins.highlighter._tooltipElem=null),this.plugins.highlighter.highlightCanvas=new e.jqplot.GenericCanvas,this.eventCanvas._elem.before(this.plugins.highlighter.highlightCanvas.createElement(this._gridPadding,"jqplot-highlight-canvas",this._plotDimensions,this)),this.plugins.highlighter.highlightCanvas.setContext();var t=document.createElement("div");this.plugins.highlighter._tooltipElem=e(t),t=null,this.plugins.highlighter._tooltipElem.addClass("jqplot-highlighter-tooltip"),this.plugins.highlighter._tooltipElem.css({position:"absolute",display:"none"}),this.eventCanvas._elem.before(this.plugins.highlighter._tooltipElem)},e.jqplot.preInitHooks.push(e.jqplot.Highlighter.init),e.jqplot.preParseSeriesOptionsHooks.push(e.jqplot.Highlighter.parseOptions),e.jqplot.postDrawHooks.push(e.jqplot.Highlighter.postPlotDraw)})(jQuery);