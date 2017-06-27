angular.module("MegaSeries", []).controller("megaSeriesCtrl", function($scope,$http) {

    $scope.series = [];
    $scope.profileSeries = [];
    $scope.watchList = [];
    $scope.serieID = [];

    //flags of the html page 
    $scope.showProfileSeries = true;
    $scope.showSearchedSeries = false;
    $scope.showWatchList = false;

    $scope.showProfileSeries = function() {
        $scope.showProfileSeries = true;
        $scope.showSearchedSeries = false;
        $scope.showWatchList = false;
    }

    $scope.showWatchList = function() {
        $scope.showWatchList = true;
        $scope.showProfileSeries = false;
        $scope.showSearchedSeries = false;
    }

    //funcao que retorna uma lista com as series relacionadas
    $scope.searchSeries = function(nome) {   
        $scope.searchedSeries = {Response: "False"};
        $http.get("https://omdbapi.com/?s=" + nome + "&type=series&apikey=93330d3c").then(function(response) {
            $scope.series = response.data.Search; 
            // console.log($scope.series);
            $scope.searchedSeries = response.data;
            if($scope.searchedSeries.Response == "False") {
                alert("Nenhuma séria com nome " + nome + " encontrada");
            }
            $scope.showSearchedSeries = true;
        });
    }

    $scope.addSerieProfile = function(serie) {
        if ($scope.profileContains(serie.imdbID)) {
            alert("Série já foi adicionada no seu perfil");
        } else { 
            $http.get("https://omdbapi.com/?i=" + serie.imdbID + "&type=series&apikey=93330d3c").then(function(response) {
                $scope.profileSeries.push(response.data); 
                console.log($scope.profileSeries);
                $scope.watchListRemove(serie);
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
            alert("Não foi possível adicionar à sua WatchList: série já adicionada no seu perfil");
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

    $scope.setMyRating = function(serie,nota){
        serie.myRating = nota;      
    };

    $scope.setLastEpisode = function(serie,ep){
        serie.lastEpisode = ep;
    }

});