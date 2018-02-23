'use strict';

describe('Controller: SidePanelCtrl', function () {

    // load the controller's module
    beforeEach(module('wham'));

    
    var scope;
    var MyService;
    var LoginService;
    var Location;
    var SidePanelCtrl;  
    

    // Initialize the controller and a mock scope
    beforeEach(function () {
        inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            SidePanelCtrl = $controller('SidePanelCtrl', {
                '$rootScope' : $rootScope,
                '$scope': scope,
                'LoginService': LoginService,
                'MyService': MyService
            });
        })
    });

    it('should throw error: can not be before from date', function () {
        scope.search =  {
            type: null,
            keywords: null,
            fromDate: "2015121400",
            toDate: "2015121000",
            within: 5,
            goingWith: null,
            errors: {}
        };
        scope.validate();
        expect(scope.search.errors.toDate).toMatch("can not be before from date");
    });
});