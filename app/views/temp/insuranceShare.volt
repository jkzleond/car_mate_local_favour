<!doctype html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=no" />
<link rel="stylesheet" type="text/css" href="{{ url('/assets/temp/insuranceShare/css/css.css') }}" />
<script type="text/javascript" src="{{ url('/assets/temp/insuranceShare/js/jweixin-1.0.0.js') }}"></script>
<title>参与分享吧！</title>
</head>

<body  class="body_fx">

<div>
	<img src="{{ url('/assets/temp/insuranceShare/img/crsj.jpg') }}" width="100%" style="max-width: 100%; min-width: 320px;" />
</div>
<div class="fx_div_sr">
	<input type="hidden" name="p_user_phone" value="{{ p_user_phone }}" />
	<input type="hidden" name="wx_state" value="{{ wx_state }}" />
	<input type="hidden" name="wx_openid" value="{{ wx_openid }}" />
	{% if not is_already %}
	<table  class="fx_div_sr_table" cellpadding="0" cellspacing="10">
		<tr>
			<td style="color: #3F3F3F;">
				<input id="phone_input" name="phone" type="text"  class="fx_div_sr_input" placeholder="输入您的手机号"/>
			</td>
		</tr>
	</table>
	<table style="width: 100%;" cellpadding="0" cellspacing="10">
		<tr>
			<td>
				<a id="submit_btn" href="">
					<img src="{{ url('/assets/temp/insuranceShare/img/bt_hy.png') }}" style="max-width: 100%; min-width: 320px; width: 80%;"  />
				</a>
			</td>
		</tr>
		<tr>
			<td>
				 <?php echo $invitation_code; ?>
			     <?php $this->flashSession->output(); ?>
			</td>
		</tr>
		{% if not is_user %}
		<?php var_dump($is_user); ?>
		<tr>
			<td >
				<div  class="fx_div_sr_z">注：<br />
				您不是车友惠用户，请先下载车友惠APP，注
				册后即可参加活动。<br />
				</div>	
			</td>
		</tr>
		<tr>
			<td>
				<a href="http://116.55.248.76/cyh_weixin/joinus.html"></a>
				<img src="{{ url('/assets/temp/insuranceShare/img/bt_xz.png') }}" style="max-width: 100%; min-width: 320px; width: 80%" />
			</td>
		</tr>
		{% endif %}
	</table>
	{% else %}
	<table class="fx_div_sr_table">
		<tr>
			<td>
				<?php $this->flashSession->output(); ?>
			</td>
		</tr>
		<?php if($is_wx and !empty($view_record_list)){ ?>
		<tr>
			<td>
				有以下<?php count($view_record_list); ?>已经点击过您分享的页面,他们是:
			</td>
		</tr>
		<tr>
			<td>
				<ul style="">
					{% for view_record in view_record_list %}
					<li><img src="{{ view_record['headimgurl'] }}" alt="" style="width:32px;height:32px;"><span>{{ view_record['nickname'] }}</span></li>
					{% endfor %}
				</ul>
			</td>
		</tr>
		<?php } ?>
	</table>
	{% endif %}
</div>
{% if not is_already %}
<script type="text/javascript">
	/**
	 * 参加活按钮点击
	 */
	(function(window, document){
		var p_user_phone = document.getElementsByName('p_user_phone')[0].value;
		var wx_state = document.getElementsByName('wx_state')[0].value;
		var wx_openid = document.getElementsByName('wx_openid')[0].value;
		var phone_input = document.getElementById('phone_input');
		var submit_btn = document.getElementById('submit_btn');

		phone_input.addEventListener('input', function(event){
			var value = this.value;
			this.value = this.value.replace(/[^\d]/g, '');
		});

		submit_btn.addEventListener('click', function(event){
			event.preventDefault();

			if(!phone_input.value)
			{
				alert('请填写您的电话号码！');
				return;
			}

			window.location.href = "{{ url('/insurance_share/') }}" + p_user_phone +'?user_phone=' + phone_input.value + '&state=' + wx_state + '&wx_openid=' + wx_openid;
			return false;
		})
	})(window, document);
</script>
{% endif %}
<script type="text/javascript">
  /*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */
  
 //getConfig();
	  
	/**获取配置*/
	function callback_config(config){
		console.log(config);
		wx.config({
            debug: false,
            appId: config.appId,
            timestamp: config.timestamp,
            nonceStr: config.nonceStr,
            signature: config.signature,

           
            jsApiList: [
                'checkJsApi',
		        'onMenuShareTimeline',
		        'onMenuShareAppMessage',
		        'onMenuShareQQ',
		        'onMenuShareWeibo',
		        'hideMenuItems',
		        'showMenuItems',
		        'hideAllNonBaseMenuItem',
		        'showAllNonBaseMenuItem',
		        'translateVoice',
		        'startRecord',
		        'stopRecord',
		        'onRecordEnd',
		        'playVoice',
	            'pauseVoice',
	            'stopVoice',
	            'uploadVoice',
	            'downloadVoice',
	            'chooseImage',
	            'previewImage',
	            'uploadImage',
	            'downloadImage',
	            'getNetworkType',
	            'openLocation',
	            'getLocation',
	            'hideOptionMenu',
	            'showOptionMenu',
	            'closeWindow',
	            'scanQRCode',
	            'chooseWXPay',
	            'openProductSpecificView',
	            'addCard',
	            'chooseCard',
	            'openCard'
              // 所有要调用的 API 都要加到这个列表中
            ]
        });
       
       	var p_user_phone = document.getElementsByName('p_user_phone')[0].value;

        var wxData = {
        "appId": "",
        "imgUrl" : 'http://www.rttwy.com/yurenjie/images/logo.png',
        "link" : 'http://ip.yn122.net:8092/insurance_share' + (p_user_phone ? '/' + p_user_phone : '');
        "desc" : '车险免单，还不快来？',
        "title" : "车友惠福利：您的车险免单啦！"
        };
        var str_mp = "weixin://profile/gh_8592a4c9c934";//关注的链接
        wx.ready(function () {
        // 2. 分享接口
        // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareAppMessage({
              title: wxData.title,
              desc: wxData.desc,
              link:wxData.link ,
              imgUrl: wxData.imgUrl,
              trigger: function (res) {
	              
              },
              success: function (res) {
	            location.href = str_mp;//关注的链接
              },
              cancel: function (res) {
	             alert("如此嗨的福利，真的不分享给朋友吗？");
              },
              fail: function (res) {
                 alert(JSON.stringify(res));
              }
            });

            wx.onMenuShareTimeline({
              title: wxData.title,
              desc: wxData.desc,
              link: wxData.link,
              imgUrl: wxData.imgUrl,
              trigger: function (res) {
              },
              success: function (res) {
	            location.href = str_mp;//关注的链接
              },
              cancel: function (res) { 
                alert("如此嗨的福利，真的不分享给朋友吗？");
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }
            });
            
            //alert('wx_config ok!');
        });

        wx.error(function (res) {
        	alert(res.errMsg);
        });
	}
	
	
	var script = document.createElement('script');
	script.src =  "http://116.55.248.76/wxjs_config/config.php?callback=callback_config&url=" + encodeURIComponent( window.location.href.split('#')[0] );
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(script);
</script>
</body>
</html>