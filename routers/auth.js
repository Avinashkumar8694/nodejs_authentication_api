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

//login
router.post('/login', async (req, res) => {
    //lets validate the data before we a user
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    //if the email is exist
    const valUser = await User.findOne({email: req.body.email})
    if (!valUser) return res.status(400).send('email and password not ok');
   // pass- correct
   const valPass = await bcrypt.compare(req.body.password, valUser.password)
   if(!valPass) return res.status(400).send('invalid password')
   //creae and assign token
   
   const token = jwt.sign({_id: valUser._id }, process.env.TOKEN_SECRET);
   
   res.header('auth-token',token).send(token)
   res.send({_id: valUser._id})
//    res.send('login')
})

module.exports = router;