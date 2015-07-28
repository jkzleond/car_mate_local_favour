<?php
/**
 * Created by PhpStorm.
 * User: jkzleond
 * Date: 15-6-9
 * Time: 下午2:12
 */

use \Phalcon\Session\Bag as SessionBag;

class UserController extends ControllerBase
{
    public function loginAction()
    {
        $user_id = $this->request->get('userId');

        $user_info = User::getUserInfoById($user_id);

        if(!empty($user_info))
        {
            $user = new SessionBag('user');

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
        }
        else
        {
            //没有user_id参数并且没有session则登录为游客
            $user = new SessionBag('user');
            //user_id设置为客户端IP
            $user->set('id', 0);
            $user->set('user_id', 'WEIBO_ACCOUNT');
            $user->set('nickname', '游客');
        }

        $session_id = $this->session->getId();
        $this->view->setVars(array(
            'session_id' => $session_id,
            'user_info' => $user->getIterator()
        ));
    }

    /**
     * 获取session id
     */
    public function getSessionIdAction()
    {
        $session_id = $this->session->getId();
        $this->view->setVar('session_id', $session_id);
    }

    /**
     * 获取用户信息
     * @param string $user_id
     */
    public function getUserInfoAction($user_id='me')
    {
        $user = null;
        if($user_id == 'me')
        {
            $user = User::getCurrentUser();
        }
        else
        {
            $user = User::getUserInfoById($user_id);
        }

        $this->view->setVar('row', $user);
    }

    /**
     * 获取用户头像图片
     * @param $user_id
     */
    public function getUserAvatarAction($user_id)
    {
        $this->view->disable();
        $this->response->setContentType('image/png');
        $pic_data_str = User::getUserAvatarById($user_id);

        echo base64_decode($pic_data_str);
    }


}