import React from 'react'
import { NavLink } from 'react-router-dom'
import { Context } from '../../context/main';
import { useContext } from 'react';
import "./style.css";
export default function Sidebar() {
  const context = useContext(Context);
  const links = context.links;

  return (
    <div className="px-2 py-3">
      <h3 className="mb-3">Навигация</h3>
      <ul className="nav flex-column">
        {links.map((link) => {
          return (
            <li className="nav-item" key={link.url}>
              <NavLink className="nav-link" activeClassName="text-black-50" to={link.url}>{link.name}</NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
