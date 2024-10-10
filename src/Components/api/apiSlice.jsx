import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../../Utils/Constants"


export const apiSlice = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
   tagTypes: ['Product'],
   endpoints: (builder) => ({
      getProduct: builder.query({
         query: ({ id }) => `/products/${id}`,
         providesTags: ["Product"],
      })
   })
})

export const { useGetProductQuery } = apiSlice;  
