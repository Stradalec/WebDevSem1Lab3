import { useState } from 'react'
import reactLogo from '../assets/pictures/delete.svg'
import viteLogo from '../assets/pictures/delete.svg'
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

  
}

export default App
