import { useEffect, useState, Fragment } from "react";
import "./App.css";
import { InputColumn } from "./Input_column";
import { AddButton } from "./addButton";
import { Section } from "./sectionBuilder";
import { EditWindow } from "./editWindow";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPanelVisible, setPanelVisibility] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isShareVisible, setShareVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [savedTaskId, setSavedTaskId] = useState(0);
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

  function changeModalVisibility(id) {
    setModalVisible((prev) => !prev);
    setSavedTaskId(id);
  }

  function changeShareVisibility(id) {
    setShareVisible((prev) => !prev);
    setSavedTaskId(id);
  }
  function changeEditVisibility(id) {
    const targetTask = tasks.find((task) => task.id == id);
    setTitle(targetTask.title)
    setDescription(targetTask.description)
    setSavedTaskId(id);
    setEditModalVisible(true);
  }

  function shareClick(socialPlatform) {
    let shareUrl;
    console.log(socialPlatform);
    console.log(savedTaskId);
    const targetTask = tasks.find((task) => task.id == savedTaskId);
    console.log(targetTask.title);
    const encodedStart = encodeURIComponent(
      "Делитесь своими бессмысленными заметками вместе с нами!"
    );
    const encodedHeader = encodeURIComponent(targetTask.title);
    const encodedDescription = encodeURIComponent(targetTask.description);
    const encodedCloser = encodeURIComponent(
      "Stradalets зачем-то добавил эту функциональность в свою лабораторную работу. Вот ему делать нечего..."
    );
    switch (socialPlatform) {
      case "copy":
        navigator.clipboard.writeText(
          targetTask.title + " " + targetTask.description
        );
        break;
      case "vk":
        shareUrl =
          "https://vk.com/share.php?text=" +
          encodedHeader +
          "%20" +
          encodedDescription; //Оно не работает, т.к. поле комментария пустое. Я старался
        break;
      case "tg":
        console.log("Попал в телеграм");
        shareUrl =
          "https://t.me/share/url?url=" +
          encodedStart +
          "&text=" +
          encodedHeader +
          " " +
          encodedDescription +
          "%0A" +
          encodedCloser;
        break;
      case "wp":
        shareUrl =
          "https://api.whatsapp.com/send?text=" +
          encodedHeader +
          "%20" +
          encodedDescription;
        break;
      case "fc":
        shareUrl =
          "https://www.facebook.com/sharer/sharer.php?u=" +
          encodedHeader +
          "&quote=" +
          encodedDescription;
        break;
      default:
        return;
    }
    if (socialPlatform != "copy") {
      window.open(shareUrl, "_blank");
    } else {
    }

    setSavedTaskId(-1);
    setShareVisible((prev) => !prev);
  }

  function ConfirmDeleteClick() {
    console.log("Attero, Dominatus!");
    setModalVisible((prev) => !prev);
    const newTaskList = setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== savedTaskId)
    );
    setSavedTaskId(-1);
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
  }

  function CancelDeleteClick() {
    setSavedTaskId(-1);
    setModalVisible((prev) => !prev);
  }

  function handleShowButtonsClick() {
    console.log("I am only human, after all");
    setPanelVisibility((prev) => !prev);
  }
function handleCancel() {
  setEditModalVisible(false);
}

function handleSave(updatedTask) {
  setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  setEditModalVisible(false);
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
        {isModalVisible && (
          <Section
            className={"dialog_window"}
            style={{ display: isModalVisible ? "flex" : "none" }}
          >
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
        )}
        {isShareVisible && (
          <Section
            className={"share_window"}
            style={{ display: isShareVisible ? "flex" : "none" }}
          >
            <AddButton
              id="copy"
              className="button_share"
              content={
                <img
                  src="src/assets/vector/copy.svg"
                  alt="Копировать заметку"
                />
              }
              onClick={(event) => shareClick(event.currentTarget.id)}
            ></AddButton>
            <AddButton
              id="vk"
              className="button_share"
              content={
                <img src="src/assets/vector/vk.svg" alt="Поделиться в VK" />
              }
              onClick={(event) => shareClick(event.currentTarget.id)}
            ></AddButton>
            <AddButton
              id="tg"
              className="button_share"
              content={
                <img
                  src="src/assets/vector/telegram.svg"
                  alt="Поделиться в Telegram"
                />
              }
              onClick={(event) => shareClick(event.currentTarget.id)}
            ></AddButton>
            <AddButton
              id="wp"
              className="button_share"
              content={
                <img
                  src="src/assets/vector/whatsapp.svg"
                  alt="Поделиться в Whatsapp"
                />
              }
              onClick={(event) => shareClick(event.currentTarget.id)}
            ></AddButton>
            <AddButton
              id="fb"
              className="button_share"
              content={
                <img
                  src="src/assets/vector/facebook.svg"
                  alt="Поделиться в Facebook"
                />
              }
              onClick={(event) => shareClick(event.currentTarget.id)}
            ></AddButton>
          </Section>
        )}

        {tasks.map((task) => (
          <Fragment key={task.id}>
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
                    onClick={()=> changeEditVisibility(task.id)}
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
                    onClick={() => changeShareVisibility(task.id)}
                  ></AddButton>
                }
              </Section>
            )}
          </Fragment>
        ))}
        {editModalVisible && (
          <EditWindow
            id = {savedTaskId}
            inputTitle={title}
            inputDescription={description}
            onCancel={() => handleCancel()}
            onSave={(updatedTask) => handleSave(updatedTask)}
          />
        )}
      </main>
      <footer></footer>
    </>
  );
}

export default App;
