<!doctype html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=no" />
<link rel="stylesheet" type="text/css" href="{{ url('/assets/temp/insuranceShare/css/css.css') }}" />
<script type="text/javascript" src="{{ url('/assets/js/jquery-2.js') }}"></script>
<title>来抽它!使劲刮！</title>
</head>

<body class="body_zj ">
<audio class="audio" src="{{ url('/assets/temp/insuranceShare/audio/scratch.mp3') }}" preload="auto"></audio>
<div>
	<img src="{{url('/assets/temp/insuranceShare/img/top.jpg')}}" width="100%" style="max-width: 100%; min-width: 320px;" />
</div>
<div class="zj_div">
	<table class="zj_div_txt" cellpadding="0" cellspacing="10">
		<tr>
			<td style="color: #3F3F3F;">
				您还有<span style="color: #8E236F;">{{ chance }}</span>次抽奖机会
			</td>
		</tr>
	</table>
	<table cellpadding="0" cellspacing="0" class="zj_div_cj" align="center">
		<tr>
			<td>
				{% if is_on_time and chance > 0 %}
				<div id="scratch_container" class="zj_div_cj_div" style="position:relative">
					{% if is_bingo %}
					<img src="data:image/png;base64,{{ award['pic'] }}" alt="" style="height:40%"><span style="font-size:2em;">{{ award['name'] }}</span>
					{% else %}
					谢谢惠顾,您没中奖,下一定会是大奖^_^
					{% endif %}
					<canvas id="scratch_canvas" width="100%" height="100%" style="position:absolute; top:0px; left:0px">
					</canvas>
				</div>
				{% elseif chance > 0 %}
				<div id="scratch_container" class="zj_div_cj_div" style="position:relative">
					还没到抽奖时间,下次抽奖时间是<span style="color: #8E236F;">{{ nearest_time }}</span>
				</div>
				{% else %}
				<div id="scratch_container" class="zj_div_cj_div" style="position:relative">
					您的抽奖机会已用完
				</div>
				{% endif %}
			</td>
		</tr>
	</table>
	<table style="width: 100%" cellpadding="0" cellspacing="10">
		{% if is_on_time and chance > 0 %}
		<tr>
			<td colspan="2">
				<a href="{{url('/insurance_share/draw/228')}}">
					<img src="{{url('/assets/temp/insuranceShare/img/bt_gj.png')}}" style="max-width: 100%; min-width: 320px; width:80%;" />
				</a>
			</td>
		</tr>
		{% endif %}
		<tr>
			<td>
				<a href="{{url('/insurance_share/describe')}}">
					<img src="{{url('/assets/temp/insuranceShare/img/gz.png')}}" style="max-width: 100%; min-width: 100px; width:80%;" />
				</a>
			</td>
			<td>
				<img src="{{url('/assets/temp/insuranceShare/img/xx.png')}}" style="max-width: 100%; min-width: 100px; width:80%;" />
			</td>
		</tr>
		<tr>
			<td id="debug">&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
	</table>
</div>

</body>
{% if is_on_time and chance > 0 %}
<script type="text/javascript">
	(function(window, document, $){
		
		//a标签事件
		$('a').click(function(event){
			event.preventDefault();
			var href = $(this).attr('href');
			var param = window.location.href.match(/\?.*/) || '';
			window.location.href = href + param;
			return false;
		});


		var $container = $('#scratch_container');
		var $canvas = $('#scratch_canvas');
		var width = $container.innerWidth();
		var height = $container.innerHeight();
		var offset = $canvas.offset();

		$canvas.attr('width', width);
		$canvas.attr('height', height);

		var canvas = $canvas[0];

		var ctx = canvas.getContext('2d');
		ctx.fillStyle = 'transparent';
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = 'gray'; 
        ctx.fillRect(0, 0, width, height);

 

	    ctx.globalCompositeOperation = 'destination-out';

	    canvas.addEventListener('touchstart', eventDown, false);
	    canvas.addEventListener('touchend', eventUp, false);
	    canvas.addEventListener('touchmove', eventMove, false);
	    canvas.addEventListener('mousedown', eventDown, false);
	    canvas.addEventListener('mouseup', eventUp, false);
	    canvas.addEventListener('mousemove', eventMove, false);

	    var last_update = 0;
	    var x = y = z = last_x = last_y = last_z = 0;

	   	
	    //如果设备支持加速度传感器,则注册摇一摇事件	
	    if(window.DeviceMotionEvent)
	    {
	    	window.addEventListener('devicemotion', motionHandler);
	    }
	    
	    var mousedown = false;
	    var win_width = $(window).innerWidth();
	    var win_height = $(window).innerHeight();

	   	function eventDown(e){
	        e.preventDefault();
	        e.stopPropagation();//阻止事件冒泡
	        mousedown=true;
	        return false;
	    }

	    function eventUp(e){
	        e.preventDefault();
	        e.stopPropagation();//阻止事件冒泡
	        mousedown=false;
	        return false;
	    }

	    function eventMove(e){
	        e.preventDefault();//阻止默认事件
	        e.stopPropagation();//阻止事件冒泡
	        if(mousedown) {
	             if(e.changedTouches){
	                 e=e.changedTouches[e.changedTouches.length-1];
	             }

	             with(ctx) {
	                 beginPath()
	                 arc(e.pageX - offset.left, e.pageY - offset.top, 15, 0, Math.PI * 2);
	                 fill();
	             }

	             $('.audio')[0].play();
	        }
	        return false;
	    }

	    function motionHandler(e)
	    {
	    	var acceleration = e.accelerationIncludingGravity;
	    	var cur_time = Date.now();
	    	var diff_time = cur_time - last_update;
	    	last_update = cur_time;

	    	x = acceleration.x;
	    	y = acceleration.y;
	    	z = acceleration.z;

	    	var speed = Math.sqrt(x*x + y*y + z*z) / diff_time * 1000;

	    	//$('#debug').html('x:' + x + '<br>y:' + y + '<br>z:' + z);

	    	if(speed > 1000)
	    	{
	    		$('#debug').html(speed);
	    	}
		
	    	last_x = x;
	    	last_y = y;
	    	last_z = z;
	    }
	})(window, document, jQuery);
</script>
{% endif %}
</html>