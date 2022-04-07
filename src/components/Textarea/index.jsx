import React from 'react'
import "./style.css";

export default function Textarea({value="", onChange=(e) => void 0, classes="", disabled=false, placeholder="", required=false, id=''}) {
  const resizeTextArea = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = (e.target.scrollHeight + 5) + "px";
  }
  
  return (
    <textarea
      value={value}
      onChange={(e) => {
        onChange(e)
        resizeTextArea(e)
      }}
      onLoad={resizeTextArea}
      onInput={resizeTextArea}
      className={'form-control ' + classes}
      placeholder={placeholder}
      required={required}
      id={id}
      disabled={disabled}
    />
  )
}
