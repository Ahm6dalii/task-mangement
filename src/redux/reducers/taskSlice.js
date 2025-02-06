import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toastError, toastSuccess } from "../../utls/toast.utl";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const getTask = createAsyncThunk("task/getTask", async () => {
  const response = await axios.get(API_URL);
    // console.log(response);
    
  const myData = response.data.map((task) => ({
    ...task,
    time: Date.now() + Math.floor(Math.random() * 10000) 
  }));
  localStorage.setItem('data',JSON.stringify(myData))
  return myData; 
});

// Add a new task
const addTask = createAsyncThunk("task/addTask", async (newTask) => {
  const response = await axios.post(API_URL, newTask);
  return response.data; 
})

// Update a task
const updateTask = createAsyncThunk("task/updateTask", async ({ id, updatedTask }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTask);
  console.log(response);
  
  return response.data; 
});

// delete a task
const deleteTask = createAsyncThunk("task/deleteTask", async (taskId) => {
  const response= await axios.delete(`${API_URL}/${taskId}`);
  // console.log(response);
  
  return taskId; // Return the deleted task's ID so we can update the Redux store
});

// Filter tasks by date
const filterTasks = (tasks,name) => {
  return tasks?.filter((task) => {
  
    if(name.toLowerCase()=='pending')
    {
      return task.completed ==false
    }else if(name.toLowerCase()=='completed'){
      return task.completed ==true
    }else{
      return task
    }
  });
};

// Sort tasks by time (ascending or descending)
const sortTasksByTime = (tasks, order) => {
  return [...tasks].sort((a, b) =>
    order.toLowerCase() === "oldest" ? new Date(a.time) - new Date(b.time) : new Date(b.time) - new Date(a.time)
  );
};

// Initial state
const initialState = {
  orignalTask:null,
  task: null,
  isLoading: false,
  isError: false,
  error: null,
  filteredTasks:null
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // Reducer for filtering tasks by date
    filterTasks(state, action) {
      // console.log(action,'dddddddddddd');
      
      state.task = filterTasks(state.orignalTask,action.payload);
    },
     // Sort tasks by time (date)
     sortTasks(state, action) {
      state.task = sortTasksByTime(state.orignalTask, action.payload);
    },
    searchTasks(state, action) {
      const searchTerm = action.payload.toLowerCase();
      state.task = state.orignalTask.filter((task) =>
        task.title.toLowerCase().includes(searchTerm)
      );
   
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTask.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        // console.log(state);
        
        state.isLoading = false;
        state.task = action.payload;
        state.orignalTask = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })

       // Handle adding a task
       .addCase(addTask.fulfilled, (state, action) => {
        state.task.unshift(action.payload);
        toastSuccess("Task Created ")
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error.message;
        toastError("Task Faild")

      })

         // Handle updating a task
         .addCase(updateTask.fulfilled, (state, action) => {
          console.log(action.payload);
          
          state.task = state.orignalTask.map((task) =>
            task.id === action.payload.id ? action.payload : task
          );
          toastSuccess('Task Updated')

        })
        .addCase(updateTask.rejected, (state, action) => {
          state.isError = true;
          toastError("Task Faild")

          state.error = action.error.message;
        })

       // Handle deleting a task
       .addCase(deleteTask.fulfilled, (state, action) => {
        toastSuccess('Task Deleted')
        state.task = state.task.filter((task) => task.id !== action.payload);
        localStorage.setItem('data',JSON.stringify(state.task))
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isError = true;
        toastError("Task Faild")
        state.error = action.error.message;
      });
  },
});


export const taskReducer = taskSlice.reducer;
export const filterTask  = taskSlice.actions.filterTasks;
export const sortedTasks  = taskSlice.actions.sortTasks;
export const searchTask  = taskSlice.actions.searchTasks;
export { getTask , addTask, updateTask, deleteTask};

