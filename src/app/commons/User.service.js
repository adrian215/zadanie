(function () {
  'use strict';
  angular.module('impaq')
    .factory('UserService', User);

  /** @ngInject */
  function User(Restangular, API_PATH) {
    var users = Restangular.one(API_PATH.findAll);
    var userEdit = Restangular.one(API_PATH.edit);
    var userRemove = Restangular.one(API_PATH.remove);
    var service = {
      findAll: findAll,
      edit: edit,
      remove: remove
    };

    return service;

    function findAll() {
      return users.get();
    }

    function edit(user) {
      return userEdit.all(user.id).post(user);
    }

    function remove(user) {
      return userRemove.all(user.id).post(user);
    }

  }
})();
