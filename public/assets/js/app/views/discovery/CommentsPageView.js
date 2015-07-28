/**
 * Created by jkzleond on 15-7-8.
 */

define([
    'backbone',
    'models/DiscoveryModel',
    'views/discovery/CommentListView',
    'text!templates/discovery/comments_page_view.html'
], function(Backbone, DiscoveryModel, CommentListView, pageTpl){
    $(pageTpl).appendTo('body');
    var CommentsPageView = Backbone.View.extend({
        el: '#discovery_comments_page',
        initialize: function(){
            this.discovery_model = new DiscoveryModel();
            this.comment_list_view = new CommentListView({
                el: this.$el.find('.comments-container')[0],
                collection: this.discovery_model.comments
            });
            this.listenTo(this.discovery_model, 'change:title', this.renderTitle);
            this.listenTo(this.discovery_model.comments, 'change:total', this.renderTotal);
        },
        setDiscoveryId: function(discovery_id){
            this.discovery_model.set('id', discovery_id);
            this.discovery_model.fetch();
        },
        renderTitle: function(model){
            this.$el.find('.title').text(model.get('title'));
        },
        renderTotal: function(collection){
            this.$el.find('.comments-num').text(collection.total);
        }
    });
    return CommentsPageView;
});
