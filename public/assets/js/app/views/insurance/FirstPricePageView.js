/**
 * Created by jkzleond on 15-7-17.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/insurance/InsuranceInfoModel',
    'collections/insurance/InsuranceCompanyCollection',
    'text!templates/insurance/first_price_page.html',
    'text!templates/insurance/discount_detail.html',
    'jqplot_bar'
], function($, _, Backbone, InsuranceInfoModel, InsuranceCompanyCollection, pageTpl, discountDetailTpl){
    $(pageTpl).appendTo('body');
    var ParityPageView = Backbone.View.extend({
        el: '#insurance_first_price_page',
        initialize: function(options){
            
            this.total_standard = 0;

            this.discount_detail_tpl = _.template(discountDetailTpl);

            this.insurance_info = new InsuranceInfoModel();
            this.company = new InsuranceCompanyCollection();

            this.listenTo(this.insurance_info, 'change:result', this._resultProcess);
            this.listenTo(this.company, 'reset', this._discountProcess);
        },
        events: {
            'click .apply-actual-btn': '_onApplyActualBtnClick'
        },
        _onApplyActualBtnClick: function(event){
            this.trigger('uri', this, 'insurance/apply_actual/' + this.insurance_info.get('id'));
        },
        _resultProcess: function(model, result_model, options){

            if(this.company.models.length == 0) return; //保险公司信息还没有加载,则直接返回

            var selected_company = this.company.models[0].attributes; //这里只需要第一家(首推的保险公司)
            var result = this.insurance_info.result.attributes;

            //渲染保费折扣详情
            this.$el.find('.discount-detail').empty().append(this.discount_detail_tpl({
                company: selected_company,
                result: result
            }));
            this.$el.find('.apply-actual-btn').show();
        },
        _discountProcess: function(collection, options){

            if(this.total_standard == 0) return; //如果保险总保费为0,则直接退出

            var selected_company = this.company.models[0].attributes; //这里只需要第一家(首推的保险公司)
            var result = this.insurance_info.result.attributes;

            //渲染保费折扣详情
            this.$el.find('.discount-detail').empty().append(this.discount_detail_tpl({
                company: selected_company,
                result: result
            }));
            this.$el.find('.apply-actual-btn').show();
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
