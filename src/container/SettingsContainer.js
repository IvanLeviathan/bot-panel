import React, { useContext, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import SettingsForm from '../components/SettingsForm';
import Spinner from '../components/Spinner';
import {actionGetGuildChannels, actionGetServerSettings, actionSetServerSettings, actionUpdateGuildSettings } from '../store/firebase';
import { Context } from '../context/main';
import NoServers from '../components/NoServers';

export default function SettingsContainer() {
  const dispatch = useDispatch();
  const guild = useSelector(state=> state.guildsReducer, shallowEqual);
  const firebase = useSelector(state => state.firebaseReducer);
  const context = useContext(Context);

  const [botTitle, setBotNameState] = useState('');
  const [botThumb, setBotPicState] = useState('');
  const [botChannelId, setBotChannelIdState] = useState('');
  const [botLegionsChannelId, setBotChannelLegionsIdState] = useState('');
  const [botLegion, setBotLegionState] = useState('');
  const [botFooter, setBotFooterState] = useState('');
  const [botColor, setBotColorState] = useState('');
  const [botLegionServerIP, setBotIpState] = useState('');
  const [botLegionServerPort, setBotPortState] = useState('');
  const [battleMetricsUrl, setBattleMetricUrlState] = useState('');
  const [isAdmin, setIsAdmin] = useState(false)
  const [greetingsText, setGreetingsTextState] = useState('')
  const [greetingsChannel, setGreetingsChannelState] = useState('')
  const [greetingsImage, setGreetingsImageState] = useState('')

  const getServerSettings = () => {
    dispatch(actionGetServerSettings(context.authToken, guild.CUR_GUILD.id));
  }

  const dropServerSettings = () => {
    dispatch(actionSetServerSettings(false));
  }

  const getGuildChannels = () => {
    dispatch(actionGetGuildChannels(context.authToken, guild.CUR_GUILD.id));
  }

  useEffect(() => {
    if(!guild.CUR_GUILD.id)
      return;

    if(!firebase.SETTINGS){
      return getServerSettings();
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

  useEffect(() => {
    if(Object.keys(firebase.SETTINGS).length){
      setBotNameState(firebase.SETTINGS.botTitle);
      setBotPicState(firebase.SETTINGS.botThumb);
      setBotChannelIdState(firebase.SETTINGS.botChannelId);
      setBotChannelLegionsIdState(firebase.SETTINGS.botLegionsChannelId);
      setBotLegionState(firebase.SETTINGS.botLegion);
      setBotFooterState(firebase.SETTINGS.botFooter);
      setBotColorState(firebase.SETTINGS.botColor);
      setBotIpState(firebase.SETTINGS.botLegionServerIP);
      setBotPortState(firebase.SETTINGS.botLegionServerPort);
      setBattleMetricUrlState(firebase.SETTINGS.battleMetricsUrl);
      setIsAdmin(firebase.SETTINGS.isAdmin)
      setGreetingsTextState(firebase.SETTINGS.greetingsText)
      setGreetingsChannelState(firebase.SETTINGS.greetingsChannel)
      setGreetingsImageState(firebase.SETTINGS.greetingsImage)
    }else{
      setBotNameState('');
      setBotPicState('');
      setBotChannelIdState('');
      setBotChannelLegionsIdState('');
      setBotLegionState('');
      setBotFooterState('');
      setBotColorState('');
      setBotIpState('');
      setBotPortState('');
      setBattleMetricUrlState('');
      setIsAdmin(false)
      setGreetingsTextState('')
      setGreetingsChannelState('')
      setGreetingsImageState('')
    }
  }, [firebase.SETTINGS])

  

  const setBotName = (e) => {
    if(e.target.value.length <= 32)
      setBotNameState(e.target.value);
  }
  const setBotPic = (e) => {
    setBotPicState(e.target.value);
  }
  const setBotChannelId = (e) => {
    setBotChannelIdState(e.target.value);
  }

  const setBotChannelLegionsId = (e) => {
    setBotChannelLegionsIdState(e.target.value);
  }
  const setBotLegion = (e) => {
    let value = e.target.value;
    value = value.replace(' ', '');
    setBotLegionState(value);
  }
  const setBotFooter = (e) => {
    setBotFooterState(e.target.value);
  }
  const setBotColor = (color) => {
    setBotColorState(color.hex);
  }
  const setBotIp = (e) => {
    setBotIpState(e.target.value);
  }
  const setBotPort = (e) => {
    setBotPortState(e.target.value);
  }

  const setGreetingsText = (e) => {
    setGreetingsTextState(e.target.value);
  }
  const setGreetingsChannel = (e) => {
    setGreetingsChannelState(e.target.value);
  }
  const setGreetingsImage = (e) => {
    setGreetingsImageState(e.target.value);
  }

  const setBattleMetricUrl = (e) => {
    let value = e.target.value;
    var re = /https:\/\/www.battlemetrics.com\/servers\/arma3\/(\d+)/i;

    var found = value.match(re);
    if(!found){
      setBattleMetricUrlState('');
    }else{
      setBattleMetricUrlState(value);
    }
  }

  const makeOptionsFromChannels = (channels) => {
    let channelsToOptions = [];
    for(let channelId in channels){
      let channel = channels[channelId];
      if(channel.type === 'GUILD_TEXT'){
        channelsToOptions.push({
          text: channel.name,
          value: channel.id
        });
      }
    }
    return channelsToOptions;
  }


  const saveSettingsForm = (e) => {
    e.preventDefault();
    const formData = {
      botTitle,
      botThumb,
      botChannelId,
      botLegionsChannelId,
      botLegion,
      botFooter,
      botColor,
      botLegionServerIP,
      botLegionServerPort,
      battleMetricsUrl,
      isAdmin,
      greetingsChannel,
      greetingsImage,
      greetingsText
    }
    dispatch(actionUpdateGuildSettings(context.authToken, guild.CUR_GUILD.id, formData));
  }

  if(guild.GUILDS.length === 0)
    return <NoServers/>;
  
  return (
    firebase.SETTINGS ? (
      <SettingsForm
        botName={botTitle}
        setBotName={setBotName}
        botPic={botThumb}
        setBotPic={setBotPic}
        botChannelId={botChannelId}
        setBotChannelId={setBotChannelId}
        botChannelLegionsId={botLegionsChannelId}
        setBotChannelLegionsId={setBotChannelLegionsId}
        botLegion={botLegion}
        setBotLegion={setBotLegion}
        botFooter={botFooter}
        setBotFooter={setBotFooter}
        botColor={botColor}
        setBotColor={setBotColor}
        botIp={botLegionServerIP}
        setBotIp={setBotIp}
        botPort={botLegionServerPort}
        setBotPort={setBotPort}
        battleMetricsUrl={battleMetricsUrl}
        setBattleMetricUrl={setBattleMetricUrl}
        channels={makeOptionsFromChannels(firebase.CHANNELS)}
        saveSettingsForm={saveSettingsForm}
        isAdmin={isAdmin}

        setGreetingsChannel={setGreetingsChannel}
        setGreetingsText={setGreetingsText}
        setGreetingsImage={setGreetingsImage}
        greetingsChannel={greetingsChannel}
        greetingsText={greetingsText}
        greetingsImage={greetingsImage}
        
        curGuild={guild.CUR_GUILD}
      />
    ) : <Spinner card={true}/>
  )
}


