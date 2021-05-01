// global variables and constants
var cities = [{
    city:"",
    lat: "",
    lon: "" }];
var cities = [];
const oneCallApiKey = "081e711590f1083ac8b437b34a9f78c3";
const googleApiKey = "AIzaSyBycKmZ3ItZc-o4hHdmPv24SdISVO50Bu4";
let lat = 40.758701;
let lon = -111.876183;

//callback to display the google api data
// const geoCoord = function() {
//   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${}&key=${googleApiKey}`)
// };

//make a geo location pull from the google api

//callback to display the one call api data
// const callBack = data => {

//     for (let i = 0; i < data.length; i++) {
//         console.log(data[i])
//     }
// };

//make search functionality that pulls an array of cities from the api
// fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${oneCallApiKey}`)
//     .then(response => response.json())
//     .catch((err) => {
//         console.log(err);
//     })
//     .then(data => callBack(data))

// make an for loop that cycles through all of the array objects and runs 2 other functions

    // saveLocal();
    // append

//save to local storage function
// saveLocal = function() {
//     localStorage.setItem("weather", JSON.stringify(cities));
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

$(`#search`).click(function(event) {
    event.preventDefault();
    geoCoords();
    let city = $(`#query`).val();
    cities.push(city);
    $(`.favorites`).append(`
      <button class="col col-12 btn btn-info mt-2 mb-2 text-dark border-dark">${city}</button>
    `).click(function() {
      //   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${}&key=${}`)
// }
    })
});