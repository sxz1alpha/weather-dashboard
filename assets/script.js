// global variables and constants

const cities = []

const oneCallApiKey = "081e711590f1083ac8b437b34a9f78c3";
//units
const IMPERIAL = true;
//weather codes arrays
const tsArray = ['200', '201', '202', '210', '211', '212', '221', '230', '231']
const dzArray = ['300', '301', '302', '310', '311', '312', '313', '314', '321']
const raArray = ['500', '501', '502', '503', '504', '520', '521', '522', '531']
const snArray = ['600', '601', '602', '611', '612', '613', '615', '616', '620', '621', '622']
const atArray = ['701', '711', '721', '731', '741', '751', '761', '762', '771', '781']
const clArray = ['801', '802', '803', '804']


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
  
  // icon code array search function for current weather
  let current = `${weather.current.weather[0].id}`
  let ts = tsArray.find(findTsCode);
  let dz = dzArray.find(findDzCode);
  let ra = raArray.find(findRaCode);
  let sn = snArray.find(findSnCode);
  let at = atArray.find(findAtCode);
  let cl = clArray.find(findClCode);
  
  function findTsCode(code) {
    return code === current
  }
  function findDzCode(code) {
    return code === current
  }
  function findRaCode(code) {
    return code === current
  }
  function findSnCode(code) {
    return code === current
  }
  function findAtCode(code) {
    return code === current
  }
  function findClCode(code) {
    return code === current
  }
  
  //appends the data from the api to the id fields in the main display container
  $('#date span').html(moment().calendar('L'));
  $('#temp span').html(`${weather.current.temp} ${IMPERIAL ? "˚F" : "˚C"}`);
  $('#wind span').html(`${weather.current.wind_speed} ${IMPERIAL ? "mph" : "m/s"} `);
  $('#uv span').html(weather.current.uvi);
  $('#hum span').html(`${weather.current.humidity} % `);
  $('#weather-description').html(`${weather.current.weather[0].description}`)
  
  //adjusts the UV index background color according to the value
  if (weather.current.uvi < 3) {
    $(`#uv span`).addClass(`bg-success`).removeClass(`bg-warning`).removeClass('bg-danger')
  } else if (weather.current.uvi < 6 && weather.current.uvi > 3) {
    $(`#uv span`).addClass(`bg-warning`).removeClass(`bg-success`).removeClass('bg-danger')
  } else {
    $(`#uv span`).addClass(`bg-danger`).removeClass(`bg-success`).removeClass('bg-warning')
  }

  //determines which weather icon to append in the current weather icon section
  //thunderstorm codes
  if (current == ts) {
    $(`#weather-icon`).html(`<i class="fas fa-poo-storm fa-10x m-5"></i>`);
    console.log(current)
  } 
  //drizzle codes
  else if (current == dz) {
    $(`#weather-icon`).html(`<i class="fas fa-cloud-rain fa-10x m-5"></i>`);
    console.log(current)
  }
  //rain codes
  else if (current == ra) {
    $(`#weather-icon`).html(`<i class="fas fa-cloud-showers-heavy fa-10x m-5"></i>`);
  }
  //snow codes
  else if (current == sn) {
    $(`#weather-icon`).html(`<i class="fas fa-snowflake fa-10x m-5"></i>`);
  }
  //atmosphere codes
  else if (current == at) {
    $(`#weather-icon`).html(`<i class="fas fa-smog fa-10x m-5"></i>`);
  }
  //cloud codes
  else if (current == cl) {
    $(`#weather-icon`).html(`<i class="fas fa-cloud fa-10x m-5"></i>`);
  }
  //clear codes
  else {
    $(`#weather-icon`).html(`<i class="fas fa-sun fa-10x m-5"></i>`);
  }
  
  // appends the data from the forecast api to the data fields in the 5 day containers
  for (let i = 0; i < 5; i++) {
    //icon array search functionality for daily weather
    let daily = `${weather.daily[i].weather[0].id}`
    let ts = tsArray.find(findTsCode);
    let dz = dzArray.find(findDzCode);
    let ra = raArray.find(findRaCode);
    let sn = snArray.find(findSnCode);
    let at = atArray.find(findAtCode);
    let cl = clArray.find(findClCode);
  
    function findTsCode(code) {
      return code === daily
    }
    function findDzCode(code) {
      return code === daily
    }
    function findRaCode(code) {
      return code === daily
    }
    function findSnCode(code) {
      return code === daily
    }
    function findAtCode(code) {
      return code === daily
    }
    function findClCode(code) {
      return code === daily
    }
    
    $(`#fivedate${[i]}`).html(moment().add(1, 'days').calendar('L'));
    $(`#fivetemp${[i]} span`).html(`${weather.daily[i].temp.day} ${IMPERIAL ? "˚F" : "˚C"}`)
    $(`#fivewind${[i]} span`).html(`${weather.daily[i].wind_speed} ${IMPERIAL ? "mph" : "m/s"}`)
    $(`#fivehum${[i]} span`).html(`${weather.daily[i].humidity}`)
    
    if (daily == ts) {
      $(`#weather-icon${[i]}`).html(`<i class="fas fa-poo-storm"></i>`);
      console.log(daily)
    } 
    //drizzle codes
    else if (daily == dz) {
      $(`#weather-icon${[i]}`).html(`<i class="fas fa-cloud-rain"></i>`);
      console.log(daily)
    }
    //rain codes
    else if (daily == ra) {
      $(`#weather-icon${[i]}`).html(`<i class="fas fa-cloud-showers-heavy"></i>`);
    }
    //snow codes
    else if (daily == sn) {
      $(`#weather-icon${[i]}`).html(`<i class="fas fa-snowflake"></i>`);
    }
    //atmosphere codes
    else if (daily == at) {
      $(`#weather-icon${[i]}`).html(`<i class="fas fa-smog"></i>`);
    }
    //cloud codes
    else if (daily == cl) {
      $(`#weather-icon${[i]}`).html(`<i class="fas fa-cloud"></i>`);
    }
    //clear codes
    else {
      $(`#weather-icon${[i]}`).html(`<i class="fas fa-sun"></i>`);
    }
  
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

