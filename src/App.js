import logo from './logo.svg';
import './App.css';

import Login from './components/Login';
function App() {
     
  return (
    <div className="App wrapper">
      <h3 className='footer'>GE PROJECT</h3>
      <h6 className=''>By Shivam Singhal</h6>
      {<Login/>}
      
    </div>
  );
}

export default App;
