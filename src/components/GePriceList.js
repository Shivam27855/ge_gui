import '../App.css';
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

function GePriceList(props) {
  const baseURL = "http://localhost:5000";

  useEffect(() => {
    fetchGeItem();
    
  }, []);

  useEffect(() => {
    fetchUsingName();
  }, [props.currentItem_short]);

  useEffect(() => {
    props.setFilterGeItems([]);
    let newArray = [];
    if (props.currentItem_company.length == 0) {
      props.setFilterGeItems([]);
    }
    if (props.currentItem_company.length >= 1) {
      props.geItemsPriceList.filter(geItem => geItem.item_company.includes(props.currentItem_company) && geItem.item_shortname.includes(props.currentItem_short)).map(filteredItem => (
        newArray.push(filteredItem)
      ))
      props.setFilterGeItems(newArray)
    }
  }, [props.currentItem_company]);

  let fetchGeItem = () => {
    try {
      fetch(`${baseURL}/getGeItem`, {
        method: "get",
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.length != 0) {
            if (json.error == "No Item in Inventory") {
              //setEmptyToDoList(true);
            }
            else {
              props.setGeItemsPriceList(json);
              fetchUsingName();

            }
          }
        })
    } catch (err) {
      alert("Login Fail")
      console.log(err);
    }
  }

  let fetchUsingName=()=>{
    props.setFilterGeItems([]);
    let newArray = [];
    if (props.currentItem_short.length == 0) {
      props.setFilterGeItems([]);
    }
    else if (props.currentItem_short == '*') {
      props.setFilterGeItems(props.geItemsPriceList);
    }
    else if (props.currentItem_short.length >= 1) {
      props.geItemsPriceList.filter(geItem => geItem.item_shortname.includes(props.currentItem_short)).map(filteredItem => (
        newArray.push(filteredItem)
      ))
      props.setFilterGeItems(newArray)
    }
  }

  let handleItemChange = (e) => {
    props.setcurrentItem_short(e.target.value);
  }

  let handleItemCompanyChange = (e) => {
    props.setcurrentItem_company(e.target.value);
  }

  return (
    <div style={{ margin: "auto", marginTop: "2vh", width: "165vh", height: "10vh" }}>
      <div style={{ display: 'flex' }}>
        <div style={{ margin: "auto", marginTop: "1vh", width: "40vh", height: "10vh", border: "1px solid #000", borderRadius: "4px" }}>
          <h6>NAME SEARCH</h6><input className='' type="text" value={props.currentItem_short} placeholder="ENTER ITEM" onChange={handleItemChange} />
        </div>
        <div style={{ margin: "auto", marginTop: "1vh", width: "40vh", height: "10vh", border: "1px solid #000", borderRadius: "4px" }}>
          <h6>COMPANY SEARCH</h6><input className='' type="text" value={props.currentItem_company} placeholder="ENTER COMPANY" onChange={handleItemCompanyChange} />
        </div>
        <div style={{ margin: "auto", marginTop: "1vh", width: "40vh", height: "10vh", border: "1px solid #000", borderRadius: "4px" }}>
          <h6>MODAL SEARCH</h6><input className='' type="text" value={props.currentItem_company} placeholder="ENTER MODAL" onChange={handleItemCompanyChange} />
        </div>
      </div>
      <div style={{ height: "65vh", overflow: "auto", marginTop: "1vh" }}>
        <Table striped bordered hover style={{ height: "80vh" }}>
          <thead style={{ position: "sticky", top: "0px", backgroundColor: "lightyellow" }}>
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
          </thead>
          <tbody>
            {props.geFilterItems.map(
              (geFilterItem, index) => <tr id={geFilterItem.item_id} key={geFilterItem.item_id}>
                <td>{geFilterItem.item_name}</td>
                <td>{geFilterItem.item_company}</td>
                <td>{geFilterItem.item_modal}</td>
                <td>{geFilterItem.item_subcategory}</td>
                <td>{geFilterItem.item_warranty}</td>
                <td>{geFilterItem.item_cp}</td>
                <td>{geFilterItem.item_sp}</td>
                <td>{geFilterItem.item_description}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>);
}
export default GePriceList;
