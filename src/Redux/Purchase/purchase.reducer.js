import {
    LOADING_PURCHASE,
    SUCCESS_PURCHASE,
    ERROR_PURCHASE,
    GET_PURCHASE,
    UPDATE_PURCHASE,
    DELETE_PURCHASE,
    INDUVIDUAL_PURCHASE
  } from "./purchase.types";
  
  const initialState = {
    loading: false,
    error: false,
    purchaseData: [],
    getPurchaseData:[],
  }
  export const purchaseReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case LOADING_PURCHASE: {
        return { ...state, loading: true, error: false };
      }
      case INDUVIDUAL_PURCHASE: {
        return { ...state, loading: false, error: false, induvidualParty: payload };
      }
      case SUCCESS_PURCHASE: {
        console.log(payload);
        return { ...state, loading: false, error: false, purchaseData: payload };
      }
      case ERROR_PURCHASE: {
        return { ...state, loading: false, error: false, purchaseData: payload };
      }
      case UPDATE_PURCHASE: {
        return { ...state, loading: false, error: false, purchaseData: payload };
      }
      case DELETE_PURCHASE: {
        return { ...state, loading: false, error: false , purchaseData: payload };
      }
      default: {
        return state;
      }
    }
  };
  