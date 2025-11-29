import { AddButton } from "./AddButton";
import { Section } from "./SectionBuilder";
import { useDispatch, useSelector} from "react-redux";
import { deleteTask } from "./TasksSlice";
export function ModalWindow({
  inputTaskId,
  setModalVisible
}) {
  const dispatch = useDispatch();
  function ConfirmDeleteClick() {
    console.log("Attero, Dominatus!");
    
    dispatch(deleteTask(inputTaskId));
    setModalVisible((prev) => !prev);
    console.log(inputTaskId);
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
