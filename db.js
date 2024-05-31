const mongoose = require('mongoose');


const monoURL = 'mongodb://localhost:27017/companies';
mongoose.connect(monoURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB server");
});

db.on('error', (err) => {
    console.log(`MongoDB connection error: ${err}`);
});


db.on('disconnected', () => {
    console.log("MongoDB connection disconnected");
});

module.exports = db;
