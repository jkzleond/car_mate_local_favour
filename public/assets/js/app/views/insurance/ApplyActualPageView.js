/**
 * Created by jkzleond on 15-7-20.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/insurance/InsuranceActualFormModel',
    'text!templates/insurance/apply_actual_page.html'
], function($, _, Backbone, InsuranceActualFormModel, pageTpl){
    $(pageTpl).appendTo('body');
    var ApplyActualPage = Backbone.View.extend({
        el: '#insurance_apply_actual_page',
        initialize: function(){
            this.model = new InsuranceActualFormModel();
            this.listenTo(this.model, 'change:info_id', this._render);
            this.listenTo(this.model, 'invalid', this._onFormModelInvalid);
            //绑定缩略图img事件
            this.$el.find('img.thumbnail').bind('load', _.bind(this._onThumbnailImageLoad, this));

            if(navigator.userAgent.indexOf('Android') != -1)
            {
                this.$el.find('.to-file').hide();
            }

            this._renderSelect();
        },
        events: {
            'click .to-file': '_onToFileClick',
            'click .to-manual': '_onToManualClick',
            'click .upload-license-a-btn': '_onUploadLicenseABtnClick',
            'click .upload-license-b-btn': '_onUploadLicenseBBtnClick',
            'click .upload-idcard-btn': '_onUploadIdCardBtnClick',
            'click .apply-actual-btn': '_onApplyActualClick',
            'click canvas.thumbnail': '_onThumbnailClick',
            'change [name="no_hphm"]': '_onNoHphmChange',
            'change .driving-license-a-file': '_onLicenseAFileChange',
            'change .driving-license-b-file': '_onLicenseBFileChange',
            'change .idcard-file': '_onIdcardFileChange'
        },
        _onToFileClick: function(event){
            this.$el.find('.manual-form').hide();
            this.$el.find('.file-form').show();
        },
        _onToManualClick: function(event){
            this.$el.find('.file-form').hide();
            this.$el.find('.manual-form').show();
        },
        _onUploadLicenseABtnClick: function(event){
            this.$el.find('.driving-license-a-file').click();
        },
        _onUploadLicenseBBtnClick: function(event){
            this.$el.find('.driving-license-b-file').click();
        },
        _onUploadIdCardBtnClick: function(event){
            this.$el.find('.idcard-file').click();
        },
        _onThumbnailClick: function(event){
            var canvas = event.target;
            this.$el.find('#insurance_attach_preview_img').attr('src', canvas.toDataURL());
            this.$el.find('#insurance_attach_preview_popup').popup('open');
        },
        _onNoHphmChange: function(event){
            var is_checked = $(event.target).prop('checked');
            if(is_checked)
            {
                this.$el.find('[name="hphm"]').prop('disabled', true).attr('placeholder','还未获取牌照,不需填写').text('');
            }
            else
            {
                this.$el.find('[name="hphm"]').prop('disabled', false).attr('placeholder', '');
            }
        },
        _onLicenseAFileChange: function(event, result){
            var self = this;
            //如果是 android webview 模拟 file_input
            if(result)
            {
                self.$el.find('img.thumbnail-license-a').attr('src', 'data:image/png;base64,' + decodeURIComponent(result.result)).fadeIn(1000);
            }
            else
            {
                var file = $(event.target).prop('files')[0];
                var reader = new FileReader();
                reader.onload = function(event){
                    var result = event.target.result;
                    self.$el.find('img.thumbnail-license-a').attr('src', result);

                    /*
                    var form_data = new FormData();
                    form_data.append('pic', file);
                    
                    //ajax上传文件
                    $.ajax({
                        url:'/upload/file',
                        method: 'POST',
                        data: form_data,
                        dataType: 'json',
                        processData: false,
                        contentType: false
                    }).done(function(data){
                        if(data.success)
                        {
                            self.$el.find('[name="driving_license_a"]').val(data.path);
                        }
                    });*/
                };
                reader.readAsDataURL(file);
            }
        },
        _onLicenseBFileChange: function(event, result){
            var self = this;

            if(result)
            {
                self.$el.find('img.thumbnail-license-b').attr('src', 'data:image/png;base64,' + decodeURIComponent(result.result)).fadeIn(1000);
            }
            else
            {
                var file = $(event.target).prop('files')[0];
                var reader = new FileReader();
                reader.onload = function(event){
                    var result = event.target.result;
                    self.$el.find('img.thumbnail-license-b').attr('src', result);

                    /*
                    var form_data = new FormData();
                    form_data.append('pic', file);

                    //ajax上传文件
                    $.ajax({
                        url:'/upload/file',
                        method: 'POST',
                        data: form_data,
                        dataType: 'json',
                        processData: false,
                        contentType: false
                    }).done(function(data){
                        if(data.success)
                        {
                            self.$el.find('[name="driving_license_b"]').val(data.path);

                        }
                    });*/

                };
                reader.readAsDataURL(file);
            }

        },
        _onIdcardFileChange: function(event, result){
            var self = this;

            if(result)
            {
                self.$el.find('img.thumbnail-idcard').attr('src', 'data:image/png;base64,' + decodeURIComponent(result.result)).fadeIn(1000);
            }
            else
            {
                var file = $(event.target).prop('files')[0];
                var reader = new FileReader();
                reader.onload = function(event){
                    var result = event.target.result;
                    self.$el.find('img.thumbnail-idcard').attr('src', result);

                    /*
                    var form_data = new FormData();
                    form_data.append('pic', file);

                    //ajax上传文件
                    $.ajax({
                        url:'/upload/file',
                        method: 'POST',
                        data: form_data,
                        dataType: 'json',
                        processData: false,
                        contentType: false
                    }).done(function(data){
                        if(data.success)
                        {
                            self.$el.find('[name="idcard"]').val(data.path);
                        }
                    });*/

                };
                reader.readAsDataURL(file);
            }

        },
        _onThumbnailImageLoad: function(event){
            var img = event.target;
            var img_width = img.width;
            var img_height = img.height;
            var compress_width = 640;
            var compress_height = 480;
            var data_rel = $(event.target).attr('data-rel');
            var canvas = this.$el.find(data_rel)[0];
            var ctx = canvas.getContext('2d');

            var target_x = 0;
            var target_y = 0;
            var target_width = 0;
            var target_height = 0;

            //等比例缩放图片并居中
            if(img_width > img_height)
            {
                //宽图
                target_width = compress_width;
                target_height = (compress_width / img_width) * img_height;
                target_y = (compress_height - target_height) / 2; 
            }
            else
            {
                //长图
                target_height = compress_height;
                target_width = (compress_height / img_height) * img_width;
                target_x = (compress_width - target_width) / 2;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, target_x, target_y, target_width, target_height);
        },
        _onApplyActualClick: function(event){
            this._collectionFormData();
            if(this.model.isValid())
            {
                this.model.save();
            }
        },
        _render: function(model, options){
            this.$el.find('[name=phone]').val(G.user.phone || '');
            //如果是为只卖交强险套餐进行的精算, 精算按钮的文字改为'我要投保'
            if(this.is_compulsory)
            {
                this.$el.find('.apply-actual-btn').text('我要投保');
            }
            else
            {
                this.$el.find('.apply-actual-btn').text('我要精算');
            }
        },
        _renderSelect: function(){
            var today = new Date();
            var full_year = today.getFullYear();
            var begin_year = full_year - 25;

            for(var i = full_year; i >= begin_year; i--)
            {
                this.$el.find('[name=first_year]').append('<option value="' + i + '">' + i + '年</option>');
                this.$el.find('[name=insurance_year]').append('<option value="' + i + '">' + i + '年</option>');
            }

            for(var m = 12; m >= 1; m--)
            {
                this.$el.find('[name=first_month]').append('<option value="' + m + '">' + m + '月</option>');
                this.$el.find('[name=insurance_month]').append('<option value="' + m + '">' + m + '月</option>');
            }

        },
        _onFormModelInvalid: function(model, err){
            $.cm.toast({msg: err});
        },
        //收集表单数据到模型
        _collectionFormData: function(){
            var self = this;
            var info_id = this.model.get('info_id');
            this.model.clear({silent: true});
            this.model.set('info_id', info_id, {silent: true});

            this.$el.find('[name]:visible').each(function(i, n){

                if($(n).is('input:checkbox') && !$(n).prop('checked')) return;

                var key = $(n).attr('name');
                var value = $(n).val();

                self.model.set(key, value, {silent: true});
            });

            if(this.$el.find('.file-form').is(':visible'))
            {
                var license_a = this.$el.find('[name="driving_license_a"]').val();
                var license_b = this.$el.find('[name="driving_license_b"]').val();
                var idcard = this.$el.find('[name="idcard"]').val();
                this.model.set({
                    'driving_license_a': license_a,
                    'driving_license_b': license_b,
                    'idcard': idcard
                },{silent: true});
            }
        }
    });
    return ApplyActualPage;
});
