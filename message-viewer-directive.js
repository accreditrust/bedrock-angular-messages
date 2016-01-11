/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(brMessagesService, $routeParams) {
  return {
    restrict: 'E',
    scope: {
    },
    templateUrl: requirejs.toUrl(
      'bedrock-angular-messages/message-viewer.html'),
    link: Link
  };

  function Link(scope) {
    var model = scope.model = {};
    model.message = null;

    brMessagesService.get($routeParams.id)
      .then(function(result) {
        model.message = result.data;
        scope.$apply();
      });

    model.view = function(id) {
      $location.url('/messages/' + id);
    };

    model.sortClick = function(field) {
      switch(field) {
        case 'subject':
          model.sorting.subject = (model.sorting.subject === '+') ? '-' : '+';
          model.orderBy = [
            model.sorting.subject + '_id',
            model.sorting.date + 'content.date'
          ];
          break;
        case 'date':
          model.sorting.date = (model.sorting.date === '+') ? '-' : '+';
          model.orderBy = [
            model.sorting.date + 'content.date',
            model.sorting.subject + '_id'
          ];
          break;
      }
    };

  }
}

return {brMessageViewer: factory};

});
