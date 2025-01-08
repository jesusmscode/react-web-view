import { useState, useEffect } from "react";

const App = () => {
  const [deviceId, setDeviceId] = useState("");
  const [model, setModel] = useState("");

  useEffect(() => {
    console.log("====================================");
    console.log("useEffect");
    console.log("====================================");
    function handleMessage(event: MessageEvent) {
      try {
        const data = JSON.parse(event.data);
        console.log("====================================");
        console.log(data);
        console.log("====================================");
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
      <h1>Device Information</h1>
      <p>Device ID: {deviceId}</p>
      <p>Model: {model}</p>
    </div>
  );
};

export default App;
