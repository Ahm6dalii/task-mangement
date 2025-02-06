import { useFormik } from 'formik';
import React, { memo, useId } from 'react'
import * as Yup from 'yup'
import { FaSpinner } from "react-icons/fa6";
import {  updateTask } from '../../redux/reducers/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit } from "react-icons/fi";

const UpdateModal = ({task}) => {
  const {isLoading}=useSelector(store=>store.taskReducer)
  const dispatch=useDispatch()
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is Required").min(6, "min characters is 6").max(25, "min characters is 25"),
    completed: Yup.boolean().required("Status is Required"),
  })
  const handleRegister=()=>{
    // console.log(values);
    dispatch(updateTask({id:task.id,updatedTask:values}))
    document.getElementById('my_modal_3').close()
  }
  const { handleBlur, handleChange, handleSubmit, values, errors ,touched} = useFormik({
    initialValues: {
      title: task.title,
      completed: task.completed,
      time:new Date()
    }
    , validationSchema,
    onSubmit: handleRegister,

  })
  return (
    <>
      <button onClick={() => document.getElementById('my_modal_3').showModal()}>            <FiEdit className='cursor-pointer' />
      
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}  className="">
                <h3 className='text-center mb-4 border-b pb-5 w-fit mx-auto'>UpdateTask </h3>
            <div className="relative z-0 w-full mb-2 group">
              <input onChange={handleChange} onBlur={handleBlur}  type="text"  name="title" id="title" className={`${errors.title && touched.title?"border-red-700 focus:border-red-700":'border-gray-300 focus:border-green-500'} block py-2 sm:py-2.5 px-0 w-full text-sm font-normal text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer`} placeholder=" " />
                <label htmlFor="title" className={` ${errors.title && touched.title?'peer-focus:text-red-700 peer-focus:dark:text-red-700':'peer-focus:text-green-600 peer-focus:dark:text-green-500' } peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Task Title </label>
            </div>
            {errors.title && touched.title && <p className={`mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`}>{errors.title}</p>}
            
              <div className='flex gap-2 mb-4'> 
                <label className='text-sm' htmlFor=" check">Tast Status</label>
              <input onChange={handleChange}  value={task.title} checked={values.completed} onBlur={handleBlur} name="completed"  type="checkbox" id='check'  className="checkbox text-sm "  />
              </div>

              <button type="submit"  className={`btn btn-success`}>{isLoading? <FaSpinner className='animate-spin' />:'Submit'}</button>

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