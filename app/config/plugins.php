<?php
/**
 * Created by PhpStorm.
 * User: jkzleond
 * Date: 15-3-19
 * Time: 下午10:40
 */

$eventsManager = $di->getShared('eventsManager');

/**
 * 登录处理
 */

$eventsManager->attach('dispatch', new AutoLoginFilter($di));



/**
 * 权限验证
 */
//$eventsManager->attach('dispatch', new AuthFilter($di));
/**
 * utf8编码
 */
$eventsManager->attach('dispatch', new UTF8EnCodingFilter($di));

/**
 * ajax请求json自动转换
 */
$eventsManager->attach('dispatch', new AjaxFilter($di));

