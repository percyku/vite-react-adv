import { createContext } from "react";

export const CartContext = createContext({});

export const cartInit={
    cartList:[],
  }

export const cartReducer = (state,action)=>{
    // console.log(action);
    // console.log(state);
    const cartList = [...state.cartList];

    const index = cartList.findIndex((item)=> item.id === action.payload.id);
    console.log(index);
    switch(action.type){
       case "ADD_TO_CART":
          if(index ===-1){
            cartList.push(action.payload);
          }else{
            cartList[index].quantity += action.payload.quantity;
          }
          return {
            ...state,
            cartList,
            total: calculateTotal(cartList),
          }
       case "CHANGE_CART_QUANTITY":
          cartList[index].quantity = action.payload.quantity;
          return {
            ...state,
            cartList,
            total: calculateTotal(cartList),
          }    
       case "REMOVE_CART_TIEM":
          cartList.splice(index,1);
          return {
            ...state,
            cartList,
            total: calculateTotal(cartList),
          }              
      default:
        return state;
    }
  }

function calculateTotal(cartList) {

    // const arr = cartList.map((item)=>item.price * item.quantity)
    // const total = arr.reduce((pre,cur)=>pre+cur,0);
    //return total;
    return cartList.map((item) => item.price * item.quantity).reduce((pre, cur) => pre + cur, 0)
}