<?php
/**
 * Created by PhpStorm.
 * User: jkzleond
 * Date: 15-5-29
 * Time: 下午3:43
 */

use \Phalcon\Mvc\User\Plugin;
use \Phalcon\Events\Event;
use \Phalcon\Mvc\Dispatcher;
use \Phalcon\Session\Bag as SessionBag;

class AutoLoginFilter extends Plugin
{
    public function beforeExecuteRoute(Event $event, Dispatcher $dispatcher)
    {
        //手动切换session_id
        $user = null;

        //获取url中带的session id
        $session_id = $this->request->get('ssid');

        if($session_id)
        {
            $this->session->setId($session_id);
        }

        //$user_id = $this->request->get('userId');
        //$user = $this->session->get('user');
        /*
        if(($user and $user['user_id'] == 'WEIBO_ACCOUNT' and $user_id) or (!$user and $user_id))
        {
            $user_info = User::getUserInfoById($user_id);
            $user = new SessionBag('user');
            $this->view->disable();
            print_r($user_info);
            foreach($user_info as $key => $value)
            {
                $user->set($key, $value);
            }

            $client_type = $this->request->get('clientType');
            $ver = $this->request->get('ver');
            $uuid = $this->request->get('uuid');

            $user->set('client_type', $client_type);
            $user->set('ver', $ver);
            $user->set('uuid', $uuid);

            $session_id = $this->session->getId();
        }
        else if(!$user and !$user_id)
        {
            //没有user_id参数并且没有session则登录为游客
            $user = new SessionBag('user');
            //user_id设置为客户端IP
            $user->set('user_id', 'WEIBO_ACCOUNT');
            $user->set('nickname', '游客');
        }
        */
    }
}