import React from 'react'
import { NavLink } from 'react-router-dom'
import { Context } from '../../context/main';
import { useContext } from 'react';
import "./style.css";
export default function Sidebar() {
  const context = useContext(Context);
  const links = context.links;

  return (
    <>
    <div className="card sidebar-card">
      <div className="card-body">
        <ul className="nav flex-column">
          {links.map((link) => {
            return (
              <li className="nav-item" key={link.url}>
                <NavLink className="nav-link" activeClassName="text-black-50" exact to={link.url}>{link.name}</NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
    {/* <div className="mt-3">
      <iframe title="discord" src="https://discord.com/widget?id=844866169315262495&theme=dark" width="100%" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
    </div> */}
  </>
  )
}
