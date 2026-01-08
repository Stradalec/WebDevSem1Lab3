import { useState, useEffect } from "react";
import { editTask } from "./TasksSlice";
import { useDispatch } from "react-redux";
export function EditWindow({
  inputTask,
  inputTitle,
  inputDescription,
  setEditModalVisible,
}) {
  const dispatch = useDispatch();
  console.log(inputTitle, inputDescription);
  const [title, setTitle] = useState(inputTitle || "");
  const [description, setDescription] = useState(inputDescription || "");
  useEffect(() => {
    setTitle(inputTitle || "");
    setDescription(inputDescription || "");
  }, [inputTitle, inputDescription]);

  function handleCancel() {
    setEditModalVisible(false);
  }

  function handleSave(inputTask) {
    dispatch(editTask({id: inputTask.id,title: title, description: description}));
    setEditModalVisible(false);
  }
  return (
    <section className="edit_window">
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="input_row_close">
        <button
          id="cancel"
          className="button_dialog"
          onClick={() => handleCancel()}
        >
          Отменить
        </button>
        <button
          id="save"
          className="button_dialog"
          onClick={() => handleSave(inputTask)}
        >
          Сохранить
        </button>
      </div>
    </section>
  );
}
