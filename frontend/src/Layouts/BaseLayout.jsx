import React from 'react'
import Navbar from '../components/Navbar'

const BaseLayout = ({children}) => {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}

export default BaseLayout