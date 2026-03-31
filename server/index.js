import express from 'express'
import dotenv from 'dotenv'
import connectDB from './utils/connectDB.js';


dotenv.config()
const app = express();

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectDB()
});