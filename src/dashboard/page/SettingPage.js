// src/dashboard/page/SettingsPage.js
import React, { useState, useEffect } from 'react';
import './SettingPage.css';

const SettingsPage = () => {
  // Dark mode state, persist in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || false;
  });

  // Notifications toggle
  const [notifications, setNotifications] = useState(true);

  // Trash action placeholder (could be a button to empty trash)
  const handleEmptyTrash = () => {
    alert('Trash emptied! (You can add real functionality)');
  };

  // Help info toggle or link
  const [showHelp, setShowHelp] = useState(false);

  // Effect to add/remove dark mode class on body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h2>Settings</h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />{' '}
          Enable Dark Mode
        </label>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />{' '}
          Enable Notifications
        </label>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <button onClick={handleEmptyTrash} style={{ cursor: 'pointer' }}>
          Empty Trash
        </button>
      </div>

      <div>
        <button
          onClick={() => setShowHelp(!showHelp)}
          style={{ cursor: 'pointer' }}
        >
          {showHelp ? 'Hide Help' : 'Show Help'}
        </button>
        {showHelp && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5' }}>
            <p>
              This is the help section. You can add FAQ, support contacts, or guides here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
