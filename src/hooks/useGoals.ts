import { useQuery, useMutation, useQueryClient } from 'react-query'
import { api } from '../services/api'
import { Goal } from '../types'

export function useGoals() {
  return useQuery<Goal[]>('goals', async () => {
    const { data } = await api.get('/goals')
    return data
  })
}

export function useCreateGoal() {
  const qc = useQueryClient()
  return useMutation(
    async (payload: Partial<Goal>) => {
      const { data } = await api.post('/goals', payload)
      return data
    },
    { onSuccess: () => qc.invalidateQueries('goals') }
  )
}

export function useUpdateGoal() {
  const qc = useQueryClient()
  return useMutation(
    async ({ id, ...payload }: Partial<Goal> & { id: string }) => {
      const { data } = await api.put(`/goals/${id}`, payload)
      return data
    },
    { onSuccess: () => qc.invalidateQueries('goals') }
  )
}

export function useDeleteGoal() {
  const qc = useQueryClient()
  return useMutation(
    async (id: string) => {
      await api.delete(`/goals/${id}`)
    },
    { onSuccess: () => qc.invalidateQueries('goals') }
  )
}
