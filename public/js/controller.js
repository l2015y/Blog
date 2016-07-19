var bloger = angular.module("bloger",['ngRoute']);

bloger.config(['$routeProvider', '$locationProvider', function($routeProvide, $locationProvider){
 $routeProvide
     .when('/',{
         templateUrl: 'templates/home.html',
         controller:'blogerListCtrl'
     })
     .when('/blog',{
         templateUrl: 'templates/blog.html',
         controller:'blogCtrl'
     })
     .when('/blogs/:blogID',{
         templateUrl: '/templates/blog_details.html',
         controller: 'BlogDetalCtrl'
     })
     .otherwise({
         redirectTo: '/'
     });
    $locationProvider.html5Mode(true);
 }]);


bloger.controller("blogerListCtrl", function($scope,$http){
    $http.get('/api/posts').success(function(data,status,headers,config){
        $scope.blogs = data;
        console.log($scope.blogs);
    });
});


bloger.controller('blogCtrl',['$scope','$http', '$location', function($scope, $http, $location) {
    $scope.submitPost = function(newBlog, form_of_blog){
        if(form_of_blog.$valid){
            $http.post('/blog', $scope.newBlog).
                success(function(data){
                    $location.path('/').replace();
                });
        }
    }
}]);


bloger.controller('BlogDetalCtrl',['$scope','$http','$location','$routeParams', function($scope,$http,$location,$routeParams){
    $scope.blogID = $routeParams.blogID;
    $http.get('/api/posts/' + $routeParams.blogID).success(function(data,status,heders,config){
        $scope.blog = data;
    });

    $scope.deletPost = function(){
        $http.delete('/api/post/' + $routeParams.blogID).success(function(data,status,heders,config){
            $location.path('/').replace();
        })
    }
}]);

