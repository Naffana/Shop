import React, { useEffect, useState } from "react";
import { IUser } from "../../Types/User";
import { defaultValues } from "../../Utils/Constants";
import { useNavigate } from "react-router-dom";
import "../User/StyleUser.css";
import del from "../../Source/delete.png";

function EditUser() {
  const [user, setUser] = useState<IUser>(defaultValues);
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [field, subField] = name.split(".");
    console.log(name, value);

    if (subField) {
      setUser((prevUser) => ({
        ...prevUser,
        [field]: {
          ...prevUser[field as keyof IUser],
          [subField]: value,
        },
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Profile updated successfully!");
    navigate("/User");
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const deleteAccount = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (isConfirmed) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "null"
      );

      if (currentUser) {
        const updatedUsers = users.filter(
          (user: { login: { email: string; userName: string } }) =>
            user.login.email !== currentUser.login.email &&
            user.login.userName !== currentUser.login.userName
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isAuthenticated");
        navigate("/");
        window.location.reload();
      }
    }
  };
  return (
    <div className="EditPage">
      <form className="Edit-form" onSubmit={handleSubmit}>
        <div className="formEdit">
          <div className="UserInfo">
            <h1>Register info (required):</h1>
            <h2>UserName</h2>
            <input
              type="text"
              placeholder="User name"
              name="login.userName"
              value={user.login.userName}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <h2>Password</h2>
            <input
              type="password"
              placeholder="Password"
              name="login.password"
              value={user.login.password}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <h2>Email</h2>
            <input
              type="text"
              placeholder="Email"
              name="login.email"
              value={user.login.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="name">
            <h1>Name:</h1>
            <h2>First name</h2>
            <input
              type="text"
              placeholder="First name"
              name="name.firstName"
              value={user.name?.firstName || ""}
              onChange={handleChange}
              autoComplete="off"
            />
            <h2>Last name</h2>
            <input
              type="text"
              placeholder="Last name"
              name="name.lastName"
              value={user.name?.lastName || ""}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="address">
            <h1>Address:</h1>
            <h2>City</h2>
            <input
              type="text"
              placeholder="City"
              name="address.city"
              value={user.address?.city || ""}
              onChange={handleChange}
              autoComplete="off"
            />
            <h2>Street</h2>
            <input
              type="text"
              placeholder="Street"
              name="address.street"
              value={user.address?.street || ""}
              onChange={handleChange}
              autoComplete="off"
            />
            <h2>Home</h2>
            <input
              type="text"
              placeholder="Home"
              name="address.home"
              value={user.address?.home || ""}
              onChange={handleChange}
              autoComplete="off"
            />
            <h2>ZipCode</h2>
            <input
              type="text"
              placeholder="Zipcode"
              name="address.zipcode"
              value={user.address?.zipcode || ""}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="number">
            <h1>Number</h1>
            <h2>Country code</h2>
            <input
              type="text"
              placeholder="Country code"
              name="number.countryСode"
              value={user.number?.countryСode || ""}
              onChange={handleChange}
              autoComplete="off"
            />
            <h2>Number</h2>
            <input
              type="number"
              placeholder="Number"
              name="number.number"
              value={user.number?.number || ""}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="FormButton">
          <button className="edit" type="submit">
            Edit
          </button>
          <button type="button" className="del" onClick={deleteAccount}>
            <img src={del} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
