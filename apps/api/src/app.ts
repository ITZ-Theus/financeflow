import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import { AppDataSource } from './config/database'
import { env } from './config/env'
import { errorHandler } from './shared/errors/errorHandler'
import { authRoutes } from './modules/auth/auth.routes'
import { transactionRoutes } from './modules/transactions/transaction.routes'
import { categoryRoutes } from './modules/categories/category.routes'
import { goalRoutes } from './modules/goals/goal.routes'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/goals', goalRoutes)

app.use(errorHandler)

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Banco de dados conectado')
    app.listen(env.port, () => {
      console.log(`🚀 API rodando na porta ${env.port}`)
    })
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar no banco:', err)
    process.exit(1)
  })

export { app }
