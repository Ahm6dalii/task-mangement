import React, { useEffect, useState } from 'react';

import Navebar from '../../components/navebar/Navebar';
import { useDispatch, useSelector } from 'react-redux';
import { filterTask, getTask } from '../../redux/reducers/taskSlice';
import { useLocation} from 'react-router-dom';
import Card from '../../components/card/Card';
import { LoadingScreen } from '../../components/loading-screen/LoadingScreen';
import { SearchInput } from '../../components/search/SearchInput';
import SelectMenu from '../../components/select-menu/SelectMenu';
import { TbMoodEmpty } from "react-icons/tb";
import AddModal from '../../components/modal/AddModal';

const Home = () => {
    const {task,isLoading}=useSelector(store=>store.taskReducer)
    // console.log(task);
    
      const {pathname}=useLocation()
      const dispatch=useDispatch()

      const filterTasks=(name)=>{
        console.log(name);
        dispatch(filterTask(name.split('/')[1]))
      }   

useEffect(()=>{
    dispatch(getTask())
},[])
useEffect(()=>{
 filterTasks(pathname)
},[pathname])



  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <Navebar/>

        {/* Main Content */}
        <div className="flex-1 p-8 dark:bg-zinc-900/80 dark:text-white" >
        {isLoading?<LoadingScreen/>:
          <div className=" ">
                <div className='flex justify-between items-center text-3xl font-bold text-gray-800 dark:text-amber-200'>
                    <h1 className='capitalize'>{pathname.replace(/[/]/g, " ")} Task</h1>
                    <AddModal/>
                </div>
                <hr />
                {!task?<div className='mt-5 text-red-400 font-semibold text-center h-[70vh] w-full flex items-center justify-center'> No Task Created yet ..</div>
                :<>
                <div className='flex justify-between mt-3 items-center'>
                      <SearchInput/>
                      <SelectMenu/>
                </div>
                
                <div className={`grid ${task?.length==0 ? `sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1`:`sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3`}  mt-3 gap-3`}>
                    {task?.length==0?<div className='mt-4 text-red-400 font-semibold  w-full flex items-center gap-1 justify-center '>No Task Founded <TbMoodEmpty />
                      </div>:task?.map((item,index)=>(
                    <Card key={index} item={item}/>
                  ))}
                  
                </div>
                </>
                }
          </div>
        }
        </div>
      </div>
    </div>
  );
};

export default Home;