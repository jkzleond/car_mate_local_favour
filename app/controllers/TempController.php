<?php
use \Phalcon\Db;

class TempController extends ControllerBase
{
	public function initialize()
	{
		ini_set('display_errors', 0);
	}

	public function insuranceShareDescribeAction()
	{

	}

	/**
	 * 车险20免一, 分享
	 */
	public function insuranceShareAction()
	{
		$p_user_phone = $this->dispatcher->getParam('p_user_phone', null, '0');
		$user_phone = $this->dispatcher->getParam('user_phone');

		if(!$user_phone)
		{
			$this->view->setVar('is_user', true);
			$this->view->setVar('p_user_phone', $p_user_phone);
			return;
		}

		$user = User::getUserByPhone($user_phone);

		if(empty($user))
		{	

			$this->view->setVar('is_user', false);
			$this->view->setVar('p_user_phone', $p_user_phone);
			return;
		}
		else
		{	

			$db = $this->db;

			$query_sql = 'select count(1) from ActivityUser where (userid = :user_id or p_user_id = :user_id) and aid = :aid';
			$query_bind = array(
				'user_id' => $user['user_id'],
				'aid' => 228
			);
			$query_result = $db->query($query_sql, $query_bind);
			$query_result->setFetchMode(Db::FETCH_NUM);
			$result = $query_result->fetch();
			$is_already = $result[0] > 0;

			$this->view->setVar('is_already', $is_already);

			if($is_already)
			{
				return;
			}

			$insert_sql = null;
			$insert_bind = null;

			if($p_user_phone !== '0')
			{
				$p_user = User::getUserByPhone($p_user_phone);

				$insert_sql = 'insert into ActivityUser(userid, p_user_id, aid) values (:user_id, :p_user_id, :aid)';
				$insert_bind = array(
					'user_id' => $user['user_id'],
					'p_user_id' => $p_user['user_id'],
					'aid' => 228	
				);
			}
			else
			{
				$insert_sql = 'insert into ActivityUser(userid, aid) values (:user_id, :aid)';
				$insert_bind = array(
					'user_id' => $user['user_id'],
					'aid' => 228
				);					
			}

			$insert_success = $db->execute($insert_sql, $insert_bind);

			$this->flashSession->success('您已成功参加活动, 可以分享给您的好友咯！<br/>(让TA为你做贡献O(∩_∩)O哈哈~)');
			$this->response->redirect('/insurance_share/'.$user_phone, false);
			return $this->response; //这里一定要返回 response 对象 否则原本的模板还是会被执行 flashSession 就会被消耗
		}
	}

	/**
	 * 车险20免一, 抽奖
	 */
	public function insuranceShareDrawAction($aid)
	{
		echo $this->request->get('ssid', null, 123); 
		$user = User::getCurrentUser();
		var_dump($user);
		exit;
	}
}