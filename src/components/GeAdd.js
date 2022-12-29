import '../App.css';
import { useState, useEffect } from "react";
import ToDoItem from './TodoItem';
import GeHome from './GeHome';
import $ from "jquery";

function GeAdd() {
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



  let handleLogOut =(e)=>{
    e.preventDefault();
    setCheckLoginStatus(false);
  }
  

  let handlecreate_shortname=(e)=>{
    console.log($(".demo").text());
    setcreate_shortname(e.target.value);
  }

  let handlecreate_name=(e)=>{
    setcreate_name(e.target.value);
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

    if(create_shortname=="" || create_name=="" || create_company=="" || create_cp=="" || create_sp=="")
    {
      alert("Fill all mandatory fields");
    }
    else
    {
      try {
        fetch(`${baseURL}/addGeItem`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            item_shortname: create_shortname,
            item_name:create_name,
            item_company:create_company,
            item_modal:create_modal,
            item_subcategory:create_subcategory,
            item_warranty:create_warranty,
            item_cp:create_cp,
            item_sp:create_sp,
            item_description:create_description
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            if (json.length != 0) {
              
  
              if(json.error=="Ge Item can not be added")
              {
                  //setEmptyToDoList(true);
                  setCreateError("Username Already Exists");
                  alert("Item Can Not Be Added");
                  
              }
              else{
                alert("Item Added");
                setCreateError("");
                setCreateAccountUi(false);
              }
            
            }
          })
      } catch (err) {
        alert("Login Fail")
        console.log(err);
      }
    }

    
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
  return (
  <div>







    

    <h1 className='demo'></h1>
    <form onSubmit={handleAddItem}>
    
    <div style={{display:'flex'}}>
  <div style={{margin: "auto",marginTop:"1vh",width:"60vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>ENTER ITEM SHORT NAME</h6>
  <input className='' type="text" value={create_shortname} placeholder="CREATE SHORTNAME" onChange={handlecreate_shortname} required/>


  </div>
  <div style={{margin: "auto",marginTop:"1vh",width:"60vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>ENTER ITEM NAME</h6>
  <input className='' type="text" value={create_name} placeholder="CREATE NAME" onChange={handlecreate_name} required/>


  </div>

  

        </div>


        <div style={{display:'flex'}}>
  <div style={{margin: "auto",marginTop:"1vh",width:"60vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>ENTER ITEM COMPANY NAME</h6>
  <input className='' type="text" value={create_company} placeholder="CREATE COMPANY" onChange={handlecreate_company} required/>


  </div>
  <div style={{margin: "auto",marginTop:"1vh",width:"60vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>ENTER MODAL NAME</h6>
  <input className='' type="text" value={create_modal} placeholder="CREATE MODAL" onChange={handlecreate_modal}/>


  </div>

  

        </div>

        <div style={{display:'flex'}}>
  <div style={{margin: "auto",marginTop:"1vh",width:"60vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>ENTER ITEM SUBCATEGORY</h6>
  <input className='' type="text" value={create_subcategory} placeholder="CREATE SUBCATEGORY" onChange={handlecreate_subcategory}/>


  </div>
  <div style={{margin: "auto",marginTop:"1vh",width:"60vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>ENTER ITEM WARRANTY</h6>
  <input className='' type="text" value={create_warranty} placeholder="CREATE WARRANTY" onChange={handlecreate_warranty}/>


  </div>

  

        </div>

        <div style={{display:'flex'}}>
  <div style={{margin: "auto",marginTop:"1vh",width:"60vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>ENTER ITEM COST PRICE</h6>
  <input className='' type="text" value={create_cp} placeholder="CREATE COST PRICE" onChange={handlecreate_cp} required/>


  </div>
  <div style={{margin: "auto",marginTop:"1vh",width:"60vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>ENTER ITEM SELLING PRICE</h6>
  <input className='' type="text" value={create_sp} placeholder="CREATE SELLING PRICE" onChange={handlecreate_sp} required/>


  </div>

  

        </div>

        <div style={{display:'flex'}}>
  <div style={{margin: "auto",marginTop:"1vh",width:"60vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>ENTER ITEM DESCRIPTION</h6>
  <input className='inputField' type="text" value={create_description} placeholder="CREATE DESCRIPTION" onChange={handlecreate_description}/>


  </div>
  
  

        </div>

        <div style={{display:'flex'}}>
  <div style={{margin: "auto",marginTop:"1vh",width:"60vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <button className='' type="submit">CREATE ITEM</button>

  </div>
  
  

        </div>


   
  
  </form></div>);
}
export default GeAdd;
