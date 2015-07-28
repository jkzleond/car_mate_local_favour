/**
 * Created by jkzleond on 15-6-26.
 */

define([
    'collections/PaginationCollection',
    'models/driving_tour/TourModel'
], function(PaginationCollection, TourModel){
    var TourCollection = PaginationCollection.extend({
        model: TourModel,
        initialize: function(models, options){
            options || (options = {});
            PaginationCollection.prototype.initialize.call(this, models, options);
        },
        url: function(){
            return '/driving_tours'
        }
    });
    return TourCollection;
});
