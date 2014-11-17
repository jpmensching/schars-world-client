angular.module('ScharsWorld').controller('ArticleController', function($scope, $ionicLoading, $stateParams, ApiService) {
    $ionicLoading.show();
    ApiService.getArticle($stateParams.id).then(function(data) {
        $scope.article = data;
        $ionicLoading.hide();
        $scope.title = data.sections[0].title;
    }, function(error) {
        $ionicLoading.hide();
        $ionicPopup.show({
            template: 'That article does not exist.',
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
