import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (evt) => {
    setValue(evt.target.value)
  }

  const resetForm = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    resetForm
  }
}

export default useField