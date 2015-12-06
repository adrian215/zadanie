(function () {
  describe('A editable table field', function () {

    var $compile;
    var $rootScope;

    beforeEach(module('impaq'));

    beforeEach(inject(function ( _$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('should show the directive', function () {
      //given
      $rootScope.value = 'content';
      $rootScope.editMode = false;
      var directive = $compile('<editable-table-field value="value" edit-mode="editMode"></editable-table-field>')($rootScope);

      //when
      $rootScope.$apply();

      //then
      var text = directive.children('.editable-text');
      expect(text.html()).toBe($rootScope.value);
    });

    it('should not be possible to edit', function () {
      //given
      $rootScope.value = 'content';
      $rootScope.editMode = false;
      var directive = $compile('<editable-table-field value="value" edit-mode="editMode"></editable-table-field>')($rootScope);

      //when
      $rootScope.$apply();

      //then
      var text = directive.children('.editable-text');
      expect(text.hasClass('ng-hide')).toBe(false);
      var input = directive.children('.editable-input');
      expect(input.hasClass('ng-hide')).toBe(true);
    });

    it('should be possible to edit', function () {
      //given
      $rootScope.value = 'content';
      $rootScope.editMode = true;
      var directive = $compile('<editable-table-field value="value" edit-mode="editMode"></editable-table-field>')($rootScope);

      //when
      $rootScope.$apply();

      //then
      var text = directive.children('.editable-text');
      expect(text.hasClass('ng-hide')).toBe(true);
      var input = directive.children('.editable-input');
      expect(input.hasClass('ng-hide')).toBe(false);
    });
  })
})();
