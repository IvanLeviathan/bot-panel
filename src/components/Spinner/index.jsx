import React from 'react'
import "./style.css";

export default function Spinner(props) {
  return (
    props.card ? (
      <div className="card spinner-card">
        <div className="card-body">
          <div className="spinner spinner-border text-primary" role="status">
            <span className="sr-only">Загрузка...</span>
          </div>
        </div>
      </div>
    ) : (
      <div className="spinner spinner-border text-primary" role="status">
        <span className="sr-only">Загрузка...</span>
      </div>
    )
  )
}
