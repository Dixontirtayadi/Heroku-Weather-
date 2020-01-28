console.log("Client side javascript file");

const weatherForm = document.querySelector("form")
const userInput = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const messageThree = document.querySelector("#message-3")


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const location = userInput.value
    
    if (location === "") {
        return messageOne.textContent = "Type in an address"
    }

    messageOne.textContent = "Searching..."
    messageTwo.textContent = ""
    messageThree.textContent = ""

    fetch("/weather?address=" + location).then((response) => {
        response.json().then( (data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                const forecast = data.forecastData
                precipType = forecast.currently.precipType

                // If the precipProbability is 0, the precipType will not be defined so we need to define it manually
                if (forecast.currently.precipProbability === 0) {
                    precipType = "rain"
                }
                const summary = "Right now it's " + forecast.currently.summary.toLowerCase() + ". Currently it is " + forecast.currently.temperature + "°C. There is a " + forecast.currently.precipProbability*100 + "% chance of " + precipType 
    
                messageOne.textContent = "Forecast on " + data.location
                messageTwo.textContent = summary + " in the moment."
                messageThree.textContent = forecast.today.summary + " The high today will be " + forecast.today.temperatureHigh + "°C with a low of " + forecast.today.temperatureLow + "°C."
            }
        })
    })
})