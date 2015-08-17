<?php
class Adv extends ModelEx
{
	/**
	 * 获取首页广告
	 * @return object
	 */
	public static function getIndexAdv()
	{
		$sql = 'select top 1 pic as pic_data from weladv where isState = 1 order by id desc';
		return self::fetchOne($sql);
	}
}