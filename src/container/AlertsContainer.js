import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import Alerts from '../components/Alerts'
import { actionRemoveAlert } from '../store/alerts';

export default function AlertsContainer() {
  const dispatch = useDispatch();
  const alerts = useSelector(state => state.alertsReducer);
  useEffect(() => {
    const lastAlert = alerts[alerts.length - 1];
    if(lastAlert){
      setTimeout(function(){
        dispatch(actionRemoveAlert(lastAlert.id));
      }, 3000);
    }
  }, [alerts])

  return <Alerts items={alerts}/>
}
