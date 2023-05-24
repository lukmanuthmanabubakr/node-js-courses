const express = require("express");
const router = express.Router();
const studentsController = require('../../controllers/studentsControllers')

data = {};
data.students = require("../../models/students.json");

router
  .route("/")
  .get(studentsController.getAllStudents)

  .post(studentsController.createNewStudent)

  .put(studentsController.updateStudent)

  .delete(studentsController.deleteStudent);

router.route("/:id").get(studentsController.getStudent);

module.exports = router;
