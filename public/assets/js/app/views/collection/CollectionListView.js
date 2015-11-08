define([
	'views/BaseListView',
	'text!templates/collection/collection_list_item.html'
], function(BaseListView, itemTpl){
	var CollectionListView = BaseListView.extend({
		initialize: function(options){	
			options || (options = {});
	        options.item_tpl || (options.item_tpl = itemTpl);
	        BaseListView.prototype.initialize.call(this, options);
		}
	});
	return CollectionListView;
});