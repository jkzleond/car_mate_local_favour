/**
 * Created by jkzleond on 15-7-6.
 */

define([
    'backbone'
], function(Backbone){
    var ActivityPubFormModel = Backbone.Model.extend({
        urlRoot: '/activity',
        validate: function(attrs, options)
        {

            if(!attrs.name || ( attrs.name &&  attrs.name.length < 10 ))
            {
                return '活动名称必须在10个字以上!';
            }

            if(!attrs.start_date || !attrs.end_date)
            {
                return '请设置开始和结束时间!';
            }

            if(!attrs.place)
            {
                return '请填写活动地点!';
            }

            if(!attrs.contents || (attrs.contents && attrs.contents < 16))
            {
                return '内容必须在16个字以上!'
            }
        }
    });
    return ActivityPubFormModel;
});
