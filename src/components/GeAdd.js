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
                  
              }
              else{
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
    <h1 className='demo'>check</h1>
    <form onSubmit={handleAddItem}>
    <div className="inputField">
    <input className='' type="text" value={create_shortname} placeholder="CREATE SHORTNAME" onChange={handlecreate_shortname} required/>
    <input className='' type="text" value={create_name} placeholder="CREATE NAME" onChange={handlecreate_name} required/>
    </div>
    <div className="inputField">
    <input className='' type="text" value={create_company} placeholder="CREATE COMPANY" onChange={handlecreate_company} required/>
    <input className='' type="text" value={create_modal} placeholder="CREATE MODAL" onChange={handlecreate_modal}/>
    </div>
    <div className="inputField">
    <input className='' type="text" value={create_subcategory} placeholder="CREATE SUBCATEGORY" onChange={handlecreate_subcategory}/>
    <input className='' type="text" value={create_warranty} placeholder="CREATE WARRANTY" onChange={handlecreate_warranty}/>
    </div>
    <div className="inputField">
    <input className='' type="text" value={create_cp} placeholder="CREATE COST PRICE" onChange={handlecreate_cp} required/>
    <input className='' type="text" value={create_sp} placeholder="CREATE SELLING PRICE" onChange={handlecreate_sp} required/>
    </div>
    <input className='inputField' type="text" value={create_description} placeholder="CREATE DESCRIPTION" onChange={handlecreate_description}/>
    <button className='inputField' type="submit">CREATE ITEM</button>
  </form></div>);
}
export default GeAdd;
