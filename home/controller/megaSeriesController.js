angular.module("MegaSeries", []).controller("megaSeriesCtrl", function($scope,$http) {

    $scope.series = [];
    $scope.perfil = [];
    
    //funcao que retorna uma lista com as series relacionadas
    $scope.searchSeries = function(nome) {   
        $http.get("https://omdbapi.com/?s=" + nome + "&apikey=93330d3c").then(function(response) {
                $scope.series = response.data.Search; 
                console.log($scope.series);
        },  function (error) {
        	
            });
    }
});