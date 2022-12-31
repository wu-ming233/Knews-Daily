const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email: email });
    const validLogin = user === null ? false : await bcrypt.compare(password, user.password);

    if (!validLogin) {
        return response.status(401).json({ error: 'Invalid login credentials' })
    }

    const token = jwt.sign(email, process.env.TOKEN_HASH);

    response.status(200).send({ token: token, userEmail: email });

})

module.exports = loginRouter;