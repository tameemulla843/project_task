import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import TaskBoard from "../components/tasks/TaskBoard.jsx";
import { THEME_KEY } from "../utils/constants.js";
  import { ClipboardList, LayoutDashboard, Settings as SettingsIcon, Sun, Moon } from "lucide-react";

function Home() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  }, [dark]);

  const navItems = [
    { to: "/", label: "Tasks", icon: ClipboardList }
  ];

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300">
      <header className="bg-bg-secondary border-b border-border px-6 py-4 shadow-sm" style={{ backgroundImage: "var(--gradient-header)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardList className="text-white w-6 h-6" />
            <div>
              <h1 className="text-xl font-bold text-white">Smart Task Manager</h1>
              <span className="text-xs text-white/70">Organize your work efficiently</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "bg-white/25 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                    }`
                  }
                >
                  <item.icon size={16} />
                  <span className="hidden sm:inline">{item.label}</span>
                </NavLink>
              ))}
            </nav>
            <button
              onClick={() => setDark((d) => !d)}
              className="theme-toggle bg-white/20 hover:bg-white/30 rounded-full w-10 h-10 flex items-center justify-center text-white"
              title="Toggle theme"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<TaskBoard />} />
          
        </Routes>
      </main>
    </div>
  );
}

export default Home;