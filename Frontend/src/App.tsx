import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/LayoutArea/Layout/Layout';

function App() {

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );

}

export default App;
