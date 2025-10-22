import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Start from './pages/Start';
import Render from './pages/Render';
import { themeClass } from './style.css';
import { globalStyles } from './style.css';
import { useEffect } from 'react';
import Generate from './pages/Generate';

const App = () => {
  useEffect(() => {
    const metaChar = document.createElement('meta');
    metaChar.setAttribute('charset', 'UTF-8');
    document.head.appendChild(metaChar);
    const metaView = document.createElement('meta');
    metaView.setAttribute('name', 'viewport');
    metaView.setAttribute('content', 'width=device-width, initial-scale=1.0');
    document.head.appendChild(metaView);
    document.title = 'VSchedule - VIT FFCS Planner';
    const styles = document.createElement('style');
    styles.textContent = globalStyles;
    document.head.appendChild(styles);
  }, []);

  return (
    <div className={themeClass}>
      <Routes>
        <Route path="/vschedule/" element={<Home />} />
        <Route path="/vschedule/home" element={<Home />} />
        <Route path="/vschedule/start" element={<Start />} />
        <Route path="/vschedule/generate" element={<Generate />} />
      </Routes>
    </div>
  );
};

export default App;
