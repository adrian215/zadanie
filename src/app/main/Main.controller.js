(function () {
  'use strict';
  angular
    .module('impaq')
    .controller('MainController', Main);

  /** @ngInject */
  function Main(users, UserService, UserStorageManagerService, $q) {
    var vm = this;

    vm.editUser = editUser;
    vm.editMultipleUsers = editMultipleUsers;
    vm.removeUser = removeUser;

    activate();

    function activate() {
      vm.users = users;
      UserStorageManagerService.save(vm.users);
    }

    function editUser(user) {
      var changeStatus = UserService.edit(user);
      return syncModelDependsOnServerResponse(changeStatus);
    }

    function removeUser(user) {
      var removeStatus = UserService.remove(user);
      return syncModelDependsOnServerResponse(removeStatus);
    }

    function editMultipleUsers(users) {
      var editPromises = [];
      users.forEach(function (user) {
        var edit = UserService.edit(user);
        editPromises.push(edit);
      });
      return syncModelDependsOnServerResponse($q.all(editPromises));
    }

    function syncModelDependsOnServerResponse(response) {
      return response
        .then(function () {
          //save new model on success
          UserStorageManagerService.save(vm.users);
        }, function () {
          //restore model on error
          vm.users = UserStorageManagerService.restoreData();
        });
    }

  }
})();
