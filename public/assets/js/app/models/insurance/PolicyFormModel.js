/**
 * Created by jkzleond on 15-7-27.
 */

define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var PolicyFormModel = Backbone.Model.extend({
        url: function(){
            return '/insurance/'+ this.get('info_id') + '/apply_policy';
        },
        parse: function(resp, options){
            return resp.row || {};
        },
        validate: function(attrs, options){
            if(!attrs.info_id)
            {
                return '没有选择保险信息';
            }

            if(!attrs.company_id)
            {
                return '请选择保险公司(点击柱状图)';
            }
        }
    });
    return PolicyFormModel;
});
