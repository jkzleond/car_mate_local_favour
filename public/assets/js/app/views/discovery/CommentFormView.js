/**
 * Created by jkzleond on 15-7-9.
 */

define([
    'backbone',
    'models/discovery/CommentModel',
    'jqm'
], function(Backbone, CommentModel
){
    var CommentFormView = Backbone.View.extend({
        model: new CommentModel(),
        _strict_content_len: 100,
        initialize: function(){
            this._strict_content_len = Number(this.$el.find('.content').attr('maxlength'));
            this.listenTo(this.model, 'invalid', this._onModelInvalid);
            this.listenTo(this.model, 'change:id', this._onCommentGen);
        },
        events: {
            'input .content': '_onContentInput',
            'click .submit': '_onSubmit'
        },
        _onContentInput: function(event){
            var $content_box = $(event.target);
            var contents = $content_box.val();
            if(contents.length < 5)
            {
                this.$el.find('.submit').prop('disabled', true);
            }
            else
            {
                this.$el.find('.submit').prop('disabled', false);
            }
            $content_box.val(contents);
            this.$el.find('.char-num').text(this._strict_content_len - contents.length);
        },
        _onSubmit: function(){
            this._collectionFormData();
            if(this.model.isValid())
            {
                this.model.save();
            }
            this.close();
        },
        _onCommentGen: function(model, new_comment_id, options){
            this.trigger('commentgen', this, new_comment_id);
        },
        _onModelInvalid: function(model, err){
            this.trigger('invalid', this, err);
        },
        open: function(){
            this.$el.popup('open');
        },
        close: function(){
            this.$el.popup('close');
        },
        //收集表单数据到模型
        _collectionFormData: function(){
            var self = this;
            this.$el.find('[name]').each(function(i, n){
                var key = $(n).attr('name');
                var value = $(n).val();
                self.model.set(key, value, {silent: true});
            });
            this.model.set('user_id', G.user.user_id);
        }
    });
    return CommentFormView;
});
