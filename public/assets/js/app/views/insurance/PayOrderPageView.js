/**
 * Created by jkzleond on 15-7-27.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/insurance/InsuranceOrderInfoModel',
    'collections/CityCollection',
    'collections/ProvinceCollection',
    'text!templates/insurance/pay_order_page.html',
    'text!templates/insurance/order_info_detail.html'
], function($, _, Backbone, InsuranceOrderInfoModel, CityCollection, ProvinceCollection, pageTpl, orderInfoDetailTpl){
    $(pageTpl).appendTo('body');
    var PayOrderPageView = Backbone.View.extend({
        model: new InsuranceOrderInfoModel(),
        el: '#insurance_pay_order_page',
        initialize: function(options){
            this.city_collection = new CityCollection();
            this.province_collection = new ProvinceCollection();
            this.order_info_deital_tpl = _.template(orderInfoDetailTpl);

            this.listenTo(this.model, 'change:id', this._render);
            this.listenTo(this.model, 'invalid', this._onModelInvalid);
            this.listenTo(this.city_collection, 'reset', this._renderCitySelect);
            this.listenTo(this.province_collection, 'reset', this._renderProvinceSelect);
        },
        events: {
            'change .province-select': '_onProvinceSelectChange',
            'change .city-select': '_onCitySelectChange',
            'click .certain-policy-btn': '_onCertainPolicyBtnClick'
        },
        _onProvinceSelectChange: function(event){
            var $province_select = $(event.target);
            var province_id = $province_select.val();
            this.city_collection.setProvinceId(province_id);
        },
        _onCitySelectChange: function(event){
            this.$el.find('.city-select').attr('data-value', $(event.target).val());
        },
        _onCertainPolicyBtnClick: function(event){
            this._collectionFormData();
            if(this.model.isValid())
            {
                var self = this;
                this.model.save(this.model.attributes,{success: function(model, resp, options){
                    if(!resp.success) return;
                    if(G.user_id == 'WEIBO_ACCOUNT')
                    {
                        $.cm.toast({msg: '请使用线下付款方式'});
                        this.trigger('uri', self, 'insurances/4');
                        return;
                    }
                     var order_info_xml = '<root><orderId>' + self.model.get('order_id') + '</orderId><orderNo>' + self.model.get('order_no') +  '</orderNo><orderFee>' + self.model.get('order_fee') + '</orderFee><payType><offline>1</offline><alipay>1</alipay><wxpay>1</wxpay></payType><des>' + encodeURIComponent('保险保费') + '</des></root>';
                     window.location.href = 'pay://yn.122.net/?ordername=' + encodeURIComponent('保险保费') + '&orderinfo=' + encodeURIComponent(base64encode(order_info_xml));

                }});
            }
        },
        _onModelInvalid: function(model, err){
            $.cm.toast({msg: err});
        },
        _render: function(model, new_value, options){
            this.$el.find('.order-info-detail').empty().append(this.order_info_deital_tpl(this.model.toJSON()));
            this.province_collection.fetch({reset: true});
        },
        _renderCitySelect: function(collection, options){
            var $city_select = this.$el.find('.city-select');
            $city_select.empty();
            $.each(collection.models, function(index, model){
                    var city_id = model.get('id');
                    var city_name = model.get('name');
                    var selected = '';
                    if(city_id == ($city_select.attr('data-value') || G.user.city_id)) selected = 'selected';
                    $city_select.append('<option value="' + city_id + '" ' + selected + '>' + city_name + '</option>');
            });
        },
        _renderProvinceSelect: function(collection, options){
            var $province_select = this.$el.find('.province-select');
            $province_select.empty();
            $.each(collection.models, function(index, model){
                var province_id = model.get('id');
                var province_name = model.get('name');
                var selected = '';
                if(province_id == (G.user.province_id || 1)) selected = 'selected';
                $province_select.append('<option value="' + province_id + '" ' + selected + '>' + province_name + '</option>');
            });
            $province_select.change();
        },
        _collectionFormData: function(){
            var province_id = this.$el.find('.province-select').val();
            var city_id = this.$el.find('.city-select').val();
            var address = this.$el.find('.address').val();

            this.model.set('province_id', province_id, {silent: true});
            this.model.set('city_id', city_id, {silent: true});
            this.model.set('address', address, {silent: true});
        },
        loadOrderInfo: function(insurance_info_id){
            this.model.clear({silent: true});
            this.$el.find('.order-info-detail').empty();
            this.model.set('insurance_info_id', insurance_info_id, {silent: true});
            this.model.fetch();
        }
    });
    return PayOrderPageView;
});
