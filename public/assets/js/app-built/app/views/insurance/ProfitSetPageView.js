define(["jquery","underscore","backbone","models/insurance/InsuranceFormModel","text!templates/insurance/profit_set_page.html"],function(e,t,n,r,i){e(i).appendTo("body");var s=n.View.extend({model:new r,el:"#insurance_profit_set_page",initialize:function(){this.listenTo(this.model,"invalid",this._onFormModelInvalid),this.listenTo(this.model,"change:info_id",this._onNewInsuranceInfoGen)},events:{"input input:text":"_onNumberInput","change [name=car_type_id]":"_onCarTypeIdChange",'change [name="is_buy_damage"]':"_onIsBuyDamageChange",'change [name="third"]':"_onThirdSelectChange",'change [name="passenger_number"]':"_onPassengerNumberChange","click .submit":"_onFormSubmit"},_onNumberInput:function(t){var n=e(t.target).val();n=n.replace(/[^\d+]/g,""),e(t.target).val(n)},_onCarTypeIdChange:function(t){var n=e(t.currentTarget).val();n=="2"?(this.$el.find(".truck-level").show(),this.$el.find(".psg-car-level").hide()):n=="4"&&(this.$el.find(".psg-car-level").show(),this.$el.find(".truck-level").hide())},_onIsBuyDamageChange:function(t){var n=e(t.target).val();n==0?this.$el.find(".rel-damage").hide():this.$el.find(".rel-damage").show()},_onThirdSelectChange:function(t){var n=e(t.target).val();n==0?(this.$el.find("[name=driver]").prop("disabled",!0),this.$el.find("[name=passenger_number]").prop("disabled",!0),this.$el.find("[name=passenger]").prop("disabled",!0)):(this.$el.find("[name=driver]").prop("disabled",!1),this.$el.find("[name=passenger_number]").prop("disabled",!1),this.$el.find("[name=passenger]").prop("disabled",!1))},_onPassengerNumberChange:function(t){var n=e(t.target).val();n==0?this.$el.find('[name="passenger"]').prop("disabled",!0):this.$el.find('[name="passenger"]').prop("disabled",!1)},_onFormSubmit:function(e){this._collectFormData(),console.log(this.model.attributes),this.model.isValid()&&this.model.save()},_onFormModelInvalid:function(e,t){this.trigger("invalid",this,t)},_onNewInsuranceInfoGen:function(e,t,n){this.trigger("uri",this,"insurance/price/"+t)},_collectFormData:function(){var t={damage:!0};this.$el.find('[name][data-ignore!="true"]:enabled:visible').each(function(n,r){var i=e(r).attr("name"),s=e(r).val()||0;if(i=="car_price"||i=="driver"||i=="passenger")s*=1e4;t[i]=s}),this.model.clear({silent:!0}).set(t,{silent:!0})}});return s});