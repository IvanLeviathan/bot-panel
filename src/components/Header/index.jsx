import React from 'react'
import Button from '../Button';
import { NavLink } from 'react-router-dom';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';
import "./style.css";

export default function Header({user = {}, guilds = [], logout = (e) => void 0, guildsOpened, curGuildClick = (e) => void 0, guildListClick = (e) => void 0}) {

  

  return (
    <header className="bg-dark">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
            <nav className="navbar navbar-dark pl-0 py-1">
              <div className="navbar-brand">
                {
                  Object.keys(user).length ? (
                    <div className="d-flex align-items-center">
                      <img src={user.avatar} className="d-inline-block align-top rounded-circle mr-3" alt=""/>
                      <span className="text-white">{user.username}#{user.discriminator}</span>
                    </div>
                  ) : (
                    <Spinner/>
                  )
                }
              </div>
            </nav>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            {
              guilds.GUILDS.length ? (
                <div className={guildsOpened ? 'guilds-list show' : 'guilds-list'}>
                  <div className="cur-guild" onClick={curGuildClick}>
                    {guilds.CUR_GUILD.icon && (
                      <img className="rounded-circle" src={`https://cdn.discordapp.com/icons/${guilds.CUR_GUILD.id}/${guilds.CUR_GUILD.icon}.png`} alt={guilds.CUR_GUILD.name} />
                    )}
                    {guilds.CUR_GUILD.name}
                  </div>
                  <div className="guild-list">
                    {
                      guilds.GUILDS.map((guild) => {
                        return(
                          <div key={guild.id} className={guild.id === guilds.CUR_GUILD.id ? "guild-item current" : 'guild-item'} onClick={() => guildListClick(guild.id)}>
                            {guild.icon && (
                              <img className="rounded-circle" src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt={guild.name} />
                            )}
                            {guild.name}
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              ) : (
                <Spinner/>
              )
            }
            
          </div>
          <div className="col-md-2 text-right">
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
  guilds: PropTypes.object,
  logout: PropTypes.func,
  guildsOpened: PropTypes.bool,
  curGuildClick: PropTypes.func,
  guildListClick: PropTypes.func
}