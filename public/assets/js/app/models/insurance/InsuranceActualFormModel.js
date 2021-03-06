/**
 * Created by jkzleond on 15-7-20.
 */

define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var InsuranceActualFormModel = Backbone.Model.extend({
        url: '/insurance/actual',
        parse: function(resp, options){
            return resp.row || {};
        },
        validate: function(attrs, options){
            var phone_regexp = /\d{11}/;
            var hphm_regexp = /^[\u4e00-\u9fa5][A-Z][A-Za-z\d]{5}$/;
            var cn_str_reg = /^[\u4e00-\u9fa5]+$/;
            var id_no_reg = /^\d{17}[\d\w]$/;
            if(!_.isUndefined(attrs.phone) && !phone_regexp.test(attrs.phone))
            {
                return '手机号码不合法';
            }

            if(_.isUndefined(attrs.no_hphm) && !_.isUndefined(attrs.hphm) && !attrs.hphm)
            {
                return '请填写车牌号';
            }

            if(!_.isUndefined(attrs.hphm) && !hphm_regexp.test(attrs.hphm))
            {
                return '号牌号码不正确';
            }


            if(!_.isUndefined(attrs.auto_name) && !attrs.auto_name)
            {
                return '请填写车辆品牌种类(车型)';
            }
            if(!_.isUndefined(attrs.frame_number) && !attrs.frame_number)
            {
                return '请填写车架号';
            }
            if(!_.isUndefined(attrs.engine_number) && !attrs.engine_number)
            {
                return '请填写发动机号';
            }
            if(!_.isUndefined(attrs.user_name) && (!attrs.user_name || !cn_str_reg.test(attrs.user_name)))
            {
                return '请填写真实姓名';
            }
            /*if(!_.isUndefined(attrs.sfzh) && (!attrs.sfzh || !id_no_reg.test(attrs.sfzh) ))
            {
                return '请填写正确的身份证号';
            }*/
            if(!_.isUndefined(attrs.driving_license_a) && !attrs.driving_license_a)
            {
                return '请上传行车证正面';
            }
            if(!_.isUndefined(attrs.driving_license_b) && !attrs.driving_license_b)
            {
                return '请上传行车证反面';
            }
            if(!_.isUndefined(attrs.idcard) && !attrs.idcard)
            {
                return '请上传身份证正面';
            }
        }
    });
    return InsuranceActualFormModel;
});

