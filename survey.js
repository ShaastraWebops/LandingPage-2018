var app = angular.module('surveyApp', []);

var workshops = ["Python", "Arduino", "Matlab", "Web Development", "Image Processing", "Machine Learning",
    "Fusion",  "R", "Eagle, PCB Design", "Cosmic Presentation", "Photoshop & Lightroom", "After Effects",
    "E-Commerce", "Ethical Hacking", "Drone Demonstration", "Advanced Programming Workshop"];

app.controller('main', function($http, $scope){

	this.workshop1 = workshops;
	this.workshops = workshops;
	
	this.optionChanged = function(ws){
		w = []
		for(x in workshops)
		{
			if(workshops[x] === ws)
				workshops.splice(w, 1);
		}
	}
	$http.get('http://shaastra.org:8080/api/citys').then(res => {
		this.citys = res.data;
	});

	// this.addCity = function(){
	// 	ws = []
	// 	for(w in workshops)
	// 	{
	// 		ws.push({
	// 			name: workshops[w],
	// 			count:0
	// 		});
	// 	}
	// 	$http.post('http://shaastra.org:8080/api/citys', {
	// 		name: this.city1,
	// 		workshops: ws
	// 	}).then(res => {console.log(res.status);});
	// }

	this.submitForm = function(){
		this.subCity = {
			name: "",
			workshops: []
		};
		
		$http.get('http://shaastra.org:8080/api/citys/'+this.city).then(res => {
			this.subCity = res.data;

			name = this.subCity.name;
			workshops = []
			for(var i=0; i<this.subCity.workshops.length;i++)
			{
				if(this.subCity.workshops[i].name === this.workshop1)
				{
					workshops.push({
						name: this.subCity.workshops[i].name,
						count: this.subCity.workshops[i].count+1
					});
				}
				else if(this.subCity.workshops[i].name === this.workshop2)
				{
					workshops.push({
						name: this.subCity.workshops[i].name,
						count: this.subCity.workshops[i].count+1
					});
				}
				else if(this.subCity.workshops[i].name === this.workshop3)
				{
					workshops.push({
						name: this.subCity.workshops[i].name,
						count: this.subCity.workshops[i].count+1
					});
				}
				else
					workshops.push(this.subCity.workshops[i]);
			}
			
			$http.put('http://shaastra.org:8080/api/citys/'+this.city, {
				name: this.name,
				workshops: workshops
			}).then(res => {
				if(res.status === 200)
				{
					alert('Submitted Successfully');
					window.location = 'http://shaastra.org';
				}
			})
		});		
	}
})