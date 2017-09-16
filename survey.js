var app = angular.module('surveyApp', []);

var workshops = [{'name': "Python"}, {'name':"Arduino"}, {'name':"Matlab"}, {'name':"Web Development"}, {'name':"Image Processing"}, {'name':"Machine Learning"},
    {'name':"Fusion"},  {'name':"R"}, {'name':"Eagle, PCB Design"}, {'name':"Cosmic Presentation"}, {'name':"Photoshop & Lightroom"}, {'name':"After Effects"},
   {'name': "E-Commerce"}, {'name':"Ethical Hacking"}, {'name':"Drone Demonstration"}, {'name':"Advanced Programming Workshop"}];

// for(var i=0; i< workshops.length;i++){
// 	workshops[i].selected = false;
// 	console.log(workshops[i]);
// }

app.controller('main', function($http, $scope){

	this.workshop1 = workshops;
	this.workshops = workshops;
	
	this.optionChanged = function(ws){
		w = []
		for(x in workshops)
		{
			// if(workshops[x] === ws)
			// 	workshops[x].selected =true;
			console.log(workshops[x]);
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

	this.filterWorkshop = function(item)
		{			
		return (item!= $scope.workshop11) && (item!= $scope.workshop21);
		}
	this.submitForm = function(){
		this.subCity = {
			name: "",
			workshops: [],
			suggestions: []
		};
		
		$http.get('http://shaastra.org:8080/api/citys/'+this.city).then(res => {
			this.subCity = res.data;

			name = this.subCity.name;
			workshops = [];
			console.log(this.suggestion);
			if(this.suggestion!=null){
				this.subCity.suggestions.push(this.suggestion);
			}


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
			if(this.suggestion!=null){

				$http.put('http://shaastra.org:8080/api/citys/'+this.city, {
				name: this.name,
				workshops: workshops,
				suggestions: this.subCity.suggestions
			}).then(res => {
				if(res.status === 200)
				{
					alert('Submitted Successfully');
					window.location = 'http://shaastra.org';
				}
			})
			}else{
				$http.put('http://shaastra.org:8080/api/citys/'+this.city, {
				name: this.name,
				workshops: workshops,
			}).then(res => {
				if(res.status === 200)
				{
					alert('Submitted Successfully');
					window.location = 'http://shaastra.org';
				}
			})

			}
			
		});		
	}
})