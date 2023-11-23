import axios from "axios";
import {
    DELETE_TRANSACTION,
  ERROR_TRANSACTION,
  GET_TRANSACTION,
  LOADING_TRANSACTION,
  SUCCESS_TRANSACTION,
  UPDATE_TRANSACTION,
} from "./parties.types";



export const postTransactionAction = (creds,token) => (dispatch) => {
    const headers={
        "token":`${token}`
    }
  dispatch({ type: LOADING_TRANSACTION });
  try {
    const url=`${LIVE_URL2}/firmId/party`
    axios.post(url, creds, { headers }).then((res) => {
      dispatch({ type: SUCCESS_TRANSACTION, payload: res.data });
      console.log(res);
      if (res.status === 201) {
        alert(res.data.message);
      }
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_TRANSACTION, payload: error });
  }
};


export const getTransactionAction = (token) => (dispatch) => {
    const headers={
        "token":`${token}`
    }
    dispatch({ type: LOADING_TRANSACTION });
    try {
      const url=`${LIVE_URL2}/party`
      axios.get(url,{ headers }).then((res) => {
        dispatch({ type: GET_TRANSACTION, payload: res.data });
        // console.log("abcd", res.data );
       
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR_TRANSACTION, payload: error });
    }
  };
  


  export const updateTransactionAction = (creds,token) => (dispatch) => {
    const headers={
        "token":`${token}`
    }
    dispatch({ type: LOADING_TRANSACTION });
    try {
      const url=`${LIVE_URL2}/party/id`
      axios.put(url,creds,{ headers }).then((res) => {
        dispatch({ type: UPDATE_TRANSACTION, payload: res.data });
        console.log(res);
    
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR_TRANSACTION, payload: error });
    }
  };
  

//   export const deleteTransactionAction = (token) => (dispatch) => {
    // const headers={
    //     "token":`${token}`
    // }
//     dispatch({ type: LOADING_TRANSACTION });
//     try {
//       const url=`${LIVE_URL2}/party/${id}`
//       axios.post(url,{ headers }).then((res) => {
//         dispatch({ type: DELETE_TRANSACTION, payload: res.data });
//         console.log(res)
//       });
//     } catch (error) {
//       console.log(error);
//       dispatch({ type: ERROR_TRANSACTION, payload: error });
//     }
//   };