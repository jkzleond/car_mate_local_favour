/**
 * Created by jkzleond on 15-6-16.
 */
define([
    'underscore',
    'backbone',
    'models/DiscoveryModel',
    'views/discovery/CommentListView',
    'views/discovery/CommentFormView'
], function(_, Backbone, DiscoveryModel, CommentListView, CommentFormView){
    var DiscoveryDetailView = Backbone.View.extend({
        initialize: function(options){
            this.model || (this.model = new DiscoveryModel());
            this.comment_form_view = new CommentFormView({
                el: '#discovery_add_comment_popup'
            });
            this.comment_list_view = new CommentListView({
                el: '#discovery_comments_container',
                collection: this.model.comments
            });
            this.comment_more_href_tpl = _.template(this.$el.find('#discovery_comments_more').attr('href'));
            this.listenTo(this.model.comments, 'change:total', this.renderCommentsTotal);
            this.listenTo(this.model, 'change:id', this.clearPage);
            this.listenTo(this.model, 'change:id', this.renderCommentMore);
            this.listenTo(this.model, 'change:id', this._setCommentFormModelPid);
            this.listenTo(this.model, 'change:title', this._renderTitle)
            this.listenTo(this.model, 'change:content', this.renderContent);
            this.listenTo(this.comment_form_view, 'commentgen', this._onCommentGen);
        },
        events: {
            'click #discovery_add_comment_btn': '_onAddCommentBtnClick'
        },
        _onAddCommentBtnClick: function(event){
            this.comment_form_view.open();
        },
        _onCommentGen: function(view, new_comment_id){
            this.model.comments.reset();
            this.model.comments.fetch();
        },
        _setCommentFormModelPid: function(model, new_discovery_id, options){
            this.comment_form_view.model.set('pid', new_discovery_id);
        },
        clearPage: function(model, new_id, options){
            this.$el.find('#discovery_content').html('');
            this.$el.find('#discovery_comments_num').text('');
        },
        renderCommentsTotal: function(collection){
            this.$el.find('#discovery_comments_num').text(collection.total);
        },
        renderCommentMore: function(model){
            var href = this.comment_more_href_tpl({id: model.get('id')});
            this.$el.find('#discovery_comments_more').attr('href', href);
        },
        _renderTitle: function(model, new_title, options){
            $('title').text(new_title);
            model.set('title', '', {silent: true});
        },
        renderContent: function(model){
            this.$el.find('#discovery_content').html(model.get('content'));
        }
    });
    return DiscoveryDetailView;
});
