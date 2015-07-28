/**
 * Created by jkzleond on 15-7-6.
 */

define([
    'views/BaseListView',
    'collections/discovery/CommentCollection',
    'text!templates/discovery/comment_list_item.html'
], function(BaseListView, CommentCollection, itemTpl){
    var CommentListView = BaseListView.extend({
        initialize: function(options)
        {
            options || (options = {});
            options.item_tpl || (options.item_tpl = itemTpl);
            BaseListView.prototype.initialize.call(this, options);
            this.collection || (this.collection = new CommentCollection());
        }
    });
    return CommentListView;
});
