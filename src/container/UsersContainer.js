import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import NoServers from '../components/NoServers';
import Spinner from '../components/Spinner';
import UserDetail from '../components/UserDetail';
import UsersList from '../components/UsersList';
import { Context } from '../context/main';
import { actionGetServerSettings } from '../store/firebase';
import { actionGetGuildUsers, actionGetUserPortfolio, actionSetGuildUsers, actionSetUserPortfolio, actionUpdateUserPortfolio } from '../store/guilds';

export default function UsercContainer() {
  const guild = useSelector(state => state.guildsReducer);
  const firebase = useSelector(state => state.firebaseReducer);
  const context = useContext(Context);
  const dispatch = useDispatch();
  const match = useRouteMatch('/users/:id');
  const userId = !!match && match.params.id ? match.params.id : 0;

  const [image, setImage] = useState('');
  const [text, setText] = useState('');

  const [buttonText, setButtonText] = useState('Изменить');
  const [edit, setEditState] = useState(false);

  const getGuildUsers = () => {
    dispatch(actionGetGuildUsers(context.authToken, guild.CUR_GUILD.id, guild.CUR_GUILD_USERS));
  }

  const getUserPortfolio = (curPortfolio) => {
    dispatch(actionGetUserPortfolio(context.authToken, guild.CUR_GUILD.id, userId, curPortfolio));
  }

  const getServerSettings = () => {
    dispatch(actionGetServerSettings(context.authToken, guild.CUR_GUILD.id));
  }

  const dropGuildUsers = () => {
    dispatch(actionSetGuildUsers(false));
  }

  const dropUserPortfolio = () => {
    dispatch(actionSetUserPortfolio(false));
  }

  // useEffect(() => {
  //   if(guild.CUR_GUILD.id)
  //     getGuildUsers(guild.CUR_GUILD_USERS);
  // }, [guild]);

  useEffect(() => {
    if(!guild.CUR_GUILD.id)
      return;

    if(!firebase.SETTINGS){
      return getServerSettings();
    }

    if(!guild.CUR_GUILD_USERS){
      return getGuildUsers();
    }

    if(guild.CUR_GUILD.id !== firebase.SETTINGS.serverId){
      dropGuildUsers();
      getServerSettings();
      return;
    }

  }, [guild, firebase]);



  useEffect(() => {
    if(!guild.CUR_GUILD.id)
      return;

    if(!!userId && !guild.CUR_USER_PORTFOLIO){
      setEditState(false);
      setButtonText('Изменить');
      getUserPortfolio(guild.CUR_USER_PORTFOLIO);
      return;
    }

    if(!!userId && !!guild.CUR_USER_PORTFOLIO && userId !== guild.CUR_USER_PORTFOLIO.userId){
      return dropUserPortfolio();
    }
  }, [userId, guild])


  useEffect(() => {
    if(guild.CUR_USER_PORTFOLIO){
      setImage(guild.CUR_USER_PORTFOLIO.image);
      setText(guild.CUR_USER_PORTFOLIO.text);
    }
  }, [guild.CUR_USER_PORTFOLIO])


  const findCurUser = (users = [], id) => {
    return users.filter(user => user.id === id)[0];
  }

  const onButtonClick = () => {
    setButtonText(edit ? 'Изменить' : 'Сохранить');
    if(edit){
      const newPortfolio = {
        text: text,
        image: image
      }
      dispatch(actionUpdateUserPortfolio(context.authToken, guild.CUR_GUILD.id, userId, newPortfolio));
    }else{
      setEditState(!edit);
    }
  }

  const imageChange = (e) => {
    setImage(e.target.value);
  }
  const textChange = (e) => {
    setText(e.target.value);
  }

  if(guild.GUILDS.length === 0)
    return <NoServers/>;

  return userId ? (
      guild.CUR_USER_PORTFOLIO && guild.CUR_GUILD_USERS ? (
        <UserDetail
          portfolio={guild.CUR_USER_PORTFOLIO}
          curUser={findCurUser(guild.CUR_GUILD_USERS, userId)}
          curGuild={guild.CUR_GUILD}
          buttonText={buttonText}
          onClick={onButtonClick}
          edit={edit}
          image={image}
          imageChange={imageChange}
          text={text}
          textChange={textChange}
        />
      ) : (
        <Spinner card={true}/>
      )
    ) : (
      guild.CUR_GUILD_USERS ? (
        <>
        <UsersList
          users={guild.CUR_GUILD_USERS}
          curGuild={guild.CUR_GUILD}
        />
        </>
      ) : (
        <Spinner card={true}/>
      )
    )
  
}
