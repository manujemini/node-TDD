import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import todoRoutes from './routes/todos';

const app = express();

app.use(json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    message: "Server and Routes are working fine.."
  })
})

app.use('/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;