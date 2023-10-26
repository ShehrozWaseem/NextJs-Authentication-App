import React from 'react'
import {Toaster} from 'react-hot-toast'
const ToasterLayout = ({children}) => {
  return (
    <div>
      <Toaster/>
      {children}
    </div>
  )
}

export default ToasterLayout