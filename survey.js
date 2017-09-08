var app = angular.module('surveyApp', []);

var workshops = ["Python", "Arduino", "Matlab", "Web Development", "Image Processing", "Machine Learning",
    "Fusion",  "R", "Eagle, PCB Design", "Cosmic Presentation", "Photoshop & Lightroom", "After Effects",
    "E-Commerce", "Ethical Hacking", "Drone Demonstration", "Advanced Programming Workshop"];

app.controller('main', function($http){

	this.workshops = workshops;
	
	$http.get('http://shaastra.org:8080/api/citys').then(res => {
		this.citys = res.data;
		console.log(this.citys);
	})
})