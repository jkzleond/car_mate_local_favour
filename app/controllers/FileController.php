<?php

/**
 * Created by PhpStorm.
 * User: jkzleond
 * Date: 15-7-21
 * Time: 上午6:21
 */
class FileController extends ControllerBase
{
    public function uploadAction()
    {
        $files = $this->request->getUploadedFiles();

        $file = $files[0];
        $dir = __DIR__.'/../../public/uploads/';
        if(!is_dir($dir))
        {
            mkdir($dir, 0777, true);
        }
        $path = $dir.basename($file->getTempName()).time().'.'.$file->getExtension();
        $success = $file->moveTo($path);

        $this->view->setVars(array(
            'success' => $success,
            'path' => '/uploads/'.basename($path)
        ));
    }
}