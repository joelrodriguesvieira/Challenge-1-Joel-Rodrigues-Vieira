window.addEventListener('load',main);

function main() {
    getWeatherData();
    setInterval(getCurrentHours, 1000);
};

async function getWeatherData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const cityUser = currentUser.city;
    const apiKey = 'c7215065b30bcc1cfc715a810d1d26dd';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityUser}&appid=${apiKey}&units=metric`);
    const date = await response.json();

    const tagTemp = document.getElementById('temperature');
    const tagCity = document.getElementById('city');
    const tagIcon = document.getElementById('icon-climate');

    const iconClimate = date.weather[0].icon;
    const tempCity = date.main.temp;
    const country = date.sys.country;
    const formattedTempCity = Math.round(tempCity);

    tagTemp.textContent = `${formattedTempCity}°`;
    tagCity.textContent = `${cityUser} - ${country}`;
    tagIcon.src = `https://openweathermap.org/img/wn/${iconClimate}.png`;
};

function getCurrentHours() {
    const tagCurrentHours = document.getElementById('current-hours');
    let currentHours = new Date().getHours();
    let currentMinutes = new Date().getMinutes();

    currentMinutes = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes;
    tagCurrentHours.textContent = `${currentHours}:${currentMinutes}`;       
};