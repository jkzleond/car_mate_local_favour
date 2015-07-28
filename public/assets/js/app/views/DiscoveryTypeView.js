/**
 * Created by jkzleond on 15-6-15.
 */
define([
    'backbone'
], function(Backbone){
    var DiscoverTypeView = Backbone.View.extend({
        initialize: function(){
            this.listenTo(this.collection, 'change:active_type', this.setActiveIndicator);
        },
        setActiveIndicator: function(collection){
            //先移出先前的激活状态
            if(this.$active_btn) this.$active_btn.removeClass('ui-btn-active');
            this.$el.find('a[data-type-id].ui-btn-active').removeClass('ui-btn-active');
            //添加新的激活状态
            this.$active_btn = this.$el.find('[data-type-id=' + collection.active_type + ']');
            this.$active_btn.addClass('ui-btn-active');
            if(this.$active_rel) this.$active_rel.hide();
            var rel = this.$active_btn.attr('data-rel');
            this.$active_rel = $(rel);
            this.$active_rel.show();
        }
    });
    return DiscoverTypeView;
});
