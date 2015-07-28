/**
 * Created by jkzleond on 15-7-17.
 */

define([
    'backbone'
], function(Backbone){
    var InsuranceCompanyModel = Backbone.Model.extend({
        //urlRoot: '',
        parse: function(resp, options){
            if(options.collection) return resp;
            return resp.row || {};
        }
    });
    return InsuranceCompanyModel;
});
