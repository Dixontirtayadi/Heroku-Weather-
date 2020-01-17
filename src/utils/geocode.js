const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGl4b250aXJ0YXlhZGkiLCJhIjoiY2s0M2xpemZoMDk3NTNmcnVvdHRpdTFmbiJ9.NiUXOJOrSOrQnoVHBGAX8w&limit=1"

    request( { url:url, json:true}, (error, {body}) => {
        if (error) {
            // This "There is no connection" is the error that is return, 
            // {body} will be undefined or empty
            callback("There is no connection")
        } else if (body.features.length === 0) {
            callback("Unable to find the location")
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            // Make the error undefined because we successfully ran the function.
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode