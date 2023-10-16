export const MAX_KB_SIZE = 16

export const checkSizeInKb = (value: string | undefined): boolean => {
  if (!value) return true

  const blob = new Blob([value])
  const sizeInBytes = blob.size
  const sizeInKB = sizeInBytes / 1024
  return sizeInKB < MAX_KB_SIZE
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export async function sendRequest(url: string, arg: any) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  }).then((res) => res.json())
}

export const twentyFourHoursinMs = 24 * 60 * 60 * 1000

export const isJobExpired = (createdAt: Date) => {
  return createdAt.getTime() + twentyFourHoursinMs < Date.now()
}

export function add24Hours(date: Date | string) {
  const newDate = new Date(date)
  newDate.setHours(newDate.getHours() + 24)

  return newDate
}

export const getZeroTimeDate = () => {
  const zeroTime = new Date()
  zeroTime.setHours(0, 0, 0, 0)
  return zeroTime
}
