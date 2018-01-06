$(document).ready(function() {
    let location = $('#location');
    const msg = 'Sorry, we were unable to get your location';
    let cTemp = '';
    let fTemp = '';
    let weather = '';

    if (navigator.geolocation) {
        // Run statements that use geolocation
        navigator.geolocation.getCurrentPosition(success, fail);

        $('#lat').text('Getting location...');

    } else {
        // Run statements that do not use geolocation
        location.text(msg);
    }

    function success(position) {
        // success code
        $('#lat').text((position.coords.latitude).toFixed(2));
        $('#lon').text((position.coords.longitude).toFixed(2));
        
        // creates variables for location and passes them to a function
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeather(lat, lon);
    }

    function fail(msg) {
        // fail code
        location.text(msg);
    }

    function getWeather(lat, lon) {
        // AJAX request to get the weather based on location
        const xhr = new XMLHttpRequest();
        const url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon;

        let responseObject = '';
        
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                responseObject = JSON.parse(xhr.responseText);
                $('#location').text(responseObject.name + ', ' + responseObject.sys.country);
                $('#temp').text(responseObject.main.temp.toFixed(1));
                $('#weather').text(responseObject.weather[0].description);
                cTemp = responseObject.main.temp;
                weather = responseObject.weather[0].main;
                setImage(weather);
            }
        };

        xhr.open('GET', url, true,);
        xhr.send(null);
    }

    function setImage(weather) {
        if (weather === 'Clear') {
            $('.weather').css('background-image', "url('http://www.nakcsus.org/codecamp/weather-api/images/clear.jpeg')");
        } else if (weather === 'Rain') {
            $('.weather').css('background-image', "url('http://www.nakcsus.org/codecamp/weather-api/images/rain.jpg')");
        } else if (weather === 'Clouds') {
            $('.weather').css('background-image', "url('http://www.nakcsus.org/codecamp/weather-api/images/part-cloudy.jpeg')");
        } else if (weather === 'Mist') {
            $('.weather').css('background-image', "url('http://www.nakcsus.org/codecamp/weather-api/images/cold.jpeg')");
        } else if (weather === 'Snow') {
            $('.weather').css('background-image', "url('http://www.nakcsus.org/codecamp/weather-api/images/clear.jpeg')");
        } else {
            $('.weather').css('background-image', "url('http://www.nakcsus.org/codecamp/weather-api/images/clear.jpeg')");
        }
    }

    $('button').on('click', function() {
        if ($('button').text() === 'Show Fahrenheit') {
            fTemp = cTemp * 1.8 + 32;
            $('#temp').text(fTemp.toFixed(1));
            $('#unit').html('&#8457');
            $('button').text('Show Celcius');
        } else {
            $('#temp').text(cTemp.toFixed(1));
            $('#unit').html('&#8451');
            $('button').text('Show Fahrenheit');
        }
    });

});

