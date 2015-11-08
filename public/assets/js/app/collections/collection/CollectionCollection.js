define([
    'collections/PaginationCollection',
    'models/collection/CollectionModel'
], function(PaginationCollection, CollectionModel){
    var CollectionCollection = PaginationCollection.extend({
        model: CollectionModel,
        initialize: function(models, options){
            options || (options = {});
            PaginationCollection.prototype.initialize.call(this, models, options);
        },
        url: function(){
            return '/collection/list';
        }
    });
    return CollectionCollection;
});
