import { app } from '../../_config';
import { actionAddAlert } from '../alerts';
const storageName = 'cur-server';
const fetch = require('node-fetch')

const initState = {
  CUR_GUILD: false,
  GUILDS: false,
  CUR_GUILD_USERS: false,
  CUR_USER_PORTFOLIO: false
};



const actionType = {
  SET_USER_GUILDS: 'SET_USER_GUILDS',
  CHANGE_CURRENT_GUILD: 'CHANGE_CURRENT_GUILD',
  SET_GUILD_USERS: 'SET_GUILD_USERS',
  SET_USER_PORTFOLIO: 'SET_USER_PORTFOLIO'
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


export const actionGetGuildUsers = (authToken, serverId, stateUsers) => (dispatch) => {
  const params = new URLSearchParams();
  params.append('auth_token', authToken);
  params.append('server_id', serverId);
  params.append('action', 'GET_GUILD_USERS');
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
        text: `Ошибка получения пользователей гильдии: ${res.text}`,
        id: new Date().getTime()
      }))
    }else{
      if(JSON.stringify(stateUsers) !== JSON.stringify(res))
        dispatch(actionSetGuildUsers(res));
    }
  })
  .catch(e => {
    console.log(e);
  })
}

export const actionSetGuildUsers = (payload) => {
  return {
    type: actionType.SET_GUILD_USERS,
    payload
  }
}


export const actionGetUserPortfolio = (authToken, serverId, userId, curPortfolio) => (dispatch) => {
  const params = new URLSearchParams();
  params.append('auth_token', authToken);
  params.append('server_id', serverId);
  params.append('user_id', userId);
  params.append('action', 'GET_USER_PORTFOLIO');
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
        text: `Ошибка получения портфолио пользователя: ${res.text}`,
        id: new Date().getTime()
      }))
    }else{
      if(JSON.stringify(res) !== JSON.stringify(curPortfolio))
        dispatch(actionSetUserPortfolio(res));
    }
  })
  .catch(e => {
    console.log(e);
  })
}

export const actionSetUserPortfolio = (payload) => {
  return {
    type: actionType.SET_USER_PORTFOLIO,
    payload
  }
}


export const actionUpdateUserPortfolio = (authToken, serverId, userId, newPortfolio) => (dispatch) => {
  const params = new URLSearchParams();
  params.append('auth_token', authToken);
  params.append('server_id', serverId);
  params.append('user_id', userId);
  params.append('new_portfolio', JSON.stringify(newPortfolio));
  params.append('action', 'UPDATE_USER_PORTFOLIO');
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
        text: `Ошибка обновления портфолио пользователя: ${res.text}`,
        id: new Date().getTime()
      }))
    }else{
      dispatch(actionAddAlert({
        type: 'success',
        text: `${res.text}`,
        id: new Date().getTime()
      }))
      dispatch(actionSetUserPortfolio(newPortfolio));
    }
  })
  .catch(e => {
    console.log(e);
  })
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
    case actionType.SET_GUILD_USERS:
      return {...state, CUR_GUILD_USERS: action.payload}
    case actionType.SET_USER_PORTFOLIO:
      return {...state, CUR_USER_PORTFOLIO: action.payload}
    default:
      return state;
  }
}

export default guildsReducer;