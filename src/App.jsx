import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext.jsx";
import Home from "./pages/Home.jsx";
import Toast from "./components/ui/Toast.jsx";

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Home />
        <Toast />
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;
