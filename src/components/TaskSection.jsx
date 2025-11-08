import { useState } from "react";
import { AddButton } from "./AddButton";
import { Section } from "./SectionBuilder";
export function TaskSection({inputTask, setModalVisible, setPanelVisibility, setSavedTaskId}) {
  function handleShowButtonsClick() {
    console.log("I am only human, after all");
    setPanelVisibility((prev) => !prev);
  }
  function changeModalVisibility(id) {
    setSavedTaskId(id);
    setModalVisible((prev) => !prev);
  }
  return (
    <Section key={inputTask.id + "w"} className={"task_window"}>
              {
                <AddButton
                  id={inputTask.id + "m"}
                  className="task_window_button"
                  content={null}
                  onClick={handleShowButtonsClick}
                >
                  {" "}
                  <h2>{inputTask.title}</h2>
                  <p>{inputTask.description}</p>{" "}
                </AddButton>
              }

              {
                <AddButton
                  id={inputTask.id + "d"}
                  className="button_task_delete"
                  content={
                    <img
                      src="src/assets/pictures/delete.svg"
                      alt="Удалить заметку"
                    />
                  }
                  onClick={() => changeModalVisibility(inputTask.id)}
                ></AddButton>
              }
            </Section>
  );
}