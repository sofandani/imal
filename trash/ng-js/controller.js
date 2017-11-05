angular.module('emallApp.controller',
	[
		'ngMap'
	]
)


.controller('errorController', 
['$scope', 
function($scope)
{
	
}])


.controller('mainController', 
['$scope', '$http', 'GooglesheetDataAPIs', 'serverDataConstant',
function($scope, $http, GooglesheetDataAPIs, serverDataConstant)
{
	//var domain = serverData;
	//console.log($rootScope._thisDomain);
    //console.log($rootScope._thisPushCategory);

    //$scope.homeBannerSlide = SliderData.data();
    //console.log($scope.homeBannerSlide);

    arraySheetData = {'index':[{id:6,name:'push'}, {id:1,name:'categories'}, {id:4,name:'emallproducts'}, {id:5,name:'searchsuggest'}]};

	jQuery('.pre-loading').show();
	//console.log(jQuery('.pre-loading').show('slow'));

	GooglesheetDataAPIs 
	.sheetQueue(serverDataConstant['sheetID'], arraySheetData)
	.then(function(data)
	{
		jQuery('.pre-loading').fadeOut('slow');

		for(i = 0; i < data.length; i++)
		{
			arraySheetName = arraySheetData.index[i].name;
			dataName = arraySheetName + 'Data';
			$scope[dataName] = data[i];
			//console.log($scope[dataName]);
		}
	});

    /*GooglesheetDataAPIs.sheet(serverDataConstant['sheetID'], 1, 'categories')
    .then(function(data)
    {
    	$scope.menu_categories = data.categories.items;
    	//console.log(data.categories.items);
	});

    GooglesheetDataAPIs.sheet(serverDataConstant['sheetID'], 4, 'emallproducts')
    .then(function(data)
    {
    	$scope.productSuggest = data.emallproducts.items;
    	//console.log(data.emallproducts.items);
	});

    GooglesheetDataAPIs.sheet(serverDataConstant['sheetID'], 5, 'searchsuggest')
    .then(function(data)
    {
    	$scope.searchSuggest = data.searchsuggest.items;
    	//console.log(data.searchsuggest.items);
	});*/
}])


.controller('productPushController', 
['$scope', '$http', 'GooglesheetDataAPIs', 'serverDataConstant',
function($scope, $http, GooglesheetDataAPIs, serverDataConstant)
{
    GooglesheetDataAPIs.sheet(serverDataConstant['sheetID'], 4, 'emallproducts')
    .then(function(data)
    {
    	$scope.productSuggest = data.emallproducts.items;
    	//console.log(data.emallproducts.items);
	});

	// create a message to display in our view
	$scope.message = 'Everyone come and see how good I look!';
}])


.controller('aboutController', 
['$scope', 
 function($scope)
{
	$scope.message = 'Look! I am an about page.';
}])


.controller('categoriesController', 
['$scope', 
function($scope)
{
	$scope.message = 'This is Categories';
}])


.controller('productController', 
['$scope', '$routeParams',
function($scope, $routeParams)
{
	$scope.id = $routeParams.id;
	$scope.message = 'This is Product';
}])