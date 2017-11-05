angular.module(
	'emallApp.services',
	[
		'ngResource'
	]
)

.factory('SliderData',
[
function()
{
	return {
		data: function()
		{
			return [
				{
					id: 0,
					title: "Konten Banner Slide 1",
					images: "assets/images/slide-image-1.svg",
					alt: "Slider Pertama",
					text: "This is content slide 1"
				},
				{
					id: 1,
					title: "Konten Banner Slide 2",
					images: "assets/images/slide-image-1.svg",
					alt: "Slider Kedua",
					text: "This is content slide 2"
				},
				{
					id: 2,
					title: "Konten Banner Slide 3",
					images: "assets/images/slide-image-1.svg",
					alt: "Slider Ketiga",
					text: "This is content slide 3"
				}
			];
		}
	}
}])


.factory('testPassing', [
'$q',
function($q)
{
	return {
		out: function(a, b)
		{
			var defered = $q.defer();
			defered.resolve({a, b});
			return defered.promise;
		}
	}
}])


.factory('serverData', [
'$http', '$q',
function($http, $q)
{
	var defered = $q.defer();

	$http.get('web_services/data/_serverConfig.json')

	.then(function onSuccess(response)
	{
		defered.resolve(response.data);
	}, 
	function onError(response)
	{
		defered.reject(response.data);
	});

	return defered.promise;
}])


.factory('pushCategoryData', [
'$http', '$q',
function($http, $q)
{
	var defered = $q.defer();

	$http.get('web_services/data/_pushCategory.json')

	.then(function onSuccess(response)
	{
		defered.resolve(response.data);
	}, 
	function onError(response)
	{
		defered.reject(response.data);
	});

	return defered.promise;
}])


.service("GooglesheetDataAPIs", 
[
'$http', '$q', '$rootScope',
function($http, $q, $rootScope)
{
	return {
		sheet: function(id, worksheet, callback, domain, group)
		{
			var defered = $q.defer();

			if(domain)
			{
				thisDomain = domain;
				//console.log('from parameters');
				//console.log(thisDomain);
			}
			else
			{
				thisDomain = $rootScope._thisDomain;
				//console.log('from scopeRoot');
				//console.log(thisDomain);
			}

			if(group)
			{
				apiUrl = thisDomain + '/web_services/gsx/' + group;
			}
			else
			{
				apiUrl = thisDomain + '/web_services/gsx';
			}

			$http.get(apiUrl + '/' + id + '/' + callback + '/' + worksheet)

			.then(function onSuccess(response)
			{
				/* Handle Succes
				var data = response.data;
				var status = response.status;
				var statusText = response.statusText;
				var headers = response.headers;
				var config = response.config;
				*/

				//console.log(response);
				defered.resolve(response.data);
			}, 
			function onError(response) {
				/* Handle Succes
				var data = response.data;
				var status = response.status;
				var statusText = response.statusText;
				var headers = response.headers;
				var config = response.config;
				*/

				defered.reject(response.data);
			});


	   		return defered.promise;
		}
	}
}])