angular.module("MegaSeries", []).controller("megaSeriesCtrl", function($scope,$http) {

    $scope.series = [];
    $scope.profileSeries = [];
    $scope.watchList = [];
    $scope.serieID = [];

    //funcao que retorna uma lista com as series relacionadas
    $scope.searchSeries = function(nome) {   
        $http.get("https://omdbapi.com/?s=" + nome + "&type=series&apikey=93330d3c").then(function(response) {
            $scope.series = response.data.Search; 
            console.log($scope.series);
        },  function (error) {
        	
        });
    }

    $scope.addSerieProfile = function(Id) {
        $http.get("https://omdbapi.com/?i=" + Id + "&type=series&apikey=93330d3c").then(function(response) {
            $scope.profileSeries.push(response.data); 
            console.log($scope.profileSeries);
        },  function (error) {

        });
    }

    $scope.addSerieWatchList = function(serie) {
        $scope.watchList.push(serie);
        console.log($scope.watchList);
    }

    $scope.contains = function(array, Id) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == Id) {
                return true;
            }
        }
        return false;
    }

    $scope.setMyRating = function(serie,nota){
        serie.myRating = nota;      
    };

    $scope.setLastEpisode = function(serie,ep){
        serie.lastEpisode = ep;
    }

});