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
function GeCheck(props) {
    const baseURL = "http://localhost:5000";
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
                    props.setGeItems(json);
                  console.log(props.geItems);
                  //setEmptyToDoList(false);
                }
    
              }
            })
        } catch (err) {
          alert("Login Fail")
          console.log(err);
        }
      }
    

    useEffect(()=>{props.setenter_amount(props.enter_quantity*props.create_name)},[props.enter_quantity])

    useEffect(() => {
        props.setenter_amount(props.enter_quantity*props.create_name)
    }, [props.create_name]);
  
    useEffect(() => {
        props.setenter_amount(props.enter_quantity*props.create_name)
    }, [props.enter_quantity]);
  
  
    
    let handleAddItem = (e) => {
      e.preventDefault();
   
      const va = {item_name:props.create_shortname,item_rate:props.create_name,item_quantity:props.enter_quantity,item_amount:props.enter_amount}
  
      const arr = [...props.geEstimationItems];
      arr.push(va);
      //setFilterGeItems(arr);
  
      props.setgeEstimationItems(arr);
      props.setgrandTotal(props.grandTotal+props.enter_amount);
    };
  
    let handlecreate_name=(e)=>{
        props.setcreate_name(e.target.value);
    }
  
    let handlequantity=(e)=>{
        props.setenter_quantity(e.target.value);    
    }
  
    let handlecreate_shortname=(e)=>{
        props.setcreate_shortname(e.target.value);
  
      let x1 = document.getElementById("programmingLanguages").options;
  for (var i=0;i<x1.length;i++) {
          if (x1[i].value == e.target.value) {
              console.log(x1[i].id);
              // alert('The index of SellectedIndex is : ' + i + ' and the value is : '  +x[i].value);
              for(let j=0;j<props.geItems.length;j++)
              {
                if(props.geItems[j].item_id==x1[i].id)
                {
                    props.setcreate_name(props.geItems[j].item_sp);
                  break;
                }
              }
              
              break;
          }
      } 
      
    }
  
    
  
    


   
    



  let handleValue =()=>{
    props.addValue("c");
  }




  return (<div style={{ margin: "auto",marginTop:"2vh",width:"165vh",height:"10vh"}}>
    <form onSubmit={handleAddItem}>
    <div style={{display:'flex'}}>
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>ITEM NAME</h6>
  <input id="selValue" className='' type="text" value={props.create_shortname} list="programmingLanguages" placeholder="ENTER ITEM NAME" onChange={handlecreate_shortname} required/>
  <datalist id="programmingLanguages">
  {props.geItems.map(
          (geItem, index) =>
          <option id={geItem.item_id} value={`${geItem.item_name} ${geItem.item_company} ${geItem.item_modal}`}>{`${geItem.item_name} ${geItem.item_company} ${geItem.item_modal}`}</option>
        )}                
            </datalist>
  </div>
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>RATE</h6>
  <input className='' type="number" value={props.create_name} placeholder="ENTER RATE" onChange={handlecreate_name} required/>
  </div>
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>QUANTITY</h6>
  <input className='' type="number" value={props.enter_quantity} placeholder="ENTER QUANTITY" onChange={handlequantity} required/>
  </div>
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>AMOUNT</h6>
  <input className='' type="number" value={props.enter_amount} placeholder="ENTER AMOUNT" disabled={true}/>
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
         {props.geEstimationItems.map(
          (geEstimationItem, index) => <tr id={index} key={index}>
            
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
export default GeCheck;
