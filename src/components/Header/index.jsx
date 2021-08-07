import React from 'react'
import Button from '../Button';
import { NavLink } from 'react-router-dom';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';


export default function Header({user = {}, guilds = [], logout = (e) => void 0}) {
  return (
    <header className="bg-dark">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-10">
            <nav className="navbar navbar-dark pl-0">
              <div className="navbar-brand">
                {
                  Object.keys(user).length ? (
                    <NavLink to="/">
                      <img src={user.avatar} className="d-inline-block align-top rounded-circle mr-3" alt=""/>
                      <span className="text-white">{user.username}#{user.discriminator}</span>
                    </NavLink>
                  ) : (
                    <Spinner/>
                  )
                }
                
              </div>
            </nav>
          </div>
          <div className="col-2 text-right">
            <Button
              text="Выход"
              classes="btn-danger"
              onClick={logout}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  user: PropTypes.object,
  guilds: PropTypes.array,
  logout: PropTypes.func
}