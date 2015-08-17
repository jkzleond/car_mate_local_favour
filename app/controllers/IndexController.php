<?php

class IndexController extends ControllerBase
{

    public function indexAction()
    {
    	$index_pic = Adv::getIndexAdv();
    	$this->view->setVar('index_pic', $index_pic);
    }
}

