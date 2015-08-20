/**
 * Created by jkzleond on 15-6-23.
 */


/**
 * 活动路由
 */

define([
    'jquery',
    'backbone',
    'text!/activity',
    'collections/activity/ActivityCollection',
    'views/activity/ActivityListView',
    'views/activity/ActivityPubFormView',
    'views/activity/ActivityDetailPageView',
    'jqm',
    'base64'
], function($, Backbone, activityPages, ActivityCollection, ActivityListView, ActivityPubFormView, ActivityDetailPageView){
    var ActivityRouter = Backbone.Router.extend({
        initialize: function(){
            $(activityPages).appendTo('body');

            this.activity_all_list_view = new ActivityListView({
                el: '#activity_list_view_all',
                collection: new ActivityCollection(null, {
                    type: 'all'
                })
            });

            this.activity_my_list_view = new ActivityListView({
                el: '#activity_list_view_my',
                collection: new ActivityCollection(null, {
                    type: 'my'
                })
            });

            this.$navbar = $('#activity_navbar');

            //我要发布按钮点击事件
            $('#activity_pub_btn').click($.proxy(this._onActivityPubBtnClick, this));

            this.activity_pub_form_view = new ActivityPubFormView({
                el: '#activity_pub_form_container'
            });

            this.listenTo(this.activity_pub_form_view, 'invalid:pub', this._onPubInvalid);
            this.listenTo(this.activity_pub_form_view, 'activitygen', this._onNewActivityGen);


            this.activity_detail_page_view = new ActivityDetailPageView();
            this.listenTo(this.activity_detail_page_view, 'invalid:sign', this._onSignInValid);
            this.listenTo(this.activity_detail_page_view, 'ordergen', this._onNewOrderGen);
        },
        _onActivityPubBtnClick: function(event){
            $('#activity_pub_popup').popup('open');
            return false;
        },
        _onSignInValid: function(view, err){
            $.cm.toast({
                msg: err
            });
        },
        _onPubInvalid: function(view, err){
            $.cm.toast({
                msg: err
            });
        },
        _onNewActivityGen: function(view, new_activity_id){
            this.navigate('activitise/my', {trigger: true});
        },
        //新订单生成事件
        _onNewOrderGen: function(view, order_info)
        {
            if(!order_info) return;
            /*
            WEIBO_ACCOUNT 不支持在线支付
            if(G.user.user_id == 'WEIBO_ACCOUNT')
            {
                $.cm.toast({msg: '请进行线下支付'});
                return;
            }
            */
            var order_info_xml = '<root><orderId>' + order_info.order_id + '<orderId><orderNo>' + order_info.order_no + '</orderNo><orderFee>' + order_info.order_fee + '</orderFee><payType><offline>' + order_info.pay_type.offline + '</offline><alipay>' + order_info.pay_type.alipay + '</alipay><wxpay>' + order_info.pay_type.wxpay + '</wxpay></payType><des>'+ order_info.order_des + '</des></root>'; // 因为中文备注引起IOS订单支付不了的问题,暂时去了 <des> + order_info.order_des + </des>
            window.location.href = 'pay://yn.122.net/?ordername=' + encodeURIComponent('活动收费项') + '&orderinfo=' + encodeURIComponent(base64encode(order_info_xml));
            //var coded_string = encodeURIComponent(base64encode(order_info_xml));
            //console.log(coded_string);
            //console.log(base64decode(decodeURIComponent(coded_string)));
        },
        routes: {
            'activitise(/:type)': 'index',
            'activity/detail(/:id)': 'activityDetail'
        },
        index: function(type){

            $(':mobile-pagecontainer').pagecontainer('change', '#activitise_page');

            if(!type)
            {
                this.activity_all_list_view.collection.reset();
                this.activity_my_list_view.collection.reset();
            }

            if(!type || type == 'all')
            {
                this.activity_all_list_view.collection.fetch();
                this.activity_all_list_view.$el.show();
                this.activity_my_list_view.$el.hide();
                this.$navbar.find('[data-type-id="my"]').removeClass('ui-btn-active');
                this.$navbar.find('[data-type-id="all"]').addClass('ui-btn-active');
            }
            else if(type == 'my')
            {
                this.activity_my_list_view.collection.fetch();
                this.activity_my_list_view.$el.show();
                this.activity_all_list_view.$el.hide();
                this.$navbar.find('[data-type-id="all"]').removeClass('ui-btn-active');
                this.$navbar.find('[data-type-id="my"]').addClass('ui-btn-active');
            }

        },
        activityDetail: function(id){
            $(':mobile-pagecontainer').pagecontainer('change', '#activity_detail_page');
            this.activity_detail_page_view.model.clear();
            this.activity_detail_page_view.model.set({id: id},{silent: true});
            this.activity_detail_page_view.model.fetch();
        }
    });

    return ActivityRouter;
});