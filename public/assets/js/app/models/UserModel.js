/**
 * Created by jkzleond on 15-6-9.
 */
define(
    ['backbone'],
    function(Backbone){
        var UserModel = Backbone.Model.extend({
            urlRoot: '/user/info',
            initialize: function(options){
                this.attributes['user_id'] = options.user_id;
            },
            url: function(){
                var user_id = this.get('user_id');
                return this.urlRoot + '/' + user_id + '.json';
            },
            parse: function(res, options){
                return res.row;
            }
        });

        return UserModel;
    });