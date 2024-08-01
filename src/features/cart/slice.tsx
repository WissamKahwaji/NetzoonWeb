import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../../apis/product/type";
import { RootState } from "../../app/store";
import { toast } from "react-toastify";

interface CartValue extends ProductModel {
  count: number;
}

export interface InitialState {
  cartValues: CartValue[];
  totalQuantity: number;
  totalWeight: number;
  orderTotal: number;
  deliveryFee: number;
}

const getPersistedCartValues = () => {
  try {
    const storedValues = localStorage.getItem("cartValues");
    return storedValues ? JSON.parse(storedValues) : [];
  } catch (error) {
    console.error("Error parsing cart values from local storage", error);
    return [];
  }
};

const getPersistedTotals = () => {
  try {
    const storedTotals = localStorage.getItem("cartTotals");
    return storedTotals
      ? JSON.parse(storedTotals)
      : { totalQuantity: 0, totalWeight: 0, orderTotal: 0, totalAmount: 0 };
  } catch (error) {
    console.error("Error parsing cart totals from local storage", error);
    return { totalQuantity: 0, totalWeight: 0, orderTotal: 0, totalAmount: 0 };
  }
};

const initialState: InitialState = {
  cartValues: getPersistedCartValues(),
  ...getPersistedTotals(),
};

const calculateTotals = (cartValues: CartValue[]) => {
  let totalQuantity = 0;
  let totalWeight = 0;
  let orderTotal = 0;

  cartValues.forEach(item => {
    totalQuantity += item.count;
    totalWeight += (item.weight ?? 0) * item.count;
    orderTotal += item.price * item.count;
  });

  return { totalQuantity, totalWeight, orderTotal };
};

const saveStateToLocalStorage = (state: InitialState) => {
  try {
    localStorage.setItem("cartValues", JSON.stringify(state.cartValues));
    const totals = {
      totalQuantity: state.totalQuantity,
      totalWeight: state.totalWeight,
      orderTotal: state.orderTotal,
      deliveryFee: state.deliveryFee,
    };
    localStorage.setItem("cartTotals", JSON.stringify(totals));
  } catch (error) {
    console.error("Error saving state to local storage", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartValue>) => {
      const existingItem = state.cartValues.find(
        item => item._id === action.payload._id
      );
      if (existingItem) {
        toast.error("Product already added to cart");
      } else if (action.payload.count > (action.payload.quantity ?? 0)) {
        toast.error("Exceed product limit");
      } else {
        state.cartValues.push(action.payload);
        toast.success("Product added to cart");
        const totals = calculateTotals(state.cartValues);
        state.totalQuantity = totals.totalQuantity;
        state.totalWeight = totals.totalWeight;
        state.orderTotal = totals.orderTotal;

        saveStateToLocalStorage(state);
      }
    },
    increaseCount: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartValues.find(
        item => item._id === action.payload
      );
      if (existingItem) {
        if (existingItem.count + 1 > (existingItem.quantity ?? 0)) {
          toast.error("Exceed product limit");
        } else {
          existingItem.count += 1;
          const totals = calculateTotals(state.cartValues);
          state.totalQuantity = totals.totalQuantity;
          state.totalWeight = totals.totalWeight;
          state.orderTotal = totals.orderTotal;

          saveStateToLocalStorage(state);
        }
      }
    },
    decreaseCount: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartValues.find(
        item => item._id === action.payload
      );
      if (existingItem && existingItem.count > 1) {
        existingItem.count -= 1;
        const totals = calculateTotals(state.cartValues);
        state.totalQuantity = totals.totalQuantity;
        state.totalWeight = totals.totalWeight;
        state.orderTotal = totals.orderTotal;

        saveStateToLocalStorage(state);
      }
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.cartValues = state.cartValues.filter(
        item => item._id !== action.payload
      );
      const totals = calculateTotals(state.cartValues);
      state.totalQuantity = totals.totalQuantity;
      state.totalWeight = totals.totalWeight;
      state.orderTotal = totals.orderTotal;

      saveStateToLocalStorage(state);
    },
    setDeliveyFee: (state, action: PayloadAction<number>) => {
      state.deliveryFee = action.payload;

      saveStateToLocalStorage(state);
    },
  },
});

export const selectCartValues = (state: RootState) =>
  state.cartReducer.cartValues;
export const selectTotalQuantity = (state: RootState) =>
  state.cartReducer.totalQuantity;
export const selectTotalWeight = (state: RootState) =>
  state.cartReducer.totalWeight;
export const selectOrderTotal = (state: RootState) =>
  state.cartReducer.orderTotal;
export const selectDeliveryFee = (state: RootState) =>
  state.cartReducer.deliveryFee;

export const {
  addToCart,
  increaseCount,
  decreaseCount,
  deleteFromCart,
  setDeliveyFee,
} = cartSlice.actions;
export default cartSlice.reducer;
