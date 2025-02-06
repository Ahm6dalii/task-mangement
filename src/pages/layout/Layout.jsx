import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeMode } from '../../redux/reducers/modeSlice'
import Toast from '../../components/toast/Toast'
import Home from '../home/Home';

const Layout = () => {
    const {mode}=useSelector(store=>store.mode)
    const dispatch=useDispatch()
    function changeModee(){
        dispatch(changeMode("dark"))  
        console.log(mode);
        
    }
  return (
    <main  className={`${mode=="dark"?"dark":''} overflow-hidden max-w-full bg-green-500 dark:bg-zinc-800`}>
        <Home/>
        <Toast/>
    </main>
  )
}

export default Layout