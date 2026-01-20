import React, { useState, useEffect } from 'react';

const TopBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // Color Palette Constants
  const colors = {
    navy: "#2b2f4a",
    cream: "#e6e8c9"
  };

  const styles = {
    container: {
      position: "fixed",
      top: 0,
       left: 0,
      width: "100%",
      zIndex: 1000,
      background: colors.navy,
      color: colors.cream,
  padding: "8px 40px",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "1px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid rgba(230, 232, 201, 0.1)`
    },
    location: {
      display: "flex",
      gap: "4px"
    },
    label: {
      opacity: 0.7
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.location}>
        <span style={styles.label}>DESTINATION:</span> KAMPALA
      </div>
      <div>
        {formattedTime} | EN
      </div>
    </div>
  );
};

export default TopBar;