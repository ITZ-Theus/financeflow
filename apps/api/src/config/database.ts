import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { env } from './env'
import { User } from '../modules/users/user.entity'
import { Category } from '../modules/categories/category.entity'
import { Transaction } from '../modules/transactions/transaction.entity'
import { Goal } from '../modules/goals/goal.entity'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.pass,
  database: env.db.name,
  synchronize: env.nodeEnv === 'development', // Em produção, use migrations
  logging: env.nodeEnv === 'development',
  entities: [User, Category, Transaction, Goal],
  migrations: ['src/migrations/*.ts'],
})
