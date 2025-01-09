import React, { useEffect } from "react";
declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}

const App = () => {
  const [deviceId, setDeviceId] = React.useState(null);
  const [model, setModel] = React.useState(null);
  const [feedback, setFeedback] = React.useState("");

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("====================================");
      console.log("eventOOOOOOOOO");
      console.log("====================================");
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
    };
    window.addEventListener("message", handleMessage);
  }, [feedback]);
  const sendMessageRequesSystemToNative = () => {
    const message = {
      type: "request",
      request: {
        id: "3r243r43r423r",
        operation: "getSystemInfo",
      },
    };
    window.onMessageFromNative.postMessage(JSON.stringify(message));
    setFeedback("Message sent to native1!");
    console.log("Message sent:", JSON.stringify(message));
  };
  const sendMessageToNative = () => {
    const message = {
      type: "request",
      request: {
        id: "3r243r43r423r",
        operation: "logMessage",
        message: "Hello from WebView",
      },
    };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
    setFeedback("Message sent to native2!");
    console.log("Message sent:", JSON.stringify(message));
  };

  return (
    <div>
      <h1>Device Information</h1>
      <p>Device ID: {deviceId}</p>
      <p>Model: {model}</p>
      <button onClick={sendMessageToNative}>Send Log Message</button>
      <button onClick={sendMessageRequesSystemToNative}>
        Send request systeminfo
      </button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default App;
