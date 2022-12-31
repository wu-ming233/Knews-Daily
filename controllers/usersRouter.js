require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersRouter = require('express').Router()

const User = require('../models/user')

function getToken(request) {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

function checkToken(token, email) {
    try {
        const decodedEmail = jwt.verify(token, process.env.TOKEN_HASH);
        if (!token || !decodedEmail || decodedEmail !== email) {
            return false
        }
        return true
    }
    catch {
        return false
    }
}

usersRouter.get('/:useremail', async (request, response) => {

    const token = getToken(request);

    if (!checkToken(token, request.params.useremail)) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    else {
        let user = await User.findOne({ email: request.params.useremail }).exec();

        if (user) {
            response.json(user);
        }
        else {
            response.status(404).json({ error: 'No such email' });
        }
    }

})

usersRouter.post('/', async (request, response) => {
    const { email, password, location, lastUpdated, sections, weather, articles, games} = request.body;

    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltOrRounds);

    const user = new User({
        email,
        password: passwordHash,
        location,
        sections
    })

    try {
        let savedUser = await user.save();
        response.status(201).json(savedUser)
    }
    catch (err) {
        console.log("error posting");
        response.status(400).json({ error: 'Email already exists' });
    }
})

usersRouter.put('/:useremail', async (request, response) => {

    const token = getToken(request);

    if (!checkToken(token, request.params.useremail)) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const body = request.body;

    const saltOrRounds = 10;
    password = body.password ? await bcrypt.hash(body.password, saltOrRounds) : body.password;

    const user = {
        password: password,
        location: body.location,
        lastUpdated: body.lastUpdated,
        sections: body.sections,
        weather: body.weather,
        articles: body.articles,
        games: body.games
    }

    try {
        let updatedUser = await User.findOneAndUpdate({ email: request.params.useremail }, user, { runValidators: true, context: 'query', new: true });
        response.json(updatedUser);
    }
    catch (err) {
        console.log("error updating");
        response.status(405).end();
    }

})

module.exports = usersRouter