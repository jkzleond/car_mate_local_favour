/**
 * Created by jkzleond on 15-6-10.
 */

define([
    'jquery',
    'backbone'
], function($, Backbone){
    var ClockInModel = Backbone.Model.extend({
        urlRoot: '/clock_in.json',
        parse: function(res, options){
            return res.row;
        }
    });

    return ClockInModel;
});
