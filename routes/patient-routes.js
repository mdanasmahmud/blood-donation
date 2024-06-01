const express = require('express')

const HttpError = require('../models/http-error')

const router = express.Router();

const patientDetails = [
    {patient_id:0, patientName:'John Mary', patientBloodGroup:'AB+', patientLocation:'Dhaka', patientContact:'01234567890'},
    {patient_id:1, patientName:'Alice Smith', patientBloodGroup:'O-', patientLocation:'Chittagong', patientContact:'01987654321'},
    {patient_id:2, patientName:'Robert Johnson', patientBloodGroup:'A+', patientLocation:'Khulna', patientContact:'01876543210'},
    {patient_id:3, patientName:'Emily Davis', patientBloodGroup:'B-', patientLocation:'Rajshahi', patientContact:'01765432109'},
    {patient_id:4, patientName:'Michael Brown', patientBloodGroup:'O+', patientLocation:'Barisal', patientContact:'01654321098'},
    {patient_id:5, patientName:'Sarah Wilson', patientBloodGroup:'AB-', patientLocation:'Sylhet', patientContact:'01543210987'},
    {patient_id:6, patientName:'David Taylor', patientBloodGroup:'A-', patientLocation:'Comilla', patientContact:'01432109876'},
    {patient_id:7, patientName:'Sophia Moore', patientBloodGroup:'B+', patientLocation:'Rangpur', patientContact:'01321098765'},
    {patient_id:8, patientName:'James Anderson', patientBloodGroup:'AB+', patientLocation:'Narayanganj', patientContact:'01210987654'},
    {patient_id:9, patientName:'Olivia Thomas', patientBloodGroup:'O-', patientLocation:'Gazipur', patientContact:'01109876543'}
  ];

router.get('/', (req, res, next) => {
    res.json({patientDetails});
});

router.get('/:patient_id', (req, res, next) => {
    const patientId = Number(req.params.patient_id);
    const patientOneId = patientDetails.find(p => {
        return p.patient_id === patientId;
    })
    if(!patientOneId){
        throw new HttpError("Patient by the id not found", 404)
    }
    else{
        res.json({patientOneId});
    }
    
});


module.exports = router;