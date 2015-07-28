/**
 * Created by jkzleond on 15-7-6.
 */

define([
    'jquery',
    'backbone',
    'models/activity/ActivityPubFormModel',
    'jqm',
    'datetimepicker'
], function($, Backbone, ActivityPubFormModel){
    var ActivityPubFormView = Backbone.View.extend({
        model: new ActivityPubFormModel(),
        initialize: function(){
            this.$el.find('[name="start_date"]').datetimepicker({
            //    //yearOffset:222,
                lang:'ch',
                format:'Y-m-d',
                formatDate:'Y/m/d',
                timepicker: false
            //   // minDate:'-1970/01/02', // yesterday is minimum date
            //   // maxDate:'+1970/01/02' // and tommorow is maximum date calendar
            });

            this.$el.find('[name="end_date"]').datetimepicker({
            //    //yearOffset:222,
                lang:'ch',
                format:'Y-m-d',
                formatDate:'Y/m/d',
                timepicker: false
            //    //minDate:'-1970/01/02', // yesterday is minimum date
            //    //maxDate:'+1970/01/02' // and tommorow is maximum date calendar
            });
            this.listenTo(this.model, 'change:activity_id', this._onNewActivityPubed);
            this.listenTo(this.model, 'invalid', this._onPubModelInvalid);
        },
        events: {
            'click .submit-btn': '_onSubmitBtnClick'
        },
        _onSubmitBtnClick: function(event){
            this._collectionData();
            if(this.model.isValid())
            {
                this.model.save();
            }
        },
        _onNewActivityPubed: function(model, options){
            this.trigger('activitygen', this, this.model.get('activity_id'));
        },
        _onPubModelInvalid: function(model, err)
        {
            this.trigger('invalid:pub', this, err);
        },
        //收集表单数据到模型
        _collectionData: function(){
            var self = this;
            this.model.clear({silent: true});
            this.$el.find('[name]').each(function(i, n){
                if($(n).is(':radio') && !$(n).is(':checked')) return;
                var name = $(n).attr('name');
                var value = $(n).val();
                self.model.set(name, value, {silent: true});
            });
            self.model.set('pub_user', G.user.user_id, {silent: true});
        }
    });
    return ActivityPubFormView;
});