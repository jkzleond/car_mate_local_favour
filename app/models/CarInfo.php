<?php
/**
 * Created by PhpStorm.
 * User: jkzleond
 * Date: 15-6-24
 * Time: 下午11:46
 */

use \Phalcon\Db;

class CarInfo extends ModelEx
{
    /**
     * 获取指定用户名与号牌号码的车辆信息
     * @param $user_id
     * @param $hphm
     * @return object
     */
    public static function getCarInfoByUserIdAndHphm($user_id, $hphm)
    {
        $sql = <<<SQL
        select id, userId, hphm from CarInfo where userId = :user_id and hphm = :hphm
SQL;
        $bind = array(
            'user_id' => $user_id,
            'hphm' => $hphm
        );

        return self::fetchOne($sql, $bind, null, Db::FETCH_ASSOC);
    }

    /**
     * 添加车辆信息
     * @param array $car_info
     * @return bool|int
     */
    public static function addCarInfo(array $car_info)
    {
        $crt = new Criteria($car_info);
        $sql = <<<SQL
        insert into CarInfo (
        userId, hpzl, hphm, fdjh, frameNumber, province_id, city_id, noHphm, autoname
        ) values (
        :user_id, :hpzl, :hphm, :fdjh, :frame_number, :province_id, :city_id, :no_hphm, :auto_name
        )
SQL;
        $bind = array(
            'user_id' => $crt->user_id,
            'hpzl' => $crt->hpzl,
            'hphm' => $crt->hphm,
            'fdjh' => $crt->fdjh,
            'frame_number' => $crt->frame_number,
            'province_id' => $crt->province_id,
            'city_id' => $crt->city_id,
            'no_hphm' => empty($crt->no_hphm) ? 0 : 1,
            'auto_name' => $crt->auto_name
        );

        $success = self::nativeExecute($sql, $bind);

        if(!$success) return false;

        $connection = self::_getConnection();

        return $connection->lastInsertId();
    }
}