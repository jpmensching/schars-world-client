// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ScharsWorld', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
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
    $urlRouterProvider.otherwise("/");
})

.controller('CategoriesController', function($scope, $ionicLoading, ApiService) {
    $ionicLoading.show({
        template: 'Loading'
    });
    ApiService.getCategories().then(function(data) {
        $scope.categories = data;
        $ionicLoading.hide();
    });
})

.controller('CategoryController', function($scope, $ionicLoading, $ionicPopup, $ionicNavBarDelegate, ApiService, $stateParams) {
    $ionicLoading.show({
        template: 'Loading'
    });
    ApiService.getCategory($stateParams.slug).then(function(data) {
        $scope.items = data;

        // Build URLs
        angular.forEach($scope.items, function(item, index) {
            switch (item.type) {
                case 'category':
                    item.url = '#/categories/' + item.title.replace(/ /g, '_');
                break;

                case 'article':
                    item.url = '#/articles/' + item.id;
                break;
            }
        });

        $ionicLoading.hide();
    }, function(error) {
        $ionicLoading.hide();
        $ionicPopup.show({
            template: 'That category does not exist.',
            title: 'Sorry',
            buttons: [
                {
                    text: 'Go Back',
                    onTap: function(event) {
                        console.log($ionicNavBarDelegate.back());
                    }
                }
            ]
        });
    });
})

.controller('ArticleController', function($scope, $ionicLoading, $stateParams, ApiService) {
    $ionicLoading.show();
    ApiService.getArticle($stateParams.id).then(function(data) {
        $scope.article = data;
        $ionicLoading.hide();
    });
})

.service('ApiService', function(StorageService, $q, $http) {
    var baseUrl = '';
    if ((window.location + '').indexOf('localhost') !== -1) {
        baseUrl = 'http://localhost:8090/wikia/';
    } else {
        // TODO
    }
    return {
        getCategories: function() {
            var deferred   = $q.defer();
            var categories = StorageService.get('categories');
            if (categories) {
                deferred.resolve(JSON.parse(categories));
            } else {
                $http.get(baseUrl + 'categories/').success(function(data) {
                    deferred.resolve(data.items);
                    sessionStorage.setItem('categories', JSON.stringify(data.items));
                });
            }
            return deferred.promise;
        },
        getCategory: function(title) {
            var deferred = $q.defer();
            var category = StorageService.get('categories.' + title);
            if (category) {
                deferred.resolve(category);
            } else {
                $http.get(baseUrl + 'categories/' + title + '/').success(function(data) {
                    deferred.resolve(data.items);
                }).error(function(error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        },
        getArticle: function(title) {
            var deferred = $q.defer();
            var article  = StorageService.get('articles.' + title);
            if (article) {
                deferred.resolve(article);
            } else {
                $http.get(baseUrl + 'articles/' + title + '/').success(function(data) {
                    deferred.resolve(data);
                });
            }
            return deferred.promise;
        }
    }
})

.service('StorageService', function() {
    return {
        get: function(key) {
            if (typeof sessionStorage === 'undefined') {
                return null;
            } else {
                return sessionStorage.getItem(key);
            }
        }
    }
})