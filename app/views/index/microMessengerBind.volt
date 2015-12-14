<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=no" />
	<title></title>
	<link rel="stylesheet" href="{{ url('/assets/css/jquery.mobile.material.theme.css')}}"/>
	<script type="text/javascript" src="{{ url('/assets/js/jquery-2.js') }}"></script>
	<script type="text/javascript" src="{{ url('/assets/js/jquery.mobile-1.4.5.js') }}"></script>
</head>
<body>
	<div data-role="page">
		<div role="main" class="ui-content">
			{% if not bind_success %}
			<p style="text-align:center">
				您的账号还没有绑定,请先进行绑定
			</p>
			<form action="/user/bind/wx" method="post">
				<div class="ui-field-contain">
					<label for="user_phone_input">电话号码</label>
					<input id="user_phone_input" type="text" placeholder="您的电话号码">
				</div>
				<input type="hidden" name="openid" value="{{ openid }}">
				<input type="hidden" name="source" value="{{ source }}">
				<button data-theme="g" style="padding:0.7em 0.5%; margin: 0.5%; width: 99%;color:white">绑定</button>
			</form>
			{% else %}
			<p style="text-align:center">
				{% if not is_user %}
				因为您不是车友惠用户,所以我们为您注册了车友惠账号 <br>
				用户名: {{ car_mate_user_phone }} <br>
				密码: {{ car_mate_pwd }} <br>
				用以上用户名和密码可登陆车友惠App,更多惊喜尽在车友惠App
				{% else %}
				您已成功绑定账号
				{% endif %}
			</p>
				{% if no is_user %}
			<a href="http://116.55.248.76/cyh_weixin/joinus.html" data-theme="g" style="padding:0.7em 0.5%; margin: 0.5%; width: 99%;color:white">下载车友惠App</a>
				{% endif %}
			<a href="http:ip.yn122.net:8092/?userId={{ user_id }}#insurance" data-theme="f" style="padding:0.7em 0.5%; margin: 0.5%; width: 99%;color:white">去计算保费>>></a>
			{% endif %}
		</div>
	</div>
</body>
</html>