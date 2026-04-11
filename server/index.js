import express from 'express'
import dotenv from 'dotenv'
import connectDB from './utils/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import notesRouter from './routes/generate.route.js';


dotenv.config()

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}))

app.use(express.json())
app.use(cookieParser())


app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.use('/api/notes', notesRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectDB()
});