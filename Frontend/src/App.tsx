import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/LayoutArea/Layout/Layout';
import interceptorsService from './Services/InterceptorService';

interceptorsService.createInterceptors();

function App() {

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );

}

export default App;
