<?php
function BreakSymbolArrayDimension($data='',$spliter=array())
{
	if($data != '' or strlen($data) > 0)
	{
		if (count($spliter) > 1)
		{
			$break = explode($spliter[0], $data);
			
			foreach($break as $first_value)
			{
				$second_break = explode($spliter[1], $first_value);

				$ARD[] = array($second_break[0]=>$second_break[1]);
			}

			return $ARD;
		}
		else
		{
			return null;
		}
	}
	else
	{
		return null;
	}
}

function explodeDualSpliterData($data,$separate)
{
	$ex = explode($separate[0], $data);
	$index = explode($separate[1], $ex[0]);
	$value = explode($separate[1], $ex[1]);
	return count($index) == count($value) ? array_combine($index, $value) : null;
}
?>