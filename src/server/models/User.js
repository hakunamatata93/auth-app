const {Schema, model }= require('mongoose');

const date = () => `${new Date().toLocaleString()}`

const user = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: String, default: date, immutable: true, required:true},
    fullName: {type: String, required: true},
    status: {type: String, required:true, default: 'Unrestricted'},
    loginDate: String
})

module.exports = model('User', user)