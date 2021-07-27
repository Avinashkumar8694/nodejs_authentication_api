const router = require('express').Router();
const User = require('../model/User');
const {registerValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
router.post('/register', async (req, res) => {
    // res.send("register ok");
    //lets Validation the data defore we add user
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    //checking if the user in the already database
    const emailExit = await User.findOne({email: req.body.email})
    if (emailExit) return res.status(400).send('email already exits');
    // has_password 
    const salt = await bcrypt.genSalt(10);   
    const  hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const saved = await user.save();
        res.send({user: user.id});
    } catch (err) {
        res.status(400).send(err);
    }
});