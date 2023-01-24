const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {findOne} = require('../models/User');
const {secret}= require('../config');

const generateAccessToken = (id) =>{
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class AuthController{
    async registration (req, res) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect signin data'
                })
            }
            const {email, password, firstName, lastName} = req.body;
            const candidate = await User.findOne({email});
            if(candidate) {
                return res.status(400).json({message:"User with this email already exists"});
            }
            const hashPassword = bcrypt.hashSync(password, 9);
            const user = new User({email, password: hashPassword, fullName:`${firstName} ${lastName}`})
            await user.save();
            return res.json({message: "User has been created"});

        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Registration error"});
        }
    }

    async login (req, res) {
        try{
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json("There is no user with such email");
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json("Wrong password");
            }
            const token = generateAccessToken(user._id);
            return res.json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Login error"});
        }
    }

    async getUsers (req, res) {
        try {
            User.find({}, (err, data) =>{
                if (err) res.send(err);
                res.send(data);
            })
        } catch (e) {console.log(e)}
    }

    async deleteSelected (req, res) {
        const id = req.params.id.slice(1);
        const user = await User.findByIdAndDelete({_id: id});

        res.send(user);
    }
}

module.exports = new AuthController();