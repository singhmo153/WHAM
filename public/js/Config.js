var app = angular.module("wham", ['ngRoute', "pageslide-directive"]);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'partials/Home.html',
            controller: 'HomeCtrl',
            resolve: {
                loggedin: checkCurrentUser
            }
        }).
        when('/login', {
            templateUrl: 'partials/Login.html',
            controller: 'LoginCtrl',

        }).
        when('/profile', {
            templateUrl: 'partials/Profile.html',
            controller: 'ProfileCtrl',
            resolve: {
                loggedin: checkCurrentUser
            }
        }).
    otherwise({
        redirectTo: '/home'
    })
}
]);

var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    console.log("in check")
    $http.get("/rest/api/loggedin")
        .success(function (user) {
            console.log("in check logged in")
            console.log(user);
            // User is Authenticated
            if (user !== '0') {
                $rootScope.user = user;
            } else {
                delete $rootScope.user;
            }
            deferred.resolve();
        });

    return deferred.promise;
};
