import { app } from '../../_config';

const initState = {};

const actionType = {
  SET_USER: 'SET_USER'
}

export const actionGetUser = (authToken) => (dispatch) => {
  
  const headers = {
    'Authorization': `Bearer ${authToken}`
  };
  fetch(app.API_ENDPOINT + '/users/@me', {
    method: 'GET',
    headers: headers
  })
  .then(res => res.json())
  .then(res => {
    if(res.avatar)
      res.avatar = `https://cdn.discordapp.com/avatars/${res.id}/${res.avatar}.png`;
    dispatch(actionSetUser(res));
  })
}

const actionSetUser = (payload) => {
  return {
    type: actionType.SET_USER,
    payload
  }
}




const userReducer = (state = initState, action) => {
  switch(action.type){
    case actionType.SET_USER:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

export default userReducer;