/**
 * Created by jkzleond on 15-6-19.
 */

define([
    'jquery',
    'backbone'
], function($, Backbone){
    var CitySelectView = Backbone.View.extend({
        initialize: function(options){
            this.value = options.value || 0;
            this.listenTo(this.collection, 'reset', this.renderItems);
        },
        renderItems: function(collection){
            var $el = this.$el;
            $el.empty();
            $.each(collection.models, function(index, model){
                var city_id = model.get('id');
                var city_name = model.get('name');
                var selected = '';
                if(city_id == this.value) selected = 'selected';
                $el.append('<option value="' + city_id + '" ' + selected + '>' + city_name + '</option>');
            });
            this.$el.selectmenu('refresh'); //jquerymobile选择菜单刷新
        }
    });
    return CitySelectView;
});
