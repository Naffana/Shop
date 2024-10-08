import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Sign.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/Store';
import { createUser }  from '../../Store/Action/Action';
import {IUser } from '../../../Types/User';
import { defaultValues } from '../../../Utils/Constants';


const SignUp:React.FC = () => {
  const navigate = useNavigate();
  const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  const dispatch = useAppDispatch();
  const [values, setValue] = useState<IUser>(defaultValues);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setValue((values) => ({
      ...values,
      login: {
        ...values.login,
        [name]: value,  
      },
    }));
  };

  

  const handleSubmit=async (e: { preventDefault: () => void; })=>{
    e.preventDefault();
  
      await dispatch(createUser({ payload: values, navigate }));
   
  }

  const { error} = useSelector((state: RootState) => state.users);

  return (
    <div className="LoginPage">
      <h1>SignUp</h1>
    <div className="form">
    <form className="register-form" onSubmit={handleSubmit}>
      <input
       type="name"
       placeholder="user name"
       name="userName"
       value={values.login?.userName||""}
       onChange={handleChange}
       autoComplete='off'
       required
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        value={values.login?.password||""}
        onChange={handleChange}
        autoComplete='off'
        required
      />
      <input
       type="email"
       placeholder="email address"
       name="email"
       value={values.login?.email||""}
       onChange={handleChange}
       autoComplete='off'
       required
       />
      {error && <div className='error'>{error}</div>}
      <button  type='submit'>create</button>
      <p className="message">Already registered?
      <Link to="/SignIn"> Sign In</Link></p>
    </form>
    </div>
    </div>
   
  )
}

export default SignUp
