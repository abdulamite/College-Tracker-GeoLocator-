// Initialize the Firebase database module
var config = {
  apiKey: "AIzaSyCxd-D1TNpChNnbxUUvwF39c7lglgWvdnw",
  authDomain: "travelmap-a2cb1.firebaseapp.com",
  databaseURL: "https://travelmap-a2cb1.firebaseio.com",
  storageBucket: "travelmap-a2cb1.appspot.com",
  messagingSenderId: "298910337291"
};
firebase.initializeApp(config);

// Loads in the latitude and the longitude into the text areas
function showResult(result) {
    document.getElementById('latitude').value = result.geometry.location.lat();
    document.getElementById('longitude').value = result.geometry.location.lng();
}

// Uses the addess, passeses it through the google geocoder and passes back the lat and lng
function getLatitudeLongitude(callback, address) {
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0]);
            }
        });
    }
}


// Hiding the latitude and longitude fields now that I am aware the geocoding is correct
$('#latitude').hide();
$('#longitude').hide();

// When the user enters the address, the function will populate the lat and lng areas
var ad = document.getElementById('address');
ad.addEventListener("blur", function () {
    var address = document.getElementById('address').value;
    getLatitudeLongitude(showResult, address);
});

$('#incomplete').hide();

// This takes all of the text areas on the page and pushes the information to the firebase database
var fbbutton = document.getElementById('firebase');
fbbutton.addEventListener("click",function(){
  var event_date = document.getElementById('event_date').value;
  var address = document.getElementById('address').value;
  if(event_date == "" || address == ""){
    $('#incomplete').slideDown(500);
  }
  else{
    var locType = document.getElementById('locType').value;
    if(locType == 'Travel'){
      var address = document.getElementById('address').value;
      var event_name = document.getElementById('event_name').value;
      var event_date = document.getElementById('event_date').value;
      var lat = document.getElementById('latitude').value;
      var lng = document.getElementById('longitude').value;
      firebase.database().ref('Events').push({
        address:address,
        event_name:event_name,
        event_date:event_date,
        lat: lat,
        lng:lng
      });
    }
    else if (locType == 'Tours') {
      var address = document.getElementById('address').value;
      var lat = document.getElementById('latitude').value;
      var lng = document.getElementById('longitude').value;
      var event_date = document.getElementById('event_date').value;
      firebase.database().ref('Tours').push({
        address:address,
        event_date:event_date,
        lat: lat,
        lng:lng
      });
    }
    else{
        var address = document.getElementById('address').value;
        var lat = document.getElementById('latitude').value;
        var lng = document.getElementById('longitude').value;
        var event_date = document.getElementById('event_date').value;
        firebase.database().ref('Info').push({
          address:address,
          event_date:event_date,
          lat: lat,
          lng:lng
        });
      }
      blank();
  }
})

var event_name = document.getElementById('event_name');

// Checks to see if we need an event name for a marker
function changeDisplay(){
  var locType = document.getElementById('locType').value;
  if(locType == 'Tours' || locType == 'Info'){
    event_name.style.display='none';
  }
  else{
    event_name.style.display = 'inline';
  }
}

$('#complete').hide();

// The purpose of the function blank() is to clear the form once the user has submited the form information
function blank(){
  $('#incomplete').slideUp(500);
  $('#complete').slideDown(500);
  document.getElementById("event_date").value = '';
  document.getElementById("address").value = '';
  if(event_name != ''){
    document.getElementById("event_name").value = '';
  }
  document.getElementById('latitude').value = '';
  document.getElementById('longitude').value = '';
  setTimeout(hide_complete,2500);
}

//  hide_complete() is used to slide the complete div back up in order to make use of the setTimeout in the blank() functin
function hide_complete()
{
  $('#complete').slideUp(500);
}
