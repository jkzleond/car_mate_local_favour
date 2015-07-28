/**
 * Created by jkzleond on 15-6-29.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/driving_tour/TourModel',
    'models/driving_tour/TourSignFormModel',
    'text!templates/driving_tour/tour_detail_page.html',
    'text!templates/driving_tour/tour_detail.html',
    'pcas',
    'jqm'
], function($, _, Backbone, TourModel, TourSignFormModel, pageTpl, detailTpl, PCAS){

    $(pageTpl).appendTo('body');

    var TourDetailView = Backbone.View.extend({
        detail_tpl: _.template(detailTpl),
        model: new TourModel(),
        sign_form_model: new TourSignFormModel(),
        el: '#tour_detail_page',
        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.sign_form_model, 'invalid', this.onSignModelInValid);
            this.listenTo(this.sign_form_model, 'change:order_info', this.onSignModelOrderInfoChange);
            new PCAS('tour_province', 'tour_city', 'tour_area');
        },
        render: function(model, options){
            this.$el.find('.detail-container').empty();
            this.$el.find('#tour_sign_up_btn').hide();
            if(model.keys().length == 0) return; //当clear时就直接返回,不渲染模板以免报错
            this.$el.find('.detail-container').append(this.detail_tpl(model.toJSON()));

            var state = model.get('state');

            var raw_sign_start_date = model.get('sign_start_date');
            var raw_sign_end_date = model.get('sign_end_date');

            var sign_start_date = new Date(raw_sign_start_date);
            var sign_end_date = new Date(raw_sign_end_date);
            var today = Date.today();

            if(state != 1 || (raw_sign_start_date && Date.compare(sign_start_date, today) == 1) || (raw_sign_end_date && Date.compare(sign_end_date, today) == -1))
            {
                this.$el.find('#tour_sign_up_btn').hide();
            }
            else
            {
                this.$el.find('#tour_sign_up_btn').show();
            }


            //渲染报名弹出窗
            var infos = model.get('infos') || '';
            this.$el.find('#tour_sign_up_form_container [data-field]').each(function(i, n){
                var field = $(n).attr('data-field');
                if(infos.indexOf(field) != -1)
                {
                    $(n).show();
                }
                else
                {
                    $(n).hide();
                }
            });

            $('[data-field="auto"]').find('#tour_option_label').text(model.get('option'));
            $('[name="user_id"]').val(G.user.user_id);

            var need_pay = model.get('need_pay');

            if(need_pay == 1)
            {
                $('#tour_sign_up_form_container [data-field="pay_items"]').show();
                $('#tour_sign_up_form_container [data-field="total_fee"]').show();
                $('#tour_sign_up_form_container [name="total_fee"]').text('0.00');
                var pay_items = model.get('goods');
                var len = pay_items.length;
                $('#tour_pay_items_container').empty();
                for(var i = 0; i < len; i++)
                {
                    var $pay_item = $('<tr class="tour-pay-item" data-id="' + pay_items[i].id + '" data-price="' + pay_items[i].price + '"></tr>');
                    $('#tour_pay_items_container').append($pay_item);
                    $pay_item.append('<td>' + pay_items[i].name + '</td>');
                    $pay_item.append('<td class="cm-color-money">' + pay_items[i].price + '</td>');
                    $pay_item.append('<td class="cm-numberspinner cm-span6 tour-pay-item-number"></td>');

                    $pay_item.find('.cm-numberspinner').numberspinner({
                        change: function(event, value){
                            var total_fee = 0;
                            $('#tour_pay_items_container .tour-pay-item').each(function(i, n){
                                var price = Number($(n).attr('data-price'));
                                var number = $(n).find('.tour-pay-item-number').numberspinner('getValue');
                                total_fee += price * number;
                            });
                            $('#tour_sign_up_form_container [name="total_fee"]').text(Number(total_fee).toFixed(2));
                        }
                    });
                }
            }
            else
            {
                $('#tour_sign_up_form_container [data-field="pay_items"]').hide();
            }

        },
        events: {
            'click #tour_sign_up_btn': 'onSignUpBtnClick',
            'click #tour_sign_up_submit_btn': 'onSignUpSubmit',
            //'input': 'onPeopleNumberInput',
            'change [name="pay_type"]': 'onPayTypeChange'
        },
        onSignUpBtnClick: function(event){
            event.preventDefault();
            //$.cm.toast({msg: 'haha'});

            $('#tour_sign_up_popup').popup('open');
            return false;
        },
        //旧的支付款项和人数关联
        onPeopleNumberInput: function(event)
        {
            var people_num = this.$el.find('[name="people"]').val();
            var deposit = this.$el.find('[name="deposit"]').val();
            var total_fee = Number(people_num) * Number(deposit);
            this.$el.find('total_fee').val(total_fee.toFixed(2));
        },
        onSignUpSubmit: function(event){
            this._collectFormData();
            //console.log(this.sign_form_model.attributes);
            if(this.sign_form_model.isValid())
            {
                this.sign_form_model.save();
            }
            return false;
        },
        onSignModelInValid: function(model, err)
        {
            this.trigger('invalid:sign', this, err);
        },
        onSignModelOrderInfoChange: function(model, options)
        {
            this.trigger('ordergen', this, this._getOrderInfo());
        },
        //收集表单数据到模型
        _collectFormData: function()
        {
            this.sign_form_model.clear({silent: true}); //先清空旧的数据
            var self = this;
            $('[name]:visible').each(function(i, n){
                var key = $(n).attr('name');
                var value = $(n).val();
                self.sign_form_model.set(key, value, {silent: true});
            });
            var pay_items = [];
            $('#tour_pay_items_container .tour-pay-item').each(function(i, n){
                var number = $(n).find('.tour-pay-item-number').numberspinner('getValue');

                if( number == 0) return;
                var pay_item = {};
                pay_item.id = $(n).attr('data-id');
                pay_item.number = number;
                pay_items.push(pay_item);
            });
            self.sign_form_model.set('pay_items', pay_items);
            self.sign_form_model.set('aid', this.model.get('id'));
            self.sign_form_model.set('user_id', G.user.user_id);
        },
        _getOrderInfo: function()
        {
            var order_info = this.sign_form_model.get('order_info');
            var pay_types = this.model.get('pay_types');
            if( order_info && order_info instanceof Object)
            {
                order_info['pay_type'] = {offline:0, alipay: 0, wxpay: 0};

                if(pay_types.indexOf('CASH') != -1 || pay_types.indexOf('POS') != -1 || pay_types.indexOf('TRANSFER') != -1)
                {
                    order_info['pay_type'].offline = 1;
                }

                if(pay_types.indexOf('ONLINE') != -1)
                {
                    order_info['pay_type'].alipay = 1;
                    order_info['pay_type'].wxpay = 1;
                }
            }
            return order_info;
        }
    });
    return TourDetailView;
});
