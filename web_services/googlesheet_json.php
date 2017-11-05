<?php
require_once('config.php');
require_once(_thisDIR.'library/shortingText.php');
require_once(_thisDIR.'library/arrayGroup.php');
require_once(_thisDIR.'library/BreakSymbolArray.php');
require_once(_thisDIR.'library/sheetRender.php');
require_once(_thisDIR.'library/switcherSheet.php');
require_once(_thisDIR.'library/reformatJSON.php');

//const CALLBACK_FORMATTING = 'list_product';
//$array_list_format = array('list_product', 'list_seller');
$callback = isset($_REQUEST['callback']) ? $_REQUEST['callback'] : null;
//$callback = in_array($callback, $array_list_format) ? $callback : 'list_product';
$worksheet = isset($_REQUEST['worksheet']) ? $_REQUEST['worksheet'] : 'od6';
$shortGroupCategory = isset($_REQUEST['groupby']) ? $_REQUEST['groupby'] : null;
$limitData = isset($_REQUEST['limit']) ? $_REQUEST['limit'] : null;

$ID_Spread = isset($_REQUEST['ID']) ? $_REQUEST['ID'] : null;

echo is_null($ID_Spread) ? reformatJSON_Error($callback) : reformatJSON($ID_Spread, $worksheet, $callback, $limitData, $shortGroupCategory);
?>