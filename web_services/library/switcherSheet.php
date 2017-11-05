<?php
function switcherCategoriesSheet($data, $switch, $limitData)
{
	switch ($switch) 
	{
		// See Files: 'library/sheetRender.php'
		case 1:
			return categorySheetRender($data, $limitData);
			break;

		case 2:
			return locationSheetRender($data, $limitData);
			break;

		case 3:
			return sellerSheetRender($data, $limitData);
			break;

		case 4:
			return productsSheetRender($data, $limitData);
			break;
		
		case 5:
			return searchSheetRender($data, $limitData);
			break;

		case 6:
			return pushSheetRender($data, $limitData);
			break;

		case 7:
			return settingSheetRender($data, $limitData);
			break;

		case 8:
			return attributeSheetRender($data, $limitData);
			break;

		default:
			return reformatJSON_Error(null);
			break;
	}

}
?>