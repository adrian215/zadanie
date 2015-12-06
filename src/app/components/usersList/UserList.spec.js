(function () {
  describe('Users list', function () {

    var $compile;
    var $rootScope;

    beforeEach(module('impaq'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    beforeEach(function () {
      $rootScope.users = [{
        id: 1,
        name: 'Jan',
        surname: 'Kowalski',
        dateOfBirth: '2015-11-11',
        mobileNumber: '123123123',
        address: 'kwiatowa 5'
      }, {
        id: 2,
        name: 'Jan',
        surname: 'Kowalski',
        dateOfBirth: '2015-11-11',
        mobileNumber: '123123123',
        address: 'kwiatowa 5a'
      }];
    });

    it('should show list of users', function () {
      //given
      var directive = $compile('<users-list users="users"></users-list>')($rootScope);

      //when
      $rootScope.$apply();

      //then
      var rows = directive.find('.users-table-row');
      expect(rows.length).toBe(2);
    });

    it('should callback delete', function () {
      //given
      $rootScope.deleteUser = jasmine.createSpy('deleteUser');
      var directive = $compile('<users-list users="users" remove-user="deleteUser(user)"></users-list>')($rootScope);

      $rootScope.$apply();
      var deleteButton = directive.find('.users-table-row .btn')[1];

      //when
      deleteButton.click();

      //then
      expect($rootScope.deleteUser).toHaveBeenCalled();
      expect($rootScope.users.length).toBe(1);
    });

    it('should callback update', function () {
      //given
      $rootScope.updateUser = jasmine.createSpy('updateUser');
      var directive = $compile('<users-list users="users" edit-user="updateUser(user)"></users-list>')($rootScope);

      $rootScope.$apply();
      var updateButton = directive.find('.users-table-row .btn')[0];

      //when
      updateButton.click();
      updateButton.click();

      //then
      expect($rootScope.updateUser).toHaveBeenCalledWith($rootScope.users[0]);
    });
  });
})();
