<?php

class IndexController extends ControllerBase
{

    public function indexAction()
    {
    	//车险免单活动微信环境跳转
    	$user_agent = $this->request->getUserAgent();
    	$location_url = $this->request->get('location_url', null, null);
    	if(strpos($user_agent, 'MicroMessenger') !== false and $location_url)
    	{
    		return $this->response->redirect(base64_decode($location_url));
    	}
    	$index_pic = Adv::getIndexAdv();
    	$this->view->setVar('index_pic', $index_pic);
    }

    /**
     * 公开的微信入口
     */
    public function microMessengerEntranceAction()
    {
        $this->view->disable();

        $key = $this->request->get('key', null, null);
        if(!$key)
        {
            echo 'key验证失败!';
            return;
        }

        $key_arr = explode('|', base64_decode($key));
        $app_id = $key_arr[0];
        $app_secret = $key_arr[1];

        if(!$app_id or !$app_secret)
        {
            echo 'key验证失败';
            return;
        }

        $source = $this->request->get('source', null, 'cm');

        $user_agent = $this->request->getUserAgent();
        print_r($user_agent);
        if(strpos($user_agent, 'MicroMessenger') === false)
        {
            echo '请在微信环境中打开!';
            return;
        }

        $wx_redirect_url = urlencode('http://ip.yn122.net:8092/wx_login?appid='.$app_id.'&secret='.$app_secret.'&source='.$source);
        $oauth2_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$app_id.'&redirect_uri='.$wx_redirect_url.'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
        return $this->response->redirect($oauth2_url);
    }

    /**
     * 微信登录
     */
    public function microMessengerLoginAction()
    {
        $app_id = $this->request->get('appid', null, null);
        $app_secret = $this->request->get('secret', null, null);

        $state = $this->request->get('STATE');
        $code = $this->request->get('CODE');

        $source = $this->request->get('source', null, 'cm');

        $access_token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$app_id.'&secret='.$app_secret.'&code='.$code.'&grant_type=authorization_code';
        $access_token_json = file_get_contents($access_token_url);
        $access_token_info = json_decode($access_token_json);
        $openid = $access_token_info['openid'];
        
        $bind_user = User::getWxBindUser($openid, $source); 

        if(!$bind_user)
        {
            //micromessenger user bind page
            return $this->response->redirect('/user/bind/wx?source='.$source.'&openid='.$openid);
        }
        else
        {   
            //app entrance page
            return $this->response->redirect('/?userId='.$bind_user['user_id']);
        }
    }

    /**
     * 微信账号绑定页面
     */
    public function microMessengerBindAction()
    {
        $openid = $this->request->get('openid');
        $source = $this->request->get('source');

        $this->view->setVars(array(
            'openid' => $openid,
            'source' => $source
        ));
    }

    /**
     * 处理微信用户绑定
     */
    public function doMicroMessengerBindAction()
    {
        $openid = $this->request->getPost('openid');
        $source = $this->request->getPost('source');
        $user_phone = $this->request->getPost('user_phone');

        $user = User::getUserByPhone($user_phone);

        if(empty($user))
        {
            $user_agent = $this->request->getUserAgent();

            $this->view->setVar('is_user', false);

            $client_type = null;

            if( strpos($user_agent, 'iPhone') !== false )
            {
                $client_type = 'iPhone';
            }
            elseif( strpos($user_agent, 'iPod') !== false )
            {
                $client_type = 'iPod';
            }
            elseif( strpos($user_agent, 'iPad') !== false )
            {
                $client_type = 'iPad';
            }
            elseif( strpos($user_agent, 'Android') !== false )
            {
                $client_type = 'Android';
            }

            $register_result = file_get_contents('http://192.168.3.31/vehIllegalQuery/index.php?mod=Member&act=RegisterSave&PWD='.$user_phone.'&PHONE='.$user_phone.'&clientType='.$client_type);

            $user = User::getUserByPhone($user_phone);

            $this->view->setVars(array(
                'car_mate_user_phone' => $user_phone,
                'car_mate_pwd' => $user_phone
            ));
        }

        $bind_success = User::wxBindUser($user['user_id'], $openid, $source);

        $this->view->setVar('bind_success', $bind_success);
    }
}

