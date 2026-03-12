import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import { errorHandler } from '../../src/shared/errors/errorHandler'
import { authRoutes } from '../../src/modules/auth/auth.routes'
import { transactionRoutes } from '../../src/modules/transactions/transaction.routes'
import { categoryRoutes } from '../../src/modules/categories/category.routes'
import { goalRoutes } from '../../src/modules/goals/goal.routes'

/**
 * Cria a instância do Express sem inicializar o banco.
 * Usada nos testes de integração.
 */
export function createApp() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/health', (_req, res) => res.json({ status: 'ok' }))
  app.use('/api/auth', authRoutes)
  app.use('/api/transactions', transactionRoutes)
  app.use('/api/categories', categoryRoutes)
  app.use('/api/goals', goalRoutes)
  app.use(errorHandler)

  return app
}
