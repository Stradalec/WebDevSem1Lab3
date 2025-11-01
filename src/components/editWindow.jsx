import { useState, useEffect } from "react";
export function EditWindow({ id,inputTitle, inputDescription, onCancel, onSave }) {
  console.log(inputTitle, inputDescription);
  const [title, setTitle] = useState(() => inputTitle || "");
  const [description, setDescription] = useState(() => inputDescription || "");
  useEffect(() => {
    setTitle(inputTitle || "");
    setDescription(inputDescription || "");
  }, [inputTitle, inputDescription]);
  return (
    <section className="edit_window">
      <input value={title} onChange={(e) => setTitle(e.target.value)}/>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="input_row_close">
        <button id="cancel" className="button_dialog" onClick={onCancel}>
          Отменить
        </button>
        <button
          id="save"
          className="button_dialog"
          onClick={() => onSave({ id, title, description })}
        >
          Сохранить
        </button>
      </div>
    </section>
  );
}
