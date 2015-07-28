/**
 * Created by jkzleond on 15-7-14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/insurance/InsuranceFormModel',
    'text!templates/insurance/insurance_page.html'
], function($, _, Backbone, InsuranceFormModel, pageTpl){
    $(pageTpl).appendTo('body');
    var InsurancePageView = Backbone.View.extend({
        form_model: new InsuranceFormModel(),
        el: '#insurance_page',
        initialize: function(options){

        }
    });
    return InsurancePageView;
});
