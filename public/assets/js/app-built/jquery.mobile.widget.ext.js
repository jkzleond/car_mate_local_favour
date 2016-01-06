(function(e,t,n){typeof define=="function"&&define.amd?define(["jquery","jqm"],function(r){return n(r,e,t),r.cm}):n(e.jQuery,e,t)})(this,document,function(e,t,n,r){e.cm=e.cm||{},function(e){e.cm.toast=function(n){var r={bgColor:"rgba(0,0,0,0.8)",color:"white",msg:"",cls:"",endPosition:null},i=e.extend({},r,n),s=e('<div class="cm-toast"></div>');s.addClass(i.cls),s.css("backgroundColor",i.bgColor).css("color",i.color),s.html(i.msg),s.appendTo("body").hide(),s.css("left",(t.innerWidth-s.outerWidth())/2);var o=null;if(i.endPosition){o={};switch(i.endPosition){case"top":o.bottom=t.innerHeight-s.outerHeight()+"px";break;case"bottom":o.bottom="0px";break;case"center":o.bottom=t.innerHeight/2-s.outerHeight()/2+"px";break;case"rightTop":o.right="0px",o.bottom=s.outerHeight()+"px";break;case"leftTop":o.left="0px",o.bottom=s.outerHeight()+"px";break;case"rightBottom":o.top=t.innerHeight-s.outerHeight()+"px",o.right="0px";break;case"leftBottom":o.top=t.innerHeight-s.outerHeight()+"px",o.left="0px";break;case"right":o.right="0px",o.bottom=t.innerHeight/2-s.outerHeight()/2+"px";break;case"left":o.left="0px",o.bottom=t.innerHeight/2-s.outerHeight()/2+"px"}}setTimeout(function(){s.fadeIn(500),o?s.animate(o).delay(500):s.delay(500),s.fadeOut(500,function(){s.remove()})},500)}}(e),function(e){e.widget("cm.numberspinner",{options:{domCache:!1,enhanced:!1,wrapperCls:"cm-numberspinner",plusBtnCls:"cm-plus-btn",minusBtnCls:"cm-minus-btn",inputCls:"cm-number-input"},_wrapper:null,_number_reg:/^\d+$/,_create:function(){this.options.enhanced||this._enhance();var e={};e["click ."+this.options.plusBtnCls]="_onPlusBtnClick",e["click ."+this.options.minusBtnCls]="_onMinusBtnClick",e["input ."+this.options.inputCls]="_onInputBoxInput",this._on(this.element,e)},_enhance:function(){this.element.addClass(this.options.wrapperCls),this.element.prepend(this._minusBtn()),this.element.append(this._input()),this.element.append(this._plusBtn()),this.options.enhanced=!0},_plusBtn:function(){return'<button class="'+this.options.plusBtnCls+'"></button>'},_minusBtn:function(){return'<button class="'+this.options.minusBtnCls+'"></button>'},_input:function(){return'<input class="'+this.options.inputCls+'" type="text" value="0">'},_onPlusBtnClick:function(e){e.stopPropagation(),e.preventDefault();var t="."+this.options.inputCls,n=this.element.find(t),r=n.val();return n.val(Number(r)+1),this._trigger("change",e,n.val()),!1},_onMinusBtnClick:function(e){e.stopPropagation(),e.preventDefault();var t="."+this.options.inputCls,n=this.element.find(t),r=n.val();return n.val(Math.max(Number(r)-1,0)),this._trigger("change",e,n.val()),!1},_onInputBoxInput:function(t){var n=e(t.target).val();if(!this._number_reg.test(n)){e(t.target).val("0"),this._trigger("change",t,0);return}e(t.target).val(Number(n)),this._trigger("change",t,e(t.target).val())},getValue:function(){var e=this.element.find("."+this.options.inputCls).val();return Number(e)}})}(e)});