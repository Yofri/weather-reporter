(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}())

function showPosition(position) {
  // console.log(position.coords.latitude)
  // console.log(position.coords.longitude)
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