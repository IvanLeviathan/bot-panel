import firebase from 'firebase/app';
import 'firebase/database';
import { actionAddAlert } from '../alerts';

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



const firebaseConfig = {
	"apiKey": process.env.REACT_APP_FB_API_KEY,
	"authDomain": process.env.REACT_APP_FB_AUTH_DOMAIN,
	"databaseURL": process.env.REACT_APP_FB_DATABASE_URL,
	"projectId": process.env.REACT_APP_FB_PROJECT_ID,
	"storageBucket": process.env.REACT_APP_FB_STORAGE_BUCKET,
	"messagingSenderId": process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
	"appId": process.env.REACT_APP_FB_APP_ID,
	"measurementId": process.env.REACT_APP_FB_MEAUSEREMENT_ID
};

firebase.initializeApp(firebaseConfig);
const legionsRef = firebase.database().ref('/legions_settings');
const statRef = firebase.database().ref('/stat');
const channelsRef = firebase.database().ref('/channels');


export const actionGetServerSettings = (serverId) => async (dispatch) => {
  const serverSettingsSnap = await legionsRef.get();
  const serverSettings = serverSettingsSnap.val();
  const curServerSettings = serverSettings[serverId] ? serverSettings[serverId] : {};
  dispatch(actionSetServerSettings(curServerSettings))
}

const actionSetServerSettings = (payload) => {
  return {
    type: actionType.SET_SERVER_SETTINGS,
    payload
  }
}

export const actionGetServerStat = (serverId) => async (dispatch) => {
  const serverStatSnap = await statRef.get();
  const serverStat = serverStatSnap.val();
  const curServerStat = serverStat[serverId] ? serverStat[serverId] : {};
  dispatch(actionSetServerStat(curServerStat));
}

const actionSetServerStat = (payload) => {
  return {
    type: actionType.SET_SERVER_STAT,
    payload
  }
}

export const actionGetGuildChannels = (serverId) =>  async (dispatch) => {
  const dataSnap = await channelsRef.get();
  const data = dataSnap.val();
  const curServerData = data[serverId] ? data[serverId] : {};
  dispatch(actionSetGuildChannels(curServerData));
}

const actionSetGuildChannels = (payload) => {
  return {
    type: actionType.SET_SERVER_CHANNELS,
    payload
  }
}


export const actionUpdateGuildSettings = (serverId, newSettings) => async (dispatch) => {
  const serverSettingsSnap = await legionsRef.get();
  const serverSettings = serverSettingsSnap.val();
  const curServerSettings = serverSettings[serverId] ? serverSettings[serverId] : {};
  let updatedSettings = {...curServerSettings, ...newSettings};
  legionsRef.child(serverId).set(
    updatedSettings,
    function(error) {
      if (error) {
        // console.log("Data could not be saved." + error);
        dispatch(actionAddAlert({
          type: 'danger',
          text: 'Произошла ошибка при сохранении',
          id: new Date().getTime()
        }))
      } else {
        // console.log("Data saved successfully.");
        dispatch(actionAddAlert({
          type: 'success',
          text: 'Настройки успешно сохранены',
          id: new Date().getTime()
        }))
      }
    }
  );
}


export const actionGetAllServersWhereBotIs = () => async (dispatch) =>  {
  const serverSettingsSnap = await channelsRef.get();
  const serverSettings = serverSettingsSnap.val();
  dispatch(actionSetAllServersWhereBotIs(serverSettings));
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