import { useEffect, useState, Fragment } from "react";
import "./App.css";
import { InputColumn } from "./Input_column";
import { AddButton } from "./addButton";
import { Section } from "./sectionBuilder";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPanelVisible, setPanelVisibility] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [savedTaskId, setSavedTaskId] = useState(0)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  function handleAddClick() {
    console.log("Нажми на кнопку - получишь результат");
    const newTask = {
      id: tasks.length,
      title: title || "Неизвестен",
      description: description || "Без названия",
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  }

  function changeModalVisibility(id){
    setModalVisible((prev) => !prev);
    setSavedTaskId(id);
  }
  function ConfirmDeleteClick() {
    console.log("Attero, Dominatus!");
    setModalVisible((prev) => !prev);
    const newTaskList = setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== savedTaskId)
    );
    setSavedTaskId(-1)
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
  }

  function CancelDeleteClick(){
    setSavedTaskId(-1)
    setModalVisible((prev) => !prev);
  }

  function handleShowButtonsClick() {
    console.log("I am only human, after all");
    setPanelVisibility((prev) => !prev);
  }

  return (
    <>
      <header></header>
      <main className="main">
        <Section className={"input_row"}>
          <InputColumn
            titleValue={title}
            descriptionValue={description}
            onTitleChange={(e) => setTitle(e.target.value)}
            onDescriptionChange={(e) => setDescription(e.target.value)}
          />
          <AddButton
            id="add"
            className="button_add"
            content={"+"}
            onClick={handleAddClick}
          />
        </Section>
        {tasks.length == 0 && (
          <Section className={"no_task_window"}>
            <div></div>
            <p>Нет задач</p>
            <div></div>
          </Section>
        )}
        {isModalVisible && (<Section className={"dialog_window"} style={{ display: isModalVisible ? "flex" : "none" }}>
          <p>Удалить задачу?</p>
          <div className="input_row_close">
            <AddButton
              id="delete_confirm"
              className="button_dialog"
              content={"Да"}
              onClick={() =>ConfirmDeleteClick()}
            />
            <AddButton
              id="delete_cancel"
              className="button_dialog"
              content={"Нет"}
              onClick={() => CancelDeleteClick()}
            />
          </div>
        </Section>)}
        
        <Section className={"share_window"}>
          <AddButton
            id="copy"
            className="button_share"
            content={
              <img src="src/assets/vector/copy.svg" alt="Копировать заметку" />
            }
          >
            {" "}
          </AddButton>
          <AddButton
            id="vk"
            className="button_share"
            content={
              <img src="src/assets/vector/vk.svg" alt="Поделиться в VK" />
            }
          >
            {" "}
          </AddButton>
          <AddButton
            id="tg"
            className="button_share"
            content={
              <img
                src="src/assets/vector/telegram.svg"
                alt="Поделиться в Telegram"
              />
            }
          >
            {" "}
          </AddButton>
          <AddButton
            id="wp"
            className="button_share"
            content={
              <img
                src="src/assets/vector/whatsapp.svg"
                alt="Поделиться в Whatsapp"
              />
            }
          >
            {" "}
          </AddButton>
          <AddButton
            id="fb"
            className="button_share"
            content={
              <img
                src="src/assets/vector/facebook.svg"
                alt="Поделиться в Facebook"
              />
            }
          >
            {" "}
          </AddButton>
        </Section>
        {tasks.map((task) => (
          <Fragment key ={task.id}>
            <Section key={task.id + "w"} className={"task_window"}>
              {
                <AddButton
                  id={task.id + "m"}
                  className="task_window_button"
                  content={null}
                  onClick={handleShowButtonsClick}
                >
                  {" "}
                  <h2>{task.title}</h2>
                  <p>{task.description}</p>{" "}
                </AddButton>
              }

              {
                <AddButton
                  id={task.id + "d"}
                  className="button_task_delete"
                  content={
                    <img
                      src="src/assets/pictures/delete.svg"
                      alt="Удалить заметку"
                    />
                  }
                  onClick={() => changeModalVisibility(task.id)}
                ></AddButton>
              }
            </Section>
            {isPanelVisible == task.id && (
              <Section
                key={task.id + "p"}
                className={"input_row_right"}
                style={{ display: isPanelVisible ? "flex" : "none" }}
              >
                {
                  <AddButton
                    id={task.id + "e"}
                    className="button_task_edit"
                    content={
                      <img
                        src="src/assets/pictures/edit.svg"
                        alt="Редактировать заметку"
                      />
                    }
                  ></AddButton>
                }
                {
                  <AddButton
                    id={task.id + "i"}
                    className="button_task_info"
                    content={
                      <img
                        src="src/assets/pictures/info.svg"
                        alt="Информация о заметке"
                      />
                    }
                  ></AddButton>
                }
                {
                  <AddButton
                    id={task.id + "s"}
                    className="button_task_share"
                    content={
                      <img
                        src="src/assets/pictures/share.svg"
                        alt="Поделиться заметкой"
                      />
                    }
                  ></AddButton>
                }
              </Section>
            )}
          </Fragment >
        ))}
      </main>
      <footer></footer>
    </>
  );
}

export default App;
