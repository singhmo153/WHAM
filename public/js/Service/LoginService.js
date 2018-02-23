app.factory("LoginService", function ($http, $location, $rootScope) {


    var checkIfUserExist = function (email, callback) {
        $http.get("/api/user/email=" + email)
                .success(function (res) {
                    if (res == "error") {
                        callback("error");
                    } else if (res == '') {
                        callback(null);
                    } else {
                        callback("ok");
                    }
                });
    };

    var register = function (newUser, callback) {
        $http.post("/api/user", newUser)
        .success(function (res) {
            if (res == 'User already exists') {
                callback("Username aready exists");
            } else if (res == 'error') {
                callback("Some Error occured in Server");
            }
            else if (res == 'ok') {
                $http.post("/login", newUser)
                    .success(function (res) {
                        $rootScope.user = res;
                        callback('ok');
                    });
            }
        });
    };

    var forgot = function (email, callback) {
        $http.get("/api/forgot/email=" + email)
       .success(function (res) {
           callback('ok');
       })
        .error(function (err) {
            callback('error');
        });
    }

    var login = function (user, callback) {
        $http.post("/login", user)
       .success(function (res) {
           $rootScope.user = res;
           callback('ok');
       })
        .error(function (err) {
            callback('error');
        });
    };

    var getCurrentUSerProfile = function () {
        return $rootScope.user;
    };

    var logout = function () {
        $http.post("/logout", $rootScope.user)
      .success(function (res) {
          delete $rootScope.user;
          $location.url("/");
      })
       .error(function (err) {

       });
    };

    var updatePreference = function (preference) {
        var data = { 'email': $rootScope.user.email, 'preference': preference }
        $http.post("/api/user/preference", data)
       .success(function (res) {
           $rootScope.user.preferences = res;
           //callback(res);
       })
        .error(function (err) {
            //callback('error');
        });
    }

    var deletePreference = function (preference) {
        var data = { 'email': $rootScope.user.email, 'preference': preference }
        $http.post("/api/user/preference/delete", data)
       .success(function (res) {
           $rootScope.user.preferences = res;
           //callback(res);
       })
        .error(function (err) {
            //callback('error');
        });
    };

    var changePassword = function (passData, callback) {

        var data = {
            email: $rootScope.user.email,
            oldPassword: passData.oldPassword,
            newPassword: passData.newPassword
        };

        $http.post("/api/user/password", data)
        .success(function (res) {
            callback(res);
        })
        .error(function (err) {

        })
    };


    //*********************************************** Going to Event *******************************************//

    var createHistory = function (eventData, callback) {

        var data = {
            email: $rootScope.user.email,
            data: {
                eventId: eventData.eventId,
                title: eventData.title,
                venueId: eventData.venueId,
                venueName: eventData.venueName,
                venueAddress: eventData.venueAddress,
                date: eventData.date
            }
        }
        $http.post("/api/user/history", data)
        .success(function (res) {
            if (res == 'error') {
                callback(res);
            } else {
                $rootScope.user.history = res;
                callback('ok');
            }
        })
        .error(function (err) {
            callback(res);
        })
    };

    var deleteHistory = function (eventData, callback) {
        var data = {
            email: $rootScope.user.email,
            data: {
                eventId: eventData.eventId,
                title: eventData.title,
                venueId: eventData.venueId,
                venueName: eventData.venueName,
                venueAddress: eventData.venueAddress,
                date: eventData.date
            }
        }
        $http.post("/api/user/history/delete", data)
        .success(function (res) {
            if (res == 'error') {
                callback(res);
            } else {
                $rootScope.user.history = res.history;
                $rootScope.user.ratings = res.ratings;
                callback('ok');
            }
        })
        .error(function (err) {
            callback(res);
        })
    };

    //*********************************************** Rating *******************************************//

    var rateVenue = function (venueData, callback) {

        var data = {
            email: $rootScope.user.email,
            data: {
                venueId: venueData.venueId,
                venueName: venueData.venueName,
                venueAddress: venueData.venueAddress,
                rating: venueData.rating
            }
        };

        $http.post("/api/venue/rate", data)
        .success(function (res) {
            if (res == 'error') {
                callback(res);
            } else {
                $rootScope.user.ratings = res;
                callback("ok");
            }
        })
        .error(function (err) {
            callback(res);
        })

    };
    var getAllRatings = function (callback) {
        $http.get("/api/venue/rate/count")
       .success(function (res) {
           callback(res);
       })
       .error(function (err) {
           callback(res);
       })
    };

    return {
        getCurrentUSerProfile: getCurrentUSerProfile,
        login: login,
        logout: logout,
        register: register,
        checkIfUserExist: checkIfUserExist,
        updatePreference: updatePreference,
        deletePreference: deletePreference,
        changePassword: changePassword,
        createHistory: createHistory,
        deleteHistory: deleteHistory,
        rateVenue: rateVenue,
        getAllRatings: getAllRatings,
        forgot: forgot
    }
});