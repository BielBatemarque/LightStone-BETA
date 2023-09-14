import { BrowserRouter } from 'react-router-dom';
import { Content } from './components/content';
import { useContext } from 'react';
import { globalContext } from './context/context'

function App() {
  const { state } = useContext(globalContext);
    console.log(state);

  return (
    <div className="App">
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </div>
  );
}

export default App;
