// create the module and name it emallApp
angular.module(
	'emallApp', 
	[
		'ngRoute',
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
	'GooglesheetDataAPIs',
function(
	$rootScope, 
	$route,
	$http,
	GooglesheetDataAPIs) 
{
    $rootScope.$on('$routeChangeSuccess', function()
    {
        document.title = $route.current.titlePage;
    });

	$http.get('web_services/data/_serverConfig.json')
	.then(function onSuccess(response)
	{
		var responseData = response.data;

		thisDomain = responseData.prefix + responseData.domain + responseData.suffix;

    	$rootScope._thisDomain = thisDomain;

	    GooglesheetDataAPIs.sheet('1iXsE5OfJx-iQGdT-FDs0xbLuD2fuUAY5Q629gamzfJE', 6, 'push', thisDomain)
	    .then(function(data)
	    {
	    	$rootScope._thisPushCategory = data.items;
	    	//console.log(data);
		});
	})
}]);