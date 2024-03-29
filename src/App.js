import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Home from './Pages/Homepage/home.page';
import EditorPage from './Pages/Editorpage/editor.page';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          
          toastOptions={{
            duration:2000,
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/editor/:roomId" element={<EditorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
