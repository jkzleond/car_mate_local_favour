define(["backbone","models/insurance/InsuranceCompanyModel"],function(e,t){var n=e.Collection.extend({model:t,rows:5,url:function(){return"/insurance/companise"},parse:function(e,t){return e.rows||[]}});return n});