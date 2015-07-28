/**
 * Created by jkzleond on 15-6-26.
 */

define([
    'views/BaseListView',
    'text!templates/activity/activity_list_item.html'
], function(BaseListView, itemTpl){
    var ActivityListView = BaseListView.extend({
        initialize: function(options){
            options || (options = {});
            options.item_tpl || (options.item_tpl = itemTpl);
            BaseListView.prototype.initialize.call(this, options);
        }
    });
    return ActivityListView;
});
