import { BrowserRouter } from 'react-router-dom';
import { Content } from './components/content';
import { useContext } from 'react';
import { globalContext } from './context/context'
import { FlexCointainer } from './components/FlexContainer';
import { SideBar } from './components/SideBar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const { state } = useContext(globalContext);

  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
      { state.logado ? <FlexCointainer>
          <SideBar />
          <Content />
      </FlexCointainer> : <Content /> }
        
      </BrowserRouter>
    </div>
  );
}

export default App;
