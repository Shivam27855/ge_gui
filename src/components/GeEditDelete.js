import '../App.css';
import { useState, useEffect } from "react";
import ToDoItem from './TodoItem';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiEdit } from 'react-icons/fi';
import { RiSave2Fill } from 'react-icons/ri'
import { GiCancel } from 'react-icons/gi'
import { AiFillDelete } from 'react-icons/ai'
import Table from 'react-bootstrap/Table';
import $ from "jquery";
function GeEditDelete(props) {
  const baseURL = "http://localhost:5000";
  //const baseURL ="https://lime-alert-deer.cyclic.app/";

  


  useEffect(() => {
    fetchGeItem();
  }, []);

  useEffect(() => {
    fetchUsingName();
  }, [props.currentItem_shortEditDelete]);


  let fetchUsingName=()=>{
    props.setFilterGeItemsEditDelete([]);
    props.setprevEditValue([]);
    let newArray = [];
    let newEdit = [];
    let actionButton = []
    if (props.currentItem_shortEditDelete.length == 0) {
      props.setFilterGeItemsEditDelete([]);
      props.setprevEditValue([]);
    }
    else if (props.currentItem_shortEditDelete == '*') {
      props.setFilterGeItemsEditDelete(props.geItemsEditDelete);
      props.setprevEditValue(props.geItemsEditDelete);
      console.log(props.prevEditValue)
      for (let i = 0; i < props.geItemsEditDelete.length; i++) {
        newEdit.push(false);
      }

      props.seteditOn(newEdit);

      for (let i = 0; i < props.geItemsEditDelete.length; i++) {
        actionButton.push(true);
      }
      props.setshowActionButton(actionButton);
     
    }
    else if (props.currentItem_shortEditDelete.length >= 1) {
      
      props.geItemsEditDelete.filter(geItem => geItem.item_shortname.includes(props.currentItem_shortEditDelete)).map(filteredItem => (
        newArray.push(filteredItem)

      ))
      props.geItemsEditDelete.filter(geItem => geItem.item_shortname.includes(props.currentItem_shortEditDelete)).map(filteredItem => (
        newEdit.push(false)

      ))

      props.geItemsEditDelete.filter(geItem => geItem.item_shortname.includes(props.currentItem_shortEditDelete)).map(filteredItem => (
        actionButton.push(true)

      ))
      props.setFilterGeItemsEditDelete(newArray)
      props.setprevEditValue(newArray);
      props.seteditOn(newEdit);
      props.setshowActionButton(actionButton);
    }
  }

  useEffect(() => {
    props.setFilterGeItemsEditDelete([]);
    props.setprevEditValue([]);
    let newArray = [];
    if (props.currentItem_companyEditDelete.length == 0) {
      props.setFilterGeItemsEditDelete([]);
      props.setprevEditValue([]);
    }
    if (props.currentItem_companyEditDelete.length >= 1) {
      props.geItemsEditDelete.filter(geItem => geItem.item_company.includes(props.currentItem_companyEditDelete) && geItem.item_shortname.includes(props.currentItem_shortEditDelete)).map(filteredItem => (
        newArray.push(filteredItem)

      ))
      props.setFilterGeItemsEditDelete(newArray)
      props.setprevEditValue(newArray);
    }
  }, [props.currentItem_companyEditDelete]);

  let fetchGeItem = () => {
    try {
      fetch(`${baseURL}/getGeItem`, {
        method: "get",
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.length != 0) {
       
            //setCheckLoginStatus(true);

            if (json.error == "No Item in Inventory") {
              //setEmptyToDoList(true);
            }
            else {
              props.setGeItemsEditDelete(json);
              fetchUsingName();
              
              //setEmptyToDoList(false);
            }

          }
        })
    } catch (err) {
      alert("Login Fail")
     
    }
  }

  let handleNewShortNameChange = (id, value, index) => {
    const newTodo = [...props.geFilterItemsEditDelete];
    newTodo[index].item_shortname = value;
    props.setFilterGeItemsEditDelete(newTodo);
  }

  let handleNewNameChange = (id, value, index) => {
    const prevV = props.geFilterItemsEditDelete[index].item_name;
    const newTodo = [...props.geFilterItemsEditDelete];
    newTodo[index].item_name = value;
    props.setFilterGeItemsEditDelete(newTodo);
    
  }

  let handleNewCompanyChange = (id, value, index) => {
    const newTodo = [...props.geFilterItemsEditDelete];
    newTodo[index].item_company = value;
    props.setFilterGeItemsEditDelete(newTodo);
  }

  let handleNewModalChange = (id, value, index) => {
    const newTodo = [...props.geFilterItemsEditDelete];
    newTodo[index].item_modal = value;
    props.setFilterGeItemsEditDelete(newTodo);
  }

  let handleNewSubCategoryChange = (id, value, index) => {
    const newTodo = [...props.geFilterItemsEditDelete];
    newTodo[index].item_subcategory = value;
    props.setFilterGeItemsEditDelete(newTodo);
  }

  let handleNewWarrantyChange = (id, value, index) => {
    const newTodo = [...props.geFilterItemsEditDelete];
    newTodo[index].item_warranty = value;
    props.setFilterGeItemsEditDelete(newTodo);
  }

  let handleNewCpChange = (id, value, index) => {
    const newTodo = [...props.geFilterItemsEditDelete];
    newTodo[index].item_cp = value;
    props.setFilterGeItemsEditDelete(newTodo);
  }

  let handleNewSpChange = (id, value, index) => {
    const newTodo = [...props.geFilterItemsEditDelete];
    newTodo[index].item_sp = value;
    props.setFilterGeItemsEditDelete(newTodo);
  }

  let handleNewDescriptionChange = (id, value, index) => {
    const newTodo = [...props.geFilterItemsEditDelete];
    newTodo[index].item_description = value;
    props.setFilterGeItemsEditDelete(newTodo);
  }



  let handleItemChange = (e) => {
    props.setcurrentItem_shortEditDelete(e.target.value);
  }

  let handleItemCompanyChange = (e) => {
    props.setcurrentItem_companyEditDelete(e.target.value);
  }

  let handleCancel = (item_id, index) => {
    let actionButton=[];
    for (let i = 0; i < props.geItemsEditDelete.length; i++) {
    
      actionButton.push(true);
    }
    props.setshowActionButton(actionButton);
    console.log(props.prevEditValue)
    const newEdit = [...props.editOn];
    newEdit[index] = false
    console.log(props.prevEditValue);
    props.geFilterItemsEditDelete[index].item_company=props.prevEditValue2.item_company
    props.geFilterItemsEditDelete[index].item_cp=props.prevEditValue2.item_cp
    props.geFilterItemsEditDelete[index].item_description=props.prevEditValue2.item_description
    props.geFilterItemsEditDelete[index].item_id=props.prevEditValue2.item_id
    props.geFilterItemsEditDelete[index].item_modal=props.prevEditValue2.item_modal
    props.geFilterItemsEditDelete[index].item_name=props.prevEditValue2.item_name
    props.geFilterItemsEditDelete[index].item_shortname=props.prevEditValue2.item_shortname
    props.geFilterItemsEditDelete[index].item_sp=props.prevEditValue2.item_sp
    props.geFilterItemsEditDelete[index].item_subcategory=props.prevEditValue2.item_subcategory
    props.geFilterItemsEditDelete[index].item_warranty=props.prevEditValue2.item_warranty

    props.seteditOn(newEdit);
    document.getElementById('editButton_' + item_id).style.visibility = 'visible';
    document.getElementById('saveButton_' + item_id).style.visibility = 'hidden';
    document.getElementById('cancelButton_' + item_id).style.visibility = 'hidden';


  }

  let handleDelete = (item_id, index) => {

    const baseURL = "http://localhost:5000";
//const baseURL ="https://lime-alert-deer.cyclic.app/";
//alert(props.userId);

try {
  fetch(`${baseURL}/deleteGeItem/${item_id}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => res.json())
    .then((json) => {
      

      //alert(currentUserId);
      const filteredPeople = props.geFilterItemsEditDelete.filter((item) => item.item_id !== item_id);

      const newEdit = [...props.editOn];

      const newEditArray = [];

for (let i = 0; i < newEdit.length; i++) {
    if (i != index) {
      newEditArray.push(newEdit[i]);
    }
}



      props.seteditOn(newEditArray);

      props.setFilterGeItemsEditDelete(filteredPeople)
      props.setprevEditValue(filteredPeople)
      fetchGeItem();

      let actionButton=[];
    for (let i = 0; i < props.geItemsEditDelete.length; i++) {
    
      actionButton.push(true);
    }
    props.setshowActionButton(actionButton);

      alert("Item Deleted");



    })
} catch (err) {
  alert("Delete Fail")
  
}
  }

  let handleSave = (item_id, index) => {

    //const baseURL ="https://lime-alert-deer.cyclic.app/";
    const baseURL = "http://localhost:5000/";
    try {
      fetch(`${baseURL}editGeItem/${item_id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "item_shortname": document.getElementById(`editshortname_${item_id}`).value,
          "item_name": document.getElementById(`editname_${item_id}`).value,
          "item_company": document.getElementById(`editcompany_${item_id}`).value,
          "item_modal": document.getElementById(`editmodal_${item_id}`).value,
          "item_subcategory": document.getElementById(`editsubcategory_${item_id}`).value,
          "item_warranty": document.getElementById(`editwarranty_${item_id}`).value,
          "item_cp": document.getElementById(`editcp_${item_id}`).value,
          "item_sp": document.getElementById(`editsp_${item_id}`).value,
          "item_description": document.getElementById(`editdescription_${item_id}`).value
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.length != 0) {
          

            //document.getElementById(todoId).removeAttribute("disabled");
            //document.getElementById(todoId).setAttribute("disabled","true");
            const newEdit = [...props.editOn];
            newEdit[index] = false

            props.seteditOn(newEdit);

            let actionButton=[];
    for (let i = 0; i < props.geItemsEditDelete.length; i++) {
    
      actionButton.push(true);
    }
    props.setshowActionButton(actionButton);

            document.getElementById('editButton_' + item_id).style.visibility = 'visible';
            document.getElementById('saveButton_' + item_id).style.visibility = 'hidden';
            document.getElementById('cancelButton_' + item_id).style.visibility = 'hidden';

            alert("Item Edited Successfully");
            // setCheckLoginStatus(true);
            // setTodoItems(json);
            // setProfileUserName(json[0].userName);

            // fetch(
            //   `${baseURL}/getAccount/${profileUserId}`)
            //   .then((res) => res.json())
            //   .then((json) => {
            //     setAccount(json);
            //   })
          }
        })
    } catch (err) {
      alert("Login Fail")
    
    }
  }

  let handleEdit = (item_id, index) => {
    //setDisableItem(false);
    //props.seteditOn(true);
    let actionButton=[];
    for (let i = 0; i < props.geItemsEditDelete.length; i++) {
      if(i==index)
      actionButton.push(true);
      else
      actionButton.push(false);
    }
    props.setshowActionButton(actionButton);
  
    console.log(props.prevEditValue[index])
    let check={};
    check={
      item_company:props.prevEditValue[index].item_company,
      item_cp:props.prevEditValue[index].item_cp,
      item_description:props.prevEditValue[index].item_description,
      item_id:props.prevEditValue[index].item_id,
      item_modal:props.prevEditValue[index].item_modal,
      item_name:props.prevEditValue[index].item_name,
      item_shortname:props.prevEditValue[index].item_shortname,
      item_sp:props.prevEditValue[index].item_sp,
      item_subcategory:props.prevEditValue[index].item_subcategory,
      item_warranty:props.prevEditValue[index].item_warranty
      
    }
    props.setprevEditValue2(check);

    const newEdit = [...props.editOn];
    newEdit[index] = true

    props.seteditOn(newEdit);


    document.getElementById('editButton_' + item_id).style.visibility = 'hidden';
    document.getElementById('saveButton_' + item_id).style.visibility = 'visible';
    document.getElementById('cancelButton_' + item_id).style.visibility = 'visible';


    //setTodoItems(newTodo);

    //document.getElementById(todoId).removeAttribute("disabled");

  }
  return (<div style={{ margin: "auto",marginTop:"2vh",width:"165vh",height:"10vh"}}>

    
<div style={{display:'flex'}}>
  <div style={{margin: "auto",marginTop:"1vh",width:"40vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>NAME SEARCH</h6><input className='' type="text" value={props.currentItem_shortEditDelete} placeholder="ENTER ITEM" onChange={handleItemChange} />

  </div>
  <div style={{margin: "auto",marginTop:"1vh",width:"40vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>COMPANY SEARCH</h6><input className='' type="text" value={props.currentItem_companyEditDelete} placeholder="ENTER COMPANY" onChange={handleItemCompanyChange} />

  </div>

  <div style={{margin: "auto",marginTop:"1vh",width:"40vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>MODAL SEARCH</h6><input className='' type="text" value={props.currentItem_companyEditDelete} placeholder="ENTER MODAL" onChange={handleItemCompanyChange} />

  </div>

        </div>

    <div style={{height: "65vh", overflow: "auto",marginTop:"1vh"}}>

    <Table striped bordered hover style={{height: "80vh"}}>
      <thead style={{position: "sticky",top: "0px",backgroundColor:"lightyellow"}}>
        <tr>
        <th>ACTIONS</th>
        <th>SHORT NAME</th>
          <th>NAME</th>
          <th>COMPANY</th>
          <th>MODEL</th>
          <th>SUB-CATEGORY</th>
          <th>WARRANTY</th>
          <th>COST PRICE</th>
          <th>SELLING PRICE</th>
          <th>DESCRIPTION</th>
         
        </tr>
      </thead>

      <tbody>
        {props.geFilterItemsEditDelete.map(
          (geFilterItem, index) => <tr id={geFilterItem.item_id} key={geFilterItem.item_id}>

<td>{props.showActionButton[index] && <><FiEdit size={25} className='' style={{ visibility: "visible" }} id={"editButton_" + geFilterItem.item_id} onClick={() => handleEdit(geFilterItem.item_id, index)}/>
              <RiSave2Fill size={25}  className='' style={{ visibility: "hidden" }} id={"saveButton_" + geFilterItem.item_id} onClick={() => handleSave(geFilterItem.item_id, index)}/>
              <GiCancel size={25}  className='' style={{ visibility: "hidden" }} id={"cancelButton_" + geFilterItem.item_id} onClick={() => handleCancel(geFilterItem.item_id, index)}/>
              <AiFillDelete size={25}  className='' style={{ visibility: "visible" }} id={"deleteButton_" + geFilterItem.item_id} onClick={()=>handleDelete(geFilterItem.item_id, index)}/></>}</td>
              
              <td>{props.editOn[index] ? <input id={`editshortname_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_shortname} placeholder="EDIT SHORT NAME" onChange={(e) => { handleNewShortNameChange(geFilterItem.item_id, e.target.value, index) }} /> : geFilterItem.item_shortname}</td>

            <td>{props.editOn[index] ? <input id={`editname_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_name} placeholder="EDIT NAME" onChange={(e) => { handleNewNameChange(geFilterItem.item_id, e.target.value, index) }} /> : geFilterItem.item_name}</td>
            <td>{props.editOn[index] ? <input id={`editcompany_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_company} placeholder="EDIT COMPANY" onChange={(e) => { handleNewCompanyChange(geFilterItem.item_id, e.target.value, index) }} /> : geFilterItem.item_company}</td>
            <td>{props.editOn[index] ? <input id={`editmodal_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_modal} placeholder="EDIT MODAL" onChange={(e) => { handleNewModalChange(geFilterItem.item_id, e.target.value, index) }} /> : geFilterItem.item_modal}</td>
            <td>{props.editOn[index] ? <input id={`editsubcategory_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_subcategory} placeholder="EDIT SUBCATEGORY" onChange={(e) => { handleNewSubCategoryChange(geFilterItem.item_id, e.target.value, index) }} /> : geFilterItem.item_subcategory}</td>
            <td>{props.editOn[index] ? <input id={`editwarranty_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_warranty} placeholder="EDIT WARRANTY" onChange={(e) => { handleNewWarrantyChange(geFilterItem.item_id, e.target.value, index) }} /> : geFilterItem.item_warranty}</td>
            <td>{props.editOn[index] ? <input id={`editcp_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_cp} placeholder="EDIT COST PRICE" onChange={(e) => { handleNewCpChange(geFilterItem.item_id, e.target.value, index) }} /> : geFilterItem.item_cp}</td>
            <td>{props.editOn[index] ? <input id={`editsp_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_sp} placeholder="EDIT SELLING PRICE" onChange={(e) => { handleNewSpChange(geFilterItem.item_id, e.target.value, index) }} /> : geFilterItem.item_sp}</td>
            <td>{props.editOn[index] ? <input id={`editdescription_${geFilterItem.item_id}`} className='' type="text" value={geFilterItem.item_description} placeholder="EDIT DESCRIPTION" onChange={(e) => { handleNewDescriptionChange(geFilterItem.item_id, e.target.value, index) }} /> : geFilterItem.item_description}</td>
           

          </tr>
        )}
      </tbody>
    </Table>
    
    </div>
    <h6>DON'T CHANGE THE TAB WHILE EDITING. OTHERWISE CHANGE WILL LOST</h6>
    <h6>CHANGE THE TAB AFTER SAVING THE EDITING ROW. IF YOU DON'T WANT TO LOOSE THE CHANGES.</h6>
  </div>);
}
export default GeEditDelete;
