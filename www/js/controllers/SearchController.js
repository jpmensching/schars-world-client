angular.module('ScharsWorld').controller('SearchController', function($scope, $state, $stateParams, $ionicLoading, ApiService) {
    $scope.newTerms = {
        term: ''
    };
    $scope.terms = $stateParams.q;
    if (typeof $scope.terms !== 'undefined') {
        $scope.batch = 1;
        $ionicLoading.show();
        ApiService.search($scope.terms, $scope.batch).then(function(data) {
            $scope.results = data.items;
            $scope.total   = data.total;
            $scope.moreAvailable = true;
            $ionicLoading.hide();

            if (typeof data.exception !== 'undefined') {
                $scope.moreAvailable = false;
                $scope.total = 0;
            }
        });
    }
    $scope.showMore = function() {
        $scope.batch++;
        $ionicLoading.show();
        ApiService.search($scope.terms, $scope.batch).then(function(data) {
            angular.forEach(data.items, function(item) {
                $scope.results.push(item);
            });
            if ($scope.batch === data.batches) {
                $scope.moreAvailable = false;
            }
            $ionicLoading.hide();
        });
    }
    $scope.search = function() {
        $state.go('search', {
            q: $scope.newTerms.term
        });
    }
})
