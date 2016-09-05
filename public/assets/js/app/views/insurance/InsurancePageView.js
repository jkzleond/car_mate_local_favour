/**
 * Created by jkzleond on 15-7-14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/insurance/InsuranceFormModel',
    'text!templates/insurance/insurance_page.html'
], function($, _, Backbone, InsuranceFormModel, pageTpl){
    var page_element = $(pageTpl);
    page_element.hide(); 
    page_element.appendTo('body');
    $('<div><h2>抱歉，该业务模块正在维护中......</h2></div>').appendTo('body');

    var InsurancePageView = Backbone.View.extend({
        form_model: new InsuranceFormModel(),
        el: '#insurance_page',
        initialize: function(options){

        },
        events: {
            'click .goto-set-compulsory-btn': '_onGotoSetCompulsoryBtnClick',
            'click .qa': '_onQaClick'
        },
        _onGotoSetCompulsoryBtnClick: function(event){
            event.preventDefault();
            var href = $(event.currentTarget).attr('href'); //currentTarget才是真正侦听的目标
            var compulsory_state_id = this.$el.find('.compulsory-state').val();
            this.trigger('uri', this, href + '/' + compulsory_state_id);
            return false;
        },
        _onQaClick: function(event)
        {
            var $qa = $(event.target);
            var qa_pop_up = $qa.attr('data-rel');
            $(qa_pop_up).popup('open');
        }
    });
    return InsurancePageView;
});
