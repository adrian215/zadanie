(function() {
  'use strict';

  angular
    .module('impaq')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, RestangularProvider, API_PATH) {
    // Set base api path
    RestangularProvider.setBaseUrl(API_PATH.base);

    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
