
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeLayout from "./GeLayout";
import GeEstimation from "./GeEstimation";
import GePriceList from "./GePriceList";
import GeAdd from "./GeAdd";
import GeEditDelete from "./GeEditDelete";
import GeProfile from "./GeProfile";
import GeCheck from "./GeCheck";
import { useEffect, useState } from "react";



function GeHome() {

 

  const [currentPage,setcurrentPage]=useState("PRICE LIST");
  const [profileData,setprofileData]=useState(["a"]);

  //Estimation Section
  const [create_shortname,setcreate_shortname]=useState("");
  const [create_name,setcreate_name]=useState(0);
  const [geItems, setGeItems] = useState([]);
  const [enter_quantity,setenter_quantity]=useState(1);
  const [enter_amount,setenter_amount]=useState();
  const [geEstimationItems,setgeEstimationItems]=useState([]);
  const [grandTotal,setgrandTotal]=useState(0);





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

  let check=()=>{
    setcurrentPage("check");
  }

  //profileSection();
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
        <div style={{ margin: "auto",marginTop:"5vh",width:"150px",height:"",border:"1px solid #000",borderRadius: "8px"}}>
        <h5 className='footer'><button onClick={check}>CHECK</button></h5>
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
        currentPage=="PROFILE"?
        <ProfileSection profileData={profileData} setprofileData={setprofileData}/>:
        <CheckSection create_shortname={create_shortname} setcreate_shortname={setcreate_shortname}
        create_name={create_name} setcreate_name={setcreate_name}
        geItems={geItems} setGeItems={setGeItems}
        enter_quantity={enter_quantity} setenter_quantity={setenter_quantity}
        enter_amount={enter_amount} setenter_amount={setenter_amount}
        geEstimationItems={geEstimationItems} setgeEstimationItems={setgeEstimationItems}
        grandTotal={grandTotal} setgrandTotal={setgrandTotal}
        />
        }

     
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

let EstimateSection=(props)=>{

}


let ProfileSection=(props)=>
{
  
  let addValue=(newValue)=>{
    let newArray = [...props.profileData]
    newArray.push(newValue);
    props.setprofileData(newArray);
  }
  return <GeProfile profileData={props.profileData} addValue={addValue} setprofileData={props.setprofileData}/>
}

let CheckSection=(props)=>
{
  
  let addValue=(newValue)=>{
    let newArray = [...props.profileData]
    newArray.push(newValue);
    props.setprofileData(newArray);
  }
  return <GeCheck showData={props.profileData} addValue={addValue}
  create_shortname={props.create_shortname} setcreate_shortname={props.setcreate_shortname}
        create_name={props.create_name} setcreate_name={props.setcreate_name}
        geItems={props.geItems} setGeItems={props.setGeItems}
        enter_quantity={props.enter_quantity} setenter_quantity={props.setenter_quantity}
        enter_amount={props.enter_amount} setenter_amount={props.setenter_amount}
        geEstimationItems={props.geEstimationItems} setgeEstimationItems={props.setgeEstimationItems}
        grandTotal={props.grandTotal} setgrandTotal={props.setgrandTotal}
  
  />
}

export default GeHome;