import React from 'react'
import PropTypes from "prop-types";
import Spinner from '../Spinner';
import "./style.css";
import Input from '../Input';

export default function ServerSettings({settings = {}, stat=false, channels = [], curGuild = {}, searchInputChange = (e) => void 0, searchInputValue = ''}) {
  const findChannel= (channelId) => {
    const channel = channels.find((channel) => channel.id === channelId);
    if(channel)
      return <span key={channel.id} className="channel-name" title={channel.id}>{channel.name}</span>
    return channelId;
  }

  return (
  <div>
    {settings ? (
      Object.keys(settings).length ? (
        <div className="list-group">
          <div className="list-group-item flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-0">{curGuild.name}</h5>
            </div>
          </div>
          <div className="list-group-item flex-column align-items-start bot-main-info pt-4">
            <div className="mb-1 row">
              <div className="col-md-6">
                <p className="font-weight-bold text-center h2 mb-4">{settings.botTitle}</p>
                <p className="text-center"><img className="rounded-circle border" src={settings.botThumb} alt={settings.botTitle} /></p>
              </div>
              <div className="col-md-6 bot-settings">
                <p><b>Канал для рапортов:</b>&nbsp;
                  {findChannel(settings.botChannelId)}
                </p>
                <p><b>Канал для общения:</b>&nbsp;
                  {findChannel(settings.botLegionsChannelId)}
                </p>
                <p><b>Подпись:</b> {settings.botFooter}</p>
                <p><b>Подразделения:</b> {settings.botLegion}</p>
                <p className="bot-color"><b>Цвет:</b> <span style={{backgroundColor: settings.botColor}}></span></p>
                <p><b>IP:</b> {settings.botLegionServerIP}:{settings.botLegionServerPort}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">Настроек бота не обнаружено</div>
        </div>
      )
    ): (
      <Spinner card={true}/>
    )}

    {stat ? (
      <div className="list-group mt-4">
        <div className="list-group-item flex-column align-items-start">
          <div className="mb-4 w-100 justify-content-between">
            <div className="row">
              <div className="col-6">
                <h5 className="mb-3">Были сегодня</h5>
              </div>
              <div className="col-6">
                <Input
                  value={searchInputValue}
                  onChange={searchInputChange}
                  placeholder="Поиск"
                />
              </div>
            </div>
          </div>
          <div className="mb-1 stat-table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Имя</th>
                </tr>
              </thead>
              <tbody>
                {
                  stat.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) : (
      <Spinner card={true}/>
    )}


  </div>
  )
}

ServerSettings.propTypes = {
  stat: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool
  ]),
  channels: PropTypes.array,
  curGuild: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]),
  searchInputChange: PropTypes.func,
  searchInputValue: PropTypes.string
}
