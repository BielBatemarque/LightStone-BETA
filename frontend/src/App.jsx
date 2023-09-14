import { BrowserRouter } from 'react-router-dom';
import { Content } from './components/content';
import { useContext } from 'react';
import { globalContext } from './context/context'
import { FlexCointainer } from './components/FlexContainer';
import { SideBar } from './components/SideBar';

function App() {
  const { state } = useContext(globalContext);
    console.log(state);

  return (
    <div className="App">
      <BrowserRouter>

      { state.logado? <FlexCointainer>
          <SideBar />
          <Content />
      </FlexCointainer> : <Content /> }
        
      </BrowserRouter>
    </div>
  );
}

export default App;
