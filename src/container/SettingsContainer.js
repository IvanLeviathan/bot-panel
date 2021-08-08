import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SettingsForm from '../components/SettingsForm';
import Spinner from '../components/Spinner';
import {actionGetGuildChannels, actionGetServerSettings, actionUpdateGuildSettings } from '../store/firebase';

export default function SettingsContainer() {
  const dispatch = useDispatch();
  const guild = useSelector(state=> state.guildsReducer);
  const firebase = useSelector(state => state.firebaseReducer);

  const [botTitle, setBotNameState] = useState('');
  const [botThumb, setBotPicState] = useState('');
  const [botChannelId, setBotChannelIdState] = useState('');
  const [botLegionsChannelId, setBotChannelLegionsIdState] = useState('');
  const [botLegion, setBotLegionState] = useState('');
  const [botFooter, setBotFooterState] = useState('');
  const [botColor, setBotColorState] = useState('');
  const [botLegionServerIP, setBotIpState] = useState('');
  const [botLegionServerPort, setBotPortState] = useState('');

  const getServerSettings = () => {
    dispatch(actionGetServerSettings(guild.CUR_GUILD.id));
  }

  const getGuildChannels = () => {
    dispatch(actionGetGuildChannels(guild.CUR_GUILD.id));
  }

  useEffect(() => {
    if(guild.CUR_GUILD.id){
      getServerSettings();
      getGuildChannels();
    }
  }, [guild.CUR_GUILD])


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
    setBotLegionState(e.target.value);
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

  const makeOptionsFromChannels = (channels) => {
    let channelsToOptions = [];
    for(let channelId in channels){
      let channel = channels[channelId];
      if(channel.type === 'text'){
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
      botLegionServerPort
    }
    dispatch(actionUpdateGuildSettings(guild.CUR_GUILD.id, formData));
  }

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
        channels={makeOptionsFromChannels(firebase.CHANNELS)}
        saveSettingsForm={saveSettingsForm}
      />
    ) : <Spinner/>
  )
}


