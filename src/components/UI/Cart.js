import React from "react";
import { BiShoppingBag } from "react-icons/bi";

/**
 * @author
 * @function Cart
 **/

const Cart = (props) => {
  return (
    <div style={{ position: "relative", }}>
      <span
        style={{
          position: "absolute",
          background: "#ff527b",
          width: "15px",
          height: "15px",
          borderRadius: "50px",
          fontSize: "10px",
          textAlign: "center",
          alignSelf: "center",
          top: "-3px",
          right: "-7px",
        }}
      >
        {props.count}
      </span>
      <BiShoppingBag  style={{width:"30px",height:"30px",color:"#666666", marginLeft:"-20px", marginTop:"-7px"}}/>
      <p style={{fontSize:"10px", marginLeft:"-15px", marginTop:"2px", marginBottom:"-2px",color:"black"}}>Bag</p>
    </div>
  );
};

export default Cart;
