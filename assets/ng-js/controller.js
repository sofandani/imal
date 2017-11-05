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
['$scope', '$http', 'GooglesheetDataAPIs', '$rootScope', '$window',
function($scope, $http, GooglesheetDataAPIs, $rootScope, $window)
{
	jQuery('.pre-loading').show();

	// Lihat file: assets/ng-js/app.js
	var indexSheet = $rootScope._indexSheet;
	
	// Data $scope untuk ng-include [templates]
	$scope.controllerScope = {description:true,text:'yes'};

	// Lihat file: assets/ng-js/services.js
	GooglesheetDataAPIs 
	.sheetQueue($rootScope._sheetID, indexSheet)
	.then(function(data)
	{
		jQuery('.pre-loading').fadeOut('slow');

		for(i = 0; i < data.length; i++)
		{
			arraySheetName = indexSheet[i].name; // Mencari nama index di data $rootScope._indexSheet & dibuat variable
			dataIndex = data[i]; // Data dari indexSheet di looping berdasarkan jumlah pada 'i'
			dataIndexName = dataIndex[arraySheetName]; // Mencari nama objek index dalam data sesuai dengan indexSheet
			$scope[arraySheetName] = dataIndexName.items; // Data $scope dibuat berisi data index yang sudah di beri nama
			//console.log(dataIndexName);
		}

		$window.scrollTo(0, 0);
		//console.log(data[0]);
	})
}])


.controller('aboutController', 
['$scope', 
 function($scope)
{
	$scope.message = 'Look! I am an about page.';
}])


.controller('categoriesController', 
['$scope', 'GooglesheetDataAPIs', '$routeParams', '$rootScope', '$window',
function($scope, GooglesheetDataAPIs, $routeParams, $rootScope, $window)
{
	jQuery('.pre-loading').show();

	categorySlug = $routeParams.key;
	$scope.categorySlug = categorySlug;

	// Index "category" untuk halaman kategori dari file _Config.json, Lihat file: assets/ng-js/app.js
    dataSheetCategoryPage = $rootScope._pagesSheet.category;

	// Lihat file: assets/ng-js/services.js
	GooglesheetDataAPIs 
	.sheetQueue($rootScope._sheetID, dataSheetCategoryPage)
	.then(function(data)
	{
		jQuery('.pre-loading').fadeOut('slow');

		objectProductCategory = [];
		angular.forEach(data, function(value, key)
		{
			arraySheetName = dataSheetCategoryPage[key].name;
			dataIndexName = value[arraySheetName];

			if(value.product !== undefined)
			{
				// Memisahkan nilah $scope untuk product
				objectProductCategory.push(value.product);
			}
			else
			{
				// Jika bukan produk maka $scope di looping secara general berdasarkan jenis data sheet
				if(value.length > 1) $scope[arraySheetName] = dataIndexName;
			}
		})

		dataProduct = objectProductCategory[0].items[categorySlug];

    	$scope.productList = dataProduct ? dataProduct : null;
    	$scope.categoryName = dataProduct ? dataProduct[0].category_name : '';

    	//console.log(angular.isUndefined(dataProduct));
		$window.scrollTo(0, 0);
	})
}])


.controller('attributeController', 
['$scope', '$rootScope',
function($scope, $rootScope)
{
	var that = this;

    this.selectVariable = function(params)
    {
    	// Pengkodisian jika nilai params masih kosong
    	if(params)
    	{
	    	dataAttribute = $rootScope._Attribute;
	    	returnDataAttr = [];

	    	angular.forEach(dataAttribute, function(nilai, kunci)
	    	{
	    		if(nilai.slug == params) returnDataAttr['attrList'] = nilai.variable;
	    	})

	    	$scope.attributeNode = returnDataAttr.attrList;
	    }
	    else
	    {
	    	// Nilai $scope di buat 'null' karena nilai 'params' kosong
	    	$scope.attributeNode = null;
	    }
    }	
}])


.controller('productController', 
['$scope', '$routeParams',
function($scope, $routeParams)
{
	$scope.id = $routeParams.id;
	$scope.message = 'This is Product';
}])