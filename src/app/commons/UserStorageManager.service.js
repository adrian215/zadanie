(function () {
  'use strict';
  angular.module('impaq')
    .factory('UserStorageManagerService', UserStorageManager);

  /** @ngInject */
  function UserStorageManager() {
    var storageData;
    var service = {
      save: save,
      restoreData: restoreData
    };

    return service;

    function save(data) {
      storageData = angular.copy(data);
    }

    function restoreData() {
      return angular.copy(storageData);
    }

  }
})();
