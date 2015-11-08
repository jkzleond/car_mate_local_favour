/**
 * 我的收藏路由
 */

define([
	'jquery',
	'backbone',
	'views/collection/CollectionPageView',
	'jqm'
], function($, Backbone, CollectionPageView){
	var CollectionRouter = Backbone.Router.extend({
		initialize: function(){
			this.collection_page_view = new CollectionPageView();
		},
		routes: {
			'collection/list': 'index'
		},
		index: function(){
            $(':mobile-pagecontainer').pagecontainer('change', '#collection_page');
			this.collection_page_view.reset();
		}
	});

	return CollectionRouter;
});