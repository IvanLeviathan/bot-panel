import { app } from '../../_config';
import { actionAddAlert } from '../alerts';
import { actionLogoutUser } from '../auth';

const initState = {};

const actionType = {
  SET_USER: 'SET_USER'
}

export const actionGetUser = (authToken) => (dispatch) => {
  const params = new URLSearchParams();
  params.append('auth_token', authToken);
  params.append('action', 'GET_USER');
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
        text: `Ошибка получения пользователя: ${res.text}`,
        id: new Date().getTime()
      }))
      if(res.status === 401)
        dispatch(actionLogoutUser())
    }else{
      dispatch(actionSetUser(res));
    }
  })
  .catch(e => {
    console.log(e);
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