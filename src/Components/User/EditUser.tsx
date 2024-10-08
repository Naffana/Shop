import React, { useEffect, useState } from 'react'
import { IUser } from '../../Types/User';
import { defaultValues } from '../../Utils/Constants';
import { useNavigate } from 'react-router-dom';

function EditUser() {

   const [user, setUser] = useState<IUser>(defaultValues);
    const navigate = useNavigate();
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser)); 
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
   const [field, subField] = name.split('.');
   console.log(name,value);
   
    if (subField) {
      setUser((prevUser) => ({
        ...prevUser,
        [field]: {
          ...prevUser[field as keyof IUser], 
          [subField]: value
        }
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Profile updated successfully!');
    navigate('/User');
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
   <div className="EditPage" style={{padding: '100px'}}>
    <div className="form">
    <form className="Edit-form"
     onSubmit={handleSubmit}
     >
      <div className="RegisterInfo">
         <p>Register info (required):</p>
         <input
         type="text"
         placeholder="User name"
         name="login.userName"
         value={user.login.userName}
         onChange={handleChange}
         autoComplete='off'
         required
         />
         <input
         type="password"
         placeholder="Password"
         name="login.password"
          value={user.login.password}
          onChange={handleChange}
         autoComplete='off'
         required
         />
          <input
         type="text"
         placeholder="Email"
         name="login.email"
          value={user.login.email}
          onChange={handleChange}
         autoComplete='off'
         required
         />
      </div>
      <div className='name'>
         <p>Name:</p>
         <input
         type="text"
         placeholder="First name"
         name="name.firstName"
          value={user.name?.firstName||''}
          onChange={handleChange}
         autoComplete='off'
         />
         <input
         type="text"
         placeholder="Last name"
         name="name.lastName"
          value={user.name?.lastName||''}
          onChange={handleChange}
         autoComplete='off'
         />
      </div>
      <div className='address'>
         <p>Address:</p>
         <input
         type="text"
         placeholder="City"
         name="address.city"
           value={user.address?.city||''}
           onChange={handleChange}
         autoComplete='off'
         />
         <input
         type="text"
         placeholder="Street"
         name="address.street"
          value={user.address?.street||''}
          onChange={handleChange}
         autoComplete='off'
         />
         <input
         type="text"
         placeholder="Home"
         name="address.home"
          value={user.address?.home||''}
          onChange={handleChange}
         autoComplete='off'
         />
         <input
         type="text"
         placeholder="Zipcode"
         name="address.zipcode"
          value={user.address?.zipcode||''}
          onChange={handleChange}
         autoComplete='off'
         />
      </div>
      <div className='number'>
         <p>Number</p>
         <input
         type="text"
         placeholder="Country code"
         name="number.countryСode"
          value={user.number?.countryСode||''}
          onChange={handleChange}
         autoComplete='off'
         />
         <input
         type="number"
         placeholder="Number"
         name="number.number"
          value={user.number?.number||''}
          onChange={handleChange}
         autoComplete='off'
         />
      </div>
      <button  type='submit'>Edit</button>
      </form>
      </div>
      </div>
  )
}

export default EditUser