import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

function App() {

  const [msg, setSmg] = useState<string>('');
  console.log(msg);


  useEffect(() => {
    const socket = io("/");
    socket.on('server-message', (data) => {
      console.log(data);

      setSmg(data);
    })

    return () => {
      socket.disconnect(); // Clean up the socket connection when the component is unmounted
    };
  }, []);

  return (
    <div className="App">
      <h1>This is client</h1>
      <p>{msg}</p>
    </div>
  );
}

export default App;
