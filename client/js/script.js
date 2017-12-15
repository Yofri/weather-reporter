$('#getWeather').click(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
})

function showPosition(position) {
  axios.post('http://localhost:3000/weather', {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  }).then(response => {
    const app = document.getElementById('app')
    const createNode = element => document.createElement(element)
    const appendElement = (parent, elm) => parent.appendChild(elm)

    const div = createNode('div')
    const canvas = createNode('canvas')
    const loc = createNode('span')
    const summary = createNode('span')

    div.className += 'mdl-card mdl-shadow--2dp'
    canvas.setAttribute('id', 'icon')
    canvas.setAttribute('width', '128')
    canvas.setAttribute('height', '128')
    loc.innerHTML = response.data.location
    summary.innerHTML = response.data.summary

    appendElement(app, div)
    appendElement(div, canvas)
    appendElement(div, loc)
    appendElement(div, summary)

    const skycons = new Skycons();
    skycons.add('icon', getIcon());
    skycons.play();

    function getIcon() {
      if (response.data.icon === 'clear-day') {
        return Skycons.CLEAR_DAY
      } else if (response.data.icon === 'clear-night') {
        return Skycons.CLEAR_NIGHT
      } else if (response.data.icon === 'rain') {
        return Skycons.RAIN
      } else if (response.data.icon === 'partly-cloudy-day') {
        return Skycons.PARTLY_CLOUDY_DAY
      } else if (response.data.icon === 'partly-cloudy-night') {
        return Skycons.PARTLY_CLOUDY_NIGHT
      } else if (response.data.icon === 'cloudy') {
        return Skycons.CLOUDY
      } else if (response.data.icon === 'sleet') {
        return Skycons.SLEET
      } else if (response.data.icon === 'snow') {
        return Skycons.SNOW
      } else if (response.data.icon === 'wind') {
        return Skycons.WIND
      } else {
        return Skycons.FOG
      }
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}