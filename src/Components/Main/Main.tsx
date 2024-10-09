import './Main.css'

import React from 'react'

import {Products} from '../Product/Products'
import FormCategories from '../Categories/FormCategories'

function Main() {
  return (
   <>
      <FormCategories/>
      {/* <div className='BodyProd'> */}
      <Products/> 
      {/* </div> */}
   </>

   
   
  )
}

export default Main