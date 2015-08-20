<?php
/**
 * Created by PhpStorm.
 * User: jkzleond
 * Date: 15-5-29
 * Time: 下午12:29
 */

$router = $di->getShared('router');


//本地惠首页
$router->addGet('/', array(
    'controller' => 'index',
    'action' => 'index'
));



//获取session_id
$router->addGet('/session_id.json', array(
    'controller' => 'user',
    'action' => 'getSessionId'
));

//用户登录
$router->addGet('/user/login.json', array(
    'controller' => 'user',
    'action' => 'login'
));

//获取用户信息
$router->addGet('/user/info/{user_id:.*}.json', array(
    'controller' => 'user',
    'action' => 'getUserInfo'
));

//获取用户信息
$router->addGet('/user/avatar/{user_id:(.+@.+\..+|me)}.png', array(
    'controller' => 'user',
    'action' => 'getUserAvatar'
));

//获取签到信息
$router->addGet('/clock_in.json', array(
    'controller' => 'clockin',
    'action' => 'getClockInInfo'
));

//签到
$router->addPost('/clock_in.json', array(
    'controller' => 'clockin',
    'action' => 'doClockIn'
));

/*保险巨惠*/

//保险聚会入口页面
$router->addGet('/insurance', array(
    'controller' => 'insurance',
    'action' => 'index'
));

//保险初算结果保存
$router->addPost('/insurance/first', array(
    'controller' => 'insurance',
    'action' => 'addFirstResult'
));

//获取保险信息
$router->addGet('/insurance/info/{id:\d+}', array(
    'controller' => 'insurance',
    'action' => 'getInsuranceInfo'
));

//更新保险信息
$router->addPut('/insurance/info/{id:\d+}', array(
    'controller' => 'insurance',
    'action' => 'updateInsuranceInfo'
));

//获取保险初算结果
$router->addGet('/insurance/first_result/{id:\d+}', array(
    'controller' => 'insurance',
    'action' => 'getInsuranceFirstResult'
));

//获取保险精算结果
$router->addGet('/insurance/{info_id:\d+}/actuary_results', array(
    'controller' => 'insurance',
    'action' => 'getFinalResults'
));

//获取保险公司列表
$router->addGet('/insurance/companise', array(
    'controller' => 'insurance',
    'action' => 'getInsuranceCompanyList'
));

//保险精算
$router->addPost('/insurance/actual', array(
    'controller' => 'insurance',
    'action' => 'actual'
));

//获取保险精算结果
$router->addGet('/insurance/{info_id:\d+}/actuary_results', array(
    'controller' => 'insurance',
    'action' => 'getFinalResults'
));

//保险下单
$router->addPost('/insurance/{info_id:\d+}/apply_policy', array(
    'controller' => 'insurance',
    'action' => 'applyPolicy'
));

//获取保险订单信息详情
$router->addGet('/insurance/{insurance_info_id:\d+}/order_info', array(
    'controller' => 'insurance',
    'action' => 'getInsuranceOrderInfo'
));

//保险确认下单(同时更改保险信息的收单地址)
$router->addPut('/insurance/{insurance_info_id:\d+}/order_info', array(
    'controller' => 'insurance',
    'action' => 'certainInsuranceOrder'
));

//保险预约
$router->addPost('/insurance/reservation', array(
    'controller' => 'insurance',
    'action' => 'addReservation'
));

//获取保险信息列表
$router->addGet('/insurances/{state:\d+}', array(
    'controller' => 'insurance',
    'action' => 'getInsuranceInfoList'
));


/*发现*/

//获取发现数据
$router->addGet('/discoverise', array(
    'controller' => 'discovery',
    'action' => 'getList'
));

//获取指定id发现数据
$router->addGet('/discovery/{id:\d+}', array(
    'controller' => 'discovery',
    'action' => 'getDetail'
));

//获取发现回复数据
$router->addGet('/discovery/{local_favour_id:\d+}/comments', array(
    'controller' => 'discovery',
    'action' => 'getComments'
));

//添加指定id发现的回复
$router->addPost('/discovery/{local_favour_id:\d+}/comments', array(
    'controller' => 'discovery',
    'action' => 'addComment'
));

//获取自驾游数据
$router->addGet('/driving_tours', array(
    'controller' => 'drivingtour',
    'action' => 'getList'
));

//获取自驾游详情
$router->addGet('/driving_tour/{id:\d+}', array(
    'controller' => 'drivingtour',
    'action' => 'getDetail'
));

/*活动*/

//活动入口页面
$router->addGet('/activity', array(
    'controller' => 'activity',
    'action' => 'index'
));

$router->addGet('/activitise[/]?{type:(my)?}', array(
    'controller' => 'activity',
    'action' => 'getList'
));

$router->addGet('/activity/{id:\d+}', array(
    'controller' => 'activity',
    'action' => 'getDetail'
));

$router->addPost('/activity', array(
    'controller' => 'activity',
    'action' => 'addActivity'
));

$router->addPost('/activity/sign_up/', array(
    'controller' => 'activity',
    'action' => 'signUp'
));

/*省市*/

//获取省份列表
$router->addGet('/provinces', array(
    'controller' => 'province',
    'action' => 'getProvinceList'
));

//获取指定省份的城市列表
$router->addGet('/citise/{province_id:\d+}', array(
    'controller' => 'province',
    'action' => 'getProvinceCitise'
));

//上传文件
$router->addPost('/upload/file', array(
    'controller' => 'file',
    'action' => 'upload'
));
