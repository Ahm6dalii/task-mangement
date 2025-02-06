import React, { memo, useEffect, useState } from 'react'
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { AiOutlineHome, AiOutlineSetting, AiOutlineUser, AiOutlineQuestionCircle } from "react-icons/ai";
import { NavLink } from "react-router"
import { useDispatch, useSelector } from 'react-redux';
import { changeMode } from '../../redux/reducers/modeSlice';
import { TiSpiral } from "react-icons/ti";
import { FaCheck } from "react-icons/fa6";
import { LuWaypoints } from "react-icons/lu";

const Navebar = () => {
     const [isOpen, setIsOpen] = useState(false );
     const dispatch=useDispatch()
    const {mode}=useSelector(store=>store.mode)
    
    useEffect(() => {
      const handleResize = () => {
        setIsOpen(window.innerWidth > 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
      const menuItems = [
        { icon: <LuWaypoints size={20} />, label: 'All', href: '/all' },
        { icon: <FaCheck size={20} />, label: 'Completed', href: '/completed' },
        { icon: <TiSpiral size={20} />, label: 'Pending', href: '/pending' },
      ];
  return (
    <div
    className={`dark:bg-zinc-600 relative min-h-screen bg-white shadow-lg 
      ${isOpen ? 'w-64' : 'w-20'}`}
  >
    {/* Toggle Button */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="absolute -right-3 cursor-pointer top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
    >
      {isOpen ? (
        <RiMenuFoldLine className="h-4 w-4 text-gray-600" />
      ) : (
        <RiMenuUnfoldLine className="h-4 w-4 text-gray-600" />
      )}
    </button>

    {/* Logo Area */}
    <div className="flex h-16 items-center justify-center border-b">
     {/* Dark mood button */}
     <label className="swap swap-rotate mx-2 dark:text-white ">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  checked={mode == "light"}
                  className="theme-controller hidden"
                  onChange={() => { }}
                  value="synthwave"
                  onClick={() =>
                    dispatch(changeMode())
                  }
                />
                {
                  mode == "light" && (
                    /* moon icon */
                    <svg
                      className="swap-on h-7 w-7 fill-current text-black  cursor-pointer "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                  )
                  /* sun icon */
                }
                {mode == "dark" && (
                  <svg
                    className="swap-off h-7 w-7 fill-current cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                )}
                
              
              </label>
      {/* <span className={`font-bold text-xl ${!isOpen && 'hidden'}`}>
        Task Mangement
      </span>
      {!isOpen && <RiMenuUnfoldLine className="h-6 w-6" />} */}
    </div>

    {/* Navigation Items */}
    <nav className="mt-8 px-4">
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.href}
          className="mb-3 flex items-center rounded-lg px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500"
        >
          {item.icon}
          <span
            className={`ml-4 text-sm font-medium transition-opacity duration-200
              ${!isOpen && 'hidden opacity-0'}`}
          >
            {item.label}
          </span>
        </NavLink>
      ))}

  
     
    </nav>

  </div>
  )
}

export default memo(Navebar)
