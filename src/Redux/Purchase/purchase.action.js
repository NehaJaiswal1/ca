import axios from "axios";
import {
    LOADING_PURCHASE,
    SUCCESS_PURCHASE,
    ERROR_PURCHASE,
    GET_PURCHASE,
    INDUVIDUAL_PURCHASE,
    UPDATE_PURCHASE,
    DELETE_PURCHASE
} from "./purchase.types";
import { LIVE_URL2 } from "../config/Commen";
import { toast } from "react-toastify";

export const getPurchaseAction = (token) => (dispatch) => {
    console.log("hi")
    const headers = {
        token: `${token}`,
    };
    dispatch({ type: LOADING_PURCHASE });
    try {
        // const url = `${LIVE_URL2}/purchase/${firmId}/purchase`;
        const url = `${LIVE_URL2}/addPurchase/purchase`;
        axios.get(url, { headers }).then((res) => {
            console.log("🚀 ~ file: purchase.action.js:19 ~ axios.get ~ res:", res)
            dispatch({ type: SUCCESS_PURCHASE, payload: res.data });
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_PURCHASE, payload: error });
    }
};

export const getInduvidualPurchaseAction = (token, id) => (dispatch) => {
    const headers = {
      token: `${token}`,
    };
    dispatch({ type:LOADING_PURCHASE  });
    try {
    const url = `${LIVE_URL2}/addPurchase/purchase/${id}`;
      axios.get(url, { headers }).then((res) => {
        dispatch({ type: INDUVIDUAL_PURCHASE, payload: res.data.party });
        console.log("abcd", res.data);
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR_PURCHASE, payload: error });
    }
  };

  export const postPurchaseAction = (creds, token, firmId) => (dispatch) => {
    const headers = {
        token: `${token}`,
    };
    dispatch({ type: LOADING_PURCHASE });
    try {
        // const url = `${LIVE_URL2}/purchase/insertpurchase/${firmId}`;
        const url = `${LIVE_URL2}/addPurchase/purchase`;
        axios.post(url, creds, { headers }).then((res) => {
            dispatch({ type: SUCCESS_PURCHASE, payload: res.data });
            console.log(res);
            if (res.status === 200 || 201) {
                toast.success("Purchase Success");
                dispatch(getPurchaseAction(token, firmId));
            }
        });
    } catch (error) {
        console.log(error);
        if(error?.response?.data?.message){
            toast.error(error?.response?.data?.message)
        }else{
            toast.error(error?.message)
        }
        dispatch({ type: ERROR_PURCHASE, payload: error });
    }
};

export const updatePurchaseAction = (creds, token , firmId , id) => (dispatch) => {
    const headers = {
        token: `${token}`,
    };
    dispatch({ type: LOADING_PURCHASE });
    try {
        const url = `${LIVE_URL2}/purchase/updatepurchase/${firmId}/${id}`;
        axios.patch(url, creds, { headers }).then((res) => {
            dispatch({ type: UPDATE_PURCHASE, payload: res.data });
            console.log(res);
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_PURCHASE,id, firmId,payload: error });
    }
};

export const deletePurchaseAction = (token, id, firmId) => (dispatch) => {
    const headers = {
        "token": `${token}`
    }
    dispatch({ type: LOADING_PURCHASE });
    try {
        const url = `${LIVE_URL2}/purchase/deletepurchase/${firmId}/${id}`
        axios.delete(url, { headers }).then((res) => {
            dispatch({ type: DELETE_PURCHASE, payload: res.data.party });
            console.log("deLETE",res.data.party)

            dispatch(getPurchaseAction(token, firmId,id));
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_PURCHASE, payload: error });
    }
};



