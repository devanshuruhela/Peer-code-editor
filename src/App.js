import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Home from './Pages/Homepage/home.page';
import Editor from './Pages/Editorpage/editor.page';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/editor/:sessionId' element={<Editor/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
