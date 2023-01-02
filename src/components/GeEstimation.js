import '../App.css';
import { useState, useEffect } from "react";
import ToDoItem from './TodoItem';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiEdit } from 'react-icons/fi';
import { RiSave2Fill } from 'react-icons/ri'
import { GiCancel } from 'react-icons/gi'
import { AiFillDelete } from 'react-icons/ai'
import Table from 'react-bootstrap/Table';
import Popup from './Popup';
import $ from "jquery";
function GeEstimation(props) {
    const baseURL = "http://localhost:5000";

    //add section
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

/*****************************************************************************************
 * ***************************************************************************************
 * Edit Section
 * ***************************************************************************************
 */
    
 //Edit functions
 useEffect(()=>{props.setedit_amount(props.edit_quantity*props.edit_rate)},[props.edit_quantity])

 useEffect(() => {
    props.setedit_amount(props.edit_quantity*props.edit_rate)
 }, [props.edit_rate]);

 useEffect(() => {
    props.setedit_amount(props.edit_quantity*props.edit_rate)
 }, [props.edit_quantity]);

 useEffect(() => {
   const close = (e) => {
     if(e.keyCode === 27){
        props.setIsOpen(false);
     }
   }
   window.addEventListener('keydown', close)
 return () => window.removeEventListener('keydown', close)
},[])

 let handleeditamount=(e)=>{
    props.setedit_amount(e.target.value);
 }

 let handleeditquantity=(e)=>{
    props.setedit_quantity(e.target.value);
   //setedit_amount(edit_quantity*edit_rate);
 }

 let handleeditrate=(e)=>{
    props.setedit_rate(e.target.value);
 }

 let handleeditItem=(e)=>{
    props.setedit_name(e.target.value);

   let x1 = document.getElementById("programmingLanguages").options;
for (var i=0;i<x1.length;i++) {
       if (x1[i].value == e.target.value) {
           console.log(x1[i].id);
           // alert('The index of SellectedIndex is : ' + i + ' and the value is : '  +x[i].value);
           for(let j=0;j<props.geItems.length;j++)
           {
             if(props.geItems[j].item_id==x1[i].id)
             {
                props.setedit_rate(props.geItems[j].item_sp);
               break;
             }
           }
           
           break;
       }
   } 
   
 }

 let handleDelete=(index)=>{
   const arr = [];
   let getAmount = props.geEstimationItems[index].item_amount;
   for (var i=0;i<props.geEstimationItems.length;i++) {
     if (i != index) {
       arr.push(props.geEstimationItems[i]);
     }
 } 
 props.setgeEstimationItems(arr);
 props.setgrandTotal(props.grandTotal-getAmount);
 }

 const togglePopup = (index) => {
   console.log(index);
   props.setSelectedIndex(index);
   props.setIsOpen(!props.isOpen);

   for (var i=0;i<props.geEstimationItems.length;i++) {
     if (i == index) {
        props.setedit_name(props.geEstimationItems[i].item_name)
        props.setedit_rate(props.geEstimationItems[i].item_rate)
        props.setedit_quantity(props.geEstimationItems[i].item_quantity)
        props.setedit_amount(props.geEstimationItems[i].item_amount)
        props.setprevAmount(props.geEstimationItems[i].item_amount)
         break;
     }
 } 
 }

 
 let handleEditItem=()=>{
   console.log(props.selectedIndex);

   //const va = {item_name:create_shortname,item_rate:create_name,item_quantity:enter_quantity,item_amount:enter_amount}

   
   const arr = [...props.geEstimationItems];
   console.log(arr[props.selectedIndex]);
   arr[props.selectedIndex].item_name=props.edit_name;
   arr[props.selectedIndex].item_rate=props.edit_rate;
   arr[props.selectedIndex].item_quantity=props.edit_quantity;
   arr[props.selectedIndex].item_amount=props.edit_rate*props.edit_quantity;
   props.setgeEstimationItems(arr);
   props.setIsOpen(!props.isOpen);
   
   //setFilterGeItems(arr);

   
   props.setgrandTotal(props.grandTotal-props.prevAmount+(props.edit_rate*props.edit_quantity));

 }

 let handleClearEstimationItem=()=>{
  props.setgeEstimationItems([]);
  props.setgrandTotal(0);
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
             <td><button className='editButton' style={{ visibility: "visible" }} onClick={()=>togglePopup(index)}><FiEdit /></button>
              <button className='saveButton' style={{ visibility: "hidden" }}><RiSave2Fill /></button>
              <button className='cancelButton' style={{ visibility: "hidden" }}><GiCancel /></button>
              <button className='deleteButton' style={{ visibility: "visible" }} onClick={()=>handleDelete(index)}><AiFillDelete /></button></td>
            <td>{geEstimationItem.item_name}</td>
            <td>{geEstimationItem.item_rate}</td>
            <td>{geEstimationItem.item_quantity}</td>
            <td>{geEstimationItem.item_amount}</td>
          </tr>
        )} 
      </tbody>
    </Table>
    </div>
    {props.isOpen && <Popup
      content={<>
    <div style={{display:'flex'}}>
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>ITEM NAME</h6>
  <input id="" className='' type="text" value={props.edit_name} list="programmingLanguages" placeholder="ENTER ITEM NAME" onChange={handleeditItem} required/>
  <datalist id="programmingLanguages">
  {props.geItems.map(
          (geItem, index) =>
          <option id={geItem.item_id} value={`${geItem.item_name} ${geItem.item_company} ${geItem.item_modal}`}>{`${geItem.item_name} ${geItem.item_company} ${geItem.item_modal}`}</option>
        )}                
            </datalist>
  </div>
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>RATE</h6>
  <input className='' type="number" value={props.edit_rate} placeholder="ENTER RATE" onChange={handleeditrate} required/>
  </div>
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>QUANTITY</h6>
  <input className='' type="number" value={props.edit_quantity} placeholder="ENTER QUANTITY" onChange={handleeditquantity} required/>
  </div>  
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"10vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>AMOUNT</h6>
  <input className='' type="number" value={props.edit_amount} placeholder="ENTER AMOUNT" onChange={handleeditamount} disabled={true}/>
  </div>
  <button className='' type="submit" onClick={handleEditItem}>SAVE CHANGES</button>
        </div>
      </>}
      handleClose={togglePopup}
    />}
    <div style={{display:'flex'}}>
    
    <button className='' type="submit" onClick={handleClearEstimationItem}>CLEAR</button>
 
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"5vh",border:"1px solid #000",borderRadius: "4px"}}>
  <h6>GRAND TOTAL</h6>
    </div>
  <div style={{margin: "auto",marginTop:"1vh",width:"32vh",height:"5vh",border:"1px solid #000",borderRadius: "4px"}}>
  <input className='' type="number" value={props.grandTotal} disabled={true}/>
  </div>
        </div>
  </div>);
}
export default GeEstimation;
