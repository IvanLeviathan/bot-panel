

const initState = [];

const actionType = {
  ADD_ALERT: 'ADD_ALERT',
  REMOVE_ALERT: 'REMOVE_ALERT'
}


export const actionAddAlert = (payload) => {
  return {
    type: actionType.ADD_ALERT,
    payload
  }
}


export const actionRemoveAlert = (alertId) => {
  return {
    type: actionType.REMOVE_ALERT,
    alertId
  }
}


const alertsReducer = (state = initState, action) => {
  switch(action.type){
    case actionType.ADD_ALERT:
      return [...state, action.payload];
    case actionType.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.alertId);
    default:
      return state;
  }
}

export default alertsReducer;