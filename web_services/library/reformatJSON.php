<?php
function reformatJSON_Error($callback)
{
	$ErrorMessage = array('status'=>array('name'=>'error','code'=>500));

	if(is_null($callback) or $callback == '' or strlen($callback) < 1)
	{
		$ErrorMessage = $ErrorMessage;	
	}
	else
	{
		$ErrorMessage = array($callback=>$ErrorMessage);
		
		header("Access-Control-Allow-Headers: Content-Type");
		header("Access-Control-Allow-Methods: GET");
		header("Access-Control-Allow-Origin: *");
		header('Content-Type: application/json');
		header('HTTP/1.1 500 Internal Server Error', true, 500);
	}

	return json_encode($ErrorMessage);
}

function reformatJSON($spreadID, $worksheet, $callback, $limitData, $shortby)
{
	$url = 'https://spreadsheets.google.com/feeds/list/'.$spreadID.'/'.$worksheet.'/public/values?alt=json';
	$file = @file_get_contents($url);

	if(strlen($file) > 0)
	{
		$json = json_decode($file);
		$rows = $json->{'feed'}->{'entry'};

		// See Files: 'library/switcherSheet.php'
		$reformat_rows = switcherCategoriesSheet($rows, $worksheet, $limitData);

		// See Files: 'library/arrayGroup.php'
		$reformat_rows = is_null($shortby) ? $reformat_rows : array_group_by($reformat_rows,$shortby);

		$statusHeader = array('status'=>array('name'=>'ok','code'=>200));

		if(is_null($callback) or $callback == '' or strlen($callback) < 1)
		{

			return json_encode(array_merge($statusHeader, array('item'=>$reformat_rows)));	
		}
		else
		{
			$reformat_rows_object_root = array(
				$callback=>array_merge(
					$statusHeader,
					array('items'=>$reformat_rows)
				)
			);

			header("Access-Control-Allow-Headers: Content-Type");
			//header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
			header("Access-Control-Allow-Methods: GET");
			header("Access-Control-Allow-Origin: "._thisDomain);
			header('Content-Type: application/json');
			header('HTTP/1.1 200 OK', true, 200);
			//echo "// Format: $callback\n";
			//echo "// ID: $ID_Spread\n";
			return json_encode($reformat_rows_object_root);
		}
	}
	else
	{
		return reformatJSON_Error($callback);
	}
}
?>