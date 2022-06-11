const router = require('express').Router()
const User = require('../models/User')
router.post('/', async (req, res) => {
    try {
        let userData = req.body
        let user = await User.findOneAndUpdate({ email: req.body.email }, userData, { new: true, upsert: true });
        console.log(user)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router
