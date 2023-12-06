const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const textInput = document.querySelector('.text-input');


const click = search.addEventListener('click', () => {
    const apiKey = '42a2e62a4841fa0bafdeafdb38254961';
    const city = document.querySelector('.search-box input').value;

    if (city == '') {
        return;
    } else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`).then(response => response.json()).then(json => {
            if (json.cod == '404') {
                cityHide.textContent = city;
                
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temp');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent == city) {
                return;
            }
            else {
                cityHide.textContent = city
                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error.classList.remove('active');

                setTimeout(() => {
                    container.classList.add('remove');
                }, 2500)

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = './images/clear.png';
                        break;
                    case 'Rain':
                        image.src = './images/rain.png';
                        break;
                    case 'Snow':
                        image.src = './images/snow.png';
                        break;
                    case 'Clouds':
                        image.src = './images/cloud.png';
                        break;
                    case 'Mist':
                        image.src = './images/mist.png';
                        break;
                    case 'Haze':
                        image.src = './images/mist.png';
                        break;
    
                    default:
                        image.src = './images/cloud.png';
                }
    
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}`;
                wind.innerHTML = `${parseInt(json.wind.speed)}m/h`;
            }
        });
    }
});

textInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
			search.dispatchEvent(new Event('click'));
	}
});