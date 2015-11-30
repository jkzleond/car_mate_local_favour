/**
 * Created by jkzleond on 15-7-20.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/CarInfoModel',
    'models/insurance/InsuranceReservationFormModel',
    'text!templates/insurance/reservation_page.html',
    'jqm',
    'datetimepicker'
], function($, _, Backbone, CarInfoModel, InsuranceReservationFormModel, pageTpl){
    $(pageTpl).appendTo('body');
    var ReservationPageView = Backbone.View.extend({
        el: '#insurance_reservation_page',
        initialize: function(){
            this.model = new InsuranceReservationFormModel();
            this.car_info_model = new CarInfoModel();
            /*
              创建日期控件(报价时间)
             */
            this.$el.find('[name="offer_date"]').datetimepicker({
            //    //yearOffset:222,
                lang:'ch',
                format:'Y-m-d',
                formatDate:'Y/m/d',
                timepicker: false,
                minDate:'-1970/01/01' // today is minimum date
            //   // maxDate:'+1970/01/02' // and tommorow is maximum date calendar
            });

            //this.$el.find('[name=phone]').val(G.user.phone || '');

            //this.listenTo(this.model, 'change:info_id', this._render);
            this.listenTo(this.model, 'invalid', this._onFormModelInvalid);
            this.listenTo(this.model, 'sync', this._onFormModelSync);
            this.listenTo(this.car_info_model, 'request', this._lockSubmit);
            this.listenTo(this.car_info_model, 'sync', this._renderCarInfo);
            this.listenTo(this.car_info_model, 'sync', this._unlockSubmit);
        },
        events: {
            'input [name=hphm]': '_onHphmInput',
            'change [name=hphm]': '_onHphmChange',
            'click .reservation-btn': '_onReservationBtnClick'
        },
        _onHphmInput: function(event){
            this.$el.find('[name=auto_name]').prop('disabled', false).val('');
            this.$el.find('[name=frame_number]').prop('disabled', false).val('');
            this.$el.find('[name=engine_number]').prop('disabled', false).val('');
        },
        _onHphmChange: function(event){
            //hphm值发生改变后获取已存在CarInfo
            var hphm = this.$el.find('[name="hphm_header"]').val() + $(event.target).val();
            this.car_info_model.clear({silent: true});
            this.car_info_model.set({
                hphm: hphm,
                user_id: G.user.user_id
            })
            this.car_info_model.fetch({reset: true});
        },
        _onReservationBtnClick: function(event){
            this._collectionFormData();
            if(this.model.isValid())
            {
                this.model.save();
            }
        },
        _onFormModelSync: function(model, resp, options){
            if(!resp.success) return;
            this.$el.find('#insurance_reservation_result_popup').popup('open');
        },
        _onFormModelInvalid: function(model, err){
            $.cm.toast({msg: err});
        },
        //收集表单数据到模型
        _collectionFormData: function(){
            var self = this;
            var info_id = this.model.get('info_id');
            this.model.clear({silent: true});
            this.model.set('info_id', info_id, {silent: true});

            var self = this;
            this.$el.find('[name]:visible:not([data-ignore])').each(function(i, n){
                var key = $(n).attr('name');
                var value = $(n).val();

                if(key == 'hphm' && value)
                {
                    value = self.$el.find('[name="hphm_header"]').val() + value;
                }

                self.model.set(key, value, {silent: true});
            });

            self.model.set('user_id', G.user.user_id, {silent: true});//用户名
            self.model.set('car_info_id', this.car_info_model.get('id'));//car_info_id
        },
        _lockSubmit: function(model, resp, options){
            this.$el.find('.reservation-btn').prop('disabled', true);
        },
        _unlockSubmit: function(model, resp, options){
            this.$el.find('.reservation-btn').prop('disabled', false);
        },
        _renderCarInfo: function(model, resp, options){
            if(!resp.row) return;
            this.$el.find('[name=auto_name]').val(model.get('auto_name')).prop('disabled', true);//model为car_info_model
            this.$el.find('[name=frame_number]').val(model.get('frame_number')).prop('disabled', true);
            this.$el.find('[name=engine_number]').val(model.get('engine_number')).prop('disabled', true);
        },
        reset: function(){
            //重置表单
            this.$el.find('[name=phone]').val(G.user.phone || '');
        }
    });
    return ReservationPageView;
});
