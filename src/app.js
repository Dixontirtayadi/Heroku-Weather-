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
        message: "What can I help you?"
    })
})

app.get("/about", (req,res) => {
    // res.send("<h1> ABOUT </h1>")
    // res.send({
    //     name: "Dixon",
    //     age: 18
    // })
    res.render("about", {
        title: "About",
        name: "Dixon"
    })
})

app.get("/weather", (req,res) => {
    address = req.query.address
    if (!address) {
        return res.send({
            error: "You must provide an address"
        })
    } else {
        geocode(address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({
                    error: error,
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error,
                    })
                }
                res.send({
                    location,
                    forecastData,
                    address
                })
            })
        })
    }
})

app.get("/help*", (req,res) => {
    res.render("404", {
        errorMessage: "Help article not found",
        title: "Error",
        name: "Dixon"
    })
})

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

