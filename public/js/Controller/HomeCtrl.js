
app.controller("HomeCtrl", function ($scope, MyService, $location, LoginService, $rootScope) {
    $scope.userProfile = null;

    $scope.profileOptionsToggle = false;

    $scope.goToLoginPage = function () {
        $location.url("/login");
    };

    $scope.$watch(function () {
        //return LoginService.getCurrentUSerProfile();
        return $rootScope.user;
    }, function (response) {
        $scope.userProfile = response;
    }, true);

    $scope.setProfileOptionsToggle = function () {
        $scope.profileOptionsToggle = !$scope.profileOptionsToggle;
    };

    $scope.logout = function () {
        LoginService.logout();
    };

    $scope.goToProfile = function () {
        $location.url("/profile");
    };

});
