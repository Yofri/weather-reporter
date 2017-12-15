$(document).ready(function(){
  $("#logout-btn").hide();
});

function statusChangeCallback(response) {
  if (response.status === 'connected') {
    testAPI()
  } else {
    console.log('Please login first');
  }
}

function testAPI() {
  FB.login(function(response) {
    if (response.authResponse) {
      FB.api('/me?fields=email, name',
        function (res) {
          axios.post('http://localhost:3000/api/login', {
            accessToken: response.authResponse.accessToken,
            userId: response.authResponse.userID,
            email: res.email,
            name: res.name
          })
          .then((response) => {
            localStorage.setItem('token', response.data);
          })
          .catch((err) => {
            console.log(err);
          })
          $("#login-btn").hide();
          $("#logout-btn").show();
          document.getElementById('getWeather').removeAttribute('disabled');
        }
      )
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  },{scope:'public_profile,email'});
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

$("#logout-btn").click(function(){
  // hapus local storage
  localStorage.removeItem('token');
  FB.logout();
  $(this).hide();
  $("#login-btn").show();
  document.getElementById('getWeather').setAttribute('disabled', '');
})

window.fbAsyncInit = function() {
  FB.init({
    appId      : 387705111686843,
    cookie     : true,
    xfbml      : true,
    version    : 'v2.11'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));