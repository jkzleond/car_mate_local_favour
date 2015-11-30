define(
	['backbone'],
	function(Backbone){
		var InsuranceReservationFormModel = Backbone.Model.extend({
			url: '/insurance/reservation',
			parse: function(resp, options){
				return resp.row || {};
			},
			validate: function(attrs, options){
				var phone_regexp = /\d{11}/;
				var hphm_regexp = /^[\u4e00-\u9fa5][A-Z][A-Za-z\d]{5}$/;
	            var cn_str_reg = /^[\u4e00-\u9fa5]+$/;
	            var id_no_reg = /^\d{17}[\d\w]$/;
	            if(!_.isUndefined(attrs.phone) && !phone_regexp.test(attrs.phone))
	            {
	                return '手机号码不合法';
	            }

	            if(!attrs.hphm)
	            {
	            	return '请输入号牌号码';
	            }

	            if(!_.isUndefined(attrs.hphm) && !hphm_regexp.test(attrs.hphm))
	            {
	            	return '号牌号码不正确';
	            }

	            if(!_.isUndefined(attrs.auto_name) && !attrs.auto_name)
	            {
	                return '请填写车辆品牌种类(车型)';
	            }


	            if(!_.isUndefined(attrs.frame_number) && !attrs.frame_number)
	            {
	                return '请填写车架号';
	            }
	            if(!_.isUndefined(attrs.engine_number) && !attrs.engine_number)
	            {
	                return '请填写发动机号';
	            }
	            if(!_.isUndefined(attrs.offer_date) && !attrs.offer_date)
	            {
	                return '请填写发报价日期';
	            }
			}
		});
		
		return InsuranceReservationFormModel;
	}
);
