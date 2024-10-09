import React from 'react'
import rate from '../../Source/rate.png';
import './Product.css'
import { IProd} from '../../Types/Prod';
import { addItemToCart } from '../Store/Reducer/Reducers';
import { AppDispatch, RootState } from '../Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function ProductCart({id, image, title, price, rating, description, category}:IProd) {
  const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { items} = useSelector( (state:RootState)  => state.products);
  const navigate = useNavigate();
  const addToCart = (id: number)=>{
    if (id) {
      dispatch(addItemToCart(items[id]));
    }
  }

  return (
    <>
  
  <div className='product_card'>
    <h1>Product card</h1>
    <div className='card'>
    <div className="Product_Name">
      <h1>{title.slice(0,36)}</h1>
  </div>
  <div className='Product_img'>
      <img src={image} alt="" />
  </div>
  
  <div className='Product_info'>
      <div className='Product_category'><h2>Category: {category}</h2></div>
      <div className='rateCount'>
      <div className='price'>
      <p>Price: {price}$</p>
      </div>
      <div className='product_rate'><img src= {rate} alt="" /><p>{rating.rate}</p></div>
      <p>Count sold: {rating.count}</p>
      </div>
  </div>
      <div className='description'><p>{description}</p></div>
  <div className='product_button'>
  <button className='btn sep cart' onClick={ ()=>{
        if (!isAuthenticated) {
        navigate('/SignUp');
        }else addToCart(id-1)
        }}><h1>To cart</h1></button>
</div>
</div>
</div>
  </>
  )
    
}

export default ProductCart

