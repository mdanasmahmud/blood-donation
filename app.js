const express = require('express')
const bodyParser = require('body-parser')



const bloodDonorRoutes = require('./routes/blood-doner-routes')
const newsRoute = require('./routes/news-routes')
const patientRoute = require('./routes/patient-routes')
const appointmentRoute = require('./routes/appointment-routes')
const userRoute = require('./routes/users-routes')

const app = express();

app.use(bodyParser.json()) // To convert regular data to objects so that we can insert them.

app.use('/api/appointments', appointmentRoute) // This will only take the userId and show the appointments of that user
app.use('/api/patients', patientRoute) // This can show all patients Id and also 1 if needed
app.use('/api/news', newsRoute) // Can show all patient Id or 1 if needed
app.use('/api/blood-donors',bloodDonorRoutes); // Can show all blood donors or only 1 if needed
app.use('/api/users', userRoute) // Only shows 1 user if needed

app.use((error ,req, res, next) => { // Will take this as a error handling middleware
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "Unknown Error!"});
})

app.listen(5000);
