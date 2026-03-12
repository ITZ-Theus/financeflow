import { useQuery, useMutation, useQueryClient } from 'react-query'
import { api } from '../services/api'
import { Transaction, PaginatedResult, Summary } from '../types'

export function useTransactions(params?: Record<string, any>) {
  return useQuery<PaginatedResult<Transaction>>(['transactions', params], async () => {
    const { data } = await api.get('/transactions', { params })
    return data
  })
}

export function useSummary(params?: Record<string, any>) {
  return useQuery<Summary>(['summary', params], async () => {
    const { data } = await api.get('/transactions/summary', { params })
    return data
  })
}

export function useCreateTransaction() {
  const qc = useQueryClient()
  return useMutation(
    async (payload: Partial<Transaction>) => {
      const { data } = await api.post('/transactions', payload)
      return data
    },
    { onSuccess: () => qc.invalidateQueries('transactions') }
  )
}

export function useDeleteTransaction() {
  const qc = useQueryClient()
  return useMutation(
    async (id: string) => {
      await api.delete(`/transactions/${id}`)
    },
    { onSuccess: () => qc.invalidateQueries('transactions') }
  )
}
