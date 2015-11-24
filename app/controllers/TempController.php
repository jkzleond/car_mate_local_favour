<?php
use \Phalcon\Db;

class TempController extends ControllerBase
{
	//微信appid,secrect
	private $_app_id = 'wx1f42c4cb56c5095d';
	private $_app_secret = '276e08a1e2d2c9680823e6ddd0720c4c';

	public function initialize()
	{
		ini_set('display_errors', 0);
	}

	public function insuranceShareDescribeAction()
	{
		$is_wx = $this->request->get('is_wx', null, false);
		$this->view->setVars(array(
			'is_wx' => $is_wx
		));
	}

	/**
	 * 车险20免一, 分享
	 */
	public function insuranceShareAction()
	{
		$p_user_phone = $this->dispatcher->getParam('p_user_phone', null, '0');
		$user_phone = $this->dispatcher->getParam('user_phone');

		$p_user_id = null;
		if($p_user_phone !== '0')
		{
			$p_user = User::getUserByPhone($p_user_phone);
			$p_user_id = $p_user['user_id'];
		}

		$wx_state = $this->request->get('state', null, false);

		$this->view->setVar('wx_state', $wx_state);

		$wx_code = $this->request->get('code', null, null);
		$wx_openid = $this->request->get('wx_openid', null, null)
		$wx_unionid = $this->request->get('wx_unionid', null, null)
		$wx_token = null;
		$wx_userinfo = null;

		$bind_user = null;

		if($wx_state and !$user_phone)
		{

			if($wx_code)
			{
				$wx_token_json = file_get_contents('https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$this->_app_id.'&secret='.$this->_app_secret.'&code='.$wx_code.'&grant_type=authorization_code');
				$wx_token = json_decode($wx_token_json);

				$bind_user_list = User::getUserList(array(
					'wx_opnenid' => $wx_token['openid']
				));

				if(!empty($bind_user_list))
				{
					$bind_user = $bind_user_list[0];
				}

				$wx_userinfo_json = file_get_contents('https://api.weixin.qq.com/sns/userinfo?access_token='.$wx_token['access_token'].'&openid='.$wx_token['openid'].'&lang=zh_CN');

				$wx_userinfo = json_decode($wx_userinfo_json);
				$this->view->disable();
				print_r($wx_userinfo);
				exit;

				//保存微信用户信息
				
				$db = $this->db;

				$get_wx_user_sql = 'select top 1 id from WX_USER where openid = :openid';
				$get_wx_user_bind = array('openid' => $wx_userinfo['openid']);
				$wx_user_result = $db->query($get_wx_user_sql, $get_wx_user_bind);
				$wx_user_result->setFetchMod(Db::FETCH_ASSOC);
				$wx_user = $wx_user_result->fetch();

				$wx_user_id = !empty($wx_user) ? $wx_user['id'] : null;

				//没有此微信用户记录则添加
				
				if(!$wx_user_id)
				{
					$insert_wx_user_sql = 'insert into WX_USER (openid, nickname, sex, province, city, country, privilege, unionid) values (:openid, :nickname, :sex, :province, :city, :country, :privilege, :unionid)';
					$insert_wx_user_bind = array(
						'openid' => $wx_userinfo['openid'],
						'nickname' => $wx_userinfo['nickname'],
						'sex' => $wx_userinfo['sex'],
						'province' => $wx_userinfo['province'],
						'city' => $wx_userinfo['city'],
						'country' => $wx_userinfo['country'],
						'privilege' => $wx_userinfo['privilege'],
						'unionid' => $wx_userinfo['unionid']
					);
					$db->execute($insert_wx_user_sql, $insert_wx_user_sql);
					$wx_user_id = $db->lastInsertId();
				}

				$get_view_sql = 'select top 1 id from Hui_ActivityShareView where wx_user_id = :wx_user_id and p_user_id = :p_user_id and aid = :aid';
				$get_view_bind = array(
					'wx_user_id' => $wx_user_id,
					'p_user_id' => $p_user_id,
					'aid' => 228;
				);
				$view_result = $db->query($get_view_sql, $get_view_bind);
				$view_result->setFetchMode(Db::FETCH_ASSOC);
				$view_record = $view_result->fetch()

				if($wx_user_id and empty($view_record))
				{
					//添加微信用户访问记录(本次活动)
					$insert_view_sql = 'insert into Hui_ActivityShareView (p_user_id, wx_user_id, aid) values (:p_user_id, :wx_user_id, :aid)';
					$insert_view_bind = array(
						'p_user_id' => $p_user_id,
						'wx_user_id' => $wx_user_id,
						'aid' => $aid
					);
					$insert_view_success = $db->execute($insert_view_sql, $insert_view_bind);
				}
			}

			$this->view->setVar('wx_openid', $wx_token['openid']);
		}

		if(!$user_phone and !$bind_user)
		{
			$this->view->setVar('is_user', true);
			$this->view->setVar('p_user_phone', $p_user_phone);
			return;
		}

		$user = !empty($bind_user) ? $bind_user : User::getUserByPhone($user_phone);

		if(empty($user))
		{	

			$this->view->setVar('is_user', false);
			$this->view->setVar('p_user_phone', $p_user_phone);
			return;
		}
		else
		{	

			$db = $this->db;

			//如果用户没绑定,则绑定(微信客户端访问页面时)
			if($wx_state and !$bind_user)
			{
				$bind_user_sql = 'update IAM_USER set weixintoken = :wx_openid, wx_opnenid = :wx_openid';
				$bind_user_bind = array(
					'wx_openid' => $wx_openid
				);
				$bind_user_success = $db->execute($bind_user_sql, $bind_user_bind);
			}

			$query_sql = 'select invitation_code from ActivityUser where userid = :user_id and aid = :aid';
			$query_bind = array(
				'user_id' => $user['user_id'],
				'aid' => 228
			);
			$query_result = $db->query($query_sql, $query_bind);
			$query_result->setFetchMode(Db::FETCH_ASSOC);
			$involved_user = $query_result->fetch();
			$is_already = !empty($involved_user);

			if($is_already)
			{
				$this->flashSession->success('您已成功参加活动, 邀请码为[<span style="font-weight:bold">'.$involved_user['invitation_code'].'</span>], 可以分享给您的好友咯！<br/>(让TA为你做贡献O(∩_∩)O哈哈~)');
				$this->response->redirect('/insurance_share/'.$user_phone, false);
				return $this->response; //这里一定要返回 response 对象 否则原本的模板还是会被执行 flashSession 就会被消耗
			}

			$insert_sql = null;
			$insert_bind = null;
	
			$invitation_code = strtoupper((str_pad(dechex($user['id']), 5, '0', STR_PAD_LEFT)));

			$insert_au_sql = 'insert into ActivityUser(userid, aid, p_user_id, invitation_code) values (:user_id, :aid, :p_user_id, :invitation_code)';
			$insert_au_bind = array(
				'user_id' => $user['user_id'],
				'aid' => 228,
				'p_user_id' => $p_user_id,
				'invitation_code' => $invitation_code
			);					
			$insert_au_success = $db->execute($insert_au_sql, $insert_au_bind);


			$this->flashSession->success('您已成功参加活动, 邀请码为['.$invitation_code.'], 可以分享给您的好友咯！<br/>(让TA为你做贡献O(∩_∩)O哈哈~)');
			$this->response->redirect('/insurance_share/'.$user_phone, false);
			return $this->response; //这里一定要返回 response 对象 否则原本的模板还是会被执行 flashSession 就会被消耗
		}
	}

	/**
	 * 车险20免一, 抽奖
	 */
	public function insuranceShareDrawAction($aid)
	{
		//$this->view->disable();
		$user = User::getCurrentUser();
		$chance = Activity::getDrawChance($aid, $user['user_id']); //获取抽奖机会
		$this->view->setVar('chance', $chance);
		$this->view->setVar('session_id', $this->session->getSessionId);

		if($chance == 0)
		{
			return;
		}

		$db = $this->db;
		//验证是否再开奖时段
		
		$cur_time = date('H:i');
		
		$valid_time_sql = <<<SQL
		select top 1 a.is_period, dp.id as period_id from Activity a
		left join Hui_DrawPeriod dp on dp.aid = a.id
		where ( 
				datediff(n, start_time, :cur_time) >= 0 and datediff(n, :cur_time, end_time) >= 0 or is_period = 0
			  ) and aid = :aid
SQL;
		$valid_time_bind = array(
			'cur_time' => $cur_time,
			'aid' => $aid
		);

		$valid_time_result = $db->query($valid_time_sql, $valid_time_bind);
		$valid_time_result->setFetchMode(Db::FETCH_ASSOC);
		$valid_time = $valid_time_result->fetch();
		
		$is_on_time = !empty($valid_time);

		$this->view->setVar('is_on_time', $is_on_time);

		if(!$is_on_time)
		{
			//不在抽奖时段,则取最近开始时间
			$nearest_time_sql = <<<SQL
			select min(start_time) from Hui_DrawPeriod where aid = :aid and start_time > :cur_time
SQL;
			$nearest_time_bind = array(
				'aid' => $aid,
				'cur_time' => $cur_time
			);

			$nearest_time_result = $db->query($nearest_time_sql, $nearest_time_bind);
			$nearest_time_assoc = $nearest_time_result->fetch();
			$nearest_time = $nearest_time_assoc['start_time'];
			$this->view->setVar('nearest_time', date('H:i', $nearest_time) );
		}
		else
		{
			//在抽奖时段则开始抽奖
			
			//减少抽奖机会
			$minus_chance_sql = <<<SQL
			update AwardChance set chance = chance - 1, updateDate = getdate() where userid = :user_id and aid = :aid
			and chance > 0
SQL;
			$minus_chance_bind = array(
				'user_id' => $user['user_id'],
				'aid' => $aid
			);
			$minus_chance_success = $db->execute($minus_chance_sql, $minus_chance_bind);

			$period_id = isset($valid_time['period_id']) ? $valid_time['period_id'] : null;
			$is_period = $valid_time['is_period'];

			mt_srand(time()); //以时间戳做随机种子
			$award_rand = mt_rand(1, 10000); //计算随机数

			//查询中奖几率大于随机数的奖品
			$get_award_sql = <<<SQL
			select a.id, a.rate, a.name, a.pic, a.dayLimit as day_limit from Award a
			left join Hui_DrawToAward d2a on d2a.award_id = a.id
			where a.rate >= :rate and ( :is_period = 0 or d2a.period_id = :period_id) and a.aid = :aid
SQL;
			$get_award_bind = array(
				'rate' => $award_rand,
				'is_period' => $is_period,
				'period_id' => $period_id,
				'aid' => $aid
			);
			
			$award_result = $db->query($get_award_sql, $get_award_bind);
			$award_result->setFetchMode(Db::FETCH_ASSOC);
			$award_list = $award_result->fetchAll();
			if(empty($award_list))
			{
				$this->view->setVar('is_bingo', false);
			}
			else
			{
				$this->view->setVar('is_bingo', true);

				$rand_index = array_rand($award_list);

				$award = $award_list[$rand_index];

				//计算单日中人奖数
				$bingo_num_sql = <<<SQL
				select count(1) from AwardGain where awid = :award_id and aid = :aid
				and datediff(d, winDate, getdate()) = 0
SQL;
				$bingo_num_bind = array(
					'award_id' => $award['id'],
					'aid' => $aid
				);
				$bingo_num_result = $db->query($bingo_num_sql, $bingo_num_bind);
				$bingo_num_result->setFetchMode(Db::FETCH_NUM);
				$bingo_num_row = $bingo_num_result->fetch();
				$bingo_num = $bingo_num_row[0];
				
				if($bingo_num >= $award['day_limit'])
				{
					//中奖人数达到奖品单日限额
					$this->view->setVar('is_bingo', false);
					return;
				}
				else
				{
					//未达到单日限额, 处理中奖
					
					//计算6位随机码
					$code_str = '';

					for($i = 0; $i < 6; $i++)
					{
						//利用ascii码表
						$rand_ord = rand(48, 122);

						//处理不是数字或字母的ord
						if($rand_ord > 57 and $rand_ord < 65)
						{
							$rand_ord = 51;
						}	
						elseif($rand_ord > 90 and $rand_ord < 97)
						{
							$rand_ord = 101;
						}
						elseif($rand_ord == 48 or $rand_ord == 111)
						{
							//把0和o换成q
							$rand_ord = 113;
						}
						elseif($rand_ord == 79 )
						{
							//把O换成Q
							$rand_ord = 81;
						}

						$code_str .= chr($rand_ord);
					}

					$bingo_sql = <<<SQL
					insert into AwardGain (aid, awid, userid, winDate, randomCode) values (:aid, :award_id, :user_id, getdate(), :code)
SQL;
					$bingo_bind = array(
						'aid' => $aid,
						'award_id' => $award['id'],
						'user_id' => $user['user_id'],
						'code' => $code_str
					);

					$bingo_success = $db->execute($bingo_sql, $bingo_bind);

					$this->view->setVar('award', $award);

				}

			}
		}



	}
}