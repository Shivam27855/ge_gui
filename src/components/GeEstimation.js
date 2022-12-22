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

  useEffect(()=>{
    setFilterGeItems([]);
    let newArray=[];
    if(currentItem_short.length==0)
    {
        setFilterGeItems([]);
    }
    else if(currentItem_short=='*')
    {
      setFilterGeItems(geItems);
      console.log(geFilterItems)
    }
    else if(currentItem_short.length>=1)
    {
        geItems.filter(geItem => geItem.item_shortName.includes(currentItem_short)).map(filteredItem=> (
            newArray.push(filteredItem)
            
          ))
        setFilterGeItems(newArray)
    }
  },[currentItem_short]);

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
   
    
      <div className="inputField">
      <h6>Shortname</h6><input className='' type="text" value={currentItem_short} placeholder="Enter Item Name" onChange={handleItemChange}/>
      <h6>Compname</h6><input className='' type="text" value={currentItem_company} placeholder="Enter Company Name" onChange={handleItemCompanyChange}/>

    </div>

    <table>
        <tr>
          <th>NAME</th>
          <th>COMPANY</th>
          <th>MODEL</th>
          <th>SUB-CATEGORY</th>
          <th>WARRANTY</th>
          <th>COST PRICE</th>
          <th>SELLING PRICE</th>
          <th>DESCRIPTION</th>
        </tr>


    {geFilterItems.map(
      (geFilterItem,index) => <tr id={geFilterItem.item_id} key={geFilterItem.item_id}>
                          
                          <td>{geFilterItem.item_name}</td>
                          <td>{geFilterItem.item_company}</td>
                          <td>{geFilterItem.modal}</td>
                          <td>{geFilterItem.item_subcategary}</td>
                          <td>{geFilterItem.item_warranty}</td>
                          <td>{geFilterItem.item_cp}</td>
                          <td>{geFilterItem.item_sp}</td>
                          <td>{`${geFilterItem.item_description}`}</td>

                                              </tr>
                  )}
                  </table>
  </div>);
}
export default GeEstimation;
