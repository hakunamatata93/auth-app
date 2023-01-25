const express = require('express');
const authRouter = require('./routes/authRouter');
const mainRouter = require('./routes/mainRouter');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

const app = express();
dotenv.config();
app.use(cors);
app.use(express.json());
app.use("/auth", authRouter);
app.use('/main', mainRouter);

const start = async () => {
    try{
        await mongoose.connect('mongodb+srv://hakuna_matata:Lfdbl12@cluster0.tbjfmr6.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, ()=> console.log(`Server works on ${PORT}`))
    } catch(e) {
        console.log(e);
    }
}
start();