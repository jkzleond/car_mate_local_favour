/**
 * Created by jkzleond on 15-6-19.
 */

define([
    'jquery',
    'backbone'
], function($, Backbone){
    var ProvinceSelectView = Backbone.View.extend({
        initialize: function(options){
            this.value = options.value;
            this.listenTo(this.collection, 'reset', this.renderItems);
        },
        renderItems: function(collection){
            var len = collection.models.length;
            for(var i = 0; i < len; i++)
            {
                var model = collection.models[i];
                var province_id = model.get('id');
                if(province_id == 0) continue; //跳过全国(不显示全国的选项)
                var province_name = model.get('name');
                var selected = '';
                if (province_id == this.value) selected = 'selected';

                this.$el.append('<option value="' + province_id + '" ' + selected + '>' + province_name + '</option>');
            }
            this.$el.selectmenu('refresh'); // jquerymobile 选择菜单控件
        },
        setValue: function(value){
            if(this.value == value) return;
            this.temp_value = value; //零时值
            this.$el.val(value);
            this.$el.change();//手动触发$el的change事件
        },
        events: {
            'change': '_change'
        },
        _change: function(){
            var old_value = this.value;
            var new_value = this.value = this.$el.val() || this.temp_value;
            this.trigger('change', this, old_value, new_value);
        }
    });
    return ProvinceSelectView;
});
