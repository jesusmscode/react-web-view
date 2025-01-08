import React, { useState, useEffect } from "react";

const App = () => {
  const [deviceId, setDeviceId] = useState("");
  const [model, setModel] = useState("");

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      try {
        const data = JSON.parse(event.data);
        if (
          data.type === "response" &&
          data.request.operation === "getSystemInfo"
        ) {
          setDeviceId(data.response.deviceId);
          setModel(data.response.model);
        }
      } catch (error) {
        console.error("Error procesando el mensaje:", error);
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      <h1>Hola Mundo</h1>
      <p>
        Device ID: <span>{deviceId}</span>
      </p>
      <p>
        Model: <span>{model}</span>
      </p>
    </div>
  );
};

export default App;
