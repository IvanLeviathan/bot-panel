import React, { useContext } from 'react'
import "./style.css";
import { Context } from '../../context/main';
import Button from '../Button';

export default function Auth() {
  const context = useContext(Context);
  const app = context.app;
  const discordAuthSend = () => {
    window.location.href = app.DS_AUTH_URL;
  }

  return (
    <div className="text-center auth-wrapper">
      <div className="form-signin">
        <img className="mb-4" src="https://cdn.discordapp.com/app-icons/802686207493931078/2c26ed86bad5a81ae54a0b9b77cbdce0.png?size=256" alt="" width="256" height="256"/>
        <h1 className="h3 mb-3 font-weight-normal">Панель управления "Hesh Jr"</h1>
        <Button
          text="Войти через Discord"
          onClick={discordAuthSend}
          classes="btn-discord btn-block"
        />
        <p className="mt-5 mb-3 text-muted">© 2021 <a href="https://discord.gg/eMauW6ZmhJ" target="_blank" rel="noreferrer">Hesh</a></p>
      </div>
    </div>
  )
}
