export interface User {
  id: string
  name: string
  email: string
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
  type: 'income' | 'expense'
  userId: string
  createdAt: string
}

export interface Transaction {
  id: string
  title: string
  amount: number
  type: 'income' | 'expense'
  date: string
  description?: string
  categoryId?: string
  category?: Category
  userId: string
  createdAt: string
}

export interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  status: 'active' | 'completed' | 'cancelled'
  userId: string
  createdAt: string
}

export interface Summary {
  income: number
  expense: number
  balance: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
}
