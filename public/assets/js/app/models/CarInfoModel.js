define(['backbone'], function(Backbone){
	var CarInfoModel = Backbone.Model.extend({
		url: function(){
			if(this.attributes.id)
			{
				return '/car_info/' + this.attributes.id;
			}
			else
			{
				return '/car_info/' + this.attributes.user_id + '/' + this.attributes.hphm;
			}
		},
		parse: function(resp, options){
			if(options.collection) return resp; //数据来自于集合就直接返回
			return resp.row || {}; //数据来源于model.fetch返回服务器返回的row
		}

	});
	return CarInfoModel;
});