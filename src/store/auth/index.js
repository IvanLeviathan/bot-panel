import Cookies from 'universal-cookie';
import { app } from '../../_config';
const cookies = new Cookies();



const initState = {
  AUTH: false,
  AUTH_TOKEN: false,
  IS_LOADING: true,
  AUTH_ERROR: false
};


const actionType = {
  CHECK_AUTH: 'CHECK_AUTH',
  AUTH_USER: 'AUTH_USER',
  LOGOUT_USER: 'LOGOUT_USER'
}


export const actionCheckAuth = () => {
  return {
    type: actionType.CHECK_AUTH
  }
}

export const actionCheckAuthCode = () => (dispatch) => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if(code){
    const body = new URLSearchParams();
    body.append('client_id', app.DS_CLIENT);
    body.append('client_secret', app.DS_SECRET);
    body.append('grant_type', 'authorization_code');
    body.append('code', code);
    body.append('redirect_uri', app.REDIRECT_URI);

    fetch(app.API_ENDPOINT + '/oauth2/token?', {
      method: 'POST',
      body: body
    })
    .then(res => res.json())
    .then(res => {
      dispatch(actionSetAuth(res))
    })
    .catch((e) => {
      console.log(e);
    })
  }
}

const actionSetAuth = (payload) => {
  return {
    type: actionType.AUTH_USER,
    payload
  }
}

export const actionLogoutUser = () => {
  return {
    type: actionType.LOGOUT_USER
  }
}


const authReducer = (state = initState, action) => {
  let newState;
  switch(action.type){
    case actionType.CHECK_AUTH:
      const tokenCookie = cookies.get(app.COOKIE_ACCESS) ? cookies.get(app.COOKIE_ACCESS) : false;
      if(tokenCookie){
        newState = {...state, AUTH: true, AUTH_TOKEN: tokenCookie};
      }
      return {...newState, IS_LOADING: false};
    case actionType.AUTH_USER:
      if(action.payload.access_token){
        let date = new Date();
        cookies.set(app.COOKIE_ACCESS, action.payload.access_token, { path: '/', maxAge: date.setDate(date.getDate() + 7) });
        cookies.set(app.COOKIE_REFRESH, action.payload.refresh_token, { path: '/', maxAge: date.setDate(date.getDate() + 7) });
        newState = {...state, AUTH: true, AUTH_TOKEN: action.payload.access_token};
      }else if(action.payload.error){
        if(action.payload.error_description)
          newState = {...state, AUTH_ERROR: action.payload.error_description};
      }
      return {...newState, IS_LOADING: false};
    case actionType.LOGOUT_USER:
      cookies.remove(app.COOKIE_ACCESS);
      cookies.remove(app.COOKIE_REFRESH);
      window.location.reload();
      return state;
    default:
      return state;
  }
}

export default authReducer;