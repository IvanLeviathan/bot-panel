import React from 'react'
import { NavLink } from 'react-router-dom'
import "./style.css";
import { app } from '../../_config';
import Input from '../Input';

export default function UsersList(props) {
  return (
    <div className="list-group">
      <div className="list-group-item">
        <Input
          value={props.searchValue}
          onChange={props.changeSearchValue}
          placeholder="Поиск..."
        />
      </div>
      { props.users.length ? (
        props.users.map((user) => {
          return (
              <NavLink key={user.id} to={`/users/${user.id}`} className="list-group-item list-group-item-action">
                <p className="user-list-item m-0">
                  {user.avatar && (
                    <span className="user-list-image mr-3">
                      <img src={user.avatar} alt={user.username} />
                    </span>
                  )}
                  <span className="user-list-info">
                    {user.nickname && (
                      <span className="user-list-nickname mb-1 d-block">{user.nickname}</span>
                    )}
                    <span className="user-list-username mb-1 d-block">{user.username}#{user.discriminator}</span>
                  </span>
                </p>
              </NavLink>
          )
        })
      ) : (
        <div className="list-group-item">Список пользователей пуст</div>
      )
      }
    </div>
  )
}
