<?php
/**
 * Created by PhpStorm.
 * User: jkzleond
 * Date: 15-7-5
 * Time: 下午4:09
 */

class Order extends ModelEx
{
    /**
     * 生成订单
     * @param $order_type
     * @param array $criteria
     * @return mixed
     */
    public static function addOrder($order_type, array $criteria=null)
    {
        $crt = new Criteria($criteria);
        if($order_type == 'activity')
        {
            return self::addActivityOrder($crt->au_id, $crt->user_id, $crt->pay_items);
        }
        elseif($order_type == 'insurance')
        {
            return self::addInsuranceOrder($crt->info_id, $crt->user_id, $crt->total_fee);
        }
    }

    /**
     * 添加活动订单
     * @param $au_id
     * @param $user_id
     * @param array $pay_items
     * @return bool|array 成功返回 array($order_id, $order_no, $total_fee)
     *                    失败返回 false
     */
    public static function addActivityOrder($au_id, $user_id, array $pay_items)
    {

        $connection = self::_getConnection();
        $connection->begin();

        $goods_number_map = array();
        $goods_price_map = array();

        foreach($pay_items as $pay_item)
        {
            $goods_number_map[$pay_item['id']] = $pay_item['number'];
        }

        $goods = Goods::getGoodsByIds(array_keys($goods_number_map));

        $total_fee = 0;

        foreach($goods as $one_goods)
        {
            $goods_price_map[$one_goods['id']] = $one_goods['price'];
            $total_fee += $one_goods['price'] * $goods_number_map[$one_goods['id']];
        }

        $add_order_sql = "insert into PayList (orderNo, orderName, money, userId, orderType, relId) values (:order_no, '活动收费', :total_fee, :user_id, 'activity', :au_id)";
        $add_order_bind = array(
            'total_fee' => $total_fee,
            'user_id' => $user_id,
            'au_id' => $au_id
        );

        do
        {
            $order_no = self::_genOrderNo();
            $add_order_bind['order_no'] = $order_no;
            $add_order_success = $connection->execute($add_order_sql, $add_order_bind);
            $err_info = $connection->getInternalHandler()->errorInfo();
        }while($err_info[1] == '2627');

        if(!$add_order_success)
        {
            $connection->rollback();
            return false;
        }

        $new_order_id = $connection->lastInsertId();

        $order_detail_values_str = '';

        foreach($goods_price_map as $goods_id => $goods_price)
        {
            $goods_number = $goods_number_map[$goods_id];
            $order_detail_values_str .= "($goods_id, $new_order_id, $goods_number, $goods_price), ";
        }

        $order_detail_values_str = rtrim($order_detail_values_str, ', ');

        $add_order_detail_sql = "insert into OrderToGoods (goods_id, order_id, number, price) values $order_detail_values_str";

        $add_order_detail_success = $connection->execute($add_order_detail_sql);

        if(!$add_order_detail_success)
        {
            $connection->rollback();
            return false;
        }

        $success = $connection->commit();

        if(!$success) return false;

        return array($new_order_id, $order_no, $total_fee);
    }

    /**
     * 添加保险订单
     * @param $info_id
     * @param $user_id
     * @param $total_fee
     * @return array|bool
     */
    public static function addInsuranceOrder($info_id, $user_id, $total_fee)
    {
        $add_order_sql = "insert into PayList (orderNo, orderName, money, userId, orderType, relId) values (:order_no, '保险保费', :total_fee, :user_id, 'insurance', :info_id)";

        $add_order_bind = array(
            'total_fee' => $total_fee,
            'user_id' => $user_id,
            'info_id' => $info_id
        );

        $connection = self::_getConnection();

        //先删除同一个info_id的已存在订单
        $del_order_sql = "delete from PayList where orderType = 'insurance' and relId = :info_id";
        $del_order_bind = array(
            'info_id' => $info_id
        );

        $connection->execute($del_order_sql, $del_order_bind);

        do
        {
            $order_no = self::_genOrderNo();
            $add_order_bind['order_no'] = $order_no;
            $add_order_success = $connection->execute($add_order_sql, $add_order_bind);
            $err_info = $connection->getInternalHandler()->errorInfo();
        }while($err_info[1] == '2627');

        if(!$add_order_success) return false;

        $new_order_id = $connection->lastInsertId();

        return array($new_order_id, $order_no, $total_fee);
    }

    /**
     * @return string
     */
    protected static function _genOrderNo()
    {
        //设置随机种子
        mt_srand(microtime(true) * 1000);
        return date('YmdHis').str_pad( mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
    }
}