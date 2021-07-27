const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const id = '&appid=b9ddc59ed8c47a40c65fd58df98c0507&units=metric';

async function displayCityWeather() {
    let city = document.getElementById("citySelect").value;
    if (city == "disabled") {
        alert("You must select a city")
    } else {
        const fullLink = url + city + id;
        const response = await axios.get(fullLink);
        const temp = response.data.main.temp;
        document.getElementById("result").innerHTML = [`The temperature in ${city} is, ${temp}°C`];
    }
}