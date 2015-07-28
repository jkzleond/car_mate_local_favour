/**
 * Created by jkzleond on 15-6-14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/discovery/listItem.html'
], function($, _, Backbone, listItemTpl){
    var DiscoveryListView = Backbone.View.extend({
        initialize: function(){
            this.item_list_tpl = _.template(listItemTpl);
            //加载更多按钮,放到listView最后
            this.$pager = $('<div class="pager ui-btn ui-btn-a" style="display:none"><span>加载更多</span></div>');
            this.$el.append(this.$pager);
            //list view 里面的 ul
            this.$list = this.$el.find('.discovery-list');
            this.listenTo(this.collection, 'add', this.addItem);
            this.listenTo(this.collection, 'reset', this.resetItems);
            this.listenTo(this.collection, 'reset', this.setPager);
            this.listenTo(this.collection, 'page_end', this.setPager);
            this.listenTo(this.collection, 'change:type', this.setIndicator);
        },
        render: function(model){
            //console.log(arguments)
        },
        addItem: function(model){
            this.$list.append(this.item_list_tpl(model.toJSON()));
        },
        //设置翻页按钮
        setPager: function(collection, opions)
        {
            console.log('page_end');
            //如果还有更过数据
            if(collection.models.length < collection.total)
            {
                this.$pager.show();
            }
            else
            {
                this.$pager.hide();
            }
        },
        resetItems: function(collection, options){
            this.$list.empty();
            var models = collection.models;
            var len = models.length;
            for(var i = 0; i < len; i++)
            {
                this.$list.append(this.item_list_tpl(models[i].toJSON()));
            }
        },
        setIndicator: function(collection){

        },
        loadMore: function(){
            this.collection.nextPage();
        },
        events: {
            'click .pager': 'loadMore'
        }
    });

    return DiscoveryListView;
});
