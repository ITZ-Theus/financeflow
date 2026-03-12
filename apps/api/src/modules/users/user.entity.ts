import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToMany
} from 'typeorm'
import { Transaction } from '../transactions/transaction.entity'
import { Category } from '../categories/category.entity'
import { Goal } from '../goals/goal.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ length: 100 })
  name!: string

  @Column({ unique: true, length: 150 })
  email!: string

  @Column({ length: 255, select: false })
  password!: string

  @OneToMany(() => Transaction, (t) => t.user)
  transactions!: Transaction[]

  @OneToMany(() => Category, (c) => c.user)
  categories!: Category[]

  @OneToMany(() => Goal, (g) => g.user)
  goals!: Goal[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
