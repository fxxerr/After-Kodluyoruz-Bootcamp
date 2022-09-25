import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase_config";
import { v4 as uuidv4 } from "uuid";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      async queryFn() {
        try {
          const productRef = collection(db, "products");
          const querySnapshot = await getDocs(productRef);
          let products = [];
          querySnapshot?.forEach((doc) => {
            products.push({
              id: doc.id,
              ...doc.data(),
            });
            console.log("çalıştı");
          });
          return { data: products };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["Product"],
    }),
    fetchProduct: builder.query({
      async queryFn(id) {
        try {
          const docRef = doc(db, "products", id);
          const snapshot = await getDoc(docRef);
          return { data: snapshot.data() };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      async queryFn(data) {
        try {
          await addDoc(collection(db, "products"), {
            ...data,
            timestamp: serverTimestamp(),
          });
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "products", id));
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      async queryFn({ id, data }) {
        try {
          console.log(id, data);
          await updateDoc(doc(db, "products", id), {
            ...data,
            timestamp: serverTimestamp(),
          });
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Product"],
    }),
    basketProduct: builder.mutation({
      async queryFn({ total, items }) {
        try {
          console.log("sipariş", total, items);
          await addDoc(collection(db, "orders"), {
            items,
            total,
            timestamp: Date.now(),
          });
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Orders"],
    }),
    fetchOrders: builder.query({
      async queryFn() {
        try {
          const orderRef = collection(db, "orders");
          const querySnapshot = await getDocs(orderRef);
          let orders = [];
          querySnapshot?.forEach((doc) => {
            orders.push({
              id: doc.id,
              ...doc.data(),
            });
            console.log("çalıştı");
          });
          return { data: orders };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useBasketProductMutation,
  useFetchProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useFetchProductQuery,
  useUpdateProductMutation,
  useFetchOrdersQuery,
} = productsApi;
