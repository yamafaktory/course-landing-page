//  Directives module

/**
 * curriculum
 * @ngInject
 */
function curriculum () {
  return {
    restrict    : 'E',
    templateUrl : '/html/curriculum.html',
    link        : function ($scope, $element, $attrs) {
      let {control, video, state} = {
        control      : document.querySelector('#curriculum-control'),
        video      : document.querySelector('#curriculum-video'),
        state       : false
      };
      control.addEventListener('click', () => {
        if(!state) {
          video.play();
          state = true;
        } else {
          video.pause();
          state = false;
        }
      });
    }
  };
}

/**
 * description
 * @ngInject
 */
function description () {
  return {
    restrict    : 'E',
    templateUrl : '/html/description.html'
  };
}

/**
 * enroll
 * @ngInject
 */
function enroll () {
  return {
    restrict    : 'E',
    templateUrl : '/html/enroll.html'
  };
}

/**
 * faq
 * @ngInject
 */
function faq () {
  return {
    restrict    : 'E',
    templateUrl : '/html/faq.html'
  };
}

/**
 * hero
 * @ngInject
 */
function hero () {
  return {
    restrict    : 'E',
    templateUrl : '/html/hero.html',
    link        : function ($scope, $element, $attrs) {
      let {hero, video, state} = {
        hero  : document.querySelector('#hero-video-container'),
        video : document.querySelector('#hero-video'),
        state  : false
      };
      hero.addEventListener('click', () => {
        if(!state) {
          video.play();
          state = true;
        } else {
          video.pause();
          state = false;
        }
      });
    }
  };
}

/**
 * instructor
 * @ngInject
 */
function instructor () {
  return {
    restrict    : 'E',
    templateUrl : '/html/instructor.html'
  };
}

/**
 * lecture
 * @ngInject
 */
function lecture () {
  return {
    restrict    : 'E',
    templateUrl : '/html/lecture.html'
  };
}

/**
 * questionAndAnswer
 * @ngInject
 */
function questionAndAnswer () {
  return {
    restrict    : 'E',
    templateUrl : '/html/question-and-answer.html'
  };
}

/**
 * quote
 * @ngInject
 */
function quote () {
  return {
    restrict    : 'E',
    templateUrl : '/html/quote.html'
  };
}

/**
 * testimonials
 * @ngInject
 */
function testimonials () {
  return {
    restrict    : 'E',
    templateUrl : '/html/testimonials.html'
  };
}

/**
 * trust
 * @ngInject
 */
function trust () {
  return {
    restrict    : 'E',
    templateUrl : '/html/trust.html'
  };
}

//  Export as appDirectives
export let appDirectives = angular.module('appDirectives', [])
  //  Attach directives
  .directive('curriculum', curriculum)
  .directive('description', description)
  .directive('enroll', enroll)
  .directive('faq', faq)
  .directive('hero', hero)
  .directive('instructor', instructor)
  .directive('lecture', lecture)
  .directive('questionAndAnswer', questionAndAnswer)
  .directive('quote', quote)
  .directive('testimonials', testimonials)
  .directive('trust', trust);
