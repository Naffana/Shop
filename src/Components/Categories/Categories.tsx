import React from 'react';
// import { useParams } from 'react-router-dom';
import Products from '../Product/Products';
import FormCategories from './FormCategories';

function Categories() {
// const { data } = useParams();

   return (
      <>
      <FormCategories/>
      <div className='BodyProd'>
      <Products/> 
     </div>
      </>
   );
}

export default Categories;