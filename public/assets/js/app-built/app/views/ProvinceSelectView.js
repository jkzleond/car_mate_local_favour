define(["jquery","backbone"],function(e,t){var n=t.View.extend({initialize:function(e){this.value=e.value,this.listenTo(this.collection,"reset",this.renderItems)},renderItems:function(e){var t=e.models.length;for(var n=0;n<t;n++){var r=e.models[n],i=r.get("id");if(i==0)continue;var s=r.get("name"),o="";i==this.value&&(o="selected"),this.$el.append('<option value="'+i+'" '+o+">"+s+"</option>")}this.$el.selectmenu("refresh")},setValue:function(e){if(this.value==e)return;this.temp_value=e,this.$el.val(e),this.$el.change()},events:{change:"_change"},_change:function(){var e=this.value,t=this.value=this.$el.val()||this.temp_value;this.trigger("change",this,e,t)}});return n});