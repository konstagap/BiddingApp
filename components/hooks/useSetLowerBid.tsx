import useSWRMutation from 'swr/mutation'

async function sendRequest(url: string, { arg }: { arg: { jobId: string; currentBid: number } }) {
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  })
}

export function useSetLowesttBid() {
  const { trigger, isMutating, data, error } = useSWRMutation('/api/bid', sendRequest)
  return { trigger, isMutating, data, error }
}
