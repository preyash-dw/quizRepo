
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

mongoose.connect('mongodb+srv://preyash1705:Jf2isUcm1UahrSgT@cluster0.nq9017s.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(cors());

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctOptionIndex: Number,
});

const Question = mongoose.model('Question', QuestionSchema);

app.post('/questions', async (req, res) => {
  const { question, options, correctOptionIndex } = req.body;
  
  try {
    const newQuestion = new Question({
      question,
      options,
      correctOptionIndex,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add the question.' });
  }
});



app.get('/random-questions', async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 30 } }]).exec();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve random questions.' });
  }
});

// for sending email
// app.post('/api/send-email', async (req, res) => {
//   const { to, subject, text } = req.body;

//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'preyashdwivedi@gmail.com',    
//         pass: 'Preyash@9839339797', 
//       },
//     });

//     const info = await transporter.sendMail({
//       from: 'preyashdwivedi@gmail.com',  
//       to,
//       subject,
//       text,
//     });

//     console.log('Email sent:', info.response);
//     res.status(200).json({ message: 'Email sent successfully!' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
