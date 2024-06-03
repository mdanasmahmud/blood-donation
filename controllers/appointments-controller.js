const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error')

const Appointment = require('../models/appointment-model')

  const getAppointmentsbyUser = async (req, res, next) => {
    const userId = req.params.appointmentUserId;

    let userAppointments;
    try{
        userAppointments = await Appointment.find({ user_id: userId });
    }
    catch (err) {
        const error = new HttpError(
            'Fetching appointments failed, please try again later', 500
        );
        return next(error);
    }

    if(!userAppointments || userAppointments.length === 0){
        return next(
            new HttpError('Could not find appointments for the provided user id.', 404)
        );
    }

    res.json({userAppointments: userAppointments.map(appointment => appointment.toObject({ getters: true }))});
}

// We will trigger this post request when new appointments are set by the user

const postAppointmentbyUser = async (req, res, next) => {
    const {user_id, date, time, patientLocationText, patientPhone, status} = req.body;

    const newAppointment = new Appointment({
        user_id,
        date,
        time,
        patientLocationText,
        patientPhone,
        status
    })
    try{
        await newAppointment.save();
    } catch (err) {
        const error = new HttpError(
            "Creating appointment failed", 500
        )
        return next(error)
    }

    res.status(201).json(newAppointment)
}

// Suppose a user posted a appointment and someone submited in their appointment form, they can accept it and it will change the status to Upcoming,

const updateAppointmentbyUser = async (req, res, next) => {
    const {appointmentId, status} = req.body;

    let appointment;
    try {
        appointment = await Appointment.findOneAndUpdate({ _id: appointmentId }, { status: status }, { new: true });
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not update appointment.", 500
        );
        return next(error);
    }

    if (!appointment) {
        const error = new HttpError(
            "Could not find appointment for this id.", 404
        );
        return next(error);
    }

    res.status(200).json({ appointment: appointment.toObject({ getters: true }) });
}

exports.getAppointmentsbyUser = getAppointmentsbyUser
exports.postAppointmentbyUser = postAppointmentbyUser
exports.updateAppointmentbyUser = updateAppointmentbyUser