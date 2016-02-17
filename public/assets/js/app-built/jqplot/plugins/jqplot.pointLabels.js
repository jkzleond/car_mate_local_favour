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

(function(e){e.jqplot.PointLabels=function(t){this.show=e.jqplot.config.enablePlugins,this.location="n",this.labelsFromSeries=!1,this.seriesLabelIndex=null,this.labels=[],this._labels=[],this.stackedValue=!1,this.ypadding=6,this.xpadding=6,this.escapeHTML=!0,this.edgeTolerance=-5,this.formatter=e.jqplot.DefaultTickFormatter,this.formatString="",this.hideZeros=!1,this._elems=[],e.extend(!0,this,t)};var t=["nw","n","ne","e","se","s","sw","w"],n={nw:0,n:1,ne:2,e:3,se:4,s:5,sw:6,w:7},r=["se","s","sw","w","nw","n","ne","e"];e.jqplot.PointLabels.init=function(t,n,r,i,s){var o=e.extend(!0,{},r,i);o.pointLabels=o.pointLabels||{},this.renderer.constructor===e.jqplot.BarRenderer&&this.barDirection==="horizontal"&&!o.pointLabels.location&&(o.pointLabels.location="e"),this.plugins.pointLabels=new e.jqplot.PointLabels(o.pointLabels),this.plugins.pointLabels.setLabels.call(this)},e.jqplot.PointLabels.prototype.setLabels=function(){var t=this.plugins.pointLabels,n;t.seriesLabelIndex!=null?n=t.seriesLabelIndex:this.renderer.constructor===e.jqplot.BarRenderer&&this.barDirection==="horizontal"?n=this._plotData[0].length<3?0:this._plotData[0].length-1:n=this._plotData.length===0?0:this._plotData[0].length-1,t._labels=[];if(t.labels.length===0||t.labelsFromSeries)if(t.stackedValue){if(this._plotData.length&&this._plotData[0].length)for(var r=0;r<this._plotData.length;r++)t._labels.push(this._plotData[r][n])}else{var i=this.data;this.renderer.constructor===e.jqplot.BarRenderer&&this.waterfall&&(i=this._data);if(i.length&&i[0].length)for(var r=0;r<i.length;r++)t._labels.push(i[r][n]);i=null}else t.labels.length&&(t._labels=t.labels)},e.jqplot.PointLabels.prototype.xOffset=function(e,t,n){t=t||this.location,n=n||this.xpadding;var r;switch(t){case"nw":r=-e.outerWidth(!0)-this.xpadding;break;case"n":r=-e.outerWidth(!0)/2;break;case"ne":r=this.xpadding;break;case"e":r=this.xpadding;break;case"se":r=this.xpadding;break;case"s":r=-e.outerWidth(!0)/2;break;case"sw":r=-e.outerWidth(!0)-this.xpadding;break;case"w":r=-e.outerWidth(!0)-this.xpadding;break;default:r=-e.outerWidth(!0)-this.xpadding}return r},e.jqplot.PointLabels.prototype.yOffset=function(e,t,n){t=t||this.location,n=n||this.xpadding;var r;switch(t){case"nw":r=-e.outerHeight(!0)-this.ypadding;break;case"n":r=-e.outerHeight(!0)-this.ypadding;break;case"ne":r=-e.outerHeight(!0)-this.ypadding;break;case"e":r=-e.outerHeight(!0)/2;break;case"se":r=this.ypadding;break;case"s":r=this.ypadding;break;case"sw":r=this.ypadding;break;case"w":r=-e.outerHeight(!0)/2;break;default:r=-e.outerHeight(!0)-this.ypadding}return r},e.jqplot.PointLabels.draw=function(t,i,s){var o=this.plugins.pointLabels;o.setLabels.call(this);for(var u=0;u<o._elems.length;u++)o._elems[u].emptyForce();o._elems.splice(0,o._elems.length);if(o.show){var a="_"+this._stackAxis+"axis";o.formatString||(o.formatString=this[a]._ticks[0].formatString,o.formatter=this[a]._ticks[0].formatter);var f=this._plotData,l=this._prevPlotData,c=this._xaxis,h=this._yaxis,p,d;for(var u=0,v=o._labels.length;u<v;u++){var m=o._labels[u];if(m==null||o.hideZeros&&parseInt(m,10)==0)continue;m=o.formatter(o.formatString,m),d=document.createElement("div"),o._elems[u]=e(d),p=o._elems[u],p.addClass("jqplot-point-label jqplot-series-"+this.index+" jqplot-point-"+u),p.css("position","absolute"),p.insertAfter(t.canvas),o.escapeHTML?p.text(m):p.html(m);var g=o.location;if(this.fillToZero&&f[u][1]<0||this.fillToZero&&this._type==="bar"&&this.barDirection==="horizontal"&&f[u][0]<0||(this.waterfall&&parseInt(m,10))<0)g=r[n[g]];var y=c.u2p(f[u][0])+o.xOffset(p,g),b=h.u2p(f[u][1])+o.yOffset(p,g);this._stack&&!o.stackedValue&&(this.barDirection==="vertical"?b=(this._barPoints[u][0][1]+this._barPoints[u][1][1])/2+s._gridPadding.top-.5*p.outerHeight(!0):y=(this._barPoints[u][2][0]+this._barPoints[u][0][0])/2+s._gridPadding.left-.5*p.outerWidth(!0)),this.renderer.constructor==e.jqplot.BarRenderer&&(this.barDirection=="vertical"?y+=this._barNudge:b-=this._barNudge),p.css("left",y),p.css("top",b);var w=y+p.width(),E=b+p.height(),S=o.edgeTolerance,x=e(t.canvas).position().left,T=e(t.canvas).position().top,N=t.canvas.width+x,C=t.canvas.height+T;(y-S<x||b-S<T||w+S>N||E+S>C)&&p.remove(),p=null,d=null}}},e.jqplot.postSeriesInitHooks.push(e.jqplot.PointLabels.init),e.jqplot.postDrawSeriesHooks.push(e.jqplot.PointLabels.draw)})(jQuery);