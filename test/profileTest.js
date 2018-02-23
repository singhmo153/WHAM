'use strict';

describe('Controller: ProfileCtrl', function () {

    // load the controller's module
    beforeEach(module('wham'));


    var scope;
    var LoginService;
    var Location;
    var ProfileCtrl;
    var http;

    beforeEach(function () {

        LoginService = {
            updatePreference: function () {

                return;
            },
            changePassword: function () {

            return;
        }

        }
    });

    // Initialize the controller and a mock scope
    beforeEach(function () {
        inject(function ($rootScope, $controller,$http,$location) {
            scope = $rootScope.$new();
            ProfileCtrl = $controller('ProfileCtrl', {
                '$rootScope': $rootScope,
                '$scope': scope,
                'LoginService': LoginService,
                'http': $http,
                '$location': $location
            });
        })
    });

    it('should throw error: Please enter your old Password.', function () {
       
        scope.editPassword = {
            oldPassword: null,
            newPassword: "12345678",
            confirmPassword: "12345678",
            errors: {}
        };
        scope.changePassword();
        expect(scope.editPassword.errors.oldPassword).toMatch("Please enter your old Password.");
    });
    it('should throw error: Please enter your old Password.', function () {

        scope.editPassword = {
            oldPassword: "",
            newPassword: "12345678",
            confirmPassword: "12345678",
            errors: {}
        };
        scope.changePassword();
        expect(scope.editPassword.errors.oldPassword).toMatch("Please enter your old Password.");
    });

    it('should throw error: Please choose a Password.', function () {

        scope.editPassword = {
            oldPassword: "12345678",
            newPassword: null,
            confirmPassword: "12345678",
            errors: {}
        };
        scope.changePassword();
        expect(scope.editPassword.errors.newPassword).toMatch("Please choose a Password.");
    });
    it('should throw error: Please choose a Password.', function () {

        scope.editPassword = {
            oldPassword: "12345678",
            newPassword: "",
            confirmPassword: "12345678",
            errors: {}
        };
        scope.changePassword();
        expect(scope.editPassword.errors.newPassword).toMatch("Please choose a Password.");
    });
    it('should throw error: Password must be a atlease 8 characters and atmost 15 characters', function () {

        scope.editPassword = {
            oldPassword: "12345678",
            newPassword: "12345",
            confirmPassword: "12345",
            errors: {}
        };
        scope.changePassword();
        expect(scope.editPassword.errors.newPassword).toMatch("Password must be a atlease 8 characters and atmost 15 characters");
    });
    it('should throw error: Password must be a atlease 8 characters and atmost 15 characters', function () {

        scope.editPassword = {
            oldPassword: "12345678",
            newPassword: "123456789123456789",
            confirmPassword: "123456789123456789",
            errors: {}
        };
        scope.changePassword();
        expect(scope.editPassword.errors.newPassword).toMatch("Password must be a atlease 8 characters and atmost 15 characters");
    });
    it('should throw error: Please confirm Password.', function () {

        scope.editPassword = {
            oldPassword: "12345678",
            newPassword: "12345678",
            confirmPassword: null,
            errors: {}
        };
        scope.changePassword();
        expect(scope.editPassword.errors.confirmPassword).toMatch("Please confirm Password.");
    });
    it('should throw error: Please confirm Password.', function () {

        scope.editPassword = {
            oldPassword: "12345678",
            newPassword: "12345678",
            confirmPassword: "",
            errors: {}
        };
        scope.changePassword();
        expect(scope.editPassword.errors.confirmPassword).toMatch("Please confirm Password.");
    });

    it('should throw error: Passwords does not match.', function () {

        scope.editPassword = {
            oldPassword: "12345678",
            newPassword: "22345678",
            confirmPassword: "12345678",
            errors: {}
        };
        scope.changePassword();
        expect(scope.editPassword.errors.confirmPassword).toMatch("Passwords does not match.");
    });
       

    it('should throw error: Please choose a category or keyword', function () {
        scope.activeSubTabIndex = 0;
        scope.newPreference = {
            of: scope.activeSubTabIndex,
            type: null,
            keywords: null,
            errors: {}
        }
        scope.addPreference();
        expect(scope.newPreference.errors.type).toMatch("Please choose a category or keyword");
    });

    it('should call the updatePreference in LoginService', function () {
        spyOn(LoginService, 'updatePreference').and.callThrough();
        scope.activeSubTabIndex = 0;
        scope.newPreference = {
            of: scope.activeSubTabIndex,
            type: "music",
            keywords: "rock",
            errors: {}
        }
        scope.addPreference();
        expect(LoginService.updatePreference).toHaveBeenCalled();
    });

    it('should call the changepassword in LoginService', function () {
        spyOn(LoginService, 'changePassword').and.callThrough();        
        scope.editPassword = {
            oldPassword: "12345678",
            newPassword: "22345678",
            confirmPassword: "22345678",
            errors: {}
        };
        scope.changePassword();
        expect(LoginService.changePassword).toHaveBeenCalled();
    });
});