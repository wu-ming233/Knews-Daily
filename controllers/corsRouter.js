const corsRouter = require('express').Router()

corsRouter.get('/*', async (request, response) => {
    // console.log(request.originalUrl.substring(10));
    let result = await fetch(request.originalUrl.substring(10));
    if (result.ok) {
        result = await result.json();
        return response.status(200).json(result);
    }
    // console.log(result);
    return response.status(400).json({ error: "bad request" });


})

module.exports = corsRouter