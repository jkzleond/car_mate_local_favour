/**
 * Created by jkzleond on 15-6-22.
 */

define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var InsuranceFormModel = Backbone.Model.extend({
        url: '/insurance/first',
        parse: function(resp, options){
            return resp.row || {};
        },
        validate: function(attrs, options){
            var car_price_regexp = /\d+/;
            if(!_.isUndefined(attrs.car_price) && (attrs.car_price < 1 || !car_price_regexp.test(attrs.car_price))){
                return '车价必须为数字且大于1';
            }

            if(!_.isUndefined(attrs.compulsory_state_id) && !attrs.compulsory_state_id)
            {
                return '请选择交强险出现情况';
            }


            var phone_regexp = /\d{11}/;
            if(!_.isUndefined(attrs.phone) && !phone_regexp.test(attrs.phone)){
                return '手机号码不合法';
            }

            if(!_.isUndefined(attrs.third) && attrs.third < 0)
            {
                return '第三方责任险金额必须大于0';
            }

            if(!_.isUndefined(attrs.driver) && attrs.driver < 0)
            {
                return '司机座椅责任险金额必须大于0';
            }

            if(!_.isUndefined(attrs.passenger) && attrs.passenger < 0)
            {
                return '乘客座椅责任险金额必须大于0';
            }

            if(!_.isUndefined(attrs.glass_id) && !attrs.glass_id)
            {
                return '玻璃单独破损险玻璃种类必须选择';
            }

            if(!_.isUndefined(attrs.scratch) && attrs.scratch < 0)
            {
                return '车身划痕险金额必须大于0';
            }

            if(!_.isUndefined(attrs.optional_deductible) && attrs.optional_deductible < 0)
            {
                return '可选免赔额金额必须大于等于0';
            }
        }
    });
    return InsuranceFormModel;
});
