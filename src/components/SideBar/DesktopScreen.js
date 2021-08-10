import React from 'react'

import style from './Sidebar.module.css'
import Navlinks from './Navlinks'

const DesktopScreen = () => {
  return (
    <section>
      <div className={style.listswrapper}>
        <Navlinks />
      </div>
    </section>
  )
}

export default DesktopScreen
