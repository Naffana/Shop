import { createSlice } from "@reduxjs/toolkit";

import { IProductState } from "../../../Types/Prod";
import { createUser, getProducts, loginUser } from "../Action/Action";
import { IUserState, IAuthState, IUser } from "../../../Types/User";
import { defaultValues } from "../../../Utils/Constants";

const initialStateProduct: IProductState = {
  items: [],
  loading: false,
  error: null,
};

const initialStateUsers: IUserState = {
  User: defaultValues,
  cart: [],
  // Like:[],
  error: null,
};

const initialStateAuth: IAuthState = {
  user: JSON.parse(localStorage.getItem("currentUser") || "null"),
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialStateProduct,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(getProducts.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.loading = false;
    });
  },
});

const userSlice = createSlice({
  name: "users",
  initialState: initialStateUsers,
  reducers: {
    addItemToCart: (_, { payload }) => {
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );
      let newCart = Array.isArray(currentUser.cart)
        ? [...currentUser.cart]
        : [];
      const found = newCart.find(({ id }) => id === payload.id);
      if (found) {
        newCart = newCart.map((item) => {
          if (item.id === payload.id) {
            const newQuantity = payload.quantity
              ? payload.quantity
              : item.quantity + 1;
            const newSumma = newQuantity * payload.price;
            return { ...item, quantity: newQuantity, summa: newSumma };
          }

          return item;
        });
      } else {
        const quantity = 1;
        const summa = quantity * payload.price;
        const image = payload.image;
        const title = payload.title;
        const id = payload.id;
        const price = payload.price;
        newCart.push({ id, title, image, quantity, summa, price });
      }
      currentUser.cart = newCart;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    },
  },
  extraReducers: (builder) => {
    //@ts-ignore
    builder.addCase(
        createUser.fulfilled,
        (state, { payload }: { payload: IUser }) => {
          if (state.User) {
            state.User = payload;
          }
          state.error = null;
        }
      )
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.User = payload;
      });
  },
});

const updateUserInLocalStorage = (updatedUser: {
  login: { email: string; userName: string };
}) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const updatedUsers = users.map(
    (user: { login: { userName: string; email: string } }) => {
      if (
        user.login.userName.toLowerCase() ===
          updatedUser.login.userName.toLowerCase() ||
        user.login.email === updatedUser.login.email
      ) {
        return updatedUser;
      }
      return user;
    }
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {
    logout: (state) => {
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );
      updateUserInLocalStorage(currentUser);
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isAuthenticated");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state) => {
        state.user = JSON.parse(localStorage.getItem("currentUser")!);
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export const { addItemToCart } = userSlice.actions;
export const ReducerAuth = authSlice.reducer;
export const ReducerUsers = userSlice.reducer;
export const ReducerProduct = productsSlice.reducer;
