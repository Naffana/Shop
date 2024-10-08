import React, { useEffect, useState } from 'react'
import { logout } from '../Store/Reducer/Reducers'
import { useDispatch} from 'react-redux';
import { AppDispatch } from '../Store/Store';
import { Link, useNavigate } from 'react-router-dom';
import { IUser} from '../../Types/User';
import edit from '../../Source/edit.png'
import '../User/StyleUser.css'

function User() {

  const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

 
  const exit = ()=>{
  dispatch(logout());
  navigate('/');
  window.location.reload();
  }
  
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  return (
    <div className='InfoPage'>
      <h1>Informations</h1>
      {<div className='Info'>
       <div className='UserName'> <h1>User Name: </h1><h2>{user?.login.userName}</h2></div>
       <div className='NameInfo'><h1>Name:</h1><h2>{user?.name?.firstName}/{user?.name?.lastName}</h2></div> 
       <div className='address'><h1>Address: </h1> <h2>{user?.address?.city}/{user?.address?.street}/{user?.address?.home}/{user?.address?.zipcode}</h2></div> 
       <div className='number'> <h1>Number:</h1><h2>{user?.number?.countryСode}{user?.number?.number}</h2></div>
       <div className='Email'> <h1>Email:</h1><h2>{user?.login.email}</h2></div>
      </div>
      }

    <div className='btns'>
    <div className='Button'><Link to="/EditUser"> <img className='imgEdit' src={edit} alt="" /></Link></div> 
    <div className='exit' onClick={exit}/>
    </div>

    </div>
  )
}

export default User