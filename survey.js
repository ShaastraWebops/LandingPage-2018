var app = angular.module('surveyApp', []);

var workshops = ["Python", "Arduino", "Matlab", "Web Development", "Image Processing", "Machine Learning",
    "Fusion",  "R", "Eagle, PCB Design", "Cosmic Presentation", "Photoshop & Lightroom", "After Effects",
    "E-Commerce", "Ethical Hacking", "Drone Demonstration", "Advanced Programming Workshop"];

app.controller('main', function($http, $scope){

	this.workshops = workshops;
	
	$http.get('http://shaastra.org:8080/api/citys').then(res => {
		this.citys = res.data;
		console.log(this.citys);
	})

	this.submitForm = function(){

		console.log("Entered submitform");
		var workshoplist = [];
		if($scope.user.workshop1!=null)
			workshoplist.push({'name': $scope.user.workshop1});
		if($scope.user.workshop2!=null)
			workshoplist.push({'name': $scope.user.workshop2});
		if($scope.user.workshop3!=null)
			workshoplist.push({'name': $scope.user.workshop3});

		console.log(workshoplist);

		$http.put('http://shaastra.org:8080/api/citys/'+$scope.user.city._id,{
			workshops: workshoplist
		}).then(res => {
		})
	}
})