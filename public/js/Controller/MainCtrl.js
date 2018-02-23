app.controller("MainCtrl", function ($scope, $location, $rootScope) {

    $scope.init = function () {
        if ($location.path() == '/home' && !$rootScope.user && ($scope.showTutorial == undefined || $scope.showTutorial != false)) {
            $scope.showTutorial = true;
        }
    };

    $scope.dismisstutorial = function () {
        $scope.showTutorial = false;
    }
})