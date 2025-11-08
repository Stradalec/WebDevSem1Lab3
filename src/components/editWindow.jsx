import { useState, useEffect } from "react";
export function EditWindow({ inputTask, inputTitle, inputDescription, setEditModalVisible, setTasks, inputTaskList }) {
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
    inputTask.title = title
    inputTask.description = description
    setTasks(
      inputTaskList.map((task) => (task.id === inputTask.id ? inputTask : task))
    );
    setEditModalVisible(false);
  }
  return (
    <section className="edit_window">
      <input value={title} onChange={(e) => setTitle(e.target.value)}/>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="input_row_close">
        <button id="cancel" className="button_dialog" onClick={() => handleCancel()}>
          Отменить
        </button>
        <button
          id="save"
          className="button_dialog"
          onClick={() => handleSave(inputTask) }
        >
          Сохранить
        </button>
      </div>
    </section>
  );
}
