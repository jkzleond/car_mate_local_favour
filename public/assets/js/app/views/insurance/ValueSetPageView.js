/**
 * Created by jkzleond on 15-7-14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/insurance/InsuranceFormModel',
    'text!templates/insurance/value_set_page.html'
], function($, _, Backbone, InsuranceFormModel, pageTpl){
    $(pageTpl).appendTo('body');
    var ValueSetPageView = Backbone.View.extend({
        model: new InsuranceFormModel(),
        el: '#insurance_value_set_page',
        initialize: function(){
            this.listenTo(this.model, 'invalid', this._onFormModelInvalid);
            this.listenTo(this.model, 'change:info_id', this._onNewInsuranceInfoGen);
        },
        events: {
            'input input:text': '_onNumberInput',
            'change [name="third"]': '_onThirdSelectChange',
            'change [name="is_buy_driver"]': '_onIsBuyDriverChange',
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
                this.$el.find('[name=is_buy_driver]').prop('disabled', true).val(0).change();
                this.$el.find('[name=passenger_number]').prop('disabled', true).val(0).change();
            }
            else
            {
                this.$el.find('[name=is_buy_driver]').prop('disabled', false).val(1).change();
                this.$el.find('[name=passenger_number]').prop('disabled', false).val(1).change();
            }
        },
        _onIsBuyDriverChange: function(event){
            var value = $(event.target).val();
            if(value == 0)
            {
                this.$el.find('[name="driver"]').prop('disabled', true).val(0);
            }
            else
            {
                this.$el.find('[name="driver"]').prop('disabled', false).val(1);
            }
        },
        _onPassengerNumberChange: function(event){
            var passenger_number = $(event.target).val();
            if(passenger_number == 0)
            {
                this.$el.find('[name="passenger"]').prop('disabled', true).val(0); //选择不投座位险, 就禁用座位险保额输入框
            }
            else
            {
                this.$el.find('[name="passenger"]').prop('disabled', false).val(1);
            }
        },
        _onFormSubmit: function(event){
            this._collectFormData();
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
            var model_attrs = {};
            this.$el.find('[name][data-ignore!="true"]:enabled:visible').each(function(index, feild){
                var attr_key = $(feild).attr('name');
                var attr_value = $(feild).val() || 0;

                if(attr_key == 'car_price' || attr_key == 'driver' || attr_key == 'passenger') attr_value = attr_value * 10000;

                model_attrs[attr_key] = attr_value;
            });
            this.model.clear({silent: true}).set(model_attrs, {silent: true});
        }
    });
    return ValueSetPageView;
});
