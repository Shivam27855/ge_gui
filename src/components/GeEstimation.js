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
    alert("asf");
   
    const va = {item_name:create_shortname,item_rate:create_name,item_quantity:enter_quantity,item_amount:enter_amount}

    const arr = [...geEstimationItems];
    arr.push(va);
    //setFilterGeItems(arr);

    setgeEstimationItems(arr);
    
  };

  const [create_shortname,setcreate_shortname]=useState("");
  const [create_name,setcreate_name]=useState("");
  const [create_company,setcreate_company]=useState("");
  const [create_modal,setcreate_modal]=useState("");
  const [create_subcategory,setcreate_subcategory]=useState("");
  const [create_warranty,setcreate_warranty]=useState("");
  const [create_cp,setcreate_cp]=useState("");
  const [create_sp,setcreate_sp]=useState("");
  const [create_description,setcreate_description]=useState("");


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
          (geEstimationItem, index) => <tr>
            <td><button className='editButton' style={{ visibility: "visible" }}><FiEdit /></button>
              <button className='saveButton' style={{ visibility: "hidden" }}><RiSave2Fill /></button>
              <button className='cancelButton' style={{ visibility: "hidden" }}><GiCancel /></button>
              <button className='deleteButton' style={{ visibility: "visible" }}><AiFillDelete /></button></td>

            <td>{geEstimationItem.item_name}</td>
            <td>{geEstimationItem.item_rate}</td>
            <td>{geEstimationItem.item_quantity}</td>
            <td>{geEstimationItem.item_amount}</td>



          </tr>
        )} 
      </tbody>
    
    </Table>
    </div>
  </div>);
}

export default GeEstimation;
