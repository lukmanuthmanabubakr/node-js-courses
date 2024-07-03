const { json } = require('express');

const data = {
      students : require('../models/students.json'),
      setStudents: function (data){
            this.students = data;
      }
}


const getAllStudents = (req, res) => {
  res.json(data.students);
};

const createNewStudent = (req, res) => {
  const newStudent ={
            id: data.students[data.students.length - 1].id + 1 || 1,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
          
  };

  //set the required condition for the two para
      

  if (!newStudent.firstname || !newStudent.lastname){
      return res
      .status(400)
      .json({message: "firstname and lastname are required"})
  }


   // add the new student to the student list
  data.setStudents([...data.students, newStudent])//spread method

  // update the data

  res.status(201).json(data.students)
};

const updateStudent = (req, res) => {
      const student= data.students.find(
            (std) => std.id === parseInt(req.body.id)
      )

      if (!student){
            return res
            .status(400)
            .json({message: `Student ID ${req.body.id} not found`})
      }

      if (req.body.firstname) student.firstname = req.body.firstname;// if we found an id
      if (req.body.firstname) student.lastname = req.body.lastname;

      const filteredStudentArray = data.students.filter(
            (std) => std.id !== parseInt(req.body.id)
      )

      const unsortedStudentArray = [...filteredStudentArray, student];

      data.setStudents(
            unsortedStudentArray.sort((a,b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
      )

  res.json(data.students);
};

const deleteStudent = (req, res) => {
      const student = data.students.find(
            (std) => std.id === parseInt(req.body.id)
          );
          if (!student) {
            return res
              .status(400)
              .json({ message: `Student ID ${req.body.id} not found` });
          }
          const filteredStudentArray = data.students.filter(
            (std) => std.id !== parseInt(req.body.id)
          );
          data.setStudents([...filteredStudentArray]);
          res.json(data.students);
};

const getStudent = (req, res) => {
  res.json({ "id": req.params.id });
};

module.exports = {getAllStudents, createNewStudent, updateStudent,deleteStudent,getStudent}
