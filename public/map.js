var config = {
  apiKey: "AIzaSyCxd-D1TNpChNnbxUUvwF39c7lglgWvdnw",
  authDomain: "travelmap-a2cb1.firebaseapp.com",
  databaseURL: "https://travelmap-a2cb1.firebaseio.com",
  storageBucket: "travelmap-a2cb1.appspot.com",
  messagingSenderId: "298910337291"
};

firebase.initializeApp(config);


// Initialize the map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat:39.954666912595144 , lng:-101.22070491313934}
  });

  // Create a reference to the tours path in the database.
  var Tours = firebase.database().ref("Tours/");
  // The following function will loop through the firebase objects and Create map markers based on the lat and lng
  Tours.orderByValue().on("value", function(data) {
     data.forEach(function(data) {
        var marker = new google.maps.Marker({
          position: {lat:parseFloat(data.val().lat), lng: parseFloat(data.val().lng)},
          map: map,
          icon:'tour_marker.png'
        });

        // Create an info window that displays Information about each city
        var infowindow = new google.maps.InfoWindow({
          content: data.val().address + '<br>Date: ' + data.val().event_date
        });
        marker.addListener('mouseover', function() {
          infowindow.open(map, marker);
        });

        google.maps.event.addListener(marker, 'mouseout', function(){
          infowindow.close();
        });
     });
  });

  // Create a reference to  the Info path in the database
  var Info = firebase.database().ref("Info/");
  // create map markers based on the values in the info section
  Info.orderByValue().on("value", function(data) {
     data.forEach(function(data) {
        var marker = new google.maps.Marker({
          position: {lat:parseFloat(data.val().lat), lng: parseFloat(data.val().lng)},
          map: map,
          icon:'info_marker.png'
        });
        // Create an info window that displays Information about each city
        var infowindow = new google.maps.InfoWindow({
          content: data.val().address + '<br>Date: ' + data.val().event_date
        });
        marker.addListener('mouseover', function() {
          infowindow.open(map, marker);
        });

        google.maps.event.addListener(marker, 'mouseout', function(){
          infowindow.close();
        });
     });
  });

  // Create a reference to  the Info path in the database
  var Events = firebase.database().ref("Events/");
  // create map markers based on the values in the info section
  Events.orderByValue().on("value", function(data) {
     data.forEach(function(data) {
        var marker = new google.maps.Marker({
          position: {lat:parseFloat(data.val().lat), lng: parseFloat(data.val().lng)},
          map: map,
          icon:'event_marker.png'
        });
        // Create an info window that displays Information about each city
        var infowindow = new google.maps.InfoWindow({
          content: data.val().event_name +'<br>' + data.val().address + '<br>Date: ' + data.val().event_date
        });
        marker.addListener('mouseover', function() {
          infowindow.open(map, marker);
        });

        google.maps.event.addListener(marker, 'mouseout', function(){
          infowindow.close();
        });
     });
  });



}
