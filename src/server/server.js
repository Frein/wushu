const Product = require("./productModel");

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use( bodyParser.json() );


// server.js
const mongoose  = require('mongoose')


// Initialize connection to database
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



app.use(express.static(path.join(__dirname, '../../build')));

app.use('/ping', function (req, res) {
    return res.send({point:123});
});

app.use('/create', async (req, res) => {
        try {
            console.log(req.body, req.body.qwe);
            const data = req.body,
                name = data.name,
                price = parseInt(data.price),
                id = mongoose.Types.ObjectId(),
                product = {
                    _id: id,
                    name: 'qwe',
                    price: 12,
                    __v: 0
                },
                response = {
                    msg: "Product successfully created",
                    data: product
                }

            // Use Product.Model to create a new product
            await Product.create(product)

            res.send( {
                statusCode: 201,
                body: JSON.stringify(response)
            });
        } catch (err) {
            console.log('product.create', err) // output to netlify function log
            res.send( {
                statusCode: 500,
                body: JSON.stringify({msg: err.message})
            });
        }
    }
    );

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});



app.listen(process.env.PORT || 8080);
