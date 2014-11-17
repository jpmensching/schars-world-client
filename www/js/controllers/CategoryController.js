angular.module('ScharsWorld').controller('CategoryController', function($scope, $ionicLoading, $ionicPopup, $ionicNavBarDelegate, ApiService, $stateParams) {
    $ionicLoading.show({
        template: 'Loading'
    });
    $scope.title = $stateParams.slug.replace(/_/g, ' ');
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
                        $ionicNavBarDelegate.back();
                    }
                }
            ]
        });
    });
})
