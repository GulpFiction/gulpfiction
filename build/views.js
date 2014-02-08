(function(module) {
try {
  module = angular.module('views');
} catch (e) {
  module = angular.module('views', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('test.html',
    '<p>test</p>');
}]);
})();
