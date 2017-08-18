$('#search-button').click(function(e){
  e.preventDefault();
  var userLocation = $('#search-field').val();
	$.ajax({
		url: "https://wanderlust-travel-app.herokuapp.com/api/"+userLocation,
		method: "GET",
		success: function(res) {
			console.log(res);

			var object = res;

			var html = "";

			for (var i = 0; i < object.businesses.length; i++) {
			    html += '<div class="search-results"; style= "display: flex;">' +
			            '<img width ="200px" height = "200px" src=\"' + object.businesses[i].image_url + '\" />' +
			            '<ul style="list-style-type: none;">'+
			            '<li>'+object.businesses[i].name+'</li>' +
			            '<li>'+object.businesses[i].location.display_address.join(', ')+'</li>' +
			            '<li>'+object.businesses[i].display_phone + '</li>' +
			            '<li>' + object.businesses[i].price + '</li>' +
			            '</ul>' +
			            '</div>';

			            
			            
			 mapArray.push({
			 	long: object.businesses[i].coordinates.longitude,
			 	lat: object.businesses[i].coordinates.latitude,
			 	title: object.businesses[i].name
			 });

			} //for loop

			console.log(mapArray);

			$('#placesData').append(html);

		mapArray.forEach(function(el) {
			var markerOne = new google.maps.Marker({
                        position: {lng: el.long, lat: el.lat},
                        //position: {lat: 59.327, lng: 18.067}
                        map: map,
                        animation: google.maps.Animation.DROP,
                        title: el.title
                        });

		});

		}//success function
	}) //ajax call

}); // click
