var locButton = document.querySelector(".location");

geoLoader = function () {
    navigator.geolocation.getCurrentPosition(function(location){
    var lat = location.coords.latitude;
    var long = location.coords.longitude;
    var API_URL = 'http://api.wunderground.com/api/f1c78006262e1196/forecast10day/conditions/geolookup/q/' + lat + ',' + long + '.json';

    getJSON(API_URL, function (data) {
      var span = document.querySelector('span');
      span.innerHTML = "The current temperature is: " + data.current_observation.temp_f + "º F"
      dayBuilder(data);
  });
  });};

locButton.onclick = geoLoader;
window.onload = geoLoader;

var zipButton = document.querySelector(".button");

zipButton.onclick = function () {
  var zipBox = document.querySelector(".zip").value;
  var API_URL = 'http://api.wunderground.com/api/f1c78006262e1196/forecast/conditions/q/' + zipBox + '.json';
  getJSON(API_URL, function (data) {
    var span = document.querySelector('span');
      span.innerHTML = "The current temperature is: " + data.current_observation.temp_f + "º F"
    dayBuilder(data);
  });
};

function getJSON(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        cb(JSON.parse(this.response));
      } else {
        var span = document.querySelector('span');
      	span.innerHTML = "Whoopse, looks like there was an error... just... go outside and check."
      }
    };

    xhr.send();
  }

/*function getJSONP(url, cb) {
  var jsonpurl = url + '?callback=' + cb;
  var script = '<script src=\"' + url + '"></\script>';
  var script = document.createElement('script');
  document.body.appendChild(script);
}*/


dayBuilder = function (data) {
  for (i=0; i < 5; i++) {
//when you're using nthchild in a loop, don't get confused and think it's in index. Children start at 1. Thus (i+1) below
    var selector = "div.row div:nth-child(" + (i+1) + ")";
    var day = document.querySelector(selector);
    day.style.display = "inline-block";
 //.childnode returns text nodes. An old way of adjusting innerHTML
    var dayNodes = day.children;
   
    dayNodes[0].innerHTML = data.forecast.simpleforecast.forecastday[i].date.weekday;
    dayNodes[1].innerHTML = data.forecast.simpleforecast.forecastday[i].high.fahrenheit + "&deg" + " hi";
    dayNodes[2].src = data.forecast.simpleforecast.forecastday[i].icon_url;
    dayNodes[3].innerHTML = data.forecast.simpleforecast.forecastday[i].low.fahrenheit + "&deg" + " lo";
  }
}
 


