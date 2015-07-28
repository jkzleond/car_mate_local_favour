/**
 * Created by jkzleond on 15-7-17.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/insurance/InsuranceInfoModel',
    'collections/insurance/InsuranceCompanyCollection',
    'text!templates/insurance/parity_price_page.html',
    'text!templates/insurance/discount_detail.html',
    'jqplot_bar'
], function($, _, Backbone, InsuranceInfoModel, InsuranceCompanyCollection, pageTpl, discountDetailTpl){
    $(pageTpl).appendTo('body');
    var ParityPageView = Backbone.View.extend({
        el: '#insurance_parity_price_page',
        initialize: function(options){
            this.plot_after_discount_data = [0];
            this.plot_discount_data = [0];
            this.plot_ticks = [];

            this.plot = $.jqplot('insurance_parity_price_chart_container',
                [this.plot_after_discount_data, this.plot_discount_data],
                {
                // Tell the plot to stack the bars.
                    title: '比价',
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
                        labels: ['优惠后', '优惠'],
                        show: true,
                        location: 'ne',
                        placement: 'inside'
                    }
            });

            this.total_standard = 0;
            this.total_business = 0;
            this.after_discount_compulsory = 0;

            this.discount_detail_tpl = _.template(discountDetailTpl);

            this.insurance_info = new InsuranceInfoModel();
            this.company = new InsuranceCompanyCollection();

            this.listenTo(this.insurance_info, 'change:result', this._resultProcess);
            this.listenTo(this.company, 'reset', this._discountProcess);
        },
        events: {
            'jqplotDataClick #insurance_parity_price_chart_container': '_onChartSeriesClick',
            'click .apply-actual-btn': '_onApplyActualBtnClick'
        },
        //比价图标series点击事件
        _onChartSeriesClick: function(ev, seriesIndex, pointIndex, data){
            var selected_company = this.company.models[pointIndex].attributes;
            var result = this.insurance_info.result.attributes;

            //渲染保费折扣详情
            this.$el.find('.discount-detail').empty().append(this.discount_detail_tpl({
                company: selected_company,
                result: result
            }));
            this.$el.find('.apply-actual-btn').show();
        },
        _onApplyActualBtnClick: function(event){
            this.trigger('uri', this, 'insurance/apply_actual/' + this.insurance_info.get('id'));
        },
        _resultProcess: function(model, result, options){
            this.total_standard = Number(result.get('totalStandard'));
            this.total_business = Number(this.total_standard) - Number(result.get('standardCompulsoryInsurance'));
            this.after_discount_compulsory = Number(result.get('afterDiscountCompulsoryInsurance'));
            if(this.company.models.length == 0) return; //保险公司信息还没有加载,则直接返回

            var len = this.company.models.length;
            this.plot_after_discount_data.splice(0, this.plot_after_discount_data.length);
            this.plot_discount_data.splice(0, this.plot_discount_data.length);
            for( var i = 0; i < len; i++)
            {
                var after_discount_business = this.total_business * Number(this.company.models[i].get('discount'));
                var total_after_discount = after_discount_business + this.after_discount_compulsory;
                this.plot_after_discount_data.push(Math.floor(total_after_discount * 100)/100);
                this.plot_discount_data.push(Math.ceil((this.total_standard - total_after_discount)*100)/100);
            }

            this.plot.replot({
                data:[this.plot_after_discount_data, this.plot_discount_data],
                resetAxes: true,
                axes:{
                    xaxis: {
                        ticks: this.plot_ticks
                    }
                }
            });

        },
        _discountProcess: function(collection, options){
            var len = this.company.models.length;
            this.plot_ticks.splice(0, this.plot_ticks.length);
            for( var i = 0; i < len; i++)
            {
                this.plot_ticks.push(this.company.models[i].get('short_name'));
            }

            if(this.total_standard == 0) return; //如果保险总保费为0,则直接退出

            this.plot_after_discount_data.splice(0, this.plot_after_discount_data.length);
            this.plot_discount_data.splice(0, this.plot_discount_data.length);

            for( var i = 0; i < len; i++)
            {
                var after_discount_business = this.total_business * Number(this.company.models[i].get('discount'));
                var total_after_discount = after_discount_business + this.after_discount_compulsory;
                this.plot_after_discount_data.push(Math.floor(total_after_discount * 100)/100);
                this.plot_discount_data.push(Math.ceil((this.total_standard - total_after_discount)*100)/100);
            }

            this.plot.replot({
                data:[this.plot_after_discount_data, this.plot_discount_data],
                resetAxes: true,
                axes:{
                    xaxis: {
                        ticks: this.plot_ticks
                    }
                }
            });
        },
        loadInfo: function(info_id){
            this.$el.find('.apply-actual-btn').hide();
            this.$el.find('.discount-detail').empty();
            this.insurance_info.set('id', info_id, {silent: true});
            this.insurance_info.fetch();
            this.company.fetch({reset: true});
        }

    });
    return ParityPageView;
});
