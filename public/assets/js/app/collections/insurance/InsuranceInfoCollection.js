/**
 * Created by jkzleond on 15-6-26.
 */

define([
    'collections/PaginationCollection',
    'models/insurance/InsuranceInfoModel'
], function(PaginationCollection, InsuranceInfoModel){
    var InsuranceInfoCollection = PaginationCollection.extend({
        model: InsuranceInfoModel,
        initialize: function(models, options){
            options || (options = {});
            PaginationCollection.prototype.initialize.call(this, models, options);
            this.type = options.type || '1';
        },
        url: function(){
            return '/insurances/' + this.type;
        }
    });
    return InsuranceInfoCollection;
});
