// Change Navigation Options with Login
app.controller('navCtrl', ['authService', '$scope', '$rootScope', '$location', '$http', function(authService, $scope, $rootScope, $location, $http){
    $rootScope.user = authService.getUser();

    $scope.logout = function(){
        authService.logout();
        $rootScope.user = authService.getUser();
        $location.path('/');
    }
}]);
