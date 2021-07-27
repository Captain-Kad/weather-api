const axios = require("axios");

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

const {By,Key,Builder, Actions} = require("selenium-webdriver");
require("chromedriver");

let testStatus = "---:"

async function testSetUp(cityId){
    //Waits for the browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();

    //Opens my "weather-api" file.
    await driver.get("http://127.0.0.1:5500/coding-projects/Weather%20API/weather-api.html");

    //Selects an option from the dropdown
    await driver.findElement(By.id(cityId)).click();

    //Clicks the button
    await driver.findElement(By.id("button")).click();

    var labelBox = await driver.findElement(By.id("result")).getText();
    console.log(`XXXXXXX${labelBox}`);

    console.log(cityId);

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const id = '&appid=b9ddc59ed8c47a40c65fd58df98c0507&units=metric';
    const fullLink = url + cityId + id;
    const response = await axios.get(fullLink);
    const expectedCityName = response.data.name;

    if(expectedCityName === cityId) {
        testStatus += `Test for ${cityId} Passed\n`
        console.log(`${cityId} Test passed\n`);
    } else {
        testStatus += `Test for ${cityId} Failed\n`
        console.log(`${cityId} Test failed\n`);
      }

    //Tells the browser to wait for 1sec.(1000ms) before quiting
    sleep(1000);

    //It is always a safe practice to quit the browser after execution
    await driver.quit();
}

async function runTest(){
    const sleepDuration = 500
    await testSetUp("Lagos");
    sleep(sleepDuration);
    await testSetUp("New York");
    sleep(sleepDuration);
    await testSetUp("Chicago");
    sleep(sleepDuration);
    await testSetUp("Washington");
    sleep(sleepDuration);
    await testSetUp("Toronto");
    sleep(sleepDuration);
    await testSetUp("Houston");
    sleep(sleepDuration);
    await testSetUp("Phoenix");
    sleep(sleepDuration);
    await testSetUp("Philadelphia");
    sleep(sleepDuration);
    await testSetUp("Mississauga");
    sleep(sleepDuration);
    await testSetUp("Seattle");
    console.log(testStatus, "YYYYYY");
}

runTest();
