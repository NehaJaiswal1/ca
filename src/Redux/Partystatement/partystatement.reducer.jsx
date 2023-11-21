
import {LOADING_PARTIES_STATEMENT, GET_PARTIES_STATEMENT, ERROR_PARTIES_STATEMENT, 
  GET_INDIVIDUAL_PARTIES_STATEMENT} from "./partystatement.types"
const initialState = {
  loading: false,
  error: null,
  partiesStatementData: [],
  individualPartiesStatementData: []
};

export const partystatementReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_PARTIES_STATEMENT:
      return { ...state, loading: true, error: null };
    case GET_PARTIES_STATEMENT:
     
      return { ...state, loading: false, partiesStatementData: payload, error: null };

    case GET_INDIVIDUAL_PARTIES_STATEMENT:
        return { ...state, loading: false, individualPartiesStatementData: payload, error: null };

    case ERROR_PARTIES_STATEMENT:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
