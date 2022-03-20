const mongoose  = require('mongoose')

module.exports = () => {
  // Initialize connection to database
  const dbUrl = `mongodb+srv://admin:1Qweasdzxc@cluster0-bms00.mongodb.net/accupuncture?retryWrites=true&w=majority`
  const dbOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  };

  return new Promise((resolve, reject) => {
    // Set DB from mongoose connection
    mongoose.connect(dbUrl, dbOptions)
      .then(() => {
        console.log(`CONNECTED TO MONGO!`);
        resolve()
      })
      .catch((err) => {
        console.log(`OH NO! MONGO CONNECTION ERROR!`);
        console.log(err);
        reject(err)
      })

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
  })
}