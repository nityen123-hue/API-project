const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("search");

const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const date = document.getElementById("date");
const condition = document.getElementById("condition");
const icon = document.getElementById("icon");

const cloud = document.getElementById("cloud");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

function getCurrentDate() {

    const day = new Date();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const d = days[day.getDay()];
    const date = day.getDate();
    const month = months[day.getMonth()];
    const year = day.getFullYear();

    return d + ", " + date + " " + month + " " + year;
}

function getWeather(cityNames) {

    const API = `https://api.weatherapi.com/v1/current.json?key=e26ee2f87b994c98863100552231608&q=${cityNames}`;

    fetch(API).then(res => res.json()).then(data => {
            if (data.error) {
                alert("City Not Found");
                return;
            }

            temperature.innerHTML = data.current.temp_c + "°";
            city.innerText = data.location.name;
            date.innerText = getCurrentDate();
            condition.innerText = data.current.condition.text;
            icon.src = "https:" + data.current.condition.icon;

            cloud.innerText = data.current.cloud + "%";
            humidity.innerText = data.current.humidity + "%";
            wind.innerText = data.current.wind_kph + " km/h";
            pressure.innerText = data.current.pressure_mb + " hPa";

            const weather = data.current.condition.text.toLowerCase();

            const weatherCode = data.current.condition.code;

            if (weatherCode == 1000) {
                document.body.style.backgroundImage = "url('https://t4.ftcdn.net/jpg/01/88/51/73/360_F_188517322_pEA0W3nM4mPtNpAzPnvHOFsvMBhvqWrV.jpg')";
            }
            else if (weatherCode == 1003 || weatherCode == 1006 || weatherCode == 1009) {
                document.body.style.backgroundImage = "url(https://www.shutterstock.com/image-photo/heavily-overcast-sky-dominated-by-260nw-2804511181.jpg)";
            }
            else if (weatherCode == 1063 || weatherCode == 1150 || weatherCode == 1153) {

                document.body.style.backgroundImage = "url('https://t4.ftcdn.net/jpg/01/63/96/63/360_F_163966311_qh3qSk57mw9oLPOklZigzX9zlB5DgdaM.jpg')";
            }
            else if (weatherCode == 1273 || weatherCode == 1276 || weatherCode == 1279) {
                document.body.style.backgroundImage = "url('https://t3.ftcdn.net/jpg/01/95/08/36/360_F_195083635_V7lS6XLNlCbv5fb0ZmaojtXAnZVBadcv.jpg')";
            }
            else if (weatherCode == 1258 || weatherCode == 1255 || weatherCode == 1279 || weatherCode == 1213 || weatherCode == 1219) {
                document.body.style.backgroundImage = "url('https://t3.ftcdn.net/jpg/03/23/77/58/360_F_323775820_1gKSY4OApgfrh2CwbwmRYeG4MD2mR0eI.jpg')";
            }
            else if (weatherCode == 1030 || weatherCode == 1135 || weatherCode == 1147) {
                document.body.style.backgroundImage = "url('https://uploads.actionvfx.com/attachment/1643/medium_Atmospheric_Smoke___Fog_Vol_2.jpg')";
            }
            else {
                document.body.style.backgroundImage = "url('https://static.vecteezy.com/system/resources/thumbnails/014/028/718/small/majestic-closeup-view-of-calm-sea-water-waves-with-orange-sunrise-sunset-sunlight-tropical-island-beach-landscape-exotic-shore-coast-summer-vacation-holiday-amazing-nature-scenic-relax-paradise-photo.jpg')";
            }

        })
}

searchBtn.addEventListener("click", function () {

    const cityNames = searchInput.value.trim();

    if (cityNames === "") {
        alert("Enter City Name");
        return;
    }

    getWeather(cityNames);

});

document.querySelectorAll(".cities p").forEach(function (item) {

    item.addEventListener("click", function () {
        searchInput.value = item.innerText;
        getWeather(item.innerText);
    });

});

getWeather("ahmedabad");



