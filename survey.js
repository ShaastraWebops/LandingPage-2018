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
		
		$http.get('http://shaastra.org:8080/api/citys').then(res => {
			this.citys1 = res.data;
			console.log(this.citys1);
			for(var j=0; j<this.citys1.length; j++){
				if(this.citys1[j].name === $scope.user.city.name)
					$scope.user.city.workshops = this.citys1[j].workshops;
			}
		var count1=0,count2=0,count3=0;

		if($scope.user.city.workshops.length!=0){
			for(var i=0; i<$scope.user.city.workshops.length;i++){
				if($scope.user.city.workshops[i].name === $scope.user.workshop1){
					count1 = $scope.user.city.workshops[i].count;
				}
				if($scope.user.city.workshops[i].name === $scope.user.workshop2){
					count2 = $scope.user.city.workshops[i].count;
				}
				if($scope.user.city.workshops[i].name === $scope.user.workshop3){
					count3 = $scope.user.city.workshops[i].count;
				}
			}
		}
		console.log("Entered submitform");
		var workshoplist = [];
		if($scope.user.workshop1!=null)
			workshoplist.push({'name': $scope.user.workshop1, 'count': count1});
		if($scope.user.workshop2!=null)
			workshoplist.push({'name': $scope.user.workshop2, 'count': count2});
		if($scope.user.workshop3!=null)
			workshoplist.push({'name': $scope.user.workshop3, 'count': count3});

		console.log(workshoplist);

		$http.put('http://shaastra.org:8080/api/citys/'+$scope.user.city._id,{
			workshops: workshoplist
		}).then(res => {
		})
		})
		
		
	}
})