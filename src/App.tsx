import { useState, useEffect } from "react";

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

  const sendMessageToNative = () => {
    const message = {
      type: "request",
      request: {
        id: "unique-id",
        operation: "logMessage",
        message: "Hello from WebView",
      },
    };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  };

  return (
    <div>
      <h1>Device Information</h1>
      <p>Device ID: {deviceId}</p>
      <p>Model: {model}</p>
      <button onClick={sendMessageToNative}>Send Log Message</button>
    </div>
  );
};

export default App;
