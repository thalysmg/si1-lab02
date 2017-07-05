angular.module("MegaSeries", []).controller("megaSeriesCtrl", function($scope,$http) {

    $scope.series = [];
    $scope.profileSeries = [];
    $scope.watchList = [];
    $scope.serieID = [];
    $scope.searchedSeries = {Response: "False"};
    
    //funcao que retorna uma lista com as series relacionadas
    $scope.searchSeries = function(nome) {   
        $scope.searchedSeries = {Response: "False"};
        $http.get("https://omdbapi.com/?s=" + nome + "&type=series&apikey=93330d3c").then(function(response) {
            $scope.series = response.data.Search; 
            console.log($scope.series);
            $scope.searchedSeries = response.data;
            if($scope.searchedSeries.Response == "False") {
                alert("Nenhuma séria com nome " + nome + " encontrada");
            }
        });
    }

    $scope.addSerieProfile = function(serie) {
        if ($scope.profileContains(serie.imdbID)) {
            alert("Não foi possível adcionar a série ao seu perfil: " + serie.Title + " já foi adicionada anteriormente");
        } else { 
            $http.get("https://omdbapi.com/?i=" + serie.imdbID + "&type=series&apikey=93330d3c").then(function(response) {
                $scope.profileSeries.push(response.data); 
                console.log($scope.profileSeries);
                if ($scope.watchListContains(serie.imdbID)) {
                    $scope.watchListRemove(serie);
                }
            },  function (error) {

            });  
        };
    };

    $scope.profileRemove = function(serie){
        var confirmacao = confirm("Tem certeza que deseja remover " + serie.Title + " do seu perfil?");
        if(confirmacao){
            var pos = $scope.profileSeries.indexOf(serie);
            $scope.profileSeries.splice(pos,1);
        };
    };

    $scope.addSerieWatchList = function(serie) {
        if ($scope.profileContains(serie.imdbID)) {
            alert("Não foi possível adicionar a série à sua WatchList: " + serie.Title + " já foi adicionada ao seu perfil");
        } else if ($scope.watchListContains(serie.imdbID)) {
            alert("Não foi possível adicionar a série à sua WatchList: " + serie.Title + " já foi adicionada à sua watchList");
        } else {
            $scope.watchList.push(serie);
            console.log($scope.watchList);
        };
    }

    $scope.watchListRemove = function(serie){
        var pos = $scope.watchList.indexOf(serie);
        $scope.watchList.splice(pos,1);
    };

    $scope.profileContains = function(Id){
        for (var i = 0; i < $scope.profileSeries.length; i++) {
            if ($scope.profileSeries[i].imdbID === Id){
                return true;
            }
        }
        return false;
    };

     $scope.watchListContains = function(Id){
        for (var i = 0; i < $scope.watchList.length; i++) {
            if ($scope.watchList[i].imdbID === Id){
                return true;
            }
        }
        return false;
    };

    $scope.setMyRating = function(serie,nota){
        serie.myRating = nota;      
    };

    $scope.setLastEpisode = function(serie,ep){
        serie.lastEpisode = ep;
    }

});