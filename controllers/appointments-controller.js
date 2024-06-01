
const HttpError = require('../models/http-error')

const appointments = [
    { appointmentId: "a1", user_id: 0, date: "2024-06-01", time: "10:00 AM", patientLocationText: "Ibn Sina Hospital", patientPhone: "+12345678", status: "Confirmed" },
    { appointmentId: "a2", user_id: 1, date: "2024-06-02", time: "11:00 AM", patientLocationText: "City Health Clinic", patientPhone: "+87654321", status: "Pending" },
    { appointmentId: "a3", user_id: 2, date: "2024-06-03", time: "09:00 AM", patientLocationText: "Downtown Donation Center", patientPhone: "+123123123", status: "Cancelled" },
    { appointmentId: "a4", user_id: 3, date: "2024-06-04", time: "01:00 PM", patientLocationText: "Northside Medical", patientPhone: "+321321321", status: "Confirmed" },
    { appointmentId: "a5", user_id: 0, date: "2024-06-05", time: "03:00 PM", patientLocationText: "West End Clinic", patientPhone: "+456456456", status: "Confirmed" },
    { appointmentId: "a6", user_id: 1, date: "2024-06-06", time: "10:30 AM", patientLocationText: "Eastside Hospital", patientPhone: "+654654654", status: "Pending" },
    { appointmentId: "a7", user_id: 2, date: "2024-06-07", time: "08:00 AM", patientLocationText: "Central Health Center", patientPhone: "+789789789", status: "Confirmed" },
    { appointmentId: "a8", user_id: 3, date: "2024-06-08", time: "12:00 PM", patientLocationText: "Southside Medical Facility", patientPhone: "+987987987", status: "Cancelled" },
    { appointmentId: "a9", user_id: 0, date: "2024-06-09", time: "02:00 PM", patientLocationText: "Main Street Clinic", patientPhone: "+101010101", status: "Confirmed" },
    { appointmentId: "a10", user_id: 1, date: "2024-06-10", time: "11:30 AM", patientLocationText: "Northwest Health Center", patientPhone: "+202020202", status: "Pending" }
  ];

const getAppointmentsbyUser = (req, res, next) => {
    const userId = Number(req.params.appointmentUserId);
    const userAppointments = appointments.filter(p => {
        return p.user_id === userId;
    })

    if(userAppointments.length === 0){
        throw new HttpError('Could not find any appointment for the user', 404)
    } else {
        res.json({userAppointments});
    }

}

exports.getAppointmentsbyUser = getAppointmentsbyUser