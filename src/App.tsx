import React  from 'react';
import { Route, Routes } from 'react-router-dom';
// import { useDispatch} from 'react-redux';

// import { AppDispatch} from './Components/Store/Store';
// import { getProducts} from './Components/Store/Action/Action';

import {Header} from './Components/header/Header';
import Main from './Components/Main/Main';
import SignIn from './Components/Main/Sign In(Up)/SignIn';
import Like from './Components/Main/Like/Like';
import Card from './Components/Main/Cart/Cart';
import SignUp from './Components/Main/Sign In(Up)/SignUp';
import Categories from './Components/Categories/Categories';
import SingleProduct from './Components/Product/SingleProduct';
import ProtectedRoute from './Components/Main/Sign In(Up)/ProtectedRoute';
import User from './Components/User/User';
import EditUser from './Components/User/EditUser';
import Footer from './Components/footer/Footer';

// import Products from './Components/Store/Product/Products';
// import store from './Components/Store/Store';
// import User from './Components/Store/User/User';



function App() {

  // const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  // const dispatch = useAppDispatch();

  // useEffect(()=>{
  //  dispatch(getProducts());
  //  dispatch(getUsers());
  // },[dispatch]);


  return(
    
<>
    <Header/>
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path="/categories/:data"  element = {<Categories/>} />
      <Route path='/Card' element={<Card/>}/>
      <Route path='/Like' element={<Like/>}/>
      <Route path='/SignIn' element={
        <ProtectedRoute>
          <SignIn/>
        </ProtectedRoute>
        }/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/User' element={<User/>}/>
      <Route path='/EditUser' element={<EditUser/>}/>
      <Route path='/products/:id' element={<SingleProduct/>}/>
    </Routes>
    {/* <Footer/> */}
</>
  
  );
}

export default App;


