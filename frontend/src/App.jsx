import { BrowserRouter } from 'react-router-dom';
import { Content } from './components/content';
import { useContext } from 'react';
import { globalContext } from './context/context'
import { FlexCointainer } from './components/FlexContainer';
import { SideBar } from './components/SideBar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ScreenContext, ScrenState } from './context/screenContext';
import { GlobalStyled } from './components/GlobalStyled';

function App() {
  const { state } = useContext(globalContext);
  const screenState = useContext(ScreenContext);

  console.log(screenState);
  return (
    <div className="App">
      <BrowserRouter>
        <ScrenState>
          <ToastContainer />
          { state.logado ? (
          <FlexCointainer>
              <SideBar />
              <Content />
          </FlexCointainer>
          ) : (
          <Content /> 
          )}
        </ScrenState>
      </BrowserRouter>
      <GlobalStyled />
    </div>
  );
};

export default App;
