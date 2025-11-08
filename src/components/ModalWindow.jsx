import { AddButton } from "./AddButton";
import { Section } from "./SectionBuilder";
export function ModalWindow({
  inputTaskId,
  setModalVisible,
  setTasks,
}) {
  function ConfirmDeleteClick() {
    console.log("Attero, Dominatus!");
    setModalVisible((prev) => !prev);
    console.log(inputTaskId);
    const newTaskList = setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== inputTaskId)
    );
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
  }

  function CancelDeleteClick() {
    setModalVisible((prev) => !prev);
  }
  return (
    <Section className={"dialog_window"}>
      <p>Удалить задачу?</p>
      <div className="input_row_close">
        <AddButton
          id="delete_confirm"
          className="button_dialog"
          content={"Да"}
          onClick={() => ConfirmDeleteClick()}
        />
        <AddButton
          id="delete_cancel"
          className="button_dialog"
          content={"Нет"}
          onClick={() => CancelDeleteClick()}
        />
      </div>
    </Section>
  );
}
