/**
 * Created by jkzleond on 15-6-27.
 */

define([
    'backbone'
], function(Backbone){
    var NavView = Backbone.View.extend({
        events: {
            'click .item': 'onItemClick'
        },
        onItemClick: function(event)
        {
            this.trigger('click:item', this, event.target);
        }
    });
    return NavView;
});
