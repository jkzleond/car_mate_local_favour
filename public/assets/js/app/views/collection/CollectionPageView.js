define([
	'jquery',
	'backbone',
	'text!templates/collection/collection_page.html',
	'collections/collection/CollectionCollection',
	'views/collection/CollectionListView'
], function($, Backbone, pageTpl, CollectionCollection, CollectionListView){
	$(pageTpl).appendTo('body');
    var CollectionPageView = Backbone.View.extend({
        initialize: function(){
            this.collection_list_view = new CollectionListView({
                el: '#collection_list_view',
                collection: new CollectionCollection()
            });
        },
        reset: function(){
        	this.collection_list_view.collection.reset();
        	this.collection_list_view.collection.fetch();
        }
    });
    return CollectionPageView;
});