import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/LayoutArea/Layout/Layout';
import interceptorsService from './Services/InterceptorService';
import socketIoService from './Services/SocketIoService';

interceptorsService.createInterceptors();
socketIoService.init();

function App() {

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );

}

export default App;
