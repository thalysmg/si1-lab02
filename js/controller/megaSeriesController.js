angular.module("MegaSeries", []).controller("megaSeriesCtrl", function($scope,$http) {

    $scope.listSer = null;
    
    //funcao que retorna uma lista com as series relacionadas
    $scope.searchSeries = function(nome) {   
        $http.get("https://omdbapi.com/?s=" + nome + "&apikey=93330d3c").then(function(response) {
                $scope.listSer = response.data.Search; 
                console.log($scope.listSer);
        }, function (error) {
        
        });
    }
});