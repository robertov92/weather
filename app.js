document.addEventListener('DOMContentLoaded', () => {
    let city = document.getElementById('city');
    let temp = document.getElementById('temp')
    let description = document.getElementById('description')
    let weatherImg = document.getElementById('weather-img')
    let weatherBtn = document.getElementById('get-weather')
    weatherBtn.addEventListener('click', getAnotherCity)
    let name = document.getElementById('new-name')
    let format = document.getElementById('format')
    let celFar = document.getElementById('c-f')
    format.checked = false;

    format.addEventListener('change', () => {
        if (celFar.innerText === 'C') {
            const formatTemp = temp.innerText
            temp.innerText = Math.round(formatTemp * (9 / 5)) + 32;
            celFar.innerText = 'F'
        } else {
            const formatTemp = temp.innerText
            temp.innerText = Math.round((formatTemp - 32) * (5 / 9));
            celFar.innerText = 'C'
        }
    })

    name.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            weatherBtn.click();
        }
    });

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeather);
        } else {
            city.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function getWeather(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=8fb6d8a1fed11d8a1a0433cabf99fd70`

        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                city.innerHTML = data.name;
                description.innerHTML = data.weather[0].description
                temp.innerHTML = Math.round(data.main.temp);
                weatherImg.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
                document.body.classList.add(`body${data.weather[0].icon}`)
            }).catch(err => {
                console.log(err)
            });
        fetch()
    }

    function getAnotherCity() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${name.value.trim()}&units=metric&appid=8fb6d8a1fed11d8a1a0433cabf99fd70`;
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                city.innerHTML = data.name;
                description.innerHTML = data.weather[0].description
                temp.innerHTML = Math.round(data.main.temp);
                weatherImg.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
                document.body.className = ''
                document.body.classList.add(`body${data.weather[0].icon}`)
                celFar.innerText = 'C'
                format.checked = false
                name.value = ''
            }).catch((err) => {
                city.innerHTML = 'Please check you input';
                description.innerHTML = 'place not found'
                temp.innerHTML = "?";
                weatherImg.setAttribute('src', `404.png`)
                console.log(err)
            })

    }



    getLocation();

});