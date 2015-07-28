/**
 * Created by jkzleond on 15-7-26.
 */

define([
    'backbone'
], function(Backbone){
    var FinalResultModel = Backbone.Model.extend({
        urlRoot: '/insurance/final_result/',
        parse: function(resp, options){
            if(options.collection) return resp;
            return resp.row || {};
        }
    });
    return FinalResultModel;
});
