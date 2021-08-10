import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Data from './Data'
import css from './Sidebar.module.css'

const Navlinks = () => {
  const currentRoute = useHistory().location.pathname.toLowerCase()

  return (
    <aside className={css.left_sidebar}>
      {Data &&
        Data.map((link) => {
          return (
            <NavLink to={link.path} className={css.link_item} key={link.id}>
              <p
                className={
                  currentRoute.includes(`${link.path}`)
                    ? `${css.link_wrapper} ${css.active}`
                    : `${css.link_wrapper}`
                }
              >
                {link.path_name}
              </p>
            </NavLink>
          )
        })}
    </aside>
  )
}

export default Navlinks
