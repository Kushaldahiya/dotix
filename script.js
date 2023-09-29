
const link = document.createElement("link");


link.rel = "stylesheet";
link.type = "text/css";
link.href = "style.css"; 

document.head.appendChild(link);



document.addEventListener("DOMContentLoaded", function() {
    const weatherForm = document.getElementById("weather-form");
    const locationInput = document.getElementById("location-input");
    const weatherData = document.getElementById("weather-data");

    weatherForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        
        const location = locationInput.value.trim();

        if (location === "") {
            alert("Please enter a location.");
            return;
        }

        fetchWeatherData(location);
    });

    function fetchWeatherData(location) {
        const apiKey = '1fa884ed8e886d68e43c565bbc25aed2';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Weather data not found for ${location}`);
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                weatherData.innerHTML = `<p>Error: ${error.message}</p>`;
            });
    }

    function displayWeather(data) {
        const temperature = (data.main.temp - 273.15).toFixed(2); 
        const weatherDescription = data.weather[0].description;
        
        weatherData.innerHTML = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${weatherDescription}</p>
        `;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const weatherForm = document.getElementById("weather-form");
    const locationInput = document.getElementById("location-input");
    const weatherData = document.getElementById("weather-data");

    weatherForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        
        const location = locationInput.value.trim();

        if (location === "") {
            alert("Please enter a location.");
            return;
        }


        fetchWeatherData(location);
    });

    function fetchWeatherData(location) {
        const apiKey = '1fa884ed8e886d68e43c565bbc25aed2';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Weather data not found for ${location}`);
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                displayError(error.message);
            });
    }

    function displayWeather(data) {
        const temperature = (data.main.temp - 273.15).toFixed(2); 
        const weatherDescription = data.weather[0].description;
        
        weatherData.innerHTML = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${weatherDescription}</p>
        `;
    }

    function displayError(errorMessage) {
        weatherData.innerHTML = `<p class="error">${errorMessage}</p>`;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const weatherForm = document.getElementById("weather-form");
    const locationInput = document.getElementById("location-input");
    const unitSelect = document.getElementById("unit-select");
    const weatherData = document.getElementById("weather-data");

    weatherForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const location = locationInput.value.trim();
        const selectedUnit = unitSelect.value;

        if (location === "") {
            alert("Please enter a location.");
            return;
        }

        fetchWeatherData(location, selectedUnit);
    });

    unitSelect.addEventListener("change", function() {
        
        const selectedUnit = unitSelect.value;
        const location = locationInput.value.trim();

        if (location !== "") {
            fetchWeatherData(location, selectedUnit);
        }
    });

    function fetchWeatherData(location, selectedUnit) {
        const apiKey = '1fa884ed8e886d68e43c565bbc25aed2';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${selectedUnit}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Weather data not found for ${location}`);
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data, selectedUnit);
            })
            .catch(error => {
                displayError(error.message);
            });
    }

    function displayWeather(data, selectedUnit) {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
    
        let temperatureInKelvin = temperature;
        let temperatureUnit = "K"; 
    
        if (selectedUnit === "metric") {
            temperatureInKelvin = temperature - 273.15;
            temperatureUnit = "°C";
        } else if (selectedUnit === "imperial") {
            temperatureInKelvin = (temperature - 273.15) * 9/5 + 32;
            temperatureUnit = "°F";
        }
    
        weatherData.innerHTML = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${temperatureInKelvin.toFixed(2)} ${temperatureUnit}</p>
            <p>Description: ${weatherDescription}</p>
        `;
    }
    
    

    function displayError(errorMessage) {
        weatherData.innerHTML = `<p class="error">${errorMessage}</p>`;
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const weatherForm = document.getElementById("weather-form");
    const locationInput = document.getElementById("location-input");
    const unitSelect = document.getElementById("unit-select");
    const weatherData = document.getElementById("weather-data");
    const geolocationCheckbox = document.getElementById("geolocation-checkbox");
    const geolocationButton = document.getElementById("geolocation-button");

    weatherForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const location = locationInput.value.trim();
        const selectedUnit = unitSelect.value; 

        if (location === "") {
            alert("Please enter a location.");
            return;
        }

        fetchWeatherData(location, selectedUnit);
    });

    unitSelect.addEventListener("change", function() {
        const selectedUnit = unitSelect.value;
        const location = locationInput.value.trim();

        if (location !== "") {
            fetchWeatherData(location, selectedUnit);
        }
    });

    geolocationButton.addEventListener("click", function() {
        if (geolocationCheckbox.checked) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const selectedUnit = unitSelect.value; 

                    fetchWeatherDataByGeolocation(latitude, longitude, selectedUnit);
                }, function(error) {
                    displayError("Geolocation error: " + error.message);
                });
            } else {
                displayError("Geolocation is not supported by your browser.");
            }
        }
    });

    function fetchWeatherData(location, selectedUnit) {
        const apiKey = '1fa884ed8e886d68e43c565bbc25aed2';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${selectedUnit}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Weather data not found for ${location}`);
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data, selectedUnit);
            })
            .catch(error => {
                displayError(error.message);
            });
    }

    function fetchWeatherDataByGeolocation(latitude, longitude, selectedUnit) {
        const apiKey = '1fa884ed8e886d68e43c565bbc25aed2';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${selectedUnit}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Weather data not available for your current location.");
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data, selectedUnit);
            })
            .catch(error => {
                displayError(error.message);
            });
    }

    function displayWeather(data, selectedUnit) {
        const temperature = (data.main.temp - 273.15).toFixed(2); 
        const weatherDescription = data.weather[0].description;
        
        weatherData.innerHTML = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${temperature} ${selectedUnit === 'imperial' ? '°F' : '°C'}</p>
            <p>Description: ${weatherDescription}</p>
        `;
    }

    function displayError(errorMessage) {
        weatherData
    }
});

const weatherConditionToImage = {
    "01d": "sunny.png",
    "02d": "partly_cloudy.jpeg",
    "03d": "cloudy.jpeg",
    "04d": "broken_clouds.jpeg",
    "09d": "rain.png",
   

   
};
function displayWeather(data, selectedUnit) {
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;

    const locationElement = document.getElementById("location");
    const temperatureElement = document.getElementById("temperature");
    const descriptionElement = document.getElementById("description");
    const weatherIconElement = document.getElementById("weather-icon");

    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElement.textContent = `${temperature.toFixed(2)} ${selectedUnit === 'imperial' ? '°F' : '°C'}`;
    descriptionElement.textContent = weatherDescription;

    const imageUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;
    weatherIconElement.src = imageUrl;
    weatherIconElement.alt = `Weather Icon for ${weatherDescription}`;

    const weatherImage = document.getElementById("weather-image");
    const imageFileName = weatherConditionToImage[weatherIcon];

    if (imageFileName) {
        weatherImage.src = `images/${imageFileName}`;
        weatherImage.alt = `Weather Image for ${weatherDescription}`;
    }
}

