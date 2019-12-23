import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }
  console.log('value', value)
  return {
    type,
    value,
    onChange,
    reset,
    withoutReset: {
      type,
      value,
      onChange,
    }
  }
}
