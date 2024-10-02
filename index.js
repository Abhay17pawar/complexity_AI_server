const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const signup = require("./routes/userRoute");
const geminiRoutes = require('./routes/geminiRoutes');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/user', signup);
app.use('/api',geminiRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*' , (req,res) => {
        res.sendFile(path.resolve(__dirname , "frontend" , "build" , "index.html"));
    })
}

const mongo = process.env.MONGO_URI;
mongoose.connect(mongo)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log("Error connecting to MongoDB", error));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
