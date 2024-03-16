window.addEventListener('load',main);

function main() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser === null) {
        document.getElementById('head-container').style.display = 'none';
        document.getElementById('container').style.display = 'none';
        document.getElementById('footer-container').style.display = 'none';
        Toastify({
            text: "SORRY! YOU NEED TO BE LOG IN.\nCLICK HERE TO LOG IN!",
            duration: 60000,
            style: {
                background: "#FF0000",
                color: "#fff",
            },
            gravity: "top",
            position: "center",
            onClick: () => {
                window.location.href = 'login.html'
            }
        }).showToast();
        return;
    }
    getWeatherData();
    setInterval(getCurrentHours, 1000);
    getCurrentDate();
    countTime();

    const btnContinueNavigation = document.getElementById('continue-navigation');
    const btnLogOut = document.getElementById('logout');

    btnContinueNavigation.addEventListener('click', () => {
        window.location.href = 'https://www.google.com.br/';
    });
    btnLogOut.addEventListener('click', () => {
        localStorage.setItem('currentUser', null);
        window.location.href = 'login.html';
    });
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

    if (date.message === 'city not found') {
        tagCity.textContent = "City not found";
        const divClimate = document.getElementById('climate');
        divClimate.removeChild(tagIcon)
    } else {
        const iconClimate = date.weather[0].icon;
        const tempCity = date.main.temp;
        const country = date.sys.country;
        const formattedTempCity = Math.round(tempCity);
        tagTemp.textContent = `${formattedTempCity}°`;
        tagCity.textContent = `${cityUser} - ${country}`;
        tagIcon.src = `https://openweathermap.org/img/wn/${iconClimate}.png`;
    }

};

function getCurrentHours() {
    const date = new Date();
    const tagCurrentHours = document.getElementById('current-hours');
    let currentHours = date.getHours();
    let currentMinutes = date.getMinutes();

    currentMinutes = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes;
    tagCurrentHours.textContent = `${currentHours}:${currentMinutes}`;       
};

function countTime() {
    const currentSeconds = document.getElementById('current-seconds');
    let count = 30;
    currentSeconds.textContent = count;

    setInterval(() => {
        count--;
        currentSeconds.textContent = count;

        if (count === 0) {
            window.location.reload(true);
        }
    }, 1000);
};

function getCurrentDate() {
    const allMouths = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const allDaysOfWeek = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
    const currentDate = document.getElementById('current-date');
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentDay = date.getDate();
    const currentMonth = allMouths[date.getMonth()];
    const today = allDaysOfWeek[date.getDay()];

    const formattedDate = `${today}, ${currentDay} de ${currentMonth} de ${currentYear}`;
    currentDate.textContent = formattedDate;
};