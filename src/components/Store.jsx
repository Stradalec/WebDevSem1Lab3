import { configureStore} from "@reduxjs/toolkit"
import  TaskReducer  from "./TasksSlice"
const store = configureStore({
    reducer: {
        tasks: TaskReducer
    },
})

export default store;