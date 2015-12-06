(function () {
  'use strict';
  angular.module('impaq')
    .directive('editableTableField', editableTableField);

  /** @ngInject */
  function editableTableField() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/editableTableField/EditableTableField.view.html',
      scope: {
        value: '=',
        editMode: '='
      }
    };
  }
})();
