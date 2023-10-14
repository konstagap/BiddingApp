import React from 'react'

type Props = {
  loading: boolean
  labels: {
    default: string
    loading: string
  }
}

const SubmitButton = ({ loading, labels }: Props) => {
  return (
    <div>
      <button type='submit' className='btn btn-accent btn-block'>
        {loading ? labels.loading : labels.default}
        {loading ? <span className='loading loading-ring loading-sm'></span> : '🚀'}
      </button>
    </div>
  )
}

export default SubmitButton
