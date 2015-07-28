<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$debug = new Phalcon\Debug();
$debug->listen();

//try {

    /**
     * Read the configuration
     */
    $config = include __DIR__ . "/../app/config/config.php";

    /**
     * Read auto-loader
     */
    include __DIR__ . "/../app/config/loader.php";

    /**
     * Read services
     */
    include __DIR__ . "/../app/config/services.php";

    /**
     * Read plugins
     */
    include __DIR__ . "/../app/config/plugins.php";

    /**
     * Read routes
     */
    include __DIR__ . "/../app/config/routes.php";

    /**
     * Handle the request
     */
    $application = new \Phalcon\Mvc\Application($di);

    echo $application->handle()->getContent();

//} catch (\Exception $e) {
//    echo $e->getMessage();
//}
