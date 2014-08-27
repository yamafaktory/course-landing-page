//  Controllers module

/**
 * HeaderController
 * @ngInject
 */
function HeaderController ($rootScope, $scope) {
  var unbind = $rootScope.$on('logo', (event, url) => {
    this.logo = url;
  });
  $scope.$on('$destroy', unbind);
}

/**
 * LandingController
 * @ngInject
 */
function LandingController ($rootScope, ContentFactory) {
  //  Send logo url to HeaderController
  ContentFactory.getData()
  .finally( () => {
    $rootScope.$emit('logo', ContentFactory.data.logo);
  });
  //  Inject data from ContentFactory into the scope
  this.hero = ContentFactory.data.hero;
  this.description = ContentFactory.data.description;
  this.instructor = ContentFactory.data.instructor;
  this.testimonials = ContentFactory.data.testimonials;
  this.curriculum = ContentFactory.data.curriculum;
  this.faq = ContentFactory.data.faq;
  //  Init state of video control
  this.hero.showControl = true;
}

//  Export as appControllers
export let appControllers = angular.module('appControllers', [])
  //  Attach controllers
  .controller('HeaderController', HeaderController)
  .controller('LandingController', LandingController);
  