const User = require('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.postSignup = (req, res, next) => {
    console.log('Reached postSingup');
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    bcrypt.hash(password, 12)
    .then(hashedPw => {
        const newUser = new User({
            name: username,
            email,
            password: hashedPw
        })
        return newUser.save();
    }).then(() => {
        res.status(201).json({ message: 'A user was created'});
    })
    .catch(err => console.log(err));
    
};

exports.postLogin = (req, res, next) => {
    console.log('Reached postLogin');
    const email = req.body.email;
    const password = req.body.password;

    //find admin by email
    User.findOne({ email: email})
        .then(user => {
            if(!user) {
                res.status(404).json({ message: 'The user was not found!'});
            };
            
            bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if(!isEqual) {
                        res.status(401).json({ message: 'The wrong password was entered'});
                    }
                   const token = jwt.sign({
                       email: user.email,
                       userId: user._id.toString()
                   }, 
                   'pokesneverdie', 
                   { expiresIn: '1h'});
                    res.status(200).json({ 
                        message: 'The user found, you are allowed to continue', 
                        token: token,
                        userId: user._id.toString(),
                        expiresIn: 3600000
                    });
                })
        })
        .catch(err => console.log(err));
};