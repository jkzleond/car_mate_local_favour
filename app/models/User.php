<?php
/**
 * Created by PhpStorm.
 * User: jkzleond
 * Date: 15-5-29
 * Time: 下午4:10
 */

use \Phalcon\Db;

class User extends ModelEx
{
    /**
     * 更具用户ID获取用户信息
     * @param $id
     * @return array
     */
    public static function getUserInfoById($id)
    {

        $sql = <<<SQL
        select u.id as id, u.userid as user_id, u.uname, u.nickname,
		u.sex,
		c.name as city, p.name as province, u.provinceId as province_id, u.cityid as city_id,
		u.phone as phone, u.HuiGold
		from IAM_USER u
		left join City c on u.cityid=c.id
		left join Province p on u.provinceid=p.id
		where u.USERID = :id
SQL;
        $bind['id'] = $id;

        return self::fetchOne($sql, $bind, null, Db::FETCH_ASSOC);
    }

    /**
     * 获取当前登录的用户信息
     * @return mixed
     */
    public static function getCurrentUser()
    {
        $di = \Phalcon\DI::getDefault();
        $session = $di->getShared('session');
        return $session->get('user');
    }

    /**
     * @param $user_id
     * @return string
     */
    public static function getUserAvatarById($user_id)
    {
        $sql = 'select PHOTO from IAM_USERPHOTO where USERID = :user_id';
        $bind = array('user_id' => $user_id);

        $result = self::fetchOne($sql, $bind, null, Db::FETCH_NUM);

        return $result[0];
    }

    /**
     * 添加惠金币
     * @param $user_id
     * @param $num
     * @return bool
     */
    public static function addHuiGold($user_id, $num)
    {
        $sql = <<<SQL
        update IAM_USER set HuiGold = HuiGold + :num where USERID = :user_id
SQL;
        $bind = array('user_id' => $user_id, 'num' => $num);

        return self::nativeExecute($sql, $bind);

    }


    /**
     * 保存用户信息(如果已存在则更新,不存在则添加)
     * @param array $criteria
     * @return bool|int
     */
    public static function saveUserInfo(array $criteria)
    {
        $crt = new Criteria($criteria);

        $user_id = $crt->user_id;

        if(!$user_id) return false; //必须含有user_id,否则不做任何操作并返回false

        $sql_exists = 'select count(id) from IAM_USER_INFO where userid = :user_id';
        $bind_exists = array('user_id' => $user_id);

        $result_exists = self::fetchOne($sql_exists, $bind_exists, null, Db::FETCH_NUM);
        $exists = !empty($result_exists[0]);

        if(!$exists)
        {
            $sql_add = 'insert into IAM_USER_INFO (userid, uname, phone, sex, address,
		idcardno, city, province, area, sinaWeibo, weixin, hphm, hpzl,
		people, qqNum) values (:user_id, :uname,
		:phone, :sex, :address, :id_no, :city,
		:province, :area, :sina_weibo, :weixin,
		:hphm, :hpzl, :people, :qq_num)';
            $bind_add = array(
                'user_id' => $crt->user_id,
                'uname' => $crt->uname,
                'phone' => $crt->phone,
                'sex' => $crt->sex,
                'address' => $crt->address,
                'id_no' => $crt->id_no,
                'city' => $crt->city,
                'province' => $crt->province,
                'area' => $crt->area,
                'sina_weibo' => $crt->sina_weibo,
                'weixin' => $crt->weixin,
                'hphm' => $crt->hphm,
                'hpzl' => $crt->hpzl,
                'people' => $crt->people,
                'qq_num' => $crt->qq_num
            );

            $success = self::nativeExecute($sql_add, $bind_add);
            if(!$success) return false;
            $connection = self::_getConnection();
            return $connection->lastInsertId();
        }
        else
        {
            $field_str = '';
            $bind_update = array('user_id' => $crt->user_id);

            if($crt->uname)
            {
                $field_str .= 'uname = :uname, ';
                $bind_update['uname'] = $crt->uname;
            }

            if($crt->phone)
            {
                $field_str .= 'phone = :phone, ';
                $bind_update['phone'] = $crt->phone;
            }

            if($crt->sex)
            {
                $field_str .= 'sex = :sex, ';
                $bind_update['sex'] = $crt->sex;
            }

            if($crt->address)
            {
                $field_str .= 'address = :address, ';
                $bind_update['address'] = $crt->address;
            }

            if($crt->id_no)
            {
                $field_str .= 'idcardno = :id_no, ';
                $bind_update['id_no'] = $crt->id_no;
            }

            if($crt->city)
            {
                $field_str .= 'city = :city, ';
                $bind_update['city'] = $crt->city;
            }

            if($crt->province)
            {
                $field_str .= 'province = :province, ';
                $bind_update['province'] = $crt->province;
            }

            if($crt->area)
            {
                $field_str .= 'area = :area, ';
                $bind_update['area'] = $crt->area;
            }

            if($crt->sina_weibo)
            {
                $field_str .= 'sinaWeibo = :sina_weibo, ';
                $bind_update['sina_weibo'] = $crt->sina_weibo;
            }

            if($crt->weixin)
            {
                $field_str .= 'weixin = :weixin, ';
                $bind_update['weixin'] = $crt->weixin;
            }

            if($crt->hphm)
            {
                $field_str .= 'hphm = :hphm, ';
                $bind_update['hphm'] = $crt->hphm;
            }

            if($crt->hpzl)
            {
                $field_str .= 'hpzl = :hpzl, ';
                $bind_update['hpzl'] = $crt->hpzl;
            }

            if($crt->people)
            {
                $field_str .= 'people = :people, ';
                $bind_update['people'] = $crt->people;
            }

            if($crt->qq_num)
            {
                $field_str .= 'qqNum = :qq_num, ';
                $bind_update['qq_num'] = $crt->qq_num;
            }

            if($field_str)
            {
                $field_str = rtrim($field_str, ', ');
            }

            $sql_update = "update IAM_USER_INFO set $field_str where userid = :user_id";

            return self::nativeExecute($sql_update, $bind_update);
        }
    }

}