/**
 * Created by jkzleond on 15-7-26.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/insurance/PolicyFormModel',
    'collections/insurance/FinalResultCollection',
    'text!templates/insurance/actuary_price_page.html',
    'text!templates/insurance/result_detail.html',
    'jqplot_bar',
    'base64'
], function($, _, Backbone, PolicyFormModel, FinalResultCollection, pageTpl, resultDetailTpl){

    $(pageTpl).appendTo('body');

    var FinalParityPageView = Backbone.View.extend({
        el: '#insurance_actuary_price_page',
        initialize: function(options){
            this.form_model = new PolicyFormModel();
            this.actuary_results = new FinalResultCollection();

            this.result_detail_tpl = _.template(resultDetailTpl);

            this.listenTo(this.actuary_results, 'reset', this._render);
            this.listenTo(this.form_model, 'invalid', this._onFormInvalid);
            this.listenTo(this.form_model, 'sync', this._onApplyPolicySuccess);

        },
        events: {
            'click .apply-policy-btn': '_onApplyPolicyBtnClick'
        },
        //下单按钮点击事件
        _onApplyPolicyBtnClick: function(event){
            if(this.form_model.isValid())
            {
                this.form_model.save();
            }
        },
        _onFormInvalid: function(model, err){
            $.cm.toast({msg: err});
        },
        _onApplyPolicySuccess: function(model, resp, options){
            if(resp.success)
            {
                /*var order_info = resp.order_info;
                var order_info_xml = '<root><orderId>' + order_info.order_id + '<orderId><orderNo>' + order_info.order_no + '</orderNo><orderFee>' + order_info.order_fee + '</orderFee><payType><offline>1</offline><alipay>1</alipay><wxpay>1</wxpay></payType></root>';

                window.open('pay://yn.122.net/?ordername=' + encodeURIComponent('保险保费') + '&orderinfo=' + encodeURIComponent(base64encode(order_info_xml)));*/

                this.trigger('uri', this, 'insurance/' + this.form_model.get('info_id') + '/pay_order');
            }
        },
        _render: function(collection, options){
            var selected_result = this.actuary_results.models[0].attributes;//选择首推的一家保险公司精算结果

            this.form_model.set('company_id', selected_result.company_id);
            this.form_model.set('result_id', selected_result.result_id);
            //渲染保费折扣详情
            this.$el.find('.result-detail').empty().append(this.result_detail_tpl({
                result: selected_result
            }));
        },
        loadInfo: function(info_id){
            this._clear();
            this.form_model.set('info_id', info_id, {silent: true});
            this.actuary_results.setInfoId(info_id);
            this.actuary_results.fetch({reset:true});
        },
        _clear: function(){
            this.form_model.clear();
            this.$el.find('.result-detail').empty(); //清空价格详情
        }
    });
    return FinalParityPageView;
});
