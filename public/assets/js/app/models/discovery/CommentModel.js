/**
 * Created by jkzleond on 15-7-6.
 */

define([
    'backbone'
], function(Backbone){
    var CommentModel = Backbone.Model.extend({
        url: function(){
            var pid = this.get('pid');
            var id = this.get('id');
            if(id)
            {
                return '/discovery/' + pid + '/comments/' + id;
            }
            else
            {
                return '/discovery/' + pid + '/comments';
            }
        },
        parse: function(resp, options)
        {
            if(options.collection) return resp;
            return resp.row;
        },
        validate: function(attrs, options)
        {
            if(attrs.contents.length > 100 || attrs.contents.length < 5)
            {
                return '内容长度不能小于5或大于100';
            }
        }
    });
    return CommentModel;
});
