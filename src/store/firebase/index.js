import firebase from 'firebase/app';
import 'firebase/database';
import { actionAddAlert } from '../alerts';
import {app} from "../../_config";

const initState = {
  SETTINGS: false,
  STAT: [],
  CHANNELS: [],
  ALL_SERVERS: {}
};

const actionType = {
  SET_SERVER_SETTINGS: 'SET_SERVER_SETTINGS',
  SET_SERVER_STAT: 'SET_SERVER_STAT',
  SET_SERVER_CHANNELS: 'SET_SERVER_CHANNELS',
  SET_ALL_SERVERS: 'SET_ALL_SERVERS'
}


const header = new Headers();
header.append('Content-Type', 'application/json');


export const actionGetServerSettings = (authToken, serverId) => async (dispatch) => {
  const params = new URLSearchParams();
  params.append('auth_token', authToken);
  params.append('action', 'GET_SERVER_SETTINGS');
  params.append('server_id', serverId);

  fetch(app.BOT_API_URL + "?" + params.toString(), {
    method: 'GET',
    headers: header
  })
  .then(res => res.json())
  .then(res => {
    if(!!res.error){
      dispatch(actionAddAlert({
        type: 'danger',
        text: `Ошибка получения настроек сервера: ${res.text}`,
        id: new Date().getTime()
      }))
    }else{
      dispatch(actionSetServerSettings(res))
    }
  })
  .catch(e => {
    console.log(e);
  })
}

const actionSetServerSettings = (payload) => {
  return {
    type: actionType.SET_SERVER_SETTINGS,
    payload
  }
}

export const actionGetServerStat = (authToken, serverId) => async (dispatch) => {
  const params = new URLSearchParams();
  params.append('auth_token', authToken);
  params.append('action', 'GET_SERVER_STATS');
  params.append('server_id', serverId);

  fetch(app.BOT_API_URL + "?" + params.toString(), {
    method: 'GET',
    headers: header
  })
  .then(res => res.json())
  .then(res => {
    if(!!res.error){
      dispatch(actionAddAlert({
        type: 'danger',
        text: `Ошибка получения статистики сервера: ${res.text}`,
        id: new Date().getTime()
      }))
    }else{
      dispatch(actionSetServerStat(res));
    }
  })
  .catch(e => {
    console.log(e);
  })
}

const actionSetServerStat = (payload) => {
  return {
    type: actionType.SET_SERVER_STAT,
    payload
  }
}

export const actionGetGuildChannels = (authToken, serverId) =>  async (dispatch) => {
  const params = new URLSearchParams();
  params.append('auth_token', authToken);
  params.append('action', 'GET_GUILD_CHANNELS');
  params.append('server_id', serverId);

  fetch(app.BOT_API_URL + "?" + params.toString(), {
    method: 'GET',
    headers: header
  })
  .then(res => res.json())
  .then(res => {
    if(!!res.error){
      dispatch(actionAddAlert({
        type: 'danger',
        text: `Ошибка получения каналов сервера: ${res.text}`,
        id: new Date().getTime()
      }))
    }else{
      dispatch(actionSetGuildChannels(res));
    }
  })
  .catch(e => {
    console.log(e);
  })
}

const actionSetGuildChannels = (payload) => {
  return {
    type: actionType.SET_SERVER_CHANNELS,
    payload
  }
}


export const actionUpdateGuildSettings = (authToken, serverId, newSettings) => async (dispatch) => {
  const params = new URLSearchParams();
  params.append('auth_token', authToken);
  params.append('action', 'UPDATE_GUILD_SETTINGS');
  params.append('server_id', serverId);
  params.append('new_settings', JSON.stringify(newSettings));

  fetch(app.BOT_API_URL + "?" + params.toString(), {
    method: 'GET',
    headers: header
  })
  .then(res => res.json())
  .then(res => {
    if(!!res.error){
      dispatch(actionAddAlert({
        type: 'danger',
        text: `Ошибка обновления настроек сервера: ${res.text}`,
        id: new Date().getTime()
      }))
    }else{
      dispatch(actionAddAlert({
        type: 'success',
        text: res.text,
        id: new Date().getTime()
      }))
    }
  })
  .catch(e => {
    console.log(e);
  })




}


export const actionGetAllServersWhereBotIs = (authToken) => async (dispatch) =>  {
  const params = new URLSearchParams();
  params.append('auth_token', authToken);
  params.append('action', 'GET_ALL_SERVER_WHERE_BOT_IS');

  fetch(app.BOT_API_URL + "?" + params.toString(), {
    method: 'GET',
    headers: header
  })
  .then(res => res.json())
  .then(res => {
    if(!!res.error){
      dispatch(actionAddAlert({
        type: 'danger',
        text: `Ошибка получения серверов с ботом: ${res.text}`,
        id: new Date().getTime()
      }))
    }else{
      dispatch(actionSetAllServersWhereBotIs(res));
    }
  })
  .catch(e => {
    console.log(e);
  })

}

const actionSetAllServersWhereBotIs = (payload) => {
  return {
    type: actionType.SET_ALL_SERVERS,
    payload
  }
}


const firebaseReducer = (state = initState, action) => {
  switch(action.type){
    case actionType.SET_SERVER_SETTINGS:
      return {...state, SETTINGS: action.payload};
    case actionType.SET_SERVER_STAT:
      let formattedStat = [];
      for(let name in action.payload){
        let time = action.payload[name];
        formattedStat.push({name: atob(name),time});
      }
      return {...state, STAT: formattedStat}
    case actionType.SET_SERVER_CHANNELS:
      let formattedChannels = [];
      for(let id in action.payload){
        let obj = action.payload[id];
        formattedChannels.push({name: obj.name, id: id, type: obj.type});
      }
      return {...state, CHANNELS: formattedChannels}
    case actionType.SET_ALL_SERVERS:
      return {...state, ALL_SERVERS: action.payload};
    default:
      return state;
  }
}

export default firebaseReducer;