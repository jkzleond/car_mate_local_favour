/**
 * Created by jkzleond on 15-7-17.
 */

define([
    'backbone',
    'models/insurance/InsuranceCompanyModel'
], function(Backbone, InsuranceCompanyModel){
    var InsuranceCompanyCollection = Backbone.Collection.extend({
        model: InsuranceCompanyModel,
        rows: 5,
        url: function(){
            return '/insurance/companise';
        },
        parse: function(resp, options){
            return resp.rows || [];
        }
    });
    return InsuranceCompanyCollection;
});
