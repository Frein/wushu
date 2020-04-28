// server.js
const mongoose  = require('mongoose')


// Initialize connection to database
// mongodb+srv://admin:<password>@cluster0-bms00.mongodb.net/test?retryWrites=true&w=majority

const dbUrl = `mongodb+srv://admin:1Qweasdzxc@cluster0-bms00.mongodb.net/accupuncture?retryWrites=true&w=majority`,
    dbOptions = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    };

// Set DB from mongoose connection
mongoose.connect(dbUrl, dbOptions)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
