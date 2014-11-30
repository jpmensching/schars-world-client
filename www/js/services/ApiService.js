angular.module('ScharsWorld').service('ApiService', function(StorageService, $q, $http) {
    var baseUrl = 'https://immense-wildwood-2952.herokuapp.com/api/';
    return {
        getCategories: function() {
            var deferred   = $q.defer();
            var categories = StorageService.get('categories');
            if (categories) {
                deferred.resolve(JSON.parse(categories));
            } else {
                $http.get(baseUrl + 'categories/').success(function(data) {
                    deferred.resolve(data.items);
                    StorageService.set('categories', JSON.stringify(data.items));
                }).error(function(error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        },
        getCategory: function(title) {
            var deferred = $q.defer();
            var category = StorageService.get('categories:' + title);
            if (category) {
                deferred.resolve(JSON.parse(category));
            } else {
                $http.get(baseUrl + 'categories/' + title + '/').success(function(data) {
                    deferred.resolve(data.items);
                    StorageService.set('categories:' + title, JSON.stringify(data.items));
                }).error(function(error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        },
        getArticle: function(title) {
            var deferred = $q.defer();
            var article  = StorageService.get('articles:' + title);
            if (article) {
                deferred.resolve(JSON.parse(article));
            } else {
                $http.get(baseUrl + 'articles/' + title + '/').success(function(data) {
                    deferred.resolve(data);
                    StorageService.set('articles:' + title, JSON.stringify(data));
                }).error(function(error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        },
        search: function(terms, batch) {
            var deferred = $q.defer();
            $http.get(baseUrl + 'search/' + terms + '/' + batch + '/').success(function(data) {
                deferred.resolve(data);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
})
