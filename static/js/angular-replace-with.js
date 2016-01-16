angular.module('ui.replaceWith', []).directive('replaceWith', [
  function() {
    return {
      link: function(scope, elm, attrs) {
        var method, previousVal, tagname;
        if (attrs.replaceWhen == null) {
          return;
        }
        tagname = elm[0].tagName.toLowerCase();
        method = tagname === 'input' || tagname === 'select' || tagname === 'textarea' ? 'val' : 'html';
        previousVal = elm[method]();
        return scope.$watch(attrs.replaceWhen, function(val) {
          return elm[method](!!val ? attrs.replaceWith : previousVal);
        });
      }
    };
  }
]);