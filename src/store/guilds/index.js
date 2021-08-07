import { app } from '../../_config';

const initState = [];

const actionType = {
  SET_USER_GUILDS: 'SET_USER_GUILDS'
}

export const actionGetUserGuilds = (authToken) => (dispatch) => {
  const headers = {
    'Authorization': `Bearer ${authToken}`
  };
  fetch(app.API_ENDPOINT + '/users/@me/guilds', {
    method: 'GET',
    headers: headers
  })
  .then(res => res.json())
  .then(res => {
    dispatch(actionSetUserGuilds(res));
  })
}

const actionSetUserGuilds = (payload) => {
  return {
    type: actionType.SET_USER_GUILDS,
    payload
  }
}


const guildsReducer = (state = initState, action) => {
  switch(action.type){
    case actionType.SET_USER_GUILDS:
      return action.payload
    default:
      return state;
  }
}

export default guildsReducer;