var enteredZip = document.querySelector('#zipCode');  //zip is the value from the zip input field in form
var zip;
var submit = document.querySelector('#button');
var location = document.querySelector('#location');

submit.addEventListener('click', function(){
    zip = enteredZip.value;
    var url = 'https://api.wunderground.com/api/e948aefbd9d71dd2/forecast/q/' + zip + '.json';
    var locationData = 'http://api.wunderground.com/api/e948aefbd9d71dd2/geolookup/q/autoip.json';

    
    getJSON(url, function(res){

      var result1 = document.querySelector('.result1');
      var result2 = document.querySelector('.result2');
      var result3 = document.querySelector('.result3');
      var result4 = document.querySelector('.result4');

      var data1 = createArray(res.forecast.simpleforecast.forecastday)[0];
        result1.appendChild(createList(data1));
      var data2 = createArray(res.forecast.simpleforecast.forecastday)[1];
        result2.appendChild(createList(data2));
      var data3 = createArray(res.forecast.simpleforecast.forecastday)[2];
        result3.appendChild(createList(data3));
      var data4 = createArray(res.forecast.simpleforecast.forecastday)[3];
        result4.appendChild(createList(data4));
    });
  
    getJSON(locationData, function(res){
      var locationContainer = document.querySelector('#locationContainer');
      var cityState = createHeader(res.location.city+', '+res.location.state);
      
      locationContainer.appendChild(cityState);
    })
});

location.addEventListener('click', function(){
    var locationData = 'http://api.wunderground.com/api/e948aefbd9d71dd2/geolookup/q/autoip.json';
    var findZip = locationData.location;
    var url = 'https://api.wunderground.com/api/e948aefbd9d71dd2/forecast/q/' + findZip + '.json';
  
    getJSON(url, function(res){

      var result1 = document.querySelector('.result1');
      var result2 = document.querySelector('.result2');
      var result3 = document.querySelector('.result3');
      var result4 = document.querySelector('.result4');

      var data1 = createArray(res.forecast.simpleforecast.forecastday)[0];
        result1.appendChild(createList(data1));
      var data2 = createArray(res.forecast.simpleforecast.forecastday)[1];
        result2.appendChild(createList(data2));
      var data3 = createArray(res.forecast.simpleforecast.forecastday)[2];
        result3.appendChild(createList(data3));
      var data4 = createArray(res.forecast.simpleforecast.forecastday)[3];
        result4.appendChild(createList(data4));
    });
  
    getJSON(locationData, function(res){
      var locationContainer = document.querySelector('#locationContainer');
      var cityState = createHeader(res.location.city+', '+res.location.state);
      
      locationContainer.appendChild(cityState);
    });
});


function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  xhr.onload = function (){
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
    }
  }

  xhr.send();
}

function createArray(data){
  var filteredArray = [];

  _.forEach(data, function(n){
    var obj =[];
    obj.push(n.icon_url);
    obj.push(n.date.monthname_short+' '+n.date.day+', '+n.date.year);
    obj.push(n.high.fahrenheit);
    obj.push(n.low.fahrenheit);

    filteredArray.push(obj);
  });

  console.log(filteredArray);

  return filteredArray;

}

function createList(array) {
  var docFragment = document.createDocumentFragment();

  _.forEach(array, function(dayMember){

    if(dayMember[0]==='h') {
      var li = document.createElement('li');
      var img = document.createElement('img');
      img.src = dayMember;
      li.appendChild(img);
      docFragment.appendChild(li);
    } else {
      var li = document.createElement('li');
      var text = document.createTextNode(dayMember);
      li.appendChild(text);
      docFragment.appendChild(li);
    }
  });
  
  return docFragment;
}

function createHeader(loc){
  var docFragment = document.createDocumentFragment();
  var text = document.createTextNode(loc);
  docFragment.appendChild(text);
  
  return docFragment;
}