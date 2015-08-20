/**
 * Created by jkzleond on 15-7-20.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/insurance/InsuranceReservationFormModel',
    'text!templates/insurance/reservation_page.html',
    'jqm',
    'datetimepicker'
], function($, _, Backbone, InsuranceReservationFormModel, pageTpl){
    $(pageTpl).appendTo('body');
    var ApplyActualPage = Backbone.View.extend({
        el: '#insurance_reservation_page',
        initialize: function(){
            this.model = new InsuranceReservationFormModel();

            /*
              创建日期控件(报价时间)
             */
            this.$el.find('[name="offer_date"]').datetimepicker({
            //    //yearOffset:222,
                lang:'ch',
                format:'Y-m-d',
                formatDate:'Y/m/d',
                timepicker: false
            //   // minDate:'-1970/01/02', // yesterday is minimum date
            //   // maxDate:'+1970/01/02' // and tommorow is maximum date calendar
            });

            this.$el.find('[name=phone]').val(G.user.phone || '');

            this.listenTo(this.model, 'change:info_id', this._render);
            this.listenTo(this.model, 'invalid', this._onFormModelInvalid);
        },
        events: {
            'click .reservation-btn': '_onReservationBtnClick',
        },
        _onReservationBtnClick: function(event){
            this._collectionFormData();
            if(this.model.isValid())
            {
                this.model.save();
            }
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

            this.$el.find('[name]:visible').each(function(i, n){
                var key = $(n).attr('name');
                var value = $(n).val();

                self.model.set(key, value, {silent: true});
            });
        }
    });
    return ApplyActualPage;
});
