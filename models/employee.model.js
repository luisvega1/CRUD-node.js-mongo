const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    ncontrol: {
        type: String,
        required: 'Este campo es requerido',
        unique: true
    },
    email: {
        type: String
    },
    carrera: {
        type: String
    },
    nombre: {
        type: String,
        required: 'Este campo es requerido'
    },
    seguro: {
        type: String,
        default: ""
    }
});

// Custom validation for email
employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Correo invalido.');

employeeSchema.path('ncontrol').validate((val) => {
    ncontrolRegex = /^\d+$/;
    return ncontrolRegex.test(val);
}, 'Numero de control incorrecto');

/^\d+$/

mongoose.model('Employee', employeeSchema);