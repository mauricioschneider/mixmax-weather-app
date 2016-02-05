// Credits:
// I took some code from simpleWeather's examples.
// Loader is from http://projects.lukehaas.me/css-loaders/
// Base CSS for the form is from kreativo.se

// Poluting window with vars is no biggie in this case
var weatherData,
  params = {
    location: null,
    days: null
  },
  loader = '<div class="loader">Our oracle is querying the Gods.</div>';

if ("geolocation" in navigator) {
  $('.js-geolocation').show();
} else {
  $('.js-geolocation').hide();
}

// Helpers

function resetForecast() {
  $('#forecast').val(1);
}

function fetchWeatherData() {
  var city = $('#city').val();
  var days = $('#forecast').val();
  loadWeather(city, null, days);
}

$(document).ready(function() {

  params.days = 1;

  $('#control-container').on('submit', function() {
    fetchWeatherData();
  })

  $('.search').on('click', function() {
    fetchWeatherData();
  })

  $('.cancel').on('click', function() {
    Mixmax.cancel();
  });

  $('.insert').on('click', function() {
    Mixmax.done(params);
  });

  /* Where in the world are you? */
  $('.js-geolocation').on('click', function() {
    resetForecast();
    $('#weather').html(loader);

    navigator.geolocation.getCurrentPosition(function(position) {
      loadWeather(position.coords.latitude + ',' + position.coords.longitude); //load weather using your lat/lng coordinates
    });
  });

  var queryParams = URI.parseQuery(window.location.href);
  var parsed = queryParams.data ? JSON.parse(queryParams.data) : queryParams;;

  var defaultCity = parsed.location || 'San Francisco',
    defaultDays = parsed.days || 1;
  console.log(queryParams)

  $('#city').val(defaultCity);
  $("#forecast").val(defaultDays);

  loadWeather(defaultCity, '', defaultDays); //@params location, woeid

  $('#forecast').on('input', function(ev) {
    var days = $(ev.currentTarget).val();
    params.days = days;

    // We might as well call loadWeather, but for demo purposes
    // we will use data already in memory to avoid extra API calls.
    $('#weather').html(generateHtml(weatherData, days))
  })
});

function loadWeather(location, woeid, days) {
  // Since the plugin has no hook for before sending ajax data
  // we manually inject the loader before the request
  $('#weather').html(loader);

  // Store attrs values for resolver
  params.location = location;
  params.days = days;

  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      // cache weather data in memory for html regeneration
      weatherData = weather;

      var html = generateHtml(weather, days),
        forecastInput = $('#forecast');

      if (weather.forecast && weather.forecast.length > 1) {
        forecastInput.attr('max', weather.forecast.length);
        forecastInput.show();
      } else {
        forecastInput.hide();
      }

      $('#control-container').show();
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>' + error + '</p>');
    }

  });

}

function generateHtml(weather, days) {
  var html = '';

  if (days > 1) {
    var len = weather.forecast.length;

    if (len == 0 || days > len) {
      return '<p class="error">The dark side clouds everything. Impossible to see the future is.</p>'
    }

    html += '<ul><li>' + getFullLocation() + '</li></ul>';
    for (var i = 0; i < days; i++) {
      html += gimmeTheWidget(weather.forecast[i]);
    }
  } else {
    html = gimmeTheWidget(weather);
  }

  return html;

  // Nested, so we keep semantic context
  function gimmeTheWidget(data) {
    var widget = '',
      containerClass = days > 1 ? 'weather-small' : 'weather-big',
      container = '<div class="' + containerClass + '">';

    if (data.temp) {
      widget = '<h2><i class="icon-' + data.code + '"></i> ' + data.temp + '&deg;' + data.units.temp + '</h2>';
    } else {
      widget = '<h2><i class="icon-' + data.code + '"></i> ' + data.high + '&deg;F / ' + data.low + '&deg;F' + '</h2>'
    }
    var extraData;
    // It's forecast
    if (!data.city) {
      extraData = data.date;
    } else {
      extraData = getFullLocation();
    }
    widget += '<ul><li>' + extraData + '</li>';

    if (data.currently) {
      widget += '<li class="currently">' + data.currently + '</li>';
    }

    return container + widget + '</div>';
  }

  function getFullLocation() {
    var fullLocation = weather.city + ', ' + (weather.region ? weather.region + ', ' : '') + weather.country;
    console.log(fullLocation);
    return fullLocation;
  }
}
