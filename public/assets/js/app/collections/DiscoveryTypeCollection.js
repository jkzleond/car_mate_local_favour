/**
 * Created by jkzleond on 15-6-15.
 */

define(['backbone', 'models/DiscoveryTypeModel'], function(Backbone, DiscoveryTypeModel){
    var DiscoveryTypeCollection = Backbone.Collection.extend({
        model: DiscoveryTypeModel,
        initialize: function(){
            this.active_type = null;
        },
        url: function(){
            return '/discover_type/'
        },
        setActiveType: function(type){
            if(this.active_type != type || this.active_type === null)
            {
                this.active_type = type;
                this.trigger('change:active_type', this);
            }
        }
    });
    return DiscoveryTypeCollection;
});
