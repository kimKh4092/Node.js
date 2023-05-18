const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },
    phone: {
        type: String,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
})

const Customer = mongoose.model('Customer', customerSchema);



router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    if (!customer) res.status(404).send('the customer was not found')

    else res.send(customer);
})

router.post('/', async (req, res) => {
    const schema = {
        name: Joi.string().required(),
        phone: Joi.string().required(),
        isGold: Joi.boolean()

    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })

    customer = await customer.save()
    res.send(customer)
})

router.put('/:id', async (req, res) => {
    const schema = {
        name: Joi.string().required(),
        phone: Joi.string().required(),
        isGold: Joi.boolean()


    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true })

    if (!customer) {
        res.status(404).send('the customer was not found');
        return;
    }
    res.send(customer);
})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id)

    if (!customer) {
        res.status(404).send('the customer was not found');
        return;
    }

    res.send(customer);
})

module.exports = router;