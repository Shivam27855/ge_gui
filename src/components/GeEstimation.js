import '../App.css';
import { useState, useEffect } from "react";
import ToDoItem from './TodoItem';
function GeEstimation() {
    const baseURL = "http://localhost:5000";
    //const baseURL ="https://lime-alert-deer.cyclic.app/";

    const [geItems,setGeItems]=useState([]);
    const [geFilterItems,setFilterGeItems]=useState([]);
    
    const [currentItem_short,setcurrentItem_short]=useState("");
    const [currentItem_company,setcurrentItem_company]=useState("");


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


  let handleItemChange=(e)=>{
    setcurrentItem_short(e.target.value);
    setFilterGeItems([]);
    let newArray=[];
    if(currentItem_short.length==0)
    {
        setFilterGeItems([]);
    }
    if(currentItem_short.length>=1)
    {
        geItems.filter(geItem => geItem.item_shortName.includes(currentItem_short)).map(filteredItem=> (
            newArray.push(filteredItem)
            
          ))
        setFilterGeItems(newArray)
    }
    
  }

  let handleItemCompanyChange=(e)=>{
    setcurrentItem_company(e.target.value);
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
    
  }



  return (<div>
    <h6>Shortname</h6><input className='inputField' type="text" value={currentItem_short} placeholder="Enter Item Name" onChange={handleItemChange}/>
    <h6>Compname</h6><input className='inputField' type="text" value={currentItem_company} placeholder="Enter Company Name" onChange={handleItemCompanyChange}/>

    {geFilterItems.map(
      (geFilterItem,index) => <li className="todoField" key={geFilterItem.item_id}>
                          
                          <input id={geFilterItem.item_id} type="text" value={geFilterItem.item_name}/>
                          <input id={geFilterItem.item_id} type="text" value={geFilterItem.item_company}/>
                          <input id={geFilterItem.item_id} type="text" value={geFilterItem.modal}/>
                          <input id={geFilterItem.item_id} type="text" value={geFilterItem.item_subcategary}/>
                          <input id={geFilterItem.item_id} type="text" value={geFilterItem.item_sp}/>
                          <input id={geFilterItem.item_id} type="text" value={geFilterItem.item_description}/>

                                              </li>
                  )}
  </div>);
}
export default GeEstimation;
