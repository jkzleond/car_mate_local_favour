/**
 * Created by jkzleond on 15-7-17.
 */

define([
    'backbone',
    'models/insurance/InsuranceResultModel'
], function(Backbone, InsuranceResultModel){
    var InsuranceInfoModel = Backbone.Model.extend({
        urlRoot: '/insurance/info/',
        parse: function(resp, options){
            if(options.collection) return resp;
            return resp.row || {};
        },
        initialize: function(){
            this.result = new InsuranceResultModel();
            this.listenTo(this, 'change:result_id', this._loadResult);
            this.listenTo(this.result, 'change', this._onResultChange);
        },
        _loadResult: function(model, new_result_id, options){
            this.result.set('id', new_result_id, {silent: true});
            this.result.fetch();
        },
        _onResultChange: function(model, options){
            this.trigger('change:result', this, this.result, options);
        }
    });
    return InsuranceInfoModel;
});