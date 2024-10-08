import React from 'react';
import Products from '../Product/Products';
import FormCategories from './FormCategories';

function Categories() {
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