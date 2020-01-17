const request = require("request")

const forecast = (latitude,longitude,callback) => {
    // This first part of URL is the secret key to access the darksky API.
    const url = "https://api.darksky.net/forecast/d018ae19994f4f56543c738379ea380a/" + latitude + "," + longitude + "?units=si"

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("There is no connection to weather service")
        } else if (body.error){
            callback("Unable to find the location")
        } else {
            // Returns the forecast data as a string.
            const currently = body.currently
            const today = body.daily.data[0]
            callback(undefined, {currently, today} )
        }
    })
}

module.exports = forecast