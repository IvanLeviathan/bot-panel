import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import Spinner from '../components/Spinner';
import UserDetail from '../components/UserDetail';
import UsersList from '../components/UsersList';
import { Context } from '../context/main';
import { actionGetGuildUsers, actionGetUserPortfolio, actionSetGuildUsers, actionSetUserPortfolio, actionUpdateUserPortfolio } from '../store/guilds';

export default function UsercContainer() {
  const guild = useSelector(state => state.guildsReducer);
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

  const getUserPortfolio = () => {
    dispatch(actionGetUserPortfolio(context.authToken, guild.CUR_GUILD.id, userId));
  }


  useEffect(() => {
    if(guild.CUR_GUILD.id)
      getGuildUsers(guild.CUR_GUILD_USERS);
  }, [guild]);

  useEffect(() => {
    if(!!userId){
      setEditState(false);
      setButtonText('Изменить');
      getUserPortfolio();
    }
  }, [userId])


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