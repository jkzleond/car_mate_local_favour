<?php
/**
 * Created by PhpStorm.
 * User: jkzleond
 * Date: 15-6-26
 * Time: 下午3:51
 */

class ActivityController extends ControllerBase
{
    public function indexAction()
    {

    }

    /**
     * 获取活动列表
     * @param $type
     */
    public function getListAction($type)
    {
        $page_num = $this->request->get('page');
        $page_size = $this->request->get('rows');

        $criteria = array();

        if($type == 'my')
        {
            $user = User::getCurrentUser();
            $criteria['pub_user_id'] = $user['user_id'];
        }

        $activitise = Activity::getActivityList($criteria, $page_num, $page_size);
        $total = Activity::getActivityCount($criteria);

        $this->view->setVars(array(
            'total' => $total,
            'count' => count($activitise),
            'rows' => $activitise
        ));
    }

    /**
     * 获取指定id的活动详情
     * @param $id
     */
    public function getDetailAction($id)
    {
        $activity = Activity::getActivityDetailById($id);
        $user = User::getCurrentUser();
        $is_user_join = Activity::isUserJoin($user['user_id'], $id);

        $activity['is_user_join'] = $is_user_join;
        $this->view->setVars(array(
            'row' => $activity
        ));
    }

    /**
     * 活动报名
     */
    public function signUpAction()
    {
        $json_data = $this->request->getJsonRawBody(true);
        //保存用户信息

        $user_id = $json_data['user_id'];
        $aid = $json_data['aid'];

        //判断是否登录账号,不是则在账号前加时间戳区别不同的未登录账号
        if(strpos($json_data['user_id'], '@') === false)
        {
            $json_data['user_id'] = $json_data['user_id'].time();
        }

        //$is_joined = Activity::isUserJoin($user_id, $aid);

        $return_data = null;

        /*if($is_joined)
        {

            $return_data = array(
                'success' => false,
                'err_msg' => '该用户已报过名'
            );
        }
        else
        {*/
            $new_au_id = Activity::signUp($json_data, $aid); //活动参加用户记录新id

            if($new_au_id === false)
            {
                $return_data = array(
                    'success' => false,
                    'err_msg' => '报名失败,请稍后重试'
                );
            }
            else
            {
                $return_data = array(
                    'success' => true,
                    'err_msg' => '报名成功'
                );

                //如果存在付款项目,即活动市收费的,则生成订单
                if(!empty($json_data['pay_items']))
                {
                    $json_data['au_id'] = $new_au_id;
                    $order_result = Order::addOrder('activity', $json_data);

                    if(!$order_result)
                    {
                        $return_data['success'] = false;
                        $return_data['err_msg'] = '报名订单生成失败';
                    }
                    else
                    {
                        $return_data['order_info'] = array(
                            'order_id' => $order_result[0],
                            'order_no' => $order_result[1],
                            'order_fee' => $order_result[2]
                        );
                    }
                }
            }
        //}
        
        $this->view->setVars($return_data);
    }

    /**
     * 发布活动
     */
    public function addActivityAction()
    {
        $json_data = $this->request->getJsonRawBody(true);

        $new_activity_id = Activity::addActivity($json_data);

        if($new_activity_id === false)
        {
            $return_data = array(
                'success' => false,
                'err_msg' => '活动发布失败'
            );
        }
        else
        {
            $return_data = array(
                'success' => true,
                'err_msg' => '活动发布成功',
                'activity_id' => $new_activity_id
            );
        }

        $this->view->setVars($return_data);

    }
}