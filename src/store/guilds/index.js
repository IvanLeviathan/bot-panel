import { app } from '../../_config';
const storageName = 'cur-server';
const fetch = require('node-fetch')

const initState = {
  CUR_GUILD: {},
  GUILDS: []
};

const actionType = {
  SET_USER_GUILDS: 'SET_USER_GUILDS',
  CHANGE_CURRENT_GUILD: 'CHANGE_CURRENT_GUILD'
}

export const actionGetUserGuilds = (authToken, allServers = {}) => (dispatch) => {
  const headers = {
    'Authorization': `Bearer ${authToken}`
  };
  fetch(app.API_ENDPOINT + '/users/@me/guilds', {
    method: 'GET',
    headers: headers
  })
  .then(res => res.json())
  .then(res => {
    dispatch(actionSetUserGuilds(res, allServers));
  })
}

const actionSetUserGuilds = (payload, allServers) => {
  return {
    type: actionType.SET_USER_GUILDS,
    payload,
    allServers
  }
}

export const actionChangeCurrentGuild = (id) => {
  return {
    type: actionType.CHANGE_CURRENT_GUILD,
    id
  }
}



const guildsReducer = (state = initState, action) => {
  switch(action.type){
    case actionType.SET_USER_GUILDS:
      action.payload = action.payload.filter((guild) => !!action.allServers[guild.id]);
      let curServer = action.payload[0];

      let curServerStorageId = localStorage.getItem(storageName);
      if(curServerStorageId && action.payload.find((guild) => guild.id === curServerStorageId))
        curServer = action.payload.find((guild) => guild.id === curServerStorageId);

      return {...state, GUILDS: action.payload, CUR_GUILD: curServer}
    case actionType.CHANGE_CURRENT_GUILD:
      localStorage.setItem(storageName, action.id);
      return {...state, CUR_GUILD: state.GUILDS.find((guild) => guild.id === action.id)};
    default:
      return state;
  }
}

export default guildsReducer;