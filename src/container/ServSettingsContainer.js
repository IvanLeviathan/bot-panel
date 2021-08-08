import React, {useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ServerSettings from '../components/ServerSettings';
import { actionGetServerSettings, actionGetServerStat } from '../store/firebase';
import { actionGetGuildChannels } from '../store/firebase';

export default function ServSettingsContainer() {
  const dispatch = useDispatch();
  const guild = useSelector(state=> state.guildsReducer);
  const firebase = useSelector(state => state.firebaseReducer);
  const [searchValue, setSearchValue] = useState('');

  const getServerSettings = () => {
    dispatch(actionGetServerSettings(guild.CUR_GUILD.id));
  }
  const getServerStat = () => {
    dispatch(actionGetServerStat(guild.CUR_GUILD.id));
  }
  const getGuildChannels = () => {
    dispatch(actionGetGuildChannels(guild.CUR_GUILD.id));
  }
  useEffect(() => {
    if(guild.CUR_GUILD.id){
      getServerSettings();
      getServerStat();
      getGuildChannels();
      setInterval(() => {
        getServerSettings();
      }, 300000)
    }
  }, [guild.CUR_GUILD])

  const searchInputChange = (e) => {
    setSearchValue(e.target.value);
  }

  const filterStat = useMemo(() => {
    let stats = firebase.STAT;
    if(searchValue.length)
      return stats.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    return stats;
  }, [firebase.STAT, searchValue]);

  return <ServerSettings
    settings = {firebase.SETTINGS}
    stat = {filterStat}
    channels = {firebase.CHANNELS}
    curGuild = {guild.CUR_GUILD}
    searchInputChange = {searchInputChange}
    searchInputValue={searchValue}
  />
}