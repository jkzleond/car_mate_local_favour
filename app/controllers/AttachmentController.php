<?php

/**
 * Created by PhpStorm.
 * User: jkzleond
 * Date: 15-7-21
 * Time: 上午6:21
 */
class AttachmentController extends ControllerBase
{

    private static $upload_dir = '/../../public/uploads';

    public function uploadAction($data_type)
    {
        if($data_type == 'file' || !$data_type)
        {
            $files = $this->request->getUploadedFiles();

            $file = $files[0];

            $dir = $this->_dir();

            if(!is_dir($dir))
            {
                mkdir($dir, 0777, true);
            }
            $path = self::$upload_dir.basename($file->getTempName()).time().'.'.$file->getExtension();
            $success = $file->moveTo($path);

            $this->view->setVars(array(
                'success' => $success,
                'path' => '/uploads/'.basename($path)
            ));
        }
        else if($data_type == 'base64')
        {

        }

    }

    private function _dir()
    {
        return __DIR__.self::$upload_dir;
    }
}