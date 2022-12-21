import '../App.css';
import { useState, useEffect } from "react";
import ToDoItem from './TodoItem';
function GeEstimation() {
    const baseURL = "http://localhost:5000";
    //const baseURL ="https://lime-alert-deer.cyclic.app/";

    const [geItems,setGeItems]=useState([]);
    const [geFilterItems,setFilterGeItems]=useState([]);
    
    const [currentItem,setCurrentItem]=useState("");


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
    setCurrentItem(e.target.value);
    setFilterGeItems([]);
    let newArray=[];
    if(currentItem.length==0)
    {
        setFilterGeItems([]);
    }
    if(currentItem.length>=1)
    {
        geItems.filter(geItem => geItem.item_shortName.includes(currentItem)).map(filteredItem=> (
            newArray.push(filteredItem)
            
          ))
        setFilterGeItems(newArray)
    }
    
  }

  return (<div>
    <input className='inputField' type="text" value={currentItem} placeholder="Enter Item Name" onChange={handleItemChange}/>
    {geFilterItems.map(
      (geFilterItem,index) => <li className="todoField" key={geFilterItem.item_id}>
                          
                          <input id={geFilterItem.item_id} type="text" value={geFilterItem.item_name}/>

                                              </li>
                  )}
  </div>);
}
export default GeEstimation;
