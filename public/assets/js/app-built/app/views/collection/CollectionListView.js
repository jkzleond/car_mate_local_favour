define(["views/BaseListView","text!templates/collection/collection_list_item.html"],function(e,t){var n=e.extend({initialize:function(n){n||(n={}),n.item_tpl||(n.item_tpl=t),e.prototype.initialize.call(this,n)}});return n});