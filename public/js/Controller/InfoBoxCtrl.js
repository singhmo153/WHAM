
app.controller("InfoBoxCtrl", function ($scope, $compile, LoginService, $rootScope) {

    $scope.going = false;

    $scope.$watch(function () {
        //return LoginService.getCurrentUSerProfile();
        return $rootScope.user;
    }, function (response) {
        $scope.userProfile = response;
    }, true);

    $scope.init = function () {

        if ($scope.ratingData == null) {
            $scope.ratingData = { 'like': 0, 'dislike': 0 };
        }
        else if ($scope.ratingData.like == null) {
            $scope.ratingData.like = 0;
        }
        else if ($scope.ratingData.dislike == null) {
            $scope.ratingData.dislike = 0;
        }

        if ($scope.userProfile) {
            for (h in $scope.userProfile.history) {
                if ($scope.event.id == $scope.userProfile.history[h].eventId) {
                    $scope.going = true;
                }
            };
        }

        if ($scope.event.description) {
            $scope.event.description = $scope.event.description.replace(/<\/?[^>]+(>|$)/g, "");

            if ($scope.event.description.length > 350) {
                $scope.event.description = $scope.event.description.substring(0, 350) + "..."
            }
        }
    };

    $scope.getDirections = function (address) {

        var event = $scope.event;

        if (address == null) {
            address = "";
        }

        address += ", " + event["city_name"] + ", " + event["region_name"] + ", " + event["country_name"];
        var lat = event.latitude;
        var lon = event.longitude;

        $scope.$parent.calculateAndDisplayRoute(address, lat, lon);
    };

    //*********************************************** Going to Event *******************************************//

    $scope.goingToEvent = function () {
        var event = $scope.event;

        var data = {
            eventId: event.id,
            title: event.title,
            venueId: event.venue_id,
            venueName: event.venue_name,
            venueAddress: event.venue_address + ", " + event["city_name"] + ", " + event["region_name"] + ", " + event["country_name"],
            date: event.start_time.split(" ")[0]
        }

        LoginService.createHistory(data, function (res) {
            if (res == 'ok') {
                $scope.going = !$scope.going;
            };
        });
    };

    $scope.notGoingToEvent = function () {
        var event = $scope.event;

        var data = {
            eventId: event.id,
            title: event.title,
            venueId: event.venue_id,
            venueName: event.venue_name,
            venueAddress: event.venue_address + ", " + event["city_name"] + ", " + event["region_name"] + ", " + event["country_name"],
            date: event.start_time.split(" ")[0]
        }

        LoginService.deleteHistory(data, function (res) {
            if (res == 'ok') {
                $scope.going = !$scope.going;
            };
        });
    };

    //*********************************************** Share Event *******************************************//

    $scope.shareEventFB = function () {
        var url = $scope.event.url;
        url = "https://www.facebook.com/sharer/sharer.php?app_id=309437425817038&sdk=joey&u=" + url + "&display=popup&ref=plugin";
        window.open(url, 'facebookShare', 'width=500,height=300');
    };
    $scope.shareEventGP = function () {
        var url = $scope.event.url;
        url = "https://plus.google.com/share?url=" + url;
        window.open(url, 'google+Share', 'width=500,height=300');
    };
    $scope.shareEventTW = function () {
        var url = $scope.event.url;
        url = "https://twitter.com/share";
        window.open(url, 'TwitterShare', 'width=500,height=300');
    };
    $scope.shareEventLN = function () {
        var url = $scope.event.url;
        url = "https://www.linkedin.com/cws/share?url=" + url + "&display=popup&ref=plugin";
        window.open(url, 'linkedInShare', 'width=500,height=300');
    };

});
