import { fetcher } from '@/lib/utils'
import useSWR from 'swr'

export function useLatestBid(jobId: string, isExpired: boolean) {
  const params = new URLSearchParams()

  const options = isExpired ? {} : { refreshInterval: 500 }

  const { data, error, isLoading } = useSWR(`/api/bid?${params.toString()}`, fetcher, options)

  return {
    data,
    error,
    isLoading
  }
}
