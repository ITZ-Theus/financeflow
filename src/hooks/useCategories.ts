import { useQuery, useMutation, useQueryClient } from 'react-query'
import { api } from '../services/api'
import { Category } from '../types'

export function useCategories() {
  return useQuery<Category[]>('categories', async () => {
    const { data } = await api.get('/categories')
    return data
  })
}

export function useCreateCategory() {
  const qc = useQueryClient()
  return useMutation(
    async (payload: Partial<Category>) => {
      const { data } = await api.post('/categories', payload)
      return data
    },
    { onSuccess: () => qc.invalidateQueries('categories') }
  )
}
