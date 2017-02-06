angular
  .module('app')
  .controller('DetailController', DetailController);

function DetailController($state, $stateParams, searchData, $log) {
  var vm = this;

  vm.result = angular.copy($stateParams.result);
  if (vm.result) {
    if (vm.result.type === 'people') {
      getFilms(vm.result.films);
    } else {
      getPeoples(vm.result.characters);
    }
  }

  function getFilms(films) {
    vm.result.filmlist = [];
    if (films.length > 0) {
      films.forEach(function (url) {
        searchData.get(url).then(function (ret) {
          vm.result.filmlist.push(ret);
        });
      });
    }
  }

  function getPeoples(peoples) {
    vm.result.characters = [];
    if (peoples.length > 0) {
      peoples.forEach(function (url) {
        searchData.get(url).then(function (ret) {
          vm.result.characters.push(ret);
        });
      });
    }
  }
}
