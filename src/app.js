const path = require("path")
const express = require("express")
const hbs = require("hbs")

const app = express()
const port = process.env.PORT || 3000

const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")

//define paths
const viewsPath = path.join(__dirname, "../templates/views")
const staticPath = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname,"../templates/partials")

//Set the handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(staticPath))

// "" can be to specify /index which is the convention
app.get("", (req,res) => {
    res.render("index", {
        title: "Welcome",
        name: "Dixon"
    })
})

app.get("/help", (req,res) => {
    res.render("help", {
        title:"Help",
        name:"Dixon",
        message: "For questions or feedback, click the link below to send me an email"
    })
})

app.get("/about", (req,res) => {
    res.render("about", {
        title: "About",
        name: "Dixon"
    })
})

// Return a JSON File if the link is /weather with provided address
// This is the JSON that we are going to parse to display it to user
app.get("/weather", (req,res) => {
    address = req.query.address
    if (!address) {
        return res.send({
            error: "You must provide an address"
        })
    } else {
        // Rather than passing (error,data) and using data.latitude etc.. 
        // You can pass in objects containing the same name as the return value
        // And it will automatically assigns them.
        geocode(address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({
                    error: error,
                })
            }
            // Call the forecast function to access the Darksky API from the web.
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error,
                    })
                }
                // Send the location from the mapbox, the forecast data, and address as a JSON file 
                // to be parsed later on in the client side javascript.
                res.send({
                    location,
                    forecastData,
                    address,
                })
            })
        })
    }
})

//This is catching everything that is not catched by the /... above
//Since we have not made those extensions yet, it's going to redirect to 404.
app.get("*", (req,res) => {
    res.render("404", {
        errorMessage: "Page not found",
        title: "Error",
        name: "Dixon"
    })
})

app.listen(port, () => {
    console.log("Server started on " + port)
})

