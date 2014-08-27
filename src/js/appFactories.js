//  Factories module

/**
 * ContentFactory
 * @ngInject
 */
function ContentFactory ($http) {
  let ContentFactory = {};
  ContentFactory.data = [];
  ContentFactory.getData = () => {
    return $http.get('/json/data.json', {cache : true})
      .success(data => {
        ContentFactory.data = data;
      })
      .error(() => {
        console.log('error');
      });
  };
  //  Expose the factory
  return ContentFactory;
}

//  Export as appFactories
export let appFactories = angular.module('appFactories', [])
  //  Attach factories
  .factory('ContentFactory', ContentFactory);
