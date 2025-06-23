import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-api-tau.vercel.app/api/efood'
  }),
  endpoints: (builder) => ({
    getRestaurantes: builder.query<RestauranteApiProps[], void>({
      query: () => '/restaurantes'
    }),
    getRestauranteById: builder.query<RestauranteApiProps, string>({
      query: (id) => `/restaurantes/${id}`
    }),
    purchase: builder.mutation<any, OrderProps>({
      query: (body) => ({
        url: 'checkout',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetRestaurantesQuery,
  useGetRestauranteByIdQuery,
  usePurchaseMutation
} = api

export default api
