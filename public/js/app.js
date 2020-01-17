console.log("Client side javascript file");

const weatherForm = document.querySelector("form")
const userInput = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const location = userInput.value
    
    if (location === "") {
        return messageOne.textContent = "Type in an address"
    }

    messageOne.textContent = "Searching..."
    messageTwo.textContent = ""

    fetch("/weather?address=" + location).then((response) => {
        response.json().then( (data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = "Forecast on " + data.location
                messageTwo.textContent = data.forecastData
            }
        })
    })
})