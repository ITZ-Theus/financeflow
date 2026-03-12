import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, OneToMany, JoinColumn, CreateDateColumn
} from 'typeorm'
import { User } from '../users/user.entity'
import { Transaction } from '../transactions/transaction.entity'

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ length: 100 })
  name!: string

  @Column({ length: 7, default: '#6366f1' })
  color!: string

  @Column({ length: 50, default: 'tag' })
  icon!: string

  @Column({ type: 'enum', enum: ['income', 'expense'] })
  type!: 'income' | 'expense'

  @Column({ name: 'user_id' })
  userId!: string

  @ManyToOne(() => User, (u) => u.categories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User

  @OneToMany(() => Transaction, (t) => t.category)
  transactions!: Transaction[]

  @CreateDateColumn()
  createdAt!: Date
}
