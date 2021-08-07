import React from 'react'
import "./style.css";

export default function Button({onClick=(e) => void 0, text='', classes = '', disabled=false, type="button"}) {
  return <button
    onClick={onClick}
    className={'btn btn-primary ' + classes}
    disabled={disabled}
    type={type}
  >
  {text}
  </button>
}
