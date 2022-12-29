
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeLayout from "./GeLayout";
import GeEstimation from "./GeEstimation";
import GePriceList from "./GePriceList";
import GeAdd from "./GeAdd";
import GeEditDelete from "./GeEditDelete";
import GeProfile from "./GeProfile";
import { useEffect, useState } from "react";

function GeHome() {

 

  const [currentPage,setcurrentPage]=useState("priceList");

  let priceList=()=>{
    setcurrentPage("PRICE LIST");
  }

  let estimation=()=>{
    setcurrentPage("ESTIMATION");
  }

  let addItem=()=>{
    setcurrentPage("ADD ITEM");
  }

  let editDelete=()=>{
    setcurrentPage("EDIT/DELETE ITEM");
  }

  let profile=()=>{
    setcurrentPage("PROFILE");
  }
  return (

    <div style={{display:'flex'}} className="">
<div style={{width:"100vh",height: '100vh',border:"1px solid #000"}}>

      <div style={{ margin: "auto", marginTop:"15vh", width:"150px",height:"",border:"1px solid #000",borderRadius: "8px"}}>
        <h5 className='footer'><button onClick={priceList}>PRICE LIST</button></h5>
        </div>
        <div style={{ margin: "auto",marginTop:"5vh",width:"150px",height:"",border:"1px solid #000",borderRadius: "8px"}}>
        <h5 className='footer'><button onClick={estimation}>ESTIMATION</button></h5>
        </div>
        <div style={{ margin: "auto",marginTop:"5vh",width:"150px",height:"",border:"1px solid #000",borderRadius: "8px"}}>
        <h5 className='footer'><button onClick={addItem}>ADD ITEM</button></h5>
        </div>
        <div style={{ margin: "auto",marginTop:"5vh",width:"150px",height:"",border:"1px solid #000",borderRadius: "8px"}}>
        <h5 className='footer'><button onClick={editDelete}>EDIT/DELETE</button></h5>
        </div>
        <div style={{ margin: "auto",marginTop:"5vh",width:"150px",height:"",border:"1px solid #000",borderRadius: "8px"}}>
        <h5 className='footer'><button onClick={profile}>PROFILE</button></h5>
        </div>
</div>
<div style={{width:"500vh",height: '100vh',border:"1px solid #000"}}>

  <div style={{display:'flex'}}>
  <div style={{margin: "auto",marginTop:"2vh",width:"30vh",height:"6vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h3 className='footer'>GE PROJECT</h3>
  </div>
  <div style={{margin: "auto",marginTop:"2vh",width:"50vh",height:"6vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h3 className='footer'>{currentPage}</h3>
  </div>

        </div>

        <div style={{ margin: "auto",marginTop:"2vh",width:"165vh",height:"88vh",border:"1px solid #000",borderRadius: "4px"}}>

        {currentPage=="PRICE LIST"?
        <GePriceList />:
        currentPage=="ESTIMATION"?
        <GeEstimation />:
        currentPage=="ADD ITEM"?
        <GeAdd/>:
        currentPage=="EDIT/DELETE ITEM"?
        <GeEditDelete />:
        <GeProfile/>}

     
        </div>
      
      </div>

    </div>



    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<GeLayout />}>
          
    //     </Route>
    //     <Route index element={<GeEstimation />} />
    //       <Route path="add" element={<GeAdd />} />
    //   </Routes>
    // </BrowserRouter>
    
  );
}

export default GeHome;