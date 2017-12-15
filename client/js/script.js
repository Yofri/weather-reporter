(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}())

function showPosition(position) {
  axios.post('http://localhost:3000/weather', {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  }).then(response => {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

/* if (localStorage.getItem('token') ) {
  document.getElementById('getWeather').removeAttribute('disabled')
} */