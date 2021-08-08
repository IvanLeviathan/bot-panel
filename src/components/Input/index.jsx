import React from 'react'

export default function Input({type="text", value="", onChange=(e) => void 0, classes="", disabled=false, placeholder="", required=false, id=''}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={'form-control ' + classes}
      placeholder={placeholder}
      required={required}
      id={id}
      disabled={disabled}
    />
  )
}
