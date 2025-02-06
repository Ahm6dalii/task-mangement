import { configureStore } from "@reduxjs/toolkit";
import { apiLinkReducer } from "./reducers/apiLinkSlice";
import { modeReducer } from "./reducers/modeSlice";
import { taskReducer } from "./reducers/taskSlice";



let store=configureStore({
    reducer:{
        apiLink:apiLinkReducer,
        mode:modeReducer,
        taskReducer
    }
})


export default store;
