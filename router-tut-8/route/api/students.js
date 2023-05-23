const express = require("express");
const router = express.Router();
const path = require("path");

data = {}
data.students = require('../../data/students.json')


router.route('/')
    .get((req, res) => {
        res.json(data.students);
    })

    .post((req, res) => {
        res.json({
            "FirstName": req.body.firstname,
            "LastName": req.body.lastname
        });
    })

    .put((req, res) => {
        res.json({
            "FirstName": req.body.firstname,
            "LastName": req.body.lastname
        });
    })

    .delete((req, res) => {
        res.json({"id" : req.body.id})
    })

    router.route('/:id')
    .get((req, res) => {
        res.json({"id" : req.params.id})
    })

module.exports = router;