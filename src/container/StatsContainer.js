import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actionGetServerSettings, actionGetServerStat, actionSetServerStat } from '../store/firebase';
import { Context } from '../context/main';
import NoServers from '../components/NoServers';
import Spinner from '../components/Spinner';
import Stats from '../components/Stats';

export default function StatsContainer() {
  const guild = useSelector(state => state.guildsReducer);
  const firebase = useSelector(state => state.firebaseReducer);
  const dispatch = useDispatch();
  const context = useContext(Context);

  const getServerSettings = () => {
    dispatch(actionGetServerSettings(context.authToken, guild.CUR_GUILD.id, true));
  }

  const getServerStat = () => {
    dispatch(actionGetServerStat(context.authToken, guild.CUR_GUILD.id));
  }

  const pad = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}


  useEffect(() => {
    if(!guild.CUR_GUILD.id)
      return;

    if(!firebase.SETTINGS)
      return getServerSettings();

    if(!firebase.STAT)
      return getServerStat();

    if(guild.CUR_GUILD.id !== firebase.SETTINGS.serverId){
      // dropServerStat();
      getServerSettings();
      return;
    }

  }, [guild, firebase]);

  

  const randomRgba = (opacity = 1) => {
    const r = Math.floor(Math.random() * 255) + 1;
    const g = Math.floor(Math.random() * 255) + 1;
    const b = Math.floor(Math.random() * 255) + 1;
    return [
      `rgba(${r}, ${g}, ${b}, ${opacity})`,
      `rgba(${r}, ${g}, ${b}, 1)`
    ];
  }

  const findCurStat = (stats) => {

    const data = {
      labels: [],
      datasets: [],
    };

    const dataObj = {
      label: 'Количество игроков',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
    }

    let days = {}

    const now = new Date()
    stats = stats.filter((stat) => {
      const createdAt = new Date(stat.createdAt)
      if(
        createdAt.getMonth() === now.getMonth()
        && createdAt.getFullYear() === now.getFullYear()
      ){
        const datePretty = `${pad(createdAt.getDate(), 2)}.${pad(createdAt.getMonth() + 1,2)}.${createdAt.getFullYear()}`
        if(!days[datePretty])
          days[datePretty] = {}
        days[datePretty][stat.name] = true
        return true
      }
      return false
    })


    for(let day in days){
      const curDay = days[day]
      data.labels.push(day);

      dataObj.data.push(Object.keys(curDay).length);
      const rgba = randomRgba('.2');
      dataObj.backgroundColor.push(rgba[0]);
      dataObj.borderColor.push(rgba[1]);
    }

    data.datasets.push(dataObj);
    return data;
  }

  if(guild.GUILDS.length === 0)
    return <NoServers/>;

  return firebase.STAT ? (
    <Stats
      stat={findCurStat(firebase.STAT)}
    />
  ) : (
    <Spinner card={true}/>
  )
}
