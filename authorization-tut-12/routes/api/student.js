const express = require('express')
const router = express.Router()
const studentsController = require('../../controllers/studentsController')
// const verifyJWT = require('../../middleware/verifyJWT')

router
.route('/')
// read
.get(studentsController.getAllStuednts)
// create
.post(studentsController.createNewStudent)
// update
.put(studentsController.updateStudent)
// delete
.delete(studentsController.deleteStudent)

router.route('/:id').get()


module.exports = router