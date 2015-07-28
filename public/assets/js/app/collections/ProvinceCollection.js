/**
 * Created by jkzleond on 15-6-19.
 */

define([
    'backbone',
    'models/ProvinceModel'
], function(Backbone, Province){
    var ProvinceCollection = Backbone.Collection.extend({
        model: Province,
        url: function(){
            return '/provinces'
        },
        parse: function(res, options){
            return res.rows;
        }
    });
    return ProvinceCollection;
});
