angular
  .module('app')
  .controller('DetailController', DetailController);

function DetailController($state, $stateParams, searchData, $timeout) {
  var vm = this;

  vm.filmsLoaded = false;
  vm.charactersLoaded = false;
  vm.result = angular.copy($stateParams.result);
  if (vm.result) {
    if (vm.result.type === 'people') {
      getFilms(vm.result.films);
    } else {
      getPeoples(vm.result.characters);
    }
  }

  function getFilms(films) {
    var count = 0;
    var list = [];
    if (films.length > 0) {
      films.forEach(function (url) {
        searchData.get(url).then(function (ret) {
          count++;
          list.push(ret);
          if (count >= films.length) {
            vm.filmsLoaded = true;
            vm.result.filmlist = list;
          }
        });
      });
    }
  }

  function getPeoples(peoples) {
    var count = 0;
    var list = [];
    if (peoples.length > 0) {
      peoples.forEach(function (url) {
        searchData.get(url).then(function (ret) {
          count++;
          list.push(ret);
          if (count >= peoples.length) {
            vm.charactersLoaded = true;
            vm.result.characterlist = list;
          }
        });
      });
    }
  }
}
