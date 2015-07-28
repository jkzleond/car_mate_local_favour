/**
 * Created by jkzleond on 15-7-21.
 */

define([
    'jquery',
    'backbone',
    'text!templates/insurance/insurance_list_page.html',
    'text!templates/insurance/insurance_list_item_1.html',
    'text!templates/insurance/insurance_list_item_2.html',
    'text!templates/insurance/insurance_list_item_3.html',
    'text!templates/insurance/insurance_list_item_4.html',
    'text!templates/insurance/insurance_list_item_5.html',
    'collections/insurance/InsuranceInfoCollection',
    'views/insurance/InsuranceListView',
], function($, Backbone, pageTpl, itemTpl1, itemTpl2, itemTpl3, itemTpl4, itemTpl5, InsuranceInfoCollection, InsuranceListView){
    $(pageTpl).appendTo('body');
    var InsuranceListPageView = Backbone.View.extend({
        el: '#insurance_list_page',
        initialize: function(){
            this.activeTapIndex = 1;

            this.insurance_list_view_1 = new InsuranceListView({
                el: '#insurance_list_view_1',
                item_tpl: itemTpl1,
                collection: new InsuranceInfoCollection([], {
                    type: 1
                })
            });
            this.insurance_list_view_2 = new InsuranceListView({
                el: '#insurance_list_view_2',
                item_tpl: itemTpl2,
                collection: new InsuranceInfoCollection([], {
                    type: 2
                })
            });
            this.insurance_list_view_3 = new InsuranceListView({
                el: '#insurance_list_view_3',
                item_tpl: itemTpl3,
                collection: new InsuranceInfoCollection([], {
                    type: 3
                })
            });
            this.insurance_list_view_4 = new InsuranceListView({
                el: '#insurance_list_view_4',
                item_tpl: itemTpl4,
                collection: new InsuranceInfoCollection([], {
                    type: 4
                })
            });
            this.insurance_list_view_5 = new InsuranceListView({
                el: '#insurance_list_view_5',
                item_tpl: itemTpl5,
                collection: new InsuranceInfoCollection([], {
                    type: 5
                })
            });
        },
        events: {

        },
        changeTap: function(index)
        {
            if(typeof this.activeTapIndex != 'undefined')
            {
                this.$el.find('#insurance_list_view_' + this.activeTapIndex).hide();
                this.$el.find('[data-tap-index=' + this.activeTapIndex + ']').removeClass('ui-btn-active');
            }
            this.activeTapIndex = index;
            this.$el.find('#insurance_list_view_' + index).show();
            this.$el.find('[data-tap-index=' + index + ']').addClass('ui-btn-active');
            this['insurance_list_view_' + index].collection.fetch();
        },
        reset: function(){
            this.insurance_list_view_1.collection.reset();
            this.insurance_list_view_2.collection.reset();
            this.insurance_list_view_3.collection.reset();
            this.insurance_list_view_4.collection.reset();
            this.insurance_list_view_5.collection.reset();
        }
    });
    return InsuranceListPageView;
});
