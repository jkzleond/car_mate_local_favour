<!doctype html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=no" />
	<link rel="stylesheet" type="text/css" href="{{ url('/assets/temp/insuranceShare/css/css.css') }}" />
	<title>活动规则</title>
</head>
<body style="margin:0px; background-color:#AF2175; padding-bottom:70px;">
	<div>
		<img src="{{ url('/assets/temp/insuranceShare/img/index.jpg') }}" width="100%" style="max-width:100%;min-width:320px; " />
	</div>
	<div style="background-color:#ffffff;width:96.6%; height: 75px; margin-left:1.7%;text-align:center; position: fixed; bottom: 0px;">
		<table style="width:100%; height:100%" cellpadding="0" cellspacing="10">
			<tr>
				<td>
					<a href="{{ url('/insurance_share') }}/{{ p_user_phone }}{% if user_phone %}?user_phone={{ user_phone }}{% endif %}">
						<img src="{{ url('/assets/temp/insuranceShare/img/bt_hy.jpg') }}" style="max-width: 100%; min-width: 100px; width: 80%; height: 40%;"/>	
					</a>
				</td>
				<td>
					{% if not is_in_car_mate %}
					<a href="http://116.55.248.76/cyh_weixin/joinus.html">
						<img src="{{ url('/assets/temp/insuranceShare/img/bt_bf.jpg') }}" style="max-width: 100%; min-width: 100px; width: 80%; height: 40%;"/>
					</a>
					{% else %}
					<a href="http://ip.yn122.net:8092/?userId={{ user_id }}&&clientType={{ client_type }}">
						<img src="{{ url('/assets/temp/insuranceShare/img/bt_bf.jpg') }}" style="max-width: 100%; min-width: 100px; width: 80%; height: 40%;"/>
					</a>
					{% endif %}
				</td>
			</tr>
			<tr>
				<td>
					user_phone:{{ user_phone }}
					is_in_car_mate:{{ is_in_car_mate }}
				</td>
			</tr>
		</table>
	</div>
</body>
</html>
