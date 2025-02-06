import React, { memo } from 'react'
import { MdDelete } from "react-icons/md";
import { MdOpenInNew } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../../redux/reducers/taskSlice';
import UpdateModal from '../modal/UpdateModal';
const Card = ({item}) => {

    
    const dispatch=useDispatch()
   const removeTask=(id)=>{
    // console.log(id);
        dispatch(deleteTask(id))
    }

    const updateComplete=(value)=>{
      console.log(item.id);
      
      dispatch(updateTask({id:item.id,updatedTask:{...item,completed:!value}}))

    }  

  return (
    <div className='p-4 rounded-xl text-gray-800 bg-gray-300 dark:text-gray-800 dark:bg-gray-400'>
      <div className='flex items-center justify-between'>
      <h3 className='text-sm border-b mb-3 font-semibold capitalize'>{item?.title.split(' ').slice(0,3).join(' ')}</h3>
      < MdOpenInNew className='cursor-pointer' />

        </div>      
    <p className='text-gray-600   leading-5'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, quibusdam?</p>
   
      <div className='flex justify-between items-center mt-4'>
            <div>
                  <button onClick={()=>updateComplete(item?.completed)} className={`btn ${item?.completed?'bg-green-700':'bg-red-800'} border-none shadow-none rounded-4xl text-gray-100 px-5`}>{item?.completed?'Completed':'InCompleted'}</button>
            </div>
            <div className='flex gap-2 ms-3'>
            <UpdateModal task={item}/>
            <MdDelete onClick={()=>removeTask(item?.id)}  className='text-red-900  cursor-pointer '  />

            </div>
      </div>
      <div className='flex justify-end gap-2 items-center text-gray-500'>
     <p className='mt-3 text-[10px]'>{new Date(item.time).toLocaleDateString()}</p>
     <p className='mt-3 text-[10px]'>{new Date(item.time).toLocaleTimeString()}</p>
     </div>
  </div>
  )
}

export default memo(Card)