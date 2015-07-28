/**
 * Created by jkzleond on 15-6-10.
 */

(function(root, doc, factory){
    if ( typeof define === 'function' && define.amd ) {
        define(['jquery', 'jqm'], function($){
            factory($, root, doc);
            return $.cm;
        });
    } else {
        factory(root.jQuery, root, doc);
    }

})(this, document, function( jQuery, window, document, undifined ){

    //初始化命名空间
    jQuery.cm = jQuery.cm || {};

    (function($){

        $.cm.toast = function(options){

            var defaults = {


                /*
                dismissible: false,
                history: false,
                shadow: false,
                overlayTheme: 'cm-none',
                theme: 'cm',
                transition: 'flip',
                duration: 1000,
                */
                bgColor: 'rgba(0,0,0,0.8)',
                color: 'white',
                msg: '',
                cls: '',
                endPosition: null //top, bottom, center, leftTop, rightTop, leftBottom, rightBottom, left, right
                /*
                afteropen: function(event, ui){
                    var $self = $(this);
                    setTimeout(function(){
                        $self.simpledialog2('close');
                    },$self.simpledialog2('option','duration'));
                },
                afterclose: function(event, ui){
                    $(this).simpledialog2('destroy').remove();
                */
            };


            var opt = $.extend({}, defaults, options);

            /*
            var container = $('<div class="cm-toast"></div>');
            container.addClass(opt.cls);
            container.css('backgroundColor', opt.bgColor)
                .css('color', opt.color);
            container.html(opt.msg);
            container.appendTo('body');
            setTimeout(function(){
                container.simpledialog2({
                    headerClose: false,
                    blankContent: true,
                    themeDialog: 'a',
                    width: '15%',
                    zindex: 1000});

                container.simpledialog2('widget').css('background', 'none')
                    .css('box-shadow', 'none');
                console.log(container.simpledialog2('widget'));
                container.simpledialog2('open');
            }, 300);
            */

            var container = $('<div class="cm-toast"></div>');
            container.addClass(opt.cls);
            container.css('backgroundColor', opt.bgColor)
                .css('color', opt.color);
            container.html(opt.msg);
            container.appendTo('body').hide();
            container.css('left', (window.innerWidth - container.outerWidth())/2);

            var animation = null;

            if(opt.endPosition)
            {
                animation = {};

                switch(opt.endPosition)
                {
                    case 'top':
                        //animation.top = '0px';
                        animation.bottom = window.innerHeight - container.outerHeight() + 'px';
                        break;
                    case 'bottom':
                        animation.bottom = '0px';
                        break;
                    case 'center':
                        //animation.top = (window.innerHeight/2 - container.outerHeight()/2) + 'px';
                        animation.bottom = (window.innerHeight/2 - container.outerHeight()/2) + 'px';
                        break;
                    case 'rightTop':
                        //animation.top = '0px';
                        animation.right = '0px';
                        animation.bottom = container.outerHeight() + 'px';
                        break;
                    case 'leftTop':
                        //animation.top = '0px';
                        animation.left = '0px';
                        animation.bottom = container.outerHeight() + 'px';
                        break;
                    case 'rightBottom':
                        animation.top = window.innerHeight - container.outerHeight() + 'px';
                        //animation.bottom = '0px';
                        animation.right = '0px';
                        break;
                    case 'leftBottom':
                        animation.top = window.innerHeight - container.outerHeight() + 'px';
                        //animation.bottom = '0px';
                        animation.left = '0px';
                        break;
                    case 'right':
                        animation.right = '0px';
                        //animation.top = (window.innerHeight/2 - container.outerHeight()/2) + 'px';
                        animation.bottom = (window.innerHeight/2 - container.outerHeight()/2) + 'px';
                        break;
                    case 'left':
                        animation.left = '0px';
                        //animation.top = (window.innerHeight/2 - container.outerHeight()/2) + 'px';
                        animation.bottom = (window.innerHeight/2 - container.outerHeight()/2) + 'px';
                        break;
                }
            }

            setTimeout(function(){
                container.fadeIn(500);
                if(animation)
                {
                    container.animate(animation).delay(500);
                }
                else
                {
                    container.delay(500);
                }
                container.fadeOut(500, function(){
                    container.remove();
                });
            }, 500);
        };


    })(jQuery);

    (function($){
        $.widget('cm.numberspinner', {
            options: {
                domCache: false,
                enhanced: false,
                wrapperCls: 'cm-numberspinner',
                plusBtnCls: 'cm-plus-btn',
                minusBtnCls: 'cm-minus-btn',
                inputCls: 'cm-number-input'
            },
            _wrapper: null,
            _number_reg: /^\d+$/,
            _create: function(){

                if(!this.options.enhanced)
                {
                    this._enhance();
                }

                var event_handlers = {};
                event_handlers['click .' + this.options.plusBtnCls] = '_onPlusBtnClick';
                event_handlers['click .' + this.options.minusBtnCls] = '_onMinusBtnClick';
                event_handlers['input .' + this.options.inputCls] = '_onInputBoxInput';

                this._on(this.element, event_handlers);
            },
            _enhance: function(){
                this.element.addClass(this.options.wrapperCls);
                this.element.prepend(this._minusBtn());
                this.element.append(this._input());
                this.element.append(this._plusBtn());
                this.options.enhanced = true;
            },
            _plusBtn: function(){
                return '<button class="' + this.options.plusBtnCls + '"></button>';
            },
            _minusBtn: function(){
                return '<button class="' + this.options.minusBtnCls + '"></button>';
            },
            _input: function(){
                return '<input class="' + this.options.inputCls + '" type="text" value="0">';
            },
            _onPlusBtnClick: function(event){
                event.stopPropagation();
                event.preventDefault();
                var input_selector = '.' + this.options.inputCls;
                var $input = this.element.find(input_selector);
                var old_value = $input.val();
                $input.val(Number(old_value) + 1);
                this._trigger('change', event, $input.val());
                return false;
            },
            _onMinusBtnClick: function(event){
                event.stopPropagation();
                event.preventDefault();
                var input_selector = '.' + this.options.inputCls;
                var $input = this.element.find(input_selector);
                var old_value = $input.val();
                $input.val(Math.max(Number(old_value) - 1, 0));
                this._trigger('change', event, $input.val());
                return false;
            },
            _onInputBoxInput: function(event){
                var new_value = $(event.target).val();
                if(!this._number_reg.test(new_value))
                {
                    $(event.target).val('0');
                    this._trigger('change', event, 0);
                    return;
                }

                $(event.target).val(Number(new_value));

                this._trigger('change', event, $(event.target).val());
            },
            getValue: function(){
                var text_value = this.element.find('.' + this.options.inputCls).val();
                return Number(text_value);
            }
        });
    })(jQuery);
});





