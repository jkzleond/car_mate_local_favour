/**
 * Created by jkzleond on 15-7-6.
 */

define([
    'backbone',
    'models/discovery/CommentModel',
    'collections/PaginationCollection'
], function(Backbone, CommentModel, PaginationCollection
){
    var CommentCollection = PaginationCollection.extend({
        model: CommentModel,
        url: function(){
            return '/discovery/' + this.discovery_id + '/comments';
        },
        setDiscoveryId: function(discovery_id){
            this.discovery_id = discovery_id;
            this.reset();
        },
        getDiscoveryId: function(){
            return this.discovery_id;
        }
    });
    return CommentCollection;
});
