import React, { useEffect } from 'react'

export default function Select({value='', options=[], classes='', id='', required=false, onChange=(e) => void 0}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={'form-control ' + classes}
      required={required}
      id={id}
    >
      {
        options.map((option) => <option key={option.value} value={option.value}>{option.text}</option>)
      }
    </select>
  )
}
