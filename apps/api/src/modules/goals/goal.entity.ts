import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn
} from 'typeorm'
import { User } from '../users/user.entity'

@Entity('goals')
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ length: 150 })
  title!: string

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'target_amount' })
  targetAmount!: number

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'current_amount', default: 0 })
  currentAmount!: number

  @Column({ type: 'date' })
  deadline!: string

  @Column({ type: 'enum', enum: ['active', 'completed', 'cancelled'], default: 'active' })
  status!: 'active' | 'completed' | 'cancelled'

  @Column({ name: 'user_id' })
  userId!: string

  @ManyToOne(() => User, (u) => u.goals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User

  @CreateDateColumn()
  createdAt!: Date
}
