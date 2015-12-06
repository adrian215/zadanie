(function () {
  'use strict';

  angular
    .module('impaq')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/Main.view.html',
        controller: 'MainController',
        controllerAs: 'vm',
        resolve: {
          users: function (UserService) {
            return resolveUserList(UserService);
          }
        }
      });

    $urlRouterProvider.otherwise('/');

    function resolveUserList(UserService) {
      return UserService.findAll()
        .then(function (response) {
          return response;
        }, function () {
          return [];
        });
    }
  }

})();
