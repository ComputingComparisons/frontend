import { useRef } from 'react';
import Navbar from './components/Navbar';
import Home from './components/home/Home';

function App() {
  const dataRef = useRef()
 
 //Home Component
  return (
    <>
      <Home />
    </>
  );
}
 
export default App;