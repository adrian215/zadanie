(function () {
  'use strict';
  angular.module('impaq')
    .directive('usersList', usersList);

  /** @ngInject */
  function usersList() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/usersList/UsersList.view.html',
      scope: {
        users: '=',
        editUser: '&',
        editUsers: '&',
        removeUser: '&'
      },
      controller: usersListController,
      controllerAs: 'vm'
    };
  }

  /** @ngInject */
  function usersListController($scope) {
    var vm = this;

    vm.userMetadata = {};
    vm.preventEditing = false;

    vm.editRow = editRow;
    vm.deleteRow = deleteRow;
    vm.editMultipleRows = editMultipleRows;

    function editRow(user) {
      vm.userMetadata[user.id] = vm.userMetadata[user.id] || {};

      if (vm.userMetadata[user.id].editing) {
        // send updated information
        $scope.editUser({user: user});
      }
      vm.userMetadata[user.id].editing = !vm.userMetadata[user.id].editing;
    }

    function deleteRow(user, index) {
      $scope.removeUser({user: user});
      delete vm.userMetadata[user.id];
      removeUserFromArray(index);
    }

    function editMultipleRows() {
      var changedUsers = [];

      $scope.users.forEach(function (user, index) {
        vm.userMetadata[user.id] = vm.userMetadata[user.id] || {};

        addToChangedUsersListIfEdited(changedUsers, user, index);
        editRowIfSelected(user);
      });

      if (changedUsers) {
        $scope.editUsers({users: changedUsers});
      }
      vm.multipleEdit = !vm.multipleEdit;
    }

    function removeUserFromArray(index) {
      $scope.users.splice(index, index + 1);
    }

    function addToChangedUsersListIfEdited(changedUsers, element, index) {
      var currentUserMetadata = vm.userMetadata[element.id];

      if (currentUserMetadata.editing && currentUserMetadata.selected) {
        changedUsers.push($scope.users[index]);
      }
    }

    function editRowIfSelected(element) {
      var currentUserMetadata = vm.userMetadata[element.id];

      if (currentUserMetadata.selected) {
        currentUserMetadata.editing = !currentUserMetadata.editing;
      }
    }
  }
})();
