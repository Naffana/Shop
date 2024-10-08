import React from 'react'
import { Link } from 'react-router-dom'
import '../Main/Main.css'
function FormCategories() {
  return (
   <form className='FormCategory' action="">
   <div className="category">
     <Link id="electronic" title="electronic"  to={`/categories/${"electronics"}`}/>
     <Link id="mans"  title="mans" to={`/categories/${"men's clothing"}`}/>
     <Link id="womans" title="womans" to={`/categories/${"women's clothing"}`}/>
     <Link id="jewelry" title="jewelry" to={`/categories/${"jewelery"}`}/>
   </div>
</form>
  )
}

export default FormCategories