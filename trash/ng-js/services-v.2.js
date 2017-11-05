angular.module(
	'emallApp.services',
	[
		'ngResource'
	]
)

.factory(
'SliderData',
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


.factory(
'testPassing', 
['$q',
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


.factory(
'serverData', 
['$http', '$q',
function($http, $q)
{
	var defered = $q.defer();

	$http.get('web_services/data/_Config.json')

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



.service(
"GooglesheetDataAPIs", 
['$http', '$q', '$rootScope',
function($http, $q, $rootScope)
{
	function resolveHTTP(domain, group)
	{
		if(domain)
		{
			resolveDomain = domain;
			//console.log('from parameters');console.log(resolveDomain);
		}
		else
		{
			resolveDomain = $rootScope._thisDomain;
			//console.log('from scopeRoot');console.log(resolveDomain);
		}


		if(group)
		{
			return resolveDomain + '/web_services/gsx/' + group;
		}
		else
		{
			return resolveDomain + '/web_services/gsx';
		}
	}

	function deferedHTTP(url)
	{
		var defered = $q.defer();

		$http.get(url)
		.then(function onSuccess(response)
		{
			//console.log(response);
			defered.resolve(response.data);
			console.log('Dari $http Success Sheet Fetch');
			console.log(response.data);
			console.log(response.status);
			console.log(response.statusText);
			console.log(response.headers);
			console.log(response.config);
		}, 
		function onError(response)
		{
			defered.reject(response.data);
			console.log('Dari $http Error Sheet Fetch');
			console.log(response.data);
			console.log(response.status);
			console.log(response.statusText);
			console.log(response.headers);
			console.log(response.config);
		});

		return defered.promise;
	}

	return {
		sheet: function(id, worksheet, callback, domain, group)
		{
			thisDomain = resolveHTTP(domain, group);
			url = thisDomain + '/' + id + '/' + callback + '/' + worksheet;
	   		return deferedHTTP(url);
		},
		sheetQueue: function(id, dataWorksheet, domain, group)
		{

			thisDomain = resolveHTTP(domain, group);
			eachUrl = [];

		    for(i = 0; i < dataWorksheet.index.length; i++)
		    {
		    	worksheet = dataWorksheet.index[i].id;
		    	callback = dataWorksheet.index[i].name;
		    	eachUrl.push(thisDomain + '/' + id + '/' + callback + '/' + worksheet);
		    }

		    //console.log(eachUrl);

			var promises = eachUrl.map(function(url)
			{
				return deferedHTTP(url);
			})

			return $q.all(promises);
		}
	}
}])