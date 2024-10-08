import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Sign.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/Store';
import { loginUser } from '../../Store/Action/Action';
import {IUser } from '../../../Types/User';
import { defaultValues } from '../../../Utils/Constants';


function SignIn() {
  // var { error} = useSelector((state: RootState) => state.users);
  const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IUser>(defaultValues);
  const error = useSelector((state: RootState) => state.auth.error);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ payload: formData, navigate }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData((formData) => ({
      ...formData,
      login: {
        ...formData.login,
        [name]: value,  
      },
    }))
  };

    return (
    <div className="LoginPage">
      <h1>SignIn</h1>
    <div className="form">
    <form className="login-form"  onSubmit={handleSubmit}>
    <input
           type="text"
           name="userName"
           placeholder="UserName or Email"
          value={formData.login?.userName ||''}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name='password'
          placeholder="Password"
          value={formData.login?.password||''}
          onChange={handleChange}
          required
        />
    {error && <div className='error'>{error}</div>}
    <button type="submit">login</button>
    <p className="message">Not registered?
    <Link to="/SignUp">Create an account</Link></p>
    </form>
    </div>
    </div>
  );
};

export default SignIn;