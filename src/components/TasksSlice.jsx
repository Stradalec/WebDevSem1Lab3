import { createSlice } from "@reduxjs/toolkit";

export const TaskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload.title || "Неизвестен",
        description: action.payload.description || "Без названия",
      };
      state.push(newTask);
    },
    deleteTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    editTask: (state,action) => {
      const { id, title, description } = action.payload; 
      const task = state.find(task => task.id === id);
      if (task) {
        task.title = title || task.title; 
        task.description = description || task.description;
      }
    }
  },
});
export const { addTask, deleteTask, editTask } = TaskSlice.actions;
export default TaskSlice.reducer;
