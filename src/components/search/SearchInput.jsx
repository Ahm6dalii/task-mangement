import React from 'react'
import { useDispatch } from 'react-redux'
import { searchTask } from '../../redux/reducers/taskSlice'

export const SearchInput = () => {
    const dispatch=useDispatch()
    const taskSearch=(e)=>{
        dispatch(searchTask(e.target.value))
    }
  return (
    <label className="input input-bordered w-[50%] flex items-center gap-2 dark:bg-gray-300">
    <input type="text" onChange={taskSearch} class="grow dark:text-black dark:bg-gray-300  "  placeholder="Search" />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      class="h-4 w-4 opacity-70 dark:text-black">
      <path
        fill-rule="evenodd"
        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
        clip-rule="evenodd" />
    </svg>
  </label>
  )
}
