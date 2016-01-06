define(["backbone"],function(e){var t=e.Collection.extend({initialize:function(e,t){t||(t={}),this.page=t.page||1,this.rows=t.rows||10,this.total=t.total||0,this.has_change={page:!0,rows:!0,total:!0}},parse:function(e,t){return this._setTotal(e.total),e.rows},fetch:function(t){t||(t={});var n=!1;for(var r in this.has_change)if(this.has_change[r]){n=!0;break}if(!n)return;var i=this,s=t.success;t.success=function(){for(var e in i.has_change)i.has_change[e]=!1;typeof s=="function"&&s.apply(i,arguments)},t.data||(t.data={}),t.data.page=t.data.page||this.page,t.data.rows=t.data.rows||this.rows,e.Collection.prototype.fetch.call(this,t)},setPage:function(e){return this.page!=e&&(this.page=e,this.has_change.page||(this.has_change.page=!0),this.trigger("change:page",this)),this},setRows:function(e){return this.rows!=e&&(this.rows=e,this.has_change.rows||(this.has_change.rows=!0),this.trigger("change:rows",this)),this},_setTotal:function(e){return this.total!=e&&(this.total=e,this.has_change.total||(this.has_change.total=!0),this.trigger("change:total",this)),this.total<=this.page*this.rows&&this.trigger("page_end",this),this},reset:function(){this.has_change.page=!0,this.has_change.rows=!0,this.has_change.total=!0,this.page=1,this.total=0,e.Collection.prototype.reset.apply(this,arguments)},nextPage:function(){this.setPage(this.page+1),this.fetch()}});return t});