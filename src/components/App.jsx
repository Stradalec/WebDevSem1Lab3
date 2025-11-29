import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addTask, moveTask} from "./TasksSlice";
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
  const tasks = useSelector(state => state.tasks); 
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  function handleAddClick() {
    console.log("Нажми на кнопку - получишь результат");
    
    dispatch(addTask({ title: title, description: description }));

    setTitle("");
    setDescription("");
  }
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("fromIndex", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); 
  };
  
  const handleDrop = (event, toIndex) => {
    event.preventDefault();
    const fromIndex = parseInt(event.dataTransfer.getData("fromIndex"), 10);
    if (fromIndex !== toIndex) {
      dispatch(moveTask({ fromIndex, toIndex }));
    }
  };

  return (
    <>
      <main className="main">
        <Section className={"input_row"}>
          <InputColumn
            titleValue={title}
            descriptionValue={description}
            onTitleChange={(event) => setTitle(event.target.value)}
            onDescriptionChange={(event) => setDescription(event.target.value)}
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
          ></ModalWindow>
        )}
        {isShareVisible && (
          <ShareSection
            inputTaskId={savedTaskId}
            inputTaskList={tasks}
            setShareVisible={setShareVisible}
          ></ShareSection>
        )}

        {tasks.map((task, index) => (
          <Fragment key={task.id}>
            <div
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, index)}
            >
            <TaskSection
              inputTask={task}
              setModalVisible={setModalVisible}
              setPanelVisibility={setPanelVisibility}
              setSavedTaskId={setSavedTaskId}
            ></TaskSection>
            </div>
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
