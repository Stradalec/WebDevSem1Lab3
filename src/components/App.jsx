import { useEffect, useState, Fragment } from "react";
import "./App.css";
import "../styles/buttons.css";
import "../styles/components.css";
import "../styles/layout.css";
import { InputColumn } from "./InputColumn";
import { AddButton } from "./AddButton";
import { Section } from "./SectionBuilder";
import { EditWindow } from "./EditWindow";
import { ShareSection } from "./ShareSection";
import { ModalWindow } from "./ModalWindow";
import { TaskSection } from "./TaskSection";
import { TaskButtonPanel } from "./TaskButtonPanel";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPanelVisible, setPanelVisibility] = useState(null);
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

  return (
    <>
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
          <ModalWindow
            inputTaskId={savedTaskId}
            setModalVisible={setModalVisible}
            setTasks={setTasks}
          ></ModalWindow>
        )}
        {isShareVisible && (
          <ShareSection
            inputTaskId={savedTaskId}
            inputTaskList={tasks}
            setShareVisible={setShareVisible}
          ></ShareSection>
        )}

        {tasks.map((task) => (
          <Fragment key={task.id}>
            <TaskSection
              inputTask={task}
              setModalVisible={setModalVisible}
              setPanelVisibility={setPanelVisibility}
              setSavedTaskId={setSavedTaskId}
            ></TaskSection>
            {isPanelVisible == task.id && (
              <TaskButtonPanel
                inputTask={task}
                inputTaskList={tasks}
                setEditModalVisible={setEditModalVisible}
                setTitle={setTitle}
                setDescription={setDescription}
                setShareVisible={setShareVisible}
                setSavedTaskId={setSavedTaskId}
              ></TaskButtonPanel>
            )}
            {editModalVisible && (
              <EditWindow
                inputTask={task}
                inputTitle={title}
                inputDescription={description}
                setEditModalVisible={setEditModalVisible}
                setTasks={setTasks}
                inputTaskList={tasks}
              />
            )}
          </Fragment>
        ))}
      </main>
      <footer></footer>
    </>
  );
}
//
export default App;
