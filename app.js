const express = require('express')
const bodyParser = require('body-parser')

const bloodDonorRoutes = require('./routes/blood-doner-routes')

const app = express();



app.use('/api/blood-donors',bloodDonorRoutes);

app.listen(5000);

