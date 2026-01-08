import { configureStore} from "@reduxjs/toolkit"
import  TaskReducer  from "./TasksSlice"
const preloadedState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};
const store = configureStore({
    reducer: {
        tasks: TaskReducer
    },
  preloadedState,
})
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
});
export default store;