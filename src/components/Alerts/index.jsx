import React from 'react'
import "./style.css";

export default function Alerts(alerts = []) {
  return (
    alerts.items.length ? (
      <div className="alerts">
        {alerts.items.map((alert) => <div key={alert.id} className={`alert alert-${alert.type}`} role="alert">{alert.text}</div>)}
      </div>
    ) : null
  )
}
