import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import cors from 'cors';
import indexRouter from './routes/indexRouter';
import apiRouter from './routes/apiRouter';




const PORT = process.env.PORT || 3000;
const app = express();
app.use(morgan('dev'));

app.use(express.json());
app.use(cors());

app.use('/', indexRouter);
app.use('/api/users', apiRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ошибка на сервере ..');
});

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
