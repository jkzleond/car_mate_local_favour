/**
 * Created by jkzleond on 15-6-19.
 */

define([
    'backbone',
    'models/CityModel'
], function(Backbone, City){
    var CityCollection = Backbone.Collection.extend({
        initialize: function(){
            this.province_id = null;
        },
        model: City,
        url: function(){
            return '/citise/' + this.province_id;
        },
        parse: function(res, options){
            return res.rows;
        },
        setProvinceId: function(province_id){
            if(this.province_id == province_id) return this;
            this.province_id = province_id;
            this.fetch({reset: true});
            this.trigger('change:province_id', this, province_id);
            return this;
        }
    });
    return CityCollection;
});
