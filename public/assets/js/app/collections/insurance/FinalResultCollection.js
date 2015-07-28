/**
 * Created by jkzleond on 15-7-26.
 */

define([
    'backbone',
    'models/insurance/FinalResultModel'
], function(Backbone, FinalResultModel){
    var FinalResultCollection = Backbone.Collection.extend({
        model: FinalResultModel,
        initialize: function(models, options){
            options || (options = {});
            this.info_id = options.info_id || '';
        },
        url: function(){
            return '/insurance/' + this.info_id + '/actuary_results';
        },
        parse: function(resp, options){
            return resp.rows;
        },
        setInfoId: function(info_id){
            this.info_id = info_id;
        }
    });
    return FinalResultCollection;
});
