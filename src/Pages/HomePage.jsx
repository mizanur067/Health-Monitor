import React, { useEffect, useState } from 'react'

export const HomePage = () => {
 const [steps, setSteps] = useState(0);
  const [lastPeak, setLastPeak] = useState(0);
  const [manualSteps, setManualSteps] = useState("");

  useEffect(() => {
    let lastTime = 0;

    const handleMotion = (event) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const magnitude = Math.sqrt(
        acc.x * acc.x + acc.y * acc.y + acc.z * acc.z
      );

      const threshold = 12;
      const now = Date.now();

      if (magnitude > threshold && now - lastTime > 400) {
        setSteps((prev) => prev + 1);
        lastTime = now;
        setLastPeak(magnitude);
      }
    };

    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission()
        .then((response) => {
          if (response === "granted") {
            window.addEventListener("devicemotion", handleMotion);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener("devicemotion", handleMotion);
    }

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);

  // 🔁 Reset steps
  const resetSteps = () => {
    setSteps(0);
    setLastPeak(0);
  };

  // ➕ Add manual steps
  const addManualSteps = () => {
    const value = parseInt(manualSteps, 10);
    if (!isNaN(value) && value > 0) {
      setSteps((prev) => prev + value);
      setManualSteps("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚶 Step Counter</h1>
      <h2>{steps}</h2>
      <p>Last Peak: {lastPeak.toFixed(2)}</p>

      {/* Reset Button */}
      <button onClick={resetSteps} style={{ margin: "10px" ,fontSize:"20px",width:"100px",background:"aqua",cursor:"pointer",border:"none"}}>
        Reset
      </button>

      
        
     
    </div>);
}
