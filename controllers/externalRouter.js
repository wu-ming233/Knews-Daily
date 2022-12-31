const externalRouter = require('express').Router()

externalRouter.get('/headlines/:section', async (request, response) => {
    let result = await fetch("https://content.guardianapis.com/search?" + new URLSearchParams({
        "api-key": process.env.REACT_APP_GUARDIAN_API,
        "show-fields": "all",
        "lang": "en",
        "section": request.params.section,
        "format": "json",
        "page-size": 20
    }));
    if (result.ok) {
        result = await result.json();
        return response.status(200).json(result);
    }
    // console.log(result);
    return response.status(400).json({ error: "bad request" });
})

externalRouter.get('/coords/:location', async (request, response) => {
    let result = await fetch("https://api.openweathermap.org/geo/1.0/direct?" + new URLSearchParams({
        appid: process.env.REACT_APP_WEATHER_API,
        q: request.params.location,
    }));
    if (result.ok) {
        result = await result.json();
        // console.log(result);
        return response.status(200).json(result);
    }
    return response.status(400).json({ error: "bad request" });
})

externalRouter.get('/weather/:lat/:lon', async (request, response) => {
    let result = await fetch("https://api.openweathermap.org/data/2.5/weather?" + new URLSearchParams({
        "lat": request.params.lat,
        "lon": request.params.lon,
        "units": "metric",
        "appid": process.env.REACT_APP_WEATHER_API
    }));
    if (result.ok) {
        result = await result.json();
        // console.log(result);
        return response.status(200).json(result);
    }
    return response.status(400).json({ error: "bad request" });
})



module.exports = externalRouter;