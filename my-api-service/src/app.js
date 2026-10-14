import path from 'node:path'

import compression from 'compression'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose';
import kameraRouter from './routes/kamera.js';
import configureView from './config/view.js'
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js'
import apiRoutes from './routes/api.routes.js'
import webRoutes from './routes/web.routes.js'

const app = express()

configureView(app)
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDB terhubung'))
  .catch((err) => console.error('Koneksi MongoDB gagal:', err.message));

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())

app.use('/storage/public', express.static(path.resolve(process.cwd(), 'storage/public')))

app.use('/', webRoutes)
app.use('/api/kamera', kameraRouter);
app.use('/api', apiRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
