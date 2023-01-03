
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeLayout from "./GeLayout";
import GeEstimation from "./GeEstimation";
import GePriceList from "./GePriceList";
import GeAdd from "./GeAdd";
import GeEditDelete from "./GeEditDelete";
import GeProfile from "./GeProfile";

import { useEffect, useState } from "react";



function GeHome() {

 

  const [currentPage,setcurrentPage]=useState("PRICE LIST");
  const [profileData,setprofileData]=useState(["a"]);

  //Price List Section
  const [geItemsPriceList, setGeItemsPriceList] = useState([]);
  const [geFilterItems, setFilterGeItems] = useState([]);
  const [currentItem_short, setcurrentItem_short] = useState("");
  const [currentItem_company, setcurrentItem_company] = useState("");

  //Estimation Section - add
  const [create_shortname,setcreate_shortname]=useState("");
  const [create_name,setcreate_name]=useState(0);
  const [geItems, setGeItems] = useState([]);
  const [enter_quantity,setenter_quantity]=useState(1);
  const [enter_amount,setenter_amount]=useState();
  const [geEstimationItems,setgeEstimationItems]=useState([]);
  const [grandTotal,setgrandTotal]=useState(0);

  //Estimation Section - edit
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex,setSelectedIndex]=useState();
  const [prevAmount,setprevAmount]=useState();
  const [edit_quantity,setedit_quantity]=useState();
  const [edit_amount,setedit_amount]=useState();
  const [edit_name,setedit_name]=useState();
  const [edit_rate,setedit_rate]=useState();


  //Edit/Delete Section
  const [geItemsEditDelete, setGeItemsEditDelete] = useState([]);
  const [geFilterItemsEditDelete, setFilterGeItemsEditDelete] = useState([]);
  const [currentItem_shortEditDelete, setcurrentItem_shortEditDelete] = useState("");
  const [currentItem_companyEditDelete, setcurrentItem_companyEditDelete] = useState("");
  const [editOn, seteditOn] = useState([false]);
  const [prevEditValue,setprevEditValue]=useState({});
  const [prevEditValue2,setprevEditValue2]=useState({});
  const [showActionButton,setshowActionButton]=useState([true])




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
        <GePriceListSection geItemsPriceList={geItemsPriceList} setGeItemsPriceList={setGeItemsPriceList}
        geFilterItems={geFilterItems} setFilterGeItems={setFilterGeItems}
        currentItem_short={currentItem_short} setcurrentItem_short={setcurrentItem_short}
        currentItem_company={currentItem_company} setcurrentItem_company={setcurrentItem_company}/>:
        currentPage=="ESTIMATION"?
        <GeEstSection  create_shortname={create_shortname} setcreate_shortname={setcreate_shortname}
        create_name={create_name} setcreate_name={setcreate_name}
        geItems={geItems} setGeItems={setGeItems}
        enter_quantity={enter_quantity} setenter_quantity={setenter_quantity}
        enter_amount={enter_amount} setenter_amount={setenter_amount}
        geEstimationItems={geEstimationItems} setgeEstimationItems={setgeEstimationItems}
        grandTotal={grandTotal} setgrandTotal={setgrandTotal}
        isOpen={isOpen} setIsOpen={setIsOpen}
        selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}
        prevAmount={prevAmount} setprevAmount={setprevAmount}
        edit_quantity={edit_quantity} setedit_quantity={setedit_quantity}
        edit_amount={edit_amount} setedit_amount={setedit_amount}
        edit_name={edit_name} setedit_name={setedit_name}
        edit_rate={edit_rate} setedit_rate={setedit_rate}
        />:
        currentPage=="ADD ITEM"?
        <GeAdd/>:
        currentPage=="EDIT/DELETE ITEM"?
        <GeEditDeleteSection geItemsEditDelete={geItemsEditDelete} setGeItemsEditDelete={setGeItemsEditDelete}
        geFilterItemsEditDelete={geFilterItemsEditDelete} setFilterGeItemsEditDelete={setFilterGeItemsEditDelete}
        currentItem_shortEditDelete={currentItem_shortEditDelete} setcurrentItem_shortEditDelete={setcurrentItem_shortEditDelete}
        currentItem_companyEditDelete={currentItem_companyEditDelete} setcurrentItem_companyEditDelete={setcurrentItem_companyEditDelete}
        editOn={editOn} seteditOn={seteditOn}
        prevEditValue={prevEditValue} setprevEditValue={setprevEditValue}
        prevEditValue2={prevEditValue2} setprevEditValue2={setprevEditValue2}
        showActionButton={showActionButton} setshowActionButton={setshowActionButton}/>:
        <ProfileSection profileData={profileData} setprofileData={setprofileData}/>        
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

let GePriceListSection=(props)=>
{
  return <GePriceList geItemsPriceList={props.geItemsPriceList} setGeItemsPriceList={props.setGeItemsPriceList}
  geFilterItems={props.geFilterItems} setFilterGeItems={props.setFilterGeItems}
  currentItem_short={props.currentItem_short} setcurrentItem_short={props.setcurrentItem_short}
  currentItem_company={props.currentItem_company} setcurrentItem_company={props.setcurrentItem_company}
  />
}

let GeEstSection=(props)=>
{
  let addValue=(newValue)=>{
    let newArray = [...props.profileData]
    newArray.push(newValue);
    props.setprofileData(newArray);
  }
  return <GeEstimation showData={props.profileData} addValue={addValue}
  create_shortname={props.create_shortname} setcreate_shortname={props.setcreate_shortname}
        create_name={props.create_name} setcreate_name={props.setcreate_name}
        geItems={props.geItems} setGeItems={props.setGeItems}
        enter_quantity={props.enter_quantity} setenter_quantity={props.setenter_quantity}
        enter_amount={props.enter_amount} setenter_amount={props.setenter_amount}
        geEstimationItems={props.geEstimationItems} setgeEstimationItems={props.setgeEstimationItems}
        grandTotal={props.grandTotal} setgrandTotal={props.setgrandTotal}
        isOpen={props.isOpen} setIsOpen={props.setIsOpen}
        selectedIndex={props.selectedIndex} setSelectedIndex={props.setSelectedIndex}
        prevAmount={props.prevAmount} setprevAmount={props.setprevAmount}
        edit_quantity={props.edit_quantity} setedit_quantity={props.setedit_quantity}
        edit_amount={props.edit_amount} setedit_amount={props.setedit_amount}
        edit_name={props.edit_name} setedit_name={props.setedit_name}
        edit_rate={props.edit_rate} setedit_rate={props.setedit_rate}
  
  />
}

let GeEditDeleteSection=(props)=>
{
  return <GeEditDelete geItemsEditDelete={props.geItemsEditDelete} setGeItemsEditDelete={props.setGeItemsEditDelete}
  geFilterItemsEditDelete={props.geFilterItemsEditDelete} setFilterGeItemsEditDelete={props.setFilterGeItemsEditDelete}
  currentItem_shortEditDelete={props.currentItem_shortEditDelete} setcurrentItem_shortEditDelete={props.setcurrentItem_shortEditDelete}
  currentItem_companyEditDelete={props.currentItem_companyEditDelete} setcurrentItem_companyEditDelete={props.setcurrentItem_companyEditDelete}
  editOn={props.editOn} seteditOn={props.seteditOn}
  prevEditValue={props.prevEditValue} setprevEditValue={props.setprevEditValue}
  prevEditValue2={props.prevEditValue2} setprevEditValue2={props.setprevEditValue2}
  showActionButton={props.showActionButton} setshowActionButton={props.setshowActionButton}
  />


}

export default GeHome;