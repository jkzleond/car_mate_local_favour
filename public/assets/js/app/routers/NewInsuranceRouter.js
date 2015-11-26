/**
 * Created by jkzleond on 15-7-14.
 */

define([
    'jquery',
    'backbone',
    'views/insurance/InsurancePageView',
    'views/insurance/CompulsorySetPageView',
    'views/insurance/ValueSetPageView',
    'views/insurance/FullSetPageView',
    'views/insurance/ProfitSetPageView',
    'views/insurance/ReservationPageView',
    'views/insurance/ParityPageView', //比价页面view
    //'views/insurance/FirstPricePageView', 
    'views/insurance/FinalParityPageView', //精算比价页面
    //'views/insurance/ActuaryPricePageView',
    'views/insurance/ApplyActualPageView',
    'views/insurance/PayOrderPageView',
    'views/insurance/InsuranceListPageView'
], function($, Backbone, InsurancePageView, CompulsorySetPageView, ValueSetPageView, FullSetPageView,
 ProfitSetPageView, 
 ReservationPageView, ParityPageView, FinalParityPageView, ApplyActualPageView, PayOrderPageView, InsuranceListPageView){
    var NewInsuranceRouter = Backbone.Router.extend({
        initialize: function(){

            this.insurance_page_view = new InsurancePageView();
            this.insurance_compulsory_set_page_view = new CompulsorySetPageView();
            this.insurance_value_set_page_view = new ValueSetPageView();
            this.insurance_full_set_page_view = new FullSetPageView();
            this.insurance_profit_set_page_view = new ProfitSetPageView();
            this.insurance_reservation_page_view = new ReservationPageView();
            this.parity_page_view = new ParityPageView();
            //this.first_price_page_view = new FirstPricePageView();
            this.final_parity_page_view = new FinalParityPageView();
            //this.actuary_price_page_view = new ActuaryPricePageView();
            this.apply_actual_page_view = new ApplyActualPageView();
            this.pay_order_page_view = new PayOrderPageView();
            this.insurance_list_page_view = new InsuranceListPageView();

            this.listenTo(this.insurance_value_set_page_view, 'invalid', this._onFormModelInvalid);
            this.listenTo(this.insurance_full_set_page_view, 'invalid', this._onFormModelInvalid);
            this.listenTo(this.insurance_page_view, 'uri', this._onRequestUri);
            this.listenTo(this.insurance_compulsory_set_page_view, 'uri', this._onRequestUri);
            this.listenTo(this.insurance_value_set_page_view, 'uri', this._onRequestUri);
            this.listenTo(this.insurance_full_set_page_view, 'uri', this._onRequestUri);
            this.listenTo(this.insurance_profit_set_page_view, 'uri', this._onRequestUri);
            this.listenTo(this.parity_page_view, 'uri', this._onRequestUri);
            this.listenTo(this.pay_order_page_view, 'uri', this._onRequestUri);
            this.listenTo(this.final_parity_page_view, 'uri', this._onRequestUri);
        },
        _onFormModelInvalid: function(view, err){
            $.cm.toast({msg: err});
        },
        _onRequestUri: function(view, uri, options){
            this.navigate(uri, {trigger: true});
        },
        routes: {
            'insurance': 'index',
            'insurance/set(/:type)(/:state_id)': 'firstCalc',
            'insurance/reservation': 'reservation',
            'insurance/price/:info_id': 'parityPrice',
            'insurance/actuary_price/:info_id': 'finalParityPrice',
            'insurance/apply_actual/:info_id(/:is_compulsory)': 'applyActual',
            'insurance/:info_id/actuary_result/': 'actuaryResult',
            'insurance/:info_id/pay_order': 'payOrder',
            'insurance/list(/:state)': 'insurances'
        },
        index: function(){
            $(':mobile-pagecontainer').pagecontainer('change', '#insurance_page');
        },
        //初算(套餐)
        firstCalc: function(set_type, state_id){
            $(':mobile-pagecontainer').pagecontainer('change', '#insurance_' + set_type + '_set_page');
            if(this['insurance_' + set_type + '_set_page_view'] && this['insurance_' + set_type + '_set_page_view'].reset)
            {
                this['insurance_' + set_type + '_set_page_view'].reset(state_id);
            }
        },
        firstPrice: function(info_id){
            $(':mobile-pagecontainer').pagecontainer('change', '#insurance_first_price_page');
            this.first_price_page_view.loadInfo(info_id);
        },
        reservation: function()
        {
            $(':mobile-pagecontainer').pagecontainer('change', '#insurance_reservation_page');
            this.insurance_reservation_page_view.reset();//重置视图
        },
        //比价
        parityPrice: function(info_id){
            $(':mobile-pagecontainer').pagecontainer('change', '#insurance_parity_price_page');
            this.parity_page_view.loadInfo(info_id);
        },
        //精算比价
        finalParityPrice: function(info_id){
            $(':mobile-pagecontainer').pagecontainer('change', '#insurance_final_parity_price_page');
            this.final_parity_page_view.loadInfo(info_id);
        },
        //申请精算
        applyActual: function(info_id, is_compulsory){
            if(G.user.user_id === 'INSURANCE_ACCOUNT')
            {
                $.cm.toast({msg: '请下载车友惠App进行精算'});
                window.history.back();
                return;
            }
            $(':mobile-pagecontainer').pagecontainer('change', '#insurance_apply_actual_page');
            this.apply_actual_page_view.is_compulsory = is_compulsory;
            this.apply_actual_page_view.model.set('info_id', info_id); 
        },
        //精算价格
        actuaryPrice: function(info_id){
            $(':mobile-pagecontainer').pagecontainer('change', '#insurance_actuary_price_page');
            this.actuary_price_page_view.loadInfo(info_id);
        },
        //确认下单页面
        payOrder: function(info_id){
            $(':mobile-pagecontainer').pagecontainer('change', '#insurance_pay_order_page');
            this.pay_order_page_view.loadOrderInfo(info_id);
        },
        insurances: function(state){

            if(G.user.user_id == 'WEIBO_ACCOUNT')
            {
                $.cm.toast({msg: '游客不可查看订单'});
                return;
            }

            $(':mobile-pagecontainer').pagecontainer('change', '#insurance_list_page')

            var index = state || 1;
            if(!state)
            {
                this.insurance_list_page_view.reset();
            }

            this.insurance_list_page_view.changeTap(index);

        }
    });
    return NewInsuranceRouter;
});