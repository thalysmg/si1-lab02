angular.module("MegaSeries", []).factory("serieService", function($http) {
    var _searchSeries = function(nome) {
        return $http.get("https://omdbapi.com/?t=" + nome + "&apikey=93330d3c");
    }
    return {searchSeries:_searchSeries};
});