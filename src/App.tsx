import React, { useEffect, useState } from "react";

const App = () => {
  const [deviceId, setDeviceId] = useState("");
  const [model, setModel] = useState("");

  const sendMessage = () => {
    if (window.ReactNativeWebView) {
      const message = {
        type: "request",
        request: {
          id: "uhujdkgvai",
          operation: "getSystemInfo",
        },
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    }
  };

  const handleMessage = (event) => {
    console.log("Received message:", event.data);
    try {
      const data = JSON.parse(event.data);
      if (data.type === "response" && data.request.id === "uhujdkgvai") {
        const response = data.response;
        setDeviceId(response.deviceId);
        setModel(response.model);
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

  useEffect(() => {
    sendMessage();
    window.addEventListener("message", handleMessage);

    // Cleanup listener on unmount
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
