import express from 'express'
import { userRoutes } from './routes/user.routes'
import { mealRoutes } from './routes/meal.routes'
import { metricRoutes } from './routes/metric.routes'

export const app = express()

app.use(express.json())

app.use(userRoutes)
app.use(mealRoutes)
app.use(metricRoutes)
