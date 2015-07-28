/**
 * Created by jkzleond on 15-7-27.
 */


define([
    'backbone'
], function(Backbone){
    var InsuranceOrderInfoModel = Backbone.Model.extend({
        url: function(){
            return '/insurance/' + this.get('insurance_info_id') +'/order_info';
        },
        parse: function(resp, options){
            if(options.collection) return resp;
            return resp.row || {};
        },
        validate: function(attrs, options){
            if(!attrs.address || !attrs.province_id || !attrs.city_id)
            {
                return '请填写收单地址';
            }
        }
    });
    return InsuranceOrderInfoModel;
});
