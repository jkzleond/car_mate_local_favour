/**
 * Created by jkzleond on 15-7-26.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/insurance/PolicyFormModel',
    'collections/insurance/FinalResultCollection',
    'text!templates/insurance/final_parity_price_page.html',
    'text!templates/insurance/result_detail.html',
    'jqplot_bar',
    'base64'
], function($, _, Backbone, PolicyFormModel, FinalResultCollection, pageTpl, resultDetailTpl){

    $(pageTpl).appendTo('body');

    var FinalParityPageView = Backbone.View.extend({
        el: '#insurance_final_parity_price_page',
        initialize: function(options){
            this.form_model = new PolicyFormModel();
            this.actuary_results = new FinalResultCollection();

            this.plot_after_discount_data = [0];
            this.plot_discount_data = [0];
            this.plot_gift_money_data = [0];
            this.plot_ticks = [];

            this.plot = $.jqplot('insurance_final_parity_price_chart_container',
                [this.plot_after_discount_data, this.plot_discount_data, this.plot_gift_money_data],
                {
                    // Tell the plot to stack the bars.
                    title: '精算比价',
                    animate: true,
                    stackSeries: true,
                    captureRightClick: true,
                    seriesDefaults:{
                        renderer:$.jqplot.BarRenderer,
                        rendererOptions: {
                            // Put a 30 pixel margin between bars.
                            barMargin: 10,
                            // Highlight bars when mouse button pressed.
                            // Disables default highlighting on mouse over.
                            highlightMouseDown: true
                        },
                        pointLabels: {show: true}
                    },
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: this.plot_ticks,
                            label: '点击柱状图,显示初算详情'
                        },
                        yaxis: {
                            // Don't pad out the bottom of the data range.  By default,
                            // axes scaled as if data extended 10% above and below the
                            // actual range to prevent data points right on grid boundaries.
                            // Don't want to do that here.
                            padMin: 0
                        }
                    },
                    legend: {
                        labels: ['优惠后', '优惠', '礼包'],
                        show: true,
                        location: 'ne',
                        placement: 'inside'
                    }
                });

            this.result_detail_tpl = _.template(resultDetailTpl);

            this.listenTo(this.actuary_results, 'reset', this._render);
            this.listenTo(this.form_model, 'invalid', this._onFormInvalid);
            this.listenTo(this.form_model, 'sync', this._onApplyPolicySuccess);

        },
        events: {
            'jqplotDataClick #insurance_final_parity_price_chart_container': '_onChartSeriesClick',
            'click .apply-policy-btn': '_onApplyPolicyBtnClick'
        },
        _onChartSeriesClick: function(ev, seriesIndex, pointIndex, data){
            var selected_result = this.actuary_results.models[pointIndex].attributes;

            this.form_model.set('company_id', selected_result.company_id);
            this.form_model.set('result_id', selected_result.result_id);
            //渲染保费折扣详情
            this.$el.find('.result-detail').empty().append(this.result_detail_tpl({
                result: selected_result
            }));
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
            var final_results = collection.models;
            var len = final_results.length;

            this.plot_after_discount_data.splice(0, this.plot_after_discount_data.length);
            this.plot_discount_data.splice(0, this.plot_discount_data.length);
            this.plot_gift_money_data.splice(0, this.plot_gift_money_data.length);
            this.plot_ticks.splice(0, this.plot_ticks.length);

            for(var i = 0; i < len; i++)
            {
                var final_result = final_results[i].attributes;
                this.plot_after_discount_data.push(Number(Number(final_result.totalAfterDiscount - final_result.giftMoney).toFixed(2)));
                this.plot_discount_data.push(Number(Number(final_result.totalStandard - final_result.totalAfterDiscount).toFixed(2)));
                this.plot_gift_money_data.push(Number(final_result.giftMoney));
                this.plot_ticks.push(final_result.company_short_name);
            }

            this.plot.replot({
                data:[this.plot_after_discount_data, this.plot_discount_data, this.plot_gift_money_data],
                resetAxes: true,
                axes:{
                    xaxis: {
                        ticks: this.plot_ticks
                    }
                }
            });
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
