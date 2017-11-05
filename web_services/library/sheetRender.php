<?php
function productsSheetRender($data, $limitData)
{
	$reformat_rows = array();

	$i = 1;
	foreach($data as $row)
	{
		$reformat_rows[] = array(
			'id'=>$row->{'gsx$id'}->{'$t'},
			'title'=>$row->{'gsx$nametitle'}->{'$t'},
			'slug'=>$row->{'gsx$nameslug'}->{'$t'},
			'stock'=>intval($row->{'gsx$stock'}->{'$t'}),
			'category'=>$row->{'gsx$category'}->{'$t'},
			'category_name'=>$row->{'gsx$categoryname'}->{'$t'},
			'push'=>$row->{'gsx$pushperiod'}->{'$t'},
			'seller'=>explodeDualSpliterData($row->{'gsx$seller'}->{'$t'}, array('|',';'))['name'],
			'ammount_price'=>(intval(str_replace('.','',$row->{'gsx$msrpprice'}->{'$t'})) == intval(str_replace('.','',$row->{'gsx$saleprice'}->{'$t'})) ? intval(str_replace('.','',$row->{'gsx$saleprice'}->{'$t'})) : intval(str_replace('.','',$row->{'gsx$saleprice'}->{'$t'})) > 0 ? intval(str_replace('.','',$row->{'gsx$saleprice'}->{'$t'})) : intval(str_replace('.','',$row->{'gsx$msrpprice'}->{'$t'}))),
			'discount'=>discount(str_replace('.','',$row->{'gsx$msrpprice'}->{'$t'}), str_replace('.','',$row->{'gsx$saleprice'}->{'$t'})),
			'description'=>array(
				'long'=>$row->{'gsx$description'}->{'$t'},
				'short'=>shortingText($row->{'gsx$description'}->{'$t'}, 50)
			),
			'attribute'=>BreakSymbolArrayDimension($row->{'gsx$attribute'}->{'$t'},array(',',':')),
			'price'=>array(
				'currency'=>$row->{'gsx$currency'}->{'$t'},
				'msrpprice'=>array(
						$row->{'gsx$currency'}->{'$t'}.$row->{'gsx$msrpprice'}->{'$t'}, 
						intval(str_replace('.','',$row->{'gsx$msrpprice'}->{'$t'}))
				),
				'saleprice'=>array(
						$row->{'gsx$currency'}->{'$t'}.$row->{'gsx$saleprice'}->{'$t'}, 
						intval(str_replace('.','',$row->{'gsx$saleprice'}->{'$t'}))
				)
			),
			'weight'=>array(
				'gram'=>intval($row->{'gsx$weightgram'}->{'$t'}),
				'kilogram'=>($row->{'gsx$weightgram'}->{'$t'}/100)
			),
			'thumbnail'=>$row->{'gsx$thumbnail'}->{'$t'},
			'seller_card'=>explodeDualSpliterData($row->{'gsx$seller'}->{'$t'}, array('|',';'))
		);
		if(!is_null($limitData) && $i++ == $limitData) break;
	}

	return $reformat_rows;
}

function searchSheetRender($data, $limitData)
{
	$reformat_rows = array();

	$i = 1;
	foreach($data as $key=>$row)
	{
		$reformat_rows[] = array(
			'id'=>$key,
			'keywords'=>$row->{'gsx$keywords'}->{'$t'},
			'slug'=>$row->{'gsx$slug'}->{'$t'},
			'category'=>$row->{'gsx$category'}->{'$t'}
		);
		if(!is_null($limitData) && $i++ == $limitData) break;
	}

	return $reformat_rows;
}

function categorySheetRender($data, $limitData)
{
	$reformat_rows = array();

	$i = 1;
	foreach($data as $key=>$row)
	{
		$reformat_rows[] = array(
			'id'=>$row->{'gsx$id'}->{'$t'},
			'title'=>$row->{'gsx$name'}->{'$t'},
			'routing'=>$row->{'gsx$slug'}->{'$t'},
			'icon'=>$row->{'gsx$icon'}->{'$t'},
			'parent'=>$row->{'gsx$parent'}->{'$t'},
			'status'=>$row->{'gsx$status'}->{'$t'}
		);
		if(!is_null($limitData) && $i++ == $limitData) break;
	}

	return $reformat_rows;
}

function locationSheetRender($data, $limitData)
{
	$reformat_rows = array();

	$i = 1;
	foreach($data as $key=>$row)
	{
		$reformat_rows[] = array(
			'id'=>$row->{'gsx$id'}->{'$t'},
			'name'=>$row->{'gsx$name'}->{'$t'},
			'floor'=>$row->{'gsx$floor'}->{'$t'},
			'block'=>$row->{'gsx$block'}->{'$t'},
			'number'=>$row->{'gsx$number'}->{'$t'}
		);
		if(!is_null($limitData) && $i++ == $limitData) break;
	}

	return $reformat_rows;
}

function sellerSheetRender($data, $limitData)
{
	$reformat_rows = array();

	$i = 1;
	foreach($data as $key=>$row)
	{
		$reformat_rows[] = array(
			'id'=>$row->{'gsx$id'}->{'$t'},
			'name'=>$row->{'gsx$name'}->{'$t'},
			'username'=>$row->{'gsx$username'}->{'$t'},
			'avatar'=>$row->{'gsx$avatar'}->{'$t'},
			'status'=>$row->{'gsx$status'}->{'$t'},
			'location'=>$row->{'gsx$location'}->{'$t'}
		);
		if(!is_null($limitData) && $i++ == $limitData) break;
	}

	return $reformat_rows;
}

function pushSheetRender($data, $limitData)
{
	$reformat_rows = array();

	$i = 1;
	foreach($data as $key=>$row)
	{
		$reformat_rows[] = array(
			'name'=>$row->{'gsx$name'}->{'$t'},
			'slug'=>$row->{'gsx$slug'}->{'$t'},
			'icon'=>$row->{'gsx$icon'}->{'$t'},
			'valid_date'=>$row->{'gsx$validdate'}->{'$t'}
		);
		if(!is_null($limitData) && $i++ == $limitData) break;
	}

	return $reformat_rows;
}

function settingSheetRender($data, $limitData)
{
	$reformat_rows = array();

	$i = 1;
	foreach($data as $key=>$row)
	{
		$reformat_rows[] = array(
			'name'=>$row->{'gsx$name'}->{'$t'},
			'slug'=>$row->{'gsx$slug'}->{'$t'},
			'variable'=>$row->{'gsx$variable'}->{'$t'}
		);
		if(!is_null($limitData) && $i++ == $limitData) break;
	}

	return $reformat_rows;
}

function attributeSheetRender($data, $limitData)
{
	$reformat_rows = array();

	$i = 1;
	foreach($data as $key=>$row)
	{
		$reformat_rows[] = array(
			'name'=>$row->{'gsx$name'}->{'$t'},
			'slug'=>$row->{'gsx$slug'}->{'$t'},
			'variable'=>explode(';', $row->{'gsx$variable'}->{'$t'})
		);

		if(!is_null($limitData) && $i++ == $limitData) break;
	}

	return $reformat_rows;
}
?>