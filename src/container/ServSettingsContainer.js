import React, {useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ServerSettings from '../components/ServerSettings';
import { actionGetServerSettings, actionGetServerStat, actionSetServerSettings, actionSetServerStat } from '../store/firebase';
import { actionGetGuildChannels } from '../store/firebase';
import { Context } from '../context/main';
import NoServers from '../components/NoServers';

export default function ServSettingsContainer() {
  const dispatch = useDispatch();
  const guild = useSelector(state=> state.guildsReducer);
  const firebase = useSelector(state => state.firebaseReducer);
  const context = useContext(Context);
  const [searchValue, setSearchValue] = useState('');

  const getServerSettings = () => {
    dispatch(actionGetServerSettings(context.authToken, guild.CUR_GUILD.id));
  }
  const dropServerSettings = () => {
    dispatch(actionSetServerSettings(false));
  }
  const getServerStat = () => {
    dispatch(actionGetServerStat(context.authToken, guild.CUR_GUILD.id));
  }
  const getGuildChannels = () => {
    dispatch(actionGetGuildChannels(context.authToken, guild.CUR_GUILD.id));
  }
  const dropServerStat = () => {
    dispatch(actionSetServerStat(false));
  }
 
  useEffect(() => {
    if(!guild.CUR_GUILD.id)
      return;

    if(!firebase.SETTINGS){
      getServerSettings();
      getServerStat();
      return;
    }

    if(firebase.SETTINGS && !firebase.STAT){
      getServerStat();
      return;
    }
    
    if(!firebase.CHANNELS.length){
      return getGuildChannels();
    }

    if(guild.CUR_GUILD.id !== firebase.SETTINGS.serverId){
      dropServerSettings();
      dropServerStat();
      getGuildChannels();
      return;
    }

  }, [guild, firebase]);


  const searchInputChange = (e) => {
    setSearchValue(e.target.value);
  }

  const filterStat = useMemo(() => {
    if(!firebase.STAT)
      return false;

    let stats = firebase.STAT;
    const date = new Date();
    let todayStats = [];
    
    //filter for today
    const now = new Date()
    stats = stats.filter((stat) => {
      const createdAt = new Date(stat.createdAt)
      if(
        createdAt.getDate() === now.getDate()
        && createdAt.getMonth() === now.getMonth()
        && createdAt.getFullYear() === now.getFullYear()
      ){
        return true
      }
      return false
    })


    stats.forEach((stat) => todayStats.push(stat.name))

    todayStats = [...new Set(todayStats)]

    if(searchValue.length)
      return todayStats.filter((item) => item.toLowerCase().includes(searchValue.toLowerCase()))

    return todayStats;
  }, [firebase.STAT, searchValue]);
  
  return (
    guild.GUILDS.length !== 0 ? (
      <ServerSettings
        settings = {firebase.SETTINGS}
        stat = {filterStat}
        channels = {firebase.CHANNELS}
        curGuild = {guild.CUR_GUILD}
        searchInputChange = {searchInputChange}
        searchInputValue={searchValue}
      />
    ) : (
      <NoServers/>
    )
  )
}
