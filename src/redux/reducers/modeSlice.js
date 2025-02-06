import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mode:localStorage.getItem('mode')?localStorage.getItem('mode'):'light'
  }
  const modeSlice=createSlice({
    name:'mode',
    initialState,
    reducers:{
      changeMode:(state,action)=>{        
        state.mode=state.mode=="dark"?"light":"dark";  
        localStorage.setItem("mode",state.mode)
        console.log(state);
            
      },
    }
  })
  
  export const {changeMode}=modeSlice.actions;
  export let modeReducer= modeSlice.reducer