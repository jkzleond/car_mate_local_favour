/**
 * Created by jkzleond on 15-7-14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/insurance/InsuranceFormModel',
    'models/insurance/InsuranceInfoModel',
    'collections/insurance/InsuranceCompanyCollection',
    'text!templates/insurance/compulsory_set_page.html',
    'text!templates/insurance/discount_detail.html'
], function($, _, Backbone, InsuranceFormModel, InsuranceInfoModel, InsuranceCompanyCollection, pageTpl, discountDetailTpl){
    $(pageTpl).appendTo('body');
    var CompulsorySetPageView = Backbone.View.extend({
        model: new InsuranceFormModel(),
        el: '#insurance_compulsory_set_page',
        initialize: function(){

            this.insurance_info = new InsuranceInfoModel();
            this.company = new InsuranceCompanyCollection();

            this.discount_detail_tpl = _.template(discountDetailTpl);

            this.listenTo(this.model, 'change:info_id', this._onNewInsuranceInfoGen);
            this.listenTo(this.insurance_info, 'change:result', this._resultProcess);
            this.listenTo(this.company, 'reset', this._discountProcess);
        },
        events: {
            'change [name=compulsory_state_id]': '_onCompulsoryStateChange',
            'click .apply-actual-btn': '_onApplyActualBtnClick'
        },
        _onApplyActualBtnClick: function(event){
            this.trigger('uri', this, 'insurance/apply_actual/' + this.insurance_info.get('id') + '/compulsory');
        },
        _onFormModelInvalid: function(model, err){
            $.cm.toast({msg: err});
        },
        _onNewInsuranceInfoGen: function(model, new_info_id, options){
            this.insurance_info.set('id', new_info_id, {silent: true});
            this.insurance_info.fetch();
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
            if( !this.insurance_info.result.get('totalStandard') ) return; //如果保险总保费为0,则直接退出

            var selected_company = this.company.models[0].attributes; //这里只需要第一家(首推的保险公司)
            var result = this.insurance_info.result.attributes;

            //渲染保费折扣详情
            this.$el.find('.discount-detail').empty().append(this.discount_detail_tpl({
                company: selected_company,
                result: result
            }));
            this.$el.find('.apply-actual-btn').show();
        },
        reset: function(state_id){
            this.$el.find('[name=compulsory_state_id]').val('');
            this.$el.find('.apply-actual-btn').hide();
            this.$el.find('.discount-detail').empty();
            this.insurance_info.clear({silent: true});
            this.insurance_info.result.clear({silent: true});
            this.company.fetch({reset: true});
            this.model.set('compulsory_state_id', state_id, {silent: true});
            this.model.save();
        }
    });
    return CompulsorySetPageView;
});
