// configure our routes
angular.module('emallApp.config',[])

.config(
[
	'$routeProvider',
function(
	$routeProvider)
{
	$routeProvider

		// route for the home page
		.when('/404', {
			templateUrl : 'templates/404.html',
			controller  : 'errorController',
			titlePage: '404 - E-Mall'
		})

		// route for the home page
		.when('/', {
			templateUrl : 'templates/home.html',
			controller  : 'mainController',
			titlePage: 'Beranda - E-Mall'
		})

		// route for the about page
		.when('/about', {
			templateUrl : 'templates/about.html',
			controller  : 'aboutController',
			titlePage: 'Tentang - E-Mall'
		})

		// route for the contact page
		.when('/category/:key', {
			templateUrl : 'templates/categories.html',
			controller  : 'categoriesController',
			titlePage: 'Kategori - E-Mall'
		})

		// route for the about page
		.when('/login', {
			templateUrl : 'templates/login.html',
			//controller  : 'aboutController',
			titlePage : 'Masuk - E-Mall'
		})

		.when('/product/:id*', {
            templateUrl : 'templates/product.html',
            controller : 'productController',
            titlePage : 'Produk - E-Mall'
        })

        .otherwise('/404');
}]);