/**
 * Created by jkzleond on 15-7-6.
 */

define([
    'jquery',
    'backbone',
    'text!templates/driving_tour/tours_page.html',
    'collections/driving_tour/TourCollection',
    'views/driving_tour/TourListView',
], function($, Backbone, pageTpl, TourCollection, TourListView){
    $(pageTpl).appendTo('body');
    var ToursPageView = Backbone.View.extend({
        initialize: function(){
            this.tour_list_view = new TourListView({
                el: '#tour_list_view',
                collection: new TourCollection()
            });
        }
    });
    return ToursPageView;
});
