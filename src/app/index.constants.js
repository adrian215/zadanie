/* global malarkey:false, moment:false */
(function () {
  'use strict';

  angular
    .module('impaq')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('API_PATH', {
      base: 'users.impaqgroup.com',
      findAll: '/findall',
      edit: '/edit',
      remove: '/remove'
    });
})();
