(function () {
  describe('Main controller', function () {

    var $rootScope;
    var $controller;
    var $q;

    beforeEach(module('impaq'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $q = _$q_;
    }));

    it('Should call user service save on edit', function () {
      //given
      var user = {id: 1};
      var users = [user];
      var userStorageService = jasmine.createSpyObj('userStorageService', ['save']);
      var userService = jasmine.createSpyObj('userService', ['edit']);
      userService.edit.and.callFake(function () {
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;

      });

      var mainController = $controller('MainController', {
        users: users,
        UserService: userService,
        UserStorageManagerService: userStorageService,
        $q: $q
      });

      //when
      mainController.editUser(user);
      $rootScope.$apply();

      //then
      expect(userService.edit).toHaveBeenCalledWith(user);
    });

    it('Should save model on enter', function () {
      //given
      var users = [{id: 1}];
      var userStorageService = jasmine.createSpyObj('userStorageService', ['save']);

      //when
      $controller('MainController', {
        users: users,
        UserStorageManagerService: userStorageService,
        $q: $q
      });

      //then
      expect(userStorageService.save).toHaveBeenCalledWith(users);
    });

    it('Should restore model on error', function () {
      //given
      var user = {id: 1};
      var users = [users];
      var userStorageService = jasmine.createSpyObj('userStorageService', ['save', 'restoreData']);
      var userService = jasmine.createSpyObj('userService', ['edit']);

      userService.edit.and.callFake(function () {
        var deferred = $q.defer();
        deferred.reject();
        return deferred.promise;

      });

      var mainController = $controller('MainController', {
        users: users,
        UserService: userService,
        UserStorageManagerService: userStorageService,
        $q: $q
      });

      //when
      mainController.editUser(user);
      $rootScope.$apply();

      //then
      expect(userStorageService.restoreData).toHaveBeenCalled();
    });

  });
})();
