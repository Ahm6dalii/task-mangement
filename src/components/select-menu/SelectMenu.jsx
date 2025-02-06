import React, { memo } from 'react'
import { useDispatch } from 'react-redux';
import { sortedTasks } from '../../redux/reducers/taskSlice';

const SelectMenu = () => {
    const dispatch=useDispatch()
    const selectedValue=(value)=>{
            console.log(value.target.value);
            dispatch(sortedTasks(value.target.value))
    }

  return (
<select class="select select-bordered select-sm  dark:text-black dark:bg-gray-300   w-[30%] max-w-xs dark:text-black" onChange={selectedValue}>
  <option disabled selected hidden>Sort</option>
  <option>Default</option>
  <option>Oldest</option>
  <option>Newest</option>
</select>
  )
}

export default memo(SelectMenu)