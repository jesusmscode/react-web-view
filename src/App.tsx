import { useState, useEffect } from "react";

const App = () => {
  const [deviceId, setDeviceId] = useState("");
  const [model, setModel] = useState("");
  const [feedback, setFeedback] = useState("");

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
    window.postMessage(JSON.stringify(message));
    setFeedback("Message sent to native!");
    console.log("Message sent to native!");
  };

  return (
    <div>
      <h1>Device Information</h1>
      <p>Device ID: {deviceId}</p>
      <p>Model: {model}</p>
      <button onClick={sendMessageToNative}>Send Log Message</button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default App;
