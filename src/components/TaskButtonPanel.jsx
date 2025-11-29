import { useState } from "react";
import { concreteTask } from "./TasksSlice";
import { useDispatch } from "react-redux";
import { AddButton } from "./AddButton";
import { Section } from "./SectionBuilder";
export function TaskButtonPanel({
  inputTask,
  inputTaskList,
  setEditModalVisible,
  setTitle,
  setDescription,
  setShareVisible,
  setSavedTaskId,
}) {
  const dispatch = useDispatch();
  const handleConcreteTask = () => {
    dispatch(concreteTask({ id: inputTask.id }));
  };
  function changeShareVisibility(id) {
    setShareVisible((prev) => !prev);
    setSavedTaskId(id);
  }
  function changeEditVisibility(id) {
    const targetTask = inputTaskList.find((task) => task.id == id);
    setTitle(targetTask.title);
    setDescription(targetTask.description);
    setSavedTaskId(id);
    setEditModalVisible(true);
  }
  return (
    <Section key={inputTask.id + "p"} className={"input_row_right"}>
      {
        <AddButton
          id={inputTask.id + "e"}
          className="button_task_edit"
          content={
            <img
              src="src/assets/pictures/edit.svg"
              alt="Редактировать заметку"
            />
          }
          onClick={() => changeEditVisibility(inputTask.id)}
        ></AddButton>
      }
      {
        <AddButton
          id={inputTask.id + "i"}
          className="button_task_info"
          content={
            <img
              src="src/assets/pictures/info.svg"
              alt="Информация о заметке"
            />
          }
          onClick={handleConcreteTask}
        ></AddButton>
      }
      {
        <AddButton
          id={inputTask.id + "s"}
          className="button_task_share"
          content={
            <img
              src="src/assets/pictures/share.svg"
              alt="Поделиться заметкой"
            />
          }
          onClick={() => changeShareVisibility(inputTask.id)}
        ></AddButton>
      }
    </Section>
  );
}
