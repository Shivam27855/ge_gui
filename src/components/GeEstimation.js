import '../App.css';
import { useState, useEffect } from "react";
import ToDoItem from './TodoItem';
import GeHome from './GeHome';
import $ from "jquery";
import Table from 'react-bootstrap/Table';
import { FiEdit } from 'react-icons/fi';
import { RiSave2Fill } from 'react-icons/ri'
import { GiCancel } from 'react-icons/gi'
import { AiFillDelete } from 'react-icons/ai'
import Popup from './Popup';

function GeEstimation() {
    const baseURL = "http://localhost:5000";
    //const baseURL ="https://lime-alert-deer.cyclic.app/";
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [checkLoginStatus,setCheckLoginStatus]=useState(false);
  const [todoItems,setTodoItems]=useState([]);
  const [userId,setUserId]=useState();
  const [emptyToDoList,setEmptyToDoList]=useState(false);

  const [createAccountUi,setCreateAccountUi]=useState(false);
  const [create_username,setCreate_username]=useState("");
  const [create_password,setCreate_password]=useState("");
  const [createError,setCreateError]=useState("");

  const [geItems, setGeItems] = useState([]);
  const [geFilterItems, setFilterGeItems] = useState([]);
  const [enter_quantity,setenter_quantity]=useState(0);
  const [enter_amount,setenter_amount]=useState();
  const [geEstimationItems,setgeEstimationItems]=useState([]);
  const [grandTotal,setgrandTotal]=useState(0);

  const [edit_quantity,setedit_quantity]=useState();
  const [edit_amount,setedit_amount]=useState();
  const [edit_name,setedit_name]=useState();
  const [edit_rate,setedit_rate]=useState();
  

  


  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex,setSelectedIndex]=useState();
  const [prevAmount,setprevAmount]=useState();

  const [create_shortname,setcreate_shortname]=useState("");
  const [create_name,setcreate_name]=useState("");
  const [create_company,setcreate_company]=useState("");
  const [create_modal,setcreate_modal]=useState("");
  const [create_subcategory,setcreate_subcategory]=useState("");
  const [create_warranty,setcreate_warranty]=useState("");
  const [create_cp,setcreate_cp]=useState("");
  const [create_sp,setcreate_sp]=useState("");
  const [create_description,setcreate_description]=useState("");

  let handleEditItem=()=>{
    console.log(selectedIndex);

    //const va = {item_name:create_shortname,item_rate:create_name,item_quantity:enter_quantity,item_amount:enter_amount}

    
    const arr = [...geEstimationItems];
    console.log(arr[selectedIndex]);
    arr[selectedIndex].item_name=edit_name;
    arr[selectedIndex].item_rate=edit_rate;
    arr[selectedIndex].item_quantity=edit_quantity;
    arr[selectedIndex].item_amount=edit_rate*edit_quantity;
    setgeEstimationItems(arr);
    setIsOpen(!isOpen);
    
    //setFilterGeItems(arr);

    
    setgrandTotal(grandTotal-prevAmount+(edit_rate*edit_quantity));

  }

  let handleDelete=(index)=>{
    const arr = [];
    let getAmount = geEstimationItems[index].item_amount;
    for (var i=0;i<geEstimationItems.length;i++) {
      if (i != index) {
        arr.push(geEstimationItems[i]);
      }
  } 
    setgeEstimationItems(arr);
    setgrandTotal(grandTotal-getAmount);
  }
 
  const togglePopup = (index) => {
    console.log(index);
    setSelectedIndex(index);
    setIsOpen(!isOpen);

    for (var i=0;i<geEstimationItems.length;i++) {
      if (i == index) {
          setedit_name(geEstimationItems[i].item_name)
    setedit_rate(geEstimationItems[i].item_rate)
    setedit_quantity(geEstimationItems[i].item_quantity)
    setedit_amount(geEstimationItems[i].item_amount)
    setprevAmount(geEstimationItems[i].item_amount)
          break;
      }
  } 
  }


  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', close)
  return () => window.removeEventListener('keydown', close)
},[])

  useEffect(() => {
    setenter_amount(enter_quantity*create_name)
  }, [create_name]);

  useEffect(() => {
    setenter_amount(enter_quantity*create_name)
  }, [enter_quantity]);

  useEffect(() => {
    setedit_amount(edit_quantity*edit_rate)
  }, [edit_rate]);

  useEffect(() => {
    setedit_amount(edit_quantity*edit_rate)
  }, [edit_quantity]);

  useEffect(() => {
    fetchGeItem();
  }, []);

  let fetchGeItem = () => {
    try {
      fetch(`${baseURL}/getGeItem`, {
        method: "get",
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.length != 0) {
            console.log(json);
            //setCheckLoginStatus(true);

            if (json.error == "No Item in Inventory") {
              //setEmptyToDoList(true);
            }
            else {
              setGeItems(json);
              console.log(geItems);
              //setEmptyToDoList(false);
            }

          }
        })
    } catch (err) {
      alert("Login Fail")
      console.log(err);
    }
  }



  let handleLogOut =(e)=>{
    e.preventDefault();
    setCheckLoginStatus(false);
  }
  

  let handlecreate_shortname=(e)=>{
    setcreate_shortname(e.target.value);

    let x1 = document.getElementById("programmingLanguages").options;
for (var i=0;i<x1.length;i++) {
        if (x1[i].value == e.target.value) {
            console.log(x1[i].id);
            // alert('The index of SellectedIndex is : ' + i + ' and the value is : '  +x[i].value);
            for(let j=0;j<geItems.length;j++)
            {
              if(geItems[j].item_id==x1[i].id)
              {
                setcreate_name(geItems[j].item_sp);
                break;
              }
            }
            
            break;
        }
    } 
    
  }

  let handleeditItem=(e)=>{
    setedit_name(e.target.value);

    let x1 = document.getElementById("programmingLanguages").options;
for (var i=0;i<x1.length;i++) {
        if (x1[i].value == e.target.value) {
            console.log(x1[i].id);
            // alert('The index of SellectedIndex is : ' + i + ' and the value is : '  +x[i].value);
            for(let j=0;j<geItems.length;j++)
            {
              if(geItems[j].item_id==x1[i].id)
              {
                setedit_rate(geItems[j].item_sp);
                break;
              }
            }
            
            break;
        }
    } 
    
  }

  let handlecreate_name=(e)=>{
    setcreate_name(e.target.value);
  }

  let handlequantity=(e)=>{
    setenter_quantity(e.target.value);

    
  }

  useEffect(()=>{setenter_amount(enter_quantity*create_name)},[enter_quantity])

  let handleamount=(e)=>{
    //setcreate_name(e.target.value);
  }

  let handlecreate_company=(e)=>{
    setcreate_company(e.target.value);
  }

  let handlecreate_modal=(e)=>{
    setcreate_modal(e.target.value);
  }

  let handlecreate_subcategory=(e)=>{
    setcreate_subcategory(e.target.value);
  }

  let handlecreate_warranty=(e)=>{
    setcreate_warranty(e.target.value);
  }

  let handlecreate_cp=(e)=>{
    setcreate_cp(e.target.value);
  }

  let handlecreate_sp=(e)=>{
    setcreate_sp(e.target.value);
  }

  let handlecreate_description=(e)=>{
    setcreate_description(e.target.value);
  }

  let handleeditname=(e)=>{
    setedit_name(e.target.value);
  }

  let handleeditrate=(e)=>{
    setedit_rate(e.target.value);
  }

  let handleeditquantity=(e)=>{
    setedit_quantity(e.target.value);
    //setedit_amount(edit_quantity*edit_rate);
  }

  useEffect(()=>{setedit_amount(edit_quantity*edit_rate)},[edit_quantity])

  let handleeditamount=(e)=>{
    setedit_amount(e.target.value);
  }



  let handleCreateUserNameChange=(e)=>{
    setCreateError("");
    setCreate_username(e.target.value);
  }

  

  let createAccount=(e)=>{
    setCreateAccountUi(true)
  }

  let goBackToLogin=(e)=>{
    setCreateAccountUi(false)
  }

  let handleAddItem = (e) => {
    e.preventDefault();
 
    const va = {item_name:create_shortname,item_rate:create_name,item_quantity:enter_quantity,item_amount:enter_amount}

    const arr = [...geEstimationItems];
    arr.push(va);
    //setFilterGeItems(arr);

    setgeEstimationItems(arr);
    setgrandTotal(grandTotal+enter_amount);
  };

  


  let handleSelectionItem = (itemId)=>{
    alert(itemId)
  }

  return (
    <div style={{ margin: "auto",marginTop:"2vh",width:"165vh",height:"10vh"}}>

    <form onSubmit={handleAddItem}>
    
    <div style={{display:'flex'}}>
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>ITEM NAME</h6>
  <input id="selValue" className='' type="text" value={create_shortname} list="programmingLanguages" placeholder="ENTER ITEM NAME" onChange={handlecreate_shortname} required/>

  <datalist id="programmingLanguages">

  {geItems.map(
          (geItem, index) =>
          
          <option id={geItem.item_id} value={`${geItem.item_name} ${geItem.item_company} ${geItem.item_modal}`}>{`${geItem.item_name} ${geItem.item_company} ${geItem.item_modal}`}</option>
          
        )}


                
            </datalist>

  </div>

  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>RATE</h6>
  <input className='' type="number" value={create_name} placeholder="ENTER RATE" onChange={handlecreate_name} required/>

  


  </div>


  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>QUANTITY</h6>
  <input className='' type="number" value={enter_quantity} placeholder="ENTER QUANTITY" onChange={handlequantity} required/>




  </div>

  
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>AMOUNT</h6>
  <input className='' type="number" value={enter_amount} placeholder="ENTER AMOUNT" onChange={handleamount} required/>

  


  </div>

  
  <button className='' type="submit">ADD</button>
        </div>


  
  



   
  
  </form>



  
  <div style={{height: "65vh", overflow: "auto",marginTop:"1vh"}}>

    <Table striped bordered hover style={{height: "80vh"}}>
      <thead style={{position: "sticky",top: "0px",backgroundColor:"lightyellow"}}>
        <tr>
          <th>ACTION</th>
          <th>NAME</th>
          <th>RATE</th>
          <th>QUANTITY</th>
          <th>AMOUNT</th>
          
          
        </tr>
      </thead>

      <tbody>
         {geEstimationItems.map(
          (geEstimationItem, index) => <tr id={index} key={index}>
            <td><button className='editButton' style={{ visibility: "visible" }} onClick={()=>togglePopup(index)}><FiEdit /></button>
              <button className='saveButton' style={{ visibility: "hidden" }}><RiSave2Fill /></button>
              <button className='cancelButton' style={{ visibility: "hidden" }}><GiCancel /></button>
              <button className='deleteButton' style={{ visibility: "visible" }} onClick={()=>handleDelete(index)}><AiFillDelete /></button></td>

            <td>{geEstimationItem.item_name}</td>
            <td>{geEstimationItem.item_rate}</td>
            <td>{geEstimationItem.item_quantity}</td>
            <td>{geEstimationItem.item_amount}</td>



          </tr>
        )} 
      </tbody>
    
    </Table>
    </div>

    {isOpen && <Popup
      content={<>
       
    
    <div style={{display:'flex'}}>
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>ITEM NAME</h6>
  <input id="" className='' type="text" value={edit_name} list="programmingLanguages" placeholder="ENTER ITEM NAME" onChange={handleeditItem} required/>

  <datalist id="programmingLanguages">

  {geItems.map(
          (geItem, index) =>
          
          <option id={geItem.item_id} value={`${geItem.item_name} ${geItem.item_company} ${geItem.item_modal}`}>{`${geItem.item_name} ${geItem.item_company} ${geItem.item_modal}`}</option>
          
        )}


                
            </datalist>

  </div>

  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>RATE</h6>
  <input className='' type="number" value={edit_rate} placeholder="ENTER RATE" onChange={handleeditrate} required/>

  


  </div>


  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>QUANTITY</h6>
  <input className='' type="number" value={edit_quantity} placeholder="ENTER QUANTITY" onChange={handleeditquantity} required/>




  </div>

  
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>AMOUNT</h6>
  <input className='' type="number" value={edit_amount} placeholder="ENTER AMOUNT" onChange={handleeditamount} required/>

  


  </div>

  
  <button className='' type="submit" onClick={handleEditItem}>SAVE CHANGES</button>
        </div>


  
  



   
  
  
      </>}
      handleClose={togglePopup}
    />}



    <div style={{display:'flex'}}>
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"5vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>GRAND TOTAL</h6>
    </div>

  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"5vh",border:"1px solid #000",borderRadius: "4px"}}>

  <input className='' type="number" value={grandTotal}/>

  


  </div>


  
        </div>


    
  </div>);
}

export default GeEstimation;
