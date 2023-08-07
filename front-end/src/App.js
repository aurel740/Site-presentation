import './style/App.scss';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Page404 from './pages/Page404';
import Connection from './pages/connection';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<Page404 />} />
      <Route path='/connection' element={<Connection />}></Route>
    </Routes>
    </BrowserRouter>   
  );
}

export default App;
