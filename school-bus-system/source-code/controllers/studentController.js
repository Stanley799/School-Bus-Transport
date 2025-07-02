const studentModel = require('../models/studentModel');
const pool = require('../db_node');

const createStudent = async (req, res) => {                        
    const { student_fname, student_lname, grade, stream, admission, parent_id } = req.body;

   try {
   const result = await pool.query(
  `INSERT INTO students (student_fname, student_lname, grade, stream, admission, parent_id)
   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
  [student_fname, student_lname, grade, stream, admission, parent_id]
);


    res.status(201).json({ message: 'Student created', student: result.rows[0] });
  } catch (err) {
    console.error('Error creating student:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.getAllStudents();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await studentModel.getStudentById(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await studentModel.updateStudent(req.params.id, req.body);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await studentModel.deleteStudent(req.params.id);
    if (student) {
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
