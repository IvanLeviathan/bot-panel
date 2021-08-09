import { app } from '../../_config';
import { actionAddAlert } from '../alerts';
const storageName = 'cur-server';
const fetch = require('node-fetch')

const initState = {
  CUR_GUILD: {},
  GUILDS: false
};



const actionType = {
  SET_USER_GUILDS: 'SET_USER_GUILDS',
  CHANGE_CURRENT_GUILD: 'CHANGE_CURRENT_GUILD'
}

export const actionGetUserGuilds = (authToken, allServers = {}) => (dispatch) => {

  const params = new URLSearchParams();
  params.append('auth_token', authToken);
  params.append('action', 'GET_USER_GUILDS');
  const header = new Headers();
  header.append('Content-Type', 'application/json');

 
  fetch(app.BOT_API_URL + "?" + params.toString(), {
    method: 'GET',
    headers: header
  })
  .then(res => res.json())
  .then(res => {
    if(!!res.error){
      dispatch(actionAddAlert({
        type: 'danger',
        text: `Ошибка получения гильдий: ${res.text}`,
        id: new Date().getTime()
      }))
    }else{
      dispatch(actionSetUserGuilds(res, allServers));
    }
  })
  .catch(e => {
    console.log(e);
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
      // action.payload = action.payload.filter((guild) => guild.id === '123');

      let curServer = action.payload[0] ? action.payload[0] : {};

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