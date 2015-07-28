/**
 * Created by jkzleond on 15-6-29.
 */

define([
    'backbone'
], function(Backbone){
    var ActivitySignFormModel = Backbone.Model.extend({
        urlRoot: '/activity/sign_up/',
        _cn_str_reg: /^[\u4e00-\u9fa5]+$/,
        _phone_reg: /^\d{11}$/,
        _id_no_reg: /^\d{17}[\d\w]$/,
        _number_reg: /\d+/,

        validate: function(attrs, options){

            if(typeof attrs.user_id !== 'undefined' && attrs.user_id == '')
            {
                return '请输入用户名!';
            }

            if(typeof attrs.uname !== 'undefined' && (attrs.uname == '' || !this._cn_str_reg.test(attrs.uname)))
            {
                return '请输入真实姓名!';
            }

            if(typeof attrs.idno !== 'undefined' && (attrs.idno == '' || !this._id_no_reg.test(attrs.idno)))
            {
                return '请输入真实有效的生分证号!';
            }

            if(typeof attrs.phone !== 'undefined' && (attrs.phone == '' || !this._phone_reg.test(attrs.phone)))
            {
                return '请输入正确的手机号';
            }

            if(typeof attrs.people !== 'undefined' && (!this._number_reg.test(attrs.people) || attrs.people <= 0 ))
            {
                return '请输入正确人数';
            }


            if(typeof attrs.pay_items !== 'undefined' && attrs.pay_items.length < 1)
            {
                return '请确认收费项目';
            }

        }
    });
    return ActivitySignFormModel;
});
