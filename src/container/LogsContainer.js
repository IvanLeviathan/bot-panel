import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { useEffect } from 'react'
import { Context } from '../context/main';
import { useSelector } from 'react-redux';
import { getServerLogs } from '../utils/logs';
import Logs from '../components/Logs';

let interval

export default function LogsContainer() {
  const context = useContext(Context);
  const [logs, setLogs] = useState(null)
  const guild = useSelector(state=> state.guildsReducer);

  const getLogs = async () => {
    const logsRes = await getServerLogs(context.authToken, guild.CUR_GUILD.id)
    setLogs(logsRes)
  }

  useEffect(() => {
    if(!!guild.CUR_GUILD.id)
      getLogs()
  }, [guild.CUR_GUILD.id])

  clearInterval(interval)
  interval = setInterval(() => {
    if(!!guild.CUR_GUILD.id)
      getLogs()
  }, 10000)
  


  return (
  <Logs
    items={logs}
    onPage={20}
  />)
}
