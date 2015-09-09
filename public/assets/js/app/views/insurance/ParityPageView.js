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
            this.plot_actual_amount_data = [0];
            this.plot_gift_data = [0];
            this.plot_ticks = [];

            this.plot = $.jqplot('insurance_parity_price_chart_container',
                [this.plot_actual_amount_data, this.plot_gift_data],
                {
                // Tell the plot to stack the bars.
                    title: '比价',
                    animate: false,
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
                            rendererOptions: {
                                forceTickAt0: true
                            },
                            padMin: 0
                        }
                    },
                    legend: {
                        labels: ['实际只需', '礼包'],
                        show: true,
                        location: 'se',
                        placement: 'inside'
                    }
            });

            this.total_standard = 0;

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
        _resultProcess: function(model, result_model, options){

            var result = result_model.attributes;

            this.standard_compulsory = Number(result.standardCompulsoryInsurance) || 0.00;
            this.after_discount_compulsory = Number(result.afterDiscountCompulsoryInsurance || 0.00);
            this.standard_damage = Number(result.standardDamageInsurance) || 0.00;
            this.coefficient = result.coefficient;
            this.standard_third = Number(result.standardThird) || 0.00;
            this.standard_driver = Number(result.standardDriver) || 0.00;
            this.standard_passenger = Number(result.standardPassenger) || 0.00;
            this.standard_robbery = Number(result.standardRobbery) || 0.00;
            this.standard_glass = Number(result.standardGlass) || 0.00;
            this.standard_scratch = Number(result.standardScratch) || 0.00;
            this.standard_self_ignition = Number(result.standardSelfIgnition) || 0.00;
            this.standard_optional_deductible = Number(result.standardOptionalDeductible) || 0.00;
            this.standard_not_deductible = Number(result.standardNotDeductible) || 0.00;
            this.total_standard = Number(result.totalStandard) || 0.00;

            if(this.company.models.length == 0) return; //保险公司信息还没有加载,则直接返回

            var len = this.company.models.length;
            this.plot_actual_amount_data.splice(0, this.plot_actual_amount_data.length);
            this.plot_gift_data.splice(0, this.plot_gift_data.length);
            this.plot_ticks.splice(0, this.plot_ticks.length);

            for( var i = 0; i < len; i++)
            {
                var company = this.company.models[i].attributes;

                if(company.gift == 0.00 && this.standard_damage) continue;//gift1 == 0.00表示该保险公司不承保车损险
                this.plot_ticks.push(company.short_name);//添加图表X轴ticks

                var discount = Number(company.discount);
                var car_price_discount = Number(company.car_price_discount);
                var after_discount_compulsory = this.after_discount_compulsory;

                //计算含折价折扣的折扣后车损险保费
                var after_discount_damage = 0;
                var car_price = 0;

                if(this.coefficient == 1)
                {
                    car_price = (this.standard_damage - 619.00) * 100 / 1.47 * car_price_discount;
                    after_discount_damage = Math.round((car_price * 1.47 / 100.0 + 619.0) * 100) / 100;
                }
                else if(this.coefficient == 2)
                {
                    car_price = (this.standard_damage - 590.00) * 100 / 1.40 * car_price_discount;
                    after_discount_damage = Math.round((car_price * 1.40 / 100.0 + 590.0) * 100) / 100;
                }
                else if(this.coefficient == 3 || this.coefficient == 4 || this.coefficient == 5)
                {
                    car_price = (this.standard_damage - 584.00) * 100 / 1.39 * car_price_discount;
                    after_discount_damage = Math.round((car_price * 1.39 / 100.0 + 584.0) * 100) /100;
                }
                else if(this.coefficient == 6)
                {
                    car_price = (this.standard_damage - 602.00) * 100 / 1.43 * car_price_discount;
                    after_discount_damage = Math.round((car_price * 1.43 / 100.0 + 602.0) * 100) / 100;
                }

                var after_discount_third = this.standard_third * discount;
                var after_discount_driver = this.standard_driver * discount;
                var after_discount_passenger = this.standard_passenger * discount;
                var after_discount_robbery = this.standard_robbery * discount;
                var after_discount_glass = this.standard_glass * discount;
                var after_discount_scratch = this.standard_scratch * discount;
                var after_discount_self_ignition = this.standard_self_ignition * discount;
                var after_discount_optional_deductible = this.standard_optional_deductible * discount;
                var after_discount_not_deductible = this.standard_not_deductible * discount;
                var total_after_discount = (this.total_standard - this.standard_compulsory) * discount + after_discount_compulsory;

                var gift1 = Number(company.gift);
                var gift2 = Number(company.gift2);

                var gift_money = 0;

                if(!(after_discount_damage == 0))
                {
                    //因为车损险和交强险折扣是单独计算
                    total_after_discount = (this.total_standard - this.standard_damage - this.standard_compulsory) * discount + after_discount_damage + after_discount_compulsory;

                    gift_money = total_after_discount * gift1;
                }
                else
                {
                    gift_money = total_after_discount * gift2;
                }

                this.plot_actual_amount_data.push(Math.floor((total_after_discount - gift_money) * 100)/100);
                this.plot_gift_data.push(Math.ceil((gift_money)*100)/100);
            }

            //console.log(this.plot_ticks = [1,2,3,4]);

            this.plot.replot({
                data:[this.plot_actual_amount_data, this.plot_gift_data],
                resetAxes: true,
                axes:{
                    xaxis: {
                        ticks: this.plot_ticks,
                        numberTicks: this.plot_ticks.length
                    }
                }
            });

        },
        _discountProcess: function(collection, options){

            if(this.total_standard == 0) return; //如果保险总保费为0,则直接退出
            console.log('company');

            var len = this.company.models.length;
            this.plot_actual_amount_data.splice(0, this.plot_actual_amount_data.length);
            this.plot_gift_data.splice(0, this.plot_gift_data.length);
            this.plot_ticks.splice(0, this.plot_ticks.length);

            for( var i = 0; i < len; i++)
            {
                var company = this.company.models[i].attributes;

                if(company.gift == 0.00 && this.standard_damage) continue;//gift1 == 0.00表示该保险公司不承保车损险
                this.plot_ticks.push(company.short_name);//添加图表X轴ticks

                var discount = Number(company.discount);
                var car_price_discount = Number(company.car_price_discount);
                var after_discount_compulsory = this.after_discount_compulsory;

                //计算含折价折扣的折扣后车损险保费
                var after_discount_damage = 0;
                var car_price = 0;

                if(this.coefficient == 1)
                {
                    car_price = (this.standard_damage - 619.00) * 100 / 1.47 * car_price_discount;
                    after_discount_damage = Math.round((car_price * 1.47 / 100.0 + 619.0) * 100) / 100;
                }
                else if(this.coefficient == 2)
                {
                    car_price = (this.standard_damage - 590.00) * 100 / 1.40 * car_price_discount;
                    after_discount_damage = Math.round((car_price * 1.40 / 100.0 + 590.0) * 100) / 100;
                }
                else if(this.coefficient == 3 || this.coefficient == 4 || this.coefficient == 5)
                {
                    car_price = (this.standard_damage - 584.00) * 100 / 1.39 * car_price_discount;
                    after_discount_damage = Math.round((car_price * 1.39 / 100.0 + 584.0) * 100) /100;
                }
                else if(this.coefficient == 6)
                {
                    car_price = (this.standard_damage - 602.00) * 100 / 1.43 * car_price_discount;
                    after_discount_damage = Math.round((car_price * 1.43 / 100.0 + 602.0) * 100) / 100;
                }

                var after_discount_third = this.standard_third * discount;
                var after_discount_driver = this.standard_driver * discount;
                var after_discount_passenger = this.standard_passenger * discount;
                var after_discount_robbery = this.standard_robbery * discount;
                var after_discount_glass = this.standard_glass * discount;
                var after_discount_scratch = this.standard_scratch * discount;
                var after_discount_self_ignition = this.standard_self_ignition * discount;
                var after_discount_optional_deductible = this.standard_optional_deductible * discount;
                var after_discount_not_deductible = this.standard_not_deductible * discount;
                var total_after_discount = (this.total_standard - this.standard_compulsory) * discount + after_discount_compulsory;

                var gift1 = Number(company.gift);
                var gift2 = Number(company.gift2);

                var gift_money = 0;

                if(!(after_discount_damage == 0))
                {
                    //因为车损险和交强险折扣是单独计算
                    total_after_discount = (this.total_standard - this.standard_damage - this.standard_compulsory) * discount + after_discount_damage + after_discount_compulsory;

                    gift_money = total_after_discount * gift1;
                }
                else
                {
                    gift_money = total_after_discount * gift2;
                }

                this.plot_actual_amount_data.push(Math.floor((total_after_discount - gift_money) * 100)/100);
                this.plot_gift_data.push(Math.ceil((gift_money)*100)/100);
            }

            this.plot.replot({
                data:[this.plot_actual_amount_data, this.plot_gift_data],
                resetAxes: true,
                axes:{
                    xaxis: {
                        ticks: this.plot_ticks,
                        numberTicks: this.plot_ticks.length
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
