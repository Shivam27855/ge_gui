import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import GeHome from './components/GeHome';
import Login from './components/Login';
import { Outlet, Link } from "react-router-dom";
function App() {
     
  return (
    <div>
      {/* <div style={{width:"100vh",height: '100vh',border:"1px solid #000"}}>

      <div style={{ margin: "auto", marginTop:"15vh", width:"150px",height:"",border:"1px solid #000",borderRadius: "8px"}}>
        <h5 className='footer'><Link to="/">PRICE LIST</Link></h5>
        </div>
        <div style={{ margin: "auto",marginTop:"5vh",width:"150px",height:"",border:"1px solid #000",borderRadius: "8px"}}>
        <h5 className='footer'><Link to="/add">ESTIMATION</Link></h5>
        </div>
        <div style={{ margin: "auto",marginTop:"5vh",width:"150px",height:"",border:"1px solid #000",borderRadius: "8px"}}>
        <h5 className='footer'>ADD ITEM</h5>
        </div>
        <div style={{ margin: "auto",marginTop:"5vh",width:"150px",height:"",border:"1px solid #000",borderRadius: "8px"}}>
        <h5 className='footer'>EDIT/DELETE</h5>
        </div>
        <div style={{ margin: "auto",marginTop:"5vh",width:"150px",height:"",border:"1px solid #000",borderRadius: "8px"}}>
        <h5 className='footer'>PROFILE</h5>
        </div>
</div> */}

  {/* <div style={{width:"500vh",height: '100vh',border:"1px solid #000"}}>

  <div style={{ margin: "auto",marginTop:"2vh",width:"165vh",height:"6vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h3 className='footer'>GE PROJECT</h3>
        </div>

        <div style={{ margin: "auto",marginTop:"2vh",width:"165vh",height:"88vh",border:"1px solid #000",borderRadius: "4px"}}>
     */}

      {<Login/>}
        {/* </div>
      
      </div> */}

    </div>
  );
}

export default App;
