/* global angular */

angular.module('myModule', ['ngResource'])
    .controller('myController', [ '$scope', '$resource', function($scope, $resource) {
        $scope.initialValue = "This is test.";
        
        // var Posts = $resource('//jsonplaceholder.typicode.com/posts/:postNum', {postNum: '@id'});
        
        // This probably ties the id attributed in the record to the id passed via the POST update.
        var People = $resource('/people/:id', { id: '@id' }, {
            'update' : { method: 'PUT' }
        });

        // This is a test comment. 
        $scope.posts = People.query();
        
        $scope.loadPost = function(id) {
            $scope.post = People.get({ id: id+1 });
        };
        
        $scope.submitPerson = function() {
            $scope.editName = false;
            $scope.editAge = false;
            $scope.editSex = false;
            
            $scope.post.$save();
        }
        
        $scope.savePerson = function(id) {
            console.log("Posting...");
            
            var tmp = People.get({ id: id+1 });
            
            tmp.Name = $scope.post.Name;
            tmp.Age = $scope.post.Age;
            tmp.Sex = $scope.post.Sex;
            
            tmp.$save();
        };
        
        // $scope.posts = Posts.query();
        
        // $scope.loadPost = function(id) {
        //     $scope.post = Posts.get({ postNum: id+1 });
        
        //     console.log($scope.post);
        // };
    }]);