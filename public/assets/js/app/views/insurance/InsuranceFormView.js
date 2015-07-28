/**
 * Created by jkzleond on 15-6-21.
 */

/**
 * 保险获取价格表view
 */

define([
    'jquery',
    'backbone',
    'views/ProvinceSelectView',
    'views/CitySelectView'
], function($, Backbone, ProvinceSelectView, CitySelectView){
    var InsuranceFormView = Backbone.View.extend({
        initialize: function(options){
            this.province_collection = options.province_collection;
            this.city_collection = options.city_collection;
            this.province_select_view = new ProvinceSelectView({
                collection: this.province_collection,
                el: '#insurance_province_sel',
                value: options.province_vlaue
            });
            this.city_select_view = new CitySelectView({
                collection: this.city_collection,
                el: '#insurance_city_sel',
                value: options.city_value
            });
            this.listenTo(this.province_select_view, 'change', this.onProvinceSelectChange);

            //默认选择最简套餐
            this.$el.find('[name=insurance_set_id]').val('3').change();

            //绑定子视图事件,同步更新模型

            var self = this;

            this.province_select_view.$el.change(function(){
                self.model.set({province_id: $(this).val()});
            });

            this.city_select_view.$el.change(function(){
                self.model.set({city_id: $(this).val()});
            });
        },
        setProvinceValue: function(value){
            this.province_select_view.setValue(value);
        },
        //获取model,同时收集表单数据到model
        getModel: function(){
            this.model.set({
                'province_id': this.province_select_view.$el.val(),
                'city_id': this.city_select_view.$el.val(),
                'car_price': this.$el.find('[name=car_price]').val(),
                'phone': this.$el.find('[name="phone"]').val(),
                'service_years': this.$el.find('[name="service_price"]').val()
            });
            return this.model;
        },
        //收集表单数据到模型
        _collectFormData: function()
        {
            var model_attrs = {};
            var not_need = [];
            var need_regexp = /^need_(.*)/;
            this.$el.find('[name]').each(function(index, feild){
                var attr_key = $(feild).attr('name');

                if(not_need.indexOf(attr_key) != -1) return; //字段不需要则跳过

                //跳过没有选中的checkbox
                if($(feild).attr('type') == 'checkbox' && !$(feild).prop('checked'))
                {
                    var matches = attr_key.match(need_regexp);
                    var not_need_key = matches ? matches[1] : null;
                    if(not_need_key)
                    {
                        if(not_need_key in model_attrs)
                        {
                            delete model_attrs[not_need_key];
                        }
                        else
                        {
                            not_need.push(not_need_key);
                        }
                    }
                    return;
                }

                var attr_value = $(feild).val();

                if(attr_key == 'car_price' || attr_key == 'driver' || attr_key == 'passenger') attr_value = attr_value * 10000;

                model_attrs[attr_key] = attr_value;
            });
            this.model.clear({silent: true}).set(model_attrs, {silent: true});
        },
        onProvinceSelectChange: function(view, old_value, new_value){
            this.city_select_view.collection.setProvinceId(new_value);
        },
        events: {
            'change [car_price]': 'onCarPriceChange',
            'change [name=phone]': 'onPhoneChange',
            'change [name=service_year]': 'onServiceYearChange',
            'change [name=insurance_set_id]': 'onInsuranceSetChange',
            'change [name=damage]': 'onDamageChange', //车损险checkbox改变时事件
            'change [name=self_ignition]': 'onSelfIgnitionChange', //车损险checkbox改变时事件
            'click #insurance_get_price_btn': 'onGetPriceClick'
        },
        onCarPriceChange: function(){
            var car_price = this.$el.find('[name="car_price"]').val();
            this.model.set({car_price: car_price});
        },
        onPhoneChange: function(){
            var phone = this.$el.find('[name="phone"]').val();
            this.model.set({phone: phone});
        },
        onServiceYearChange: function(){
            var service_years = this.$el.find('[name="service_years"]').val();
            this.model.set({service_years: service_years});
        },
        onInsuranceSetChange: function(event){
            var insurance_set_id = $(event.target).val();
            switch(insurance_set_id)
            {
                case '1':
                    $('input[type="checkbox"]').prop('checked', true).checkboxradio('refresh');
                    break;
                case '2':
                    $('input[type="checkbox"]').prop('checked', false);
                    $('input[type="checkbox"][data-set*=effective]').prop('checked', true);
                    $('input[type="checkbox"]').checkboxradio('refresh');
                    break;
                case '3':
                    $('input[type="checkbox"]').prop('checked', false);
                    $('input[type="checkbox"][data-set*=simple]').prop('checked', true);
                    $('input[type="checkbox"]').checkboxradio('refresh');
                    break;
                case '4':
                    $('input[type="checkbox"]').prop('checked', false);
                    $('input[type="checkbox"][data-set*=skilled]').prop('checked', true);
                    $('input[type="checkbox"]').checkboxradio('refresh');
                    break;
                default:
                    break;
            }
        },
        //车损与自燃checkbox的联动事件
        onDamageChange: function(event){
            var damage_checked = $(event.target).prop('checked');
            if(!damage_checked)
            {
                this.$el.find('[name=self_ignition]').prop('checked', false).checkboxradio('refresh');
            }
        },
        onSelfIgnitionChange: function(event){
            var self_ignition_checked = $(event.target).prop('checked');
            if(self_ignition_checked)
            {
                this.$el.find('[name=damage]').prop('checked', true).checkboxradio('refresh');
            }
        },
        onGetPriceClick: function(){
            this._collectFormData(); //收集表单数据到模型
            this.trigger('submit', this);
        }
    });
    return InsuranceFormView;
});
