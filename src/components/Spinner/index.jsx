import React from 'react'
import "./style.css";

export default function Spinner() {
  return (
    <div className="spinner spinner-border text-primary" role="status">
      <span className="sr-only">Загрузка...</span>
    </div>
  )
}
