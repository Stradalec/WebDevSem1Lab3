import { createSlice } from "@reduxjs/toolkit";
export const TaskSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: tasks.length,
                title: action.payload.title || "Неизвестен",
                description: action.payload.description || "Без названия",
                };
            state.push(newTask)
        }
    }
})
export const { addTask} = TaskSlice.actions
export default TaskSlice.reducer