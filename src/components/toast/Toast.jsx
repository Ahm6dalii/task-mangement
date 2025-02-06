import React, { memo } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'

const Toast = () => {
  return (
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
  )
}

export default memo(Toast)
