/**
 * Created by jkzleond on 15-6-26.
 */

define([
    'collections/PaginationCollection',
    'models/activity/ActivityModel'
], function(PaginationCollection, ActivityModel){
    var ActivityCollection = PaginationCollection.extend({
        model: ActivityModel,
        initialize: function(models, options){
            options || (options = {});
            PaginationCollection.prototype.initialize.call(this, models, options);
            this.type = options.type || 'all';
        },
        url: function(){
            if(this.type == 'all')
            {
                return '/activitise';
            }
            else if(this.type == 'my')
            {
                return '/activitise/my';
            }
        }
    });
    return ActivityCollection;
});
