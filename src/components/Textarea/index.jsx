import React from 'react'
import "./style.css";

export default function Textarea({value="", onChange=(e) => void 0, classes="", disabled=false, placeholder="", required=false, id=''}) {
  return (
    <textarea
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
