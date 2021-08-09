import Cookies from 'universal-cookie';
import { app } from '../../_config';
import { actionAddAlert } from '../alerts';
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
    const params = new URLSearchParams();
    params.append('action', 'CHECK_AUTH_CODE');
    params.append('code', code);
    params.append('redirect_uri', app.REDIRECT_URI);

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
          text: `Ошибка проверки кода авторизации: ${res.text}`,
          id: new Date().getTime()
        }))
      }else{
        let date = new Date();
        if(res.access_token){
          cookies.set(app.COOKIE_ACCESS, res.access_token, { path: '/', maxAge: date.setDate(date.getDate() + 7) });
          cookies.set(app.COOKIE_REFRESH, res.refresh_token, { path: '/', maxAge: date.setDate(date.getDate() + 7) });
          dispatch(actionSetAuth(res));
        }
        dispatch(actionSetAuth(res));
        window.location.href = app.REDIRECT_URI;
      }
    })
    .catch(e => {
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

export const actionLogoutUser = () => async (dispatch) => {
  await cookies.remove(app.COOKIE_ACCESS, {path: '/'});
  await cookies.remove(app.COOKIE_REFRESH, {path: '/'});
  window.location.reload();
  // return {
  //   type: actionType.LOGOUT_USER
  // }
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
        newState = {...state, AUTH: true, AUTH_TOKEN: action.payload.access_token};
      }else if(action.payload.error){
        if(action.payload.error_description)
          newState = {...state, AUTH_ERROR: action.payload.error_description};
      }
      return {...newState, IS_LOADING: false};
    case actionType.LOGOUT_USER:
      return state;
    default:
      return state;
  }
}

export default authReducer;