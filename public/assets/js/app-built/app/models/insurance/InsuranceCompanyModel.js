define(["backbone"],function(e){var t=e.Model.extend({parse:function(e,t){return t.collection?e:e.row||{}}});return t});