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

    public function mricroMessengerEntranceAction()
    {
        $this->view->disable();

        $key = $this->request->get('key', null, null);
        if(!$key)
        {
            echo 'key验证失败!';
            return;
        }

        $key_arr = explode(base64_decode($key), '|');
        $app_id = $key_arr[0];
        $app_secret = $key_arr[1];

        if(!$app_id or !$app_secret)
        {
            echo 'key验证失败';
            return;
        }

        $user_agent = $this->request->getUserAgent();

        if(strpos('MicroMessenger', $user_agent) === false)
        {
            echo '请在微信环境中打开!';
            return;
        }

        $wx_redirect_url = urlencode('http://ip.yn122.net:8092/wx_login?app_id='.$app_id.'&app_secret='.$app_secret);
        $oauth2_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$app_id.'&redirect_uri='.$wx_redirect_url.'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
        return $this->response->redirect($oauth2_url);
    }

    public function microMessengerLoginAction()
    {

    }
}

