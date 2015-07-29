/**
 * Created by jkzleond on 15-6-9.
 */

/**
 * 签到状态View
 */

define([
    'jquery',
    'backbone'
], function($, Backbone){
    var ClockInView = Backbone.View.extend({
       initialize: function(){
           this.listenTo(this.model, 'change:times', this.render);
       },
       render: function(){
           var times = this.model.get('times') || 0;
           this.$('.clock-in-state').each(function(index, node){
               if(index < times)
               {
                   $(node).addClass('clock-in-checked');
               }
               else
               {
                   $(node).removeClass('clock-in-checked');
               }
           });

       },
       events:{
           'click .clock-in-btn': 'clockIn'
       },
       clockIn: function(){

           if(G.user.user_id == 'WEIBO_ACCOUNT')
           {
               $.cm.toast({msg: '游客不可签到'});
               return;
           }

           var self = this;
           this.model.save(null,{parse:false}).done(function(data){
               if(!data.success) return;
               self.model.fetch();
           });
       }
    });

    return ClockInView;
});
