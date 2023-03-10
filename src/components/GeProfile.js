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
function GeProfile(props) {
  const baseURL = "http://localhost:5000";
  //const baseURL ="https://lime-alert-deer.cyclic.app/";

  const [geItems, setGeItems] = useState([]);
  const [geFilterItems, setFilterGeItems] = useState([]);

  const [currentItem_short, setcurrentItem_short] = useState("");
  const [currentItem_company, setcurrentItem_company] = useState("");

  const [editOn, seteditOn] = useState([false]);


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkLoginStatus, setCheckLoginStatus] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const [userId, setUserId] = useState();
  const [emptyToDoList, setEmptyToDoList] = useState(false);

  const [createAccountUi, setCreateAccountUi] = useState(false);
  const [create_username, setCreate_username] = useState("");
  const [create_password, setCreate_password] = useState("");
  const [createError, setCreateError] = useState("");

  let handleLogOut = (e) => {
    e.preventDefault();
    setCheckLoginStatus(false);
  }

  useEffect(() => {
    fetchGeItem();
  }, []);

  useEffect(() => {
    setFilterGeItems([]);
    let newArray = [];
    let newEdit = [];
    if (currentItem_short.length == 0) {
      setFilterGeItems([]);
    }
    else if (currentItem_short == '*') {
      setFilterGeItems(geItems);
      console.log(geItems.length)
      for (let i = 0; i < geItems.length; i++) {
        newEdit.push(false);
      }
      seteditOn(newEdit);
      console.log(newEdit);
    }
    else if (currentItem_short.length >= 1) {
      //console.log(currentItem_short)
      geItems.filter(geItem => geItem.item_shortname.includes(currentItem_short)).map(filteredItem => (
        newArray.push(filteredItem)

      ))
      geItems.filter(geItem => geItem.item_shortname.includes(currentItem_short)).map(filteredItem => (
        newEdit.push(false)

      ))
      setFilterGeItems(newArray)
      seteditOn(newEdit);
    }
  }, [currentItem_short]);

  useEffect(() => {
    setFilterGeItems([]);
    let newArray = [];
    if (currentItem_company.length == 0) {
      setFilterGeItems([]);
    }
    if (currentItem_company.length >= 1) {
      geItems.filter(geItem => geItem.item_company.includes(currentItem_company) && geItem.item_shortName.includes(currentItem_short)).map(filteredItem => (
        newArray.push(filteredItem)

      ))
      setFilterGeItems(newArray)
    }
  }, [currentItem_company]);

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


  let handleNewNameChange = (id, value, index) => {
    const newTodo = [...geFilterItems];
    newTodo[index].item_name = value;
    setFilterGeItems(newTodo);
  }

  let handleNewCompanyChange = (id, value, index) => {
    const newTodo = [...geFilterItems];
    newTodo[index].item_company = value;
    setFilterGeItems(newTodo);
  }

  let handleNewModalChange = (id, value, index) => {
    const newTodo = [...geFilterItems];
    newTodo[index].item_modal = value;
    setFilterGeItems(newTodo);
  }

  let handleNewSubCategoryChange = (id, value, index) => {
    const newTodo = [...geFilterItems];
    newTodo[index].item_subcategary = value;
    setFilterGeItems(newTodo);
  }

  let handleNewWarrantyChange = (id, value, index) => {
    const newTodo = [...geFilterItems];
    newTodo[index].item_warranty = value;
    setFilterGeItems(newTodo);
  }

  let handleNewCpChange = (id, value, index) => {
    const newTodo = [...geFilterItems];
    newTodo[index].item_cp = value;
    setFilterGeItems(newTodo);
  }

  let handleNewSpChange = (id, value, index) => {
    const newTodo = [...geFilterItems];
    newTodo[index].item_sp = value;
    setFilterGeItems(newTodo);
  }

  let handleNewDescriptionChange = (id, value, index) => {
    const newTodo = [...geFilterItems];
    newTodo[index].item_description = value;
    setFilterGeItems(newTodo);
  }



  let handleItemChange = (e) => {
    setcurrentItem_short(e.target.value);
  }

  let handleItemCompanyChange = (e) => {
    setcurrentItem_company(e.target.value);
  }

  let handleCancel = (item_id, index) => {
    const newEdit = [...editOn];
    newEdit[index] = false

    seteditOn(newEdit);
    document.getElementById('editButton_' + item_id).style.visibility = 'visible';
    document.getElementById('saveButton_' + item_id).style.visibility = 'hidden';
    document.getElementById('cancelButton_' + item_id).style.visibility = 'hidden';

    console.log(geItems);

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
      console.log(json);

      //alert(currentUserId);
      const filteredPeople = geFilterItems.filter((item) => item.item_id !== item_id);

      const newEdit = [...editOn];

      const newEditArray = [];

for (let i = 0; i < newEdit.length; i++) {
    if (i != index) {
      newEditArray.push(newEdit[i]);
    }
}



      seteditOn(newEditArray);

      setFilterGeItems(filteredPeople)
      fetchGeItem();
      alert("Item Deleted");



    })
} catch (err) {
  alert("Delete Fail")
  console.log(err);
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
            console.log(json);

            //document.getElementById(todoId).removeAttribute("disabled");
            //document.getElementById(todoId).setAttribute("disabled","true");
            const newEdit = [...editOn];
            newEdit[index] = false

            seteditOn(newEdit);

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
      console.log(err);
    }
  }

  let handleEdit = (item_id, index) => {
    //setDisableItem(false);
    //seteditOn(true);
    console.log(editOn)

    const newEdit = [...editOn];
    newEdit[index] = true

    seteditOn(newEdit);

    //console.log(item_id);
    //console.log($("#editname_3").value)

    document.getElementById('editButton_' + item_id).style.visibility = 'hidden';
    document.getElementById('saveButton_' + item_id).style.visibility = 'visible';
    document.getElementById('cancelButton_' + item_id).style.visibility = 'visible';


    //setTodoItems(newTodo);

    //document.getElementById(todoId).removeAttribute("disabled");

  }

  let handleValue =()=>{

    // let newArray = [...props.profileData]
    // newArray.push("c");
    // props.setprofileData(newArray);

    props.addValue("d");
  }

  return (<div>
    {
      props.profileData.map((item,index)=><h3>{item}</h3>)
      
    }
    <button onClick={handleValue}>add</button>
  </div>);
}
export default GeProfile;
