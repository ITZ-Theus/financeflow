import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn
} from 'typeorm'
import { User } from '../users/user.entity'
import { Category } from '../categories/category.entity'

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ length: 150 })
  title!: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number

  @Column({ type: 'enum', enum: ['income', 'expense'] })
  type!: 'income' | 'expense'

  @Column({ type: 'date' })
  date!: string

  @Column({ type: 'text', nullable: true })
  description!: string | null

  @Column({ name: 'user_id' })
  userId!: string

  @Column({ name: 'category_id', nullable: true })
  categoryId!: string | null

  @ManyToOne(() => User, (u) => u.transactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User

  @ManyToOne(() => Category, (c) => c.transactions, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category!: Category | null

  @CreateDateColumn()
  createdAt!: Date
}
