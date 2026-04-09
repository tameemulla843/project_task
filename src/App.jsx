import { useState } from 'react'
import { TaskProvider } from "./context/TaskContext.jsx";
import Home from "./pages/Home.jsx";
import './App.css'

function App() {
 return
 (
    <TaskProvider>
       <Home />
    </TaskProvider>
 );
}

export default App;