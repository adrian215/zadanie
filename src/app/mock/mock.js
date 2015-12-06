(function () {
  'use strict';
  angular
    .module('mocks')
    .run(mockConfig);

  var mockObject = {
    findAll: [{
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
    }]
  };

  /** @ngInject */
  function mockConfig($httpBackend) {
    $httpBackend
      .whenGET(/users.impaqgroup.com\/findall/)
      .respond(function () {
        return [200, mockObject.findAll, {}];
      });
    $httpBackend
      .whenPOST(/users.impaqgroup.com\/edit\/.*/)
      .respond(function () {
        return [200, {}, {}];
      });
    $httpBackend
      .whenPOST(/users.impaqgroup.com\/remove\/.*/)
      .respond(function () {
        return [200, {}, {}];
      });

    $httpBackend
      .whenGET(/.*/)
      .passThrough();
    $httpBackend
      .whenPOST(/.*/)
      .passThrough();
  }
})
();
