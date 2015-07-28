/**
 * Created by jkzleond on 15-6-27.
 */

/**
 * ListView基类(配合PaginationCollection子类,支持加载更多)
 */

define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var BaseListView = Backbone.View.extend({
        initialize: function(options){
            options || (options = {});
            options.item_tpl || (options.item_tpl = '');
            this.item_tpl = _.template(options.item_tpl);
            //加载更多按钮,放到listView最后
            this.$pager = this.$el.find('.pager').hide();
            //this.$pager = $('<div class="pager ui-btn ui-btn-a" style="display:none"><span>加载更更多</span></div>');
            //this.$el.find('.pager-container').append(this.$pager);
            //list view 里面的 ul
            this.$item_container = this.$el.find('.item-container');
            this.listenTo(this.collection, 'add', this.addItem);
            this.listenTo(this.collection, 'reset', this.resetItems);
            this.listenTo(this.collection, 'change:total', this.showPager);
            this.listenTo(this.collection, 'page_end', this.hidePager);
            this.listenTo(this.collection, 'change:type', this.setIndicator);
        },
        render: function(model){
            //console.log(arguments)
        },
        addItem: function(model){
            this.$item_container.append(this.item_tpl(model.toJSON()));
        },
        //设置翻页按钮
        showPager: function(collection, options)
        {
            this.$pager.show();
        },
        hidePager: function(collection, options){
            this.$pager.hide();
        },
        resetItems: function(collection, options){
            this.$item_container.empty();
            var models = collection.models;
            var len = models.length;
            for(var i = 0; i < len; i++)
            {
                this.$item_container.append(this.item_tpl(models[i].toJSON()));
            }
            this.$pager.hide();
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

    return BaseListView;
});

