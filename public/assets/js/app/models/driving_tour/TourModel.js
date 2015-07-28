/**
 * Created by jkzleond on 15-6-26.
 */

define([
    'backbone'
], function(Backbone){
    var TourModel = Backbone.Model.extend({
        urlRoot: '/driving_tour/',
        parse: function(resp, options)
        {
            //是否是集合调用,不是则是ajax返回的的数据
            if(options.collection) return resp; //是集合调用的就直接返回
            return resp.row; //服务端所有返回的模型数据都放在row里
        }
    });
    return TourModel;
});
