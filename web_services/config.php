<?php
	$getData = @file_get_contents(dirname(__FILE__).'/data/_Config.json');
	$_serverConfig = json_decode($getData, true);
	$_thisDomain = join($_serverConfig['server']);

	//var_dump($_thisDomain);
	define('_thisDIR', dirname(__FILE__).'/');
	define('_thisDomain', $_thisDomain);
?>