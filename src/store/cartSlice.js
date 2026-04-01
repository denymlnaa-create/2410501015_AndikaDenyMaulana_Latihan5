// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    // Tambah item ke cart (jika sudah ada, tambah quantity)
    addItem: (state, action) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },

    // Hapus item dari cart
    removeItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        state.total -= item.price * item.quantity;
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },

    // Tambah quantity
    incrementQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.total += item.price;
      }
    },

    // Kurangi quantity (hapus jika qty = 1)
    decrementQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        state.total -= item.price;
        if (item.quantity === 1) {
          state.items = state.items.filter(i => i.id !== action.payload);
        } else {
          item.quantity -= 1;
        }
      }
    },

    // Kosongkan cart
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, incrementQty, decrementQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
