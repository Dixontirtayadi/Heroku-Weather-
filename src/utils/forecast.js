const request = require("request")

const forecast = (latitude,longitude,callback) => {
    const url = "https://api.darksky.net/forecast/d018ae19994f4f56543c738379ea380a/" + latitude + "," + longitude + "?units=si"

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("There is no connection to weather service")
        } else if (body.error){
            callback("Unable to find the location")
        } else {
            const {temperature, precipProbability} = body.currently
            const str = body.daily.data[0].summary + " It is currently " + temperature + " degrees out. there is a " + precipProbability*100 + "% chance of rain"
            callback(undefined,str)
        }
    })
}

module.exports = forecast