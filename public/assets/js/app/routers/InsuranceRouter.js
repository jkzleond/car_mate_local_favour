/**
 * Created by jkzleond on 15-6-17.
 */
/**
 * 保险巨惠相关路由
 */
define([
    'jquery',
    'backbone',
    'text!/insurance',
    'models/insurance/InsuranceFormModel',
    'collections/ProvinceCollection',
    'collections/CityCollection',
    'views/insurance/InsuranceFormView'
], function($, Backbone, insurancePage, InsuranceFormModel, ProvinceCollection, CityCollection, InsuranceFormView){
    var InsuranceRouter = Backbone.Router.extend({
        initialize: function(){
            //加载保险入口页面
            $(insurancePage).appendTo('body').enhanceWithin();

            this.insurance_form_view = new InsuranceFormView({
                el: '#insurance_form',
                model: new InsuranceFormModel(),
                province_collection: new ProvinceCollection(),
                city_collection: new CityCollection(),
                city_value: G.user.city_id || 1
            });

            this.listenTo(this.insurance_form_view, 'submit', this.onFormSubmit);
            this.listenTo(this.insurance_form_view.model, 'invalid', this.onFormDataInvalid);
        },
        onProvinceSelectChange: function(view, old_value, new_value){
            this.city_select_view.collection.setProvinceId(new_value);
        },
        onFormSubmit: function(){
            if(!this.insurance_form_view.model.isValid()) return;
            var router = this;
            this.insurance_form_view.model.save(null, {
                success: function(model, resp, options){
                    if(resp.success) router.navigate('insurance/result/' + model.get('new_info_id'), {trigger: true});
            }});
        },
        onFormDataInvalid: function(model, error){
            $.cm.toast({
                msg: error
            });
        },
        routes: {
            //保险巨惠首页
            'insurance': 'index',
            'insurance/result/:info_id': 'insuranceResult'//初算结果
        },
        index: function(){
            $(':mobile-pagecontainer').pagecontainer('change', '#insurance_page');
            this.insurance_form_view.setProvinceValue(G.user.province_id || 1);
            this.insurance_form_view.province_collection.fetch({reset: true});
        },
        insuranceResult: function(insurance_info_id){
            console.log(insurance_info_id);
            $(':mobile-pagecontainer').pagecontainer('change', '#insurance_result_page');
        }
    });
    return InsuranceRouter;
});