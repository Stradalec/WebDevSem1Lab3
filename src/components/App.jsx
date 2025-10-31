import { useEffect, useState } from 'react'
import './App.css'
import { InputColumn } from './Input_column'
import { AddButton } from './addButton'
import { Section } from './sectionBuilder'


function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  function handleAddClick(){
    console.log("Нажми на кнопку - получишь результат")
    const newTask = {
      id: tasks.length,
      title: title || 'Неизвестен',
      description: description || 'Без названия',
    };

    setTasks([...tasks,newTask])
    setTitle('')
    setDescription('')
  }

  function handleDeleteClick(id){
    console.log("Attero, Dominatus!")
    const newTaskList = setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
  }

  return (
    <>
    <header></header>
    <main className="main">
      <Section className={"input_row"}>
        <InputColumn titleValue={title} descriptionValue={description} onTitleChange={e => setTitle(e.target.value)} onDescriptionChange={e => setDescription(e.target.value)} />
        <AddButton id = "add" className="button_add" content={"+"} onClick={handleAddClick} />
      </Section>
      {tasks.length == 0 &&(
        <Section className={"no_task_window"}>
        <div></div>
        <p>Нет задач</p>
        <div></div>
      </Section>
      )}
      
      <Section className={"dialog_window"}>
        <p>Удалить задачу?</p>
         <div className="input_row_close">
          <AddButton id = "delete_confirm" className="button_dialog" content={"Да"} />
          <AddButton id = "delete_cancel" className="button_dialog" content={"Нет"} />
        </div>
      </Section>
      <Section className={"share_window"}>
        <AddButton id = "copy" className="button_share" content={<img src="src/assets/vector/copy.svg" alt="Копировать заметку" />}>  </AddButton>
        <AddButton id = "vk" className="button_share" content={<img src="src/assets/vector/vk.svg" alt="Поделиться в VK" /> }> </AddButton>
        <AddButton id = "tg" className="button_share" content={<img src="src/assets/vector/telegram.svg" alt="Поделиться в Telegram" />}>  </AddButton>
        <AddButton id = "wp" className="button_share" content={<img src="src/assets/vector/whatsapp.svg" alt="Поделиться в Whatsapp" />}>  </AddButton>
        <AddButton id = "fb" className="button_share" content={<img src="src/assets/vector/facebook.svg" alt="Поделиться в Facebook" /> }> </AddButton>
      </Section>
      {tasks.map(task => (<Section key={task.id} className={"task_window"}>
        {<AddButton id = {task.id} className="task_window_button" content={null}> <h2>{task.title}</h2>
        <p>{task.description}</p> </AddButton>}
        
        {<AddButton id = {task.id} className="button_task_delete" content={<img src="src/assets/pictures/delete.svg" alt="Удалить заметку" /> } onClick={() =>handleDeleteClick(task.id)}></AddButton>}
      </Section>))}

    </main>
    <footer></footer>
    </>
  )
}

export default App
