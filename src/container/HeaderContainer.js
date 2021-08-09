import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/main';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetUser} from '../store/user';
import { actionChangeCurrentGuild, actionGetUserGuilds } from '../store/guilds';
import Header from '../components/Header';
import { actionGetAllServersWhereBotIs } from '../store/firebase';
import { actionLogoutUser } from '../store/auth';

export default function HeaderContainer() {
  const context = useContext(Context);
  const authToken = context.authToken;
  const app = context.app;
  const user = useSelector(state => state.userReducer);
  const guilds = useSelector(state => state.guildsReducer);
  const firebase = useSelector(state => state.firebaseReducer);
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const [guildsOpened, openGuilds] = useState(false);

  const loadUser = () => {
    dispatch(actionGetUser(authToken));
  }
  const loadUserGuilds = (allServers) => {
    dispatch(actionGetUserGuilds(authToken, allServers));
  }

  const getAllServersWhereBotIs = () => {
    dispatch(actionGetAllServersWhereBotIs(context.authToken));
  }

  useEffect(() => {
    loadUser();
    getAllServersWhereBotIs();
  }, [])

  useEffect(() => {
    if(Object.keys(firebase.ALL_SERVERS).length)
      loadUserGuilds(firebase.ALL_SERVERS);
  }, [firebase.ALL_SERVERS])

  const curGuildClick = () => {
    openGuilds(!guildsOpened);
  }

  const guildListClick = (id) => {
    dispatch(actionChangeCurrentGuild(id));
    openGuilds(false);
  }

  const logout = () => {
    dispatch(actionLogoutUser());
  }
  return <Header
    user={user}
    guilds={guilds}
    logout={logout}
    guildsOpened={guildsOpened}
    curGuildClick={curGuildClick}
    guildListClick={guildListClick}
  />

}