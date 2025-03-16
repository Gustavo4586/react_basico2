const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://gugarogeriomoreira:26380881@cluster0.srelz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));