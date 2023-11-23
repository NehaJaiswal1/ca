import axios from "axios";
import {
    DELETE_SALE_INVOICE,
    ERROR_SALE_INVOICE,
    GET_SALE_INVOICE,
    LOADING_SALE_INVOICE,
    SUCCESS_SALE_INVOICE,
    UPDATE_SALE_INVOICE,
} from "./saleInvoice.type";

import { LIVE_URL2 } from "../config/Commen";


export const postSaleInvoice = (creds, token) => (dispatch) => {
    const headers = {
        "token": `${token}`
    };
    dispatch({ type: LOADING_SALE_INVOICE });
    const url = `${LIVE_URL2}/saleinvoice`;

    axios
        .post(url, creds, { headers })
        .then((res) => {
            dispatch({ type: SUCCESS_SALE_INVOICE, payload: res.data });
            console.log(res);
            if (res.status === 201) {
                alert(res.data.message);
            }
        })
        .catch((error) => {
            console.log(error);
            dispatch({ type: ERROR_SALE_INVOICE, payload: error });
        });
};

export const getSaleInvoice = (token) => (dispatch) => {
    const headers = {
        "token": `${token}`
    };
    dispatch({ type: LOADING_SALE_INVOICE });
    const url = `${LIVE_URL2}/saleinvoice/id`;

    axios
        .get(url, { headers })
        .then((res) => {
            dispatch({ type: GET_SALE_INVOICE, payload: res.data });
            // console.log("abcd", res.data );
        })
        .catch((error) => {
            console.log(error);
            dispatch({ type: ERROR_SALE_INVOICE, payload: error });
        });
};

export const updateSaleInvoice = (creds, token) => (dispatch) => {
    const headers = {
        "token": `${token}`
    };
    dispatch({ type: LOADING_SALE_INVOICE });
    const url = `${LIVE_URL2}/saleinvoice/id`;

    axios
        .put(url, creds, { headers })
        .then((res) => {
            dispatch({ type: UPDATE_SALE_INVOICE, payload: res.data });
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
            dispatch({ type: ERROR_SALE_INVOICE, payload: error });
        });
};


//   export const deleteSaleInvoice = (token) => (dispatch) => {
    // const headers={
    //     "token":`${token}`
    // }
//     dispatch({ type: LOADING_SALE_INVOICE });
//     try {
//       const url=`https://tax-service.onrender.com/saleinvoice/id`
//       axios.post(url,{ headers }).then((res) => {
//         dispatch({ type: DELETE_SALE_INVOICE, payload: res.data });
//         console.log(res)
//       });
//     } catch (error) {
//       console.log(error);
//       dispatch({ type: ERROR_SALE_INVOICE, payload: error });
//     }
//   };