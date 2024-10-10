import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "../../../Utils/Constants";
import { IUser } from "../../../Types/User";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${API_URL}/products`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createUser = createAsyncThunk<
  void,
  { payload: IUser; navigate: Function }
>("users/createUsers", async ({ payload, navigate }, thunkAPI) => {
  try {
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.some(
      (user: IUser) =>
        user.login.email === payload.login.email ||
        user.login.userName === payload.login.userName
    );
    if (userExists) {
      return thunkAPI.rejectWithValue("user exists!");
    }
    existingUsers.push(payload);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    navigate("/SignIn");
    return;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const loginUser = createAsyncThunk<
  void,
  { payload: IUser; navigate: Function }
>("auth/loginUser", async ({ payload, navigate }, thunkAPI) => {
  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: IUser) =>
        (u.login.userName.toLowerCase() ===
          payload.login.userName.toLowerCase() ||
          u.login.email === payload.login.userName) &&
        u.login.password === payload.login.password
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
      window.location.reload();
    } else {
      return thunkAPI.rejectWithValue("Invalid username or password");
    }
  } catch (error) {
    return thunkAPI.rejectWithValue("Authorization error");
  }
});
