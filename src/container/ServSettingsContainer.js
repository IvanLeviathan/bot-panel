import React, {useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ServerSettings from '../components/ServerSettings';
import { actionGetServerSettings, actionGetServerStat, actionSetServerSettings } from '../store/firebase';
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

  useEffect(() => {
    if(!guild.CUR_GUILD.id)
      return;

    if(!firebase.SETTINGS){
      getServerSettings();
      getServerStat();
      return;
    }
    
    if(!firebase.CHANNELS.length){
      return getGuildChannels();
    }

    if(guild.CUR_GUILD.id !== firebase.SETTINGS.serverId){
      dropServerSettings();
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

    if(!!stats[date.getFullYear()]){
      if(!!stats[date.getFullYear()][date.getMonth() + 1]){
        if(!!stats[date.getFullYear()][date.getMonth() + 1][date.getDate()]){
          for(let name in stats[date.getFullYear()][date.getMonth() + 1][date.getDate()]){
            const time = stats[date.getFullYear()][date.getMonth() + 1][date.getDate()][name];
						let parsedTime = new Date(time * 1000).toISOString().substr(11, 8);
            todayStats.push({
              name: atob(name),
              time: parsedTime
            })
          }
        }
      }
    }

    if(searchValue.length)
      return todayStats.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))

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
