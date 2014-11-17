angular.module('ScharsWorld', ['ionic']).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
}).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('menu', {
            url: '/',
            templateUrl: 'templates/menu.html',
            controller: 'CategoriesController'
        })
        .state('category', {
            url: '/categories/:slug',
            templateUrl: 'templates/category.html',
            controller: 'CategoryController'
        })
        .state('article', {
            url: '/articles/:id',
            templateUrl: 'templates/article.html',
            controller: 'ArticleController'
        })
        .state('search', {
            url: '/search?q',
            templateUrl: 'templates/search.html',
            controller: 'SearchController'
        })
    $urlRouterProvider.otherwise("/");
});
