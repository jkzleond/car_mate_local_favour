/**
 * Created by jkzleond on 15-6-23.
 */


/**
 * 活动路由
 */

define([
    'jquery',
    'backbone',
    'views/driving_tour/ToursPageView',
    'views/driving_tour/TourDetailPageView',
    'jqm',
    'base64'
], function($, Backbone, ToursPageView, TourDetailPageView){
    var TourRouter = Backbone.Router.extend({
        initialize: function(){
            this.tours_page_view = new ToursPageView();
            this.tour_detail_page_view = new TourDetailPageView();
            this.listenTo(this.tour_detail_page_view, 'invalid:sign', this._onSignInValid);
            this.listenTo(this.tour_detail_page_view, 'ordergen', this._onNewOrderGen);
        },
        _onSignInValid: function(view, err){
            $.cm.toast({
                msg: err
            });
        },
        //新订单生成事件
        _onNewOrderGen: function(view, order_info)
        {
            if(!order_info) return;
            var order_info_xml = '<root><orderId>' + order_info.order_id + '<orderId><orderNo>' + order_info.order_no + '</orderNo><orderFee>' + order_info.order_fee + '</orderFee><payType><offline>' + order_info.pay_type.offline + '</offline><alipay>' + order_info.pay_type.alipay + '</alipay><wxpay>' + order_info.pay_type.wxpay + '</wxpay></payType></root>';
            //window.open('pay://yn.122.net/?ordername=' + encodeURIComponent('活动收费项') + '&orderinfo=' + base64encode(order_info_xml));
        },
        routes: {
            'tours(/:type)': 'index',
            'tour/detail(/:id)': 'tourDetail'
        },
        index: function(type){

            if(!type)
            {
                this.tours_page_view.tour_list_view.collection.reset();
            }

            this.tours_page_view.tour_list_view.collection.fetch();

            $(':mobile-pagecontainer').pagecontainer('change', '#tours_page');

        },
        tourDetail: function(id){
            this.tour_detail_page_view.model.clear();
            this.tour_detail_page_view.model.set({id: id},{silent: true});
            this.tour_detail_page_view.model.fetch();
            $(':mobile-pagecontainer').pagecontainer('change', '#tour_detail_page');
        }
    });

    return TourRouter;
});