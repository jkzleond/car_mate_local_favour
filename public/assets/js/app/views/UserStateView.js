/**
 * Created by jkzleond on 15-6-9.
 */
define(
    ['jquery', 'underscore', 'backbone'],
    function($, _, Backbone){
        var UserStateView = Backbone.View.extend({
            events: {},
            initialize: function(){
                this.listenTo(this.model, 'change', this.render);
            },
            render: function(){
                var uname = this.model.get('nickname') || this.model.get('uname');

                this.$('.user-uname').text(uname);
                this.$('.user-huigold').text(this.model.get('HuiGold'));
                this.$('.user-avatar').attr('src', '/user/avatar/' + this.model.get('user_id') + '.png');
            }
        });

        return UserStateView;
    });