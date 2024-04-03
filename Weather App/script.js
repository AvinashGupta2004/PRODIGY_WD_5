let search = document.getElementById("search-btn");
let container = document.getElementById("main-box");
let weatherBox = document.querySelector(".weather-box");
let notFoundBox = document.querySelector(".not-found");
let image = document.querySelector(".weather-image img");
search.addEventListener("click",()=>{
    const APIKey = "c04a40fa5d552015d83d1538922649e0";
    const city = document.querySelector(".search-box input").value;
    if (city == ""){
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response=>response.json()).then(json=>{
        if (json.cod === "404"){
            container.style.height = "70%";
            weatherBox.style.display = "none";
            notFoundBox.style.display = "block";
            return;
        }
        notFoundBox.style.display = "none";

        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .condition");
        const humidity = document.querySelector(".weather-box #humidity");
        const wind = document.querySelector(".weather-box #wind ");
        switch(json.weather[0].main){
            case "Clear":
                image.src = "./Resources/clear_sunny_day.png";
                break;
            case "Rain":
                image.src = "./Resources/clouds_heavy-rain.png";
                break;
            case "Mist":
                image.src = "./Resources/clouds_light-rain.png";
                break;
            case "Snow":
                image.src = "./Resources/snow-flakes.png";
                break;
            case "Clouds":
            image.src = "./Resources/cloudy.png";
            break;
            case "Haze":
                image.src = "./Resources/windy.png";
                break;
            default:
                image.src = "./Resources/clear_sunny-day.png";
                break;
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}kmph`;
        weatherBox.style.display = "block";
        container.style.height = "70%";
        

    })
});