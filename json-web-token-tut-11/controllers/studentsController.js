const data = {
    student : require('../models/student.json'),

    setStudent : function (data)  {
        this.student = data
    }
}

const getAllStuednts = (req, res) => {
    res.json(data.student)
}

const createNewStudent = (req, res) => {
    const newStudent = {
        id: data.student[data.student.length -1].id + 1 || 1,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName

    };

    // set the required condition for the two params
    if(!newStudent.firstName || !newStudent.lastName) {
        return res.status(400).json({message: "First name and last name are required"})
    }

    // add the new student to the students list
    data.setStudent([...data.student, newStudent])
    
    // update the data
    res.status(201).json(data.student)
}

const updateStudent = (req, res) => {
    const student = data.student.find(
        (stu) => stu.id === parseInt(req.body.id)
    );

    if(!student) {
        return res.status(400).json({message : `Student ID ${req.body.id} not found`})
    }

    // if we find the first name, go and set the firstname param value
    if(req.body.firstName) student.firstName = req.body.firstName
    if(req.body.lastName) student.lastName = req.body.lastName

    const filteredStudentArr = data.student.filter(
        (stu) => stu.id !== parseInt(req.body.id)
    )

    const unsortedStudent = [...filteredStudentArr, student]

    data.setStudent(
        unsortedStudent.sort((a,b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    )

    res.json(data.student)
}

const deleteStudent = (req, res) => {
    const student = data.student.find(
      (stu) => stu.id === parseInt(req.body.id)
    );
    if (!student) {
      return res
        .status(400)
        .json({ message: `Employee ID ${req.body.id} not found` });
    }
    const filteredArray = data.student.filter(
      (stu) => stu.id !== parseInt(req.body.id)
    );
    data.setStudent([...filteredArray]);
    res.json(data.student);
  };

  const getStudent = (req, res) => {
    const student = data.student.find(
      (stu) => stu.id === parseInt(req.params.id)
    );
    if (!student) {
      return res
        .status(400)
        .json({ message: `Employee ID ${req.params.id} not found` });
    }
    res.json(student);
  };

module.exports ={
    getAllStuednts, 
    createNewStudent, 
    updateStudent, 
    deleteStudent, 
    getStudent
}