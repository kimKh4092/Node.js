const Joi = require('joi');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/users')


router.post('/', async (req, res) => {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()

    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    //check if the user is not already registered
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already registered')

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()
    res.send({
        name: user.name,
        email: user.email
    })
})



module.exports = router;

//store hashed passwords