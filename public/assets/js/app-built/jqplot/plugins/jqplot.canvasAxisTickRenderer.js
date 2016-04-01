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

(function(e){e.jqplot.CanvasAxisTickRenderer=function(t){this.mark="outside",this.showMark=!0,this.showGridline=!0,this.isMinorTick=!1,this.angle=0,this.markSize=4,this.show=!0,this.showLabel=!0,this.labelPosition="auto",this.label="",this.value=null,this._styles={},this.formatter=e.jqplot.DefaultTickFormatter,this.formatString="",this.prefix="",this.fontFamily='"Trebuchet MS", Arial, Helvetica, sans-serif',this.fontSize="10pt",this.fontWeight="normal",this.fontStretch=1,this.textColor="#666666",this.enableFontSupport=!0,this.pt2px=null,this._elem,this._ctx,this._plotWidth,this._plotHeight,this._plotDimensions={height:null,width:null},e.extend(!0,this,t);var n={fontSize:this.fontSize,fontWeight:this.fontWeight,fontStretch:this.fontStretch,fillStyle:this.textColor,angle:this.getAngleRad(),fontFamily:this.fontFamily};this.pt2px&&(n.pt2px=this.pt2px),this.enableFontSupport?e.jqplot.support_canvas_text()?this._textRenderer=new e.jqplot.CanvasFontRenderer(n):this._textRenderer=new e.jqplot.CanvasTextRenderer(n):this._textRenderer=new e.jqplot.CanvasTextRenderer(n)},e.jqplot.CanvasAxisTickRenderer.prototype.init=function(t){e.extend(!0,this,t),this._textRenderer.init({fontSize:this.fontSize,fontWeight:this.fontWeight,fontStretch:this.fontStretch,fillStyle:this.textColor,angle:this.getAngleRad(),fontFamily:this.fontFamily})},e.jqplot.CanvasAxisTickRenderer.prototype.getWidth=function(e){if(this._elem)return this._elem.outerWidth(!0);var t=this._textRenderer,n=t.getWidth(e),r=t.getHeight(e),i=Math.abs(Math.sin(t.angle)*r)+Math.abs(Math.cos(t.angle)*n);return i},e.jqplot.CanvasAxisTickRenderer.prototype.getHeight=function(e){if(this._elem)return this._elem.outerHeight(!0);var t=this._textRenderer,n=t.getWidth(e),r=t.getHeight(e),i=Math.abs(Math.cos(t.angle)*r)+Math.abs(Math.sin(t.angle)*n);return i},e.jqplot.CanvasAxisTickRenderer.prototype.getTop=function(e){return this._elem?this._elem.position().top:null},e.jqplot.CanvasAxisTickRenderer.prototype.getAngleRad=function(){var e=this.angle*Math.PI/180;return e},e.jqplot.CanvasAxisTickRenderer.prototype.setTick=function(e,t,n){return this.value=e,n&&(this.isMinorTick=!0),this},e.jqplot.CanvasAxisTickRenderer.prototype.draw=function(t,n){this.label||(this.label=this.prefix+this.formatter(this.formatString,this.value)),this._elem&&(e.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==undefined&&window.G_vmlCanvasManager.uninitElement(this._elem.get(0)),this._elem.emptyForce(),this._elem=null);var r=n.canvasManager.getCanvas();this._textRenderer.setText(this.label,t);var i=this.getWidth(t),s=this.getHeight(t);return r.width=i,r.height=s,r.style.width=i,r.style.height=s,r.style.textAlign="left",r.style.position="absolute",r=n.canvasManager.initCanvas(r),this._elem=e(r),this._elem.css(this._styles),this._elem.addClass("jqplot-"+this.axis+"-tick"),r=null,this._elem},e.jqplot.CanvasAxisTickRenderer.prototype.pack=function(){this._textRenderer.draw(this._elem.get(0).getContext("2d"),this.label)}})(jQuery);