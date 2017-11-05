// create the module and name it emallApp
angular.module(
	'emallApp', 
	[
		'ngRoute',
		'emallApp.constant',
		'emallApp.directive',
		'emallApp.filter',
		'emallApp.config',
		'emallApp.services',
		'emallApp.controller'
	]
)

.run(
[
	'$rootScope', 
	'$route',
	'$http',
	'configData',
	'GooglesheetDataAPIs',
function(
	$rootScope, 
	$route,
	$http,
	configData,
	GooglesheetDataAPIs) 
{
	// Mengubah title HTML tiap halaman
    $rootScope.$on('$routeChangeSuccess', function()
    {
        document.title = $route.current.titlePage;
    });

	// Lihat file: assets/ng-js/services.js
    configData.then(function(response)
    {
		var responseServer = response.server;

		thisDomain = responseServer.prefix + responseServer.domain + responseServer.suffix;
		// Ekstrak nilai Object dari 'response' kedalam variable $rootScope
    	$rootScope._thisDomain = thisDomain;
    	$rootScope._thisSite = response.site;
    	$rootScope._indexSheet = response.indexSheet;
    	$rootScope._pagesSheet = response.pagesSheet;
    	$rootScope._sheetID = response.sheetID;
	   	//console.log(response.indexSheet);

		// Index "category" untuk halaman kategori dari file _Config.json, Lihat file: assets/ng-js/app.js
	    dataSheetGlobal = response.globalSheet;
	    //console.log(dataSheetGlobal.length);

		// Lihat file: assets/ng-js/services.js
		GooglesheetDataAPIs 
		.sheetQueue(response.sheetID, dataSheetGlobal, thisDomain)
		.then(function(data)
		{
			objectProductCategory = [];
			angular.forEach(data, function(value, key)
			{
				arraySheetName = dataSheetGlobal[key].name;
				dataIndexName = value[arraySheetName];
				renameIndexScope = '_' + toTitleCase(arraySheetName);

				$rootScope[renameIndexScope] = dataIndexName.items;
				//console.log($rootScope[renameIndexScope]);
			})
		})
    })
}]);