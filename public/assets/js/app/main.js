/**
 * Created by jkzleond on 15-6-8.
 */

var base_url = '';

require.config({
    baseUrl: base_url + '/assets/js',
    paths: {
        jquery: 'jquery-2',
        jqm: 'jquery.mobile-1.4.5',
        jqm_widget_ext: 'jquery.mobile.widget.ext',
        //jqm_simple_dialog: 'jquery.mobile.simplediallog2',
        datetimepicker: 'jquery.datetimepicker',
        jqplot_bar: 'jqplot_bar',
        pcas: 'pcasunzip',
        base64: 'Base64',
        underscore: 'underscore',
        backbone: 'backbone',
        text: 'text',
        routers: 'app/routers',
        models: 'app/models',
        collections: 'app/collections',
        views: 'app/views',
        templates: 'app/templates'
    },
    urlArgs: 'bust=1.04', //+ Date.now(),
    waitSeconds: 0,
    shim:{
        backbone:{
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        pcas: {
            deps: [],
            exports: 'PCAS'
        },
        datetimepicker: {
            deps: ['jquery']
        },
        jqplot_bar: {
            deps: ['jquery']
        }
        /*
        jqm_simple_dialog:{
            deps: ['jqm', 'jquery'],
            exports: 'JqmSimpleDialog'
        }
        */
    }
});

require(['jquery'], function($){

    //初始化命名空间
    $.cm = $.cm || {};

    $.cm.dispatcher = $({});

    $.cm.color = {};
    $.cm.color.BONUS_COLOR = 'rgba(33, 150, 243, 0.8)';

    //绑定全局客户端事件的快捷方法
    $.cm.bind = function(){
        $.cm.dispatcher.bind.apply($.cm.dispatcher, arguments);
    };

    $.cm.unbind = function(){
        $.cm.dispatcher.unbind.apply($.cm.dispatcher, arguments);
    };

    $.cm.trigger = function()
    {
        $.cm.dispatcher.trigger.apply($.cm.dispatcher, arguments);
    };


    //系统事件.奖励事件响应
    $.cm.bind('system.bonus', function(evnent, bonuse){
        if(bonuse.length == 0) return;

        var len = bonuse.length;

        for(var i = 0; i < len; i++)
        {
            var bonus = bonuse[i];
            var name = bonus.name;
            var code = bonus.code;
            var value = bonus.value > 0 ? '+' + bonus.value : bonus.value;
            $.cm.toast({
                bgColor: $.cm.color.BONUS_COLOR,
                endPosition: 'center',
                msg: '<h4 style="text-align: center; font-size: 1.5em;">' + value + '<h4><h5 style="text-align: center; font-size: 1.5em;">' + name + '</h5>'
            });
            $.cm.trigger('system.bonus:' + code, [value]);
        }
    });

    //全局事件触发(由后台发出的客户端事件)
    $(document).ajaxSuccess(function(event, xhr, options, data){

        if(data.events)
        {
            for(var event_name in data.events)
            {
                $.cm.trigger(event_name, [data.events[event_name]]);
            }
        }

        if(data.err_msg)
        {
            $.cm.toast({
                msg:data.err_msg
            });
        }
    });


    //session id
    var session_id = null;
    //系统全局变量
    window.G = window.G || {};
    //用户信息
    G.user = null;

    /*
     配置ajax
     */
    $.ajaxPrefilter(function(options){

        //自动加上 base_url
        var orig_url = options.url;

        orig_url = base_url + orig_url;

        //自动加ssid参数
        if(session_id && orig_url.indexOf('?') != -1)
        {
            orig_url += '&ssid=' + session_id;
        }
        else if(session_id)
        {
            orig_url += '?ssid=' + session_id;
        }

        options.url = orig_url;
        return options;
    });



    //jquerymobile配置
    $(document).on('mobileinit', function(){
        //禁用jquerymobile的链接绑定
        $.mobile.linkBindingEnabled = false;
        //禁用jquerymobile的hashchange侦听
        $.mobile.hashListeningEnabled = false;

        $.mobile.defaultPageTransition = false;

        $.mobile.loader.prototype.options.text = "loading hardly";
        $.mobile.loader.prototype.options.textVisible = false;
        $.mobile.loader.prototype.options.theme = "a";
        $.mobile.loader.prototype.options.html = "";

        $.mobile.page.prototype.options.keepNative = "select, input:radio, input:checkbox, input.fb_box_input, input.fb_box_input2, input.fb_box_button, .no-enhance";


        //隐藏header
        $('body').on('pagebeforecreate', '[data-role="page"]', function(event){
            var $page = $(event.target);
            var $header = $page.find('[data-role="header"]');
            var orig_padding_top = $page.css('padding-top');

            $page.css('padding-top', Number(orig_padding_top.match(/\d+/)) - 40);
            $header.css('padding', 0);
            $header.find('a:not([data-role="navbar"] a),h1').hide();
        });

    });

    require(['jqm', 'jqm_widget_ext'], function(){

        //配置loading
        $(document).ajaxStart(function(){
            $.mobile.loading('show');
        });

        $(document).ajaxStop(function(){
            $.mobile.loading('hide');
        });

        /*
         初始化数据
         */
        //登录
        var params_matches = window.location.href.match(/\?(.*)/);
        var login_params = params_matches ? params_matches[1] : '';
        $.ajax({
            url: '/user/login.json?' + login_params,
            method: 'GET',
            dataType: 'json',
            global: true
        }).done(function(data){
            //初始化完成之后再显示页面
            //存储session_id
            session_id = data.session_id;
            //存储登录后的用户信息
            G.user = data.user_info;

            //初始化系统配置及用户登录后开启backbone路由
            require(['backbone', 'routers/LocalFavourRouter', 'routers/TourRouter',
                //'routers/InsuranceRouter',
                'routers/NewInsuranceRouter',
                'routers/ActivityRouter'], function(Backbone, LocalFavourRouter, TourRouter,
                                                    //InsuranceRouter,
                                                    NewInsuranceRouter,
                                                    ActivityRouter){
                this.local_favour_router = new LocalFavourRouter();
                this.tour_router = new TourRouter();
                this.activity_router = new ActivityRouter();
                //this.insurance_router = new InsuranceRouter();
                this.new_insurance_router = new NewInsuranceRouter();
                //调用Backbone.history.start,用以侦听window的hashchange事件,从而使路由生效
                //创建路由
                //
                /*window.app = {};
                window.app.showGallery = function(js){
                    var re_js = js.replace('%s', encodeURIComponent('DSHDA&*($3EW_)+_DSADSA(I!3@31321=='));
                    setTimeout(function(){
                        window.location.href = re_js;
                    });
                }*/

                //解决android4.4以下多个webview输入框不能输入的问题
                if(window.app && window.app.setUrl)
                {
                    Backbone.history.orig_check_url = Backbone.history.checkUrl;
                    Backbone.history.checkUrl = function(e){
                        if( !/.*#$|^[^#]*$/.test(window.location.href) )
                        {
                            var result = app.setUrl(window.location.href);
                            if(result == 'false')
                            {
                                window.location.href = window.location.href.replace(/#.*$/, '#');
                                return;
                            }
                        }
                        Backbone.history.orig_check_url(e);
                    }
                }

                //解决android4.4以下webview不能上传文件问题
                if(window.app && window.app.showGallery)
                {
                    $(document).on('click', 'input[type="file"]', function(event){
                        var $file_input = $(event.target);
                        var target_id = Date.now();
                        $file_input.attr('target-id', target_id);
                        window.app.showGallery("javascript:(function(){ $('[target-id=\"" + target_id + "\"]').trigger('change',{result: '%s' }); })();");
                        return false;
                    });
                }

                Backbone.history.start();

                //local_favour_router.navigate('home', {trigger: true});
                // $('body').fadeIn(function(){
                //     $.cm.trigger('system.bonus', [[{name: 'haha', value: 100, code:'huiGold'}]]);
                // });

                $('.index-pic').fadeOut(1000);
            });
        });
    });

});
