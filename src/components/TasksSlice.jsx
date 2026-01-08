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
        concreted: false,
      };
      state.push(newTask);
    },
    deleteTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.title = title || task.title;
        task.description = description || task.description;
      }
    },
    moveTask: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const fromTask = state[fromIndex];
      const toTask = state[toIndex];
      if (fromTask.concreted || toTask.concreted) {
        return;
      }
      state.splice(fromIndex, 1);
      state.splice(toIndex, 0, fromTask);
    },
    concreteTask: (state, action) => {
      const id = action.payload.id;
      const task = state.find((task) => task.id === id);
      if (task) {
        const concretedCount = state.filter((task) => task.concreted).length;
        if (task.concreted) {
          task.concreted = false;
        } else {
          if (concretedCount < 3) {
            task.concreted = true;
          }
        }
      }
    },
  },
});
export const { addTask, deleteTask, editTask, moveTask, concreteTask } =
  TaskSlice.actions;
export default TaskSlice.reducer;
