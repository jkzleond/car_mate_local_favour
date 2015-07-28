/**
 * Created by jkzleond on 15-7-17.
 */

define([
    'backbone'
], function(Backbone){
    var InsuranceResultModel = Backbone.Model.extend({
        urlRoot: '/insurance/first_result/',
        parse: function(resp, options){
            if(options.collection) return resp;
            return resp.row || {};
        }
    });
    return InsuranceResultModel;
});
