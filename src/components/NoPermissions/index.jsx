import React from 'react'

export default function NoPermissions({curGuild={}}) {
  return (
    <div className="card">
      <div className="card-body">
        <h2>Недостаточно прав для изменения.</h2>
        Только пользователи с правами администратора на сервере <b>{curGuild.name}</b> имеют право на изменение.
      </div>
    </div>
  )
}
