// global variables and constants

const cities = []

const oneCallApiKey = "081e711590f1083ac8b437b34a9f78c3";

const IMPERIAL = true;

//callback to display the google api data
const geoCoord = async function() {
  let searchTerm = $(`#search-input`).val();
  
  await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${oneCallApiKey}`)
  .then((response) => {
    response.json().then(res => {
      let data = res[0]
      
      let city = {
        cityName: data.name,
        lat: data.lat,
        lon: data.lon
      }
      cities.push(city);
      fetchCurrentWeather(city)
      .then(weather => showWeather(weather));
      return city;
      // console.log(cities);
    })
    
  })
  .catch(error => {
    console.error(error);
  })  
  
};

//make search functionality that pulls an array of cities from the api

const fetchCurrentWeather = async (city) => {

  const lat = city.lat;
  const lon = city.lon;

  let data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?units=${IMPERIAL ? "imperial" : "metric"}&lat=${lat}&lon=${lon}&appid=${oneCallApiKey}`)
    .then((response) => response.json())
    .then(data => {
      console.log(data);
      return data;

    })
    
    .catch(error => {
      console.error(error);
    });

  return data;


};


const showCity = (cityName) => {
  console.log(cityName);
  // $(`#city-append`).html(`${city.cityName}`);
}

const showWeather = function(weather) {
  let weatherIcon = '';
  //appends the data from the api to the id fields in the main display container
  $('#date span').html(moment().calendar('L'));
  $('#temp span').html(`${weather.current.temp} ${IMPERIAL ? "˚F" : "˚C"}`);
  $('#wind span').html(`${weather.current.wind_speed} ${IMPERIAL ? "mph" : "m/s"} `);
  $('#uv span').html(weather.current.uvi);
  $('#hum span').html(`${weather.current.humidity} % `);
  
  // appends the data from the forecast api to the data fields in the 5 day containers
  for (let i = 0; i < 5; i++) {
    $(`#fivedate${[i]}`).html(moment().add(1, 'days').calendar('L'));
    $(`#fivetemp${[i]} span`).html(`${weather.daily[i].temp.day} ${IMPERIAL ? "˚F" : "˚C"}`)
    $(`#fivewind${[i]} span`).html(`${weather.daily[i].wind_speed} ${IMPERIAL ? "mph" : "m/s"}`)
    $(`#fivehum${[i]} span`).html(`${weather.daily[i].humidity}`)
  }

  if (`${weather.current.weather[0].main}` == `Clear`) {
    $(`#weather-icon`).append(`<i class="fas fa-cloud-showers-heavy fa-10x m-5"></i>`);
  } else {
    $(`#weather-icon`).html(``)
  }
}
// make an for loop that cycles through all of the array objects and runs 2 other functions

    // saveLocal();
    // append

//save to local storage function
// saveLocal = function() {
//     localStorage.setItem(city, JSON.stringify(cities));
// };

// load function
// loadLocal = function() {
//     cities = JSON.parse(localStorage.getItem("weather"));
//     //if local storage is null or undevined this creates an empty array
//     if (!cities) {
//         cities = [];
//     }

// }

// make an on click function that clears the display and forecast sections and re-applys the data and 5 day forecast
// possible a second array need to look at api data

$(`#search`).click(async function(event) {
    event.preventDefault();
    let search_input = $(`#search-input`).val();
    
    geoCoord();

    // if (city in cities) {
    //   fetchWeather(cities[city])
    // } else {
    //   cities[city] = geoCoord(city);
    // }

    $(`.favorites`).append(`
      <button class="col col-12 btn btn-info mt-2 mb-2 text-dark border-dark"><h4>${search_input}</h4></button>
    `).click((e) => {
      
      let cityName = (e.target.outerText);
      let matchingCity = {}
      // cycles through all of the object named city in the cities arry and looks for the name property
      // when it finds one with the same name as the e.target.outerText it overwrites the block scoped
      //matching cities object with that city object then runs 
      for (city of cities) {
        
        if (city.cityName.toLowerCase() == cityName.toLowerCase()) {
          matchingCity = city
        }
      } 
      fetchCurrentWeather(matchingCity)
      .then(weather => showWeather(weather))
    })
});

