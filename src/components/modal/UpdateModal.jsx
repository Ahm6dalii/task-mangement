import { useFormik } from 'formik';
import React, { memo, useEffect, useId, useRef, useState } from 'react'
import * as Yup from 'yup'
import { FaSpinner } from "react-icons/fa6";
import {  updateTask } from '../../redux/reducers/taskSlice';
import { useDispatch} from 'react-redux';
import { FiEdit } from "react-icons/fi";

const UpdateModal = ({task}) => {
  const [isLoading,setLoading]=useState(false)
  const intClear=useRef()
  const dispatch=useDispatch()
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is Required").min(6, "min characters is 6").max(25, "min characters is 25"),
    completed: Yup.boolean().required("Status is Required"),
  })
  const handleRegister=()=>{
    console.log(values);
    setLoading(true)
    dispatch(updateTask({id:task.id,updatedTask:values}))
    intClear.current=setTimeout(()=>{
      setLoading(false)
    },1)
    document.getElementById(`my_modal_${task.id}`).close()
    resetForm()
    
  }
    useEffect(()=>{
        return()=>{
          clearTimeout(intClear.current)
        }
    },[])
  const { handleBlur, handleChange, handleSubmit, values, errors ,touched ,resetForm} = useFormik({
    initialValues: {
      id:task.id,
      userId:task.userId,
      title: task.title,
      completed: task.completed,
      time:task.time
    }
    , validationSchema,
    onSubmit: handleRegister,

  })
  return (
    <>
      <button onClick={() => document.getElementById(`my_modal_${task.id}`).showModal()}>            <FiEdit className='cursor-pointer' />
      
      </button>
      <dialog id={`my_modal_${task.id}`} className="modal">
        <div className="modal-box dark:bg-zinc-800 dark:text-gray-50">
          <form onSubmit={handleSubmit}  className="">
                <h3 className='text-center mb-4 border-b pb-5 w-fit mx-auto text-3xl font-bold '>UpdateTask </h3>
            <div className="relative z-0 w-full mb-2 group">
              <input onChange={handleChange} onBlur={handleBlur} type="text" value={values.title} name="title" id="title" className={`${errors.title && touched.title?"border-red-700 focus:border-red-700":'border-gray-300 focus:border-green-500'} block py-2 sm:py-2.5 px-0 w-full text-sm font-normal text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer`} placeholder=" " />
                <label htmlFor="title" className={` ${errors.title && touched.title?'peer-focus:text-red-700 peer-focus:dark:text-red-700':'peer-focus:text-green-600 peer-focus:dark:text-green-500' } peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Task Title </label>
            </div>
            {errors.title && touched.title && <p className={`mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`}>{errors.title}</p>}
            
              <div className='flex gap-2 mb-4'> 
                <label className='text-sm' htmlFor=" check">Tast Status</label>
              <input onChange={handleChange}   checked={values.completed} onBlur={handleBlur} name="completed"  type="checkbox" id='check'  className="checkbox text-sm "  />
              </div>

              <button type="submit"  className={`btn btn-success`}>{isLoading? <FaSpinner className='animate-spin' />:'Update'}</button>

          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export default memo(UpdateModal)