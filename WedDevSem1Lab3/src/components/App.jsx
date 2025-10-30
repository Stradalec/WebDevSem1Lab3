import { useState } from 'react'
import './App.css'
import { InputColumn } from './Input_column'
import { AddButton } from './addButton'
import { Section } from './sectionBuilder'





function App() {
  const [count, setCount] = useState(0)

  function handleAddClick(){
    console.log("Нажми на кнопку - получишь результат")
  }
  return (
    <>
    <header></header>
    <main className="main">
      <Section className={"input_row"}>
        <InputColumn />
        <AddButton id = "add" className="button_add" content={"+"} onClick={handleAddClick} />
      </Section>
      <Section className={"no_task_window"}>
        <div></div>
        <p>Нет задач</p>
        <div></div>
      </Section>
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

    </main>
    <footer></footer>
    </>
  )
}

export default App
