angular.module('ScharsWorld').controller('CategoriesController', function($scope, $state, $ionicLoading, ApiService) {
    $scope.error = false;
    $ionicLoading.show({
        template: 'Loading'
    });
    ApiService.getCategories().then(function(data) {
        $scope.categories = data;
        $ionicLoading.hide();
    }, function(error) {
        $scope.error = true;
        $ionicLoading.hide();
    });
    // Bound type needs to be an object to pass by reference
    $scope.searchTerms = {
        term: ''
    }
    $scope.search = function() {
        $state.go('search', {
            q: $scope.searchTerms.term
        });
    }
});
