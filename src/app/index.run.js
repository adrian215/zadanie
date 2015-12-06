(function() {
  'use strict';

  angular
    .module('impaq')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
