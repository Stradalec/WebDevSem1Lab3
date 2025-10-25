import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const tasksReducer = (tasks, { type, title, description }) => {
    switch(type) {
      case 'added': {
      return [...tasks, { title, description }]
      }
      default: {

      }
  }
} 

  return (
    <>
    <header></header>
    <main className="main">
      <section className="input_row">
        <div className="input_column">
          <input type="text" placeholder="Название" />
          <input type="text" placeholder="Описание" />
        </div>
        <button id = "add" type="button" value="button" className="button_add">+</button>
      </section>
      <section className="no_task_window">
        <div></div>
        <p>Нет задач</p>
        <div></div>
      </section>
      <section className="dialog_window">
        <p>Удалить задачу?</p>
         <div className="input_row_close">
          <button id = "delete_confirm" type="button" value="button" className="button_dialog">
            Да
          </button>
          <button id = "delete_cancel" type="button" value="button" className="button_dialog">
            Нет
          </button>
        </div>
      </section>
      <section className="share_window">
        <button type="button" value="button" className="button_share">
          <img src="assets/vector/copy.svg" alt="Удалить заметку" />
        </button>
        <button type="button" value="button" className="button_share">
          <img src="assets/vector/vk.svg" alt="Поделиться" />
        </button>
        <button type="button" value="button" className="button_share">
          <img src="assets/vector/telegram.svg" alt="Редактировать заметку" />
        </button>
        <button type="button" value="button" className="button_share">
          <img src="assets/vector/whatsapp.svg" alt="Информация о заметке" />
        </button>
        <button type="button" value="button" className="button_share">
          <img src="assets/vector/facebook.svg" alt="Поделиться заметкой" />
        </button>
      </section>
    </main>
    <footer></footer>
    </>
  )
}

export default App
