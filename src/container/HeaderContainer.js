import React, { useContext, useEffect } from 'react'
import { Context } from '../context/main';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetUser} from '../store/user';
import { actionGetUserGuilds } from '../store/guilds';
import Header from '../components/Header';

export default function HeaderContainer() {
  const context = useContext(Context);
  const authToken = context.authToken;
  const app = context.app;
  const user = useSelector(state => state.userReducer);
  const guilds = useSelector(state => state.guildsReducer);
  const cookies = new Cookies();
  const dispatch = useDispatch();


  const loadUser = () => {
    dispatch(actionGetUser(authToken));
  }
  const loadUserGuilds = () => {
    dispatch(actionGetUserGuilds(authToken));
  }

  useEffect(() => {
    loadUser();
    loadUserGuilds();
  }, [])

  const logout = () => {
    cookies.remove(app.COOKIE_ACCESS);
    cookies.remove(app.COOKIE_REFRESH);
    window.location.reload();
  }
  return <Header
    user={user}
    guilds={guilds}
    logout={logout}
  />

}