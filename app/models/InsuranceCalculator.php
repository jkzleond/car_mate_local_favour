<?php
/**
 * Created by PhpStorm.
 * User: jkzleond
 * Date: 15-6-23
 * Time: 下午10:03
 */

class InsuranceCalculator
{
    /**
     * 计算家庭用车保险结果
     * @param $insurance_param
     * @return array
     */
    public static function calFamilyInsuranceResult( Criteria $insurance_param)
    {
        $result = array();

        $round_year = $insurance_param->insurance_year - $insurance_param->first_year;
        $last_month = $insurance_param->insurance_month - $insurance_param->first_month;
        $round_month = $round_year * 12 + $last_month - 1;
        $coefficient = $insurance_param->service_year;

        $result['round_year'] = $round_year;
        $result['last_month'] = $last_month;
        $result['round_month'] = $round_month;
        $result['coefficient'] = $coefficient;

        //初始化标准保费
        $standard_damage = 0.0;
        $standard_third = 0.0;
        $standard_driver = 0.0;
        $standard_passenger = 0.0;
        $standard_robbery = 0.0;
        $standard_glass = 0.0;
        $standard_scratch = 0.0;
        $standard_self_ignition = 0.0;
        $standard_optional_deductible = 0.0;
        $standard_not_deductible = 0.0;

        //初始化折扣后保费
        $after_discount_damage = 0.0;
        $after_discount_third = 0.0;
        $after_discount_driver = 0.0;
        $after_discount_passenger = 0.0;
        $after_discount_robbery = 0.0;
        $after_discount_glass = 0.0;
        $after_discount_scratch = 0.0;
        $after_discount_self_ignition = 0.0;
        $after_discount_optional_deductible = 0.0;
        $after_discount_not_deductible = 0.0;

        //初始化单项不计免赔
        $single_not_deductible_damage = 0.0;
        $single_not_deductible_third = 0.0;
        $single_not_deductible_driver = 0.0;
        $single_not_deductible_passenger = 0.0;
        $single_not_deductible_robbery = 0.0;
        $single_not_deductible_glass = 0.0;
        $single_not_deductible_scratch = 0.0;
        $single_not_deductible_self_ignition = 0.0;



        //交强险
        $standard_compulsory = ($insurance_param->compulsory_state_id != 0) ? 950 : 0;
        $after_discount_compulsory = self::_getAfterDiscountCompulsoryInsurance($insurance_param->compulsory_state_id, $standard_compulsory);
        $single_not_deductible_compulsory = 0.0;
        $result['standard_compulsory_insurance'] = $standard_compulsory;
        $result['after_discount_compulsory_insurance'] = $after_discount_compulsory;
        $result['single_not_deductible_compulsory_insurance'] = $single_not_deductible_compulsory;

        //车损险
        if($insurance_param->damage)
        {
            $standard_damage = self::_getStandardDamageInsurance($coefficient, $insurance_param->car_price);
            //$after_discount_damage = self::_getAfterDiscountDamageInsurance($standard_damage);
            $single_not_deductible_damage = self::_getSingleNotDeductibleDamageInsurance($after_discount_damage);
            $result['standard_damage_insurance'] = $standard_damage;
            //$result['after_discount_damage_insurance'] = $after_discount_damage;
            $result['single_not_deductible_damage_insurance'] = $single_not_deductible_damage;
        }

        //第三者
        if($insurance_param->third)
        {
            $standard_third = self::_getStandardThirdInsurance($insurance_param->third);
            //$after_discount_third = self::_getAfterDiscountThirdInsurance($standard_third);
            $single_not_deductible_third = self::_getSingleNotDeductibleThirdInsurance($after_discount_third);
            $result['standard_third'] = $standard_third;
            //$result['after_discount_third'] = $after_discount_third;
            $result['single_not_deductible_third'] = $single_not_deductible_third;
        }

        //司机
        if($insurance_param->driver)
        {
            $standard_driver = self::_getStandardDriverInsurance($insurance_param->driver);
            //$after_discount_driver = self::_getAfterDiscountDriverInsurance($standard_driver);
            $single_not_deductible_driver = self::_getSingleNotDeductibleDriverInsurance($after_discount_driver);
            $result['standard_driver'] = $standard_driver;
            //$result['after_discount_driver'] = $after_discount_driver;
            $result['single_not_deductible_driver'] = $single_not_deductible_driver;
        }

        //乘客
        if($insurance_param->passenger)
        {
            $standard_passenger = self::_getStandardPassengerInsurance($insurance_param->passenger_number, $insurance_param->passenger);
            //$after_discount_passenger = self::_getAfterDiscountPassengerInsurance($standard_passenger);
            $single_not_deductible_passenger = self::_getSingleNotDeductiblePassengerInsurance($after_discount_passenger);
            $result['standard_passenger'] = $standard_passenger;
            //$result['after_discount_passenger'] = $after_discount_passenger;
            $result['single_not_deductible_passenger'] = $single_not_deductible_passenger;
        }

        //盗抢
        if($insurance_param->robbery)
        {
            $standard_robbery = self::_getStandardRobberyInsurance($insurance_param->car_price);
            //$after_discount_robbery = self::_getAfterDiscountRobberyInsurance($standard_robbery);
            $single_not_deductible_robbery = self::_getSingleNotDeductibleRobberyInsurance($after_discount_robbery);
            $result['standard_robbery'] = $standard_robbery;
            //$result['after_discount_robbery'] = $after_discount_robbery;
            $result['single_not_deductible_robbery'] = $single_not_deductible_robbery;
        }

        //玻璃
        if($insurance_param->glass_id)
        {
            $standard_glass = self::_getStandardGlassInsurance($insurance_param->glass_id, $insurance_param->car_price);
            //$after_discount_glass = self::_getAfterDiscountGlassInsurance($standard_glass);
            $single_not_deductible_glass = self::_getSingleNotDeductibleGlassInsurance($after_discount_glass);
            $result['standard_glass'] = $standard_glass;
            //$result['after_discount_glass'] = $after_discount_glass;
            $result['single_not_deductible_glass'] = $single_not_deductible_glass;
        }

        //划痕
        if($insurance_param->scratch)
        {
            $standard_scratch = self::_getStandardScratchInsurance($insurance_param->scratch, $insurance_param->car_price, $coefficient);
            //$after_discount_scratch = self::_getAfterDiscountScratchInsurance($standard_scratch);
            $single_not_deductible_scratch = self::_getSingleNotDeductibleScratchInsurance($after_discount_scratch);
            $result['standard_scratch'] = $standard_scratch;
            //$result['after_discount_scratch'] = $after_discount_scratch;
            $result['single_not_deductible_scratch'] = $single_not_deductible_scratch;
        }

        //自然
        if($insurance_param->self_ignition)
        {
            $standard_self_ignition = self::_getStandardSelfIgnitionInsurance($insurance_param->car_price, $round_year, $round_month);
            //$after_discount_self_ignition = self::_getAfterDiscountSelfIgnitionInsurance($standard_self_ignition);
            $single_not_deductible_self_ignition = self::_getSingleNotDeductibleSelfIgnitionInsurance($after_discount_self_ignition);
            $result['standard_self_ignition'] = $standard_self_ignition;
            //$result['after_discount_self_ignition'] = $after_discount_self_ignition;
            $result['single_not_deductible_self_ignition'] = $single_not_deductible_self_ignition;
        }

        //可选免赔额
        if($insurance_param->optional_deductible)
        {
            $standard_optional_deductible = self::_getStandardOptionalDeductibleInsurance($insurance_param->car_price, $standard_damage, $insurance_param->optional_deductible);
            //$after_discount_optional_deductible = self::_getAfterDiscountOptionalDeductibleInsurance($standard_optional_deductible);
            $result['standard_optional_deductible'] = $standard_optional_deductible;
            //$result['after_discount_optional_deductible'] = $after_discount_optional_deductible;
        }

        //不计免赔
        if($insurance_param->not_deductible)
        {
            $standard_not_deductible = self::_getStandardNotDeductibleInsurance($standard_damage, $standard_third, $standard_driver, $standard_passenger, $standard_scratch, $standard_robbery);
            //$after_discount_not_deductible = self::_getAfterDiscountNotDeductibleInsurance($standard_not_deductible);
            $result['standard_not_deductible'] = $standard_not_deductible;
            //$result['after_discount_not_deductible'] = $after_discount_not_deductible;
        }

        $total_standard = round($standard_compulsory + $standard_damage + $standard_driver + $standard_passenger + $standard_robbery + $standard_glass + $standard_scratch + ($standard_third < 0 ? 0 : $standard_third) + $standard_self_ignition + $standard_optional_deductible + $standard_not_deductible, 2);

        //$total_after_discount = round($after_discount_compulsory + $after_discount_damage + $after_discount_driver + $after_discount_passenger + $after_discount_robbery + $after_discount_glass + $after_discount_scratch + $after_discount_third + $after_discount_self_ignition + $after_discount_optional_deductible + $after_discount_not_deductible, 2);
        $total_single_not_deductible = round($single_not_deductible_compulsory + $single_not_deductible_damage + $single_not_deductible_driver + $single_not_deductible_passenger + $single_not_deductible_robbery + $single_not_deductible_glass + $single_not_deductible_scratch + $single_not_deductible_third + $single_not_deductible_self_ignition, 2);
        //$total_business = $total_after_discount - $after_discount_compulsory;

        $result['total_standard'] = $total_standard;
        //$result['total_after_discount'] = $total_after_discount;
        $result['total_single_not_deductible'] = $total_single_not_deductible;
        //$result['business'] = $total_business;

        //计算礼包

        //$gift = floor($after_discount_compulsory * 0.3 + $after_discount_third * 0.3 + $after_discount_damage * 0.24 + $after_discount_driver * 0.24 + $after_discount_passenger + $after_discount_robbery * 0.24 + $after_discount_glass * 0.24 + $after_discount_scratch * 0.24 + $after_discount_self_ignition * 0.24);

        //$result['gift_money'] = $gift;

        return $result;

    }

    /**
     * 计算折扣后交强险
     * @param $compulsory_state_id
     * @param $standard_compulsory
     * @return float
     */
    protected static function _getAfterDiscountCompulsoryInsurance($compulsory_state_id, $standard_compulsory)
    {
        $result = 0.0;
        switch($compulsory_state_id)
        {
            case 1:
                $result = round($standard_compulsory * 0.7, 2);
                break;
            case 2:
                $result = round($standard_compulsory * 0.8, 2);
                break;
            case 3:
                $result = round($standard_compulsory * 0.9, 2);
                break;
            case 4:
                $result = $standard_compulsory;
                break;
            case 5:
                $result = round($standard_compulsory * 1.1, 2);
                break;
            case 6:
                $result = round($standard_compulsory * 1.3, 2);
                break;
            default:
                break;
        }

        return $result;
    }

    /**
     * 计算标准车损险
     * @param $coefficient
     * @param $car_price
     * @return float
     */
    protected static function _getStandardDamageInsurance($coefficient, $car_price)
    {
        $result = 0.0;

        if($coefficient == 1)
        {
            $result = round($car_price * 1.47 / 100.0 + 619.0, 2);
        }
        else if($coefficient == 2)
        {
            $result = round($car_price * 1.40 / 100.0 + 590.0, 2);
        }
        else if($coefficient == 3 || $coefficient == 4 || $coefficient == 5)
        {
            $result = round($car_price * 1.39 / 100.0 + 584.0, 2);
        }
        else if($coefficient == 6)
        {
            $result = round($car_price * 1.43 / 100.0 + 602.0, 2);
        }

        return $result;
    }

    /**
     * 计算折扣后车损险
     * @param $standard_damage
     * @return float
     */
    protected static function _getAfterDiscountDamageInsurance($standard_damage)
    {
        return round($standard_damage * 0.7, 2);
    }

    /**
     * 计算单项不计免赔车损险
     * @param $after_discount_damage
     * @return float
     */
    protected static function _getSingleNotDeductibleDamageInsurance($after_discount_damage)
    {
        return round($after_discount_damage * 0.15, 2);
    }

    /**
     * 计算标准第三者保费
     * @param $third 第三者保额
     * @return int
     */
    protected static function _getStandardThirdInsurance($third)
    {
        $result = 0;

        if($third == 50000)
        {
            $result = 698;
        }
        else if($third == 100000)
        {
            $result = 1007;
        }
        else if($third == 150000)
        {
            $result = 1148;
        }
        else if($third == 200000)
        {
            $result = 1248;
        }
        else if($third == 300000)
        {
            $result = 1408;
        }
        else if($third == 500000)
        {
            $result = 1690;
        }
        else if($third == 1000000)
        {
            $result = 2201;
        }
        else if($third < 0) //小于0表示,1000000以上, 没有计算标准, 需人工计算
        {
            $result = -1;
        }

        return $result;
    }

    /**
     * 计算折扣后第三者保费
     * @param $standard_third
     * @return float
     */
    protected static function _getAfterDiscountThirdInsurance($standard_third)
    {
        return round($standard_third * 0.7, 2);
    }

    /**
     * 计算单项不计免赔第三者保费
     * @param $after_discount_third
     * @return float
     */
    protected static function _getSingleNotDeductibleThirdInsurance($after_discount_third)
    {
        return round($after_discount_third * 0.15, 2);
    }

    /**
     * 计算 司机-标准保费
     * @param $driver
     * @return float
     */
    protected static function _getStandardDriverInsurance($driver)
    {
        return round($driver * 0.41 / 100.0, 2);
    }

    /**
     * 计算 司机-折扣后保费
     * @param $standard_driver
     * @return float
     */
    protected static function _getAfterDiscountDriverInsurance($standard_driver)
    {
        return round($standard_driver * 0.7, 2);
    }

    /**
     * 计算 司机-单项不计免赔保费
     * @param $after_discount_driver
     * @return float
     */
    protected static function _getSingleNotDeductibleDriverInsurance($after_discount_driver)
    {
        return round($after_discount_driver * 0.15, 2);
    }

    /**
     * 计算 乘客-标准保费
     * @param $passenger_number
     * @param $passenger
     * @return float
     */
    protected static function _getStandardPassengerInsurance($passenger_number, $passenger)
    {
        return round($passenger_number * $passenger * 0.26 / 100.0, 2);
    }

    /**
     * 计算 乘客-折扣后保费
     * @param $standard_passenger
     * @return float
     */
    protected static function _getAfterDiscountPassengerInsurance($standard_passenger)
    {
        return round($standard_passenger * 0.7, 2);
    }

    /**
     * 计算 乘客-单项不计免赔保费
     * @param $after_discount_passenger
     * @return float
     */
    protected static function _getSingleNotDeductiblePassengerInsurance($after_discount_passenger)
    {
        return round($after_discount_passenger * 0.15, 2);
    }

    /**
     * 计算 盗抢-标准保费
     * @param $car_price
     * @return float
     */
    protected static function _getStandardRobberyInsurance($car_price)
    {
        return round($car_price * 0.42 / 100.0 + 120.0, 2);
    }

    /**
     * 计算 盗抢-折扣后保费
     * @param $standard_robbery
     * @return float
     */
    protected static function _getAfterDiscountRobberyInsurance($standard_robbery)
    {
        return round($standard_robbery * 0.7, 2);
    }

    /**
     * 计算 盗抢-单项不计免赔
     * @param $after_discount_robbery
     * @return float
     */
    protected static function _getSingleNotDeductibleRobberyInsurance($after_discount_robbery)
    {
        return round($after_discount_robbery * 0.2, 2);
    }

    /**
     * 计算 玻璃-标准保费
     * @param $glass_id
     * @param $car_price
     * @return float
     */
    protected static function _getStandardGlassInsurance($glass_id, $car_price)
    {
        $result = 0.0;

        if($glass_id == 1)
        {
            $result = $car_price * 0.18 / 100.0;
        }
        else if($glass_id == 2)
        {
            $result = $car_price * 0.3 / 100.0;
        }

        return round($result, 2);
    }

    /**
     * 计算 玻璃-折扣后保费
     * @param $standard_glass
     * @return float
     */
    protected static function _getAfterDiscountGlassInsurance($standard_glass)
    {
        return round($standard_glass * 0.7, 2);
    }

    /**
     * 计算 玻璃-单项不计免赔
     * @param $after_discount_glass
     * @return float
     */
    protected static function _getSingleNotDeductibleGlassInsurance($after_discount_glass)
    {
        return 0.0;
    }

    /**
     * 计算 划痕-标准保费
     * @param $scratch
     * @param $car_price
     * @param $coefficient
     * @return int
     */
    protected static function _getStandardScratchInsurance($scratch, $car_price, $coefficient)
    {
        if($coefficient == 1 || $coefficient == 2)
        {
            if($scratch == 2000)
            {
                if($car_price < 300000)
                {
                    return 400;
                }
                else if($car_price >= 300000 and $car_price < 500000)
                {
                    return 585;
                }
                else if($car_price >= 500000)
                {
                    return 850;
                }
            }
            else if($scratch == 5000)
            {
                if($car_price < 300000)
                {
                    return 570;
                }
                else if($car_price >= 300000 and $car_price < 500000)
                {
                    return 900;
                }
                else if($car_price >= 500000)
                {
                    return 1100;
                }
            }
            else if($scratch == 10000)
            {
                if($car_price < 300000)
                {
                    return 760;
                }
                else if($car_price >= 300000 and $car_price < 500000)
                {
                    return 1170;
                }
                else if($car_price >= 500000)
                {
                    return 1500;
                }
            }
            else if($scratch == 20000)
            {
                if($car_price < 300000)
                {
                    return 1140;
                }
                else if($car_price >= 300000 and $car_price < 500000)
                {
                    return 1780;
                }
                else if($car_price >= 500000)
                {
                    return 2250;
                }
            }
        }
        else if($coefficient > 2)
        {
            if($scratch == 2000)
            {
                if($car_price < 300000)
                {
                    return 610;
                }
                else if($car_price >= 300000 and $car_price < 500000)
                {
                    return 900;
                }
                else if($car_price >= 500000)
                {
                    return 1100;
                }
            }
            else if($scratch == 5000)
            {
                if($car_price < 300000)
                {
                    return 850;
                }
                else if($car_price >= 300000 and $car_price < 500000)
                {
                    return 1350;
                }
                else if($car_price >= 500000)
                {
                    return 1500;
                }
            }
            else if($scratch == 10000)
            {
                if($car_price < 300000)
                {
                    return 1300;
                }
                else if($car_price >= 300000 and $car_price < 500000)
                {
                    return 1800;
                }
                else if($car_price >= 500000)
                {
                    return 2000;
                }
            }
            else if($scratch == 20000)
            {
                if($car_price < 300000)
                {
                    return 1900;
                }
                else if($car_price >= 300000 and $car_price < 500000)
                {
                    return 2600;
                }
                else if($car_price >= 500000)
                {
                    return 3000;
                }
            }
        }
    }

    /**
     * 计算 划痕-折扣后保费
     * @param $standard_scratch
     * @return float
     */
    protected static function _getAfterDiscountScratchInsurance($standard_scratch)
    {
        return round($standard_scratch * 0.7, 2);
    }

    /**
     * 计算 划痕-单项不计免赔保费
     * @param $after_discount_scratch
     * @return float
     */
    protected static function _getSingleNotDeductibleScratchInsurance($after_discount_scratch)
    {
        return round($after_discount_scratch * 0.15, 2);
    }

    /**
     * 计算 自然-标准保费
     * @param $car_price
     * @param $round_year
     * @param $round_month
     * @return float
     */
    protected static function _getStandardSelfIgnitionInsurance($car_price, $round_year, $round_month)
    {
        if($round_year < 1)
        {
            if($round_month == -1) return round($car_price * 0.15 / 100.0, 2);
            return round( ($car_price - $car_price * $round_month * 0.6 / 100.0) * 0.15 / 100.0, 2);
        }
        else if($round_year < 2)
        {
            if($round_month == -1) return round($car_price * 0.18 / 100.0, 2);
            return round( ($car_price - $car_price * $round_month * 0.6 / 100.0) * 0.18 / 100.0, 2);
        }
        else if($round_year < 6)
        {
            if($round_month == -1) return round($car_price * 0.2 / 100.0, 2);
            return round( ($car_price - $car_price * $round_month * 0.6 / 100.0) * 0.2 / 100.0, 2);
        }

        if($round_month == -1) return round($car_price * 0.23 / 100.0, 2);
        return round( ($car_price - $car_price * $round_month * 0.6 / 100.0) * 0.23 / 100.0, 2 );

    }

    /**
     * 计算 自然-折扣后保费
     * @param $standard_self_ignition
     * @return float
     */
    protected static function _getAfterDiscountSelfIgnitionInsurance($standard_self_ignition)
    {
        return round($standard_self_ignition * 0.7, 2);
    }

    /**
     * 计算 自然-单项不计免赔
     * @param $after_discount_self_ignition
     * @return float
     */
    protected static function _getSingleNotDeductibleSelfIgnitionInsurance($after_discount_self_ignition)
    {
        return 0.0;
    }

    /**
     * 计算 可选免赔-标准保费
     * @param $car_price
     * @param $standard_damage
     * @param $optional_deductible
     * @return float
     */
    protected static function _getStandardOptionalDeductibleInsurance($car_price, $standard_damage, $optional_deductible)
    {
        if($car_price < 50000)
        {
            if($optional_deductible == 300.0)
            {
                return round(-1.0 * $standard_damage * 0.11, 2);
            }
            else if($optional_deductible == 500.0)
            {
                return round(-1.0 * $standard_damage * 0.21, 2);
            }
            else if($optional_deductible == 1000.0)
            {
                return round(-1.0 * $standard_damage * 0.32, 2);
            }
        }
        else if($car_price < 100000)
        {
            if($optional_deductible == 300.0)
            {
                return round(-1.0 * $standard_damage * 0.08, 2);
            }
            else if($optional_deductible == 500.0)
            {
                return round(-1.0 * $standard_damage * 0.15, 2);
            }
            else if($optional_deductible == 1000.0)
            {
                return round(-1.0 * $standard_damage * 0.26, 2);
            }
        }
        else if($car_price < 200000)
        {
            if($optional_deductible == 300.0)
            {
                return round(-1.0 * $standard_damage * 0.06, 2);
            }
            else if($optional_deductible == 500.0)
            {
                return round(-1.0 * $standard_damage * 0.11, 2);
            }
            else if($optional_deductible == 1000.0)
            {
                return round(-1.0 * $standard_damage * 0.3, 2);
            }
        }
        else if($car_price < 300000)
        {
            if($optional_deductible == 300.0)
            {
                return round(-1.0 * $standard_damage * 0.04, 2);
            }
            else if($optional_deductible == 500.0)
            {
                return round(-1.0 * $standard_damage * 0.07, 2);
            }
            else if($optional_deductible == 1000.0)
            {
                return round(-1.0 * $standard_damage * 0.12, 2);
            }
        }
        else if($car_price < 500000)
        {
            if($optional_deductible == 300.0)
            {
                return round(-1.0 * $standard_damage * 0.03, 2);
            }
            else if($optional_deductible == 500.0)
            {
                return round(-1.0 * $standard_damage * 0.05, 2);
            }
            else if($optional_deductible == 1000.0)
            {
                return round(-1.0 * $standard_damage * 0.1, 2);
            }
        }
        else
        {
            if($optional_deductible == 300.0)
            {
                return round(-1.0 * $standard_damage * 0.02, 2);
            }
            else if($optional_deductible == 500.0)
            {
                return round(-1.0 * $standard_damage * 0.04, 2);
            }
            else if($optional_deductible == 1000.0)
            {
                return round(-1.0 * $standard_damage * 0.07, 2);
            }
        }

        return 0.0;
    }

    /**
     * 计算 可选免赔-折扣后保费
     * @param $standard_optional_deductible
     * @return float
     */
    protected static function _getAfterDiscountOptionalDeductibleInsurance($standard_optional_deductible)
    {
        return round($standard_optional_deductible * 0.7, 2);
    }

    /**
     * 计算 不计免赔-标准保费
     * @param $standard_damage
     * @param $standard_third
     * @param $standard_driver
     * @param $standard_passenger
     * @param $standard_scratch
     * @param $standard_robbery
     * @return float
     */
    protected static function _getStandardNotDeductibleInsurance($standard_damage, $standard_third, $standard_driver, $standard_passenger, $standard_scratch, $standard_robbery)
    {
        return round( ($standard_damage + $standard_third + $standard_driver + $standard_passenger + $standard_scratch) * 0.15 + $standard_robbery * 0.2, 2);
    }

    /**
     * 计算 不计免赔-折扣后保费
     * @param $standard_not_deductible
     * @return float
     */
    protected static function _getAfterDiscountNotDeductibleInsurance($standard_not_deductible)
    {
        return round($standard_not_deductible * 0.7, 2);
    }

}