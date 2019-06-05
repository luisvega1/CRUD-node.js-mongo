const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const alert = require('alert-node');

router.get('/', (req, res) => {
    res.render("alumno/addOrEdit", {
        viewTitle: "Nuevo alumno"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var employee = new Employee();
    employee.ncontrol = req.body.ncontrol;
    employee.email = req.body.email;
    employee.nombre = req.body.nombre;
    employee.carrera = req.body.carrera;
    employee.save((err, doc) => {
        if (!err) {
            res.redirect('alumno/list');
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("alumno/addOrEdit", {
                    viewTitle: "Nuevo alumno",
                    employee: req.body
                });
            }
            else {
                res.render("alumno/addOrEdit", {
                    viewTitle: "Agrega alumno",
                    employee: req.body
                });
            }
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('alumno/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("alumno/addOrEdit", {
                    viewTitle: 'Actualizar alumno',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("alumno/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'ncontrol':
                body['ncontrolError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'nombre':
                body['nombreError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("alumno/addOrEdit", {
                viewTitle: "Actualizar alumno",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/alumno/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;