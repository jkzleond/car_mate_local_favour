/**
 * Created by jkzleond on 15-7-14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/insurance/InsuranceFormModel',
    'text!templates/insurance/full_set_page.html'
], function($, _, Backbone, InsuranceFormModel, pageTpl){
    $(pageTpl).appendTo('body');
    var FullSetPageView = Backbone.View.extend({
        model: new InsuranceFormModel(),
        el: '#insurance_full_set_page',
        initialize: function(){
            this.listenTo(this.model, 'invalid', this._onFormModelInvalid);
            this.listenTo(this.model, 'change:info_id', this._onNewInsuranceInfoGen);
        },
        events: {
            'input input:text': '_onNumberInput',
            'change [name="third"]': '_onThirdSelectChange',
            'change [name="passenger_number"]': '_onPassengerNumberChange',
            'click .submit': '_onFormSubmit'
        },
        _onNumberInput: function(event){
            //清除非数字
            var value = $(event.target).val();
            value = value.replace(/[^\d+]/g, '');
            $(event.target).val(value);

        },
        _onThirdSelectChange: function(event){
            var value = $(event.target).val();
            if(value == 0)
            {
                this.$el.find('[name=driver]').prop('disabled', true);
                this.$el.find('[name=passenger_number]').prop('disabled', true);
                this.$el.find('[name=passenger]').prop('disabled', true);
            }
            else
            {
                this.$el.find('[name=driver]').prop('disabled', false);
                this.$el.find('[name=passenger_number]').prop('disabled', false);
                this.$el.find('[name=passenger]').prop('disabled', false);
            }
        },
        _onPassengerNumberChange: function(event){
            var passenger_number = $(event.target).val();
            if(passenger_number == 0)
            {
                this.$el.find('[name="passenger"]').prop('disabled', true); //选择不投座位险, 就禁用座位险保额输入框
            }
            else
            {
                this.$el.find('[name="passenger"]').prop('disabled', false);
            }
        },
        _onFormSubmit: function(event){
            this._collectFormData();
            console.log(this.model.attributes);
            if(this.model.isValid())
            {
                this.model.save();
            }
        },
        _onFormModelInvalid: function(model, err){
            this.trigger('invalid', this, err);
        },
        _onNewInsuranceInfoGen: function(model, new_info_id, options){
            this.trigger('uri', this, 'insurance/price/' + new_info_id);
        },
        //收集表单数据到模型
        _collectFormData: function()
        {
            //加上车损险
            var model_attrs = {
                damage: true
            };
            this.$el.find('[name]:enabled:visible').each(function(index, feild){
                var attr_key = $(feild).attr('name');
                var attr_value = $(feild).val() || 0;

                if(attr_key == 'car_price' || attr_key == 'driver' || attr_key == 'passenger') attr_value = attr_value * 10000;

                model_attrs[attr_key] = attr_value;
            });
            this.model.clear({silent: true}).set(model_attrs, {silent: true});
        }
    });
    return FullSetPageView;
});
