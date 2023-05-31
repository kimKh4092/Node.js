const Joi = require('joi');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/users')


router.post('/', async (req, res) => {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()

    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    //check if the user exists
    //validate user
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password')

    //validate password
    //compare a plain text password with hashed password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('invalid email or password')

    const token = jwt.sign({ _id: user._id }, 'jwtprivatekey')
    res.send(token)
})

module.exports = router;

//jwt jason web token
//a long string that idenifies a user