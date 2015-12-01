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
}

