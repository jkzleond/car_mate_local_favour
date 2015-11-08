define([
	'backbone'
], function(Backbone){
	var CollectionModel = Backbone.Model.extend({
        urlRoot: '/collection/',
        parse: function(resp, options)
        {
            //是否是集合调用,不是则是ajax返回的的数据
            if(options.collection) return resp; //是集合调用的就直接返回
            return resp.row; //服务端所有返回的模型数据都放在row里
        }
    });
    return CollectionModel;
});