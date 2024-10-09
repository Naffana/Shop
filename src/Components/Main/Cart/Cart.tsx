import React, { useEffect, useState } from 'react'
import { IUserState } from '../../../Types/User';
import { defaultValues } from '../../../Utils/Constants';
import '../Cart/Cart.css'
import { Link } from 'react-router-dom';

function Cart() {
  const [user, setUser] = useState<IUserState>({
    error:"",
    User: defaultValues,
    cart:[],
  }
  );

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  if (!user || !user.cart || user.cart === null) {
    return <div>Your cart is empty.</div>;
  }

 const totalSum = ()=>{
  let total = 0;
   user.cart.map((item)=>{
   total = total+item.summa
   return total;
  })
  return total.toFixed(2);
 }


 const clearCart = (id:number) => {
  if (user) {
    const updatedCart = user.cart?.filter((item) => item.id !== id) || [];
    const updatedUser = { ...user, cart: updatedCart };  
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser)); 
  }
};
const quantity = (id: number, newQuantity: number) => {

  const updatedCart = user?.cart?.map((item) =>{
    if(item.id === id){
        return{...item,quantity: newQuantity, summa: newQuantity*item.price}}
      else return item;
    }
  );
  if (updatedCart && user) {
    const updatedUser = { ...user, cart: updatedCart };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  }
};

  return (
    <div className='cartPage'>
      <h1>Your Cart</h1>
      <div className='cartForm'>
        {user.cart.map((item) => (
          <div className='item' key={item.id}>
            <Link className='infoProd' to={`/products/${item.id}`}>
            {/* <div className='infoProd'> */}
             <img className='infoImg' src={item.image} alt="" />
              <h1> {item.title.slice(0,36)}...</h1>
            {/* </div> */}
                </Link>
            <div className='infoPrice'>
              <h2>Price: {item.price}$</h2>
              <p>Summa: {item.summa}$</p>
            </div>
            <div className='input'>
              <div className="input-number">
               <div  className="input-number__minus" onClick={()=>
                  { if(item.quantity>=2){
                    quantity(item.id, item.quantity-1);
                  }}}>-</div>
                <input className="input-number__input" 
                     type="number"
                     disabled
                     pattern="^[0-9]+$"
                     name = "quantity"
                     value={item.quantity}
                     onChange={(e) => {
                      quantity(item.id, Number(e.target.value));
                    }}
                />
              <div className="input-number__plus" onClick={() => {
                      if(item.quantity<=98){
                        quantity(item.id, item.quantity+1);
                      }
                    }}>+</div>
              </div>
            <div className='delete' onClick={()=>{clearCart(item.id)}}/>
            </div>
          </div>
        ))}
      <h3>Total Sum: {totalSum()}$</h3>
      </div>
      </div>
  );
};
export default Cart