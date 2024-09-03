import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'https://bookapp-32k1.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));



// app.use(cors());
// Option 2: Allow Custom Origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

// app.get('/', (request, response) => {
//   console.log(request);
//   return response.status(234).send('Welcome To MERN Stack Tutorial');
// });

app.use('/books', booksRoute);
app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/client/dist/index.html')
)
)


mongoose.connect(process.env.mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
