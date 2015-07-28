/**
 * Created by jkzleond on 15-6-9.
 */

define(
    ['jquery', 'backbone', 'collections/discovery/CommentCollection'],
    function($, Backbone, CommentCollection){
        var DiscoveryModel = Backbone.Model.extend({
            urlRoot: '/discovery',
            initialize: function(attrs, options){
                this.comments = new CommentCollection();
                this.listenTo(this, 'change:id', this._onIdChange);
            },
            parse: function(res, options){
                //判断是否是由集合调用, 如果是则不用进一步解析
                if(options.collection) return res;
                return res.row;
            },
            _onIdChange: function()
            {
                this.comments.setDiscoveryId(this.get('id'));
                this.comments.fetch();
            }
        });

        return DiscoveryModel;
});
