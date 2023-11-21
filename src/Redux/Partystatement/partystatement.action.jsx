
import axios from "axios";
import { LIVE_URL2 } from "../config/Commen";
import { toast } from "react-toastify";
import { ERROR_PARTIES_STATEMENT, GET_INDIVIDUAL_PARTIES_STATEMENT, GET_PARTIES_STATEMENT, LOADING_PARTIES_STATEMENT } from "./partystatement.types";

export const getPartiesStatement = (token, firmId) => (dispatch) => {
    const headers = {
        token: `${token}`,
    };
    dispatch({ type: LOADING_PARTIES_STATEMENT });
    try {
        const url = `https://ca-api-testing.onrender.com/report/${firmId}/getAll`;
        axios.get(url, { headers }).then((res) => {
            dispatch({ type: GET_PARTIES_STATEMENT, payload: res.data });
            console.log("Party Statement: ", res.data);
        });
    } catch (error) {
        dispatch({ type: ERROR_PARTIES_STATEMENT, payload: error });
        if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        }
    }
};

export const getIndividualPartiesStatement = (token, firmId,id) => (dispatch) => {
    const headers = {
        token: `${token}`,
    };
    dispatch({ type: LOADING_PARTIES_STATEMENT });
    try {
        const url = `${LIVE_URL2}/${firmId}/party/${id}`;
        axios.get(url, { headers }).then((res) => {
            dispatch({ type: GET_INDIVIDUAL_PARTIES_STATEMENT, payload: res.data.party });
            console.log("Party Statement Data: ", res.data.party);
        });
    } catch (error) {
        dispatch({ type: ERROR_PARTIES_STATEMENT, payload: error });
        if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        }
    }
};


export const getPartiesStatementByDate = (token, firmId, startDate, endDate) => (dispatch) => {
    const headers = {
        token: `${token}`,
    };
    dispatch({ type: LOADING_PARTIES_STATEMENT });
    try {
        const url = `https://ca-api-testing.onrender.com/report/${firmId}/party/date?startDate=${startDate}&endDate=${endDate}`;
        axios.get(url, { headers }).then((res) => {
            dispatch({ type: GET_PARTIES_STATEMENT, payload: res.data });
            console.log("Party data with date ", res.data);
           
            
        });
    } catch (error) {
        dispatch({ type: ERROR_PARTIES_STATEMENT, payload: error });
        if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        }
    }
};

//  https://ca-api-testing.onrender.com/report/652d0f5d4115c16957111ed4/party/date?startDate=11-06-2023&endDate=11-07-2023