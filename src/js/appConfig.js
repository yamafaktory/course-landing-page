//  Configuration

export function appConfig ($httpProvider, $locationProvider, $routeProvider, $sceDelegateProvider) {
  //  Settings
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $locationProvider.html5Mode(true);
  //  Allow loading from outer templates domain
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://d2mtuel436pcq3.cloudfront.net/**'
  ]); 
  //  Routes
  $routeProvider.
    when('/', {
      templateUrl   : '/html/landing-page.html',
      controller    : 'LandingController',
      controllerAs  : 'landing',
      resolve       : {
        load : function ($route, ContentFactory) {
          return ContentFactory.getData();
        }
      }
    }).
    otherwise({
      redirectTo    : '/'
    });
}
