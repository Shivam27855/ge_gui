import '../App.css';
import { useState, useEffect } from "react";
import ToDoItem from './TodoItem';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiEdit } from 'react-icons/fi';
import {RiSave2Fill} from 'react-icons/ri'
import {GiCancel} from 'react-icons/gi'
import {AiFillDelete} from 'react-icons/ai'
import $ from "jquery";
function GeEstimation() {
    const baseURL = "http://localhost:5000";
    //const baseURL ="https://lime-alert-deer.cyclic.app/";

    const [geItems,setGeItems]=useState([]);
    const [geFilterItems,setFilterGeItems]=useState([]);
    
    const [currentItem_short,setcurrentItem_short]=useState("");
    const [currentItem_company,setcurrentItem_company]=useState("");

    const[editOn,seteditOn]=useState([false]);


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

  useEffect(()=>{
    fetchGeItem();
  },[]);

  useEffect(()=>{
    setFilterGeItems([]);
    let newArray=[];
    let newEdit=[];
    if(currentItem_short.length==0)
    {
        setFilterGeItems([]);
    }
    else if(currentItem_short=='*')
    {
      setFilterGeItems(geItems);
      console.log(geItems.length)
      for(let i=0;i<geItems.length;i++)
      {
        newEdit.push(false);
      }
      seteditOn(newEdit);
      console.log(newEdit);
    }
    else if(currentItem_short.length>=1)
    {
        //console.log(currentItem_short)
        geItems.filter(geItem => geItem.item_shortname.includes(currentItem_short)).map(filteredItem=> (
          newArray.push(filteredItem)
          
        ))
        geItems.filter(geItem => geItem.item_shortname.includes(currentItem_short)).map(filteredItem=> (
          newEdit.push(false)
          
        ))
      setFilterGeItems(newArray)
      seteditOn(newEdit);
    }
  },[currentItem_short]);

  useEffect(()=>{
    setFilterGeItems([]);
    let newArray=[];
    if(currentItem_company.length==0)
    {
        setFilterGeItems([]);
    }
    if(currentItem_company.length>=1)
    {
        geItems.filter(geItem => geItem.item_company.includes(currentItem_company) && geItem.item_shortName.includes(currentItem_short)).map(filteredItem=> (
            newArray.push(filteredItem)
            
          ))
        setFilterGeItems(newArray)
    }
  },[currentItem_company]);

  let fetchGeItem=()=>{
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
  
              if(json.error=="No Item in Inventory")
              {
                  //setEmptyToDoList(true);
              }
              else{
                  setGeItems(json);
                  //setEmptyToDoList(false);
              }
              
            }
          })
      } catch (err) {
        alert("Login Fail")
        console.log(err);
      }
  }


  let handleNewNameChange=(id,value,index)=>{
    const newTodo = [...geFilterItems];
    newTodo[index].item_name=value;
    setFilterGeItems(newTodo);
  }

  let handleNewCompanyChange=(id,value,index)=>{
    const newTodo = [...geFilterItems];
    newTodo[index].item_company=value;
    setFilterGeItems(newTodo);
  }

  let handleNewModalChange=(id,value,index)=>{
    const newTodo = [...geFilterItems];
    newTodo[index].item_modal=value;
    setFilterGeItems(newTodo);
  }

  let handleNewSubCategoryChange=(id,value,index)=>{
    const newTodo = [...geFilterItems];
    newTodo[index].item_subcategary=value;
    setFilterGeItems(newTodo);
  }

  let handleNewWarrantyChange=(id,value,index)=>{
    const newTodo = [...geFilterItems];
    newTodo[index].item_warranty=value;
    setFilterGeItems(newTodo);
  }

  let handleNewCpChange=(id,value,index)=>{
    const newTodo = [...geFilterItems];
    newTodo[index].item_cp=value;
    setFilterGeItems(newTodo);
  }

  let handleNewSpChange=(id,value,index)=>{
    const newTodo = [...geFilterItems];
    newTodo[index].item_sp=value;
    setFilterGeItems(newTodo);
  }

  let handleNewDescriptionChange=(id,value,index)=>{
    const newTodo = [...geFilterItems];
    newTodo[index].item_description=value;
    setFilterGeItems(newTodo);
  }

  

  let handleItemChange=(e)=>{
    setcurrentItem_short(e.target.value);
  }

  let handleItemCompanyChange=(e)=>{
    setcurrentItem_company(e.target.value);  
  }

  let handleEdit=(item_id,index)=>
  {
    //setDisableItem(false);
    //seteditOn(true);
    console.log(editOn)

    const newEdit = [...editOn];
    newEdit[index]=true

  seteditOn(newEdit);

  console.log(item_id);
  console.log($("#editname_3").value)

  //setTodoItems(newTodo);

    //document.getElementById(todoId).removeAttribute("disabled");

}
  return (<div>
   
    
      <div className="inputField">
      <h6>Shortname</h6><input className='' type="text" value={currentItem_short} placeholder="Enter Item Name" onChange={handleItemChange}/>
      <h6>Compname</h6><input className='' type="text" value={currentItem_company} placeholder="Enter Company Name" onChange={handleItemCompanyChange}/>

    </div>

    <table>
      <thead>
        <tr>
          <th>NAME</th>
          <th>COMPANY</th>
          <th>MODEL</th>
          <th>SUB-CATEGORY</th>
          <th>WARRANTY</th>
          <th>COST PRICE</th>
          <th>SELLING PRICE</th>
          <th>DESCRIPTION</th>
          <th>ACTIONS</th>
        </tr>
      </thead>

      <tbody>
    {geFilterItems.map(
      (geFilterItem,index) => <tr id={geFilterItem.item_id} key={geFilterItem.item_id}>
                          
                          <td>{editOn[index]?<input id={`editname_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_name} placeholder="EDIT NAME" onChange={(e) => {handleNewNameChange(geFilterItem.item_id,e.target.value,index)}} />:geFilterItem.item_name}</td>
                          <td>{editOn[index]?<input id={`editcompany_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_company} placeholder="EDIT COMPANY" onChange={(e) => {handleNewCompanyChange(geFilterItem.item_id,e.target.value,index)}}/>:geFilterItem.item_company}</td>
                          <td>{editOn[index]?<input id={`editmodal_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_modal} placeholder="EDIT MODAL" onChange={(e) => {handleNewModalChange(geFilterItem.item_id,e.target.value,index)}}/>:geFilterItem.item_modal}</td>
                          <td>{editOn[index]?<input id={`editsubcategory_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_subcategary} placeholder="EDIT SUBCATEGORY" onChange={(e) => {handleNewSubCategoryChange(geFilterItem.item_id,e.target.value,index)}}/>:geFilterItem.item_subcategary}</td>
                          <td>{editOn[index]?<input id={`editwarranty_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_warranty} placeholder="EDIT WARRANTY" onChange={(e) => {handleNewWarrantyChange(geFilterItem.item_id,e.target.value,index)}}/>:geFilterItem.item_warranty}</td>
                          <td>{editOn[index]?<input id={`editcp_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_cp} placeholder="EDIT COST PRICE" onChange={(e) => {handleNewCpChange(geFilterItem.item_id,e.target.value,index)}}/>:geFilterItem.item_cp}</td>
                          <td>{editOn[index]?<input id={`editsp_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_sp} placeholder="EDIT SELLING PRICE" onChange={(e) => {handleNewSpChange(geFilterItem.item_id,e.target.value,index)}}/>:geFilterItem.item_sp}</td>
                          <td>{editOn[index]?<input id={`editdescription_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_description} placeholder="EDIT DESCRIPTION" onChange={(e) => {handleNewDescriptionChange(geFilterItem.item_id,e.target.value,index)}}/>:geFilterItem.item_description}</td>
                          <td><button className='editButton' style={{visibility: "visible"}} id={"editButton_"+geFilterItem.item_id} onClick={()=>handleEdit(geFilterItem.item_id,index)}><FiEdit /></button>
                          <button className='saveButton' style={{visibility: "hidden"}} id={"saveButton_"+geFilterItem.todoId} ><RiSave2Fill/></button>
                          <button className='cancelButton' style={{visibility: "hidden"}} id={"cancelButton_"+geFilterItem.todoId}><GiCancel/></button>
                          <button className='deleteButton' style={{visibility: "visible"}} id={"deleteButton_"+geFilterItem.todoId}><AiFillDelete/></button></td>

                          
                          
                          
                                              </tr>
                  )}
            </tbody>
                  </table>
  </div>);
}
export default GeEstimation;
